<template>
  <div class="space-y-4">
    <div class="rounded-xl border bg-white p-5">
      <div class="text-sm font-semibold">Quality In-Process</div>
      <div class="mt-1 text-sm text-slate-600">Inspeksi kualitas selama proses produksi.</div>
    </div>

    <div class="rounded-xl border bg-white p-5">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <select v-model="status" class="h-10 rounded-md border px-2 text-sm">
            <option value="">All Status</option>
            <option value="PENDING">PENDING</option>
            <option value="PASSED">PASSED</option>
            <option value="FAILED">FAILED</option>
          </select>
          <Button label="Load" :disabled="!canRead" @click="load" />
        </div>
        <Button label="New Inspection" :disabled="!canCreate" @click="openCreate" />
      </div>

      <div class="mt-4 overflow-hidden rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-left text-xs text-slate-600">
            <tr>
              <th class="px-3 py-2">Work Order</th>
              <th class="px-3 py-2">Finished Good</th>
              <th class="px-3 py-2 text-right">Inspected</th>
              <th class="px-3 py-2 text-right">Passed</th>
              <th class="px-3 py-2 text-right">Failed</th>
              <th class="px-3 py-2">Status</th>
              <th class="px-3 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in inspections" :key="i.id" class="border-t">
              <td class="px-3 py-2 text-xs">{{ i.workOrder?.code }}</td>
              <td class="px-3 py-2 text-xs">{{ i.workOrder?.finishedGood?.name }}</td>
              <td class="px-3 py-2 text-right text-xs">{{ i.qtyInspected }}</td>
              <td class="px-3 py-2 text-right text-xs">{{ i.qtyPassed }}</td>
              <td class="px-3 py-2 text-right text-xs">{{ i.qtyFailed }}</td>
              <td class="px-3 py-2 text-xs">{{ i.status }}</td>
              <td class="px-3 py-2 text-right">
                <Button label="Update" size="small" severity="secondary" :disabled="!canUpdate" @click="openEdit(i)" />
              </td>
            </tr>
            <tr v-if="inspections.length === 0">
              <td colspan="7" class="px-3 py-6 text-center text-sm text-slate-500">No data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div class="w-full max-w-md rounded-xl border bg-white p-5 shadow-xl">
        <div class="text-sm font-semibold">{{ editingId ? 'Update Inspection' : 'New Inspection' }}</div>

        <div v-if="!editingId" class="mt-4 space-y-3">
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Work Order</div>
            <select v-model="form.workOrderId" class="h-10 w-full rounded-md border px-2 text-sm">
              <option value="">Select WO</option>
              <option v-for="wo in workOrders" :key="wo.id" :value="wo.id">{{ wo.code }} · {{ wo.finishedGood?.name }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Qty Inspected</div>
            <InputText v-model="form.qtyInspected" class="w-full" type="number" />
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Qty Passed</div>
            <InputText v-model="form.qtyPassed" class="w-full" type="number" />
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Qty Failed</div>
            <InputText v-model="form.qtyFailed" class="w-full" type="number" />
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Notes</div>
            <InputText v-model="form.notes" class="w-full" />
          </div>
        </div>

        <div v-else class="mt-4 space-y-3">
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Status</div>
            <select v-model="form.status" class="h-10 w-full rounded-md border px-2 text-sm">
              <option value="PENDING">PENDING</option>
              <option value="PASSED">PASSED</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Notes</div>
            <InputText v-model="form.notes" class="w-full" />
          </div>
        </div>

        <div class="mt-5 flex justify-end gap-2">
          <Button label="Cancel" severity="secondary" @click="closeDialog" />
          <Button label="Save" @click="save" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('manufacturing.quality.read'));
const canCreate = computed(() => auth.hasPermission('manufacturing.quality.create'));
const canUpdate = computed(() => auth.hasPermission('manufacturing.quality.update'));

const status = ref('');
const inspections = ref<any[]>([]);
const workOrders = ref<any[]>([]);

const dialogOpen = ref(false);
const editingId = ref<string | null>(null);
const form = reactive({
  workOrderId: '',
  qtyInspected: '',
  qtyPassed: '',
  qtyFailed: '',
  status: 'PENDING',
  notes: '',
});

const load = async () => {
  try {
    const params: any = {};
    if (status.value) params.status = status.value;
    const res = await api.get('/manufacturing/quality', { params });
    inspections.value = res.data?.inspections ?? [];
  } catch (e) {
    console.error(e);
  }
};

const loadWorkOrders = async () => {
  try {
    const res = await api.get('/manufacturing/work-orders');
    workOrders.value = res.data?.workOrders ?? [];
  } catch (e) {
    workOrders.value = [];
  }
};

const openCreate = async () => {
  editingId.value = null;
  form.workOrderId = '';
  form.qtyInspected = '';
  form.qtyPassed = '';
  form.qtyFailed = '';
  form.notes = '';
  await loadWorkOrders();
  dialogOpen.value = true;
};

const openEdit = (i: any) => {
  editingId.value = i.id;
  form.status = i.status;
  form.notes = i.notes ?? '';
  dialogOpen.value = true;
};

const closeDialog = () => dialogOpen.value = false;

const save = async () => {
  try {
    if (editingId.value) {
      await api.patch(`/manufacturing/quality/${editingId.value}`, {
        status: form.status,
        notes: form.notes || undefined,
      });
    } else {
      await api.post('/manufacturing/quality', {
        workOrderId: form.workOrderId,
        qtyInspected: parseFloat(form.qtyInspected) || 0,
        qtyPassed: parseFloat(form.qtyPassed) || 0,
        qtyFailed: parseFloat(form.qtyFailed) || 0,
        notes: form.notes || undefined,
      });
    }
    closeDialog();
    await load();
  } catch (e: any) {
    alert(e?.response?.data?.message ?? 'Error');
  }
};

onMounted(load);
</script>