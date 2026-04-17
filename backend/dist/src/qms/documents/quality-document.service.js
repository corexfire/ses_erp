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
exports.QualityDocumentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const workflow_service_1 = require("../../workflow/workflow.service");
let QualityDocumentService = class QualityDocumentService {
    prisma;
    workflow;
    constructor(prisma, workflow) {
        this.prisma = prisma;
        this.workflow = workflow;
    }
    async findAll(tenantId, filters) {
        const { category, status, search } = filters;
        return this.prisma.qualityDocument.findMany({
            where: {
                tenantId,
                ...(category && category !== 'ALL' ? { category } : {}),
                ...(status && status !== 'ALL' ? { status: status } : {}),
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
    async findOne(tenantId, id) {
        const doc = await this.prisma.qualityDocument.findFirst({
            where: { id, tenantId },
            include: { owner: { select: { id: true, name: true } } },
        });
        if (!doc)
            throw new common_1.NotFoundException('Document not found');
        return doc;
    }
    async create(tenantId, data) {
        return this.prisma.qualityDocument.create({
            data: {
                tenantId,
                ...data,
            },
        });
    }
    async update(tenantId, id, data) {
        await this.findOne(tenantId, id);
        return this.prisma.qualityDocument.update({
            where: { id },
            data,
        });
    }
    async delete(tenantId, id) {
        await this.findOne(tenantId, id);
        return this.prisma.qualityDocument.delete({ where: { id } });
    }
    async submitToWorkflow(tenantId, userId, id) {
        const doc = await this.findOne(tenantId, id);
        if (doc.status !== 'DRAFT') {
            throw new common_1.BadRequestException('Document is not in DRAFT state');
        }
        const instance = await this.workflow.triggerWorkflow(tenantId, 'QUALITY_DOC', id);
        await this.prisma.qualityDocument.update({
            where: { id },
            data: { status: 'UNDER_REVIEW' },
        });
        return instance;
    }
};
exports.QualityDocumentService = QualityDocumentService;
exports.QualityDocumentService = QualityDocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        workflow_service_1.WorkflowService])
], QualityDocumentService);
//# sourceMappingURL=quality-document.service.js.map