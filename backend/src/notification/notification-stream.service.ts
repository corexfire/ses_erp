import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

export type NotificationStreamEvent = {
  type: string;
  data: Record<string, unknown>;
};

@Injectable()
export class NotificationStreamService {
  private readonly channels = new Map<string, Subject<NotificationStreamEvent>>();

  getStream(userId: string) {
    let stream = this.channels.get(userId);
    if (!stream) {
      stream = new Subject<NotificationStreamEvent>();
      this.channels.set(userId, stream);
    }
    return stream;
  }

  publish(userId: string, event: NotificationStreamEvent) {
    this.getStream(userId).next(event);
  }
}
