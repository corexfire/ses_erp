<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section (Premium Sales Style) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-xl group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-rose-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Revenue Engine</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-rose-600">Dynamic Pricing Rules</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Mesin <span class="text-rose-600">Harga</span></h1>
        <p class="text-slate-500 text-sm font-medium">Atur strategi harga kondisional, kampanye promo, dan kontrak eksklusif pelanggan.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Seting Aturan Harga Khusus" icon="pi pi-tag" class="p-button-rounded font-black text-xs shadow-lg shadow-rose-100 bg-rose-600 border-none text-white px-6 h-12" @click="openCreate" />
      </div>
    </div>

    <!-- Overview Banners -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl flex items-start gap-4">
          <div class="p-4 bg-slate-900 rounded-3xl text-white text-xl shadow-xl flex-shrink-0"><i class="pi pi-book"></i></div>
          <div>
             <div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Level 1: Price List Utama</div>
             <p class="text-xs text-slate-600 leading-relaxed font-medium">Harga dasar publik untuk semua pelanggan. Bersifat statis kecuali di-override oleh aturan harga khusus.</p>
          </div>
       </div>
       <div class="group p-6 rounded-xl bg-rose-900 text-white shadow-xl flex items-start gap-4 border border-rose-800">
          <div class="p-4 bg-rose-600 rounded-3xl text-white text-xl shadow-lg flex-shrink-0 animate-pulse"><i class="pi pi-bolt"></i></div>
          <div>
             <div class="text-[10px] font-black uppercase text-rose-300 tracking-widest mb-1">Level 2: Pricing Rules Engine</div>
             <p class="text-xs text-rose-100/80 leading-relaxed font-medium">Logika dinamis yang menimpa harga buku. Dipicu oleh Klien VIP, promo musiman, atau kuantitas tertentu.</p>
          </div>
       </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/10">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Matriks Aturan Harga</h2>
             <p class="text-xs text-slate-500 font-medium">Daftar aturan aktif yang sedang memanipulasi nilai transaksi.</p>
          </div>
          <div class="flex items-center gap-3">
             <div class="relative">
                <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs text-rose-500"></i>
                <InputText v-model="search" placeholder="Cari Kode / SKU..." class="pl-10 text-xs font-bold rounded-2xl w-64 border-slate-200 h-10" />
             </div>
             <SelectButton v-model="statusFilter" :options="['ALL', 'ACTIVE', 'EXPIRED']" class="p-button-sm text-[10px] font-black uppercase" />
          </div>
       </div>

       <DataTable :value="filteredDocs" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column header="TAKTIK & HIRARKI" class="pl-8">
             <template #body="{ data }">
                <div class="flex items-center gap-3 py-2">
                   <div class="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center relative overflow-hidden">
                      <div :class="['absolute inset-0 opacity-10', !data.isActive ? 'bg-rose-500' : 'bg-emerald-500']"></div>
                      <i :class="['pi text-xs relative z-10', !data.isActive ? 'pi-ban text-rose-600' : 'pi-tag text-emerald-600']"></i>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[11px] font-black text-slate-800">{{ data.name }}</span>
                      <div class="flex items-center gap-2 mt-0.5">
                         <span class="text-[9px] font-bold text-slate-400 font-mono tracking-tighter">{{ data.code }}</span>
                         <span class="text-[8px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded uppercase tracking-widest">Prio: {{ data.priority }}</span>
                      </div>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="TRIGGER SKU">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-700">{{ data.itemCode || 'Global / Semua SKU' }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">UoM: {{ data.uomCode || '*' }}</span>
                </div>
             </template>
          </Column>
          <Column header="OVERRIDE HARGA" class="text-center">
             <template #body="{ data }">
                <div :class="['inline-block px-4 py-2 rounded-2xl border font-mono transition-all', data.isActive ? 'bg-rose-50 border-rose-100 text-rose-700 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400']">
                   <div class="text-[8px] font-black uppercase text-rose-400/60 leading-none mb-1">TRANSACTION VALUE</div>
                   <div class="text-base font-black tracking-tighter">Rp {{ formatCurrency(data.unitPrice) }}</div>
                </div>
             </template>
          </Column>
          <Column header="KONDISI PEMANTIK">
             <template #body="{ data }">
                <div class="flex flex-col gap-1">
                   <div class="flex items-center gap-2">
                      <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Client:</span>
                      <span class="text-[10px] font-black text-emerald-600">{{ data.customer?.name || data.customerGroup || 'PULIK / UMUM' }}</span>
                   </div>
                   <div class="flex items-center gap-2">
                      <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Valid:</span>
                      <span :class="['text-[10px] font-bold', isExpired(data.endDate) ? 'text-rose-500 line-through' : 'text-slate-600']">
                         {{ formatDate(data.effectiveDate) }} - {{ formatDate(data.endDate) }}
                      </span>
                   </div>
                </div>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <div class="flex gap-2 justify-end">
                   <Button :icon="data.isActive ? 'pi pi-ban' : 'pi pi-check-circle'" :severity="data.isActive ? 'danger' : 'success'" rounded text @click="toggleStatus(data)" v-tooltip="data.isActive ? 'Nonaktifkan Aturan' : 'Aktifkan Kembali'" />
                   <Button icon="pi pi-pencil" severity="secondary" rounded text @click="openEdit(data)" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Creation/Edit Dialog -->
    <Dialog v-model:visible="modalVisible" modal class="w-[750px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden shadow-2xl transition-all' }, header: { class: 'hidden' } }">
      <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-white">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-rose-900 flex items-center justify-center text-white shadow-xl">
            <i class="pi pi-tag text-xl"></i>
          </div>
          <div>
            <h4 class="text-xl font-black text-slate-900 leading-tight">{{ isNew ? 'Aturan Harga Baru' : `Edit Aturan: ${form.code}` }}</h4>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing Formula Configuration</p>
          </div>
        </div>
        <Button icon="pi pi-times" severity="secondary" rounded text @click="modalVisible = false" />
      </div>

      <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto bg-slate-50/30">
        <!-- Section 1: Basic Info -->
        <div class="space-y-4 animate-fade-in">
           <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">1</div>
             <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Definisi Strategi</h4>
           </div>
           <div class="grid grid-cols-2 gap-6 pl-9">
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Kode Aturan</label>
                 <InputText v-model="form.code" class="w-full text-xs font-bold rounded-xl h-10 border-slate-200" placeholder="PR-XXXX-2024" :disabled="!isNew" />
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Nama Strategi / Taktik</label>
                 <InputText v-model="form.name" class="w-full text-xs font-bold rounded-xl h-10 border-slate-200" placeholder="Contoh: Promo Ramadhan / Kontrak VIP" />
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Tingkat Prioritas (1-99)</label>
                 <InputNumber v-model="form.priority" class="w-full" inputClass="rounded-xl h-10 border-slate-200 text-xs font-bold px-4" placeholder="Makin rendah makin diutamakan" :min="1" :max="99" />
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Override Harga Satuan</label>
                 <InputNumber v-model="form.unitPrice" mode="currency" currency="IDR" locale="id-ID" class="w-full" inputClass="rounded-xl h-10 border-slate-200 text-xs font-black px-4 text-rose-600" placeholder="0" />
              </div>
           </div>
        </div>

        <!-- Section 2: Trigger Conditions -->
        <div class="space-y-4 animate-fade-in">
           <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs">2</div>
             <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Kondisi Pemantik (Trigger)</h4>
           </div>
           <div class="grid grid-cols-2 gap-6 pl-9">
              <div class="space-y-2 lg:col-span-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Target Produk / SKU</label>
                 <Select v-model="form.itemCode" :options="items" optionLabel="label" optionValue="code" placeholder="Pilih Produk (Kosongkan untuk Global)..." filter class="w-full text-xs font-bold rounded-xl border-slate-200" showClear />
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Target Pelanggan</label>
                 <Select v-model="form.customerId" :options="customers" optionLabel="name" optionValue="id" placeholder="Pilih Pelanggan Khusus..." filter class="w-full text-xs font-bold rounded-xl border-slate-200" showClear />
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Grup Pelanggan</label>
                 <Select v-model="form.customerGroup" :options="['RETAIL', 'DISTRIBUTOR', 'VIP', 'STAFF']" placeholder="Atau berdasarkan Grup..." class="w-full text-xs font-bold rounded-xl border-slate-200" showClear />
              </div>
           </div>
        </div>

         <!-- Section 3: Validity -->
        <div class="space-y-4 animate-fade-in">
           <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs">3</div>
             <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Masa Berlaku Aturan</h4>
           </div>
           <div class="grid grid-cols-2 gap-6 pl-9">
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Tanggal Efektif</label>
                 <InputText v-model="form.effectiveDate" type="date" class="w-full text-xs font-bold rounded-xl h-10 border-slate-200" />
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Tanggal Berakhir (Opsional)</label>
                 <InputText v-model="form.endDate" type="date" class="w-full text-xs font-bold rounded-xl h-10 border-slate-200" />
              </div>
           </div>
        </div>
      </div>

      <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-[2.5rem]">
        <Button label="Batal" severity="secondary" text @click="modalVisible = false" class="font-black text-[10px] uppercase px-6" />
        <Button :label="isNew ? 'Terbitkan Aturan Harga' : 'Update Aturan'" icon="pi pi-check-circle" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-rose-600 border-none text-white shadow-lg shadow-rose-100 h-12 hover:bg-rose-700" @click="savePriceRule" :loading="saving" />
      </div>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useApi } from '@/composables/useApi';

const api = useApi();
const toast = useToast();

const loading = ref(false);
const saving = ref(false);
const modalVisible = ref(false);
const isNew = ref(false);

const docs = ref<any[]>([]);
const items = ref<any[]>([]);
const customers = ref<any[]>([]);

const search = ref('');
const statusFilter = ref('ALL');

const form = reactive({
  id: '',
  code: '',
  name: '',
  priority: 10,
  itemCode: null,
  uomCode: 'PCS',
  unitPrice: 0,
  effectiveDate: new Date().toISOString().split('T')[0],
  endDate: '',
  customerId: null,
  customerGroup: null,
  isActive: true
});

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/sales/pricing/price-rules');
    docs.value = res.data.priceRules || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message });
  } finally {
    loading.value = false;
  }
}

async function loadReferences() {
  try {
    const itemsRes = await api.get('/inventory/items');
    items.value = itemsRes.data.items.map((i: any) => ({ label: `[${i.code}] ${i.name}`, code: i.code }));

    const cusRes = await api.get('/crm/customers');
    customers.value = cusRes.data.customers || [];
  } catch (e) {}
}

const isExpired = (iso: string) => {
  if (!iso) return false;
  return new Date(iso) < new Date();
};

const filteredDocs = computed(() => {
  let list = docs.value;
  if (statusFilter.value === 'EXPIRED') {
    list = list.filter(p => isExpired(p.endDate));
  } else if (statusFilter.value === 'ACTIVE') {
    list = list.filter(p => !isExpired(p.endDate) && p.isActive);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.code?.toLowerCase().includes(q) || p.itemCode?.toLowerCase().includes(q) || p.name?.toLowerCase().includes(q));
  }
  return list;
});

const formatCurrency = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

const formatDate = (iso: string) => {
  if (!iso) return 'N/A';
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

function openCreate() {
  isNew.value = true;
  Object.assign(form, {
    id: '',
    code: `PR-${new Date().getTime().toString().substr(-6)}`,
    name: '',
    priority: 10,
    itemCode: null,
    uomCode: 'PCS',
    unitPrice: 0,
    effectiveDate: new Date().toISOString().split('T')[0],
    endDate: '',
    customerId: null,
    customerGroup: null,
    isActive: true
  });
  loadReferences();
  modalVisible.value = true;
}

function openEdit(data: any) {
  isNew.value = false;
  Object.assign(form, {
    ...data,
    effectiveDate: data.effectiveDate?.split('T')[0],
    endDate: data.endDate?.split('T')[0]
  });
  loadReferences();
  modalVisible.value = true;
}

async function savePriceRule() {
  if (!form.name || !form.unitPrice || !form.effectiveDate) {
    toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Mohon lengkapi data strategi harga.' });
    return;
  }

  saving.value = true;
  try {
    if (isNew.value) {
      await api.post('/sales/pricing/price-rules', form);
      toast.add({ severity: 'success', summary: 'Sukses', detail: 'Aturan harga dinamis telah diterbitkan.' });
    } else {
      await api.patch(`/sales/pricing/price-rules/${form.id}`, form);
      toast.add({ severity: 'success', summary: 'Diperbarui', detail: 'Aturan harga berhasil diperbarui.' });
    }
    modalVisible.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function toggleStatus(doc: any) {
  try {
    if (doc.isActive) {
      await api.patch(`/sales/pricing/price-rules/${doc.id}/deactivate`);
      toast.add({ severity: 'info', summary: 'Status Dicabut', detail: `Aturan ${doc.code} kini tidak aktif.` });
    } else {
       // Activate logic (if endpoint exists, otherwise use regular update)
       await api.patch(`/sales/pricing/price-rules/${doc.id}`, { isActive: true });
       toast.add({ severity: 'success', summary: 'Status Aktif', detail: `Aturan ${doc.code} kini diberlakukan kembali.` });
    }
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  }
}

onMounted(load);
</script>

<style scoped>
:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(255, 241, 242, 0.4) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(.p-select), :deep(.p-inputtext), :deep(.p-inputnumber-input), :deep(.p-textarea) {
   border-color: #e2e8f0 !important;
   box-shadow: none !important;
}

:deep(.p-select:hover), :deep(.p-inputtext:hover), :deep(.p-inputnumber-input:hover) {
   border-color: #f43f5e !important;
}
</style>
