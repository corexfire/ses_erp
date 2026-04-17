<template>
  <div class="h-screen overflow-hidden bg-slate-50">
    <header class="fixed left-0 right-0 top-0 z-20 border-b bg-white/70 backdrop-blur">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center gap-2">
          <div class="text-sm font-semibold tracking-wide">SES ERP</div>
          <div class="hidden text-xs text-slate-500 sm:block">v0</div>
        </div>
        <div v-if="auth.user" class="flex items-center gap-3">
          <div v-if="canReadNotification" class="relative">
            <button
              class="relative rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700"
              @click="dropdownOpen = !dropdownOpen"
            >
              Notifications
              <span
                v-if="notification.unreadCount > 0"
                class="ml-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white"
              >
                {{ notification.unreadCount }}
              </span>
            </button>

            <div
              v-if="dropdownOpen"
              class="absolute right-0 top-10 z-30 w-[360px] rounded-xl border bg-white p-3 shadow-xl"
            >
              <div class="flex items-center justify-between gap-2">
                <div class="text-sm font-semibold">Recent Notifications</div>
                <div class="flex gap-2">
                  <Button label="Open" size="small" severity="secondary" @click="goToNotifications" />
                  <Button
                    label="Read All"
                    size="small"
                    severity="secondary"
                    :disabled="notification.unreadCount === 0"
                    @click="markAllRead"
                  />
                </div>
              </div>

              <div class="mt-3 max-h-[360px] space-y-2 overflow-auto">
                <button
                  v-for="item in notification.items"
                  :key="item.id"
                  class="w-full rounded-lg border px-3 py-2 text-left text-sm"
                  @click="markRead(item.id)"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <div class="font-medium">{{ item.title || 'Notification' }}</div>
                      <div class="mt-1 text-xs text-slate-600">{{ item.message }}</div>
                    </div>
                    <span
                      class="rounded-full px-2 py-0.5 text-[10px]"
                      :class="item.readAt ? 'bg-slate-100 text-slate-500' : 'bg-emerald-100 text-emerald-700'"
                    >
                      {{ item.readAt ? 'Read' : 'New' }}
                    </span>
                  </div>
                </button>
                <div v-if="notification.items.length === 0" class="py-6 text-center text-sm text-slate-500">
                  No notifications
                </div>
              </div>
            </div>
          </div>
          <div class="hidden text-xs text-slate-600 sm:block">{{ auth.user.email }}</div>
          <Button label="Logout" size="small" severity="secondary" @click="onLogout" />
        </div>
      </div>
    </header>

    <AppSidebar class="fixed bottom-0 left-0 top-[57px] z-10 w-[280px]" />

    <main class="ml-[280px] mt-[57px] h-[calc(100vh-57px)] overflow-y-auto">
      <div class="px-4 py-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore();
const notification = useNotificationStore();
const dropdownOpen = ref(false);
const canReadNotification = computed(() => auth.hasPermission('notification.read'));

const onLogout = async () => {
  notification.disconnect();
  await auth.logout();
  await navigateTo('/login');
};

const markRead = async (id: string) => {
  await notification.markRead(id);
};

const markAllRead = async () => {
  await notification.markAllRead();
};

const goToNotifications = async () => {
  dropdownOpen.value = false;
  await navigateTo('/core/notification-preferences');
};

onMounted(async () => {
  if (auth.user && canReadNotification.value) {
    await notification.loadRecent(true);
    await notification.loadUnreadCount();
    notification.connect();
  }
});

onBeforeUnmount(() => {
  notification.disconnect();
});
</script>
