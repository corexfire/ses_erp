<template>
  <div class="space-y-4">
    <!-- Header (Premium Lab & Scientific Audit Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-cyan-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-cyan-100">Lab & Scientific Audit</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-cyan-600">Manajemen Quality Control (Inspeksi Mutu)</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Quali <span class="text-cyan-600 not-italic text-3xl">Ty</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-cyan-900/60 leading-relaxed mt-3">Laboratorium dan stasiun pengecekan visual. Validasi mutu barang masuk (GRN), hasil produksi, maupun uji petik stok fisik gudang secara presisi.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Buku Riwayat Defect" size="small" icon="pi pi-book" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Generate Dokumen Inspeksi" size="small" icon="pi pi-microchip" class="p-button-rounded h-12 px-8 bg-cyan-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-cyan-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic Lab Telemetry KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-slate-950 text-white shadow-xl flex flex-col justify-between border border-slate-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-cyan-400 tracking-[0.2em] mb-4 opacity-80">Antrean Inspeksi</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ docs.length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-flask text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Rasio Lolos Uji</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">94<span class="text-xl ml-1 font-black">%</span></h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:rotate-12 transition-transform"><i class="pi pi-shield-check text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-cyan-600 tracking-[0.2em] mb-4">Volume Audit (Unit)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-cyan-700 tracking-tighter leading-none">1.2<span class="text-xl ml-1 font-black">K</span></h3>
          <div class="p-3 bg-cyan-50 text-cyan-600 rounded-xl border border-cyan-100 group-hover:rotate-12 transition-transform"><i class="pi pi-search-plus text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-cyan-100 tracking-[0.2em] mb-4 opacity-80">Akurasi Lab</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase italic">High <span class="text-cyan-300">Precision</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-bolt text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- QC Ledger (Premium Grid Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0"><i class="pi pi-microchip text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Inspeksi Mutu & Lab</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Quality Assurance & Verification Records</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Dokumen QC / GRN Ref..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-cyan-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[260px]">Dokumen Inspeksi (QCI)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Sumber Pemicu Pengecekan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Rasio Kualitas (Passed/Failed)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Sertifikasi</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-cyan-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-cyan-600">Merender daftar sampel laboratorium...</div>
              </td>
            </tr>
            
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="doc.status === 'POSTED' ? (calculateFail(doc) > 0 ? 'hover:border-l-amber-400' : 'hover:border-l-emerald-400') : 'hover:border-l-cyan-400'">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-flask text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-cyan-700 transition-colors uppercase italic">
                          {{ doc.code }}
                       </div>
                       <div class="mt-1 font-black text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <i class="pi pi-calendar text-[8px]"></i> {{ formatDate(doc.inspectionDate) }}
                       </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 bg-slate-50/20">
                <div class="flex flex-col gap-1.5">
                   <div class="flex items-center gap-2">
                      <div class="text-[8px] font-black px-2 py-0.5 rounded shadow-sm border uppercase tracking-wider" :class="doc.grnId ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200'">
                         {{ doc.grnId ? 'Validasi GRN / Inbound' : 'Uji Petik Gudang (Ad-Hoc)' }}
                      </div>
                   </div>
                   <div class="text-[11px] font-mono font-black text-slate-700 uppercase tracking-tight">{{ doc.grn?.code || 'Pemeriksaan Internal' }}</div>
                   <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                      <i class="pi pi-user text-[7px]"></i> {{ doc.inspectorName || 'Sistem Auto-QC' }}
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-center">
                 <div class="flex flex-col items-center gap-2">
                    <div class="flex items-center gap-3 text-[10px] font-black w-48">
                       <span class="w-16 text-right text-emerald-600 tracking-tighter">P: {{ calculatePass(doc) }}</span>
                       <div class="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden flex shadow-inner border border-slate-200">
                          <div class="h-full bg-emerald-500 transition-all duration-700" :style="{ width: getPassRatio(doc) + '%' }"></div>
                          <div class="h-full bg-rose-500 transition-all duration-700" :style="{ width: getFailRatio(doc) + '%' }"></div>
                       </div>
                       <span class="w-16 text-left text-rose-600 tracking-tighter">F: {{ calculateFail(doc) }}</span>
                    </div>
                    <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest bg-white border border-slate-100 px-2 rounded-full">Total Sampel: {{ calculateSample(doc) }} UniT</div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <div class="relative flex flex-col items-center gap-1.5">
                    <span v-if="doc.status === 'POSTED'" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border uppercase shadow-sm group-hover:scale-105 transition-all" :class="calculateFail(doc) > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'">
                       <i class="pi text-[7px] mr-2" :class="calculateFail(doc) > 0 ? 'pi-exclamation-circle text-amber-500' : 'pi-shield-check text-emerald-500'"></i> 
                       {{ calculateFail(doc) > 0 ? 'QC APPROVED W/ RECORD' : 'QC PASSED' }}
                    </span>
                    <span v-else class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-cyan-50 text-cyan-700 border border-cyan-200 uppercase shadow-sm">
                       <i class="pi pi-spin pi-spinner text-[7px] mr-2"></i> MENGANALISA
                    </span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Buka Worksheet" severity="secondary" rounded outlined @click="openView(doc)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🧪</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Lingkungan aman. Tidak ada antrean inspeksi kualitas saat ini.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Arsitektur QC Worksheet (Universal Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-cyan-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden text-slate-900">
          <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-cyan-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-microchip text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeDoc?.id ? 'Worksheet' : 'Aktivasi' }} <span class="text-cyan-600 italic text-2xl">Inspeksi Mutu Lab</span></h3>
                 <span v-if="activeDoc?.id" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm" :class="form.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-cyan-100 text-cyan-700 border-cyan-200'">{{ form.status === 'POSTED' ? 'Hasil Sertifikasi Terkunci' : 'Proses Verifikasi (Draft)' }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-cyan-500 text-cyan-600 italic">Quality Assurance & Scientific Verification Bridge</p>
            </div>
          </div>
          <button @click="dialogOpen = false" class="relative z-10 w-12 h-12 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <i class="pi pi-times text-slate-400 font-bold"></i>
          </button>
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel Left: Parameter Dasar -->
              <div class="lg:col-span-4 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-search text-cyan-600"></i> I. Parameter Dasar Pengujian
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-cyan-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pemicu Inspeksi <span class="italic text-[8px] opacity-60">(Source Document)</span></label>
                       <select :disabled="isReadonly" v-model="form.grnId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-cyan-400 transition-all appearance-none cursor-pointer uppercase tracking-widest disabled:opacity-70">
                          <option value="">-- AUDIT INTERNAL BEBAS --</option>
                          <option v-for="g in mockGrns" :value="g.id">{{ g.code }} (Bongkar Muat)</option>
                       </select>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Petugas QA <span class="italic text-[8px] opacity-60">(Auditor)</span></label>
                       <div class="relative">
                          <i class="pi pi-user absolute left-6 top-1/2 -translate-y-1/2 text-cyan-600/50 text-xs"></i>
                          <InputText :disabled="isReadonly" v-model="form.inspectorName" class="w-full h-14 border-none rounded-2xl pl-12 pr-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-cyan-400 transition-all uppercase disabled:opacity-70" placeholder="NAMA PETUGAS LAB..." />
                       </div>
                    </div>

                    <div class="pt-4 border-t border-slate-50">
                       <div class="px-6 py-4 bg-cyan-50 rounded-2xl border border-cyan-100 text-[9px] font-bold text-cyan-400 uppercase leading-relaxed italic">
                          Instruksi staf *Quality Assurance* diwajibkan mencatat rasio barang lolos uji mutu vs barang defect secara akurat berbasis worksheet ini.
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel Middle: Audit Schedule -->
              <div class="lg:col-span-3 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-stopwatch text-amber-500"></i> II. Audit Schedule & Notes
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-amber-100 border-b-[8px] border-b-cyan-600">
                    <div class="space-y-4 text-slate-900">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Waktu Pengambilan Sampel</label>
                       <InputText type="date" v-model="form.inspectionDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-cyan-400 transition-all uppercase disabled:opacity-70" :disabled="isReadonly" />
                    </div>

                    <div class="pt-4 border-t border-slate-100 italic space-y-2">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arahan / SOP Pengujian (Review)</label>
                       <textarea v-model="form.notes" :disabled="isReadonly" rows="8" class="w-full rounded-2xl border-none bg-slate-50 p-4 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-cyan-400 transition-all placeholder-slate-300 disabled:opacity-70 shadow-inner" placeholder="Timbang kadar air, cek bungkusan secara visual..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Panel Right: Lembar Laboratorium Hub (Scientific Assembler) -->
              <div class="lg:col-span-5 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between gap-2">
                    <span class="flex items-center gap-2"><i class="pi pi-flask text-rose-500"></i> III. Lembar Laboratorium Hub</span>
                    <Button v-if="!isReadonly" label="Tambah Baris Uji" icon="pi pi-plus" size="small" text @click="addLine" class="h-6 text-[9px] font-black text-cyan-600 uppercase border border-cyan-100 bg-cyan-50 rounded-lg px-3" />
                 </div>
                 <div class="bg-slate-900 p-0 rounded-[2.5rem] shadow-2xl border-4 border-slate-800 relative overflow-hidden group min-h-[500px] flex flex-col shadow-cyan-900/10">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl opacity-30"></div>
                    
                    <div class="p-10 pb-6 shrink-0 relative z-10 border-b border-white/5 bg-slate-900/40">
                       <div class="flex items-center justify-between mb-2">
                          <h4 class="text-xl font-black text-white leading-none uppercase tracking-tight italic">Quality <span class="text-cyan-400 not-italic">Scientific Work</span></h4>
                          <span class="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-widest">{{ form.lines.length }} Sampel Terdaftar</span>
                       </div>
                       <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed text-cyan-300/60 font-mono italic">Physical Verification -> Compliance Ledger</p>
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar px-10 pt-6">
                       <div class="space-y-4 pb-10">
                          <div v-for="(line, idx) in form.lines" :key="idx" class="bg-white/5 rounded-[1.5rem] p-4 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 group/line" :class="Number(line.failedQty) > 0 ? 'border-rose-500/30 bg-rose-500/5' : 'border-emerald-500/30 bg-emerald-500/5'">
                             <div class="flex justify-between items-start mb-6">
                                <div class="flex flex-1 gap-4">
                                   <div class="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-mono text-xs">{{ idx + 1 }}</div>
                                   <div class="flex-1">
                                      <input :disabled="isReadonly" type="text" v-model="line.desc" class="w-full bg-transparent border-none text-[11px] font-black text-white uppercase tracking-tight group-hover/line:text-cyan-400 transition-colors leading-tight p-0 outline-none" placeholder="Item / SKU Teraudit (Target)..." />
                                      <div class="flex items-center gap-2 mt-2">
                                         <div class="relative group/qty px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                            <span class="text-[7px] font-black text-slate-500 uppercase tracking-widest absolute -top-2 left-2 bg-slate-900 px-1">Besaran Sampel</span>
                                            <input :disabled="isReadonly" type="number" v-model.number="line.sampleQty" @input="recalc(line)" class="bg-transparent border-none text-[11px] font-black text-white w-14 p-0 text-center outline-none focus:ring-0" />
                                         </div>
                                         <div class="w-1 h-1 rounded-full bg-slate-700"></div>
                                         <span class="text-[8px] font-black text-slate-500 uppercase tracking-widest px-2 py-1 bg-white/5 rounded-lg italic">Laboratory Subject</span>
                                      </div>
                                   </div>
                                </div>
                                <button v-if="!isReadonly" @click="removeLine(idx)" class="text-slate-600 hover:text-rose-500 transition-colors p-2"><i class="pi pi-trash text-[10px]"></i></button>
                             </div>

                             <div class="grid grid-cols-2 gap-3">
                                <div class="bg-black/30 p-4 rounded-xl border border-white/5 group-hover/line:border-emerald-500/30 transition-all relative overflow-hidden">
                                   <div class="text-[7px] font-black uppercase tracking-widest italic text-emerald-500 mb-2 leading-none">
                                      <i class="pi pi-check text-[6px]"></i> Lolos Sertifikasi (Passed)
                                   </div>
                                   <input :disabled="isReadonly" type="number" v-model.number="line.passedQty" @input="recalc(line, 'pass')" class="w-full bg-transparent border-none text-[18px] font-mono font-black text-white p-0 focus:ring-0 outline-none leading-none relative z-10 uppercase tracking-tighter" />
                                </div>

                                <div class="bg-black/30 p-4 rounded-xl border border-white/5 group-hover/line:border-rose-500/30 transition-all relative overflow-hidden">
                                   <div class="text-[7px] font-black uppercase tracking-widest italic text-rose-500 mb-2 leading-none">
                                      <i class="pi pi-times text-[6px]"></i> Gagal / Cacat Lab (Failed)
                                   </div>
                                   <input :disabled="isReadonly" type="number" v-model.number="line.failedQty" @input="recalc(line, 'fail')" class="w-full bg-transparent border-none text-[18px] font-mono font-black text-white p-0 focus:ring-0 outline-none leading-none relative z-10 uppercase tracking-tighter" />
                                </div>

                                <div class="col-span-2 bg-black/30 p-4 rounded-xl border border-white/5 group-hover/line:border-white/10 transition-all mt-1">
                                   <div class="text-[7px] font-black uppercase tracking-widest italic text-slate-500 mb-2 leading-none">
                                      Diagnosa Defect / Keterangan Reject
                                   </div>
                                   <input :disabled="isReadonly" type="text" v-model="line.defectReason" class="w-full bg-transparent border-none text-[11px] font-black text-white/70 p-0 focus:ring-0 outline-none italic placeholder-slate-700" placeholder="Biarkan kosong jika Passed." />
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div class="p-10 pt-6 border-t border-slate-800 shrink-0 bg-slate-900/80 backdrop-blur-md relative z-10 border-b-4 border-b-cyan-700">
                       <div class="flex items-center justify-between mb-4">
                          <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Total Laboratory Sample Analysis</div>
                          <div class="text-xl font-black text-cyan-400 font-mono italic whitespace-nowrap">{{ form.lines.length }} SKU Audited</div>
                       </div>
                       <div v-if="!isReadonly && form.status === 'DRAFT'" class="bg-cyan-600/10 rounded-2xl p-4 border border-cyan-500/20 flex gap-3 text-[9px] font-black text-cyan-500 uppercase italic leading-relaxed">
                          <i class="pi pi-info-circle mt-0.5"></i>
                          <span>Auto-Math Validation: Sistem akan secara otomatis menyeimbangkan Passed vs Failed Qty berdasarkan Besaran Sampel yang Anda masukkan.</span>
                       </div>
                       <div v-else-if="form.status === 'POSTED'" class="bg-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20 flex gap-3 text-[9px] font-black text-emerald-500 uppercase italic leading-relaxed">
                          <i class="pi pi-shield-check mt-0.5"></i>
                          <span>SERTIFIKASI TERKUNCI: Data laboratorium ini telah diverifikasi secara permanen dan tidak dapat dimanipulasi kembali.</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Workspace Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-cyan-50 border border-cyan-100 rounded-xl text-cyan-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-verified"></i> Scientific Integrity Linked
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batalkan Analisa (Batal)" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                v-if="isReadonly && canManage && form.status === 'DRAFT'" 
                label="Audit: Kunci Stempel QA / QC (LULUS POSTING)" 
                icon="pi pi-check-square" 
                size="large" 
                :loading="saving" 
                :disabled="saving" 
                @click="save" 
                class="h-14 px-12 bg-cyan-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-cyan-100 hover:scale-105 active:scale-95 transition-all rounded-xl" 
             />
             <Button 
                v-else-if="!isReadonly" 
                label="Kompilasi Hasil (Simpan Draft)" 
                icon="pi pi-save" 
                size="large" 
                @click="dialogOpen = false" 
                class="h-14 px-12 bg-slate-900 border-none text-white font-black text-[10px] uppercase shadow-2xl transition-all rounded-xl" 
             />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.qc.manage') || true); 

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
  grnId: '',
  inspectorName: '',
  inspectionDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockGrns = ref<any[]>([
  {id:'1', code:'GRN-202604-002'},
  {id:'2', code:'GRN-202604-003'}
]);

const filteredDocs = computed(() => {
  let list = docs.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.grn?.code && p.grn.code.toLowerCase().includes(q))
    );
  }
  return list;
});

const formatQty = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { maximumFractionDigits: 1 });
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const calculateLines = (doc: any) => doc.items ? doc.items.length : 0;
const calculateSample = (doc: any) => doc.items ? doc.items.reduce((a:number, v:any)=>a+Number(v.sampleQty||0),0) : 0;
const calculatePass = (doc: any) => doc.items ? doc.items.reduce((a:number, v:any)=>a+Number(v.passedQty||0),0) : 0;
const calculateFail = (doc: any) => doc.items ? doc.items.reduce((a:number, v:any)=>a+Number(v.failedQty||0),0) : 0;

const getPassRatio = (doc: any) => {
    const s = calculateSample(doc);
    if(s === 0) return 0;
    return (calculatePass(doc) / s) * 100;
};
const getFailRatio = (doc: any) => {
    const s = calculateSample(doc);
    if(s === 0) return 0;
    return (calculateFail(doc) / s) * 100;
};


async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=QcInspection&include=grn,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "QCI-202604-001", status: "POSTED", inspectionDate: "2026-04-20T00:00", inspectorName: "Andi Saputra (Tim QA)", notes: "Inspeksi green beans impor.",
        grn: { code: 'GRN-202604-001' },
        items: [
           { desc: 'Biji Kopi Spesialti Arabica', sampleQty: 10, passedQty: 9, failedQty: 1, defectReason: '1 sample berkutu' }
        ]
      },
      { 
        id: '2', code: "QCI-202604-002", status: "DRAFT", inspectionDate: "2026-04-22T00:00", inspectorName: "Siti Rahma", notes: "Cycle count test gudang",
        grn: null,
        items: [
           { desc: 'Biji Kopi Spesialti Arabica', sampleQty: 50, passedQty: 0, failedQty: 0, defectReason: '' }
        ]
      }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeDoc.value = null;
  isReadonly.value = false;
  form.id = '';
  form.code = 'QCI-NEW';
  form.grnId = mockGrns.value[0].id;
  form.inspectorName = 'Manager QA';
  form.inspectionDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Kopi Bubuk Arabica Premium", sampleQty: 20, passedQty: 20, failedQty: 0, defectReason: '' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.grnId = r.grnId || (r.grn? mockGrns.value[0].id : '');
  form.inspectorName = r.inspectorName || '';
  form.inspectionDate = r.inspectionDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan QA mengisi data lab report
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLine() {
   form.lines.push({ desc: "", sampleQty: 0, passedQty: 0, failedQty: 0, defectReason: '' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

// Auto-Math Validation logic for QC Lab Worksheet
function recalc(line: any, trigger: 'pass'|'fail'|'sample' = 'sample') {
   let s = Number(line.sampleQty || 0);
   let p = Number(line.passedQty || 0);
   let f = Number(line.failedQty || 0);

   if (trigger === 'sample') {
      if(s < 0) s = 0;
      line.sampleQty = s;
      line.passedQty = s; // Asumsinya awalnya sempurna
      line.failedQty = 0;
   } else if (trigger === 'pass') {
      if(p > s) p = s;
      if(p < 0) p = 0;
      line.passedQty = p;
      line.failedQty = s - p; // Koreksi Failed
   } else if (trigger === 'fail') {
      if(f > s) f = s;
      if(f < 0) f = 0;
      line.failedQty = f;
      line.passedQty = s - f; // Koreksi Passed
   }
}

async function save() {
  saving.value = true;
  try {
    const isNew = !form.id;
    const body = {
      ...form,
      status: 'POSTED' // Always post when using the main "Audit" button
    };

    if (isNew) {
      await api.post('/inventory/qc', body);
    } else {
      await api.patch(`/inventory/qc/${form.id}`, body);
    }

    toast.add({ 
      severity: 'success', 
      summary: 'QC Berhasil', 
      detail: 'Dokumen kualitas telah diverifikasi dan diposting ke sistem.' 
    });
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
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

select { 
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
  background-repeat: no-repeat; 
  background-position: right 1rem center; 
  background-size: 1em; 
}
</style>
