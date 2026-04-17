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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const workflow_service_1 = require("./workflow.service");
let WorkflowController = class WorkflowController {
    workflowService;
    constructor(workflowService) {
        this.workflowService = workflowService;
    }
    async getDefinitions(req, moduleKey, docType) {
        return this.workflowService.getDefinitions(req.user.tenantId, moduleKey, docType);
    }
    async getDefinitionById(req, id) {
        return this.workflowService.getDefinitionById(req.user.tenantId, id);
    }
    async createDefinition(req, data) {
        return this.workflowService.createDefinition(req.user.tenantId, data);
    }
    async updateDefinition(req, id, data) {
        return this.workflowService.updateDefinition(req.user.tenantId, id, data);
    }
    async deleteDefinition(req, id) {
        return this.workflowService.deleteDefinition(req.user.tenantId, id);
    }
    async triggerWorkflow(req, data) {
        return this.workflowService.triggerWorkflow(req.user.tenantId, data.docType, data.docId, data.definitionId);
    }
    async getMyInbox(req) {
        return this.workflowService.getMyInbox(req.user.tenantId, req.user.id);
    }
    async getInstances(req, docType, docId, status, assignedToUserId) {
        return this.workflowService.getInstances(req.user.tenantId, { docType, docId, status, assignedToUserId });
    }
    async getInstanceById(req, id) {
        return this.workflowService.getInstanceById(req.user.tenantId, id);
    }
    async approve(req, id, data) {
        return this.workflowService.approve(req.user.tenantId, req.user.id, id, data.comment);
    }
    async reject(req, id, data) {
        return this.workflowService.reject(req.user.tenantId, req.user.id, id, data.comment);
    }
    async delegate(req, id, data) {
        return this.workflowService.delegate(req.user.tenantId, req.user.id, id, data.toUserId, data.comment);
    }
    async escalate(req, id) {
        return this.workflowService.escalate(req.user.tenantId, id);
    }
    async getDelegations(req) {
        return this.workflowService.getDelegations(req.user.tenantId, req.user.id);
    }
    async createDelegation(req, data) {
        return this.workflowService.createDelegation(req.user.tenantId, req.user.id, data);
    }
    async updateDelegation(req, id, data) {
        return this.workflowService.updateDelegation(req.user.tenantId, id, req.user.id, data);
    }
    async deleteDelegation(req, id) {
        return this.workflowService.deleteDelegation(req.user.tenantId, id, req.user.id);
    }
    async getApprovalHistory(req, docType, docId) {
        return this.workflowService.getApprovalHistory(req.user.tenantId, docType, docId);
    }
    async getOverdueInstances(req) {
        return this.workflowService.getOverdueInstances(req.user.tenantId);
    }
};
exports.WorkflowController = WorkflowController;
__decorate([
    (0, common_1.Get)('definitions'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('moduleKey')),
    __param(2, (0, common_1.Query)('docType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "getDefinitions", null);
__decorate([
    (0, common_1.Get)('definitions/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "getDefinitionById", null);
__decorate([
    (0, common_1.Post)('definitions'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "createDefinition", null);
__decorate([
    (0, common_1.Put)('definitions/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "updateDefinition", null);
__decorate([
    (0, common_1.Delete)('definitions/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "deleteDefinition", null);
__decorate([
    (0, common_1.Post)('trigger'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "triggerWorkflow", null);
__decorate([
    (0, common_1.Get)('inbox'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "getMyInbox", null);
__decorate([
    (0, common_1.Get)('instances'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('docType')),
    __param(2, (0, common_1.Query)('docId')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('assignedToUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "getInstances", null);
__decorate([
    (0, common_1.Get)('instances/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "getInstanceById", null);
__decorate([
    (0, common_1.Post)('instances/:id/approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)('instances/:id/reject'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)('instances/:id/delegate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "delegate", null);
__decorate([
    (0, common_1.Post)('instances/:id/escalate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "escalate", null);
__decorate([
    (0, common_1.Get)('delegations'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "getDelegations", null);
__decorate([
    (0, common_1.Post)('delegations'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "createDelegation", null);
__decorate([
    (0, common_1.Put)('delegations/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "updateDelegation", null);
__decorate([
    (0, common_1.Delete)('delegations/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "deleteDelegation", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('docType')),
    __param(2, (0, common_1.Query)('docId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "getApprovalHistory", null);
__decorate([
    (0, common_1.Get)('overdue'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkflowController.prototype, "getOverdueInstances", null);
exports.WorkflowController = WorkflowController = __decorate([
    (0, common_1.Controller)('workflow'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [workflow_service_1.WorkflowService])
], WorkflowController);
//# sourceMappingURL=workflow.controller.js.map