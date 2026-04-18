<template>
  <div class="space-y-6">
    <!-- Component Alert -->
    <div v-if="success" class="mb-4 bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="mb-4 bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>
    <!-- Header (Premium Retention Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-purple-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Retention Core</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-purple-600">Layanan Berlangganan</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Kontrak <span class="text-purple-600 italic text-3xl">Berlangganan</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Manajemen penagihan berulang otomatis — pengelolaan kontrak SaaS, jasa retainer, dan penjadwalan invoice otomatis (Recurring Billing).</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Daftarkan Kontrak Baru" size="small" icon="pi pi-sync" class="p-button-rounded h-12 px-8 bg-purple-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-purple-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Metrics Cards -->
    <!-- High-Contrast KPI Banners (Premium style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
       <!-- Primary engagement banner -->
      <div class="p-6 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-slate-950 group">
        <div class="text-[10px] font-black uppercase text-purple-400 tracking-[0.2em] mb-4 opacity-80">Portfolio Value</div>
        <div class="flex items-end justify-between">
          <h3 class="text-2xl font-black text-white tracking-tighter leading-none">Rp {{ formatNumber(subs.reduce((a,c) => a + Number(c.amount||0), 0)) }}</h3>
          <div class="p-3 bg-slate-700 rounded-xl text-slate-100 shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-sync text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Langganan Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-600 tracking-tighter leading-none">{{ summary.active || 0 }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>
      
      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Tunggakan Bayar</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-700 tracking-tighter leading-none">{{ summary.pastDue || 0 }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><i class="pi pi-exclamation-triangle text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Kontrak Berhenti</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-400 tracking-tighter group-hover:text-slate-600 transition-colors leading-none">{{ summary.cancelled || 0 }}</h3>
          <div class="p-3 bg-slate-200 text-slate-500 rounded-xl shadow-lg group-hover:rotate-12 transition-transform border border-slate-300"><i class="pi pi-times-circle text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <!-- Modern Filters (Premium style) -->
    <div class="bg-purple-50/50 p-1.5 rounded-3xl border border-purple-100 flex flex-wrap items-center gap-2 animate-fade-in-up">
      <div class="bg-white p-1 rounded-[1.5rem] border border-slate-200 flex flex-1 items-center shadow-sm min-w-[280px]">
        <i class="pi pi-search px-4 text-slate-400 text-xs"></i>
        <InputText v-model="q" placeholder="Cari Nama Plan, Produk, or Entitas Client..." class="flex-1 h-10 border-none bg-transparent text-xs font-black uppercase tracking-widest outline-none shadow-none focus:ring-0" @keyup.enter="load" />
        <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-purple-600 transition-all shrink-0" />
      </div>

      <div class="flex bg-white/60 p-1 rounded-2xl border border-purple-100 gap-1 ml-auto">
        <button v-for="s in [{v:'',l:'SEMUA KONTRAK'}, {v:'ACTIVE',l:'AKTIF'}, {v:'PAST_DUE',l:'TERLAMBAT'}, {v:'CANCELLED',l:'BERHENTI'}]" :key="s.v"
          @click="statusFilter = s.v"
          :class="statusFilter === s.v ? 'bg-purple-600 text-white shadow-lg scale-105' : 'text-slate-500 hover:bg-white hover:shadow-sm'"
          class="px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300">
          {{ s.l }}
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <!-- TABLE (Premium Modern Style) -->
    <div class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80 text-left">
          <tr>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Detail Plan & Pelanggan</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-40">Siklus Tagihan</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-56">Biaya Berulang (IDR)</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-48">Jadwal Invoice Berikutnya</th>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-44">Interaksi Kontrak</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-if="loading">
            <td colspan="5" class="py-24 text-center">
              <i class="pi pi-spinner pi-spin text-4xl text-purple-600 opacity-20"></i>
              <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-purple-600">Sinkronisasi ledger langganan...</div>
            </td>
          </tr>
          
          <tr v-for="t in subs" v-else :key="t.id" class="transition-all hover:bg-slate-50/5 group border-l-4" :style="{ borderLeftColor: statusColor(t.status) }" @click="openEdit(t)">
            <td class="px-8 py-6 align-middle">
               <div class="flex flex-col gap-2">
                  <div class="font-black text-slate-900 text-[14px] tracking-tight leading-tight uppercase group-hover:text-purple-700 transition-colors flex items-center gap-2">
                    {{ t.planName }}
                    <i v-if="t.status === 'ACTIVE'" class="pi pi-verified text-purple-500 animate-pulse"></i>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5"><i class="pi pi-building text-[8px]"></i> {{ t.customer?.name || 'Klien Tidak Teridentifikasi' }}</span>
                  </div>
               </div>
            </td>
            
            <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
                <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">{{ t.billingCycle }}</span>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-right">
              <div class="flex flex-col">
                <div class="text-xl font-black font-mono tracking-tighter text-slate-900 leading-none">
                  <span class="text-[10px] text-slate-400 mr-1 font-sans">Rp</span>{{ formatNumber(t.amount) }}
                </div>
                <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 whitespace-nowrap">RECURRING REVENUE (MRR)</div>
              </div>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
               <div :class="['inline-flex rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-sm whitespace-nowrap', isOverdue(t.nextBillingDate) ? 'bg-rose-50 text-rose-700 border border-rose-100 animate-pulse' : 'bg-slate-50 text-slate-600 border border-slate-200']">
                 <i :class="isOverdue(t.nextBillingDate) ? 'pi pi-exclamation-triangle mr-2' : 'pi pi-calendar-plus mr-2'"></i>
                 {{ t.nextBillingDate ? formatDate(t.nextBillingDate) : '-' }}
               </div>
            </td>

             <td class="px-8 py-6 align-middle border-l border-slate-50/50 text-right">
              <div class="flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                <Button label="Modifikasi Kontrak" size="small" class="p-button-rounded h-9 px-6 bg-purple-600 border-none text-white font-black text-[9px] uppercase shadow-lg hover:scale-105 active:scale-95 transition-all w-full" @click.stop="openEdit(t)" />
                <Button label="Audit Penagihan" size="small" class="p-button-rounded h-9 px-6 bg-slate-900 border-none text-white font-black text-[9px] uppercase shadow-lg hover:scale-105 active:scale-95 transition-all w-full" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && subs.length === 0">
            <td colspan="5" class="py-32 text-center text-slate-400 italic text-sm font-medium">
               <i class="pi pi-sync text-5xl mb-4 block opacity-10"></i>
               <div class="text-[10px] font-black uppercase tracking-[0.2em]">Tidak ditemukan data langganan dalam sistem.</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dialog Enrollment Hub (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900">
        <!-- Dialog Header -->
        <div class="p-10 border-b bg-white flex justify-between items-center shrink-0 relative overflow-hidden border-b-purple-100">
          <div class="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700 bg-purple-50"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-sync text-3xl animate-spin-slow text-purple-400"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ editingId ? 'Modifikasi' : 'Provisioning' }} <span class="text-purple-600 italic">Kontrak Layanan</span></h3>
                <span v-if="editingId" class="inline-flex rounded-2xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm bg-purple-50 text-purple-600 border border-purple-100">
                   Active Record
                </span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-purple-500 text-purple-600">Retention Control Hub / Recurring Billing System</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body (Enrollment Workpad) -->
        <div class="p-10 space-y-8 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
           <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Left: Customer Meta -->
              <div class="lg:col-span-1 space-y-6">
                 <div class="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8 h-full">
                    <div class="space-y-6">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-purple-600"></div>
                        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Entitas Pelanggan</h4>
                      </div>
                      <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Debitur Layanan <span class="text-red-500">*</span></label>
                        <select :disabled="!!editingId" v-model="form.customerId" class="w-full h-14 border-none rounded-2xl px-5 text-xs font-black text-purple-900 bg-purple-50/50 shadow-inner outline-none focus:ring-2 focus:ring-purple-100 appearance-none">
                            <option value="">-- Pilih Customer B2B --</option>
                            <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name || c.code }}</option>
                        </select>
                      </div>
                    </div>

                    <div class="space-y-6 pt-6 border-t border-slate-100">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-slate-400"></div>
                        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Parameter Siklus</h4>
                      </div>
                      <div class="space-y-4">
                        <div class="space-y-2">
                           <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-2 lowercase">Siklus Penagihan</label>
                           <select v-model="form.billingCycle" class="w-full h-12 border-none rounded-2xl px-5 text-xs font-black text-slate-700 bg-slate-100/50 shadow-inner outline-none focus:ring-2 focus:ring-purple-100 appearance-none">
                             <option value="MONTHLY">Bulanan (Monthly)</option>
                             <option value="QUARTERLY">Per 3 Bulan (Quarterly)</option>
                             <option value="YEARLY">Tahunan (Yearly)</option>
                           </select>
                        </div>
                        <div class="space-y-2">
                           <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-2 lowercase">Status Kontrak</label>
                           <select v-model="form.status" class="w-full h-12 border-none rounded-2xl px-5 text-xs font-black text-slate-700 bg-slate-100/50 shadow-inner outline-none focus:ring-2 focus:ring-purple-100 appearance-none">
                              <option value="ACTIVE">AKTIF (Running)</option>
                              <option value="PAST_DUE">TERLAMBAT (Overdue)</option>
                              <option value="CANCELLED">BATAL (Churned)</option>
                           </select>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

              <!-- Right: Plan Payload -->
              <div class="lg:col-span-2 space-y-6">
                 <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 space-y-8 border-b-[8px] border-b-slate-900 h-full">
                    <div class="flex items-center gap-4 border-b border-slate-100 pb-8">
                        <div class="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg"><i class="pi pi-shield text-2xl"></i></div>
                        <div>
                          <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 font-bold">Layanan & Rekurensi</h4>
                          <p class="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest font-mono">Provisioning Recurring Revenue Ledger / Autopay Gate</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div class="space-y-2 md:col-span-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Nama Paket / Deskripsi Kontrak <span class="text-red-500">*</span></label>
                          <input type="text" v-model="form.planName" class="w-full h-14 border-none rounded-2xl px-5 text-[15px] font-black text-slate-800 bg-slate-50 shadow-inner outline-none focus:ring-2 focus:ring-purple-100 placeholder:italic" placeholder="Enterprise Subscription v2.0..." />
                       </div>

                       <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Nilai Penagihan Berulang (IDR)</label>
                          <div class="relative">
                             <span class="absolute left-5 top-1/2 -translate-y-1/2 text-[11px] font-black text-slate-400">IDR</span>
                             <input type="number" v-model="form.amount" class="w-full h-14 border-none rounded-2xl pl-14 pr-5 text-xl font-mono font-black text-purple-900 bg-purple-50/30 shadow-inner outline-none focus:ring-2 focus:ring-purple-100" placeholder="0" />
                          </div>
                       </div>

                       <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Tanggal Aktivasi Kontrak</label>
                          <input type="date" v-model="form.startDate" class="w-full h-14 border-none rounded-2xl px-5 text-xs font-black text-slate-700 bg-white border border-slate-100 shadow-inner outline-none focus:ring-2 focus:ring-purple-100" />
                       </div>

                       <div class="space-y-2 md:col-span-2">
                          <div class="p-6 rounded-[2rem] bg-purple-50 border border-purple-100">
                             <label class="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] block font-bold mb-3">JADWAL INVOICE BERIKUTNYA (SYSTEM TRIGGER)</label>
                             <input type="date" v-model="form.nextBillingDate" class="w-full h-14 border-none rounded-2xl px-5 text-xl font-black text-purple-950 bg-white shadow-xl outline-none focus:ring-2 focus:ring-purple-500" />
                          </div>
                       </div>

                       <div class="space-y-2 md:col-span-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Catatan Internal / Klausul Khusus</label>
                          <textarea v-model="form.notes" rows="4" class="w-full border-none rounded-2xl p-5 text-[11px] font-medium text-slate-700 bg-slate-50 shadow-inner outline-none focus:ring-2 focus:ring-purple-100 resize-none transition-all placeholder:italic" placeholder="Masukkan detail kontrak tambahan atau terminasi khusus..."></textarea>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Dialog Footer Gates -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <Button label="Batalkan Sesi" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          
          <div class="flex items-center gap-4">
             <Button :label="editingId ? 'Simpan Perubahan' : 'Aktifkan Kontrak Layanan'" severity="info" :loading="saving" :disabled="saving || !form.planName || !form.customerId" @click="save" class="p-button-rounded h-14 px-12 bg-purple-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-purple-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-check-circle" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';

const api = useApi();
const auth = useAuthStore();

const canRead = auth.hasPermission('sales.subscription.read') || true;
const canManage = auth.hasPermission('sales.subscription.manage') || true;

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);
const error = ref('');
const success = ref('');

const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const dialogOpen = ref(false);
const editingId = ref<string | null>(null);
const subs = ref<any[]>([]);
const summary = ref<any>({});
const customers = ref<any[]>([]);

const form = ref({
  customerId: '',
  planName: '',
  billingCycle: 'MONTHLY',
  status: 'ACTIVE',
  amount: 0,
  startDate: '',
  nextBillingDate: '',
  notes: '',
});

function pad(n: number) { return String(n).padStart(2, '0'); }
function formatDate(iso: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()}`;
}
function formatNumber(num: any) {
  if (!num) return '0';
  return Number(num).toLocaleString('id-ID');
}
function isOverdue(iso: string) {
  if (!iso) return false;
  return new Date(iso).getTime() < new Date().getTime();
}

const statusColor = (status: string) => {
   if (status === 'ACTIVE') return '#10b981'; // emerald
   if (status === 'PAST_DUE') return '#f43f5e'; // rose
   if (status === 'CANCELLED') return '#94a3b8'; // slate
   return '#9333ea';
};

function badgeStyle(status: string) {
  const map: Record<string, any> = {
    ACTIVE: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    PAST_DUE: { backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' },
    CANCELLED: { backgroundColor: '#f8fafc', color: '#475569', borderColor: '#cbd5e1' }
  };
  return map[status] || map['ACTIVE'];
}

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    if (statusFilter.value) params.status = statusFilter.value;
    const { data } = await api.get('/sales/subscriptions', { params });
    subs.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

async function loadCustomers() {
  try {
    const { data } = await api.get('/crm/customers');
    customers.value = data.data || [];
  } catch (e) {}
}

function openCreate() {
  editingId.value = null;
  form.value = {
     customerId: '', planName: '', billingCycle: 'MONTHLY', status: 'ACTIVE',
     amount: 0, startDate: new Date().toISOString().slice(0, 10), nextBillingDate: new Date().toISOString().slice(0, 10), notes: ''
  };
  if (customers.value.length === 0) loadCustomers();
  dialogOpen.value = true;
}

function openEdit(t: any) {
  editingId.value = t.id;
  form.value = {
    customerId: t.customerId || '',
    planName: t.planName || '',
    billingCycle: t.billingCycle || 'MONTHLY',
    status: t.status || 'ACTIVE',
    amount: parseFloat(t.amount || '0'),
    startDate: t.startDate?.slice(0, 10) || '',
    nextBillingDate: t.nextBillingDate?.slice(0, 10) || '',
    notes: t.notes || '',
  };
  if (customers.value.length === 0) loadCustomers();
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    const payload = { ...form.value, amount: Number(form.value.amount) };

    if (editingId.value) {
      await api.patch(`/sales/subscriptions/${editingId.value}`, payload);
      showMsg(success, 'Kontrak berhasil diperbarui!');
    } else {
      await api.post('/sales/subscriptions', payload);
      showMsg(success, 'Kontrak layanan baru telah diaktifkan!');
    }
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    showMsg(error, e.response?.data?.message || e.message);
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  if (canRead) load();
});
</script>

<style scoped>
.animate-fade-in-up { 
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(30px); } 
  to { opacity: 1; transform: translateY(0); } 
}

.animate-scale-in { 
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes scaleIn { 
  from { opacity: 0; transform: scale(0.95) translateY(10px); } 
  to { opacity: 1; transform: scale(1) translateY(0); } 
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.custom-scrollbar::-webkit-scrollbar { 
  width: 4px; 
}
.custom-scrollbar::-webkit-scrollbar-track { 
  background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb { 
  background: #e2e8f0; 
  border-radius: 10px; 
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { 
  background: #cbd5e1; 
}

:deep(.p-inputtext) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
   border-radius: 16px !important;
}

:deep(.p-button-rounded) {
  border-radius: 9999px !important;
}
</style>
