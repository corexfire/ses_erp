<template>
  <div class="space-y-4">
    <!-- Header (Premium Construction Infrastructure Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-amber-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-amber-100">Construction Suite</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Subcontractor Master</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Sub<span class="text-amber-600 not-italic text-3xl">contractor</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-amber-900/60 leading-relaxed mt-3">Manajemen direktori mitra kerja dan subkontraktor spesialis. Kelola kualifikasi, data perpajakan, dan histori penugasan lapangan secara terpusat.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Audit Kepatuhan" size="small" icon="pi pi-shield" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Daftarkan Subkon" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Telemetry KPIs (Construction Heavy Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-amber-950 text-white shadow-xl flex flex-col justify-between border border-amber-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-amber-400 tracking-[0.2em] mb-4 opacity-80">Total Mitra Terdaftar</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ stats.total || 0 }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-users text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 border-t-4 border-t-emerald-500">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Mitra Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-900 tracking-tighter leading-none">{{ stats.active || 0 }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Kategori Spesialis</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ stats.categoryCount || 0 }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 transition-all hover:rotate-12"><i class="pi pi-tags text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-amber-100 tracking-[0.2em] mb-4 opacity-80">Rasio Kepatuhan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">100<span class="text-xl ml-1 font-black">%</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-shield text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Subcontractor Ledger (Premium Grid Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-amber-200"><i class="pi pi-id-card text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Database Rekanan & Subkontraktor</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Verified Construction Partners</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Nama / Kode / Email..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-amber-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[300px]">Identitas & Kode</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Kategori Spesialis</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Kontak Person</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Verifikasi</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-amber-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-amber-600">Sinkronisasi direktori rekanan...</div>
              </td>
            </tr>
            
            <tr v-for="sc in docs" v-else :key="sc.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="sc.isActive ? 'hover:border-l-emerald-400' : 'hover:border-l-rose-400'">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-building text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-amber-700 transition-colors uppercase">
                          {{ sc.code }}
                       </div>
                       <div class="mt-1 font-black text-[13px] text-slate-800 uppercase tracking-tight leading-none group-hover:text-amber-600 transition-colors">
                          {{ sc.name }}
                       </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100 group-hover:scale-110 transition-transform">
                     <i class="pi pi-tag text-xs"></i>
                  </div>
                  <div class="text-[11px] font-black text-indigo-900 uppercase tracking-widest">{{ sc.category || 'GENERAL' }}</div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="flex items-center gap-3">
                    <Avatar :label="sc.contactName?.[0]" shape="circle" class="bg-slate-200 text-slate-600 font-bold" />
                    <div>
                       <div class="text-[11px] font-black text-slate-700 uppercase tracking-tight">{{ sc.contactName || '-' }}</div>
                       <div class="text-[9px] font-medium text-slate-400">{{ sc.email || sc.phone || 'No Contact' }}</div>
                    </div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <div class="relative flex flex-col items-center gap-1.5">
                    <span v-if="sc.isActive" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase shadow-sm group-hover:scale-105 transition-all">
                       <i class="pi pi-check-circle text-[7px] mr-2"></i> VERIFIED
                    </span>
                    <span v-else class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-rose-50 text-rose-700 border border-rose-200 uppercase shadow-sm">
                       <i class="pi pi-times-circle text-[7px] mr-2"></i> INACTIVE
                    </span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Kelola Profil" severity="secondary" rounded outlined @click="openEdit(sc)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && docs.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🏢</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Direktori kosong. Daftarkan mitra kerja pertama Anda.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Construction Dialog (Premium Centered UI) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all p-4">
      <div class="w-full max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-amber-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-amber-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-amber-200">
               <i class="pi pi-building text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ form.id ? 'Audit' : 'Draft' }} <span class="text-amber-600 italic text-2xl">Partner Profile</span></h3>
                 <span v-if="form.id" :class="form.isActive ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200'" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm">{{ form.isActive ? 'ACTIVE' : 'INACTIVE' }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-amber-500 text-amber-600">Company Master Records & Contractual Governance</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-amber-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel Left: Identity & Tax -->
              <div class="lg:col-span-4 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-id-card text-amber-500"></i> I. Identitas & Legalitas
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-amber-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Nama Perusahaan (Brand)</label>
                       <InputText v-model="form.name" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all uppercase" placeholder="PT Contoh Subkon..." />
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kode Vendor (SC-XXX)</label>
                       <InputText v-model="form.code" :readonly="!!form.id" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all font-mono tracking-widest uppercase disabled:text-slate-400" placeholder="AUTO-GENERATED" />
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">NPWP / Tax Identification Number</label>
                       <InputText v-model="form.taxId" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all font-mono tracking-widest uppercase" placeholder="00.000.000.0-000.000" />
                    </div>

                    <div class="bg-indigo-50 p-4 rounded-[1.5rem] border border-indigo-100 shadow-inner">
                       <div class="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2 text-amber-600">
                          <i class="pi pi-info-circle"></i> Integrasi Finance
                       </div>
                       <p class="text-[8px] font-bold text-slate-500 mt-1 uppercase italic leading-tight">Master data ini akan tertaut ke modul Accounts Payable (AP) untuk penagihan progress invoice.</p>
                    </div>
                 </div>
              </div>

              <!-- Panel Middle: Contact & Category -->
              <div class="lg:col-span-3 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-phone text-amber-500"></i> II. Kontak & Spesialisasi
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-amber-100 border-b-[8px] border-b-amber-600">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kategori Pekerjaan</label>
                       <select v-model="form.category" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                          <option value="GENERAL">-- PILIH KATEGORI --</option>
                          <option v-for="c in categories" :value="c">{{ c }}</option>
                       </select>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nama PIC (Penanggung Jawab)</label>
                       <InputText v-model="form.contactName" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all uppercase" placeholder="John Doe..." />
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Korespondensi</label>
                       <InputText v-model="form.email" type="email" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all lowercase" placeholder="office@subcon.com..." />
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nomor Telepon Kantor</label>
                       <InputText v-model="form.phone" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all" placeholder="021-..." />
                    </div>
                 </div>
              </div>

              <!-- Panel Right: Address & Settings -->
              <div class="lg:col-span-5 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-map text-amber-500"></i> III. Geolokasi & Status Keanggotaan
                 </div>
                 <div class="bg-amber-950 p-10 rounded-[2.5rem] shadow-2xl shadow-amber-900/10 border-4 border-amber-900 relative overflow-hidden group min-h-[500px] flex flex-col">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-30"></div>
                    
                    <div class="relative z-10 flex-1 space-y-8">
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2 block italic">Alamat Resmi Perusahaan</label>
                          <textarea v-model="form.address" rows="5" class="w-full rounded-[1.5rem] border-none bg-black/30 p-8 text-[12px] font-black text-white italic outline-none ring-1 ring-white/10 focus:ring-amber-400/50 transition-all placeholder-white/10 uppercase tracking-tight leading-relaxed" placeholder="Tuliskan alamat lengkap..." style="resize:none"></textarea>
                       </div>

                       <div class="p-8 bg-white/5 rounded-[2rem] border border-white/10">
                          <div class="flex items-center justify-between">
                             <div>
                                <h4 class="text-white text-[12px] font-black uppercase tracking-widest mb-1">Status Keanggotaan Proyek</h4>
                                <p class="text-white/40 text-[9px] font-medium uppercase tracking-[0.2em]">Aktifkan untuk mengizinkan penugasan WBS.</p>
                             </div>
                             <InputSwitch v-model="form.isActive" class="custom-amber-switch" />
                          </div>
                       </div>

                       <div class="bg-amber-600/10 rounded-2xl p-4 border border-amber-500/20 flex gap-4 text-[10px] font-black text-amber-500 uppercase italic leading-relaxed">
                          <i class="pi pi-shield-check text-2xl mt-1"></i>
                          <span>Audit Keamanan: Semua perubahan pada master data subkontraktor akan tercatat di Audit Trail ERP untuk keamanan operasional.</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Workspace Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-verified"></i> Verified Construction SCM
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batal & Tutup" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                label="Simpan Data Rekanan" 
                icon="pi pi-save" 
                size="large" 
                :loading="saving" 
                :disabled="saving" 
                @click="save" 
                class="h-14 px-12 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all rounded-xl" 
             />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';

const api = useApi();
const loading = ref(false);
const saving = ref(false);
const search = ref('');
const dialogOpen = ref(false);

const docs = ref<any[]>([]);
const stats = ref<any>({ total: 0, active: 0, categoryCount: 0 });
const categories = ['CIVIL', 'ELECTRICAL', 'MEP', 'LANDSCAPE', 'INTERIOR', 'STRUCTURAL', 'PLUMBING'];

const form = reactive({
  id: '',
  code: '',
  name: '',
  category: 'GENERAL',
  contactName: '',
  email: '',
  phone: '',
  address: '',
  taxId: '',
  isActive: true
});

const load = async () => {
  loading.value = true;
  try {
    const [res, statsRes] = await Promise.all([
      api.get('/construction/subcontractors'),
      api.get('/construction/subcontractors/stats')
    ]);
    docs.value = res.data?.data || [];
    stats.value = statsRes.data || {};
  } catch (e) {
    console.warn('Failed to load subcontractors', e);
  } finally {
    loading.value = false;
  }
};

const openCreate = () => {
  Object.assign(form, {
    id: '',
    code: '',
    name: '',
    category: 'GENERAL',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    isActive: true
  });
  dialogOpen.value = true;
};

const openEdit = (sc: any) => {
  Object.assign(form, sc);
  dialogOpen.value = true;
};

const save = async () => {
  if (!form.name) return Swal.fire('Error', 'Nama perusahaan wajib diisi!', 'error');
  
  saving.value = true;
  try {
    if (form.id) {
      await api.patch(`/construction/subcontractors/${form.id}`, form);
    } else {
      await api.post('/construction/subcontractors', form);
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Data subkontraktor berhasil diperbarui!',
      timer: 2000,
      showConfirmButton: false
    });
    
    dialogOpen.value = false;
    load();
  } catch (e) {
    Swal.fire('Gagal', 'Gagal menyimpan data ke server.', 'error');
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  load();
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
  from { opacity: 0; transform: scale(0.95); } 
  to { opacity: 1; transform: scale(1); } 
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
   font-size: 11px !important;
   font-weight: 900 !important;
   text-transform: uppercase !important;
   padding: 1rem 1.5rem !important;
}

:deep(.custom-amber-switch.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider) {
  background: #d97706 !important;
}

select { 
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
  background-repeat: no-repeat; 
  background-position: right 1rem center; 
  background-size: 1em; 
}
</style>
