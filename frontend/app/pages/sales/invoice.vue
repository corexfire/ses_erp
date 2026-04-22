<template>
  <div class="space-y-4">
    <!-- Header (Premium Finance Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Finance Core</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Realisasi Pendapatan</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Faktur <span class="text-emerald-600 italic text-3xl">Penjualan</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Penagihan komitmen nilai (Billing) — mencetak invoice sah, mendebit buku Piutang Dagang (AR), dan memverifikasi pelunasan kas masuk.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Cetak Faktur Baru" size="small" icon="pi pi-receipt" class="p-button-rounded h-12 px-8 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- High-Contrast KPI Banners (Premium style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
       <!-- Primary engagement banner -->
      <div class="p-4 rounded-2xl bg-emerald-950 text-white shadow-xl flex flex-col justify-between border border-emerald-800 transition-all hover:bg-emerald-900 group">
        <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 opacity-80">Total Piutang Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-2xl font-black text-white tracking-tighter leading-none">Rp {{ formatCurrency(docs.filter(x => x.status === 'APPROVED').reduce((a,c) => a + calculateGrandTotal(c), 0)) }}</h3>
          <div class="p-3 bg-emerald-800 rounded-xl text-emerald-100 shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-wallet text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Piutang Jatuh Tempo</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-700 tracking-tighter leading-none">{{ docs.filter(x => isOverdue(x.invoiceDate, x.status)).length }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><i class="pi pi-exclamation-triangle text-lg"></i></div>
        </div>
      </div>
      
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Draft/Belum Jurnal</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-300 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'DRAFT').length }}</h3>
          <div class="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100"><i class="pi pi-file-edit text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Lunas (Paid / AR Zero)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-600 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'CLOSED').length }}</h3>
          <div class="p-3 bg-emerald-100 text-emerald-600 rounded-xl shadow-lg group-hover:rotate-12 transition-transform border border-emerald-200"><i class="pi pi-verified text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <!-- Modern Filters (Premium style) -->
    <div class="bg-emerald-50/50 p-1.5 rounded-3xl border border-emerald-100 flex flex-wrap items-center gap-2 animate-fade-in-up">
      <div class="bg-white p-1 rounded-[1.5rem] border border-slate-200 flex flex-1 items-center shadow-sm min-w-[280px]">
        <i class="pi pi-search px-4 text-slate-400 text-xs"></i>
        <InputText v-model="search" placeholder="Cari No. Faktur, Klien, or Kode Pesanan..." class="flex-1 h-10 border-none bg-transparent text-xs font-black uppercase tracking-widest outline-none shadow-none focus:ring-0" @keyup.enter="load" />
        <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-emerald-600 transition-all shrink-0" />
      </div>

      <div class="flex bg-white/60 p-1 rounded-2xl border border-emerald-100 gap-1 ml-auto">
        <button v-for="s in [{v:'',l:'SEMUA AKTIVITAS'}, {v:'DRAFT',l:'VERIFIKASI'}, {v:'APPROVED',l:'PIUTANG'}, {v:'CLOSED',l:'LUNAS'}]" :key="s.v"
          @click="statusFilter = s.v"
          :class="statusFilter === s.v ? 'bg-emerald-600 text-white shadow-lg scale-105' : 'text-slate-500 hover:bg-white hover:shadow-sm'"
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
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identitas Faktur (AR)</th>
              <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Entitas Debitur (Klien)</th>
              <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-56">Nilai Realisasi (IDR)</th>
              <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-48">Jatuh Tempo & Status</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-44">Otoritas Keuangan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-emerald-600 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-emerald-600">Membuka ledger piutang dagang...</div>
              </td>
            </tr>
            
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/5 group border-l-4" :style="{ borderLeftColor: statusColor(doc.status) }" @click="openView(doc)">
              <td class="px-8 py-6 align-middle">
                 <div class="flex flex-col gap-2">
                    <div class="font-black text-slate-900 text-[14px] tracking-tight leading-tight uppercase group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                      {{ doc.code }}
                      <i v-if="doc.status === 'CLOSED'" class="pi pi-verified text-emerald-500 shadow-sm"></i>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5"><i class="pi pi-link text-[8px]"></i> REF: {{ doc.order?.code || 'Manual Entry' }}</span>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50/50">
                  <div class="flex flex-col gap-2">
                    <div class="font-black text-emerald-900 text-[11px] uppercase tracking-tight flex items-center gap-1.5 transition-colors group-hover:text-emerald-700 leading-none">
                      <i class="pi pi-building text-[10px]"></i> {{ doc.customer?.name }}
                    </div>
                    <div class="text-[8px] font-black text-slate-400 font-mono tracking-tighter uppercase line-clamp-1 max-w-[200px]">{{ doc.customer?.code }}</div>
                    <div class="text-[8px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 inline-block self-start uppercase italic">Accounted AR</div>
                  </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-right">
                <div class="flex flex-col">
                  <div class="text-xl font-black font-mono tracking-tighter text-slate-900 leading-none" :class="doc.status === 'CLOSED' ? 'text-emerald-500' : ''">
                    <span class="text-[10px] text-slate-400 mr-1 font-sans">Rp</span>{{ formatCurrency(calculateGrandTotal(doc)) }}
                  </div>
                  <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 whitespace-nowrap">{{ doc.status === 'CLOSED' ? 'PELUNASAN TERKONFIRMASI' : 'KOMITMEN NILAI TAGIH' }}</div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
                 <div :class="['inline-flex rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-sm whitespace-nowrap', isOverdue(doc.invoiceDate, doc.status) ? 'bg-rose-50 text-rose-700 border border-rose-100 animate-pulse' : statusBadgeClasses(doc.status)]">
                   <i :class="isOverdue(doc.invoiceDate, doc.status) ? 'pi pi-exclamation-triangle mr-2' : 'pi pi-clock mr-2'"></i>
                   {{ isOverdue(doc.invoiceDate, doc.status) ? 'OVERDUE:' : '' }} {{ formatDate(doc.invoiceDate, 30) }}
                 </div>
              </td>

               <td class="px-8 py-6 align-middle border-l border-slate-50/50 text-right">
                <div class="flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                  <Button v-if="doc.status === 'APPROVED'" label="Terima Pelunasan" size="small" class="p-button-rounded h-9 px-6 bg-emerald-600 border-none text-white font-black text-[9px] uppercase shadow-lg hover:scale-105 active:scale-95 transition-all w-full" @click.stop="pay(doc)" />
                  <Button label="Audit Faktur" size="small" class="p-button-rounded h-9 px-6 bg-slate-900 border-none text-white font-black text-[9px] uppercase shadow-lg hover:scale-105 active:scale-95 transition-all w-full" @click.stop="openView(doc)" />
                </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-400 italic text-sm font-medium">
                 <i class="pi pi-receipt text-5xl mb-4 block opacity-10"></i>
                 <div class="text-[10px] font-black uppercase tracking-[0.2em]">Tidak ada riwayat penagihan dalam ledger.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    <!-- Dialog Billing Hub (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900">
        <!-- Dialog Header -->
        <div class="p-10 border-b bg-white flex justify-between items-center shrink-0 relative overflow-hidden" :class="activeDoc?.status === 'CLOSED' ? 'border-b-emerald-100' : 'border-b-slate-100'">
          <div class="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700" :class="activeDoc?.status === 'CLOSED' ? 'bg-emerald-50' : 'bg-slate-50'"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-receipt text-3xl animate-pulse" :class="activeDoc?.status === 'CLOSED' ? 'text-emerald-400' : 'text-emerald-500'"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeDoc?.id ? 'Dokumen' : 'Provisioning' }} <span class="text-emerald-600 italic">Faktur Penjualan</span></h3>
                <span v-if="activeDoc?.id" class="inline-flex rounded-2xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm" :class="statusBadgeClasses(form.status)">
                   {{ statusMapper(form.status) }}
                </span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600">Billing Control Hub / Revenue Realization Ledger</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body (Billing Workpad) -->
        <div class="p-10 space-y-8 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
           <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <!-- Left: Customer Meta -->
              <div class="lg:col-span-1 space-y-6">
                 <div class="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                    <div class="space-y-6">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-emerald-600"></div>
                        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Entitas Debitur (AR)</h4>
                      </div>
                      <div class="space-y-4">
                        <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Klien Terutang <span class="text-red-500">*</span></label>
                          <select :disabled="isReadonly" v-model="form.customerId" class="w-full h-14 border-none rounded-2xl px-5 text-xs font-black text-emerald-900 bg-emerald-50/50 shadow-inner outline-none focus:ring-2 focus:ring-emerald-100 appearance-none">
                              <option value="">-- Pilih Customer B2B --</option>
                              <option v-for="c in mockCustomers" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                          </select>
                        </div>
                        <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Ref. Pesanan Jual (Sales Order)</label>
                          <input :disabled="isReadonly" type="text" v-model="form.orderId" class="w-full h-12 border-none rounded-2xl px-5 text-xs font-black text-slate-600 bg-slate-100/50 shadow-inner outline-none focus:ring-2 focus:ring-emerald-100 font-mono" placeholder="SO-XXXX-XXXX" />
                        </div>
                      </div>
                    </div>

                    <div class="space-y-6 pt-6 border-t border-slate-100">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-slate-400"></div>
                        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Parameter Ledger</h4>
                      </div>
                      <div class="grid grid-cols-1 gap-4">
                        <div class="space-y-2">
                           <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-2 lowercase">Tanggal Faktur Sah</label>
                           <input :disabled="isReadonly" type="date" v-model="form.invoiceDate" class="w-full h-12 border-none rounded-2xl px-5 text-xs font-black text-slate-700 bg-white border border-slate-100 shadow-inner outline-none" />
                        </div>
                        <div class="space-y-2">
                           <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-2 lowercase">Estimasi Jatuh Tempo (AR Aging)</label>
                           <div class="w-full h-12 rounded-2xl flex items-center px-5 bg-rose-50 text-rose-700 font-black text-xs font-mono border border-rose-100 opacity-60">NET-30: {{ formatDate(form.invoiceDate, 30) }}</div>
                        </div>
                      </div>
                    </div>

                    <div class="space-y-2 pt-6 border-t border-slate-100">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Klausul Penagihan / Notes</label>
                      <textarea :disabled="isReadonly" v-model="form.notes" rows="3" class="w-full border-none rounded-2xl p-5 text-[11px] font-medium text-slate-700 bg-slate-50 shadow-inner outline-none focus:ring-2 focus:ring-emerald-100 resize-none transition-all placeholder:italic" placeholder="Metode pembayaran, instruksi transfer..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Right: Billing Payload (Table) -->
              <div class="lg:col-span-3">
                 <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full border-b-[8px] border-b-slate-900">
                    <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-white relative shrink-0">
                       <div class="absolute left-8 bottom-0 w-32 h-1 bg-emerald-600 rounded-full"></div>
                       <div class="flex items-center gap-4">
                          <div class="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg"><i class="pi pi-money-bill text-xl"></i></div>
                          <div>
                            <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 font-bold">Rincian Jurnal Pendapatan</h4>
                            <p class="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest font-mono">Bill of Sales / Revenue Recognition Ledger</p>
                          </div>
                       </div>
                       <div class="flex items-center gap-3">
                           <Button v-if="!isReadonly" label="Sync dari SO/DO" icon="pi pi-download" size="small" class="h-10 px-6 rounded-xl bg-slate-100 border-none text-slate-600 text-[10px] font-black uppercase hover:bg-slate-200 transition-all font-bold" @click="openSync" />
                          <Button v-if="!isReadonly" label="Tambah Item Jasa" icon="pi pi-plus" size="small" class="h-10 px-6 rounded-xl bg-slate-900 border-none text-white text-[10px] font-black uppercase shadow-lg hover:scale-105 transition-all font-bold" @click="addLine" />
                       </div>
                    </div>

                    <div class="flex-1 overflow-x-auto custom-scrollbar">
                      <table class="w-full text-sm">
                        <thead class="bg-slate-50/50 text-left">
                          <tr>
                            <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 border-r">Accounted Sales Name / Description</th>
                            <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center w-32 border-r">Unit Qty</th>
                            <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right w-44 border-r">Tarif Net (@)</th>
                            <th class="px-6 py-5 text-[9px] font-black text-emerald-600 uppercase tracking-widest text-right w-56 bg-emerald-50/30">SUBTOTAL PIUTANG (Rp)</th>
                            <th v-if="!isReadonly" class="w-20"></th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                           <tr v-for="(line, idx) in form.lines" :key="idx" class="transition-all hover:bg-slate-50/30 group">
                              <td class="px-8 py-6 align-middle border-r">
                                 <div class="flex flex-col gap-2">
                                    <textarea :disabled="isReadonly" v-model="line.desc" rows="1" class="w-full text-[11px] font-black text-slate-800 bg-white border-none rounded-xl p-3 shadow-inner outline-none focus:ring-2 focus:ring-emerald-100 resize-none transition-all placeholder:italic leading-none" placeholder="Deskripsi item tagihan..." />
                                    <div class="flex gap-2" v-if="line.itemId">
                                      <span class="text-[8px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1 uppercase tracking-widest shadow-sm"><i class="pi pi-check-circle text-[7px]"></i> Accounted Revenue Record</span>
                                    </div>
                                 </div>
                              </td>
                              
                              <td class="px-6 py-6 align-middle text-center border-r bg-slate-50/30 h-full">
                                 <div class="flex flex-col items-center gap-1">
                                    <input :disabled="isReadonly" type="number" v-model.number="line.qty" class="w-24 h-11 border-none rounded-2xl px-2 text-center text-sm font-black text-slate-700 bg-white shadow-inner outline-none focus:ring-2 focus:ring-emerald-500 font-mono" placeholder="0" />
                                    <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 text-[9px] font-black uppercase text-center outline-none bg-transparent text-slate-400 border-b border-dashed border-slate-200 mt-1" placeholder="UOM" />
                                 </div>
                              </td>
                              
                              <td class="px-6 py-6 align-middle text-right border-r relative h-full">
                                 <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] text-slate-300 font-sans font-bold">Rp</span>
                                 <input :disabled="isReadonly" type="number" v-model.number="line.unitPrice" class="w-full h-11 border-none rounded-2xl px-3 text-right text-sm font-black text-slate-700 bg-slate-50/50 shadow-inner outline-none focus:ring-2 focus:ring-emerald-500 font-mono" placeholder="0" />
                              </td>
                              
                              <td class="px-6 py-6 align-middle bg-emerald-50/20 text-right h-full relative">
                                 <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-emerald-400 font-sans font-black">Rp</span>
                                 <div class="text-[17px] font-black font-mono tracking-tighter text-emerald-900 drop-shadow-sm pr-1">
                                    {{ formatCurrency(calculateLineTotal(line)) }}
                                 </div>
                                 <div v-if="line.discount > 0" class="text-[8px] font-black text-rose-500 mt-1 uppercase tracking-tighter">- Incl Discount: {{ formatCurrency(line.discount) }}</div>
                              </td>
                              
                              <td v-if="!isReadonly" class="px-6 py-6 align-middle text-center">
                                  <button @click="removeLine(idx)" class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black hover:bg-rose-600 hover:text-white transition-all shadow-sm">✕</button>
                              </td>
                           </tr>
                           <tr v-if="form.lines.length === 0">
                              <td :colspan="isReadonly ? 4 : 5" class="py-24 text-center">
                                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] italic">Tidak ada rincian pembiayaan dalam faktur ini.</div>
                              </td>
                           </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- Gross Total Bar -->
                    <div class="p-10 border-t border-slate-100 bg-slate-900 shrink-0 flex flex-col md:flex-row justify-between items-center gap-8 rounded-b-[1.5rem] relative overflow-hidden">
                       <div class="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center rotate-12">
                          <i class="pi pi-receipt text-[200px] text-white font-black"></i>
                       </div>
                       <div class="z-10 text-left">
                          <div class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-2">Total Nilai Faktur (Piutang AR)</div>
                          <div class="text-5xl font-black text-white tracking-tighter font-mono flex items-start leading-none group">
                             <span class="text-xl text-emerald-500 mr-3 mt-1 font-sans opacity-50">Rp</span>{{ formatCurrency(calcGross()) }}<span class="text-sm font-sans ml-3 mt-2 text-slate-400 uppercase tracking-widest">{{ form.status === 'CLOSED' ? 'LUNAS TERBAYAR' : 'TERUTANG KE KLIEN' }}</span>
                          </div>
                       </div>
                       <div class="z-10 hidden lg:block text-right">
                          <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest line-clamp-2 max-w-[200px] leading-tight lowercase">Audit trail akan mencatat validasi AR Ledger dari dokumen ini sebagai realisasi pendapatan sah.</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Dialog Footer Gates -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <Button label="Kembali ke Laci AR" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          
          <div class="flex items-center gap-4">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Sahkan Faktur & Posting Jurnal" severity="info" :loading="saving" :disabled="saving" @click="saveAction('APPROVED')" class="p-button-rounded h-14 px-12 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-check-circle" />
             <Button v-else-if="isReadonly && canManage && form.status === 'APPROVED'" label="Verifikasi Pelunasan Kas" severity="success" :loading="saving" :disabled="saving" @click="saveAction('CLOSED')" class="p-button-rounded h-14 px-12 bg-slate-900 border-none text-white hover:text-emerald-400 font-black text-[10px] uppercase shadow-2xl hover:scale-105 transition-all" icon="pi pi-credit-card" />
             <Button v-else-if="!isReadonly" label="Simpan Konsep Faktur" severity="info" @click="saveAction('DRAFT')" class="p-button-rounded h-14 px-14 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-save" />
          </div>
        </div>
      </div>
    </div>
    <!-- Sync Select Dialog -->
    <Dialog v-model:visible="syncDialogOpen" header="Select Billable Delivery Order" :modal="true" class="w-[600px] border-none shadow-2xl rounded-xl">
       <template #header>
          <div class="flex items-center gap-3">
             <i class="pi pi-download text-emerald-500 text-xl"></i>
             <div>
                <h3 class="font-black text-slate-900 text-sm uppercase tracking-widest leading-none">Sync dari DO</h3>
                <p class="text-[10px] text-slate-500 font-medium mt-1">Pilih pengiriman yang sudah selesai untuk ditagih.</p>
             </div>
          </div>
       </template>
       <div class="space-y-4 pt-4 max-h-[400px] overflow-y-auto custom-scrollbar">
          <div v-if="loadingDos" class="py-12 text-center">
             <i class="pi pi-spinner pi-spin text-2xl text-emerald-500 opacity-20"></i>
          </div>
          <div v-else-if="billableDos.length === 0" class="py-12 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest italic">
             No billable delivery orders found.
          </div>
          <div v-for="d in billableDos" :key="d.id" class="p-4 rounded-xl border border-slate-100 hover:bg-emerald-50 cursor-pointer transition-all group" @click="applySync(d)">
             <div class="flex justify-between items-start">
                <div>
                   <div class="text-[11px] font-black text-slate-900 uppercase group-hover:text-emerald-700">{{ d.code }}</div>
                   <div class="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{{ d.customer?.name }}</div>
                </div>
                <div class="text-right">
                   <div class="text-[9px] font-black text-emerald-600">{{ formatDate(d.actualDeliveredAt || d.createdAt) }}</div>
                   <div class="text-[8px] font-bold text-slate-400 uppercase mt-0.5">{{ d.items?.length || 0 }} Items</div>
                </div>
             </div>
          </div>
       </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const auth = useAuthStore();
const toast = useToast();

const canManage = computed(() => auth.hasPermission('sales.invoice.manage') || true); 

const docs = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const syncDialogOpen = ref(false);
const isReadonly = ref(true);
const activeDoc = ref<any>(null);
const billableDos = ref<any[]>([]);
const loadingDos = ref(false);

const form = reactive({
  id: '',
  code: '',
  customerId: '',
  orderId: '',
  invoiceDate: '',
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

const formatDate = (iso: string, addDays: number = 0) => {
  if (!iso) return '-';
  const d = new Date(iso);
  if(addDays) d.setDate(d.getDate() + addDays);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const isOverdue = (dateIso: string, status: string) => {
    if(status === 'CLOSED' || status === 'VOID') return false;
    if(!dateIso) return false;
    const d = new Date(dateIso);
    d.setDate(d.getDate() + 30); // 30 days due
    return new Date() > d;
}

const formatCurrency = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const calculateLineTotal = (line: any) => (Number(line.qty||0) * Number(line.unitPrice||0)) - (Number(line.discount||0) * Number(line.qty||0));
const calcGross = () => form.lines.reduce((a,c) => a + calculateLineTotal(c), 0);

const calculateGrandTotal = (doc: any) => {
    if(!doc.items) return 0;
    return doc.items.reduce((acc: number, cur: any) => acc + calculateLineTotal(cur), 0);
}

const statusMapper = (s: string) => {
    if(s === 'SUBMITTED' || s === 'APPROVED') return 'PIUTANG DIREKAM (UNPAID)';
    if(s === 'CLOSED') return 'TAGIHAN TERLUNASI (PAID)';
    if(s === 'DRAFT') return 'VERIFIKASI FINANCE';
    if(s === 'VOID') return 'INVOICE DIBATALKAN';
    return s;
}

const statusBadgeClasses = (s: string) => {
    if(s === 'CLOSED') return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
    if(s === 'DRAFT') return 'bg-slate-50 text-slate-400 border border-slate-200';
    if(s === 'SUBMITTED' || s === 'APPROVED') return 'bg-amber-50 text-amber-600 border border-amber-100';
    if(s === 'VOID') return 'bg-rose-50 text-rose-500 border border-rose-100 opacity-50';
    return 'bg-blue-50 text-blue-600 border border-blue-100';
};

const statusColor = (s: string) => {
    if(s === 'CLOSED') return '#10b981';
    if(s === 'DRAFT') return '#94a3b8';
    if(s === 'VOID') return '#f43f5e';
    return '#f59e0b';
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=SalesInvoice&include=customer,order,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "INV-202604-001", status: "APPROVED", invoiceDate: "2026-04-16T00:00", notes: "Jatuh tempo 30 hari EOM.",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        order: { code: 'SO-202604-001' },
        items: [
           { itemId: 'wms-key', desc: 'Kopi Bubuk Arabica Premium 250g (Partial Deliver)', qty: 250, unitPrice: 115000, discount: 0, uomCode: 'PCS' }
        ]
      },
      { 
        id: '2', code: "INV-202604-002", status: "DRAFT", invoiceDate: "2026-04-20T00:00",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { itemId: null, desc: 'Sewa Mesin Espresso Ad-hoc Event', qty: 1, unitPrice: 1500000, discount: 50000, uomCode: 'DAY' }
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
  form.code = 'INV-NEW';
  form.customerId = mockCustomers.value[0]?.id || '';
  form.orderId = '';
  form.invoiceDate = (new Date().toISOString().split('T')[0]) || '';
  form.status = 'DRAFT';
  form.notes = 'Termin normal (30 hari). Mohon ditransfer ke Bank BCA Cab ERP kami.';
  form.lines = [{ itemId: 'wms-key', desc: "Kopi Arabica dari DO Penyerahan...", qty: 10, unitPrice: 120000, discount: 0, uomCode: 'PCS' }];
  
  dialogOpen.value = true;
}

function pay(doc: any) {
   alert(`Integrasi Pembayaran (Cash Receipt): Mengarahkan bendahara ke Papan Penerimaan Kasir untuk mendebit tunai/transfer ke Piutang ${doc.code}.`);
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.customerId = r.customerId || mockCustomers.value[0]?.id || '';
  form.orderId = r.orderId || '';
  form.invoiceDate = r.invoiceDate?.split('T')[0] || '';
  form.notes = r.notes || '';
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

function addLine() {
   form.lines.push({ itemId: null, desc: "", qty: 1, unitPrice: 0, discount: 0, uomCode: 'PCS' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function saveAction(targetStatus: string) {
  if (form.lines.length === 0) {
    toast.add({ severity: 'warn', summary: 'Gagal', detail: 'Minimal harus ada 1 item tagihan.' });
    return;
  }

  saving.value = true;
  try {
    // Prepare payload (convert numbers to strings for server validation)
    const payload = {
      ...form,
      items: form.lines.map(l => ({
        description: l.desc,
        qty: String(l.qty),
        unitPrice: String(l.unitPrice),
        discount: String(l.discount || 0),
        uomCode: l.uomCode,
        itemId: l.itemId
      }))
    };

    let res;
    if (form.id) {
       res = await api.patch(`/sales/invoices/${form.id}`, payload);
    } else {
       res = await api.post('/sales/invoices', payload);
    }

    const invId = res.data?.invoice?.id || form.id;

    // Handle Posting (Submit to Finance)
    if (targetStatus === 'APPROVED' || targetStatus === 'SUBMITTED') {
       const submitRes = await api.post(`/sales/invoices/${invId}/submit`);
       const journalNo = submitRes.data?.invoice?.journalNo || 'Audit Entry Generated';
       toast.add({ 
          severity: 'success', 
          summary: 'Invoice Ter-Posting', 
          detail: `Jurnal Akuntansi ${journalNo} telah dicatat ke Buku Besar.` 
       });
    } else {
       toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Draft invoice telah disimpan.' });
    }

    dialogOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Simpan/Posting', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function openSync() {
  loadingDos.value = true;
  syncDialogOpen.value = true;
  try {
     const res = await api.get('/sales/invoices/billable-dos');
     billableDos.value = res.data?.deliveryOrders || [];
  } catch (e: any) {
     toast.add({ severity: 'error', summary: 'Gagal', detail: 'Could not load delivered orders.' });
  } finally {
     loadingDos.value = false;
  }
}

function applySync(doDoc: any) {
   form.customerId = doDoc.customerId;
   form.orderId = doDoc.salesOrderId || doDoc.orderId || '';
   form.notes = `Berdasarkan DO: ${doDoc.code}. Tanggal kirim: ${formatDate(doDoc.actualShipDate)}.`;
   
   if (doDoc.items && doDoc.items.length > 0) {
      form.lines = doDoc.items.map((x: any) => ({
         itemId: x.itemId,
         desc: x.description,
         qty: Number(x.shippedQty || x.qty),
         unitPrice: Number(x.unitPrice || 0),
         discount: 0,
         uomCode: x.uomCode
      }));
   }
   
   syncDialogOpen.value = false;
   toast.add({ severity: 'info', summary: 'Sync Berhasil', detail: `Data dari ${doDoc.code} telah ditarik.` });
}

onMounted(() => {
  load();
});
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
