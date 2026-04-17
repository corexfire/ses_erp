import { Injectable, Logger, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  NotificationChannel,
  NotificationLogStatus,
  NotificationScheduleStatus,
  NotificationTemplateStatus,
  type Prisma,
} from '../../prisma/generated/client';
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

@Injectable()
export class NotificationService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NotificationService.name);
  private readonly defaultEventKeys = [
    'approval.pending',
    'invoice.overdue',
    'contract.expiring',
    'task.deadline',
    'system.announcement',
  ] as const;
  private schedulerHandle?: NodeJS.Timeout;

  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly queueService: NotificationQueueService,
    private readonly streamService: NotificationStreamService,
  ) {}

  onModuleInit() {
    this.queueService.setProcessor(async ({ logId }) => {
      await this.processQueuedLog(logId);
    });

    this.schedulerHandle = setInterval(() => {
      void this.processDueSchedules();
    }, 30_000);
  }

  onModuleDestroy() {
    if (this.schedulerHandle) clearInterval(this.schedulerHandle);
  }

  getUserStream(userId: string) {
    return this.streamService.getStream(userId);
  }

  async listUserNotifications(tenantId: string, userId: string, includeRead = true, take = 20) {
    const logs = await this.prisma.notificationLog.findMany({
      where: {
        tenantId,
        recipientUserId: userId,
        channel: NotificationChannel.IN_APP,
        ...(includeRead ? {} : { readAt: null }),
      },
      orderBy: { createdAt: 'desc' },
      take,
    });
    return { data: logs };
  }

  async getUnreadCount(tenantId: string, userId: string) {
    const count = await this.prisma.notificationLog.count({
      where: {
        tenantId,
        recipientUserId: userId,
        channel: NotificationChannel.IN_APP,
        readAt: null,
      },
    });
    return { count };
  }

  async markRead(tenantId: string, userId: string, id: string) {
    const existing = await this.prisma.notificationLog.findFirst({
      where: { id, tenantId, recipientUserId: userId, channel: NotificationChannel.IN_APP },
    });
    if (!existing) throw new NotFoundException('Notification not found');

    return this.prisma.notificationLog.update({
      where: { id },
      data: { readAt: new Date(), status: NotificationLogStatus.READ },
    });
  }

  async markAllRead(tenantId: string, userId: string) {
    await this.prisma.notificationLog.updateMany({
      where: {
        tenantId,
        recipientUserId: userId,
        channel: NotificationChannel.IN_APP,
        readAt: null,
      },
      data: { readAt: new Date(), status: NotificationLogStatus.READ },
    });

    this.streamService.publish(userId, {
      type: 'notification.read_all',
      data: { unreadCount: 0 },
    });

    return { ok: true };
  }

  async listPreferences(tenantId: string, userId: string) {
    await this.ensureDefaultPreferences(tenantId, userId);
    const preferences = await this.prisma.notificationPreference.findMany({
      where: { tenantId, userId },
      orderBy: { eventKey: 'asc' },
    });
    return { data: preferences };
  }

  async upsertPreferences(
    tenantId: string,
    userId: string,
    items: Array<{
      eventKey: string;
      emailEnabled: boolean;
      whatsappEnabled: boolean;
      smsEnabled: boolean;
      inAppEnabled: boolean;
    }>,
  ) {
    for (const item of items) {
      await this.prisma.notificationPreference.upsert({
        where: { userId_eventKey: { userId, eventKey: item.eventKey } },
        update: item,
        create: { tenantId, userId, ...item },
      });
    }

    return this.listPreferences(tenantId, userId);
  }

  async listTemplates(tenantId: string) {
    await this.ensureDefaultChannelConfigs(tenantId);
    const templates = await this.prisma.notificationTemplate.findMany({
      where: { tenantId },
      orderBy: [{ key: 'asc' }, { channel: 'asc' }],
    });
    return { data: templates };
  }

  async upsertTemplate(
    tenantId: string,
    actorUserId: string,
    input: {
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
    },
  ) {
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

  async deleteTemplate(tenantId: string, actorUserId: string, id: string) {
    const template = await this.prisma.notificationTemplate.findFirst({ where: { id, tenantId } });
    if (!template) throw new NotFoundException('Template not found');

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

  async listChannelConfigs(tenantId: string) {
    await this.ensureDefaultChannelConfigs(tenantId);
    const configs = await this.prisma.notificationChannelConfig.findMany({
      where: { tenantId },
      orderBy: { channel: 'asc' },
    });
    return { data: configs };
  }

  async upsertChannelConfig(
    tenantId: string,
    actorUserId: string,
    input: {
      channel: NotificationChannel;
      provider?: string;
      isEnabled: boolean;
      config?: Prisma.InputJsonValue | Record<string, unknown>;
    },
  ) {
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

  async listLogs(tenantId: string, filters?: { channel?: NotificationChannel; status?: NotificationLogStatus }) {
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

  async resendLog(tenantId: string, actorUserId: string, id: string) {
    const log = await this.prisma.notificationLog.findFirst({ where: { id, tenantId } });
    if (!log) throw new NotFoundException('Notification log not found');

    await this.prisma.notificationLog.update({
      where: { id },
      data: { status: NotificationLogStatus.QUEUED, errorMessage: null },
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

  async listSchedules(tenantId: string) {
    const schedules = await this.prisma.notificationSchedule.findMany({
      where: { tenantId },
      orderBy: { scheduledFor: 'asc' },
      take: 200,
    });
    return { data: schedules };
  }

  async createSchedule(
    tenantId: string,
    actorUserId: string,
    input: {
      eventKey: string;
      channel?: NotificationChannel;
      targetUserId?: string;
      title?: string;
      message: string;
      payload?: Prisma.InputJsonValue | Record<string, unknown>;
      scheduledFor: Date;
    },
  ) {
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

  async triggerEvent(input: TriggerEventInput) {
    const templates = await this.prisma.notificationTemplate.findMany({
      where: {
        tenantId: input.tenantId,
        eventKey: input.eventKey,
        status: NotificationTemplateStatus.ACTIVE,
      },
    });

    const channelConfigs = await this.prisma.notificationChannelConfig.findMany({
      where: { tenantId: input.tenantId, isEnabled: true },
    });
    const enabledChannels = new Set<NotificationChannel>([NotificationChannel.IN_APP]);
    for (const config of channelConfigs) enabledChannels.add(config.channel);

    const createdLogs: string[] = [];

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
          : [NotificationChannel.IN_APP];

      for (const channel of candidateChannels) {
        if (!enabledChannels.has(channel)) continue;
        if (!this.isChannelEnabledByPreference(channel, preference)) continue;

        const template = templates.find((item) => item.channel === channel);
        const title =
          recipient.title ?? this.renderTemplate(template?.subject ?? null, this.toObjectPayload(input.payload));
        const message =
          recipient.message ??
          this.renderTemplate(
            template?.body ?? `Notification for ${input.eventKey}`,
            this.toObjectPayload(input.payload),
          ) ??
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
            payload: (recipient.payload ?? input.payload) as Prisma.InputJsonValue,
            status: NotificationLogStatus.QUEUED,
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
        status: NotificationScheduleStatus.ACTIVE,
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
          payload: (schedule.payload as Record<string, unknown> | null) ?? undefined,
          recipients: [
            {
              userId: schedule.targetUserId,
              title: schedule.title,
              message: schedule.message,
              payload: schedule.payload as Prisma.InputJsonValue,
            },
          ],
        });

        await this.prisma.notificationSchedule.update({
          where: { id: schedule.id },
          data: {
            status: NotificationScheduleStatus.COMPLETED,
            processedAt: new Date(),
          },
        });
      } catch (error: any) {
        this.logger.error(`Failed to process notification schedule ${schedule.id}`, error?.stack);
        await this.prisma.notificationSchedule.update({
          where: { id: schedule.id },
          data: { status: NotificationScheduleStatus.FAILED },
        });
      }
    }
  }

  async processQueuedLog(logId: string) {
    const log = await this.prisma.notificationLog.findUnique({ where: { id: logId } });
    if (!log) return;

    try {
      const sentAt = new Date();
      const nextStatus = log.channel === NotificationChannel.IN_APP ? NotificationLogStatus.SENT : NotificationLogStatus.SENT;

      await this.prisma.notificationLog.update({
        where: { id: logId },
        data: {
          status: nextStatus,
          sentAt,
          externalId:
            log.channel === NotificationChannel.IN_APP ? null : `mock-${log.channel.toLowerCase()}-${log.id.slice(0, 8)}`,
        },
      });

      if (log.channel === NotificationChannel.IN_APP && log.recipientUserId) {
        const unreadCount = await this.prisma.notificationLog.count({
          where: {
            tenantId: log.tenantId,
            recipientUserId: log.recipientUserId,
            channel: NotificationChannel.IN_APP,
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
    } catch (error: any) {
      await this.prisma.notificationLog.update({
        where: { id: logId },
        data: {
          status: NotificationLogStatus.FAILED,
          errorMessage: error?.message ?? 'Unknown dispatch error',
        },
      });
      throw error;
    }
  }

  renderPreview(subject: string | null | undefined, body: string, payload?: Record<string, unknown>) {
    return {
      subject: this.renderTemplate(subject ?? null, payload),
      body: this.renderTemplate(body, payload),
    };
  }

  private renderTemplate(template: string | null | undefined, payload?: Record<string, unknown>) {
    if (!template) return template ?? null;
    return template.replace(/{{\s*([\w.]+)\s*}}/g, (_, key: string) => {
      const value = key.split('.').reduce<unknown>((acc, part) => {
        if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
          return (acc as Record<string, unknown>)[part];
        }
        return undefined;
      }, payload as unknown);
      return value == null ? '' : String(value);
    });
  }

  private isChannelEnabledByPreference(
    channel: NotificationChannel,
    preference?: {
      emailEnabled: boolean;
      whatsappEnabled: boolean;
      smsEnabled: boolean;
      inAppEnabled: boolean;
    },
  ) {
    if (!preference) return true;

    if (channel === NotificationChannel.EMAIL) return preference.emailEnabled;
    if (channel === NotificationChannel.WHATSAPP) return preference.whatsappEnabled;
    if (channel === NotificationChannel.SMS) return preference.smsEnabled;
    return preference.inAppEnabled;
  }

  private toJsonValue(value?: Prisma.InputJsonValue | Record<string, unknown>) {
    if (value == null) return undefined;
    return value as Prisma.InputJsonValue;
  }

  private toObjectPayload(value?: Prisma.InputJsonValue | Record<string, unknown>) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
    return undefined;
  }

  private async ensureDefaultPreferences(tenantId: string, userId: string) {
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

  private async ensureDefaultChannelConfigs(tenantId: string) {
    await this.prisma.notificationChannelConfig.upsert({
      where: { tenantId_channel: { tenantId, channel: NotificationChannel.IN_APP } },
      update: {},
      create: {
        tenantId,
        channel: NotificationChannel.IN_APP,
        provider: 'internal',
        isEnabled: true,
        config: {},
      },
    });
  }
}
