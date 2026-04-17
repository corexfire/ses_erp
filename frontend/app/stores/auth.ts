import { defineStore } from 'pinia';
import { useRequestHeaders } from '#app';

export type AuthUser = {
  id: string;
  tenantId: string;
  email: string;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUser | null,
    permissions: [] as string[],
    initialized: false,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user),
    hasPermission: (state) => (key: string) => state.permissions.includes(key),
  },
  actions: {
    async restoreSession() {
      if (this.initialized) return;
      this.initialized = true;

      const api = useApi();
      try {
        const reqConfig = import.meta.server ? { headers: useRequestHeaders(['cookie']) } : undefined;
        const res = await api.get('/auth/me', reqConfig);
        this.user = res.data?.user ?? null;
        this.permissions = res.data?.permissions ?? [];
      } catch {
        this.user = null;
        this.permissions = [];
      }
    },
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      const api = useApi();

      try {
        const res = await api.post('/auth/login', { email, password });
        this.user = res.data?.user ?? null;
        this.permissions = res.data?.permissions ?? [];
        return true;
      } catch (e: any) {
        this.user = null;
        this.permissions = [];
        this.error = e?.response?.data?.message ?? 'Login gagal';
        return false;
      } finally {
        this.loading = false;
        this.initialized = true;
      }
    },
    async logout() {
      const api = useApi();
      try {
        await api.post('/auth/logout');
      } finally {
        this.user = null;
        this.permissions = [];
        this.initialized = true;
      }
    },
  },
});
