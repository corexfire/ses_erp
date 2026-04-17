// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app',
  devtools: { enabled: true },
  app: {
    warnHandler: (msg, _instance, _trace) => {
      if (msg.includes('Slot "default" invoked outside')) return;
      console.warn(msg);
    }
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['primeicons/primeicons.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4123',
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'primevue/config',
        '@primevue/themes/aura',
        'primevue/button',
        'primevue/card',
        'primevue/dialog',
        'primevue/inputnumber',
        'primevue/inputtext',
        'primevue/panelmenu',
        'primevue/password',
        'primevue/datatable',
        'primevue/column',
        'primevue/tag',
        'primevue/multiselect',
        'primevue/tabview',
        'primevue/select',
        'primevue/textarea',
        'primevue/toast',
        'primevue/toastservice',
        'primevue/confirmationservice',
        'primevue/confirmdialog',
        'axios',
        'primevue/datepicker',
        'primevue/treetable',
        'primevue/toggleswitch',
        'primevue/avatar',
        'primevue/avatargroup',
      ]
    }
  }
});
