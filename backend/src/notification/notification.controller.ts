import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { interval, map, merge } from 'rxjs';
import type { FastifyRequest } from 'fastify';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import {
  NotificationChannel,
  NotificationLogStatus,
  NotificationTemplateStatus,
} from '../../prisma/generated/client';
import { NotificationService } from './notification.service';

class NotificationPreferenceItemDto {
  @IsString()
  @IsNotEmpty()
  eventKey!: string;

  @IsBoolean()
  emailEnabled!: boolean;

  @IsBoolean()
  whatsappEnabled!: boolean;

  @IsBoolean()
  smsEnabled!: boolean;

  @IsBoolean()
  inAppEnabled!: boolean;
}

class UpsertPreferencesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NotificationPreferenceItemDto)
  items!: NotificationPreferenceItemDto[];
}

class UpsertTemplateDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  key!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  module?: string;

  @IsOptional()
  @IsString()
  eventKey?: string;

  @IsEnum(NotificationChannel)
  channel!: NotificationChannel;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsString()
  body!: string;

  @IsOptional()
  @IsObject()
  variables?: Record<string, unknown>;

  @IsEnum(NotificationTemplateStatus)
  status!: NotificationTemplateStatus;
}

class UpsertChannelConfigDto {
  @IsEnum(NotificationChannel)
  channel!: NotificationChannel;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsBoolean()
  isEnabled!: boolean;

  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;
}

class TriggerRecipientDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}

class TriggerEventDto {
  @IsString()
  @IsNotEmpty()
  eventKey!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TriggerRecipientDto)
  recipients!: TriggerRecipientDto[];

  @IsOptional()
  @IsArray()
  @IsEnum(NotificationChannel, { each: true })
  requestedChannels?: NotificationChannel[];

  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}

class PreviewTemplateDto {
  @IsOptional()
  @IsString()
  subject?: string;

  @IsString()
  body!: string;

  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}

class CreateScheduleDto {
  @IsString()
  eventKey!: string;

  @IsOptional()
  @IsEnum(NotificationChannel)
  channel?: NotificationChannel;

  @IsOptional()
  @IsString()
  targetUserId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  message!: string;

  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;

  @IsDateString()
  scheduledFor!: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @RequirePermissions('notification.read')
  async listMine(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('includeRead') includeRead?: string,
    @Query('take') take?: string,
  ) {
    return this.notificationService.listUserNotifications(
      req.user.tenantId,
      req.user.id,
      includeRead !== 'false',
      Number(take ?? 20),
    );
  }

  @Get('unread-count')
  @RequirePermissions('notification.read')
  async unreadCount(@Req() req: FastifyRequest & { user: AuthUser }) {
    return this.notificationService.getUnreadCount(req.user.tenantId, req.user.id);
  }

  @Patch(':id/read')
  @RequirePermissions('notification.read')
  async markRead(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    return this.notificationService.markRead(req.user.tenantId, req.user.id, id);
  }

  @Post('read-all')
  @RequirePermissions('notification.read')
  async markAllRead(@Req() req: FastifyRequest & { user: AuthUser }) {
    return this.notificationService.markAllRead(req.user.tenantId, req.user.id);
  }

  @Get('preferences')
  @RequirePermissions('notification.preference.manage')
  async preferences(@Req() req: FastifyRequest & { user: AuthUser }) {
    return this.notificationService.listPreferences(req.user.tenantId, req.user.id);
  }

  @Put('preferences')
  @RequirePermissions('notification.preference.manage')
  async updatePreferences(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: UpsertPreferencesDto,
  ) {
    return this.notificationService.upsertPreferences(req.user.tenantId, req.user.id, body.items);
  }

  @Sse('stream')
  @RequirePermissions('notification.read')
  stream(@Req() req: FastifyRequest & { user: AuthUser }) {
    return merge(
      this.notificationService.getUserStream(req.user.id).pipe(
        map((event) => ({ type: event.type, data: event.data })),
      ),
      interval(30_000).pipe(map(() => ({ type: 'heartbeat', data: { ts: new Date().toISOString() } }))),
    );
  }

  @Get('admin/templates')
  @RequirePermissions('notification.manage')
  async listTemplates(@Req() req: FastifyRequest & { user: AuthUser }) {
    return this.notificationService.listTemplates(req.user.tenantId);
  }

  @Post('admin/templates')
  @RequirePermissions('notification.manage')
  async createTemplate(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: UpsertTemplateDto) {
    return this.notificationService.upsertTemplate(req.user.tenantId, req.user.id, body);
  }

  @Patch('admin/templates/:id')
  @RequirePermissions('notification.manage')
  async updateTemplate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpsertTemplateDto,
  ) {
    return this.notificationService.upsertTemplate(req.user.tenantId, req.user.id, { ...body, id });
  }

  @Delete('admin/templates/:id')
  @RequirePermissions('notification.manage')
  async deleteTemplate(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    return this.notificationService.deleteTemplate(req.user.tenantId, req.user.id, id);
  }

  @Post('admin/templates/preview')
  @RequirePermissions('notification.manage')
  previewTemplate(@Body() body: PreviewTemplateDto) {
    return this.notificationService.renderPreview(body.subject, body.body, body.payload);
  }

  @Get('admin/channel-configs')
  @RequirePermissions('notification.manage')
  async listChannelConfigs(@Req() req: FastifyRequest & { user: AuthUser }) {
    return this.notificationService.listChannelConfigs(req.user.tenantId);
  }

  @Put('admin/channel-configs/:channel')
  @RequirePermissions('notification.manage')
  async upsertChannelConfig(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('channel') channel: NotificationChannel,
    @Body() body: UpsertChannelConfigDto,
  ) {
    return this.notificationService.upsertChannelConfig(req.user.tenantId, req.user.id, {
      ...body,
      channel,
    });
  }

  @Get('admin/logs')
  @RequirePermissions('notification.manage')
  async listLogs(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('channel') channel?: NotificationChannel,
    @Query('status') status?: NotificationLogStatus,
  ) {
    return this.notificationService.listLogs(req.user.tenantId, { channel, status });
  }

  @Post('admin/logs/:id/resend')
  @RequirePermissions('notification.manage')
  async resend(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    return this.notificationService.resendLog(req.user.tenantId, req.user.id, id);
  }

  @Get('admin/schedules')
  @RequirePermissions('notification.manage')
  async schedules(@Req() req: FastifyRequest & { user: AuthUser }) {
    return this.notificationService.listSchedules(req.user.tenantId);
  }

  @Post('admin/schedules')
  @RequirePermissions('notification.manage')
  async createSchedule(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateScheduleDto) {
    return this.notificationService.createSchedule(req.user.tenantId, req.user.id, {
      ...body,
      scheduledFor: new Date(body.scheduledFor),
    });
  }

  @Post('admin/trigger')
  @RequirePermissions('notification.manage')
  async trigger(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: TriggerEventDto) {
    return this.notificationService.triggerEvent({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      eventKey: body.eventKey,
      recipients: body.recipients,
      requestedChannels: body.requestedChannels,
      payload: body.payload,
    });
  }
}
