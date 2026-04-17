import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue, Worker, type Job } from 'bullmq';
import IORedis from 'ioredis';

type NotificationQueuePayload = {
  logId: string;
};

type Processor = (payload: NotificationQueuePayload) => Promise<void>;

@Injectable()
export class NotificationQueueService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NotificationQueueService.name);
  private connection?: IORedis;
  private queue?: Queue<NotificationQueuePayload>;
  private worker?: Worker<NotificationQueuePayload>;
  private processor?: Processor;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    if (!redisUrl) {
      this.logger.warn('REDIS_URL not configured, notification queue will run inline');
      return;
    }

    try {
      this.connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });
      this.queue = new Queue<NotificationQueuePayload>('notification.queue', {
        connection: this.connection,
      });
      this.worker = new Worker<NotificationQueuePayload>(
        'notification.queue',
        async (job: Job<NotificationQueuePayload>) => {
          if (!this.processor) return;
          await this.processor(job.data);
        },
        { connection: this.connection },
      );
      this.worker.on('failed', (job, error) => {
        this.logger.error(`Notification job ${job?.id ?? 'unknown'} failed`, error.stack);
      });
    } catch (error: any) {
      this.logger.error('Failed to initialize BullMQ, falling back to inline mode', error?.stack);
      await this.connection?.quit();
      this.connection = undefined;
      this.queue = undefined;
      this.worker = undefined;
    }
  }

  setProcessor(processor: Processor) {
    this.processor = processor;
  }

  async enqueue(payload: NotificationQueuePayload) {
    if (this.queue) {
      await this.queue.add('dispatch', payload, {
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
        removeOnComplete: 100,
        removeOnFail: 100,
      });
      return;
    }

    if (this.processor) {
      await this.processor(payload);
    }
  }

  async onModuleDestroy() {
    await this.worker?.close();
    await this.queue?.close();
    await this.connection?.quit();
  }
}
