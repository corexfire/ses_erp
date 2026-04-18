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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const client_1 = require("../../prisma/generated/client");
const notification_service_1 = require("./notification.service");
class NotificationPreferenceItemDto {
    eventKey;
    emailEnabled;
    whatsappEnabled;
    smsEnabled;
    inAppEnabled;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NotificationPreferenceItemDto.prototype, "eventKey", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationPreferenceItemDto.prototype, "emailEnabled", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationPreferenceItemDto.prototype, "whatsappEnabled", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationPreferenceItemDto.prototype, "smsEnabled", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationPreferenceItemDto.prototype, "inAppEnabled", void 0);
class UpsertPreferencesDto {
    items;
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => NotificationPreferenceItemDto),
    __metadata("design:type", Array)
], UpsertPreferencesDto.prototype, "items", void 0);
class UpsertTemplateDto {
    id;
    key;
    name;
    module;
    eventKey;
    channel;
    subject;
    body;
    variables;
    status;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertTemplateDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertTemplateDto.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertTemplateDto.prototype, "module", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertTemplateDto.prototype, "eventKey", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.NotificationChannel),
    __metadata("design:type", String)
], UpsertTemplateDto.prototype, "channel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertTemplateDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertTemplateDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpsertTemplateDto.prototype, "variables", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.NotificationTemplateStatus),
    __metadata("design:type", String)
], UpsertTemplateDto.prototype, "status", void 0);
class UpsertChannelConfigDto {
    channel;
    provider;
    isEnabled;
    config;
}
__decorate([
    (0, class_validator_1.IsEnum)(client_1.NotificationChannel),
    __metadata("design:type", String)
], UpsertChannelConfigDto.prototype, "channel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertChannelConfigDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpsertChannelConfigDto.prototype, "isEnabled", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpsertChannelConfigDto.prototype, "config", void 0);
class TriggerRecipientDto {
    userId;
    title;
    message;
    payload;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TriggerRecipientDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TriggerRecipientDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TriggerRecipientDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], TriggerRecipientDto.prototype, "payload", void 0);
class TriggerEventDto {
    eventKey;
    recipients;
    requestedChannels;
    payload;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TriggerEventDto.prototype, "eventKey", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TriggerRecipientDto),
    __metadata("design:type", Array)
], TriggerEventDto.prototype, "recipients", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(client_1.NotificationChannel, { each: true }),
    __metadata("design:type", Array)
], TriggerEventDto.prototype, "requestedChannels", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], TriggerEventDto.prototype, "payload", void 0);
class PreviewTemplateDto {
    subject;
    body;
    payload;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreviewTemplateDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreviewTemplateDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], PreviewTemplateDto.prototype, "payload", void 0);
class CreateScheduleDto {
    eventKey;
    channel;
    targetUserId;
    title;
    message;
    payload;
    scheduledFor;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "eventKey", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.NotificationChannel),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "channel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "targetUserId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateScheduleDto.prototype, "payload", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "scheduledFor", void 0);
let NotificationController = class NotificationController {
    notificationService;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async listMine(req, includeRead, take) {
        return this.notificationService.listUserNotifications(req.user.tenantId, req.user.id, includeRead !== 'false', Number(take ?? 20));
    }
    async unreadCount(req) {
        return this.notificationService.getUnreadCount(req.user.tenantId, req.user.id);
    }
    async markRead(req, id) {
        return this.notificationService.markRead(req.user.tenantId, req.user.id, id);
    }
    async markAllRead(req) {
        return this.notificationService.markAllRead(req.user.tenantId, req.user.id);
    }
    async preferences(req) {
        return this.notificationService.listPreferences(req.user.tenantId, req.user.id);
    }
    async updatePreferences(req, body) {
        return this.notificationService.upsertPreferences(req.user.tenantId, req.user.id, body.items);
    }
    stream(req) {
        return (0, rxjs_1.merge)(this.notificationService.getUserStream(req.user.id).pipe((0, rxjs_1.map)((event) => ({ type: event.type, data: event.data }))), (0, rxjs_1.interval)(30_000).pipe((0, rxjs_1.map)(() => ({ type: 'heartbeat', data: { ts: new Date().toISOString() } }))));
    }
    async listTemplates(req) {
        return this.notificationService.listTemplates(req.user.tenantId);
    }
    async createTemplate(req, body) {
        return this.notificationService.upsertTemplate(req.user.tenantId, req.user.id, body);
    }
    async updateTemplate(req, id, body) {
        return this.notificationService.upsertTemplate(req.user.tenantId, req.user.id, { ...body, id });
    }
    async deleteTemplate(req, id) {
        return this.notificationService.deleteTemplate(req.user.tenantId, req.user.id, id);
    }
    previewTemplate(body) {
        return this.notificationService.renderPreview(body.subject, body.body, body.payload);
    }
    async listChannelConfigs(req) {
        return this.notificationService.listChannelConfigs(req.user.tenantId);
    }
    async upsertChannelConfig(req, channel, body) {
        return this.notificationService.upsertChannelConfig(req.user.tenantId, req.user.id, {
            ...body,
            channel,
        });
    }
    async listLogs(req, channel, status) {
        return this.notificationService.listLogs(req.user.tenantId, { channel, status });
    }
    async resend(req, id) {
        return this.notificationService.resendLog(req.user.tenantId, req.user.id, id);
    }
    async schedules(req) {
        return this.notificationService.listSchedules(req.user.tenantId);
    }
    async createSchedule(req, body) {
        return this.notificationService.createSchedule(req.user.tenantId, req.user.id, {
            ...body,
            scheduledFor: new Date(body.scheduledFor),
        });
    }
    async trigger(req, body) {
        return this.notificationService.triggerEvent({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            eventKey: body.eventKey,
            recipients: body.recipients,
            requestedChannels: body.requestedChannels,
            payload: body.payload,
        });
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('notification.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('includeRead')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "listMine", null);
__decorate([
    (0, common_1.Get)('unread-count'),
    (0, permissions_decorator_1.RequirePermissions)('notification.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "unreadCount", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    (0, permissions_decorator_1.RequirePermissions)('notification.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markRead", null);
__decorate([
    (0, common_1.Post)('read-all'),
    (0, permissions_decorator_1.RequirePermissions)('notification.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAllRead", null);
__decorate([
    (0, common_1.Get)('preferences'),
    (0, permissions_decorator_1.RequirePermissions)('notification.preference.manage'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "preferences", null);
__decorate([
    (0, common_1.Put)('preferences'),
    (0, permissions_decorator_1.RequirePermissions)('notification.preference.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpsertPreferencesDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "updatePreferences", null);
__decorate([
    (0, common_1.Sse)('stream'),
    (0, permissions_decorator_1.RequirePermissions)('notification.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "stream", null);
__decorate([
    (0, common_1.Get)('admin/templates'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "listTemplates", null);
__decorate([
    (0, common_1.Post)('admin/templates'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpsertTemplateDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Patch)('admin/templates/:id'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpsertTemplateDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)('admin/templates/:id'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "deleteTemplate", null);
__decorate([
    (0, common_1.Post)('admin/templates/preview'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PreviewTemplateDto]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "previewTemplate", null);
__decorate([
    (0, common_1.Get)('admin/channel-configs'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "listChannelConfigs", null);
__decorate([
    (0, common_1.Put)('admin/channel-configs/:channel'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('channel')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpsertChannelConfigDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "upsertChannelConfig", null);
__decorate([
    (0, common_1.Get)('admin/logs'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('channel')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "listLogs", null);
__decorate([
    (0, common_1.Post)('admin/logs/:id/resend'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "resend", null);
__decorate([
    (0, common_1.Get)('admin/schedules'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "schedules", null);
__decorate([
    (0, common_1.Post)('admin/schedules'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateScheduleDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "createSchedule", null);
__decorate([
    (0, common_1.Post)('admin/trigger'),
    (0, permissions_decorator_1.RequirePermissions)('notification.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, TriggerEventDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "trigger", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map