<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-50 px-4">
    <div class="w-full max-w-md">
      <Card class="border bg-white">
        <template #title>
          <div>Login</div>
        </template>
        <template #content>
          <form class="space-y-4" @submit.prevent="onSubmit">
            <div class="space-y-2">
              <label class="text-xs text-slate-600">Email</label>
              <InputText v-model="email" class="w-full" autocomplete="username" />
            </div>

            <div class="space-y-2">
              <label class="text-xs text-slate-600">Password</label>
              <Password
                v-model="password"
                class="w-full"
                input-class="w-full"
                :feedback="false"
                toggle-mask
                autocomplete="current-password"
              />
            </div>

            <Button
              type="submit"
              label="Login"
              class="w-full"
              :loading="auth.loading"
              :disabled="auth.loading"
            />

            <div v-if="auth.error" class="text-sm text-red-600">
              {{ auth.error }}
            </div>
          </form>
        </template>
      </Card>
      <div class="mt-3 text-center text-xs text-slate-500">
        Dev default: admin@ses-erp.local / admin123
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
</script>
