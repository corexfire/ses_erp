<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Site Warehouse Inventory</h1>
        <p class="text-slate-500 text-sm">Track real-time material balances localized to this construction site.</p>
      </div>
      <div class="flex gap-2">
          <Button label="Stock In" icon="pi pi-box" @click="openDialog('IN')" class="bg-emerald-600 hover:bg-emerald-700" />
          <Button label="Stock Out (Consume)" icon="pi pi-arrow-down-right" @click="openDialog('OUT')" class="bg-indigo-600 hover:bg-indigo-700" />
      </div>
    </div>

    <!-- Ledger View -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <DataTable :value="items" :paginator="true" :rows="10" :loading="loading" stripedRows>
        <template #empty>
          <div class="p-8 text-center text-slate-500">No inventory transactions recorded.</div>
        </template>
        <Column field="transactionDate" header="Date">
            <template #body="{ data }">
                <span class="text-sm">{{ processDate(data.transactionDate) }}</span>
            </template>
        </Column>
        <Column field="materialName" header="Material Name">
            <template #body="{ data }">
                <div class="font-bold text-slate-800">{{ data.materialName }}</div>
                <div class="text-xs text-slate-400">SKU: {{ data.sku || '-' }}</div>
            </template>
        </Column>
        <Column header="Type" align="center">
            <template #body="{ data }">
                <Tag v-if="data.quantityIn > 0" severity="success" value="IN" />
                <Tag v-else-if="data.quantityOut > 0" severity="danger" value="OUT" />
            </template>
        </Column>
        <Column field="qty" header="Qty" align="right">
            <template #body="{ data }">
                <div v-if="data.quantityIn > 0" class="text-emerald-600 font-bold">+{{ data.quantityIn }}</div>
                <div v-if="data.quantityOut > 0" class="text-rose-600 font-bold">-{{ data.quantityOut }}</div>
            </template>
        </Column>
        <Column field="uom" header="UOM" />
        <Column field="balance" header="Running Balance" align="right">
            <template #body="{ data }">
                <span class="font-bold text-indigo-700 text-lg">{{ data.balance }}</span>
            </template>
        </Column>
      </DataTable>
    </div>

    <!-- Transaction Dialog -->
    <Dialog v-model:visible="visible" :style="{ width: '450px' }" :header="txType === 'IN' ? 'Stock In (Receive Material)' : 'Stock Out (Consume Material)'" :modal="true" class="p-fluid">
      <div class="flex flex-col gap-4 mt-2">
        <div class="field">
          <label class="font-bold text-sm text-slate-700">Transaction Date</label>
          <DatePicker v-model="form.transactionDate" dateFormat="dd/mm/yy" />
        </div>

        <div class="field">
          <label class="font-bold text-sm text-slate-700">Material Name</label>
          <InputText v-model.trim="form.materialName" required="true" autofocus :class="{'p-invalid': submitted && !form.materialName}" />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="field">
              <label class="font-bold text-sm text-slate-700">SKU / Code</label>
              <InputText v-model="form.sku" />
            </div>
            <div class="field">
                <label class="font-bold text-sm text-slate-700">UOM (e.g., Sak, Ton)</label>
                <InputText v-model="form.uom" />
            </div>
        </div>
        <div class="field">
            <label class="font-bold text-sm text-slate-700">Quantity ({{ txType }})</label>
            <InputNumber v-model="form.qty" :minFractionDigits="0" :maxFractionDigits="2" :class="{'p-invalid': submitted && form.qty <= 0}" />
        </div>
        <div class="field">
          <label class="font-bold text-sm text-slate-700">Notes / Reference No.</label>
          <InputText v-model="form.notes" placeholder="e.g. Delivery Order #123" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="visible = false" />
        <Button label="Save Transaction" icon="pi pi-check" @click="saveItem" :loading="saving" :class="txType === 'IN' ? 'bg-emerald-600' : 'bg-indigo-600'" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useApi } from '@/composables/useApi';

const api = useApi();
const toast = useToast();

const items = ref<any[]>([]);
const loading = ref(true);
const visible = ref(false);
const submitted = ref(false);
const saving = ref(false);
const txType = ref('IN');

const form = ref({
  projectId: '',
  transactionDate: new Date(),
  materialName: '',
  sku: '',
  uom: '',
  qty: 0,
  notes: ''
});

const loadData = async () => {
  loading.value = true;
  try {
    const res = await api.get('/construction/site-inventory');
    items.value = res.data || [];
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};


const openDialog = (type: string) => {
  txType.value = type;
  form.value = {
    projectId: '',
    transactionDate: new Date(),
    materialName: '',
    sku: '',
    uom: '',
    qty: 0,
    notes: ''
  };
  submitted.value = false;
  visible.value = true;
};

const saveItem = async () => {
  submitted.value = true;
  if (!form.value.materialName || form.value.qty <= 0) return;
  saving.value = true;

  try {
    const payload: any = { 
        ...form.value,
        quantityIn: txType.value === 'IN' ? form.value.qty : 0,
        quantityOut: txType.value === 'OUT' ? form.value.qty : 0
    };

    if(!payload.projectId) {
         const res = await api.get('/projects');
         if(res.data && res.data.list && res.data.list.length > 0) payload.projectId = res.data.list[0].id;
    }

    await api.post('/construction/site-inventory', payload);

    toast.add({ severity: 'success', summary: 'Success', detail: 'Inventory transaction saved', life: 3000 });
    visible.value = false;
    loadData();
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message || 'Failed to save', life: 3000 });
  } finally {
    saving.value = false;
  }
};


onMounted(() => {
  loadData();
});

const processDate = (d: string) => {
    if(!d) return '-';
    // Format with time
    return new Date(d).toLocaleString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
};
</script>
