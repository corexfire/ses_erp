<template>
  <div class="h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
    
    <!-- Mobile Backdrop -->
    <transition name="fade">
      <div v-if="isSidebarOpen && isMobile" 
           @click="isSidebarOpen = false"
           class="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm lg:hidden">
      </div>
    </transition>

    <!-- Header (Responsive "Logistics Bridge" Extension) -->
    <header class="fixed left-0 right-0 top-0 z-40 border-b bg-white/80 backdrop-blur-md">
      <div class="flex items-center justify-between px-6 py-3">
        <div class="flex items-center gap-6">
          <!-- Toggle Button -->
          <button @click="isSidebarOpen = !isSidebarOpen" 
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-emerald-50 hover:text-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none">
            <i :class="['pi transition-transform duration-300', isSidebarOpen ? 'pi-times rotate-90' : 'pi-bars']"></i>
          </button>

          <div class="flex items-center gap-3 group cursor-pointer" @click="navigateTo('/')">
            <div class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-100 group-hover:rotate-12 transition-transform">
               <i class="pi pi-th-large text-xs"></i>
            </div>
            <div class="flex flex-col leading-none">
               <div class="text-[12px] font-black tracking-widest text-slate-800 uppercase italic">SES <span class="text-emerald-600 not-italic">ERP</span></div>
               <div class="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Resolution Core v1.0</div>
            </div>
          </div>
        </div>

        <div v-if="auth.user" class="flex items-center gap-6">
          <!-- Notifications (Premium Style) -->
          <div v-if="canReadNotification" class="relative">
            <button
              class="relative h-10 px-4 rounded-xl border border-slate-100 bg-white text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 hover:border-emerald-100 shadow-sm transition-all flex items-center gap-2 group"
              @click="dropdownOpen = !dropdownOpen"
            >
              <i class="pi pi-bell group-hover:animate-swing"></i>
              <span class="hidden sm:inline">Notifikasi</span>
              <span
                v-if="notification.unreadCount > 0"
                class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-black text-white shadow-lg shadow-rose-100 ring-2 ring-white"
              >
                {{ notification.unreadCount }}
              </span>
            </button>

            <!-- Premium Dropdown -->
            <transition name="scale">
              <div
                v-if="dropdownOpen"
                class="absolute right-0 top-14 z-50 w-[380px] rounded-[2rem] border-4 border-white bg-white shadow-2xl overflow-hidden animate-scale-in"
              >
                <div class="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <div class="text-[10px] font-black uppercase tracking-widest text-slate-800">Pesan Sistem Terkini</div>
                  <div class="flex gap-2">
                    <Button label="Buka" size="small" severity="secondary" text class="text-[9px] font-black" @click="goToNotifications" />
                    <Button
                      label="Baca Semua"
                      size="small"
                      severity="success"
                      class="text-[9px] font-black uppercase tracking-widest px-3"
                      :disabled="notification.unreadCount === 0"
                      @click="markAllRead"
                    />
                  </div>
                </div>

                <div class="max-h-[400px] overflow-y-auto custom-scrollbar p-4 space-y-3">
                  <button
                    v-for="item in notification.items"
                    :key="item.id"
                    class="w-full rounded-2xl border-2 border-slate-50 p-4 text-left transition-all hover:bg-emerald-50 hover:border-emerald-100 group"
                    @click="markRead(item.id)"
                  >
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <div class="text-[11px] font-black text-slate-800 uppercase tracking-tight group-hover:text-emerald-800">{{ item.title || 'Notifikasi Sistem' }}</div>
                        <div class="mt-1 text-[10px] font-medium text-slate-500 leading-relaxed italic">{{ item.message }}</div>
                      </div>
                      <i :class="['pi text-[10px]', item.readAt ? 'text-slate-200' : 'text-emerald-500 animate-pulse']" class="pi-circle-fill"></i>
                    </div>
                  </button>
                  <div v-if="notification.items.length === 0" class="py-12 text-center">
                    <i class="pi pi-inbox text-4xl text-slate-100 mb-2"></i>
                    <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Belum ada notifikasi baru</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- User Profile -->
          <div class="flex items-center gap-4">
             <div class="hidden text-right lg:block">
                <p class="text-[10px] font-black text-slate-800 uppercase tracking-tight leading-none mb-1">{{ auth.user.email.split('@')[0] }}</p>
                <p class="text-[8px] font-bold text-slate-400 tracking-widest uppercase italic">Administrator Root</p>
             </div>
             <Button icon="pi pi-power-off" class="h-10 w-10 bg-slate-900 border-none text-white rounded-xl shadow-xl hover:bg-rose-600 transition-all" @click="onLogout" />
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar Container -->
    <AppSidebar 
      :class="[
        'fixed bottom-0 top-[65px] z-40 w-[280px] transition-all duration-300 ease-in-out border-r shadow-xl lg:shadow-none',
        isSidebarOpen ? 'left-0' : '-left-[280px]'
      ]"
    />

    <!-- Main Content Shell -->
    <main 
      :class="[
        'mt-[65px] h-[calc(100vh-65px)] overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out bg-slate-50/50',
        (isSidebarOpen && !isMobile) ? 'ml-[280px]' : 'ml-0'
      ]"
    >
      <div class="max-w-[1600px] mx-auto p-4 lg:p-8">
        <slot />
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const auth = useAuthStore();
const notification = useNotificationStore();
const dropdownOpen = ref(false);
const isSidebarOpen = ref(true);
const screenWidth = ref(0);

const isMobile = computed(() => screenWidth.value < 1024);
const canReadNotification = computed(() => auth.hasPermission('notification.read'));

const updateWidth = () => {
  screenWidth.value = window.innerWidth;
  if (isMobile.value) {
    isSidebarOpen.value = false;
  } else {
    isSidebarOpen.value = true;
  }
};

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

// Route change should close sidebar on mobile
const route = useRoute();
watch(() => route.path, () => {
  if (isMobile.value) {
    isSidebarOpen.value = false;
  }
});

onMounted(async () => {
  updateWidth();
  window.addEventListener('resize', updateWidth);

  if (auth.user && canReadNotification.value) {
    await notification.loadRecent(true);
    await notification.loadUnreadCount();
    notification.connect();
  }
});

onBeforeUnmount(() => {
  notification.disconnect();
  window.removeEventListener('resize', updateWidth);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.scale-enter-active, .scale-leave-active { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: top right; }
.scale-enter-from, .scale-leave-to { opacity: 0; transform: scale(0.9) translateY(-10px); }

@keyframes swing {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
}
.group-hover\:animate-swing {
  animation: swing 0.4s ease-in-out;
}
</style>
