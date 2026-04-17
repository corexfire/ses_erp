import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationChannel, NotificationLogStatus, NotificationTemplateStatus, type Prisma } from '../../prisma/generated/client';
import { NotificationQueueService } from './notification.queue.service';
import { NotificationStreamService } from './notification-stream.service';
export type NotificationRecipientInput = {
    userId?: string | null;
    title?: string | null;
    message?: string | null;
    payload?: Prisma.InputJsonValue | Record<string, unknown>;
};
export type TriggerEventInput = {
    tenantId: string;
    actorUserId?: string | null;
    eventKey: string;
    recipients: NotificationRecipientInput[];
    requestedChannels?: NotificationChannel[];
    payload?: Record<string, unknown> | Prisma.InputJsonValue;
};
export declare class NotificationService implements OnModuleInit, OnModuleDestroy {
    private readonly prisma;
    private readonly audit;
    private readonly queueService;
    private readonly streamService;
    private readonly logger;
    private readonly defaultEventKeys;
    private schedulerHandle?;
    constructor(prisma: PrismaService, audit: AuditService, queueService: NotificationQueueService, streamService: NotificationStreamService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    getUserStream(userId: string): import("rxjs").Subject<import("./notification-stream.service").NotificationStreamEvent>;
    listUserNotifications(tenantId: string, userId: string, includeRead?: boolean, take?: number): Promise<{
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: import("prisma/generated").$Enums.NotificationLogStatus;
            channel: import("prisma/generated").$Enums.NotificationChannel;
            title: string | null;
            recipientUserId: string | null;
            templateId: string | null;
            eventKey: string | null;
            message: string;
            payload: Prisma.JsonValue | null;
            externalId: string | null;
            errorMessage: string | null;
            sentAt: Date | null;
            readAt: Date | null;
        }[];
    }>;
    getUnreadCount(tenantId: string, userId: string): Promise<{
        count: number;
    }>;
    markRead(tenantId: string, userId: string, id: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        status: import("prisma/generated").$Enums.NotificationLogStatus;
        channel: import("prisma/generated").$Enums.NotificationChannel;
        title: string | null;
        recipientUserId: string | null;
        templateId: string | null;
        eventKey: string | null;
        message: string;
        payload: Prisma.JsonValue | null;
        externalId: string | null;
        errorMessage: string | null;
        sentAt: Date | null;
        readAt: Date | null;
    }>;
    markAllRead(tenantId: string, userId: string): Promise<{
        ok: boolean;
    }>;
    listPreferences(tenantId: string, userId: string): Promise<{
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            eventKey: string;
            emailEnabled: boolean;
            whatsappEnabled: boolean;
            smsEnabled: boolean;
            inAppEnabled: boolean;
        }[];
    }>;
    upsertPreferences(tenantId: string, userId: string, items: Array<{
        eventKey: string;
        emailEnabled: boolean;
        whatsappEnabled: boolean;
        smsEnabled: boolean;
        inAppEnabled: boolean;
    }>): Promise<{
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            eventKey: string;
            emailEnabled: boolean;
            whatsappEnabled: boolean;
            smsEnabled: boolean;
            inAppEnabled: boolean;
        }[];
    }>;
    listTemplates(tenantId: string): Promise<{
        data: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            key: string;
            updatedAt: Date;
            subject: string | null;
            status: import("prisma/generated").$Enums.NotificationTemplateStatus;
            channel: import("prisma/generated").$Enums.NotificationChannel;
            eventKey: string | null;
            module: string | null;
            body: string;
            variables: Prisma.JsonValue | null;
        }[];
    }>;
    upsertTemplate(tenantId: string, actorUserId: string, input: {
        id?: string;
        key: string;
        name: string;
        module?: string;
        eventKey?: string;
        channel: NotificationChannel;
        subject?: string;
        body: string;
        variables?: Prisma.InputJsonValue | Record<string, unknown>;
        status: NotificationTemplateStatus;
    }): Promise<{
        id: string;
        tenantId: string;
        name: string;
        createdAt: Date;
        key: string;
        updatedAt: Date;
        subject: string | null;
        status: import("prisma/generated").$Enums.NotificationTemplateStatus;
        channel: import("prisma/generated").$Enums.NotificationChannel;
        eventKey: string | null;
        module: string | null;
        body: string;
        variables: Prisma.JsonValue | null;
    }>;
    deleteTemplate(tenantId: string, actorUserId: string, id: string): Promise<{
        ok: boolean;
    }>;
    listChannelConfigs(tenantId: string): Promise<{
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            channel: import("prisma/generated").$Enums.NotificationChannel;
            provider: string | null;
            isEnabled: boolean;
            config: Prisma.JsonValue | null;
        }[];
    }>;
    upsertChannelConfig(tenantId: string, actorUserId: string, input: {
        channel: NotificationChannel;
        provider?: string;
        isEnabled: boolean;
        config?: Prisma.InputJsonValue | Record<string, unknown>;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        channel: import("prisma/generated").$Enums.NotificationChannel;
        provider: string | null;
        isEnabled: boolean;
        config: Prisma.JsonValue | null;
    }>;
    listLogs(tenantId: string, filters?: {
        channel?: NotificationChannel;
        status?: NotificationLogStatus;
    }): Promise<{
        data: ({
            recipient: {
                id: string;
                email: string;
                name: string | null;
            } | null;
            template: {
                name: string;
                key: string;
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: import("prisma/generated").$Enums.NotificationLogStatus;
            channel: import("prisma/generated").$Enums.NotificationChannel;
            title: string | null;
            recipientUserId: string | null;
            templateId: string | null;
            eventKey: string | null;
            message: string;
            payload: Prisma.JsonValue | null;
            externalId: string | null;
            errorMessage: string | null;
            sentAt: Date | null;
            readAt: Date | null;
        })[];
    }>;
    resendLog(tenantId: string, actorUserId: string, id: string): Promise<{
        ok: boolean;
    }>;
    listSchedules(tenantId: string): Promise<{
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("prisma/generated").$Enums.NotificationScheduleStatus;
            channel: import("prisma/generated").$Enums.NotificationChannel | null;
            title: string | null;
            eventKey: string;
            message: string;
            payload: Prisma.JsonValue | null;
            createdById: string | null;
            targetUserId: string | null;
            scheduledFor: Date;
            processedAt: Date | null;
        }[];
    }>;
    createSchedule(tenantId: string, actorUserId: string, input: {
        eventKey: string;
        channel?: NotificationChannel;
        targetUserId?: string;
        title?: string;
        message: string;
        payload?: Prisma.InputJsonValue | Record<string, unknown>;
        scheduledFor: Date;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("prisma/generated").$Enums.NotificationScheduleStatus;
        channel: import("prisma/generated").$Enums.NotificationChannel | null;
        title: string | null;
        eventKey: string;
        message: string;
        payload: Prisma.JsonValue | null;
        createdById: string | null;
        targetUserId: string | null;
        scheduledFor: Date;
        processedAt: Date | null;
    }>;
    triggerEvent(input: TriggerEventInput): Promise<{
        ok: boolean;
        logIds: string[];
    }>;
    processDueSchedules(): Promise<void>;
    processQueuedLog(logId: string): Promise<void>;
    renderPreview(subject: string | null | undefined, body: string, payload?: Record<string, unknown>): {
        subject: string | null;
        body: string | null;
    };
    private renderTemplate;
    private isChannelEnabledByPreference;
    private toJsonValue;
    private toObjectPayload;
    private ensureDefaultPreferences;
    private ensureDefaultChannelConfigs;
}
