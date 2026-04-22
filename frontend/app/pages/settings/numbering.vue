<template>
  <div class="space-y-4">
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Settings & Tools</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Document Numbering Series</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Numbering <span class="text-amber-600 not-italic text-3xl">Series</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3">Konfigurasi format auto-numbering untuk setiap jenis dokumen transaksi lintas modul ERP.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="+ Tambah Series" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-all" @click="openCreate" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <div class="p-4 rounded-2xl bg-amber-950 text-white shadow-xl flex flex-col justify-between border border-amber-900 hover:bg-black group transition-all">
        <div class="text-[10px] font-black uppercase text-amber-400 tracking-[0.2em] mb-4">Total Series</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ series.length }}</h3><div class="p-3 bg-white/5 rounded-xl group-hover:rotate-12 transition-transform"><i class="pi pi-hashtag text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Aktif</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ series.filter(s => s.active).length }}</h3><div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Total Counter</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-indigo-700 tracking-tighter leading-none">{{ series.reduce((s,x) => s + x.current, 0) }}</h3><div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><i class="pi pi-list text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-amber-100 tracking-[0.2em] mb-4">Modul Terhubung</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ [...new Set(series.map(s=>s.module))].length }}</h3><div class="p-3 bg-white/10 rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-tag text-lg"></i></div></div>
      </div>
    </div>

    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden mt-6 pb-20">
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-xl"><i class="pi pi-hashtag text-xl"></i></div>
          <div><h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] mb-1">Document Numbering Series Registry</h3><p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Auto-Numbering Configuration</p></div>
        </div>
        <select v-model="filterModule" class="border border-slate-200 rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400">
          <option value="">Semua Modul</option>
          <option v-for="m in moduleList" :key="m" :value="m">{{ m }}</option>
        </select>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-white text-left border-b border-slate-50">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Jenis Dokumen</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Modul</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Prefix</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Format</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Counter</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Status</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="s in filteredSeries" :key="s.docType" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-amber-400">
              <td class="px-8 py-5 align-middle">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform"><i class="pi pi-file text-sm"></i></div>
                  <div class="font-black text-[11px] text-slate-800 uppercase">{{ s.docType }}</div>
                </div>
              </td>
              <td class="px-6 py-5 border-l border-slate-50"><span class="text-[9px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded uppercase border border-indigo-200">{{ s.module }}</span></td>
              <td class="px-6 py-5 border-l border-slate-50"><code class="font-mono text-[11px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{{ s.prefix }}</code></td>
              <td class="px-6 py-5 border-l border-slate-50"><code class="font-mono text-[10px] font-black text-slate-600">{{ s.format }}</code></td>
              <td class="px-6 py-5 border-l border-slate-50 text-right"><span class="font-mono text-[13px] font-black text-slate-900">{{ String(s.current).padStart(4, '0') }}</span></td>
              <td class="px-6 py-5 border-l border-slate-50 text-center">
                <span :class="['inline-flex rounded-full px-3 py-1 text-[9px] font-black uppercase border', s.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200']">{{ s.active ? 'AKTIF' : 'NONAKTIF' }}</span>
              </td>
              <td class="px-8 py-5 border-l border-slate-50 text-right">
                <div class="flex gap-2 items-center justify-end opacity-0 group-hover:opacity-100 transition-all">
                  <Button icon="pi pi-eye" severity="secondary" rounded outlined size="small" class="w-8 h-8" @click="openView(s)" v-tooltip.top="'Detail'" />
                  <Button icon="pi pi-pencil" severity="secondary" rounded outlined size="small" class="w-8 h-8 border-amber-200 text-amber-600 hover:bg-amber-600 hover:text-white" @click="openEdit(s)" v-tooltip.top="'Edit'" />
                  <Button icon="pi pi-refresh" severity="secondary" rounded outlined size="small" class="w-8 h-8 border-sky-200 text-sky-600" @click="resetCounter(s)" v-tooltip.top="'Reset Counter'" />
                  <Button icon="pi pi-trash" severity="danger" rounded outlined size="small" class="w-8 h-8" @click="confirmDelete(s)" v-tooltip.top="'Hapus'" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- VIEW DIALOG -->
    <div v-if="viewDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="viewDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-lg bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-amber-900 overflow-hidden animate-scale-in">
        <div class="p-8 border-b border-slate-100 flex items-center justify-between relative overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-14 h-14 rounded-[1.5rem] bg-amber-600 text-white flex items-center justify-center shadow-xl"><i class="pi pi-hashtag text-2xl"></i></div>
            <div>
              <h3 class="text-xl font-black text-slate-900 uppercase">Detail Series</h3>
              <code class="text-[10px] font-black text-amber-600 uppercase mt-1 block">{{ selected?.prefix }}-FORMAT</code>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="viewDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="p-8 space-y-4 bg-slate-50/30">
          <div class="grid grid-cols-2 gap-4">
            <div v-for="field in viewFields" :key="field.label" class="p-4 rounded-2xl bg-white border border-slate-100">
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ field.label }}</p>
              <p class="text-[12px] font-black text-slate-900 mt-1 font-mono">{{ field.value }}</p>
            </div>
          </div>
          <!-- Preview next number -->
          <div class="p-5 rounded-2xl bg-amber-950 text-white border border-amber-900">
            <p class="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-2">Preview Nomor Berikutnya</p>
            <code class="text-xl font-black text-amber-300 font-mono">{{ selected?.prefix }}-{{ new Date().getFullYear() }}{{ String(new Date().getMonth()+1).padStart(2,'0') }}-{{ String((selected?.current||0)+1).padStart(4,'0') }}</code>
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3">
          <Button label="Edit Series" icon="pi pi-pencil" class="h-11 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="viewDialog = false; openEdit(selected)" />
          <Button label="Tutup" severity="secondary" outlined rounded @click="viewDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>

    <!-- CREATE / EDIT DIALOG -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="formDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-lg bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-amber-900 overflow-hidden animate-scale-in">
        <div class="p-8 border-b border-slate-100 flex items-center justify-between relative overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-14 h-14 rounded-[1.5rem] bg-amber-600 text-white flex items-center justify-center shadow-xl rotate-3 hover:rotate-0 transition-transform"><i class="pi pi-hashtag text-2xl"></i></div>
            <div><h3 class="text-xl font-black text-slate-900 uppercase">{{ isEdit ? 'Edit' : 'Tambah' }} Series</h3><p class="text-[10px] font-black text-amber-600 uppercase mt-1">Numbering Configuration</p></div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="formDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="p-8 space-y-4 bg-slate-50/30">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Jenis Dokumen</label>
              <input v-model="form.docType" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 uppercase" placeholder="e.g. Sales Invoice" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Modul</label>
              <select v-model="form.module" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none uppercase">
                <option v-for="m in ['SALES','PROCUREMENT','INVENTORY','FINANCE','MANUFACTURING','LOGISTICS','TAX','HRIS','PROJECT']" :key="m">{{ m }}</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Prefix</label>
              <input v-model="form.prefix" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[12px] font-black text-amber-700 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono uppercase" placeholder="INV" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Counter Awal</label>
              <input v-model.number="form.current" type="number" min="0" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[12px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Format</label>
            <input v-model="form.format" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-black text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono" placeholder="{PREFIX}-{YYYY}{MM}-{NNNN}" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</label>
            <div class="flex gap-3">
              <button @click="form.active = true" :class="['px-5 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all', form.active ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200']">AKTIF</button>
              <button @click="form.active = false" :class="['px-5 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all', !form.active ? 'bg-rose-600 text-white border-rose-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200']">NONAKTIF</button>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3">
          <Button :label="isEdit ? 'Simpan' : 'Tambah Series'" icon="pi pi-save" class="h-11 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="saveForm" />
          <Button label="Batal" severity="secondary" outlined rounded @click="formDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>

    <!-- DELETE CONFIRM -->
    <div v-if="deleteDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="deleteDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-sm bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-rose-900 p-8 text-center animate-scale-in">
        <div class="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 text-3xl"><i class="pi pi-exclamation-triangle"></i></div>
        <h3 class="text-lg font-black text-slate-900 uppercase">Hapus Series?</h3>
        <p class="text-[11px] text-slate-500 mt-2">Series <strong>{{ selected?.docType }}</strong> ({{ selected?.prefix }}) akan dihapus.</p>
        <div class="flex gap-3 justify-center mt-6">
          <Button label="Ya, Hapus" icon="pi pi-trash" class="h-11 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="doDelete" />
          <Button label="Batal" severity="secondary" outlined rounded @click="deleteDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const filterModule = ref('');
const viewDialog = ref(false);
const formDialog = ref(false);
const deleteDialog = ref(false);
const isEdit = ref(false);
const selected = ref<any>(null);
const form = reactive({ docType: '', module: 'SALES', prefix: '', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 1, active: true });

const series = ref([
  { docType: 'Sales Invoice', module: 'SALES', prefix: 'INV', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 47, active: true },
  { docType: 'Sales Order', module: 'SALES', prefix: 'SO', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 62, active: true },
  { docType: 'Sales Quotation', module: 'SALES', prefix: 'QT', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 38, active: true },
  { docType: 'Purchase Order', module: 'PROCUREMENT', prefix: 'PO', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 31, active: true },
  { docType: 'Purchase Invoice', module: 'PROCUREMENT', prefix: 'PI', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 28, active: true },
  { docType: 'Goods Receipt Note', module: 'INVENTORY', prefix: 'GRN', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 55, active: true },
  { docType: 'Journal Entry', module: 'FINANCE', prefix: 'JE', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 120, active: true },
  { docType: 'Payment Request', module: 'FINANCE', prefix: 'PR', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 18, active: true },
  { docType: 'Customer Receipt', module: 'FINANCE', prefix: 'CR', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 33, active: true },
  { docType: 'Vendor Payment', module: 'FINANCE', prefix: 'VP', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 25, active: true },
  { docType: 'Work Order', module: 'MANUFACTURING', prefix: 'WO', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 14, active: true },
  { docType: 'Delivery Order', module: 'LOGISTICS', prefix: 'DO', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 71, active: true },
  { docType: 'Faktur Pajak', module: 'TAX', prefix: 'FP', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 52, active: true },
  { docType: 'Budget Entry', module: 'FINANCE', prefix: 'BG', format: '{PREFIX}-{YYYY}-{NNNN}', current: 8, active: true },
]);

const moduleList = computed(() => [...new Set(series.value.map(s => s.module))]);
const filteredSeries = computed(() => filterModule.value ? series.value.filter(s => s.module === filterModule.value) : series.value);

const viewFields = computed(() => selected.value ? [
  { label: 'Jenis Dokumen', value: selected.value.docType },
  { label: 'Modul', value: selected.value.module },
  { label: 'Prefix', value: selected.value.prefix },
  { label: 'Format', value: selected.value.format },
  { label: 'Counter Saat Ini', value: String(selected.value.current).padStart(4,'0') },
  { label: 'Status', value: selected.value.active ? 'AKTIF' : 'NONAKTIF' },
] : []);

function openView(s: any) { selected.value = s; viewDialog.value = true; }
function openCreate() { isEdit.value = false; Object.assign(form, { docType: '', module: 'SALES', prefix: '', format: '{PREFIX}-{YYYY}{MM}-{NNNN}', current: 1, active: true }); formDialog.value = true; }
function openEdit(s: any) { selected.value = s; isEdit.value = true; Object.assign(form, { ...s }); formDialog.value = true; }
function confirmDelete(s: any) { selected.value = s; deleteDialog.value = true; }
function saveForm() {
  if (!form.docType || !form.prefix) { toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Jenis Dokumen dan Prefix wajib diisi.', life: 3000 }); return; }
  if (isEdit.value) {
    const idx = series.value.findIndex(s => s.docType === selected.value?.docType);
    if (idx >= 0) Object.assign(series.value[idx], { ...form });
    toast.add({ severity: 'success', summary: 'Diperbarui', detail: `Series ${form.docType} diperbarui.`, life: 3000 });
  } else {
    series.value.push({ ...form });
    toast.add({ severity: 'success', summary: 'Ditambahkan', detail: `Series ${form.docType} ditambahkan.`, life: 3000 });
  }
  formDialog.value = false;
}
function doDelete() {
  series.value = series.value.filter(s => s.docType !== selected.value?.docType);
  toast.add({ severity: 'warn', summary: 'Dihapus', detail: `Series ${selected.value?.docType} dihapus.`, life: 3000 });
  deleteDialog.value = false;
}
function resetCounter(s: any) {
  const idx = series.value.findIndex(x => x.docType === s.docType);
  if (idx >= 0) series.value[idx].current = 0;
  toast.add({ severity: 'info', summary: 'Counter Reset', detail: `Counter ${s.prefix} direset ke 0000.`, life: 3000 });
}
</script>
<style scoped>
.animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1em; }
</style>
