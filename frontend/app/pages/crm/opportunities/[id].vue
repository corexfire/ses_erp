<template>
  <div class="space-y-4">
    <div class="rounded-xl border bg-white p-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="text-sm font-semibold">Opportunity Detail</div>
          <div class="mt-1 text-sm text-slate-600">{{ opportunity?.code ?? '-' }} · {{ opportunity?.name ?? '' }}</div>
        </div>
        <div class="flex gap-2">
          <Button label="Back" severity="secondary" @click="back" />
          <Button label="Reload" severity="secondary" :disabled="loading || !canRead" @click="load" />
        </div>
      </div>
      <div v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</div>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="rounded-xl border bg-white p-5">
        <div class="text-sm font-semibold">Summary</div>
        <div class="mt-3 grid grid-cols-1 gap-2 text-sm">
          <div class="flex justify-between gap-3">
            <div class="text-slate-600">Stage</div>
            <div class="font-medium text-slate-900">{{ opportunity?.stage ?? '-' }}</div>
          </div>
          <div class="flex justify-between gap-3">
            <div class="text-slate-600">Expected Value</div>
            <div class="font-medium text-slate-900">{{ opportunity?.expectedValue ?? '-' }}</div>
          </div>
          <div class="flex justify-between gap-3">
            <div class="text-slate-600">Lead</div>
            <div class="font-medium text-slate-900">{{ opportunity?.lead?.code ?? '-' }}</div>
          </div>
          <div class="flex justify-between gap-3">
            <div class="text-slate-600">Customer</div>
            <div class="font-medium text-slate-900">{{ opportunity?.customer?.code ?? '-' }}</div>
          </div>
          <div class="flex justify-between gap-3">
            <div class="text-slate-600">Owner</div>
            <div class="font-medium text-slate-900">{{ opportunity?.owner?.name ?? opportunity?.owner?.email ?? '-' }}</div>
          </div>
        </div>
      </div>

      <div class="rounded-xl border bg-white p-5">
        <div class="flex items-center justify-between gap-3">
          <div class="text-sm font-semibold">Activities</div>
          <Button label="Add Activity" size="small" :disabled="!canCreateActivity" @click="openAdd" />
        </div>

        <div v-if="addOpen" class="mt-4 rounded-lg border bg-slate-50 p-4">
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div class="space-y-1">
              <div class="text-xs text-slate-600">Type</div>
              <select v-model="addForm.type" class="h-10 w-full rounded-md border px-3 text-sm">
                <option value="CALL">CALL</option>
                <option value="EMAIL">EMAIL</option>
                <option value="MEETING">MEETING</option>
                <option value="TASK">TASK</option>
              </select>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-slate-600">Due Date</div>
              <input v-model="addForm.dueDate" type="date" class="h-10 w-full rounded-md border px-3 text-sm" />
            </div>
            <div class="space-y-1 md:col-span-2">
              <div class="text-xs text-slate-600">Subject</div>
              <InputText v-model="addForm.subject" class="w-full" />
            </div>
            <div class="space-y-1 md:col-span-2">
              <div class="text-xs text-slate-600">Notes</div>
              <InputText v-model="addForm.notes" class="w-full" />
            </div>
          </div>
          <div class="mt-3 flex justify-end gap-2">
            <Button label="Cancel" size="small" severity="secondary" :disabled="adding" @click="closeAdd" />
            <Button label="Create" size="small" :loading="adding" :disabled="adding || !addForm.subject" @click="createActivity" />
          </div>
          <div v-if="addError" class="mt-2 text-sm text-red-600">{{ addError }}</div>
        </div>

        <div class="mt-4 overflow-hidden rounded-lg border">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-left text-xs text-slate-600">
              <tr>
                <th class="px-3 py-2">Type</th>
                <th class="px-3 py-2">Subject</th>
                <th class="px-3 py-2">Due</th>
                <th class="px-3 py-2">Assignee</th>
                <th class="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in opportunity?.activities ?? []" :key="a.id" class="border-t">
                <td class="px-3 py-2 font-medium">{{ a.type }}</td>
                <td class="px-3 py-2">{{ a.subject }}</td>
                <td class="px-3 py-2 text-xs text-slate-600">{{ a.dueAt ? formatDate(a.dueAt) : '-' }}</td>
                <td class="px-3 py-2 text-xs text-slate-600">{{ a.assignedTo?.name ?? a.assignedTo?.email ?? '-' }}</td>
                <td class="px-3 py-2 text-xs text-slate-600">{{ a.status }}</td>
              </tr>
              <tr v-if="(opportunity?.activities?.length ?? 0) === 0">
                <td colspan="5" class="px-3 py-6 text-center text-sm text-slate-500">No data</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Activity = {
  id: string;
  type: string;
  subject: string;
  status: string;
  dueAt: string | null;
  assignedTo?: { id: string; email: string; name: string | null } | null;
};
type Opportunity = {
  id: string;
  code: string;
  name: string;
  stage: string;
  expectedValue?: string | null;
  lead?: { id: string; code: string } | null;
  customer?: { id: string; code: string } | null;
  owner?: { id: string; email: string; name: string | null } | null;
  activities: Activity[];
};

const api = useApi();
const auth = useAuthStore();
const route = useRoute();

const canRead = computed(() => auth.hasPermission('crm.opportunity.read'));
const canCreateActivity = computed(() => auth.hasPermission('crm.activity.create'));

const loading = ref(false);
const error = ref<string | null>(null);
const opportunity = ref<Opportunity | null>(null);

const addOpen = ref(false);
const adding = ref(false);
const addError = ref<string | null>(null);
const addForm = reactive({
  type: 'CALL',
  subject: '',
  dueDate: '',
  notes: '',
});

const pad = (n: number) => String(n).padStart(2, '0');
const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const load = async () => {
  loading.value = true;
  error.value = null;
  try {
    if (!canRead.value) {
      opportunity.value = null;
      return;
    }
    const res = await api.get(`/crm/opportunities/${route.params.id}`);
    opportunity.value = res.data?.opportunity ?? null;
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Gagal load opportunity';
  } finally {
    loading.value = false;
  }
};

const openAdd = () => {
  addOpen.value = true;
  addError.value = null;
  addForm.type = 'CALL';
  addForm.subject = '';
  addForm.dueDate = '';
  addForm.notes = '';
};

const closeAdd = () => {
  if (adding.value) return;
  addOpen.value = false;
};

const createActivity = async () => {
  if (!opportunity.value) return;
  adding.value = true;
  addError.value = null;
  try {
    await api.post('/crm/activities', {
      type: addForm.type,
      subject: addForm.subject,
      dueAt: addForm.dueDate ? new Date(addForm.dueDate) : undefined,
      opportunityId: opportunity.value.id,
      leadId: opportunity.value.lead?.id,
      customerId: opportunity.value.customer?.id,
      notes: addForm.notes || undefined,
    });
    addOpen.value = false;
    await load();
  } catch (e: any) {
    addError.value = e?.response?.data?.message ?? 'Gagal create activity';
  } finally {
    adding.value = false;
  }
};

const back = () => navigateTo('/crm/opportunity-management');

onMounted(load);
</script>
