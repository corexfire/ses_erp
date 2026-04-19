<template>
  <div class="relative min-h-screen flex items-center justify-center bg-slate-50 overflow-hidden font-sans p-4">
    <!-- Animated Abstract Background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-200/40 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-200/30 rounded-full blur-[140px] animate-pulse" style="animation-delay: 2s"></div>
    </div>

    <div class="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center border-[6px] border-white bg-white/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[3rem] overflow-hidden animate-scale-in lg:h-[600px]">
      
      <!-- Left Panel: Branding / Gateway -->
      <div class="w-full lg:w-1/2 p-12 lg:p-16 h-full flex flex-col justify-between bg-slate-900 text-white relative overflow-hidden group">
        <!-- Inner glow -->
        <div class="absolute -top-32 -left-32 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-400/30 transition-all duration-1000"></div>
        <div class="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-400/30 transition-all duration-1000"></div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-10">
            <div class="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:rotate-12 transition-transform">
              <i class="pi pi-box text-xl font-black text-white"></i>
            </div>
            <div>
              <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] leading-none mb-1">Apbatech</div>
              <div class="text-xl font-black tracking-tight italic">Enterprise ERP</div>
            </div>
          </div>

          <h1 class="text-5xl lg:text-6xl font-black mt-8 leading-[1.1] tracking-tighter uppercase italic">
            Central
            <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Gateway.</span>
          </h1>
          <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-6 leading-relaxed max-w-sm border-l-2 border-emerald-500 pl-4 py-1">
            Authenticate to sync logistics, finance, and human capital records into the Golden Thread.
          </p>
        </div>

        <div class="relative z-10 mt-12 bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
           <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                 <i class="pi pi-shield"></i>
              </div>
              <div>
                 <div class="text-[9px] font-black uppercase tracking-widest text-emerald-400">Secure Environment</div>
                 <div class="text-[10px] font-medium text-slate-300 mt-1">End-to-End Enterprise Encryption</div>
              </div>
           </div>
        </div>
      </div>

      <!-- Right Panel: Login Form -->
      <div class="w-full lg:w-1/2 p-10 lg:p-16 h-full flex flex-col justify-center bg-white relative animate-fade-in-up" style="animation-delay: 0.1s">
        <div class="mb-10 text-center lg:text-left">
           <h2 class="text-3xl font-black text-slate-800 tracking-tight uppercase italic mb-2">Access Portal</h2>
           <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Masukkan kredensial Anda</p>
        </div>

        <form @submit.prevent="onSubmit" class="space-y-6 w-full max-w-sm mx-auto lg:mx-0">
          
          <!-- Email Input -->
          <div class="space-y-3 group/input">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 group-focus-within/input:text-emerald-600 transition-colors">
               <i class="pi pi-at"></i> Email Administrator
            </label>
            <div class="relative">
              <InputText 
                v-model="email" 
                class="w-full h-14 border-none rounded-2xl px-6 text-[12px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400/30 focus:bg-white transition-all uppercase tracking-widest" 
                autocomplete="username" 
                placeholder="admin@ses-erp.local"
                required
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="space-y-3 group/input">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 group-focus-within/input:text-emerald-600 transition-colors">
               <i class="pi pi-key"></i> Passcode
            </label>
            <div class="relative login-password">
              <Password
                v-model="password"
                class="w-full"
                input-class="w-full h-14 border-none rounded-2xl px-6 text-[12px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400/30 focus:bg-white transition-all tracking-widest"
                :feedback="false"
                toggle-mask
                autocomplete="current-password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <!-- Error Alert -->
          <Transition name="fade">
            <div v-if="auth.error" class="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <i class="pi pi-exclamation-circle mt-0.5"></i>
              <span class="text-[11px] font-bold uppercase tracking-wide leading-tight">{{ auth.error }}</span>
            </div>
          </Transition>

          <!-- Submit Button -->
          <div class="pt-4">
            <Button
              type="submit"
              :loading="auth.loading"
              :disabled="auth.loading"
              class="w-full h-14 bg-emerald-600 border-none text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] hover:shadow-cyan-500/30 transition-all rounded-2xl flex items-center justify-center gap-3 overflow-hidden relative group/btn"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <span class="relative z-10">{{ auth.loading ? 'Authenticating...' : 'Secure Login' }}</span>
              <i class="pi pi-arrow-right relative z-10 group-hover/btn:translate-x-1 transition-transform" v-if="!auth.loading"></i>
            </Button>
          </div>

        </form>

        <div class="mt-auto pt-10 text-center lg:text-left">
           <div class="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Sistem Lingkungan Pengembang</div>
           <p class="text-[10px] font-bold text-slate-400 mt-1 cursor-pointer hover:text-emerald-500 transition-colors" @click="fillDefault">
             Gunakan: admin@ses-erp.local / admin123
           </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});

const auth = useAuthStore();
const email = ref('admin@ses-erp.local');
const password = ref('admin123');

const onSubmit = async () => {
  const ok = await auth.login(email.value, password.value);
  if (ok) {
    await navigateTo('/');
  }
};

const fillDefault = () => {
  email.value = 'admin@ses-erp.local';
  password.value = 'admin123';
}
</script>

<style scoped>
.animate-fade-in-up { 
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(40px); } 
  to { opacity: 1; transform: translateY(0); } 
}

.animate-scale-in { 
  animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes scaleIn { 
  from { opacity: 0; transform: scale(0.95); } 
  to { opacity: 1; transform: scale(1); } 
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Customizing PrimeVue Password inner icon so it fits perfectly inside our large rounded input */
:deep(.login-password .p-password-input) {
  padding-right: 3rem !important; /* give space for the eye icon */
}
:deep(.login-password svg) {
  color: #64748b !important;
  right: 1.25rem !important;
  margin-top: -0.5rem !important;
  transition: color 0.2s;
}
:deep(.login-password svg:hover) {
  color: #10b981 !important;
}

:deep(.p-inputtext) {
   /* Removing default primevue focus shadow, handled by tailwind ring */
   box-shadow: none !important;
}
</style>
