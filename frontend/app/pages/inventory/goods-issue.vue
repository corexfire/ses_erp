<template>
  <div class="space-y-4">
    <div class="rounded-xl border bg-white p-5">
      <div class="text-sm font-semibold">Goods Issue Note</div>
      <div class="mt-1 text-sm text-slate-600">Pengeluaran barang ke produksi atau delivery.</div>
    </div>

    <div class="rounded-xl border bg-white p-5">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <InputText v-model="q" placeholder="Search code..." class="w-64" :disabled="!canRead" />
          <select v-model="status" class="h-10 rounded-md border px-2 text-sm" :disabled="!canRead">
            <option value="">All Status</option>
            <option value="DRAFT">DRAFT</option>
            <option value="SUBMITTED">SUBMITTED</option>
            <option value="POSTED">POSTED</option>
            <option value="VOID">VOID</option>
          </select>
          <Button label="Search" severity="secondary" :disabled="loading || !canRead" @click="load" />
        </div>
        <Button label="New Issue" :disabled="loading || !canCreate" @click="openCreate" />
      </div>

      <div class="mt-4 overflow-hidden rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-left text-xs text-slate-600">
            <tr>
              <th class="px-3 py-2">Code</th>
              <th class="px-3 py-2">Issue Date</th>
              <th class="px-3 py-2">Warehouse</th>
              <th class="px-3 py-2">Reference</th>
              <th class="px-3 py-2">Status</th>
              <th class="px-3 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in issues" :key="g.id" class="border-t">
              <td class="px-3 py-2 font-medium">{{ g.code }}</td>
              <td class="px-3 py-2 text-xs">{{ fmtDate(g.issueDate) }}</td>
              <td class="px-3 py-2 text-xs">{{ g.warehouse?.code ?? '-' }}</td>
              <td class="px-3 py-2 text-xs">{{ g.referenceType ?? '-' }}</td>
              <td class="px-3 py-2 text-xs">{{ g.status }}</td>
              <td class="px-3 py-2 text-right">
                <div class="inline-flex gap-2">
                  <Button label="Edit" size="small" severity="secondary" :disabled="!canUpdate || g.status !== 'DRAFT'" @click="openEdit(g)" />
                  <Button label="Submit" size="small" severity="secondary" :disabled="submittingId === g.id || !canPost || g.status !== 'DRAFT'" :loading="submittingId === g.id" @click="submit(g)" />
                </div>
              </td>
            </tr>
            <tr v-if="issues.length === 0">
              <td colspan="6" class="px-3 py-6 text-center text-sm text-slate-500">No data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</div>
      <div v-if="successMsg" class="mt-3 text-sm text-emerald-700">{{ successMsg }}</div>
    </div>

    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div class="w-full max-w-6xl rounded-xl border bg-white p-5 shadow-xl">
        <div class="text-sm font-semibold">{{ editingId ? 'Edit Goods Issue' : 'New Goods Issue' }}</div>

        <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Issue Date</div>
            <InputText v-model="form.issueDate" class="w-full" placeholder="YYYY-MM-DD" :disabled="editingId ? !canUpdate : !canCreate" />
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Warehouse</div>
            <select v-model="form.warehouseId" class="w-full rounded-md border p-2 text-sm" :disabled="editingId ? !canUpdate : !canCreate">
              <option value="">Select Warehouse</option>
              <option v-for="w in warehouses" :key="w.id" :value="w.id">{{ w.code }} - {{ w.name }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Reference Type</div>
            <InputText v-model="form.referenceType" class="w-full" placeholder="e.g. SalesOrder, WorkOrder" :disabled="editingId ? !canUpdate : !canCreate" />
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Reference ID</div>
            <InputText v-model="form.referenceId" class="w-full" placeholder="Reference ID" :disabled="editingId ? !canUpdate : !canCreate" />
          </div>
          <div class="space-y-2 md:col-span-2">
            <div class="text-xs text-slate-600">Notes</div>
            <InputText v-model="form.notes" class="w-full" :disabled="editingId ? !canUpdate : !canCreate" />
          </div>
        </div>

        <div class="mt-4">
          <div class="flex items-center justify-between">
            <div class="text-xs font-medium">Items</div>
            <Button label="Add Item" size="small" :disabled="!canCreate" @click="addItem" />
          </div>
          <div class="mt-2 overflow-hidden rounded-lg border">
            <table class="w-full text-sm">
              <thead class="bg-slate-50 text-left text-xs text-slate-600">
                <tr>
                  <th class="px-2 py-2">Item</th>
                  <th class="px-2 py-2">Description</th>
                  <th class="px-2 py-2 w-24">Qty</th>
                  <th class="px-2 py-2 w-20">UOM</th>
                  <th class="px-2 py-2 w-32">Bin Location</th>
                  <th class="px-2 py-2 w-16"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(it, idx) in form.items" :key="idx" class="border-t">
                  <td class="px-2 py-1">
                    <select v-model="it.itemId" class="w-full rounded border p-1 text-xs">
                      <option value="">Select Item</option>
                      <option v-for="i in items" :key="i.id" :value="i.id">{{ i.code }}</option>
                    </select>
                  </td>
                  <td class="px-2 py-1">
                    <InputText v-model="it.description" class="w-full text-xs" placeholder="Description" />
                  </td>
                  <td class="px-2 py-1">
                    <InputNumber v-model="it.qty" class="w-full text-xs" :min="0" />
                  </td>
                  <td class="px-2 py-1">
                    <InputText v-model="it.uomCode" class="w-full text-xs" placeholder="UOM" />
                  </td>
                  <td class="px-2 py-1">
                    <select v-model="it.binLocationId" class="w-full rounded border p-1 text-xs">
                      <option value="">Select Bin</option>
                      <option v-for="b in binLocations" :key="b.id" :value="b.id">{{ b.code }}</option>
                    </select>
                  </td>
                  <td class="px-2 py-1">
                    <Button icon="pi pi-trash" severity="danger" size="small" text :disabled="!canCreate" @click="removeItem(idx)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mt-4 flex justify-end gap-2">
          <Button label="Cancel" severity="secondary" @click="dialogOpen = false" />
          <Button label="Save" :loading="saving" :disabled="!canCreate" @click="save" />
        </div>
        <div v-if="dialogError" class="mt-2 text-sm text-red-600">{{ dialogError }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const q = ref('');
const status = ref('');
const loading = ref(false);
const issues = ref<any[]>([]);
const error = ref('');
const successMsg = ref('');
const dialogOpen = ref(false);
const dialogError = ref('');
const editingId = ref('');
const saving = ref(false);
const submittingId = ref('');

const form = ref({
  issueDate: '',
  warehouseId: '',
  referenceType: '',
  referenceId: '',
  notes: '',
  items: [] as any[],
});

const warehouses = ref<any[]>([]);
const items = ref<any[]>([]);
const binLocations = ref<any[]>([]);

const canRead = ref(true);
const canCreate = ref(true);
const canUpdate = ref(true);
const canPost = ref(true);

const api = useApi();

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';

const load = async () => {
  loading.value = true;
  error.value = '';
  try {
    const params = new URLSearchParams();
    if (q.value) params.append('q', q.value);
    if (status.value) params.append('status', status.value);
    const res = await api.get(`/inventory/issues?${params}`);
    issues.value = res.issues;
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Failed to load';
  } finally {
    loading.value = false;
  }
};

const loadWarehouses = async () => {
  const res = await api.get('/inventory/warehouses');
  warehouses.value = res.warehouses;
};

const loadItems = async () => {
  const res = await api.get('/inventory/items');
  items.value = res.items;
};

const loadBinLocations = async (warehouseId: string) => {
  if (!warehouseId) {
    binLocations.value = [];
    return;
  }
  const res = await api.get(`/inventory/warehouses/${warehouseId}/bins`);
  binLocations.value = res.binLocations || [];
};

const openCreate = () => {
  editingId.value = '';
  form.value = {
    issueDate: new Date().toISOString().slice(0, 10),
    warehouseId: '',
    referenceType: '',
    referenceId: '',
    notes: '',
    items: [{}],
  };
  binLocations.value = [];
  dialogOpen.value = true;
  dialogError.value = '';
};

const openEdit = async (row: any) => {
  editingId.value = row.id;
  const res = await api.get(`/inventory/issues/${row.id}`);
  const issue = res.issue;
  form.value = {
    issueDate: issue.issueDate?.slice(0, 10) ?? '',
    warehouseId: issue.warehouseId,
    referenceType: issue.referenceType ?? '',
    referenceId: issue.referenceId ?? '',
    notes: issue.notes ?? '',
    items: issue.items?.map((it: any) => ({
      itemId: it.itemId || '',
      description: it.description,
      qty: it.qty,
      uomCode: it.uomCode || '',
      binLocationId: it.binLocationId || '',
    })) ?? [],
  };
  await loadBinLocations(issue.warehouseId);
  dialogOpen.value = true;
  dialogError.value = '';
};

const addItem = () => {
  form.value.items.push({ itemId: '', description: '', qty: 0, uomCode: '', binLocationId: '' });
};

const removeItem = (idx: number) => {
  form.value.items.splice(idx, 1);
};

const save = async () => {
  if (!form.value.warehouseId) {
    dialogError.value = 'Warehouse required';
    return;
  }
  if (form.value.items.length === 0) {
    dialogError.value = 'Add at least one item';
    return;
  }

  saving.value = true;
  dialogError.value = '';
  successMsg.value = '';
  try {
    const payload = {
      issueDate: form.value.issueDate,
      warehouseId: form.value.warehouseId,
      referenceType: form.value.referenceType || undefined,
      referenceId: form.value.referenceId || undefined,
      notes: form.value.notes || undefined,
      items: form.value.items.map((it: any) => ({
        itemId: it.itemId || undefined,
        description: it.description,
        qty: it.qty,
        uomCode: it.uomCode || undefined,
        warehouseId: form.value.warehouseId,
        binLocationId: it.binLocationId || undefined,
      })),
    };
    if (editingId.value) {
      await api.patch(`/inventory/issues/${editingId.value}`, payload);
      successMsg.value = 'Goods Issue updated';
    } else {
      await api.post('/inventory/issues', payload);
      successMsg.value = 'Goods Issue created';
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    dialogError.value = e?.response?.data?.message ?? 'Failed to save';
  } finally {
    saving.value = false;
  }
};

const submit = async (row: any) => {
  submittingId.value = row.id;
  error.value = '';
  successMsg.value = '';
  try {
    await api.post(`/inventory/issues/${row.id}/submit`);
    successMsg.value = 'Goods Issue submitted';
    await load();
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Failed to submit';
  } finally {
    submittingId.value = '';
  }
};

watch(() => form.value.warehouseId, async (newVal) => {
  if (newVal && !editingId.value) {
    await loadBinLocations(newVal);
  }
});

onMounted(async () => {
  await Promise.all([loadWarehouses(), loadItems(), load()]);
});
</script>