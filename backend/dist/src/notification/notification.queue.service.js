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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var NotificationQueueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationQueueService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
let NotificationQueueService = NotificationQueueService_1 = class NotificationQueueService {
    configService;
    logger = new common_1.Logger(NotificationQueueService_1.name);
    connection;
    queue;
    worker;
    processor;
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        const redisUrl = this.configService.get('REDIS_URL');
        if (!redisUrl) {
            this.logger.warn('REDIS_URL not configured, notification queue will run inline');
            return;
        }
        try {
            this.connection = new ioredis_1.default(redisUrl, { maxRetriesPerRequest: null });
            this.queue = new bullmq_1.Queue('notification.queue', {
                connection: this.connection,
            });
            this.worker = new bullmq_1.Worker('notification.queue', async (job) => {
                if (!this.processor)
                    return;
                await this.processor(job.data);
            }, { connection: this.connection });
            this.worker.on('failed', (job, error) => {
                this.logger.error(`Notification job ${job?.id ?? 'unknown'} failed`, error.stack);
            });
        }
        catch (error) {
            this.logger.error('Failed to initialize BullMQ, falling back to inline mode', error?.stack);
            await this.connection?.quit();
            this.connection = undefined;
            this.queue = undefined;
            this.worker = undefined;
        }
    }
    setProcessor(processor) {
        this.processor = processor;
    }
    async enqueue(payload) {
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
};
exports.NotificationQueueService = NotificationQueueService;
exports.NotificationQueueService = NotificationQueueService = NotificationQueueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotificationQueueService);
//# sourceMappingURL=notification.queue.service.js.map