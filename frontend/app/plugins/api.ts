import axios from 'axios';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  const api = axios.create({
    baseURL: runtimeConfig.public.apiBaseUrl,
    withCredentials: true,
  });

  return {
    provide: {
      $api: api,
      api,
    },
  };
});
