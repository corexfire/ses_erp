export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  if (!auth.initialized) {
    await auth.restoreSession();
  }

  const isLogin = to.path === '/login';

  if (!isLogin && !auth.isAuthenticated) {
    return navigateTo('/login');
  }

  if (isLogin && auth.isAuthenticated) {
    return navigateTo('/');
  }
});
