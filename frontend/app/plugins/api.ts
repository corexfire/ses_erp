import axios from 'axios';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  const api = axios.create({
    baseURL: runtimeConfig.public.apiBaseUrl,
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        if (import.meta.client) {
          const nuxtApp = useNuxtApp();
          if (nuxtApp.$swal) {
            (nuxtApp.$swal as any).fire({
              icon: 'warning',
              title: 'Sesi Berakhir',
              text: 'Sesi autentikasi Anda telah kadaluarsa. Silakan login kembali untuk melanjutkan.',
              confirmButtonText: 'Ke Halaman Login',
              allowOutsideClick: false,
            }).then(() => {
              navigateTo('/login');
            });
          } else {
            navigateTo('/login');
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      $api: api,
      api,
    },
  };
});
