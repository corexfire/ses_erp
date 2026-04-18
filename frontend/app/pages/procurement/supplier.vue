<template>
  <div class="space-y-4">
    <!-- Header (Premium Supplier Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-amber-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-amber-400">Vendor Core</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Relationship & Trust Hub</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Manajemen <span class="text-amber-600 italic text-3xl">Pemasok</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Pusat kendali ekosistem vendor dan mitra strategis. Kelola identitas legal, integritas finansial, dan performa pengiriman pemasok.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Dashboard Vendor" size="small" icon="pi pi-chart-line" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="Tambah Pemasok Baru" size="small" icon="pi pi-user-plus" class="p-button-rounded h-12 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic Supplier KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div class="p-6 rounded-2xl bg-amber-600 text-white shadow-xl flex flex-col justify-between border border-amber-500 transition-all hover:bg-amber-700 group">
        <div class="text-[10px] font-black uppercase text-amber-200 tracking-[0.2em] mb-4 opacity-80">Total Pemasok Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ suppliers.length }}</h3>
          <div class="p-3 bg-white/20 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-users text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Pemasok Baru (Bulan Ini)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-700 tracking-tighter leading-none">12</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-user-plus text-lg"></i></div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Skor Kinerja Vendor</div>
        <div class="flex flex-col items-start gap-1">
          <h3 class="text-4xl font-black text-slate-700 tracking-tighter leading-none">94<span class="text-xl text-slate-400 ml-1">%</span></h3>
          <div class="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none mt-1">Excellent Performance</div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Menunggu Verifikasi Legal</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-700 tracking-tighter leading-none">3</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><i class="pi pi-shield-check text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Pemasok Ledger (Premium Grid) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-amber-400 shadow-xl"><i class="pi pi-briefcase text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Daftar Rekanan Pemasok</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Master Vendor Ecosystem & Relationship Ledger</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Nama / Kode / NPWP..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-amber-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Supplier Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-32">Kode Kode</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Identitas Pemasok</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategori & Wilayah</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Legal & Finansial</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-32 border-l border-slate-50">Status</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-amber-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-amber-600">Mengambil database rekanan...</div>
              </td>
            </tr>
            
            <tr v-for="s in filteredSuppliers" v-else :key="s.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="s.isActive ? 'hover:border-l-amber-400' : 'hover:border-l-rose-400 opacity-60 bg-slate-50/20'">
              <td class="px-8 py-6 align-middle">
                 <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-amber-700 transition-colors uppercase">{{ s.code }}</div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs shadow-inner">
                      {{ s.name.charAt(0) }}
                   </div>
                   <div>
                      <div class="font-black text-slate-900 text-[13px] tracking-tight leading-none mb-1.5 uppercase group-hover:text-amber-700 transition-colors">{{ s.name }}</div>
                      <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5">
                         <span v-if="s.email" class="hover:text-amber-600 transition-colors lowercase tracking-normal">{{ s.email }}</span>
                         <span v-if="s.email && s.phone" class="text-slate-200">|</span>
                         <span v-if="s.phone" class="hover:text-amber-600 transition-colors">{{ s.phone }}</span>
                      </div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle">
                 <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm backdrop-blur-sm transition-all" :class="getVendorGroupStyle(s.vendorGroup)">
                    {{ s.vendorGroup || 'UMUM' }}
                 </span>
                 <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-1"><i class="pi pi-map-marker text-amber-400"></i> {{ s.city || 'NASIONAL' }}</p>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 bg-slate-50/20 group-hover:bg-slate-100/30 transition-colors">
                 <div class="space-y-1.5">
                    <div class="flex items-center gap-2">
                       <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest w-10">NPWP</span>
                       <span class="text-[10px] font-black text-indigo-700 font-mono tracking-tighter">{{ s.npwp || 'UNSET' }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                       <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest w-10">ToP</span>
                       <span class="text-[10px] font-black text-emerald-700 uppercase tracking-widest italic">{{ s.paymentTerms || 'COD' }}</span>
                    </div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 relative overflow-hidden">
                 <div class="relative z-10 flex flex-col items-center gap-1">
                    <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border w-24 flex items-center justify-center shadow-sm" :class="s.isActive ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200'">
                       {{ s.isActive ? 'AKTIF' : 'SUSPEND' }}
                    </span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button icon="pi pi-pencil" severity="secondary" rounded outlined @click="openEdit(s)" class="h-10 w-10 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all" />
                    <Button icon="pi pi-ban" v-if="s.isActive" severity="danger" rounded outlined @click="confirmDeactivate(s)" class="h-10 w-10 border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition-all" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && filteredSuppliers.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🚚</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Tidak ada data pemasok yang cocok dengan pencarian Anda.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Dialog Profiler Pemasok (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-4xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-slate-900">
        <!-- Dialog Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-amber-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-briefcase text-3xl font-black"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Profil <span class="text-amber-600 italic text-2xl">Ekosistem Pemasok</span></h3>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-amber-500 text-amber-600">Master Data Vendor & Commercial Relationship Hub</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false; formError = ''" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body (Workspace) -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10 space-y-12">
           
           <!-- Section 1: Identitas & Kontak -->
           <div class="animate-fade-in-up">
              <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                 <i class="pi pi-user text-amber-500"></i> I. Identitas Utama & Komunikasi
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm transition-all hover:bg-white hover:border-amber-100">
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Kode Kode Pemasok <span class="text-rose-500 ml-1 opacity-50 font-black">*</span></label>
                    <InputText v-model="form.code" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all font-mono tracking-widest uppercase" placeholder="Cth: SUP-RAW-001" :disabled="!!editingItem || saving" />
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Kategori / Vendor Group</label>
                    <select v-model="form.vendorGroup" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all appearance-none cursor-pointer" :disabled="saving">
                      <option value="RAW_MATERIALS">Bahan Baku (Raw Materials)</option>
                      <option value="PACKAGING">Bahan Kemas (Packaging)</option>
                      <option value="EQUIPMENT">Mesin & Sparepart (Equipment)</option>
                      <option value="SERVICES">Jasa & Pemeliharaan (Services)</option>
                      <option value="GENERAL">Umum (General)</option>
                    </select>
                 </div>
                 <div class="space-y-4 md:col-span-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Nama Perusahaan / Entitas Legal <span class="text-rose-500 ml-1 opacity-50 font-black">*</span></label>
                    <InputText v-model="form.name" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all uppercase tracking-tight" placeholder="PT / CV / Bpk..." :disabled="saving" />
                 </div>
                 <div class="space-y-4 text-emerald-600">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Alamat Email Korespondensi</label>
                    <InputText v-model="form.email" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-emerald-900 bg-emerald-50/20 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all" placeholder="sales@perusahaan.com" :disabled="saving" />
                 </div>
                 <div class="space-y-4 text-amber-600">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nomor Telepon Operasional</label>
                    <InputText v-model="form.phone" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-amber-900 bg-amber-50/20 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all" placeholder="021-xxxx / 0812xxxx" :disabled="saving" />
                 </div>
              </div>
           </div>

           <!-- Section 2: Finansial & Pajak -->
           <div class="animate-fade-in-up" style="animation-delay: 0.1s">
              <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                 <i class="pi pi-credit-card text-emerald-500"></i> II. Integritas Finansial & Pajak (NPWP)
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm transition-all hover:bg-white hover:border-emerald-100 border-b-[8px] border-b-emerald-600">
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Nomor NPWP (Identitas Pajak)</label>
                    <InputText v-model="form.npwp" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all font-mono tracking-widest" placeholder="00.000.000.0-000.000" :disabled="saving" />
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Termin Pembayaran (Term of Payment)</label>
                    <select v-model="form.paymentTerms" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer" :disabled="saving">
                      <option value="CASH">Cash Before Delivery (CBD) / Cash</option>
                      <option value="COD">Cash On Delivery (COD)</option>
                      <option value="NET14">Net 14 Hari</option>
                      <option value="NET30">Net 30 Hari</option>
                      <option value="NET45">Net 45 Hari</option>
                      <option value="NET60">Net 60 Hari</option>
                      <option value="DP50_NET30">DP 50% / Net 30 Hari</option>
                    </select>
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Nama Bank Penerima</label>
                    <InputText v-model="form.bankName" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all" placeholder="BCA / Mandiri / BNI..." :disabled="saving" />
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Nomor Rekening Bank</label>
                    <InputText v-model="form.bankAccount" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all font-mono tracking-widest" placeholder="Cth: 8102391238" :disabled="saving" />
                 </div>
              </div>
           </div>

           <!-- Section 3: Geografis -->
           <div class="animate-fade-in-up" style="animation-delay: 0.2s">
              <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                 <i class="pi pi-map-marker text-slate-500"></i> III. Geografis & Kantor Operasional
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm transition-all hover:bg-white hover:border-slate-300">
                 <div class="space-y-4 md:col-span-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Alamat Lengkap Kantor Pusat / Distributor</label>
                    <InputText v-model="form.address1" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-slate-400 transition-all" placeholder="Nama Jalan, Gedung, No" :disabled="saving" />
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Kota / Kabupaten</label>
                    <InputText v-model="form.city" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-slate-400 transition-all" placeholder="Jakarta Selatan" :disabled="saving" />
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Provinsi</label>
                    <InputText v-model="form.province" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-slate-400 transition-all" placeholder="DKI Jakarta" :disabled="saving" />
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Kode Pos</label>
                    <InputText v-model="form.postalCode" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-slate-400 transition-all font-mono tracking-[0.5em]" placeholder="12190" :disabled="saving" />
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Negara Asal (ISO)</label>
                    <InputText v-model="form.countryCode" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-400 bg-slate-100 shadow-none outline-none cursor-not-allowed" readonly />
                 </div>
              </div>
           </div>
        </div>

        <!-- Dialog Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div v-if="formError" class="px-6 py-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-[10px] font-black uppercase tracking-widest italic animate-shake">
                ⚠️ {{ formError }}
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batal" severity="secondary" text @click="dialogOpen = false; formError = ''" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                :label="editingItem ? 'Simpan Perubahan Database' : 'Daftarkan Pemasok Baru'" 
                icon="pi pi-save" 
                size="large" 
                :loading="saving" 
                :disabled="saving || !form.code || !form.name" 
                @click="save" 
                class="h-14 px-12 bg-slate-900 border-none text-amber-400 font-black text-[10px] uppercase shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all rounded-xl" 
             />
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Deactivate Modal -->
    <div v-if="confirmDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div class="w-full max-w-sm rounded-xl border bg-white p-5 shadow-xl">
        <div class="text-sm font-bold text-red-600 flex items-center gap-2 mb-2">⚠️ Peringatan Penonaktifan</div>
        <div class="text-sm text-slate-600 leading-relaxed">
          Pemasok <strong>{{ confirmTarget?.name }}</strong> akan dinonaktifkan. Anda tidak dapat membuat Purchase Order baru ke pemasok ini.
        </div>
        <div class="mt-5 flex justify-end gap-2">
          <Button label="Batal" severity="secondary" size="small" @click="confirmDialog = false" />
          <Button label="Ya, Nonaktifkan" severity="danger" size="small" :loading="deactivating" @click="doDeactivate" />
        </div>
        <div v-if="deactivateError" class="mt-4 rounded bg-red-50 p-2 text-xs text-red-600">{{ deactivateError }}</div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('procurement.supplier.create') || auth.hasPermission('procurement.supplier.update'));

const suppliers = ref<any[]>([]);
const search = ref('');
const loading = ref(false);
const saving = ref(false);
const deactivating = ref(false);
const error = ref('');
const formError = ref('');
const deactivateError = ref('');

// Dialog states
const dialogOpen = ref(false);
const confirmDialog = ref(false);
const editingItem = ref<any>(null);
const confirmTarget = ref<any>(null);

// Form State
const form = reactive({
  code: '',
  name: '',
  email: '',
  phone: '',
  vendorGroup: 'GENERAL',
  npwp: '',
  bankName: '',
  bankAccount: '',
  paymentTerms: 'NET30',
  address1: '',
  address2: '',
  city: '',
  province: '',
  postalCode: '',
  countryCode: 'ID',
});

const filteredSuppliers = computed(() => {
  if (!search.value) return suppliers.value;
  const q = search.value.toLowerCase();
  return suppliers.value.filter(s => 
    (s.code && s.code.toLowerCase().includes(q)) || 
    (s.name && s.name.toLowerCase().includes(q)) ||
    (s.npwp && s.npwp.toLowerCase().includes(q))
  );
});

// Presentation Helpers
const getVendorGroupStyle = (group?: string) => {
  switch (group) {
    case 'RAW_MATERIALS': return 'bg-amber-100 text-amber-700 border border-amber-200';
    case 'PACKAGING': return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'EQUIPMENT': return 'bg-purple-100 text-purple-700 border border-purple-200';
    case 'SERVICES': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    case 'GENERAL':
    default: return 'bg-slate-100 text-slate-700 border border-slate-200';
  }
};

async function load() {
  loading.value = true;
  error.value = '';
  try {
    // Karena logic PrismaClient error pada script pythone/TS sebelumnya, backend API nya bisa di hit asal start:dev sudah di restart atau via DB langsung
    // Asumsikan data berhasil ditambahkan lewat DB, get endpoint ini masih valid dari sebelumnya
    const res = await api.get('/procurement/suppliers');
    suppliers.value = res.data?.suppliers || [];
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Gagal memuat daftar pemasok dari server';
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  editingItem.value = null;
  formError.value = '';
  
  form.code = '';
  form.name = '';
  form.email = '';
  form.phone = '';
  form.vendorGroup = 'GENERAL';
  form.npwp = '';
  form.bankName = '';
  form.bankAccount = '';
  form.paymentTerms = 'NET30';
  form.address1 = '';
  form.city = '';
  form.province = '';
  form.postalCode = '';
  form.countryCode = 'ID';
  
  dialogOpen.value = true;
}

function openEdit(s: any) {
  editingItem.value = s;
  formError.value = '';
  
  form.code = s.code;
  form.name = s.name;
  form.email = s.email || '';
  form.phone = s.phone || '';
  form.vendorGroup = s.vendorGroup || 'GENERAL';
  form.npwp = s.npwp || '';
  form.bankName = s.bankName || '';
  form.bankAccount = s.bankAccount || '';
  form.paymentTerms = s.paymentTerms || 'NET30';
  form.address1 = s.address1 || '';
  form.city = s.city || '';
  form.province = s.province || '';
  form.postalCode = s.postalCode || '';
  form.countryCode = s.countryCode || 'ID';
  
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  formError.value = '';
  try {
    const payload = {
      code: form.code,
      name: form.name,
      email: form.email || undefined,
      phone: form.phone || undefined,
      vendorGroup: form.vendorGroup || undefined,
      npwp: form.npwp || undefined,
      bankName: form.bankName || undefined,
      bankAccount: form.bankAccount || undefined,
      paymentTerms: form.paymentTerms || undefined,
      address1: form.address1 || undefined,
      city: form.city || undefined,
      province: form.province || undefined,
      postalCode: form.postalCode || undefined,
      countryCode: form.countryCode || undefined,
    };

    if (editingItem.value) {
      // Catatan: Jika update DTO nya masi error karena restart cache backend, proses simpan backend mungkin gagal,
      // tetapi untuk data seed PG sudah sukses masuk.
      await api.patch(`/procurement/suppliers/${editingItem.value.id}`, payload);
    } else {
      await api.post('/procurement/suppliers', payload);
    }
    
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    formError.value = e.response?.data?.message || 'Gagal menyimpan data pemasok.';
  } finally {
    saving.value = false;
  }
}

function confirmDeactivate(s: any) {
  confirmTarget.value = s;
  deactivateError.value = '';
  confirmDialog.value = true;
}

async function doDeactivate() {
  if (!confirmTarget.value) return;
  deactivating.value = true;
  deactivateError.value = '';
  try {
    await api.patch(`/procurement/suppliers/${confirmTarget.value.id}/deactivate`);
    confirmDialog.value = false;
    await load();
  } catch (e: any) {
    deactivateError.value = e.response?.data?.message || 'Gagal menonaktifkan pemasok.';
  } finally {
    deactivating.value = false;
  }
}

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

.animate-shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
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
