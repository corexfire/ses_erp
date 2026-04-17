import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { NotificationChannel, NotificationLogStatus, NotificationTemplateStatus } from '../../prisma/generated/client';
import { NotificationService } from './notification.service';
declare class NotificationPreferenceItemDto {
    eventKey: string;
    emailEnabled: boolean;
    whatsappEnabled: boolean;
    smsEnabled: boolean;
    inAppEnabled: boolean;
}
declare class UpsertPreferencesDto {
    items: NotificationPreferenceItemDto[];
}
declare class UpsertTemplateDto {
    id?: string;
    key: string;
    name: string;
    module?: string;
    eventKey?: string;
    channel: NotificationChannel;
    subject?: string;
    body: string;
    variables?: Record<string, unknown>;
    status: NotificationTemplateStatus;
}
declare class UpsertChannelConfigDto {
    channel: NotificationChannel;
    provider?: string;
    isEnabled: boolean;
    config?: Record<string, unknown>;
}
declare class TriggerRecipientDto {
    userId?: string;
    title?: string;
    message?: string;
    payload?: Record<string, unknown>;
}
declare class TriggerEventDto {
    eventKey: string;
    recipients: TriggerRecipientDto[];
    requestedChannels?: NotificationChannel[];
    payload?: Record<string, unknown>;
}
declare class PreviewTemplateDto {
    subject?: string;
    body: string;
    payload?: Record<string, unknown>;
}
declare class CreateScheduleDto {
    eventKey: string;
    channel?: NotificationChannel;
    targetUserId?: string;
    title?: string;
    message: string;
    payload?: Record<string, unknown>;
    scheduledFor: string;
}
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    listMine(req: FastifyRequest & {
        user: AuthUser;
    }, includeRead?: string, take?: string): Promise<{
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
            payload: import("prisma/generated/runtime/client").JsonValue | null;
            externalId: string | null;
            errorMessage: string | null;
            sentAt: Date | null;
            readAt: Date | null;
        }[];
    }>;
    unreadCount(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        count: number;
    }>;
    markRead(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
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
        payload: import("prisma/generated/runtime/client").JsonValue | null;
        externalId: string | null;
        errorMessage: string | null;
        sentAt: Date | null;
        readAt: Date | null;
    }>;
    markAllRead(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        ok: boolean;
    }>;
    preferences(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    updatePreferences(req: FastifyRequest & {
        user: AuthUser;
    }, body: UpsertPreferencesDto): Promise<{
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
    stream(req: FastifyRequest & {
        user: AuthUser;
    }): import("rxjs").Observable<{
        type: string;
        data: Record<string, unknown>;
    } | {
        type: string;
        data: {
            ts: string;
        };
    }>;
    listTemplates(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
            variables: import("prisma/generated/runtime/client").JsonValue | null;
        }[];
    }>;
    createTemplate(req: FastifyRequest & {
        user: AuthUser;
    }, body: UpsertTemplateDto): Promise<{
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
        variables: import("prisma/generated/runtime/client").JsonValue | null;
    }>;
    updateTemplate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpsertTemplateDto): Promise<{
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
        variables: import("prisma/generated/runtime/client").JsonValue | null;
    }>;
    deleteTemplate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        ok: boolean;
    }>;
    previewTemplate(body: PreviewTemplateDto): {
        subject: string | null;
        body: string | null;
    };
    listChannelConfigs(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            channel: import("prisma/generated").$Enums.NotificationChannel;
            provider: string | null;
            isEnabled: boolean;
            config: import("prisma/generated/runtime/client").JsonValue | null;
        }[];
    }>;
    upsertChannelConfig(req: FastifyRequest & {
        user: AuthUser;
    }, channel: NotificationChannel, body: UpsertChannelConfigDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        channel: import("prisma/generated").$Enums.NotificationChannel;
        provider: string | null;
        isEnabled: boolean;
        config: import("prisma/generated/runtime/client").JsonValue | null;
    }>;
    listLogs(req: FastifyRequest & {
        user: AuthUser;
    }, channel?: NotificationChannel, status?: NotificationLogStatus): Promise<{
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
            payload: import("prisma/generated/runtime/client").JsonValue | null;
            externalId: string | null;
            errorMessage: string | null;
            sentAt: Date | null;
            readAt: Date | null;
        })[];
    }>;
    resend(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        ok: boolean;
    }>;
    schedules(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
            payload: import("prisma/generated/runtime/client").JsonValue | null;
            createdById: string | null;
            targetUserId: string | null;
            scheduledFor: Date;
            processedAt: Date | null;
        }[];
    }>;
    createSchedule(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateScheduleDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("prisma/generated").$Enums.NotificationScheduleStatus;
        channel: import("prisma/generated").$Enums.NotificationChannel | null;
        title: string | null;
        eventKey: string;
        message: string;
        payload: import("prisma/generated/runtime/client").JsonValue | null;
        createdById: string | null;
        targetUserId: string | null;
        scheduledFor: Date;
        processedAt: Date | null;
    }>;
    trigger(req: FastifyRequest & {
        user: AuthUser;
    }, body: TriggerEventDto): Promise<{
        ok: boolean;
        logIds: string[];
    }>;
}
export {};
