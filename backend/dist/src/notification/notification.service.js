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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("../../prisma/generated/client");
const notification_queue_service_1 = require("./notification.queue.service");
const notification_stream_service_1 = require("./notification-stream.service");
let NotificationService = NotificationService_1 = class NotificationService {
    prisma;
    audit;
    queueService;
    streamService;
    logger = new common_1.Logger(NotificationService_1.name);
    defaultEventKeys = [
        'approval.pending',
        'invoice.overdue',
        'contract.expiring',
        'task.deadline',
        'system.announcement',
    ];
    schedulerHandle;
    constructor(prisma, audit, queueService, streamService) {
        this.prisma = prisma;
        this.audit = audit;
        this.queueService = queueService;
        this.streamService = streamService;
    }
    onModuleInit() {
        this.queueService.setProcessor(async ({ logId }) => {
            await this.processQueuedLog(logId);
        });
        this.schedulerHandle = setInterval(() => {
            void this.processDueSchedules();
        }, 30_000);
    }
    onModuleDestroy() {
        if (this.schedulerHandle)
            clearInterval(this.schedulerHandle);
    }
    getUserStream(userId) {
        return this.streamService.getStream(userId);
    }
    async listUserNotifications(tenantId, userId, includeRead = true, take = 20) {
        const logs = await this.prisma.notificationLog.findMany({
            where: {
                tenantId,
                recipientUserId: userId,
                channel: client_1.NotificationChannel.IN_APP,
                ...(includeRead ? {} : { readAt: null }),
            },
            orderBy: { createdAt: 'desc' },
            take,
        });
        return { data: logs };
    }
    async getUnreadCount(tenantId, userId) {
        const count = await this.prisma.notificationLog.count({
            where: {
                tenantId,
                recipientUserId: userId,
                channel: client_1.NotificationChannel.IN_APP,
                readAt: null,
            },
        });
        return { count };
    }
    async markRead(tenantId, userId, id) {
        const existing = await this.prisma.notificationLog.findFirst({
            where: { id, tenantId, recipientUserId: userId, channel: client_1.NotificationChannel.IN_APP },
        });
        if (!existing)
            throw new common_1.NotFoundException('Notification not found');
        return this.prisma.notificationLog.update({
            where: { id },
            data: { readAt: new Date(), status: client_1.NotificationLogStatus.READ },
        });
    }
    async markAllRead(tenantId, userId) {
        await this.prisma.notificationLog.updateMany({
            where: {
                tenantId,
                recipientUserId: userId,
                channel: client_1.NotificationChannel.IN_APP,
                readAt: null,
            },
            data: { readAt: new Date(), status: client_1.NotificationLogStatus.READ },
        });
        this.streamService.publish(userId, {
            type: 'notification.read_all',
            data: { unreadCount: 0 },
        });
        return { ok: true };
    }
    async listPreferences(tenantId, userId) {
        await this.ensureDefaultPreferences(tenantId, userId);
        const preferences = await this.prisma.notificationPreference.findMany({
            where: { tenantId, userId },
            orderBy: { eventKey: 'asc' },
        });
        return { data: preferences };
    }
    async upsertPreferences(tenantId, userId, items) {
        for (const item of items) {
            await this.prisma.notificationPreference.upsert({
                where: { userId_eventKey: { userId, eventKey: item.eventKey } },
                update: item,
                create: { tenantId, userId, ...item },
            });
        }
        return this.listPreferences(tenantId, userId);
    }
    async listTemplates(tenantId) {
        await this.ensureDefaultChannelConfigs(tenantId);
        const templates = await this.prisma.notificationTemplate.findMany({
            where: { tenantId },
            orderBy: [{ key: 'asc' }, { channel: 'asc' }],
        });
        return { data: templates };
    }
    async upsertTemplate(tenantId, actorUserId, input) {
        const { id, ...templateData } = input;
        const template = id
            ? await this.prisma.notificationTemplate.update({
                where: { id },
                data: {
                    ...templateData,
                    variables: this.toJsonValue(templateData.variables),
                },
            })
            : await this.prisma.notificationTemplate.create({
                data: {
                    tenantId,
                    ...templateData,
                    variables: this.toJsonValue(templateData.variables),
                },
            });
        await this.audit.log({
            tenantId,
            actorUserId,
            action: input.id ? 'update' : 'create',
            entity: 'NotificationTemplate',
            entityId: template.id,
            metadata: { key: template.key, channel: template.channel },
        });
        return template;
    }
    async deleteTemplate(tenantId, actorUserId, id) {
        const template = await this.prisma.notificationTemplate.findFirst({ where: { id, tenantId } });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        await this.prisma.notificationTemplate.delete({ where: { id } });
        await this.audit.log({
            tenantId,
            actorUserId,
            action: 'delete',
            entity: 'NotificationTemplate',
            entityId: id,
            metadata: { key: template.key, channel: template.channel },
        });
        return { ok: true };
    }
    async listChannelConfigs(tenantId) {
        await this.ensureDefaultChannelConfigs(tenantId);
        const configs = await this.prisma.notificationChannelConfig.findMany({
            where: { tenantId },
            orderBy: { channel: 'asc' },
        });
        return { data: configs };
    }
    async upsertChannelConfig(tenantId, actorUserId, input) {
        const record = await this.prisma.notificationChannelConfig.upsert({
            where: { tenantId_channel: { tenantId, channel: input.channel } },
            update: {
                ...input,
                config: this.toJsonValue(input.config),
            },
            create: {
                tenantId,
                ...input,
                config: this.toJsonValue(input.config),
            },
        });
        await this.audit.log({
            tenantId,
            actorUserId,
            action: 'upsert',
            entity: 'NotificationChannelConfig',
            entityId: record.id,
            metadata: { channel: record.channel, isEnabled: record.isEnabled },
        });
        return record;
    }
    async listLogs(tenantId, filters) {
        const logs = await this.prisma.notificationLog.findMany({
            where: {
                tenantId,
                ...(filters?.channel ? { channel: filters.channel } : {}),
                ...(filters?.status ? { status: filters.status } : {}),
            },
            orderBy: { createdAt: 'desc' },
            take: 200,
            include: {
                recipient: { select: { id: true, email: true, name: true } },
                template: { select: { key: true, name: true } },
            },
        });
        return { data: logs };
    }
    async resendLog(tenantId, actorUserId, id) {
        const log = await this.prisma.notificationLog.findFirst({ where: { id, tenantId } });
        if (!log)
            throw new common_1.NotFoundException('Notification log not found');
        await this.prisma.notificationLog.update({
            where: { id },
            data: { status: client_1.NotificationLogStatus.QUEUED, errorMessage: null },
        });
        await this.queueService.enqueue({ logId: id });
        await this.audit.log({
            tenantId,
            actorUserId,
            action: 'resend',
            entity: 'NotificationLog',
            entityId: id,
        });
        return { ok: true };
    }
    async listSchedules(tenantId) {
        const schedules = await this.prisma.notificationSchedule.findMany({
            where: { tenantId },
            orderBy: { scheduledFor: 'asc' },
            take: 200,
        });
        return { data: schedules };
    }
    async createSchedule(tenantId, actorUserId, input) {
        const schedule = await this.prisma.notificationSchedule.create({
            data: {
                tenantId,
                createdById: actorUserId,
                ...input,
                payload: this.toJsonValue(input.payload),
            },
        });
        await this.audit.log({
            tenantId,
            actorUserId,
            action: 'create',
            entity: 'NotificationSchedule',
            entityId: schedule.id,
            metadata: { eventKey: schedule.eventKey, scheduledFor: schedule.scheduledFor.toISOString() },
        });
        return schedule;
    }
    async triggerEvent(input) {
        const templates = await this.prisma.notificationTemplate.findMany({
            where: {
                tenantId: input.tenantId,
                eventKey: input.eventKey,
                status: client_1.NotificationTemplateStatus.ACTIVE,
            },
        });
        const channelConfigs = await this.prisma.notificationChannelConfig.findMany({
            where: { tenantId: input.tenantId, isEnabled: true },
        });
        const enabledChannels = new Set([client_1.NotificationChannel.IN_APP]);
        for (const config of channelConfigs)
            enabledChannels.add(config.channel);
        const createdLogs = [];
        for (const recipient of input.recipients) {
            const preferences = recipient.userId
                ? await this.prisma.notificationPreference.findMany({
                    where: { tenantId: input.tenantId, userId: recipient.userId, eventKey: input.eventKey },
                })
                : [];
            const preference = preferences[0];
            const candidateChannels = input.requestedChannels?.length
                ? input.requestedChannels
                : templates.length > 0
                    ? templates.map((template) => template.channel)
                    : [client_1.NotificationChannel.IN_APP];
            for (const channel of candidateChannels) {
                if (!enabledChannels.has(channel))
                    continue;
                if (!this.isChannelEnabledByPreference(channel, preference))
                    continue;
                const template = templates.find((item) => item.channel === channel);
                const title = recipient.title ?? this.renderTemplate(template?.subject ?? null, this.toObjectPayload(input.payload));
                const message = recipient.message ??
                    this.renderTemplate(template?.body ?? `Notification for ${input.eventKey}`, this.toObjectPayload(input.payload)) ??
                    `Notification for ${input.eventKey}`;
                const log = await this.prisma.notificationLog.create({
                    data: {
                        tenantId: input.tenantId,
                        recipientUserId: recipient.userId ?? null,
                        templateId: template?.id,
                        channel,
                        eventKey: input.eventKey,
                        title,
                        message,
                        payload: (recipient.payload ?? input.payload),
                        status: client_1.NotificationLogStatus.QUEUED,
                    },
                });
                createdLogs.push(log.id);
                await this.queueService.enqueue({ logId: log.id });
            }
        }
        if (input.actorUserId) {
            await this.audit.log({
                tenantId: input.tenantId,
                actorUserId: input.actorUserId,
                action: 'trigger',
                entity: 'NotificationEvent',
                metadata: { eventKey: input.eventKey, count: createdLogs.length },
            });
        }
        return { ok: true, logIds: createdLogs };
    }
    async processDueSchedules() {
        const due = await this.prisma.notificationSchedule.findMany({
            where: {
                status: client_1.NotificationScheduleStatus.ACTIVE,
                scheduledFor: { lte: new Date() },
            },
            take: 50,
        });
        for (const schedule of due) {
            try {
                await this.triggerEvent({
                    tenantId: schedule.tenantId,
                    actorUserId: schedule.createdById,
                    eventKey: schedule.eventKey,
                    requestedChannels: schedule.channel ? [schedule.channel] : undefined,
                    payload: schedule.payload ?? undefined,
                    recipients: [
                        {
                            userId: schedule.targetUserId,
                            title: schedule.title,
                            message: schedule.message,
                            payload: schedule.payload,
                        },
                    ],
                });
                await this.prisma.notificationSchedule.update({
                    where: { id: schedule.id },
                    data: {
                        status: client_1.NotificationScheduleStatus.COMPLETED,
                        processedAt: new Date(),
                    },
                });
            }
            catch (error) {
                this.logger.error(`Failed to process notification schedule ${schedule.id}`, error?.stack);
                await this.prisma.notificationSchedule.update({
                    where: { id: schedule.id },
                    data: { status: client_1.NotificationScheduleStatus.FAILED },
                });
            }
        }
    }
    async processQueuedLog(logId) {
        const log = await this.prisma.notificationLog.findUnique({ where: { id: logId } });
        if (!log)
            return;
        try {
            const sentAt = new Date();
            const nextStatus = log.channel === client_1.NotificationChannel.IN_APP ? client_1.NotificationLogStatus.SENT : client_1.NotificationLogStatus.SENT;
            await this.prisma.notificationLog.update({
                where: { id: logId },
                data: {
                    status: nextStatus,
                    sentAt,
                    externalId: log.channel === client_1.NotificationChannel.IN_APP ? null : `mock-${log.channel.toLowerCase()}-${log.id.slice(0, 8)}`,
                },
            });
            if (log.channel === client_1.NotificationChannel.IN_APP && log.recipientUserId) {
                const unreadCount = await this.prisma.notificationLog.count({
                    where: {
                        tenantId: log.tenantId,
                        recipientUserId: log.recipientUserId,
                        channel: client_1.NotificationChannel.IN_APP,
                        readAt: null,
                    },
                });
                this.streamService.publish(log.recipientUserId, {
                    type: 'notification.new',
                    data: {
                        id: log.id,
                        title: log.title,
                        message: log.message,
                        createdAt: log.createdAt.toISOString(),
                        unreadCount,
                    },
                });
            }
        }
        catch (error) {
            await this.prisma.notificationLog.update({
                where: { id: logId },
                data: {
                    status: client_1.NotificationLogStatus.FAILED,
                    errorMessage: error?.message ?? 'Unknown dispatch error',
                },
            });
            throw error;
        }
    }
    renderPreview(subject, body, payload) {
        return {
            subject: this.renderTemplate(subject ?? null, payload),
            body: this.renderTemplate(body, payload),
        };
    }
    renderTemplate(template, payload) {
        if (!template)
            return template ?? null;
        return template.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => {
            const value = key.split('.').reduce((acc, part) => {
                if (acc && typeof acc === 'object' && part in acc) {
                    return acc[part];
                }
                return undefined;
            }, payload);
            return value == null ? '' : String(value);
        });
    }
    isChannelEnabledByPreference(channel, preference) {
        if (!preference)
            return true;
        if (channel === client_1.NotificationChannel.EMAIL)
            return preference.emailEnabled;
        if (channel === client_1.NotificationChannel.WHATSAPP)
            return preference.whatsappEnabled;
        if (channel === client_1.NotificationChannel.SMS)
            return preference.smsEnabled;
        return preference.inAppEnabled;
    }
    toJsonValue(value) {
        if (value == null)
            return undefined;
        return value;
    }
    toObjectPayload(value) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return value;
        }
        return undefined;
    }
    async ensureDefaultPreferences(tenantId, userId) {
        for (const eventKey of this.defaultEventKeys) {
            await this.prisma.notificationPreference.upsert({
                where: { userId_eventKey: { userId, eventKey } },
                update: {},
                create: {
                    tenantId,
                    userId,
                    eventKey,
                    emailEnabled: true,
                    whatsappEnabled: false,
                    smsEnabled: false,
                    inAppEnabled: true,
                },
            });
        }
    }
    async ensureDefaultChannelConfigs(tenantId) {
        await this.prisma.notificationChannelConfig.upsert({
            where: { tenantId_channel: { tenantId, channel: client_1.NotificationChannel.IN_APP } },
            update: {},
            create: {
                tenantId,
                channel: client_1.NotificationChannel.IN_APP,
                provider: 'internal',
                isEnabled: true,
                config: {},
            },
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService,
        notification_queue_service_1.NotificationQueueService,
        notification_stream_service_1.NotificationStreamService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map