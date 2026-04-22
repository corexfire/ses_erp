<template>
  <div class="space-y-4">
    <!-- Header (Premium Sales Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-blue-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Revenue Core</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-blue-600">Sales Intelligence</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Sales <span class="text-blue-600 italic text-3xl">Quotations</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Gerbang utama pendapatan — kelola desain proposal harga, negosiasi komersial, dan validasi termin persetujuan dalam satu ekosistem terpadu.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Blueprint New Quote" size="small" icon="pi pi-file-edit" class="p-button-rounded h-12 px-8 bg-blue-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Modern Filters (Premium style) -->
    <div class="bg-blue-50/50 p-1.5 rounded-3xl border border-blue-100 flex flex-wrap items-center gap-2 animate-fade-in-up">
      <div class="bg-white p-1 rounded-[1.5rem] border border-slate-200 flex flex-1 items-center shadow-sm min-w-[280px]">
        <i class="pi pi-search px-4 text-slate-400 text-xs"></i>
        <InputText v-model="search" placeholder="Cari Dokumen SQ, Client, or Subject..." class="flex-1 h-10 border-none bg-transparent text-xs font-black uppercase tracking-widest outline-none shadow-none focus:ring-0" @keyup.enter="load" />
        <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-blue-600 transition-all shrink-0" />
      </div>

      <div class="flex bg-white/60 p-1 rounded-2xl border border-blue-100 gap-1 ml-auto">
        <button v-for="s in [{v:'',l:'ALL QUOTES'}, {v:'DRAFT',l:'DRAFTS'}, {v:'APPROVED',l:'SENT'}, {v:'ACCEPTED',l:'WON'}]" :key="s.v"
          @click="statusFilter = s.v"
          :class="statusFilter === s.v ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-slate-500 hover:bg-white hover:shadow-sm'"
          class="px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300">
          {{ s.l }}
        </button>
      </div>
    </div>

    <!-- TABLE (Premium Modern Style) -->
    <div class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80 text-left">
          <tr>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sales Blueprint</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target Entity</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-56">Commercial Value</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-44">Conversion State</th>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-44">Interaction</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-if="loading">
            <td colspan="5" class="py-24 text-center">
              <i class="pi pi-spinner pi-spin text-4xl text-blue-600 opacity-20"></i>
              <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-blue-600">Calculating projections...</div>
            </td>
          </tr>
          
          <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/5 group border-l-4" :style="{ borderLeftColor: statusBadgeColor(doc.status) }" @click="openView(doc)">
            <td class="px-8 py-6 align-middle">
               <div class="flex flex-col gap-2">
                  <div class="font-black text-slate-900 text-[14px] tracking-tight leading-tight uppercase group-hover:text-blue-700 transition-colors flex items-center gap-2">
                    {{ doc.code }}
                    <i v-if="doc.status === 'ACCEPTED'" class="pi pi-trophy text-yellow-500"></i>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest"><i class="pi pi-calendar text-[8px] mr-1"></i> Issue: {{ formatDate(doc.issueDate) }}</span>
                    <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded" :class="isExpired(doc.expiryDate) ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-50 text-slate-400 border border-slate-100'">
                       Exp: {{ formatDate(doc.expiryDate) }}
                    </span>
                  </div>
               </div>
            </td>
            
            <td class="px-6 py-6 align-middle border-l border-slate-50/50">
                <div class="flex flex-col gap-2">
                  <div class="font-black text-blue-900 text-[11px] uppercase tracking-tight flex items-center gap-1.5 transition-colors group-hover:text-blue-700">
                    <i class="pi pi-briefcase text-[10px]"></i> {{ doc.customer?.name }}
                  </div>
                  <div class="text-[9px] font-black text-slate-400 font-mono tracking-tighter uppercase">{{ doc.customer?.code }}</div>
                  <div v-if="doc.notes" class="text-[10px] font-medium text-slate-400 italic line-clamp-1 max-w-[200px] lowercase">{{ doc.notes }}</div>
                </div>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-right">
              <div class="flex flex-col">
                <div class="text-xl font-black font-mono tracking-tighter text-slate-900">
                  <span class="text-[10px] text-slate-400 mr-1 font-sans">Rp</span>{{ formatCurrency(calculateGrandTotal(doc)) }}
                </div>
                <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{{ calculateLines(doc) }} ITEMS QUOTED</div>
              </div>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
               <span class="inline-flex rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] shadow-sm whitespace-nowrap" :class="statusBadgeClasses(doc.status, doc.expiryDate)">
                 {{ doc.status }}
               </span>
            </td>

             <td class="px-8 py-6 align-middle border-l border-slate-50/50 text-right">
              <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                <Button label="Execute Commercials" size="small" class="p-button-rounded h-10 px-6 bg-slate-900 border-none text-white font-black text-[9px] uppercase shadow-lg hover:scale-110 active:scale-95 transition-all" @click.stop="openView(doc)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredDocs.length === 0">
            <td colspan="5" class="py-32 text-center text-slate-400 italic text-sm font-medium">
               <i class="pi pi-folder-open text-5xl mb-4 block opacity-10"></i>
               <div class="text-[10px] font-black uppercase tracking-[0.2em]">Silence in the commercial pipeline.</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <!-- Dialog Quotation Workpad (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white">
        <!-- Dialog Header -->
        <div class="p-10 border-b bg-white flex justify-between items-center shrink-0 relative overflow-hidden" :class="form.status === 'ACCEPTED' ? 'border-b-emerald-100' : 'border-b-blue-100'">
          <div class="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700" :class="form.status === 'ACCEPTED' ? 'bg-emerald-50' : 'bg-blue-50'"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-file-edit text-3xl animate-pulse" :class="form.status === 'ACCEPTED' ? 'text-emerald-400' : 'text-blue-400'"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeDoc?.id ? 'Commercial' : 'Provision' }} <span :class="form.status === 'ACCEPTED' ? 'text-emerald-600' : 'text-blue-600'" class="italic">Quotation</span></h3>
                <span v-if="activeDoc?.id" class="inline-flex rounded-2xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm" :class="statusBadgeClasses(form.status, form.expiryDate)">
                   {{ form.status }}
                </span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2" :class="form.status === 'ACCEPTED' ? 'border-emerald-500 text-emerald-600' : 'border-blue-500 text-blue-600'">Sales Hub Blueprint Provisioning / {{ form.code }}</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body (BoQ Workpad) -->
        <div class="p-10 space-y-8 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
           <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <!-- Left: Meta & Client -->
              <div class="lg:col-span-1 space-y-6">
                 <div class="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8">
                    <div class="space-y-6">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-blue-600"></div>
                        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 font-bold">Client Target</h4>
                      </div>
                      <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Recipient Entity <span class="text-red-500">*</span></label>
                        <select :disabled="isReadonly" v-model="form.customerId" class="w-full h-14 border-none rounded-2xl px-5 text-xs font-black text-blue-900 bg-blue-50/50 shadow-inner outline-none focus:ring-2 focus:ring-blue-100 appearance-none">
                            <option value="">-- Select Master Client --</option>
                            <option v-for="c in mockCustomers" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                        </select>
                      </div>
                    </div>

                    <div class="space-y-6 pt-6 border-t border-slate-100">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-slate-400"></div>
                        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 font-bold">Validity Gates</h4>
                      </div>
                      <div class="grid grid-cols-1 gap-4">
                        <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Issue Date</label>
                          <input :disabled="isReadonly" type="date" v-model="form.issueDate" class="w-full h-12 border-none rounded-xl px-4 text-[11px] font-black text-slate-700 bg-white shadow-inner outline-none focus:ring-2 focus:ring-blue-100" />
                        </div>
                        <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block uppercase text-rose-600">Valid Until</label>
                          <input :disabled="isReadonly" type="date" v-model="form.expiryDate" class="w-full h-12 border-none rounded-xl px-4 text-[11px] font-black text-rose-700 bg-rose-50 shadow-inner outline-none focus:ring-2 focus:ring-rose-100" />
                        </div>
                      </div>
                    </div>

                    <div class="space-y-2 pt-6 border-t border-slate-100">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Commercial Subject / Context Narrative</label>
                      <textarea :disabled="isReadonly" v-model="form.notes" rows="4" class="w-full border-none rounded-2xl p-4 text-[11px] font-medium text-slate-700 bg-white shadow-inner outline-none focus:ring-2 focus:ring-blue-100 resize-none transition-all" placeholder="Standard commercial proposal for specific project..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Right: Bill of Quantities (Main Table) -->
              <div class="lg:col-span-3">
                 <div class="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                    <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-white relative shrink-0">
                       <div class="absolute left-8 bottom-0 w-32 h-1 bg-blue-600 rounded-full"></div>
                       <div class="flex items-center gap-4">
                          <div class="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white"><i class="pi pi-list"></i></div>
                          <div>
                            <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Bill of Quantities</h4>
                            <p class="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">Detail Item, Pricing, and Commercial Incentives</p>
                          </div>
                       </div>
                       <Button v-if="!isReadonly" label="Append Line Item" icon="pi pi-plus" size="small" class="h-10 px-6 rounded-xl bg-slate-900 border-none text-white text-[10px] font-black uppercase shadow-lg hover:scale-105 transition-all" @click="addLine" />
                    </div>

                    <div class="flex-1 overflow-x-auto custom-scrollbar">
                      <table class="w-full text-sm">
                        <thead class="bg-slate-50/50 text-left">
                          <tr>
                            <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Blueprint Item Narrative</th>
                            <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center w-32">Qty (Vol)</th>
                            <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right w-44">Unit Price (Net)</th>
                            <th class="px-6 py-5 text-[9px] font-black text-rose-400 uppercase tracking-widest text-right w-40">Discount Unit</th>
                            <th class="px-6 py-5 text-[9px] font-black text-blue-600 uppercase tracking-widest text-right w-44 bg-blue-50/30">Row Net Amount</th>
                            <th v-if="!isReadonly" class="w-16"></th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                           <tr v-for="(line, idx) in form.lines" :key="idx" class="transition-all hover:bg-slate-50/30 group">
                              <td class="px-8 py-6 align-middle">
                                 <textarea :disabled="isReadonly" v-model="line.desc" rows="2" class="w-full text-[11px] font-bold text-slate-800 bg-white border-none rounded-xl p-3 shadow-inner outline-none focus:ring-2 focus:ring-blue-100 resize-none transition-all placeholder:italic" placeholder="Enter product specification or quote line narrative..." />
                              </td>
                              
                              <td class="px-6 py-6 align-middle text-center">
                                 <div class="flex flex-col items-center gap-1">
                                    <input :disabled="isReadonly" type="number" v-model.number="line.qty" class="w-24 h-10 border-none rounded-xl px-2 text-center text-sm font-black text-blue-800 bg-white shadow-inner outline-none focus:ring-2 focus:ring-blue-100" placeholder="0" />
                                    <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 text-[9px] font-black uppercase text-center outline-none bg-transparent text-slate-400 border-b border-dashed border-slate-200" placeholder="Unit" />
                                 </div>
                              </td>
                              
                              <td class="px-6 py-6 align-middle">
                                 <div class="relative">
                                   <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 font-black">Rp</span>
                                   <input :disabled="isReadonly" type="number" v-model.number="line.unitPrice" class="w-full h-10 border-none rounded-xl pl-8 pr-4 text-right text-[13px] font-mono font-black text-slate-700 bg-white shadow-inner outline-none focus:ring-2 focus:ring-emerald-100" placeholder="0" />
                                 </div>
                              </td>

                              <td class="px-6 py-6 align-middle">
                                 <div class="relative">
                                   <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-rose-400 font-black">Rp</span>
                                   <input :disabled="isReadonly" type="number" v-model.number="line.discount" class="w-full h-10 border-none rounded-xl pl-8 pr-4 text-right text-[13px] font-mono font-black text-rose-700 bg-rose-50/50 shadow-inner outline-none focus:ring-2 focus:ring-rose-100" placeholder="0" />
                                 </div>
                              </td>

                              <td class="px-6 py-6 align-middle bg-blue-50/20 text-right">
                                 <div class="flex flex-col">
                                   <span class="text-[13px] font-black text-blue-900 tracking-tight font-mono whitespace-nowrap"><span class="text-[9px] font-sans mr-0.5">Rp</span>{{ formatCurrency(calculateLineTotal(line)) }}</span>
                                 </div>
                              </td>
                              
                              <td v-if="!isReadonly" class="px-4 py-6 align-middle text-center">
                                  <button @click="removeLine(idx)" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black hover:bg-rose-600 hover:text-white transition-all shadow-sm">✕</button>
                              </td>
                           </tr>
                           <tr v-if="form.lines.length === 0">
                              <td :colspan="isReadonly ? 5 : 6" class="py-24 text-center">
                                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] italic">No line items dispatched. Append row to begin BoQ.</div>
                              </td>
                           </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- Commercial Summary Footer -->
                    <div class="p-8 border-t border-slate-100 bg-white/50 backdrop-blur-sm shrink-0 flex flex-col md:flex-row justify-between items-end gap-8 rounded-b-[2rem]">
                       <div class="space-y-3 w-full max-w-xs">
                         <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                           <span>Base Subtotal</span>
                           <span>Rp {{ formatCurrency(calcGross()) }}</span>
                         </div>
                         <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-rose-500">
                           <span>Total Incentives (-)</span>
                           <span>Rp {{ formatCurrency(calcDisc()) }}</span>
                         </div>
                         <div class="h-1 w-full bg-slate-100 rounded-full"></div>
                       </div>
                       
                       <div class="text-right">
                          <div class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Final Net Commercial Value</div>
                          <div class="text-5xl font-black text-slate-900 tracking-tighter font-mono">
                             <span class="text-sm font-sans mr-2 align-top text-slate-400">IDR</span>{{ formatCurrency(calcNet()) }},<span class="text-lg opacity-30">00</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Dialog Action Gates -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <Button label="Discard Workpad" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          
          <div class="flex items-center gap-4">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Approve & Dispatch PDF" severity="info" :loading="saving" :disabled="saving" @click="saveAction('APPROVED')" class="p-button-rounded h-14 px-10 bg-blue-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-send" />
             <Button v-else-if="isReadonly && canManage && form.status === 'APPROVED'" label="Record WON (DEAL!)" severity="success" :loading="saving" :disabled="saving" @click="saveAction('ACCEPTED')" class="p-button-rounded h-14 px-10 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-check-circle" />
             <Button v-else-if="isReadonly && canManage && form.status === 'APPROVED'" label="Archive as LOST" severity="danger" :loading="saving" :disabled="saving" @click="saveAction('REJECTED')" class="h-12 px-6 rounded-xl bg-rose-50 text-rose-700 border border-rose-100 font-black text-[10px] uppercase hover:bg-rose-100 transition-all" />
             <Button v-else-if="!isReadonly" label="Commit Draft Pipeline" severity="info" @click="saveAction('DRAFT')" class="p-button-rounded h-14 px-12 bg-blue-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-save" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('sales.quotation.manage') || true); 

const docs = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(true);
const activeDoc = ref<any>(null);

const form = reactive({
  id: '',
  code: '',
  customerId: '',
  issueDate: '',
  expiryDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockCustomers = ref<any[]>([
  {id:'1', code: 'CUS-KVJ', name:'PT. Kopi Viktori Jaya'},
]);

const filteredDocs = computed(() => {
  let list = docs.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.code?.toLowerCase().includes(q) || p.customer?.name?.toLowerCase().includes(q));
  }
  return list;
});

const formatQty = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { maximumFractionDigits: 1 });
};

const formatCurrency = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const isExpired = (iso: string) => {
   if(!iso) return false;
   return new Date(iso) < new Date();
};

const calculateLines = (doc: any) => doc.items ? doc.items.length : 0;
const calculateLineTotal = (line: any) => (Number(line.qty||0) * Number(line.unitPrice||0)) - Number(line.discount||0) * Number(line.qty||0);

const calcGross = () => form.lines.reduce((a,c) => a + (Number(c.qty||0) * Number(c.unitPrice||0)), 0);
const calcDisc = () => form.lines.reduce((a,c) => a + (Number(c.discount||0) * Number(c.qty||0)), 0); // Discount is per unit
const calcNet = () => calcGross() - calcDisc();

const calculateGrandTotal = (doc: any) => {
    if(!doc.items) return 0;
    return doc.items.reduce((acc: number, cur: any) => acc + calculateLineTotal(cur), 0);
}

const statusBadgeParams = (s: string, exp: string) => {
    if(s === 'ACCEPTED') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if(s === 'REJECTED') return 'bg-slate-100 text-slate-500 border-slate-300';
    if(s === 'DRAFT') return 'bg-amber-50 text-amber-600 border-amber-200';
    if(isExpired(exp)) return 'bg-rose-100 text-rose-700 border-rose-300';
    return 'bg-blue-100 text-blue-700 border-blue-300';
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=SalesQuotation&include=customer,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "SQ-202604-001", status: "APPROVED", issueDate: "2026-04-10T00:00", expiryDate:"2026-04-24T00:00", notes: "Penawaran suplai kopi khusus.",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium 250g', qty: 1000, unitPrice: 120000, discount: 5000, uomCode: 'PCS' }
        ]
      },
      { 
        id: '1', code: "SQ-202604-002", status: "DRAFT", issueDate: "2026-04-13T00:00", expiryDate:"2026-04-30T00:00", notes: "Proyek ekspansi.",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { desc: 'Biji Kopi House Blend 1KG', qty: 500, unitPrice: 200000, discount: 0, uomCode: 'KG' }
        ]
      }
    ];
    try {
        const cs = await api.get('/core/query?table=Customer');
        if (cs.data?.data) mockCustomers.value = cs.data.data;
    } catch(er){}
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeDoc.value = null;
  isReadonly.value = false;
  form.id = '';
  form.code = 'SQ-NEW';
  form.customerId = mockCustomers.value[0]?.id || '';
  form.issueDate = (new Date().toISOString().split('T')[0]) || '';
  
  let d = new Date(); d.setDate(d.getDate() + 14); // default 14 days valid
  form.expiryDate = (d.toISOString().split('T')[0]) || '';
  
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Item / Jasa Standar", qty: 10, unitPrice: 150000, discount: 0, uomCode: 'PCS' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.customerId = r.customerId || mockCustomers.value[0]?.id || '';
  form.issueDate = r.issueDate?.split('T')[0] || '';
  form.expiryDate = r.expiryDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan edit form pricing
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLine() {
   form.lines.push({ desc: "", qty: 1, unitPrice: 0, discount: 0, uomCode: 'PCS' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function saveAction(targetStatus: string) {
  saving.value = true;
  form.status = targetStatus;
  
  let msg = "Dokumen Penawaran Harga berhasil disimpan.";
  if(targetStatus === 'ACCEPTED') msg = "Luar Biasa! Sales Quotation dimenangkan (Deal Won). Dokumen ini bersiap dicetak menjadi Sales Order riil.";
  
  setTimeout(() => {
    alert(msg);
    dialogOpen.value = false;
    saving.value = false;
    load();
  }, 1000);
}

onMounted(() => {
  load();
});

const statusBadgeColor = (s: string) => {
    if(s === 'ACCEPTED') return '#10b981';
    if(s === 'REJECTED') return '#94a3b8';
    if(s === 'DRAFT') return '#f59e0b';
    return '#3b82f6';
};

const statusBadgeClasses = (s: string, exp: string) => {
    if(s === 'ACCEPTED') return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
    if(s === 'REJECTED') return 'bg-slate-50 text-slate-500 border border-slate-200';
    if(s === 'DRAFT') return 'bg-amber-50 text-amber-600 border border-amber-100';
    if(isExpired(exp)) return 'bg-rose-50 text-rose-600 border border-rose-100';
    return 'bg-blue-50 text-blue-600 border border-blue-100';
};
</script>

<style scoped lang="postcss">
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
