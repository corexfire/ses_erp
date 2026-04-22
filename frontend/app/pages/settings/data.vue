<template>
  <div class="space-y-4">
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Settings & Tools</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Data Management</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Data <span class="text-orange-600 not-italic text-3xl">Management</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3">Kelola backup database, export data, data cleansing, dan kebijakan retensi data lintas modul ERP.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Backup Sekarang" size="small" icon="pi pi-database" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase" @click="runBackup" />
          <Button label="Export Data" size="small" icon="pi pi-download" class="p-button-rounded h-12 px-8 bg-orange-600 border-none text-white font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-all" @click="exportData" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <div class="p-4 rounded-2xl bg-orange-950 text-white shadow-xl flex flex-col justify-between border border-orange-900 hover:bg-black group transition-all">
        <div class="text-[10px] font-black uppercase text-orange-400 tracking-[0.2em] mb-4">Ukuran Database</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl font-black text-white tracking-tighter leading-none">4.2 <span class="text-xl">GB</span></h3>
          <div class="p-3 bg-white/5 rounded-xl group-hover:rotate-12 transition-transform"><i class="pi pi-database text-lg"></i></div>
        </div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Backup Terakhir</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-emerald-700 tracking-tighter leading-none">2j lalu</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-clock text-lg"></i></div>
        </div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Total Records</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl font-black text-indigo-700 tracking-tighter leading-none">284K</h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><i class="pi pi-table text-lg"></i></div>
        </div>
      </div>
      <div class="p-4 rounded-2xl bg-gradient-to-br from-orange-600 to-red-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-orange-100 tracking-[0.2em] mb-4">Retensi Data</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight uppercase">5 <span class="text-orange-300 text-sm italic">Tahun</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-calendar text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Backup History & Table Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Backup History -->
      <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden pb-6">
        <div class="p-8 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-xl"><i class="pi pi-history text-xl"></i></div>
          <div>
            <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Riwayat Backup</h3>
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Automatic & Manual Backups</p>
          </div>
        </div>
        <div class="p-4 space-y-2">
          <div v-for="b in backups" :key="b.id" class="flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-colors group border border-slate-50 hover:border-slate-100">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center text-sm flex-shrink-0 group-hover:scale-110 transition-transform', b.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600']">
              <i :class="b.status === 'SUCCESS' ? 'pi pi-check' : 'pi pi-times'"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[11px] font-black text-slate-800">{{ b.filename }}</p>
              <p class="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{{ b.type }} · {{ b.size }}</p>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-[10px] font-bold text-slate-500">{{ b.date }}</p>
              <span :class="['text-[8px] font-black uppercase px-2 py-0.5 rounded-full', b.status === 'SUCCESS' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50']">{{ b.status }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Stats -->
      <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden pb-6">
        <div class="p-8 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl"><i class="pi pi-table text-xl"></i></div>
          <div>
            <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Statistik Tabel Database</h3>
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Record Count per Module</p>
          </div>
        </div>
        <div class="p-4 space-y-3">
          <div v-for="t in tableStats" :key="t.table" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 text-xs font-black font-mono group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">{{ t.module.charAt(0) }}</div>
            <div class="flex-1 min-w-0">
              <p class="text-[10px] font-black text-slate-700 uppercase">{{ t.table }}</p>
              <div class="w-full bg-slate-100 rounded-full h-1 mt-1">
                <div class="h-1 bg-indigo-500 rounded-full" :style="`width: ${Math.min((t.count / 50000) * 100, 100)}%`"></div>
              </div>
            </div>
            <span class="text-[11px] font-black text-slate-700 font-mono flex-shrink-0">{{ t.count.toLocaleString('id-ID') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const toast = useToast();

const backups = ref([
  { id: 1, filename: 'backup-20260421-0200.sql.gz', type: 'AUTO', size: '1.2 GB', date: '21 Apr 2026, 02:00', status: 'SUCCESS' },
  { id: 2, filename: 'backup-20260420-0200.sql.gz', type: 'AUTO', size: '1.1 GB', date: '20 Apr 2026, 02:00', status: 'SUCCESS' },
  { id: 3, filename: 'backup-manual-20260419.sql.gz', type: 'MANUAL', size: '1.1 GB', date: '19 Apr 2026, 15:30', status: 'SUCCESS' },
  { id: 4, filename: 'backup-20260418-0200.sql.gz', type: 'AUTO', size: '1.0 GB', date: '18 Apr 2026, 02:00', status: 'SUCCESS' },
  { id: 5, filename: 'backup-20260417-0200.sql.gz', type: 'AUTO', size: '990 MB', date: '17 Apr 2026, 02:00', status: 'SUCCESS' },
]);

const tableStats = ref([
  { table: 'JournalEntry', module: 'FINANCE', count: 12450 },
  { table: 'SalesInvoice', module: 'SALES', count: 8320 },
  { table: 'PurchaseOrder', module: 'PROCUREMENT', count: 5180 },
  { table: 'StockLedger', module: 'INVENTORY', count: 48900 },
  { table: 'Employee', module: 'HRIS', count: 245 },
  { table: 'AttendanceRecord', module: 'HRIS', count: 36720 },
  { table: 'CustomerInvoice', module: 'AR', count: 4150 },
  { table: 'NotificationLog', module: 'NOTIFICATION', count: 28430 },
]);

function runBackup() { toast.add({ severity: 'info', summary: 'Backup Dimulai', detail: 'Backup database sedang berjalan di background. Anda akan diberitahu saat selesai.', life: 4000 }); }
function exportData() { toast.add({ severity: 'success', summary: 'Export Dimulai', detail: 'Data sedang diekspor ke format CSV/Excel. File akan siap dalam beberapa menit.', life: 4000 }); }
</script>
