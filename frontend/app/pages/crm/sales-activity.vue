<template>
  <div class="space-y-6">
    <!-- Header (Premium Activity Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-amber-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Engagement Hub</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Interaction Log</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Sales <span class="text-amber-600 italic text-3xl">Activity</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Jadwalkan dan catat setiap interaksi dengan Klien (Meeting, Call, Email, Tugas) untuk memastikan momentum penjualan tetap terjaga.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Buat Jadwal / Log" size="small" icon="pi pi-plus" class="p-button-rounded bg-slate-900 border-none text-white font-black text-[10px] px-6 h-12 shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all" :disabled="loading || !canCreate" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Alert / Notif -->
    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- High-Contrast KPI Banners (Premium style) -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 animate-fade-in-up">
      <!-- Primary volume banner -->
      <div class="p-4 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-slate-950 group">
        <div class="text-[10px] font-black uppercase text-amber-400 tracking-[0.2em] mb-4 opacity-80">Total Sched.</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter">{{ activities.length }}</h3>
          <div class="p-3 bg-slate-700 rounded-xl text-slate-100 shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-calendar-clock text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-purple-500 tracking-[0.2em] mb-4">Meeting</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-purple-600 tracking-tighter">{{ countType('MEETING') }}</h3>
          <div class="p-3 bg-purple-50 text-purple-500 rounded-xl border border-purple-100"><i class="pi pi-users text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-sky-500 tracking-[0.2em] mb-4">Phone Call</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-sky-600 tracking-tighter">{{ countType('CALL') }}</h3>
          <div class="p-3 bg-sky-50 text-sky-500 rounded-xl border border-sky-100"><i class="pi pi-phone text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em] mb-4">Email Sent</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-indigo-600 tracking-tighter">{{ countType('EMAIL') }}</h3>
          <div class="p-3 bg-indigo-50 text-indigo-500 rounded-xl border border-indigo-100"><i class="pi pi-envelope text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4">To-Do Task</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-800 tracking-tighter">{{ countType('TASK') }}</h3>
          <div class="p-3 bg-slate-50 text-slate-500 rounded-xl border border-slate-100"><i class="pi pi-check-square text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Modernized Control Bar (Premium Segmented Style) -->
    <div class="bg-amber-50/50 p-1.5 rounded-3xl border border-amber-100 flex flex-wrap items-center gap-4 animate-fade-in-up">
       <!-- Search High-Fidelity -->
       <div class="relative flex-1 min-w-[300px] ml-1">
          <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <InputText v-model="q" placeholder="Cari subjek, notes, atau klien..." class="w-full pl-10 h-12 rounded-2xl border-none bg-white shadow-inner focus:ring-2 focus:ring-amber-100 transition-all text-sm font-bold" @keyup.enter="load" />
       </div>

       <!-- Segmented Filter -->
       <div class="flex gap-1 bg-white/60 p-1 rounded-2xl border border-amber-50">
        <button v-for="s in ['ACTIVE','DONE','ALL']" :key="s"
          @click="statusFilter = s"
          :class="statusFilter === s ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600 hover:bg-white'"
          class="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300">
          {{ s }}
        </button>
      </div>

      <Button severity="secondary" rounded outlined icon="pi pi-refresh" @click="load" :loading="loading" class="h-12 w-12 border-amber-100 text-amber-600 bg-white hover:bg-amber-50 mr-1" />
    </div>

    <!-- TABLE (Premium Activity Stream) -->
    <div class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80 text-left">
          <tr>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-28 text-center">Type</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Activity Details & Schedule</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-64">Related Entity</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-52">PIC / Assigner</th>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-40">Status Log</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-if="loading">
            <td colspan="5" class="py-24 text-center">
              <i class="pi pi-spinner pi-spin text-4xl text-amber-500 opacity-20"></i>
              <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-amber-600">Syncing interaction logs...</div>
            </td>
          </tr>
          
          <tr v-for="a in filteredList" v-else :key="a.id" class="transition-all hover:bg-slate-50/50 group border-l-4" :style="{ borderLeftColor: typeStyle(a.type).border }" :class="{ 'opacity-60 grayscale-[0.5]': a.status === 'DONE' || a.status === 'CANCELED' }">
            <td class="px-8 py-6 align-middle text-center">
               <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2 shadow-lg border-2 border-white group-hover:rotate-6 transition-transform transition-all"
                 :style="{ backgroundColor: typeStyle(a.type).bg, color: typeStyle(a.type).color }">
                 <i class="pi" :class="typeStyle(a.type).icon"></i>
               </div>
               <div class="text-[9px] font-black uppercase tracking-[0.2em]" :style="{ color: typeStyle(a.type).color }">{{ a.type }}</div>
            </td>
            
            <td class="px-6 py-6 align-middle border-l border-slate-50/50 relative">
              <div class="font-black text-slate-900 text-[14px] tracking-tight leading-tight uppercase group-hover:text-amber-600 transition-colors mb-2" :class="{'line-through text-slate-400': a.status === 'CANCELED'}">
                {{ a.subject }}
              </div>
              <div class="text-[11px] font-medium text-slate-500 italic max-w-sm truncate opacity-80" v-if="a.notes">{{ a.notes }}</div>
              
              <div class="mt-3 flex items-center gap-2">
                <div class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm border border-white"
                   :class="(isPast(a.dueAt) && a.status === 'OPEN') ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-500'">
                   <i class="pi pi-clock text-[10px]"></i> 
                   {{ a.dueAt ? formatTime(a.dueAt) : 'No Schedule' }}
                </div>
                <span v-if="(isPast(a.dueAt) && a.status === 'OPEN')" class="text-[8px] font-black uppercase tracking-widest text-rose-500 italic">!! Overdue</span>
              </div>
              
              <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                <Button icon="pi pi-pencil" v-tooltip="'Edit Log'" size="small" rounded text class="h-10 w-10 text-slate-400 hover:text-amber-600 hover:bg-amber-50" @click="openEdit(a)" />
              </div>
            </td>

             <td class="px-6 py-6 align-middle border-l border-slate-50/50">
                 <div v-if="a.opportunity" class="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform" @click="navigateTo(`/crm/opportunities/${a.opportunity.id}`)">
                    <div class="text-[8px] font-black uppercase text-emerald-600 tracking-[0.15em] mb-1">Opportunity</div>
                    <div class="text-[11px] font-black text-slate-800 tracking-tight leading-none uppercase">{{ a.opportunity.code }}</div>
                 </div>
                 <div v-else-if="a.customer" class="p-3 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform" @click="navigateTo(`/crm/customers/${a.customer.id}`)">
                    <div class="text-[8px] font-black uppercase text-indigo-600 tracking-[0.15em] mb-1">Customer</div>
                    <div class="text-[11px] font-black text-slate-800 tracking-tight leading-none uppercase truncate max-w-[150px]">{{ a.customer.name }}</div>
                 </div>
                 <div v-else-if="a.lead" class="p-3 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform">
                    <div class="text-[8px] font-black uppercase text-amber-600 tracking-[0.15em] mb-1">Lead / Prospect</div>
                    <div class="text-[11px] font-black text-slate-800 tracking-tight leading-none uppercase">{{ a.lead.code }}</div>
                 </div>
                 <div v-else class="text-[10px] font-black text-slate-300 uppercase tracking-widest italic flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl py-4">
                    <i class="pi pi-info-circle text-xs opacity-50 mr-2"></i> INTERNAL
                 </div>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50">
              <div class="relative group/sel">
                <select v-model="assigneeSelection[a.id]"
                  class="w-full h-10 rounded-xl bg-slate-50 border border-slate-100 px-3 text-[11px] font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-amber-100 outline-none transition-all appearance-none shadow-sm"
                  :disabled="!canAssign || !canReadUsers || a.status !== 'OPEN'"
                  @change="assign(a)"
                  :class="assigneeSelection[a.id] ? 'bg-amber-50/50 text-amber-900 border-amber-100/50' : ''">
                  <option value="">- Assign Agent -</option>
                  <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name ?? u.email }}</option>
                </select>
                <i class="pi pi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-300 pointer-events-none group-hover/sel:text-amber-500 transition-colors"></i>
              </div>
            </td>

            <td class="px-8 py-6 align-middle border-l border-slate-50/50 text-center">
              <div v-if="a.status === 'DONE'" class="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm inline-flex items-center">
                 <i class="pi pi-check-circle text-xs mr-2"></i> SELESAI
              </div>
              <div v-else-if="a.status === 'CANCELED'" class="bg-slate-100 border border-slate-200 text-slate-500 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm inline-flex items-center">
                 <i class="pi pi-times-circle text-xs mr-2"></i> BATAL
              </div>
              <div v-else class="relative group/sel">
                 <select v-model="statusSelection[a.id]"
                  class="w-full h-10 rounded-xl bg-white border border-slate-200 px-3 text-center text-[10px] font-black uppercase tracking-widest outline-none hover:border-amber-500 transition-all cursor-pointer shadow-sm appearance-none"
                  :disabled="!canUpdate"
                  @change="updateStatus(a)">
                  <option value="OPEN">TUNDA / OPEN</option>
                  <option value="DONE">TANDAI SELESAI</option>
                  <option value="CANCELED">BATALKAN</option>
                </select>
                <i class="pi pi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-slate-300 pointer-events-none group-hover/sel:text-amber-500 transition-colors"></i>
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredList.length === 0">
            <td colspan="5" class="py-32 text-center">
               <i class="pi pi-calendar-times text-6xl mb-6 block text-slate-200 opacity-50"></i>
               <div class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Selamat! Tidak ada Antrean Jadwal terbuka.</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Dialog (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white">
        <!-- Dialog Header -->
        <div class="p-10 border-b bg-white relative overflow-hidden shrink-0 flex justify-between items-center">
          <div class="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div class="relative flex items-center gap-5">
             <div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
                <i class="pi text-3xl" :class="editingId ? 'pi-pencil' : 'pi-plus'"></i>
             </div>
             <div>
                <h3 class="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">{{ editingId ? 'Update Detail' : 'Log' }} <span class="text-amber-600 italic">Interaction</span></h3>
                <p class="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-2 px-1 border-l-2 border-amber-500">Sales Engagement Center Hub</p>
             </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="closeDialog" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body -->
        <div class="p-12 space-y-10 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
          <!-- Activity Type Selection -->
          <div class="space-y-4">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Jenis Interaksi (Activity Type) <span class="text-rose-500">*</span></label>
            <div class="grid grid-cols-4 gap-4">
              <button v-for="t in ['CALL','EMAIL','MEETING','TASK']" :key="t"
                @click="form.type = t as any"
                :class="form.type === t ? 'bg-slate-900 text-white shadow-xl scale-105 border-slate-900' : 'bg-white border-slate-100 text-slate-400 hover:border-amber-200'"
                class="border-2 rounded-2xl py-5 flex flex-col items-center justify-center gap-3 transition-all duration-300">
                 <i class="pi text-2xl" :class="typeStyle(t as any).icon"></i>
                 <span class="text-[9px] font-black uppercase tracking-widest">{{ t }}</span>
              </button>
            </div>
          </div>
          
          <!-- General Info -->
          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Pokok Pembahasan / Subjek Agenda <span class="text-rose-500">*</span></label>
              <input type="text" v-model="form.subject" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-100 outline-none transition-all placeholder:text-slate-200" placeholder="Meeting penawaran produk..." :disabled="editingId ? !canUpdate : !canCreate" />
            </div>

            <div class="space-y-2">
               <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Waktu / Target Jadwal Eksekusi</label>
               <input type="date" v-model="form.dueDate" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all" :disabled="editingId ? !canUpdate : !canCreate" />
            </div>
          </div>

          <!-- Entity Relations -->
          <div class="space-y-8 pt-8 border-t border-slate-100">
             <div class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] text-center bg-white py-1.5 px-6 rounded-full border border-slate-100 shadow-sm mx-auto w-fit">Entity Linkage Mapping</div>
             
             <div class="grid grid-cols-1 gap-4">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2 block ml-1"><i class="pi pi-building text-[10px]"></i> Bind to Customer Master</label>
                  <select v-model="form.customerId" class="w-full h-14 rounded-2xl border-none bg-indigo-50/30 px-6 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-100 outline-none transition-all appearance-none shadow-sm cursor-pointer" :disabled="editingId ? !canUpdate : !canCreate">
                    <option value="">-- No Selection --</option>
                    <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2 block ml-1"><i class="pi pi-money-bill text-[10px]"></i> Bind to Sale Opportunity</label>
                  <select v-model="form.opportunityId" class="w-full h-14 rounded-2xl border-none bg-emerald-50/30 px-6 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-100 outline-none transition-all appearance-none shadow-sm cursor-pointer" :disabled="editingId ? !canUpdate : !canCreate">
                    <option value="">-- No Selection --</option>
                    <option v-for="o in opportunities" :key="o.id" :value="o.id">{{ o.code }} - {{ o.name }}</option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2 block ml-1"><i class="pi pi-users text-[10px]"></i> Bind to Potential Lead</label>
                  <select v-model="form.leadId" class="w-full h-14 rounded-2xl border-none bg-rose-50/30 px-6 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-rose-100 outline-none transition-all appearance-none shadow-sm cursor-pointer" :disabled="editingId ? !canUpdate : !canCreate">
                    <option value="">-- No Selection --</option>
                    <option v-for="l in leads" :key="l.id" :value="l.id">{{ l.code }} - {{ l.name }}</option>
                  </select>
                </div>
             </div>
          </div>

          <!-- Notes -->
          <div class="space-y-2 pt-8 border-t border-slate-100">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Detail Perkembangan (Transaction Notes)</label>
            <textarea v-model="form.notes" rows="4" class="w-full rounded-2xl border-none bg-white shadow-inner p-4 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all resize-none placeholder:italic" placeholder="Tulis catatan interaksi di sini..."></textarea>
          </div>

          <div v-if="dialogError" class="rounded-2xl bg-rose-50 px-6 py-4 text-xs text-rose-600 border border-rose-100 font-bold shadow-sm animate-fade-in-up">{{ dialogError }}</div>
        </div>

        <!-- Dialog Footer Actions -->
        <div class="p-10 bg-white border-t flex items-center justify-between shadow-[0_-10px_20px_rgba(0,0,0,0.02)] shrink-0">
          <Button label="Batal & Bersihkan" severity="secondary" text @click="closeDialog" class="px-8 font-black text-[10px] uppercase tracking-widest h-14" :disabled="saving" />
          <Button :label="editingId ? 'Dispatch Update' : 'Commit Interaction'" :loading="saving" :disabled="!form.subject"
            @click="save" class="p-button-rounded h-14 px-12 bg-slate-900 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all" icon="pi pi-check-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

type Activity = {
  id: string; type: 'CALL' | 'EMAIL' | 'MEETING' | 'TASK';
  subject: string; status: 'OPEN' | 'DONE' | 'CANCELED';
  notes?: string | null; dueAt?: string | null;
  lead?: { id: string; code: string; name: string } | null;
  customer?: { id: string; code: string; name: string } | null;
  opportunity?: { id: string; code: string; name: string } | null;
  assignedTo?: { id: string; email: string; name: string | null } | null;
};
type SimpleObj = { id: string; code: string; name: string };
type CrmUser = { id: string; email: string; name: string | null };

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('crm.activity.read'));
const canCreate = computed(() => auth.hasPermission('crm.activity.create'));
const canUpdate = computed(() => auth.hasPermission('crm.activity.update'));
const canAssign = computed(() => auth.hasPermission('crm.activity.assign'));
const canReadUsers = computed(() => auth.hasPermission('crm.user.read'));

const q = ref('');
const statusFilter = ref('ACTIVE');
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const activities = ref<Activity[]>([]);

const filteredList = computed(() => {
  let res = activities.value;
  if (statusFilter.value === 'ACTIVE') res = res.filter(a => a.status === 'OPEN');
  if (statusFilter.value === 'DONE') res = res.filter(a => a.status === 'DONE');
  
  if (q.value) {
    const s = q.value.toLowerCase();
    res = res.filter(a => a.subject.toLowerCase().includes(s) || (a.notes||'').toLowerCase().includes(s) || 
                          (a.customer?.code||'').toLowerCase().includes(s) || (a.opportunity?.code||'').toLowerCase().includes(s));
  }
  return res;
});

const countType = (t: string) => activities.value.filter(a => a.type === t).length;

const typeStyle = (t: "CALL"|"EMAIL"|"MEETING"|"TASK") => {
  if (t === 'CALL') return { bg: '#e0f2fe', color: '#0284c7', icon: 'pi-phone', border: '#38bdf8' };
  if (t === 'EMAIL') return { bg: '#e0e7ff', color: '#4f46e5', icon: 'pi-envelope', border: '#818cf8' };
  if (t === 'MEETING') return { bg: '#f3e8ff', color: '#9333ea', icon: 'pi-users', border: '#c084fc' };
  return { bg: '#f1f5f9', color: '#475569', icon: 'pi-check-square', border: '#94a3b8' }; // TASK
};

const statusSelection = reactive<Record<string, Activity['status']>>({});
const assigneeSelection = reactive<Record<string, string>>({});

const leads = ref<SimpleObj[]>([]);
const customers = ref<SimpleObj[]>([]);
const opportunities = ref<SimpleObj[]>([]);
const users = ref<CrmUser[]>([]);

const dialogOpen = ref(false);
const saving = ref(false);
const dialogError = ref<string | null>(null);
const editingId = ref<string | null>(null);

const form = reactive({ type: 'CALL' as Activity['type'], dueDate: '', leadId: '', customerId: '', opportunityId: '', subject: '', notes: '' });

const pad = (n: number) => String(n).padStart(2, '0');
const formatTime = (iso: string) => {
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()} - ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const isPast = (iso?: string | null) => iso ? new Date(iso) < new Date() : false;

const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const load = async () => {
  loading.value = true; error.value = null; success.value = null;
  try {
    if (!canRead.value) { activities.value = []; return; }
    
    // Attempt parallel load, failing gracefully for lookups if no permission
    const tasks: Promise<any>[] = [api.get('/crm/activities')];
    if (leads.value.length === 0) tasks.push(auth.hasPermission('crm.lead.read') ? api.get('/crm/leads') : Promise.resolve({leads:[]}));
    if (customers.value.length === 0) tasks.push(auth.hasPermission('crm.customer.read') ? api.get('/crm/customers') : Promise.resolve({customers:[]}));
    if (opportunities.value.length === 0) tasks.push(auth.hasPermission('crm.opportunity.read') ? api.get('/crm/opportunities') : Promise.resolve({opportunities:[]}));
    if (users.value.length === 0) tasks.push(auth.hasPermission('crm.user.read') ? api.get('/crm/users') : Promise.resolve({users:[]}));
    
    const [aRes, lRes, cRes, oRes, uRes] = await Promise.all(tasks);
    
    activities.value = aRes.data?.activities ?? aRes.activities ?? [];
    if (lRes) leads.value = lRes.data?.leads ?? lRes.leads ?? [];
    if (cRes) customers.value = cRes.data?.customers ?? cRes.customers ?? [];
    if (oRes) opportunities.value = oRes.data?.opportunities ?? oRes.opportunities ?? [];
    if (uRes) users.value = uRes.data?.users ?? uRes.users ?? [];

    for (const a of activities.value) {
      statusSelection[a.id] = a.status;
      assigneeSelection[a.id] = a.assignedTo?.id ?? '';
    }
  } catch (e: any) { error.value = e?.response?.data?.message ?? 'Gagal load master activity'; } 
  finally { loading.value = false; }
};

const openCreate = () => {
  editingId.value = null;
  form.type = 'CALL'; form.subject = ''; form.notes = '';
  form.dueDate = new Date().toISOString().slice(0, 10);
  form.leadId = ''; form.customerId = ''; form.opportunityId = '';
  dialogError.value = null; dialogOpen.value = true;
};

const openEdit = (a: Activity) => {
  editingId.value = a.id;
  form.type = a.type; form.subject = a.subject; form.notes = a.notes ?? '';
  form.dueDate = a.dueAt ? new Date(a.dueAt).toISOString().slice(0, 10) : '';
  form.leadId = a.lead?.id ?? ''; form.customerId = a.customer?.id ?? ''; form.opportunityId = a.opportunity?.id ?? '';
  dialogError.value = null; dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };

const save = async () => {
  saving.value = true; dialogError.value = null;
  try {
    const payload = {
      type: form.type, subject: form.subject,
      dueAt: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
      leadId: form.leadId || undefined, customerId: form.customerId || undefined,
      opportunityId: form.opportunityId || undefined, notes: form.notes || undefined,
    };
    if (editingId.value) {
      await api.patch(`/crm/activities/${editingId.value}`, payload);
      showMsg(success, `Log ${form.subject} berhasil diperbarui.`);
    } else {
      await api.post('/crm/activities', payload);
      showMsg(success, `Berhasil mencatat aktivitas baru!`);
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) { dialogError.value = e?.response?.data?.message ?? 'Gagal simpan aktivitas'; } 
  finally { saving.value = false; }
};

const updateStatus = async (a: Activity) => {
  const oldVal = a.status;
  try {
    await api.patch(`/crm/activities/${a.id}`, { status: statusSelection[a.id] });
    showMsg(success, `Status Log selesai diubah jadi ${statusSelection[a.id]}.`);
    a.status = statusSelection[a.id];
  } catch (e: any) {
    statusSelection[a.id] = oldVal;
    showMsg(error, e?.response?.data?.message ?? 'Gagal update status penyelesaian');
  }
};

const assign = async (a: Activity) => {
  const oldVal = a.assignedTo?.id ?? '';
  try {
    await api.patch(`/crm/activities/${a.id}/assign`, { userId: assigneeSelection[a.id] || undefined });
    showMsg(success, 'Tugas ini berhasil dialihkan.');
  } catch (e: any) {
    assigneeSelection[a.id] = oldVal;
    showMsg(error, e?.response?.data?.message ?? 'Gagal memindahkan agen');
  }
};

onMounted(load);
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
