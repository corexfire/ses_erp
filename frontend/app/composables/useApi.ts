import type { AxiosInstance } from 'axios';

export const useApi = () => {
  const nuxtApp = useNuxtApp();
  return nuxtApp.$api as AxiosInstance;
};

