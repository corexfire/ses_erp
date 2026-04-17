import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNcrDto } from './dto/create-ncr.dto';
import { UpdateNcrDto } from './dto/update-ncr.dto';
import { WorkflowService } from '../../workflow/workflow.service';

@Injectable()
export class NcrService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workflow: WorkflowService,
  ) {}

  async findAll(tenantId: string, filters: any) {
    return this.prisma.nonConformanceReport.findMany({
      where: {
        tenantId,
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.severity ? { severity: filters.severity } : {}),
      },
      include: {
        item: true,
        reportedBy: { select: { id: true, name: true, email: true } },
        assignedTo: { select: { id: true, name: true, email: true } },
        qc: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const ncr = await this.prisma.nonConformanceReport.findFirst({
      where: { id, tenantId },
      include: {
        item: true,
        reportedBy: { select: { id: true, name: true, email: true } },
        assignedTo: { select: { id: true, name: true, email: true } },
        qc: { include: { grn: true } },
      },
    });
    if (!ncr) throw new NotFoundException('NCR not found');
    return ncr;
  }

  async create(tenantId: string, userId: string, dto: CreateNcrDto) {
    return this.prisma.nonConformanceReport.create({
      data: {
        tenantId,
        reportedById: userId,
        ...dto,
      },
    });
  }

  async update(tenantId: string, id: string, dto: UpdateNcrDto) {
    const ncr = await this.findOne(tenantId, id);
    
    // Logic for auto stock adjustment if SCRAP is approved (simulated here for simplicity, typically triggered by workflow approve)
    // In a real scenario, this would be in a separate trigger method called by WorkflowService
    
    return this.prisma.nonConformanceReport.update({
      where: { id },
      data: dto,
    });
  }

  async submitToWorkflow(tenantId: string, userId: string, id: string) {
    const ncr = await this.findOne(tenantId, id);
    if (ncr.status !== 'OPEN' && ncr.status !== 'DRAFT') {
      throw new BadRequestException('NCR is not in a state that can be submitted for approval');
    }

    // Trigger workflow
    const instance = await this.workflow.triggerWorkflow(tenantId, 'NCR', id);
    
    await this.prisma.nonConformanceReport.update({
      where: { id },
      data: { status: 'PENDING_APPROVAL' },
    });

    return instance;
  }

  // This method should be called by WorkflowService when NCR is approved
  async handleApproval(tenantId: string, id: string) {
    const ncr = await this.findOne(tenantId, id);
    
    const updated = await this.prisma.nonConformanceReport.update({
      where: { id },
      data: { status: 'DISPOSITIONED' },
    });

    // If disposition is SCRAP, reduce stock
    if (ncr.disposition === 'SCRAP' && ncr.itemId) {
      // Find a suitable warehouse (e.g., from QC or default)
      let warehouseId: string | undefined;
      if (ncr.qc?.grn?.warehouseId) {
        warehouseId = ncr.qc.grn.warehouseId;
      }

      if (warehouseId) {
        await this.prisma.stockLedger.create({
          data: {
            tenantId,
            moveType: 'GOODS_ISSUE',
            refType: 'NCR',
            refId: id,
            postingDate: new Date(),
            itemId: ncr.itemId,
            description: `NCR Scrap: ${ncr.code}`,
            qtyIn: '0',
            qtyOut: ncr.qty.toString(),
            uomCode: ncr.item?.baseUomCode || 'PCS',
            warehouseId: warehouseId,
          },
        });
      }
    }

    return updated;
  }

  async generateFromQc(tenantId: string, userId: string, qcId: string) {
    const qc = await this.prisma.qcInspection.findUnique({
      where: { id: qcId },
      include: { items: true, grn: { include: { supplier: true } } },
    });

    if (!qc) throw new NotFoundException('QC Inspection not found');

    const failedItems = qc.items.filter((item) => Number(item.failedQty) > 0);
    const ncrResults = [];

    for (const item of failedItems) {
      const ncrCode = `NCR-${qc.code}-${item.lineNo}`;
      
      // Auto-create NCR for each failed item
      const ncr = await this.prisma.nonConformanceReport.upsert({
        where: {
          tenantId_code_version: {
            tenantId,
            code: ncrCode,
            version: '1.0',
          },
        },
        update: {
          qty: Number(item.failedQty),
          description: `Auto-generated from QC rejection. Reason: ${item.defectReason || 'No details provided'}`,
        },
        create: {
          tenantId,
          code: ncrCode,
          sourceType: 'QC',
          itemId: item.itemId,
          qty: Number(item.failedQty),
          ncrType: 'MATERIAL',
          severity: 'MEDIUM',
          description: `Auto-generated from QC rejection. Reason: ${item.defectReason || 'No details provided'}`,
          status: 'OPEN',
          reportedById: userId,
          qcId: qc.id,
        },
      });
      ncrResults.push(ncr);
    }

    return ncrResults;
  }
}
