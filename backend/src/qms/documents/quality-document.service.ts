import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { WorkflowService } from '../../workflow/workflow.service';

@Injectable()
export class QualityDocumentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workflow: WorkflowService,
  ) {}

  async findAll(tenantId: string, filters: any) {
    const { category, status, search } = filters;
    return this.prisma.qualityDocument.findMany({
      where: {
        tenantId,
        ...(category && category !== 'ALL' ? { category } : {}),
        ...(status && status !== 'ALL' ? { status: status as any } : {}),
        ...(search ? {
          OR: [
            { code: { contains: search, mode: 'insensitive' } },
            { title: { contains: search, mode: 'insensitive' } },
          ]
        } : {}),
      },
      include: { owner: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const doc = await this.prisma.qualityDocument.findFirst({
      where: { id, tenantId },
      include: { owner: { select: { id: true, name: true } } },
    });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async create(tenantId: string, data: any) {
    return this.prisma.qualityDocument.create({
      data: {
        tenantId,
        ...data,
      },
    });
  }

  async update(tenantId: string, id: string, data: any) {
    await this.findOne(tenantId, id);
    return this.prisma.qualityDocument.update({
      where: { id },
      data,
    });
  }

  async delete(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.prisma.qualityDocument.delete({ where: { id } });
  }

  async submitToWorkflow(tenantId: string, userId: string, id: string) {
    const doc = await this.findOne(tenantId, id);
    if (doc.status !== 'DRAFT') {
      throw new BadRequestException('Document is not in DRAFT state');
    }

    const instance = await this.workflow.triggerWorkflow(tenantId, 'QUALITY_DOC', id);

    await this.prisma.qualityDocument.update({
      where: { id },
      data: { status: 'UNDER_REVIEW' },
    });

    return instance;
  }
}
