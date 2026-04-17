import { defineStore } from 'pinia';

type NotificationItem = {
  id: string;
  title?: string | null;
  message: string;
  status: string;
  createdAt: string;
  readAt?: string | null;
};

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    items: [] as NotificationItem[],
    unreadCount: 0,
    connected: false,
    loading: false,
    source: null as EventSource | null,
  }),
  actions: {
    async loadRecent(includeRead = true) {
      const api = useApi();
      const res = await api.get('/notifications', {
        params: { includeRead: String(includeRead), take: 10 },
      });
      this.items = res.data?.data ?? [];
    },
    async loadUnreadCount() {
      const api = useApi();
      const res = await api.get('/notifications/unread-count');
      this.unreadCount = res.data?.count ?? 0;
    },
    async markRead(id: string) {
      const api = useApi();
      await api.patch(`/notifications/${id}/read`);
      this.items = this.items.map((item) =>
        item.id === id ? { ...item, readAt: new Date().toISOString(), status: 'READ' } : item,
      );
      this.unreadCount = Math.max(0, this.unreadCount - 1);
    },
    async markAllRead() {
      const api = useApi();
      await api.post('/notifications/read-all');
      const now = new Date().toISOString();
      this.items = this.items.map((item) => ({ ...item, readAt: item.readAt ?? now, status: 'READ' }));
      this.unreadCount = 0;
    },
    connect() {
      if (import.meta.server || this.connected || this.source) return;

      const auth = useAuthStore();
      if (!auth.user || !auth.hasPermission('notification.read')) return;

      const runtimeConfig = useRuntimeConfig();
      const source = new EventSource(`${runtimeConfig.public.apiBaseUrl}/notifications/stream`, {
        withCredentials: true,
      });

      source.addEventListener('notification.new', (event: MessageEvent) => {
        const payload = JSON.parse(event.data);
        this.unreadCount = payload.unreadCount ?? this.unreadCount;
        this.items = [
          {
            id: payload.id,
            title: payload.title,
            message: payload.message,
            status: 'SENT',
            createdAt: payload.createdAt,
            readAt: null,
          },
          ...this.items,
        ].slice(0, 10);
      });

      source.addEventListener('notification.read_all', (event: MessageEvent) => {
        const payload = JSON.parse(event.data);
        this.unreadCount = payload.unreadCount ?? 0;
      });

      source.onerror = () => {
        this.connected = false;
      };

      source.onopen = () => {
        this.connected = true;
      };

      this.source = source;
    },
    disconnect() {
      this.source?.close();
      this.source = null;
      this.connected = false;
    },
  },
});
