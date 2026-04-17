import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { NotificationController } from './notification.controller';
import { NotificationQueueService } from './notification.queue.service';
import { NotificationService } from './notification.service';
import { NotificationStreamService } from './notification-stream.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationQueueService, NotificationStreamService, AuditService],
  exports: [NotificationService],
})
export class NotificationModule {}
