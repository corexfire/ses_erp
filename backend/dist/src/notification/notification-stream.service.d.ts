import { Subject } from 'rxjs';
export type NotificationStreamEvent = {
    type: string;
    data: Record<string, unknown>;
};
export declare class NotificationStreamService {
    private readonly channels;
    getStream(userId: string): Subject<NotificationStreamEvent>;
    publish(userId: string, event: NotificationStreamEvent): void;
}
