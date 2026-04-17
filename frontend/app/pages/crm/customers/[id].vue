<template>
  <div class="space-y-4">
    <div class="rounded-xl border bg-white p-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="text-sm font-semibold">Customer Detail</div>
          <div class="mt-1 text-sm text-slate-600">{{ customer?.code ?? '-' }} · {{ customer?.name ?? '' }}</div>
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
        <div class="text-sm font-semibold">Opportunities</div>
        <div class="mt-4 overflow-hidden rounded-lg border">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-left text-xs text-slate-600">
              <tr>
                <th class="px-3 py-2">Code</th>
                <th class="px-3 py-2">Name</th>
                <th class="px-3 py-2">Stage</th>
                <th class="px-3 py-2">Owner</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="o in customer?.opportunities ?? []" :key="o.id" class="border-t">
                <td class="px-3 py-2 font-medium">
                  <a class="hover:underline" :href="`/crm/opportunities/${o.id}`">{{ o.code }}</a>
                </td>
                <td class="px-3 py-2">{{ o.name }}</td>
                <td class="px-3 py-2 text-xs text-slate-600">{{ o.stage }}</td>
                <td class="px-3 py-2 text-xs text-slate-600">{{ o.owner?.name ?? o.owner?.email ?? '-' }}</td>
              </tr>
              <tr v-if="(customer?.opportunities?.length ?? 0) === 0">
                <td colspan="4" class="px-3 py-6 text-center text-sm text-slate-500">No data</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="rounded-xl border bg-white p-5">
        <div class="flex items-center justify-between gap-3">
          <div class="text-sm font-semibold">Tickets</div>
          <Button label="Add Ticket" size="small" :disabled="!canCreateTicket" @click="openAddTicket" />
        </div>

        <div v-if="ticketOpen" class="mt-4 rounded-lg border bg-slate-50 p-4">
          <div class="grid grid-cols-1 gap-3">
            <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div class="space-y-1">
                <div class="text-xs text-slate-600">Code</div>
                <InputText v-model="ticketForm.code" class="w-full" />
              </div>
              <div class="space-y-1">
                <div class="text-xs text-slate-600">Priority</div>
                <select v-model="ticketForm.priority" class="h-10 w-full rounded-md border px-3 text-sm">
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="URGENT">URGENT</option>
                </select>
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-slate-600">Subject</div>
              <InputText v-model="ticketForm.subject" class="w-full" />
            </div>
            <div class="space-y-1">
              <div class="text-xs text-slate-600">Notes</div>
              <InputText v-model="ticketForm.notes" class="w-full" />
            </div>
          </div>
          <div class="mt-3 flex justify-end gap-2">
            <Button label="Cancel" size="small" severity="secondary" :disabled="ticketSaving" @click="closeAddTicket" />
            <Button
              label="Create"
              size="small"
              :loading="ticketSaving"
              :disabled="ticketSaving || !ticketForm.code || !ticketForm.subject"
              @click="createTicket"
            />
          </div>
          <div v-if="ticketError" class="mt-2 text-sm text-red-600">{{ ticketError }}</div>
        </div>

        <div class="mt-4 overflow-hidden rounded-lg border">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-left text-xs text-slate-600">
              <tr>
                <th class="px-3 py-2">Code</th>
                <th class="px-3 py-2">Subject</th>
                <th class="px-3 py-2">SLA Due</th>
                <th class="px-3 py-2">Priority</th>
                <th class="px-3 py-2">Status</th>
                <th class="px-3 py-2">Assignee</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in customer?.tickets ?? []" :key="t.id" class="border-t">
                <td class="px-3 py-2 font-medium">{{ t.code }}</td>
                <td class="px-3 py-2">{{ t.subject }}</td>
                <td class="px-3 py-2 text-xs">
                  <span :class="t.isOverdue ? 'text-red-700' : 'text-slate-600'">
                    {{ t.slaDueAt ? formatDate(t.slaDueAt) : '-' }}
                  </span>
                </td>
                <td class="px-3 py-2">
                  <select
                    v-model="ticketPrioritySelection[t.id]"
                    class="h-9 rounded-md border px-2 text-xs"
                    :disabled="!canUpdateTicket"
                    @change="updateTicket(t)"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </td>
                <td class="px-3 py-2">
                  <select
                    v-model="ticketStatusSelection[t.id]"
                    class="h-9 rounded-md border px-2 text-xs"
                    :disabled="!canUpdateTicket"
                    @change="updateTicket(t)"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </td>
                <td class="px-3 py-2 text-xs text-slate-600">{{ t.assignedTo?.name ?? t.assignedTo?.email ?? '-' }}</td>
              </tr>
              <tr v-if="(customer?.tickets?.length ?? 0) === 0">
                <td colspan="6" class="px-3 py-6 text-center text-sm text-slate-500">No data</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="rounded-xl border bg-white p-5 lg:col-span-2">
        <div class="flex items-center justify-between gap-3">
          <div class="text-sm font-semibold">Activities</div>
          <Button label="Add Activity" size="small" :disabled="!canCreateActivity" @click="openAddActivity" />
        </div>

        <div v-if="activityOpen" class="mt-4 rounded-lg border bg-slate-50 p-4">
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div class="space-y-1">
              <div class="text-xs text-slate-600">Type</div>
              <select v-model="activityForm.type" class="h-10 w-full rounded-md border px-3 text-sm">
                <option value="CALL">CALL</option>
                <option value="EMAIL">EMAIL</option>
                <option value="MEETING">MEETING</option>
                <option value="TASK">TASK</option>
              </select>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-slate-600">Due Date</div>
              <input v-model="activityForm.dueDate" type="date" class="h-10 w-full rounded-md border px-3 text-sm" />
            </div>
            <div class="space-y-1 md:col-span-2">
              <div class="text-xs text-slate-600">Subject</div>
              <InputText v-model="activityForm.subject" class="w-full" />
            </div>
            <div class="space-y-1 md:col-span-2">
              <div class="text-xs text-slate-600">Notes</div>
              <InputText v-model="activityForm.notes" class="w-full" />
            </div>
          </div>
          <div class="mt-3 flex justify-end gap-2">
            <Button label="Cancel" size="small" severity="secondary" :disabled="activitySaving" @click="closeAddActivity" />
            <Button
              label="Create"
              size="small"
              :loading="activitySaving"
              :disabled="activitySaving || !activityForm.subject"
              @click="createActivity"
            />
          </div>
          <div v-if="activityError" class="mt-2 text-sm text-red-600">{{ activityError }}</div>
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
              <tr v-for="a in customer?.activities ?? []" :key="a.id" class="border-t">
                <td class="px-3 py-2 font-medium">{{ a.type }}</td>
                <td class="px-3 py-2">{{ a.subject }}</td>
                <td class="px-3 py-2 text-xs text-slate-600">{{ a.dueAt ? formatDate(a.dueAt) : '-' }}</td>
                <td class="px-3 py-2 text-xs text-slate-600">{{ a.assignedTo?.name ?? a.assignedTo?.email ?? '-' }}</td>
                <td class="px-3 py-2 text-xs text-slate-600">{{ a.status }}</td>
              </tr>
              <tr v-if="(customer?.activities?.length ?? 0) === 0">
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
type Opportunity = {
  id: string;
  code: string;
  name: string;
  stage: string;
  owner?: { id: string; email: string; name: string | null } | null;
};
type Ticket = {
  id: string;
  code: string;
  subject: string;
  status: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedTo?: { id: string; email: string; name: string | null } | null;
  slaDueAt?: string | null;
  isOverdue?: boolean;
};
type Activity = {
  id: string;
  type: string;
  subject: string;
  status: string;
  dueAt: string | null;
  assignedTo?: { id: string; email: string; name: string | null } | null;
};
type Customer = {
  id: string;
  code: string;
  name: string;
  opportunities: Opportunity[];
  tickets: Ticket[];
  activities: Activity[];
};

const api = useApi();
const auth = useAuthStore();
const route = useRoute();

const canRead = computed(() => auth.hasPermission('crm.customer.read'));
const canCreateTicket = computed(() => auth.hasPermission('crm.ticket.create'));
const canCreateActivity = computed(() => auth.hasPermission('crm.activity.create'));
const canUpdateTicket = computed(() => auth.hasPermission('crm.ticket.update'));

const loading = ref(false);
const error = ref<string | null>(null);
const customer = ref<Customer | null>(null);
const ticketStatusSelection = reactive<Record<string, string>>({});
const ticketPrioritySelection = reactive<Record<string, Ticket['priority']>>({});
const ticketOpen = ref(false);
const ticketSaving = ref(false);
const ticketError = ref<string | null>(null);
const ticketForm = reactive({
  code: '',
  subject: '',
  priority: 'MEDIUM',
  notes: '',
});

const activityOpen = ref(false);
const activitySaving = ref(false);
const activityError = ref<string | null>(null);
const activityForm = reactive({
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
      customer.value = null;
      return;
    }
    const res = await api.get(`/crm/customers/${route.params.id}`);
    customer.value = res.data?.customer ?? null;
    for (const t of customer.value?.tickets ?? []) {
      ticketStatusSelection[t.id] = t.status;
      ticketPrioritySelection[t.id] = t.priority;
    }
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Gagal load customer';
  } finally {
    loading.value = false;
  }
};

const updateTicket = async (t: Ticket) => {
  error.value = null;
  try {
    await api.patch(`/crm/tickets/${t.id}`, {
      status: ticketStatusSelection[t.id],
      priority: ticketPrioritySelection[t.id],
    });
    await load();
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Gagal update ticket';
  }
};

const openAddTicket = () => {
  ticketOpen.value = true;
  ticketError.value = null;
  ticketForm.code = '';
  ticketForm.subject = '';
  ticketForm.priority = 'MEDIUM';
  ticketForm.notes = '';
};

const closeAddTicket = () => {
  if (ticketSaving.value) return;
  ticketOpen.value = false;
};

const createTicket = async () => {
  if (!customer.value) return;
  ticketSaving.value = true;
  ticketError.value = null;
  try {
    await api.post('/crm/tickets', {
      code: ticketForm.code,
      customerId: customer.value.id,
      subject: ticketForm.subject,
      priority: ticketForm.priority,
      notes: ticketForm.notes || undefined,
    });
    ticketOpen.value = false;
    await load();
  } catch (e: any) {
    ticketError.value = e?.response?.data?.message ?? 'Gagal create ticket';
  } finally {
    ticketSaving.value = false;
  }
};

const openAddActivity = () => {
  activityOpen.value = true;
  activityError.value = null;
  activityForm.type = 'CALL';
  activityForm.subject = '';
  activityForm.dueDate = '';
  activityForm.notes = '';
};

const closeAddActivity = () => {
  if (activitySaving.value) return;
  activityOpen.value = false;
};

const createActivity = async () => {
  if (!customer.value) return;
  activitySaving.value = true;
  activityError.value = null;
  try {
    await api.post('/crm/activities', {
      type: activityForm.type,
      subject: activityForm.subject,
      dueAt: activityForm.dueDate ? new Date(activityForm.dueDate) : undefined,
      customerId: customer.value.id,
      notes: activityForm.notes || undefined,
    });
    activityOpen.value = false;
    await load();
  } catch (e: any) {
    activityError.value = e?.response?.data?.message ?? 'Gagal create activity';
  } finally {
    activitySaving.value = false;
  }
};

const back = () => navigateTo('/crm/customer-management');

onMounted(load);
</script>
