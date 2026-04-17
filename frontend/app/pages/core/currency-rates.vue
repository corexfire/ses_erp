<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-amber-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Treasury & Forex</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Manajemen Kurs</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Currency <span class="text-amber-600">Rates</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight italic">Monitoring nilai tukar mata uang asing terhadap mata uang dasar (Functional Currency) secara harian.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Input Kurs Baru" icon="pi pi-plus" class="p-button-rounded p-button-warning font-black text-xs shadow-lg shadow-amber-100 px-6" @click="openNewRate" />
      </div>
    </div>

    <!-- Stats / Treasury Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ s.prefix }} {{ fmtNumber(s.value) }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main Content Area with Tabs -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-amber-300 transition-all duration-500">
       <div class="p-2 border-b border-slate-100 bg-slate-50/10">
          <Tabs v-model:value="activeTab">
            <TabList class="bg-transparent border-none px-6 pt-4">
              <Tab value="rates" class="text-[11px] font-black uppercase tracking-widest mr-4 pb-4">Histori Kurs Harian</Tab>
              <Tab value="master" class="text-[11px] font-black uppercase tracking-widest pb-4">Master Mata Uang</Tab>
            </TabList>
          </Tabs>
       </div>

       <div class="p-0">
          <!-- VIEW: EXCHANGE RATES HISTORY -->
          <template v-if="activeTab === 'rates'">
             <DataTable :value="exchangeRates" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
                <Column header="CURRENCY PAIR" class="pl-8">
                   <template #body="{ data }">
                      <div class="flex items-center gap-3">
                         <div class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100">
                            <span class="text-[10px] font-black text-amber-600">{{ data.baseCurrency?.symbol || '?' }}</span>
                         </div>
                         <div class="flex flex-col">
                            <span class="text-[12px] font-black text-slate-900 font-mono">{{ data.baseCurrency?.code }} / {{ data.quoteCurrency?.code }}</span>
                            <span class="text-[9px] font-bold text-slate-400 uppercase">{{ data.baseCurrency?.name }}</span>
                         </div>
                      </div>
                   </template>
                </Column>
                <Column header="EXCHANGE RATE">
                   <template #body="{ data }">
                      <span class="text-[13px] font-black text-slate-900 italic">
                         {{ fmtRate(data.rate) }}
                      </span>
                   </template>
                </Column>
                <Column header="VALID DATE">
                   <template #body="{ data }">
                      <div class="flex items-center gap-2">
                         <i class="pi pi-calendar text-[10px] text-slate-400"></i>
                         <span class="text-[11px] font-bold text-slate-600">{{ fmtDate(data.rateDate) }}</span>
                      </div>
                   </template>
                </Column>
                <Column header="LAST UPDATED">
                   <template #body="{ data }">
                      <span class="text-[9px] font-bold text-slate-400 uppercase font-mono">{{ fmtDateTime(data.updatedAt) }}</span>
                   </template>
                </Column>
                <Column class="text-right pr-8">
                   <template #body="{ data }">
                      <Button icon="pi pi-chart-line" severity="secondary" rounded text />
                   </template>
                </Column>
             </DataTable>
          </template>

          <!-- VIEW: MASTER CURRENCIES -->
          <template v-else>
             <div class="p-8 border-b border-slate-50 flex items-center justify-between">
                <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Enabled Currencies in System</h3>
                <Button label="Mata Uang Baru" icon="pi pi-plus" size="small" text @click="openNewCurrency" />
             </div>
             <DataTable :value="currencies" dataKey="id" class="p-datatable-sm w-full">
                <Column field="code" header="CODE" class="pl-8">
                   <template #body="{ data }">
                      <span class="font-mono text-[11px] font-black text-indigo-600">{{ data.code }}</span>
                   </template>
                </Column>
                <Column field="name" header="CURRENCY NAME">
                   <template #body="{ data }">
                      <span class="text-[11px] font-bold text-slate-800 uppercase">{{ data.name }}</span>
                   </template>
                </Column>
                <Column field="symbol" header="SYMBOL">
                   <template #body="{ data }">
                      <span class="text-lg font-bold text-slate-400">{{ data.symbol }}</span>
                   </template>
                </Column>
                <Column header="TYPE">
                   <template #body="{ data }">
                      <span v-if="data.isBase" class="px-3 py-1 bg-blue-900 text-white text-[9px] font-black uppercase rounded-full">Base / Functional</span>
                      <span v-else class="text-[9px] font-bold text-slate-400 uppercase">Foreign Currency</span>
                   </template>
                </Column>
                <Column class="text-right pr-8">
                   <template #body="{ data }">
                      <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="!data.isBase" @click="deactivateCurrency(data)" />
                   </template>
                </Column>
             </DataTable>
          </template>
       </div>
    </div>

    <!-- Rate Entry Dialog -->
    <Dialog v-model:visible="rateDrawerOpen" header="Input Kurs Exchange" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-6 bg-amber-50 border border-amber-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-amber-600 shadow-sm border border-amber-100">
                <i class="pi pi-money-bill text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-amber-900 uppercase leading-none mb-1">Treasury Input</p>
                <p class="text-[9px] font-bold text-amber-600 uppercase italic">Masukkan dataset nilai tukar harian resmi.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Currency (Mata Uang Dasar)</label>
                <Select v-model="rateForm.quoteCurrencyId" :options="currencies.filter(cc => cc.isBase)" optionLabel="name" optionValue="id" class="w-full rounded-2xl border-slate-200" disabled />
             </div>

             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Currency</label>
                   <Select v-model="rateForm.baseCurrencyId" :options="currencies.filter(cc => !cc.isBase)" optionLabel="name" optionValue="id" class="w-full rounded-2xl border-slate-200" placeholder="Pilih Valas..." />
                </div>
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Kurs</label>
                   <InputText v-model="rateForm.rateDate" type="date" class="w-full rounded-2xl border-slate-200" />
                </div>
             </div>

             <div class="p-8 bg-slate-900 rounded-xl text-white space-y-4 shadow-xl shadow-amber-100">
                <label class="text-[10px] font-black text-amber-400 uppercase tracking-widest">Official Exchange Rate</label>
                <div class="flex items-end gap-3">
                   <span class="text-3xl font-black text-white italic">IDR</span>
                   <InputNumber v-model="rateForm.rate" :minFractionDigits="4" class="p-inputtext-dark flex-1 h-14 text-2xl font-black" placeholder="0.0000" mode="decimal" />
                </div>
                <p class="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Nilai tukar per 1 unit mata uang asing dalam Rupiah.</p>
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="rateDrawerOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Posting Kurs" icon="pi pi-check" class="p-button-rounded p-button-warning font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-amber-100" @click="saveRate" :loading="saving" />
          </div>
       </template>
    </Dialog>

    <!-- Currency Master Dialog -->
    <Dialog v-model:visible="currencyDrawerOpen" header="Registrasi Mata Uang" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                <i class="pi pi-globe text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-indigo-900 uppercase leading-none mb-1">Currency Configuration</p>
                <p class="text-[9px] font-bold text-indigo-600 uppercase italic">Tambahkan mata uang asing ke dalam sistem.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">ISO Code</label>
                   <InputText v-model="currencyForm.code" class="w-full rounded-2xl border-slate-200 font-mono uppercase" placeholder="USD / SGD" />
                </div>
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Valas</label>
                   <InputText v-model="currencyForm.name" class="w-full rounded-2xl border-slate-200" placeholder="US Dollar" />
                </div>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Simbol</label>
                   <InputText v-model="currencyForm.symbol" class="w-full rounded-2xl border-slate-200" placeholder="$ / Rp / €" />
                </div>
                <div class="flex items-center gap-2 pt-6">
                   <Checkbox v-model="currencyForm.isBase" :binary="true" />
                   <label class="text-[10px] font-black text-slate-600 uppercase">Set as Functional (Base)</label>
                </div>
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="currencyDrawerOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Simpan Mata Uang" icon="pi pi-save" class="p-button-rounded p-button-indigo font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-indigo-100" @click="saveCurrency" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const activeTab = ref('rates');
const currencies = ref<any[]>([]);
const exchangeRates = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const rateDrawerOpen = ref(false);
const currencyDrawerOpen = ref(false);

const rateForm = ref<any>({
  baseCurrencyId: '',
  quoteCurrencyId: '',
  rate: 0,
  rateDate: new Date().toISOString().slice(0, 10)
});

const currencyForm = ref<any>({
  code: '',
  name: '',
  symbol: '',
  isBase: false
});

const stats = computed(() => {
  const usdRate = exchangeRates.value.find(r => r.baseCurrency?.code === 'USD')?.rate || 0;
  const eurRate = exchangeRates.value.find(r => r.baseCurrency?.code === 'EUR')?.rate || 0;
  return [
    { label: 'Base Operational', value: currencies.value.find(c => c.isBase)?.code || '-', prefix: '', sub: 'Functional Currency', icon: 'pi pi-home', color: 'bg-blue-50 text-blue-600' },
    { label: 'Current USD Rate', value: usdRate, prefix: 'Rp', sub: 'vs IDR (Last Entry)', icon: 'pi pi-dollar', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Current EUR Rate', value: eurRate, prefix: 'Rp', sub: 'vs IDR (Last Entry)', icon: 'pi pi-euro', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Forex Coverage', value: currencies.value.filter(c => !c.isBase).length, prefix: '', sub: 'Supported Currencies', icon: 'pi pi-globe', color: 'bg-amber-50 text-amber-600' }
  ];
});

async function load() {
  loading.value = true;
  try {
    const [cRes, rRes] = await Promise.all([
      api.get('/core/currencies'),
      api.get('/core/exchange-rates')
    ]);
    currencies.value = cRes.currencies || cRes.data?.currencies || [];
    exchangeRates.value = rRes.exchangeRates || rRes.data?.exchangeRates || [];
    
    const base = currencies.value.find(c => c.isBase);
    if (base) rateForm.value.quoteCurrencyId = base.id;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNewRate() {
  rateForm.value.rate = 0;
  rateForm.value.baseCurrencyId = '';
  rateForm.value.rateDate = new Date().toISOString().slice(0, 10);
  rateDrawerOpen.value = true;
}

function openNewCurrency() {
  currencyForm.value = { code: '', name: '', symbol: '', isBase: false };
  currencyDrawerOpen.value = true;
}

async function saveRate() {
  saving.value = true;
  try {
    await api.post('/core/exchange-rates', rateForm.value);
    toast.add({ severity: 'success', summary: 'Kurs Diposting', detail: 'Nilai tukar berhasil diperbarui pada database.' });
    rateDrawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function saveCurrency() {
  saving.value = true;
  try {
    await api.post('/core/currencies', currencyForm.value);
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Mata uang baru berhasil didaftarkan.' });
    currencyDrawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function deactivateCurrency(curr: any) {
  try {
    await api.patch(`/core/currencies/${curr.id}/deactivate`);
    toast.add({ severity: 'warn', summary: 'Disabled', detail: 'Mata uang dinonaktifkan.' });
    load();
  } catch (e) {}
}

function fmtNumber(v: any) {
  if (!v) return '0';
  if (typeof v === 'string') return v;
  return new Intl.NumberFormat('id-ID').format(v);
}
function fmtRate(v: any) { return Number(v).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 4 }); }
function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { dateStyle: 'long' }) : '-' }
function fmtDateTime(d: string) { return d ? new Date(d).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-' }

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

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-inputtext-dark) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border-radius: 1rem !important;
}

:deep(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  background: rgba(15, 23, 42, 0.4) !important;
}

:deep(.p-dialog) {
  border-radius: 2.5rem !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-dialog-header) {
  padding: 2rem 2.5rem 1rem !important;
}

:deep(.p-dialog-content) {
  padding: 0 2.5rem 2rem !important;
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-slate-200 rounded-full; }
</style>
