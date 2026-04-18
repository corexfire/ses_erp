"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NcrService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const workflow_service_1 = require("../../workflow/workflow.service");
let NcrService = class NcrService {
    prisma;
    workflow;
    constructor(prisma, workflow) {
        this.prisma = prisma;
        this.workflow = workflow;
    }
    async findAll(tenantId, filters) {
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
    async findOne(tenantId, id) {
        const ncr = await this.prisma.nonConformanceReport.findFirst({
            where: { id, tenantId },
            include: {
                item: true,
                reportedBy: { select: { id: true, name: true, email: true } },
                assignedTo: { select: { id: true, name: true, email: true } },
                qc: { include: { grn: true } },
            },
        });
        if (!ncr)
            throw new common_1.NotFoundException('NCR not found');
        return ncr;
    }
    async create(tenantId, userId, dto) {
        return this.prisma.nonConformanceReport.create({
            data: {
                tenantId,
                reportedById: userId,
                ...dto,
            },
        });
    }
    async update(tenantId, id, dto) {
        const ncr = await this.findOne(tenantId, id);
        return this.prisma.nonConformanceReport.update({
            where: { id },
            data: dto,
        });
    }
    async submitToWorkflow(tenantId, userId, id) {
        const ncr = await this.findOne(tenantId, id);
        if (ncr.status !== 'OPEN' && ncr.status !== 'DRAFT') {
            throw new common_1.BadRequestException('NCR is not in a state that can be submitted for approval');
        }
        const instance = await this.workflow.triggerWorkflow(tenantId, 'NCR', id);
        await this.prisma.nonConformanceReport.update({
            where: { id },
            data: { status: 'PENDING_APPROVAL' },
        });
        return instance;
    }
    async handleApproval(tenantId, id) {
        const ncr = await this.findOne(tenantId, id);
        const updated = await this.prisma.nonConformanceReport.update({
            where: { id },
            data: { status: 'DISPOSITIONED' },
        });
        if (ncr.disposition === 'SCRAP' && ncr.itemId) {
            let warehouseId;
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
    async generateFromQc(tenantId, userId, qcId) {
        const qc = await this.prisma.qcInspection.findUnique({
            where: { id: qcId },
            include: { items: true, grn: { include: { supplier: true } } },
        });
        if (!qc)
            throw new common_1.NotFoundException('QC Inspection not found');
        const failedItems = qc.items.filter((item) => Number(item.failedQty) > 0);
        const ncrResults = [];
        for (const item of failedItems) {
            const ncrCode = `NCR-${qc.code}-${item.lineNo}`;
            const ncr = await this.prisma.nonConformanceReport.upsert({
                where: {
                    tenantId_code: {
                        tenantId,
                        code: ncrCode,
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
};
exports.NcrService = NcrService;
exports.NcrService = NcrService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        workflow_service_1.WorkflowService])
], NcrService);
//# sourceMappingURL=ncr.service.js.map