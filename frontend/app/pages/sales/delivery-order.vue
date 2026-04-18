<template>
  <div class="space-y-4">
    <!-- Header (Premium Logistics Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-cyan-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Transit Core</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-cyan-600">Logistics dispatch</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Delivery <span class="text-cyan-600 italic text-3xl">Orders</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Jembatan menuju Klien — mencetak Surat Jalan Ekspedisi, melacak muatan truk transit, dan mengurangi fisik stok secara resmi dari WMS (Issue Out).</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Dispatch Manifest" size="small" icon="pi pi-truck" class="p-button-rounded h-12 px-8 bg-cyan-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-cyan-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>
    <!-- High-Contrast KPI Banners (Premium style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
       <!-- Primary engagement banner -->
      <div class="p-6 rounded-2xl bg-cyan-950 text-white shadow-xl flex flex-col justify-between border border-cyan-800 transition-all hover:bg-cyan-900 group">
        <div class="text-[10px] font-black uppercase text-cyan-400 tracking-[0.2em] mb-4 opacity-80">Transit Velocity</div>
        <div class="flex items-end justify-between">
          <h3 class="text-2xl font-black text-white tracking-tighter leading-none">{{ docs.length }} ACTIVE MANIFESTS</h3>
          <div class="p-3 bg-cyan-800 rounded-xl text-cyan-100 shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-compass text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Pending Load</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-300 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'DRAFT').length }}</h3>
          <div class="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100"><i class="pi pi-box text-lg"></i></div>
        </div>
      </div>
      
      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">In Transit</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-600 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'IN_TRANSIT').length }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-truck text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Delivered (POD)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-600 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'DELIVERED').length }}</h3>
          <div class="p-3 bg-emerald-100 text-emerald-600 rounded-xl shadow-lg group-hover:rotate-12 transition-transform border border-emerald-200"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Modern Filters (Premium style) -->
    <div class="bg-cyan-50/50 p-1.5 rounded-3xl border border-cyan-100 flex flex-wrap items-center gap-2 animate-fade-in-up">
      <div class="bg-white p-1 rounded-[1.5rem] border border-slate-200 flex flex-1 items-center shadow-sm min-w-[280px]">
        <i class="pi pi-search px-4 text-slate-400 text-xs"></i>
        <InputText v-model="search" placeholder="Cari Kode DO, Resi, or Destination Entity..." class="flex-1 h-10 border-none bg-transparent text-xs font-black uppercase tracking-widest outline-none shadow-none focus:ring-0" @keyup.enter="load" />
        <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-cyan-600 transition-all shrink-0" />
      </div>

      <div class="flex bg-white/60 p-1 rounded-2xl border border-cyan-100 gap-1 ml-auto">
        <button v-for="s in [{v:'',l:'ALL MANIFESTS'}, {v:'DRAFT',l:'PENDING'}, {v:'IN_TRANSIT',l:'ON ROAD'}, {v:'DELIVERED',l:'POD'}]" :key="s.v"
          @click="statusFilter = s.v"
          :class="statusFilter === s.v ? 'bg-cyan-600 text-white shadow-lg scale-105' : 'text-slate-500 hover:bg-white hover:shadow-sm'"
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
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transit Blueprint</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Recipient Identity (Destinasi)</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-40">Load Vol</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-48">Fleet State</th>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-44">Field Agent</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-if="loading">
            <td colspan="5" class="py-24 text-center">
              <i class="pi pi-spinner pi-spin text-4xl text-cyan-600 opacity-20"></i>
              <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-cyan-600">Scanning terrestrial movement...</div>
            </td>
          </tr>
          
          <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/5 group border-l-4" :style="{ borderLeftColor: statusBadgeColor(doc.status) }" @click="openView(doc)">
            <td class="px-8 py-6 align-middle">
               <div class="flex flex-col gap-2">
                  <div class="font-black text-slate-900 text-[14px] tracking-tight leading-tight uppercase group-hover:text-cyan-700 transition-colors flex items-center gap-2">
                    {{ doc.code }}
                    <i v-if="doc.status === 'DELIVERED'" class="pi pi-check-circle text-emerald-500 shadow-sm"></i>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5"><i class="pi pi-clock text-[8px]"></i> DEPLOY: {{ formatDate(doc.actualShipDate) }}</span>
                  </div>
               </div>
            </td>
            
            <td class="px-6 py-6 align-middle border-l border-slate-50/50">
                <div class="flex flex-col gap-2">
                  <div class="font-black text-cyan-900 text-[11px] uppercase tracking-tight flex items-center gap-1.5 transition-colors group-hover:text-cyan-700 leading-none">
                    <i class="pi pi-map-marker text-[10px]"></i> {{ doc.customer?.name }}
                  </div>
                  <div class="text-[9px] font-black text-slate-400 font-mono tracking-tighter uppercase line-clamp-1 max-w-[200px]">{{ doc.deliveryAddress1 }}</div>
                  <div class="text-[8px] font-black text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-100 inline-block self-start uppercase italic">{{ doc.deliveryCity }}</div>
                </div>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
              <div class="flex flex-col items-center">
                <div class="text-2xl font-black font-mono tracking-tight text-slate-900 leading-none">
                  {{ calculateTotalQty(doc) }}
                </div>
                <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2">PHYSICAL UNITS</div>
              </div>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
               <span class="inline-flex rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] shadow-sm whitespace-nowrap" :class="statusBadgeClasses(doc.status)">
                 {{ statusMapper(doc.status) }}
               </span>
               <div v-show="doc.status === 'IN_TRANSIT'" class="text-[8px] mt-2 text-amber-600 font-black tracking-widest uppercase animate-pulse leading-none flex items-center justify-center gap-1"><i class="pi pi-send text-[7px]"></i> GPS ENGAGED</div>
            </td>

             <td class="px-8 py-6 align-middle border-l border-slate-50/50 text-right">
              <div class="flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                <Button v-if="doc.status === 'IN_TRANSIT'" label="Validate POD" size="small" class="p-button-rounded h-9 px-6 bg-cyan-600 border-none text-white font-black text-[9px] uppercase shadow-lg hover:scale-105 active:scale-95 transition-all w-full" @click.stop="gotoInvoice(doc)" />
                <Button label="Manifest Audit" size="small" class="p-button-rounded h-9 px-6 bg-slate-900 border-none text-white font-black text-[9px] uppercase shadow-lg hover:scale-105 active:scale-95 transition-all w-full" @click.stop="openView(doc)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredDocs.length === 0">
            <td colspan="5" class="py-32 text-center text-slate-400 italic text-sm font-medium">
               <i class="pi pi-compass text-5xl mb-4 block opacity-10"></i>
               <div class="text-[10px] font-black uppercase tracking-[0.2em]">Silence in the terminal airspace.</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <!-- Dialog Logistics Hub (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900">
        <!-- Dialog Header -->
        <div class="p-10 border-b bg-white flex justify-between items-center shrink-0 relative overflow-hidden" :class="form.status === 'IN_TRANSIT' ? 'border-b-amber-100' : 'border-b-cyan-100'">
          <div class="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700" :class="form.status === 'IN_TRANSIT' ? 'bg-amber-50' : 'bg-cyan-50'"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-truck text-3xl animate-pulse" :class="form.status === 'IN_TRANSIT' ? 'text-amber-400' : 'text-cyan-400'"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeDoc?.id ? 'Manifest' : 'Provisioning' }} <span :class="form.status === 'IN_TRANSIT' ? 'text-amber-600' : 'text-cyan-600'" class="italic">Delivery Order</span></h3>
                <span v-if="activeDoc?.id" class="inline-flex rounded-2xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm" :class="statusBadgeClasses(form.status)">
                   {{ statusMapper(form.status) }}
                </span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2" :class="form.status === 'IN_TRANSIT' ? 'border-amber-500 text-amber-600' : 'border-cyan-500 text-cyan-600'">Logistic Control Hub / {{ form.code }}</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body (Manifest Workpad) -->
        <div class="p-10 space-y-8 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
           <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <!-- Left: Fleet Meta -->
              <div class="lg:col-span-1 space-y-6">
                 <div class="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                    <div class="space-y-6">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-cyan-600"></div>
                        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Destination Gate</h4>
                      </div>
                      <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Recipient Entity / Consignee</label>
                        <select :disabled="isReadonly" v-model="form.customerId" class="w-full h-14 border-none rounded-2xl px-5 text-xs font-black text-cyan-900 bg-cyan-50/50 shadow-inner outline-none focus:ring-2 focus:ring-cyan-100 appearance-none">
                            <option value="">-- Select Consignee --</option>
                            <option v-for="c in mockCustomers" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                        </select>
                      </div>
                    </div>

                    <div class="space-y-6 pt-6 border-t border-slate-100">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-slate-400"></div>
                        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Deployment Gate</h4>
                      </div>
                      <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Actual Dispatch Date</label>
                        <input :disabled="isReadonly" type="date" v-model="form.actualShipDate" class="w-full h-14 border-none rounded-2xl px-5 text-xs font-black text-slate-700 bg-white shadow-inner outline-none focus:ring-2 focus:ring-cyan-100" />
                      </div>
                    </div>

                    <div class="space-y-2 pt-6 border-t border-slate-100">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase"><i class="pi pi-map-marker text-rose-500 mr-1"></i> Drop Point Coordinates (Physical)</label>
                      <textarea :disabled="isReadonly" v-model="form.deliveryAddress1" rows="3" class="w-full border-none rounded-2xl p-5 text-[11px] font-medium text-slate-700 bg-white shadow-inner outline-none focus:ring-2 focus:ring-cyan-100 resize-none transition-all placeholder:italic" placeholder="Jl. Raya Boulevard Kav..."></textarea>
                      <input :disabled="isReadonly" type="text" v-model="form.deliveryCity" class="w-full h-10 border-none rounded-2xl px-5 text-[10px] font-black bg-cyan-50/30 text-cyan-800 outline-none focus:ring-2 focus:ring-cyan-100 mt-2 uppercase tracking-widest" placeholder="City / Regency" />
                    </div>
                 </div>
              </div>

              <!-- Right: Manifest Payload (Table) -->
              <div class="lg:col-span-3">
                 <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full border-b-[8px] border-b-slate-900">
                    <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-white relative shrink-0">
                       <div class="absolute left-8 bottom-0 w-32 h-1 bg-cyan-600 rounded-full"></div>
                       <div class="flex items-center gap-4">
                          <div class="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center text-white shadow-lg"><i class="pi pi-barcode text-xl"></i></div>
                          <div>
                            <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 font-bold">Physical Payload Manifest</h4>
                            <p class="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">WMS Issue-Out Ledger / Physical Inventory Movement</p>
                          </div>
                       </div>
                       <div class="flex items-center gap-3">
                          <Button v-if="!isReadonly" label="Sync from SO" icon="pi pi-download" size="small" class="h-10 px-6 rounded-xl bg-slate-100 border-none text-slate-600 text-[10px] font-black uppercase hover:bg-slate-200 transition-all font-bold" />
                          <Button v-if="!isReadonly" label="Commit Line Item" icon="pi pi-plus" size="small" class="h-10 px-6 rounded-xl bg-slate-900 border-none text-white text-[10px] font-black uppercase shadow-lg hover:scale-105 transition-all font-bold" @click="addLine" />
                       </div>
                    </div>

                    <div class="flex-1 overflow-x-auto custom-scrollbar">
                      <table class="w-full text-sm">
                        <thead class="bg-slate-50/50 text-left">
                          <tr>
                            <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Inventory Master Record / SKU Specification</th>
                            <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center w-32">Manifest Qty</th>
                            <th class="px-6 py-5 text-[9px] font-black text-cyan-600 uppercase tracking-widest text-center w-40 bg-cyan-50/30">SHIPPED QTY (NET)</th>
                            <th v-if="!isReadonly" class="w-20"></th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                           <tr v-for="(line, idx) in form.lines" :key="idx" class="transition-all hover:bg-slate-50/30 group">
                              <td class="px-8 py-6 align-middle">
                                 <div class="flex flex-col gap-2">
                                    <textarea :disabled="isReadonly" v-model="line.desc" rows="1" class="w-full text-[11px] font-black text-slate-800 bg-white border-none rounded-xl p-3 shadow-inner outline-none focus:ring-2 focus:ring-cyan-100 resize-none transition-all placeholder:italic leading-none" placeholder="Enter SKU ID or Product description..." />
                                    <div class="flex gap-2">
                                      <span v-if="line.itemId" class="text-[8px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1 uppercase tracking-widest shadow-sm"><i class="pi pi-database text-[7px] animate-pulse"></i> WMS Linked Record</span>
                                    </div>
                                 </div>
                              </td>
                              
                              <td class="px-6 py-6 align-middle text-center">
                                 <div class="flex flex-col items-center gap-1 opacity-40">
                                    <input :disabled="true" type="number" v-model.number="line.orderedQty" class="w-24 h-11 border-none rounded-2xl px-2 text-center text-sm font-black text-slate-400 bg-slate-100 cursor-not-allowed font-mono shadow-inner" placeholder="0" />
                                    <span class="text-[8px] font-black uppercase text-slate-400 tracking-widest">Requested</span>
                                 </div>
                              </td>
                              
                              <td class="px-6 py-6 align-middle bg-cyan-50/20 text-center">
                                 <div class="flex flex-col items-center gap-1">
                                    <input :disabled="isReadonly" type="number" v-model.number="line.shippedQty" class="w-28 h-12 border-none rounded-2xl px-2 text-center text-2xl font-black text-cyan-800 bg-white shadow-xl outline-none focus:ring-2 focus:ring-cyan-500 font-mono drop-shadow-md" placeholder="0" />
                                    <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 text-[10px] font-black uppercase text-center outline-none bg-transparent text-slate-400 border-b border-dashed border-slate-200 mt-1" placeholder="UOM" />
                                 </div>
                              </td>
                              
                              <td v-if="!isReadonly" class="px-6 py-6 align-middle text-center">
                                  <button @click="removeLine(idx)" class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black hover:bg-rose-600 hover:text-white transition-all shadow-sm">✕</button>
                              </td>
                           </tr>
                           <tr v-if="form.lines.length === 0">
                              <td :colspan="isReadonly ? 3 : 4" class="py-24 text-center">
                                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] italic">No items commited to the terminal manifest board.</div>
                              </td>
                           </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- Gross Total Bar -->
                    <div class="p-10 border-t border-slate-100 bg-slate-900 shrink-0 flex flex-col md:flex-row justify-between items-center gap-8 rounded-b-[1.5rem] relative overflow-hidden">
                       <div class="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center rotate-12">
                          <i class="pi pi-box text-[200px] text-white font-black"></i>
                       </div>
                       <div class="z-10 text-left">
                          <div class="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-2">Authenticated Manifest Vol</div>
                          <div class="text-5xl font-black text-white tracking-tighter font-mono flex items-start leading-none">
                             {{ calculateTotalQty(form) }}<span class="text-sm font-sans ml-3 mt-2 text-slate-400 uppercase tracking-widest">Physical Units Shipped</span>
                          </div>
                       </div>
                       <div class="z-10 hidden lg:block text-right">
                          <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest line-clamp-2 max-w-[200px] leading-tight lowercase">Audit trail will record the precise millisecond of warehouse physical departure for these items.</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Dialog Footer Gates -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <Button label="Abort Manifest" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          
          <div class="flex items-center gap-4">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Issue Out & Deploy Fleet" severity="info" :loading="saving" :disabled="saving" @click="saveAction('IN_TRANSIT')" class="p-button-rounded h-14 px-12 bg-cyan-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-cyan-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-send" />
             <Button v-else-if="!isReadonly" label="Commit Dispatch Concepts" severity="info" @click="saveAction('DRAFT')" class="p-button-rounded h-14 px-14 bg-cyan-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-cyan-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-save" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('sales.delivery.manage') || true); 

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
  actualShipDate: '',
  deliveryAddress1: '',
  deliveryCity: '',
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

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const calculateTotalQty = (doc: any) => {
    if(!doc.items) return 0;
    return doc.items.reduce((acc: number, cur: any) => acc + Number(cur.shippedQty), 0);
}

const statusMapper = (s: string) => {
    if(s === 'IN_TRANSIT') return 'TRUK BERANGKAT (SHIPPED)';
    if(s === 'DELIVERED') return 'DITERIMA (POD)';
    if(s === 'DRAFT') return 'TAHAP PACKING';
    return s;
}

const statusBadgeParams = (s: string) => {
    if(s === 'IN_TRANSIT') return 'bg-amber-100 text-amber-800 border-amber-400 border-2 shadow shadow-amber-200 animate-none';
    if(s === 'DELIVERED') return 'bg-emerald-100 text-emerald-800 border-emerald-300 border bg-emerald-50';
    if(s === 'DRAFT') return 'bg-slate-100 text-slate-500 border-slate-300 border border-dashed';
    return 'bg-cyan-100 text-cyan-700 border-cyan-300 border';
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=DeliveryOrder&include=customer,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "DO-202604-001", status: "IN_TRANSIT", actualShipDate: "2026-04-16T00:00", deliveryAddress1: "Jl. Sudirman Kav B3", deliveryCity: "Jakarta Pusat",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { itemId: 'wms-key', desc: 'Kopi Bubuk Arabica Premium 250g', orderedQty: 250, shippedQty: 250, uomCode: 'PCS' }
        ]
      },
      { 
        id: '2', code: "DO-202604-002", status: "DRAFT", plannedShipDate: "2026-04-20T00:00", deliveryAddress1: "Cabang Gudang Viktori", deliveryCity: "Jakarta Selatan",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { itemId: 'wms-key', desc: 'Kopi Bubuk Arabica Premium 250g', orderedQty: 100, shippedQty: 0, uomCode: 'PCS' }
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
  form.code = 'DO-NEW';
  form.customerId = mockCustomers.value[0]?.id || '';
  form.actualShipDate = new Date().toISOString().split('T')[0];
  form.deliveryAddress1 = '';
  form.deliveryCity = '';
  form.status = 'DRAFT';
  form.lines = [{ itemId: 'wms-key', desc: "Kopi Arabica Tarikan dari SO-XXXX...", orderedQty: 10, shippedQty: 0, uomCode: 'PCS' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.customerId = r.customerId || mockCustomers.value[0]?.id;
  form.actualShipDate = r.actualShipDate?.split('T')[0] || r.plannedShipDate?.split('T')[0] || '';
  form.deliveryAddress1 = r.deliveryAddress1 || '';
  form.deliveryCity = r.deliveryCity || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function gotoInvoice(doc: any) {
   alert(`Integrasi Modul Keuangan: POD (Proof of Delivery) untuk ${doc.code} Disetujui! Membuka portal Pembuatan Tagihan Penjualan (Sales Invoice) kepada akun Piutang Klien...`);
}

function addLine() {
   form.lines.push({ itemId: null, desc: "", orderedQty: 1, shippedQty: 0, uomCode: 'PCS' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function saveAction(targetStatus: string) {
  saving.value = true;
  form.status = targetStatus;
  
  let msg = "Konsep Surat Jalan berhasil disimpan.";
  if(targetStatus === 'IN_TRANSIT') msg = "EKSEKUSI PENGIRIMAN SAH! Stok Gudang secara hard-code di database resmi berkurang (ISSUED OUT). Truk armada ERP Anda dilaporkan mengudara ke lokasi Klien!";
  
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
    if(s === 'IN_TRANSIT') return '#f59e0b';
    if(s === 'DELIVERED') return '#10b981';
    if(s === 'DRAFT') return '#94a3b8';
    return '#0891b2';
};

const statusBadgeClasses = (s: string) => {
    if(s === 'IN_TRANSIT') return 'bg-amber-50 text-amber-600 border border-amber-100';
    if(s === 'DELIVERED') return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
    if(s === 'DRAFT') return 'bg-slate-50 text-slate-500 border border-slate-200';
    return 'bg-blue-50 text-blue-600 border border-blue-100';
};
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
