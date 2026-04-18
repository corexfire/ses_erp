import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
type NotificationQueuePayload = {
    logId: string;
};
type Processor = (payload: NotificationQueuePayload) => Promise<void>;
export declare class NotificationQueueService implements OnModuleInit, OnModuleDestroy {
    private readonly configService;
    private readonly logger;
    private connection?;
    private queue?;
    private worker?;
    private processor?;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    setProcessor(processor: Processor): void;
    enqueue(payload: NotificationQueuePayload): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
export {};
