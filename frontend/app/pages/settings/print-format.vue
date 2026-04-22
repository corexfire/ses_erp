<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-purple-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Settings & Tools</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-purple-600 uppercase tracking-widest">Print Format Designer</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Print Format <span class="text-purple-600 not-italic text-3xl">Designer</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3">Desain dan kelola template cetak PDF untuk invoice, PO, quotation, payslip, dan semua dokumen transaksi ERP.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Import Template" size="small" icon="pi pi-upload" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase" @click="toast.add({severity:'info',summary:'Import',detail:'Fitur import template segera tersedia.',life:3000})" />
          <Button label="+ Buat Template Baru" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-purple-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-purple-100 hover:scale-105 active:scale-95 transition-all" @click="openCreate(activeTab)" />
        </div>
      </div>

      <!-- Tab Switcher -->
      <div class="flex gap-1 p-1 bg-slate-100 rounded-2xl w-fit mt-8">
        <button @click="activeTab = 'DOCUMENT'" :class="['px-8 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2', activeTab === 'DOCUMENT' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:bg-white/50']">
          <i class="pi pi-file"></i> Dokumen
        </button>
        <button @click="activeTab = 'TAG'" :class="['px-8 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2', activeTab === 'TAG' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:bg-white/50']">
          <i class="pi pi-tag"></i> Label & Tag
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-purple-950 text-white shadow-xl flex flex-col justify-between border border-purple-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-purple-400 tracking-[0.2em] mb-4 opacity-80">Total Template</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ templates.length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform"><i class="pi pi-print text-lg"></i></div>
        </div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ templates.filter(t => t.status === 'ACTIVE').length }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Jenis Dokumen</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-indigo-700 tracking-tighter leading-none">{{ [...new Set(templates.map(t => t.docType))].length }}</h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><i class="pi pi-file text-lg"></i></div>
        </div>
      </div>
      <div class="p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-purple-100 tracking-[0.2em] mb-4">Total Tercetak</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl font-black text-white tracking-tighter leading-none">{{ templates.reduce((s,t) => s + t.usageCount, 0).toLocaleString('id-ID') }}</h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-file-pdf text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Filter & Search -->
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
        <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
        <input v-model="search" placeholder="Cari template..." class="border-none bg-transparent text-[11px] h-9 w-52 font-black focus:outline-none" />
      </div>
      <div class="flex gap-2">
        <button v-for="f in ['Semua', 'SALES', 'PROCUREMENT', 'FINANCE', 'HRIS', 'MANUFACTURING', 'TAX']" :key="f"
          @click="activeFilter = f"
          :class="['px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all', activeFilter === f ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200' : 'bg-white text-slate-500 border-slate-200 hover:border-purple-300']">
          {{ f }}
        </button>
      </div>
      <div class="ml-auto flex gap-2">
        <button @click="viewMode = 'grid'" :class="['w-10 h-10 rounded-xl border transition-all flex items-center justify-center', viewMode === 'grid' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-400 border-slate-200']"><i class="pi pi-th-large text-sm"></i></button>
        <button @click="viewMode = 'list'" :class="['w-10 h-10 rounded-xl border transition-all flex items-center justify-center', viewMode === 'list' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-400 border-slate-200']"><i class="pi pi-list text-sm"></i></button>
      </div>
    </div>

    <!-- GRID VIEW -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="t in filteredTemplates" :key="t.id"
        class="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
        <!-- Document Thumbnail Preview -->
        <div class="relative h-52 overflow-hidden cursor-pointer" @click="openPreview(t)">
          <div :class="['absolute inset-0 flex items-center justify-center', t.previewBg]">
            <!-- Mini document simulation -->
            <div v-if="t.formatType === 'DOCUMENT'" class="w-28 h-36 bg-white rounded shadow-xl border border-slate-200 p-2.5 transform group-hover:scale-105 transition-transform relative overflow-hidden"
              :style="`border-top: 3px solid ${t.accentColor}`">
              <!-- Header -->
              <div class="flex items-center gap-1 mb-2">
                <div :style="`background:${t.accentColor}`" class="w-4 h-4 rounded-sm"></div>
                <div class="flex-1 space-y-0.5">
                  <div class="h-1 rounded-full bg-slate-200 w-full"></div>
                  <div class="h-0.5 rounded-full bg-slate-100 w-3/4"></div>
                </div>
              </div>
              <!-- Body lines -->
              <div class="space-y-0.5 mb-2">
                <div class="h-0.5 rounded-full bg-slate-200 w-full"></div>
                <div class="h-0.5 rounded-full bg-slate-100 w-3/4"></div>
                <div class="h-0.5 rounded-full bg-slate-200 w-5/6"></div>
              </div>
              <!-- Table sim -->
              <div class="border border-slate-100 rounded overflow-hidden divide-y divide-slate-100">
                <div v-for="r in 4" :key="r" class="flex gap-0.5 px-0.5 py-0.5">
                  <div class="h-0.5 rounded-full flex-1" :style="`background: ${r===1 ? t.accentColor+'40' : '#f1f5f9'}`"></div>
                  <div class="h-0.5 rounded-full w-6" :style="`background: ${r===1 ? t.accentColor+'40' : '#f1f5f9'}`"></div>
                </div>
              </div>
              <!-- Footer -->
              <div class="absolute bottom-1.5 left-2.5 right-2.5">
                <div class="h-0.5 rounded-full w-full" :style="`background:${t.accentColor}30`"></div>
              </div>
            </div>

            <!-- Mini tag simulation -->
            <div v-else class="w-40 h-24 bg-white rounded-lg shadow-xl border border-slate-200 p-3 transform group-hover:scale-105 transition-transform flex flex-col justify-between overflow-hidden">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="h-2 rounded bg-slate-800 w-full mb-1"></div>
                  <div class="h-1.5 rounded bg-slate-300 w-3/4"></div>
                </div>
                <div v-if="t.showLogo" class="w-6 h-6 rounded bg-slate-100 ml-2" :style="`border: 2px solid ${t.accentColor}`"></div>
              </div>
              
              <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                <div class="flex-1 space-y-1">
                  <div class="h-3 rounded" :style="`background:${t.accentColor}40`"></div>
                  <div class="h-1 rounded bg-slate-200 w-1/2"></div>
                </div>
                <div v-if="t.showBarcode" class="h-8 w-16 bg-white border border-slate-200 flex flex-col justify-between p-0.5">
                  <div v-for="i in 6" :key="i" class="h-0.5 bg-slate-900" :style="`width: ${Math.random() * 80 + 20}%`"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- Overlay actions -->
          <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
            <button @click.stop="openPreview(t)" class="px-4 py-2 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
              <i class="pi pi-eye text-purple-600"></i> Preview
            </button>
            <button @click.stop="openEdit(t)" class="px-4 py-2 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
              <i class="pi pi-pencil"></i> Edit
            </button>
          </div>
          <!-- Paper size badge -->
          <div class="absolute top-3 left-3">
            <span class="text-[8px] font-black px-2 py-1 rounded-lg bg-white/90 text-slate-600 border border-slate-200 uppercase">{{ t.paperSize }}</span>
          </div>
          <!-- Status badge -->
          <div class="absolute top-3 right-3">
            <span :class="['text-[8px] font-black px-2 py-1 rounded-lg uppercase', t.status === 'ACTIVE' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white']">{{ t.status }}</span>
          </div>
        </div>
        <!-- Card Body -->
        <div class="p-5">
          <div class="flex items-start justify-between mb-3">
            <div>
              <h3 class="text-[13px] font-black text-slate-900 leading-none">{{ t.name }}</h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase mt-1">{{ t.docType }}</p>
            </div>
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :style="`background:${t.accentColor}20; color:${t.accentColor}`">
              <i :class="t.icon" class="text-sm"></i>
            </div>
          </div>
          <!-- Meta info -->
          <div class="flex items-center gap-3 mb-4">
            <div v-if="t.formatType === 'DOCUMENT'" class="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
              <i class="pi pi-file text-[8px]"></i> {{ t.paperSize }} {{ t.orientation }}
            </div>
            <div v-else class="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
              <i class="pi pi-arrows-h text-[8px]"></i> {{ t.width }}x{{ t.height }}mm
            </div>
            <div class="w-1 h-1 rounded-full bg-slate-200"></div>
            <div class="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
              <i class="pi pi-chart-bar text-[8px]"></i> {{ t.usageCount.toLocaleString('id-ID') }}x
            </div>
          </div>
          <!-- Color palette -->
          <div class="flex items-center gap-2 mb-4">
            <div class="w-5 h-5 rounded-full border-2 border-white shadow-sm" :style="`background:${t.accentColor}`"></div>
            <div class="w-5 h-5 rounded-full border-2 border-white shadow-sm" :style="`background:${t.secondaryColor}`"></div>
            <div class="w-5 h-5 rounded-full border-2 border-white shadow-sm bg-slate-900"></div>
            <span class="text-[9px] font-bold text-slate-400 ml-1">{{ t.fontFamily }}</span>
          </div>
          <!-- Action buttons -->
          <div class="flex gap-2 pt-3 border-t border-slate-100">
            <button @click="openPreview(t)" class="flex-1 py-2 rounded-xl text-[10px] font-black uppercase bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
              <i class="pi pi-eye text-xs"></i> Preview
            </button>
            <button @click="openEdit(t)" class="flex-1 py-2 rounded-xl text-[10px] font-black uppercase bg-purple-600 text-white hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
              <i class="pi pi-pencil text-xs"></i> Edit
            </button>
            <button @click="duplicateTemplate(t)" class="w-9 py-2 rounded-xl text-[10px] font-black uppercase bg-white border border-slate-200 text-slate-500 hover:border-purple-300 hover:text-purple-600 transition-all flex items-center justify-center">
              <i class="pi pi-copy text-xs"></i>
            </button>
            <button @click="confirmDelete(t)" class="w-9 py-2 rounded-xl text-[10px] font-black uppercase bg-white border border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-600 transition-all flex items-center justify-center">
              <i class="pi pi-trash text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredTemplates.length === 0" class="col-span-3 py-24 text-center">
        <div class="text-6xl mb-4 opacity-10">🖨️</div>
        <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Tidak ada template ditemukan.</div>
      </div>
    </div>

    <!-- LIST VIEW -->
    <div v-if="viewMode === 'list'" class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden pb-20">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-left border-b border-slate-100">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Template</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-100">Modul</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-100">Format</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-100">Warna</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-100 text-right">Terpakai</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-100 text-center">Status</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-100 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="t in filteredTemplates" :key="t.id" class="hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-purple-400 transition-all">
              <td class="px-8 py-5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center" :style="`background:${t.accentColor}20; color:${t.accentColor}`"><i :class="t.icon"></i></div>
                  <div>
                    <p class="font-black text-[11px] text-slate-800">{{ t.name }}</p>
                    <p class="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{{ t.docType }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-5 border-l border-slate-50"><span class="text-[9px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded uppercase border border-indigo-200">{{ t.module }}</span></td>
              <td class="px-6 py-5 border-l border-slate-50"><span class="text-[10px] font-black text-slate-600">{{ t.paperSize }} · {{ t.orientation }} · {{ t.fontFamily }}</span></td>
              <td class="px-6 py-5 border-l border-slate-50">
                <div class="flex gap-1.5">
                  <div class="w-5 h-5 rounded-full border border-slate-200" :style="`background:${t.accentColor}`" :title="t.accentColor"></div>
                  <div class="w-5 h-5 rounded-full border border-slate-200" :style="`background:${t.secondaryColor}`" :title="t.secondaryColor"></div>
                </div>
              </td>
              <td class="px-6 py-5 border-l border-slate-50 text-right font-mono font-black text-slate-700 text-[11px]">{{ t.usageCount.toLocaleString() }}</td>
              <td class="px-6 py-5 border-l border-slate-50 text-center">
                <span :class="['inline-flex rounded-full px-3 py-1 text-[9px] font-black uppercase border', t.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200']">{{ t.status }}</span>
              </td>
              <td class="px-8 py-5 border-l border-slate-50 text-right">
                <div class="flex gap-2 items-center justify-end opacity-0 group-hover:opacity-100 transition-all">
                  <Button icon="pi pi-eye" severity="secondary" rounded outlined size="small" class="w-8 h-8" @click="openPreview(t)" v-tooltip.top="'Preview'" />
                  <Button icon="pi pi-pencil" severity="secondary" rounded outlined size="small" class="w-8 h-8 border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white" @click="openEdit(t)" v-tooltip.top="'Edit'" />
                  <Button icon="pi pi-copy" severity="secondary" rounded outlined size="small" class="w-8 h-8" @click="duplicateTemplate(t)" v-tooltip.top="'Duplikat'" />
                  <Button icon="pi pi-trash" severity="danger" rounded outlined size="small" class="w-8 h-8" @click="confirmDelete(t)" v-tooltip.top="'Hapus'" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ──────────────────── PREVIEW DIALOG ──────────────────── -->
    <div v-if="previewDialog" class="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/70 backdrop-blur-md overflow-y-auto py-8 px-4" @click.self="previewDialog = false">
      <div class="w-full max-w-5xl bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-purple-900 overflow-hidden animate-scale-in">
        <!-- Dialog Header -->
        <div class="p-8 border-b border-slate-100 bg-white flex items-center justify-between relative overflow-hidden shrink-0">
          <div class="absolute top-0 right-0 w-48 h-48 bg-purple-50 rounded-full blur-3xl -mr-24 -mt-24"></div>
          <div class="relative flex items-center gap-5">
            <div class="w-16 h-16 rounded-[1.5rem] bg-purple-600 flex items-center justify-center text-white shadow-xl rotate-3 hover:rotate-0 transition-transform">
              <i class="pi pi-print text-2xl"></i>
            </div>
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h3 v-if="selected?.formatType === 'DOCUMENT'" class="text-2xl font-black text-slate-900 uppercase tracking-tight">Preview <span class="text-purple-600 italic">Dokumen</span></h3>
                <h3 v-else class="text-2xl font-black text-slate-900 uppercase tracking-tight">Preview <span class="text-purple-600 italic">Label & Tag</span></h3>
                <span :class="['text-[9px] font-black px-3 py-1 rounded-full border uppercase', selected?.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200']">{{ selected?.status }}</span>
              </div>
              <p class="text-[11px] font-black text-purple-600 uppercase tracking-widest">{{ selected?.name }} · {{ selected?.docType }}</p>
            </div>
          </div>
          <div class="flex gap-2 relative">
            <button @click="printPreview" class="h-10 px-5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase flex items-center gap-2 hover:bg-purple-600 transition-colors">
              <i class="pi pi-print"></i> Print
            </button>
            <Button icon="pi pi-times" severity="secondary" rounded text @click="previewDialog = false" class="h-10 w-10" />
          </div>
        </div>

        <!-- Preview Content -->
        <div class="bg-slate-100 p-8 min-h-[60vh] flex items-center justify-center">
          <!-- Paper preview for DOCUMENTS -->
          <div v-if="selected?.formatType === 'DOCUMENT'" class="max-w-2xl w-full mx-auto">
            <div class="bg-white shadow-2xl rounded-sm overflow-hidden" :style="`border-top: 6px solid ${selected?.accentColor}`" id="print-preview-area">
              <!-- Document Header -->
              <div class="p-8 pb-4" :style="`background: linear-gradient(135deg, ${selected?.accentColor}08, ${selected?.secondaryColor}08)`">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="text-2xl font-black uppercase" :style="`color:${selected?.accentColor}`">{{ companyProfile?.legalName || 'PT Sarana Eka Sejahtera' }}</div>
                    <p class="text-xs text-slate-500 mt-1">{{ companyProfile?.address1 || 'Jl. Industri Raya No. 88' }}, {{ companyProfile?.city || 'Jakarta' }} {{ companyProfile?.postalCode || '' }}</p>
                    <p class="text-xs text-slate-500">Telp: {{ companyProfile?.phone || '(021) 12345678' }} | NPWP: {{ companyProfile?.npwp || '01.234.567.8-901.000' }}</p>
                  </div>
                  <div class="text-right">
                    <div class="text-3xl font-black uppercase" :style="`color:${selected?.accentColor}`">{{ docTypeLabel }}</div>
                    <div class="mt-2 text-xs text-slate-500">Nomor:</div>
                    <div class="font-black text-slate-900 text-sm font-mono">{{ sampleDocNumber }}</div>
                  </div>
                </div>
                <div class="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-xs" :style="`border-color:${selected?.accentColor}30`">
                  <div v-for="meta in docMeta" :key="meta.label">
                    <div class="font-black uppercase text-slate-400 tracking-widest text-[9px]">{{ meta.label }}</div>
                    <div class="font-black text-slate-800 mt-0.5">{{ meta.value }}</div>
                  </div>
                </div>
              </div>

              <!-- Recipient / Bill To -->
              <div class="px-8 py-4">
                <div class="grid grid-cols-2 gap-8">
                  <div>
                    <div class="text-[9px] font-black uppercase tracking-widest mb-1" :style="`color:${selected?.accentColor}`">Kepada Yth.</div>
                    <div class="font-black text-slate-900 text-sm">PT Mitra Usaha Mandiri</div>
                    <div class="text-xs text-slate-500 mt-0.5">Jl. Gatot Subroto No. 42B<br>Jakarta Selatan 12930</div>
                    <div class="text-xs text-slate-500 mt-0.5">NPWP: 02.345.678.9-012.000</div>
                  </div>
                  <div v-if="selected?.showShippingAddress">
                    <div class="text-[9px] font-black uppercase tracking-widest mb-1" :style="`color:${selected?.accentColor}`">Kirim Ke</div>
                    <div class="font-black text-slate-900 text-sm">Gudang PT Mitra Usaha Mandiri</div>
                    <div class="text-xs text-slate-500 mt-0.5">Kawasan Industri Cibitung<br>Bekasi 17520</div>
                  </div>
                </div>
              </div>

              <!-- Line Items Table -->
              <div class="px-8 pb-4">
                <table class="w-full text-xs">
                  <thead>
                    <tr :style="`background:${selected?.accentColor}`">
                      <th class="text-left text-white font-black uppercase py-2 px-3 text-[9px] tracking-wider rounded-tl">No</th>
                      <th class="text-left text-white font-black uppercase py-2 px-3 text-[9px] tracking-wider">Deskripsi</th>
                      <th class="text-center text-white font-black uppercase py-2 px-3 text-[9px] tracking-wider">Qty</th>
                      <th class="text-center text-white font-black uppercase py-2 px-3 text-[9px] tracking-wider">Satuan</th>
                      <th class="text-right text-white font-black uppercase py-2 px-3 text-[9px] tracking-wider">Harga</th>
                      <th class="text-right text-white font-black uppercase py-2 px-3 text-[9px] tracking-wider rounded-tr">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(line, idx) in sampleLines" :key="idx" :class="['border-b border-slate-100', idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50']">
                      <td class="py-2.5 px-3 text-slate-500 font-bold">{{ idx + 1 }}</td>
                      <td class="py-2.5 px-3 font-bold text-slate-800">{{ line.desc }}<div class="text-[9px] text-slate-400 font-normal">{{ line.note }}</div></td>
                      <td class="py-2.5 px-3 text-center font-bold text-slate-800">{{ line.qty }}</td>
                      <td class="py-2.5 px-3 text-center text-slate-500">{{ line.uom }}</td>
                      <td class="py-2.5 px-3 text-right font-mono text-slate-700">{{ formatRp(line.price) }}</td>
                      <td class="py-2.5 px-3 text-right font-mono font-black text-slate-900">{{ formatRp(line.qty * line.price) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Totals -->
              <div class="px-8 pb-6">
                <div class="flex justify-between gap-8">
                  <div class="flex-1">
                    <div v-if="selected?.showNotes" class="p-4 rounded-xl text-xs text-slate-600 leading-relaxed" :style="`background:${selected?.accentColor}08; border: 1px solid ${selected?.accentColor}20`">
                      <div class="font-black uppercase text-slate-500 text-[9px] tracking-widest mb-1">Catatan</div>
                      <p>Pembayaran mohon dilakukan ke rekening BCA No. 123-456-7890 a/n {{ companyProfile?.legalName || 'PT Sarana Eka Sejahtera' }}. Harap cantumkan nomor invoice pada evidens transfer.</p>
                    </div>
                  </div>
                  <div class="w-64 space-y-2">
                    <div class="flex justify-between text-xs">
                      <span class="text-slate-500 font-bold">Subtotal</span>
                      <span class="font-black text-slate-800 font-mono">{{ formatRp(subtotal) }}</span>
                    </div>
                    <div v-if="selected?.showTax" class="flex justify-between text-xs">
                      <span class="text-slate-500 font-bold">PPN 11%</span>
                      <span class="font-black text-slate-800 font-mono">{{ formatRp(subtotal * 0.11) }}</span>
                    </div>
                    <div v-if="selected?.showDiscount" class="flex justify-between text-xs">
                      <span class="text-slate-500 font-bold">Diskon</span>
                      <span class="font-black text-rose-600 font-mono">-{{ formatRp(subtotal * 0.05) }}</span>
                    </div>
                    <div class="border-t border-slate-200 pt-2 flex justify-between">
                      <span class="font-black uppercase text-[10px] tracking-wider" :style="`color:${selected?.accentColor}`">TOTAL</span>
                      <span class="text-lg font-black font-mono" :style="`color:${selected?.accentColor}`">{{ formatRp(selected?.showTax ? subtotal * 1.11 : subtotal) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Signature -->
              <div v-if="selected?.showSignature" class="px-8 pb-8">
                <div class="grid grid-cols-3 gap-8 pt-6 border-t border-slate-100">
                  <div v-for="sig in ['Dibuat Oleh', 'Diperiksa Oleh', 'Disetujui Oleh']" :key="sig" class="text-center">
                    <div class="h-16 border-b border-slate-300 mb-2"></div>
                    <div class="text-[10px] font-black text-slate-600 uppercase">{{ sig }}</div>
                    <div class="text-[9px] text-slate-400 mt-0.5">Nama & Jabatan</div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="px-8 py-4 text-center text-[9px] text-slate-400 border-t" :style="`border-color:${selected?.accentColor}30; background:${selected?.accentColor}05`">
                <span v-if="selected?.footerText">{{ selected.footerText }}</span>
                <span v-else>{{ selected?.name }} · Dicetak pada {{ new Date().toLocaleDateString('id-ID') }} · Dokumen ini sah tanpa tanda tangan manual jika menggunakan E-Sign</span>
              </div>
            </div>
          </div>

          <!-- Tag Preview for TAGS -->
          <div v-else class="flex flex-col items-center">
            <div id="print-preview-area" class="bg-white shadow-2xl rounded-lg border border-slate-200 overflow-hidden flex flex-col justify-between p-4" 
              :style="`width: ${selected?.width * 4}px; height: ${selected?.height * 4}px;`"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <div v-if="selected?.showLogo" class="w-8 h-8 rounded border flex items-center justify-center overflow-hidden" :style="`border-color:${selected?.accentColor}`">
                      <div class="text-[8px] font-black uppercase tracking-tighter" :style="`color:${selected?.accentColor}`">SES</div>
                    </div>
                    <div class="text-[12px] font-black text-slate-900 uppercase tracking-tight">{{ companyProfile?.legalName || 'PT SES' }}</div>
                  </div>
                  <div class="text-[16px] font-black text-slate-900 leading-none mb-1">{{ selected?.docType }}</div>
                  <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU: PROD-8829-XL</div>
                </div>
              </div>

              <div class="flex items-end justify-between mt-4">
                <div class="flex-1">
                  <div v-if="selected?.showPrice" class="text-[24px] font-black text-slate-900 leading-none">{{ formatRp(125000) }}</div>
                  <div v-if="selected?.showItemCode" class="text-[9px] font-mono text-slate-500 mt-1">CODE: 8991234567890</div>
                </div>
                
                <div v-if="selected?.showBarcode" class="flex flex-col items-center gap-1">
                  <div v-if="selected?.barcodeType !== 'QR'" class="h-16 w-32 bg-white flex items-end justify-between px-1 border border-slate-100">
                    <div v-for="i in 24" :key="i" class="bg-black" :style="`width: ${[1,2,1,3,1,2,1][i%7]}px; height: ${Math.random() * 20 + 80}%`"></div>
                  </div>
                  <!-- Mini QR simulation -->
                  <div v-else class="w-20 h-20 bg-black p-1.5 flex flex-wrap gap-[2px]">
                    <div v-for="i in 64" :key="i" :class="['w-1.5 h-1.5', Math.random() > 0.5 ? 'bg-white' : 'bg-transparent']"></div>
                  </div>
                  <div class="text-[8px] font-mono font-bold">8991234567890</div>
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-dashed border-slate-200 text-center">
                <div class="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{{ selected?.footerText || 'SES-ERP SMART LABEL SYSTEM' }}</div>
              </div>
            </div>
            
            <div class="mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white flex gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Ukuran: {{ selected?.width }} x {{ selected?.height }} mm</span>
              <span>Barcode: {{ selected?.barcodeType }}</span>
            </div>
          </div>
        </div>

        <!-- Dialog Footer Bar -->
        <div class="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <div v-if="selected?.formatType === 'DOCUMENT'" class="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
            <span><i class="pi pi-file mr-1"></i>{{ selected?.paperSize }}</span>
            <span><i class="pi pi-arrows-h mr-1"></i>{{ selected?.orientation }}</span>
            <span><i class="pi pi-font mr-1"></i>{{ selected?.fontFamily }}</span>
          </div>
          <div v-else class="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
            <span><i class="pi pi-arrows-h mr-1"></i>{{ selected?.width }} x {{ selected?.height }} mm</span>
            <span><i class="pi pi-barcode mr-1"></i>{{ selected?.barcodeType }}</span>
          </div>
          <div class="flex gap-3">
            <Button label="Edit Template" icon="pi pi-pencil" class="h-11 px-8 bg-purple-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="previewDialog = false; openEdit(selected)" />
            <Button label="Tutup" severity="secondary" outlined rounded @click="previewDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
          </div>
        </div>
      </div>
    </div>

    <!-- ──────────────────── CREATE / EDIT DIALOG ──────────────────── -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/70 backdrop-blur-md overflow-y-auto py-8 px-4" @click.self="formDialog = false">
      <div class="w-full max-w-4xl bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-purple-900 overflow-hidden animate-scale-in">
        <!-- Form Header -->
        <div class="p-8 border-b border-slate-100 bg-white flex items-center justify-between relative overflow-hidden shrink-0">
          <div class="absolute top-0 right-0 w-48 h-48 bg-purple-50 rounded-full blur-3xl -mr-24 -mt-24"></div>
          <div class="relative flex items-center gap-5">
            <div class="w-16 h-16 rounded-[1.5rem] bg-purple-600 flex items-center justify-center text-white shadow-xl rotate-3 hover:rotate-0 transition-transform">
              <i class="pi pi-palette text-2xl"></i>
            </div>
            <div>
              <h3 class="text-2xl font-black text-slate-900 uppercase tracking-tight">{{ isEdit ? 'Edit' : 'Buat' }} <span class="text-purple-600 italic">Template</span></h3>
              <p class="text-[11px] font-black text-purple-600 uppercase tracking-widest mt-1">Print Format Designer</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="formDialog = false" class="relative z-10 h-10 w-10" />
        </div>

        <!-- Form Body -->
        <div class="p-8 bg-slate-50/30">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <!-- LEFT: Basic Info -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Section: Identitas Template -->
              <div class="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-4">
                <div class="flex items-center gap-3 mb-5">
                  <div class="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-sm"><i class="pi pi-info-circle"></i></div>
                  <h4 class="text-[11px] font-black uppercase text-slate-700 tracking-[0.2em]">I. Identitas Template</h4>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="col-span-2 space-y-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nama Template</label>
                    <input v-model="form.name" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[13px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="e.g. Sales Invoice Premium" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Jenis Dokumen</label>
                    <select v-model="form.docType" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[12px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                      <option v-for="d in docTypes" :key="d">{{ d }}</option>
                    </select>
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Modul</label>
                    <select v-model="form.module" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[12px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                      <option v-for="m in modules" :key="m">{{ m }}</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Section: Layout & Paper / Dimensions -->
              <div class="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-4">
                <div class="flex items-center gap-3 mb-5">
                  <div class="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-sm"><i class="pi pi-file"></i></div>
                  <h4 class="text-[11px] font-black uppercase text-slate-700 tracking-[0.2em]">II. {{ form.formatType === 'DOCUMENT' ? 'Layout & Kertas' : 'Dimensi Label' }}</h4>
                </div>
                
                <div v-if="form.formatType === 'DOCUMENT'" class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ukuran Kertas</label>
                    <div class="flex gap-2 flex-wrap">
                      <button v-for="s in ['A4','A5','F4','LETTER']" :key="s" @click="form.paperSize = s" :class="['px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all', form.paperSize === s ? 'bg-sky-600 text-white border-sky-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200']">{{ s }}</button>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Orientasi</label>
                    <div class="flex gap-2">
                      <button v-for="o in ['PORTRAIT','LANDSCAPE']" :key="o" @click="form.orientation = o" :class="['flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all flex items-center justify-center gap-2', form.orientation === o ? 'bg-sky-600 text-white border-sky-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200']">
                        <i :class="o === 'PORTRAIT' ? 'pi pi-tablet' : 'pi pi-tv'"></i> {{ o === 'PORTRAIT' ? 'Portrait' : 'Landscape' }}
                      </button>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Font Family</label>
                    <select v-model="form.fontFamily" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[12px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
                      <option v-for="f in ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Source Sans Pro']" :key="f">{{ f }}</option>
                    </select>
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Margin</label>
                    <div class="flex gap-2">
                      <button v-for="m in [{l:'Sempit',v:'NARROW'},{l:'Normal',v:'NORMAL'},{l:'Lebar',v:'WIDE'}]" :key="m.v" @click="form.margin = m.v" :class="['flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all', form.margin === m.v ? 'bg-sky-600 text-white border-sky-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200']">{{ m.l }}</button>
                    </div>
                  </div>
                </div>

                <div v-else class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lebar Label (mm)</label>
                    <input type="number" v-model="form.width" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[13px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tinggi Label (mm)</label>
                    <input type="number" v-model="form.height" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[13px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div class="col-span-2 space-y-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Jenis Barcode</label>
                    <div class="flex gap-2">
                      <button v-for="b in ['CODE128','EAN13','QR']" :key="b" @click="form.barcodeType = b" :class="['flex-1 py-3 rounded-xl text-[10px] font-black uppercase border transition-all', form.barcodeType === b ? 'bg-sky-600 text-white border-sky-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200']">{{ b }}</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Section: Komponen Dokumen -->
              <div class="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-4">
                <div class="flex items-center gap-3 mb-5">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm"><i class="pi pi-th-large"></i></div>
                  <h4 class="text-[11px] font-black uppercase text-slate-700 tracking-[0.2em]">III. Komponen</h4>
                </div>
                
                <div v-if="form.formatType === 'DOCUMENT'" class="grid grid-cols-2 gap-3">
                  <label v-for="comp in components" :key="comp.key" :class="['flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all', form[comp.key] ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300']" @click="form[comp.key] = !form[comp.key]">
                    <div :class="['w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0', form[comp.key] ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300']">
                      <i v-if="form[comp.key]" class="pi pi-check text-white text-[8px]"></i>
                    </div>
                    <div>
                      <p class="text-[10px] font-black text-slate-700 uppercase leading-none">{{ comp.label }}</p>
                      <p class="text-[8px] text-slate-400 mt-0.5">{{ comp.desc }}</p>
                    </div>
                  </label>
                </div>

                <div v-else class="grid grid-cols-2 gap-3">
                  <label v-for="tagComp in [
                    {key:'showBarcode', label:'Tampilkan Barcode', desc:'Barcode/QR pada label'},
                    {key:'showPrice', label:'Tampilkan Harga', desc:'Harga satuan barang'},
                    {key:'showItemCode', label:'Tampilkan SKU', desc:'Kode unik barang/rak'},
                    {key:'showLogo', label:'Logo Kecil', desc:'Mini logo perusahaan'}
                  ]" :key="tagComp.key" :class="['flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all', form[tagComp.key] ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300']" @click="form[tagComp.key] = !form[tagComp.key]">
                    <div :class="['w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0', form[tagComp.key] ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300']">
                      <i v-if="form[tagComp.key]" class="pi pi-check text-white text-[8px]"></i>
                    </div>
                    <div>
                      <p class="text-[10px] font-black text-slate-700 uppercase leading-none">{{ tagComp.label }}</p>
                      <p class="text-[8px] text-slate-400 mt-0.5">{{ tagComp.desc }}</p>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Section: Footer Text & Variables -->
              <div class="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-4">
                <div class="flex items-center gap-3 mb-5">
                  <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-sm"><i class="pi pi-align-center"></i></div>
                  <h4 class="text-[11px] font-black uppercase text-slate-700 tracking-[0.2em]">IV. Footer & Variables</h4>
                </div>
                <div class="space-y-4">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Footer Text</label>
                    <input v-model="form.footerText" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400" :placeholder="`${form.name} · Powered by SES-ERP`" />
                  </div>
                  <div>
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Variable Yang Tersedia</label>
                    <div class="flex flex-wrap gap-2">
                      <button v-for="v in availableVars" :key="v" @click="appendVar(v)"
                        class="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-black font-mono hover:bg-amber-600 hover:text-white transition-colors">
                        {{ varLabel(v) }}
                      </button>
                    </div>
                    <p class="text-[9px] text-slate-400 mt-2">Klik variabel untuk menambahkan ke Footer Text</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT: Design Palette -->
            <div class="space-y-6">
              <!-- Live Mini Preview -->
              <div class="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-5 sticky top-0">
                <h4 class="text-[11px] font-black uppercase text-slate-700 tracking-[0.2em] mb-4">Live Preview</h4>
                <div class="p-4 bg-slate-100 rounded-2xl">
                  <!-- Document Mini Preview -->
                  <div v-if="form.formatType === 'DOCUMENT'" class="bg-white rounded shadow-lg overflow-hidden animate-scale-in" :style="`border-top: 3px solid ${form.accentColor}`">
                    <div class="p-3" :style="`background: linear-gradient(135deg, ${form.accentColor}10, ${form.secondaryColor}10)`">
                      <div class="flex justify-between mb-2">
                        <div v-if="form.showLogo">
                          <div class="h-2 rounded w-16 mb-1" :style="`background:${form.accentColor}`"></div>
                          <div class="h-1 rounded w-10 bg-slate-200"></div>
                        </div>
                        <div class="text-right">
                          <div class="h-2 rounded w-16 mb-1 ml-auto" :style="`background:${form.accentColor}60`"></div>
                          <div class="h-1 rounded w-10 bg-slate-200 ml-auto"></div>
                        </div>
                      </div>
                    </div>
                    <div class="p-3">
                      <div v-for="r in 3" :key="r" class="h-1 rounded mb-1" :class="r%2===0?'w-3/4 bg-slate-100':'w-full bg-slate-200'"></div>
                      <div class="mt-2 pt-2 border-t flex justify-end" :style="`border-color:${form.accentColor}30`">
                        <div class="h-2 rounded w-12" :style="`background:${form.accentColor}`"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Tag Mini Preview -->
                  <div v-else class="bg-white rounded-lg shadow-lg aspect-[5/3] flex flex-col justify-between p-3 animate-scale-in relative border border-slate-200 overflow-hidden">
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <div class="h-1.5 rounded bg-slate-800 w-full mb-1"></div>
                        <div class="h-1 rounded bg-slate-300 w-2/3"></div>
                      </div>
                      <div v-if="form.showLogo" class="w-4 h-4 rounded-sm border ml-2" :style="`border-color:${form.accentColor}`"></div>
                    </div>
                    
                    <div class="flex items-end justify-between mt-2">
                      <div class="flex-1">
                        <div v-if="form.showPrice" class="h-2.5 rounded w-1/2 mb-1" :style="`background:${form.accentColor}`"></div>
                        <div v-if="form.showItemCode" class="h-1 rounded bg-slate-200 w-3/4"></div>
                      </div>
                      <div v-if="form.showBarcode" class="h-6 w-12 border border-slate-100 flex flex-col justify-between p-0.5">
                        <div v-if="form.barcodeType !== 'QR'" class="flex flex-col h-full justify-between">
                          <div v-for="i in 5" :key="i" class="h-0.5 bg-slate-900" :style="`width: ${Math.random() * 80 + 20}%`"></div>
                        </div>
                        <div v-else class="h-full w-full bg-slate-900 p-0.5 flex flex-wrap gap-[1px]">
                          <div v-for="i in 9" :key="i" class="w-[3px] h-[3px] bg-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Paper details badge -->
                <div class="mt-3 flex items-center justify-between">
                  <span v-if="form.formatType === 'DOCUMENT'" class="text-[9px] font-black text-slate-400 uppercase">{{ form.paperSize }} · {{ form.orientation === 'PORTRAIT' ? 'P' : 'L' }}</span>
                  <span v-else class="text-[9px] font-black text-slate-400 uppercase">{{ form.width }}x{{ form.height }}mm · {{ form.barcodeType }}</span>
                  <span class="text-[9px] font-black" :style="`color:${form.accentColor}`">{{ form.fontFamily }}</span>
                </div>
              </div>

              <!-- Color Palette -->
              <div class="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-5">
                <h4 class="text-[11px] font-black uppercase text-slate-700 tracking-[0.2em] mb-4">Warna & Branding</h4>
                <div class="space-y-4">
                  <div>
                    <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Warna Aksen (Primary)</label>
                    <div class="flex flex-wrap gap-2 mb-2">
                      <button v-for="c in colorPalette" :key="c" @click="form.accentColor = c" class="w-8 h-8 rounded-full border-2 transition-all hover:scale-110" :style="`background:${c}; border-color:${form.accentColor === c ? '#1e293b' : c}40`">
                        <i v-if="form.accentColor === c" class="pi pi-check text-white text-[8px]"></i>
                      </button>
                    </div>
                    <div class="flex items-center gap-2">
                      <input type="color" v-model="form.accentColor" class="w-10 h-8 rounded-lg border border-slate-200 cursor-pointer" />
                      <input v-model="form.accentColor" class="flex-1 h-8 border border-slate-200 rounded-xl px-3 text-[11px] font-black font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    </div>
                  </div>
                  <div>
                    <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Warna Sekunder</label>
                    <div class="flex flex-wrap gap-2 mb-2">
                      <button v-for="c in colorPalette" :key="c" @click="form.secondaryColor = c" class="w-6 h-6 rounded-full border-2 transition-all hover:scale-110" :style="`background:${c}; border-color:${form.secondaryColor === c ? '#1e293b' : c}40`">
                        <i v-if="form.secondaryColor === c" class="pi pi-check text-white text-[6px]"></i>
                      </button>
                    </div>
                    <div class="flex items-center gap-2">
                      <input type="color" v-model="form.secondaryColor" class="w-10 h-8 rounded-lg border border-slate-200 cursor-pointer" />
                      <input v-model="form.secondaryColor" class="flex-1 h-8 border border-slate-200 rounded-xl px-3 text-[11px] font-black font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    </div>
                  </div>
                  <!-- Theme presets -->
                  <div>
                    <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Preset Tema</label>
                    <div class="grid grid-cols-2 gap-2">
                      <button v-for="preset in themePresets" :key="preset.name" @click="applyPreset(preset)"
                        class="p-2.5 rounded-xl border border-slate-200 text-left hover:border-purple-300 transition-all group/p">
                        <div class="flex gap-1 mb-1">
                          <div class="w-4 h-4 rounded-full" :style="`background:${preset.accent}`"></div>
                          <div class="w-4 h-4 rounded-full" :style="`background:${preset.secondary}`"></div>
                        </div>
                        <p class="text-[9px] font-black text-slate-600 uppercase">{{ preset.name }}</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Status & Icon -->
              <div class="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-5">
                <h4 class="text-[11px] font-black uppercase text-slate-700 tracking-[0.2em] mb-4">Status & Default</h4>
                <div class="space-y-3">
                  <div class="flex gap-2">
                    <button v-for="s in ['ACTIVE','DRAFT']" :key="s" @click="form.status = s" :class="['flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all', form.status === s ? (s === 'ACTIVE' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-600 text-white border-slate-600') + ' shadow-lg' : 'bg-white text-slate-500 border-slate-200']">{{ s }}</button>
                  </div>
                  <label :class="['flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all', form.isDefault ? 'border-purple-300 bg-purple-50' : 'border-slate-200 hover:border-purple-200']" @click="form.isDefault = !form.isDefault">
                    <div :class="['w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0', form.isDefault ? 'bg-purple-600 border-purple-600' : 'bg-white border-slate-300']"><i v-if="form.isDefault" class="pi pi-check text-white text-[8px]"></i></div>
                    <div>
                      <p class="text-[10px] font-black text-slate-700 uppercase">Set sebagai Default</p>
                      <p class="text-[8px] text-slate-400">Otomatis dipilih saat cetak dokumen</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Footer -->
        <div class="p-8 border-t border-slate-100 bg-white flex items-center justify-between">
          <button v-if="isEdit" @click="previewCurrent" class="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 text-[10px] font-black uppercase transition-colors">
            <i class="pi pi-eye"></i> Preview Sekarang
          </button>
          <div v-else></div>
          <div class="flex gap-3">
            <Button :label="isEdit ? 'Simpan Perubahan' : 'Buat Template'" icon="pi pi-save" class="h-12 px-10 bg-purple-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-purple-200 hover:scale-105 active:scale-95 transition-all rounded-xl" @click="saveForm" />
            <Button label="Batal" severity="secondary" outlined rounded @click="formDialog = false" class="h-12 px-8 font-black text-[10px] uppercase" />
          </div>
        </div>
      </div>
    </div>

    <!-- DELETE CONFIRM -->
    <div v-if="deleteDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="deleteDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-sm bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-rose-900 p-8 text-center animate-scale-in">
        <div class="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 text-3xl"><i class="pi pi-exclamation-triangle"></i></div>
        <h3 class="text-lg font-black text-slate-900 uppercase">Hapus Template?</h3>
        <p class="text-[11px] text-slate-500 mt-2">Template <strong>{{ selected?.name }}</strong> akan dihapus permanen. Dokumen yang sudah tercetak tidak terpengaruh.</p>
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
const api = useApi();
const toast = useToast();

const search = ref('');
const activeFilter = ref('Semua');
const activeTab = ref<'DOCUMENT'|'TAG'>('DOCUMENT');
const viewMode = ref<'grid'|'list'>('grid');
const loading = ref(false);
const saving = ref(false);
const previewDialog = ref(false);
const formDialog = ref(false);
const deleteDialog = ref(false);
const isEdit = ref(false);
const selected = ref<any>(null);
const companyProfile = ref<any>(null);

let nextId = 10;

// ── Data Options ──────────────────────────────────────
const docTypes = ['Sales Invoice','Sales Quotation','Purchase Order','Purchase Invoice','Delivery Order','Goods Receipt','Payslip','Budget Report','Profit & Loss','Balance Sheet','Trial Balance','Faktur Pajak','Work Order','Project Report','Bank Reconciliation'];
const modules  = ['SALES','PROCUREMENT','INVENTORY','FINANCE','HRIS','MANUFACTURING','TAX','PROJECT','LOGISTICS'];
const colorPalette = ['#7c3aed','#2563eb','#059669','#dc2626','#d97706','#0891b2','#db2777','#4f46e5','#64748b','#0f172a'];
const themePresets = [
  { name: 'Purple Corp', accent: '#7c3aed', secondary: '#4f46e5' },
  { name: 'Ocean Blue', accent: '#2563eb', secondary: '#0891b2' },
  { name: 'Forest Green', accent: '#059669', secondary: '#10b981' },
  { name: 'Crimson Red', accent: '#dc2626', secondary: '#f97316' },
  { name: 'Midnight', accent: '#0f172a', secondary: '#334155' },
  { name: 'Gold Premium', accent: '#d97706', secondary: '#92400e' },
];
const components = [
  { key: 'showLogo', label: 'Logo Perusahaan', desc: 'Logo di header kiri dokumen' },
  { key: 'showShippingAddress', label: 'Alamat Pengiriman', desc: 'Tampilkan kolom "Kirim Ke"' },
  { key: 'showTax', label: 'Komponen Pajak', desc: 'PPN 11% di ringkasan total' },
  { key: 'showDiscount', label: 'Baris Diskon', desc: 'Diskon/potongan di total' },
  { key: 'showNotes', label: 'Kolom Catatan', desc: 'Rekening bank & catatan' },
  { key: 'showSignature', label: 'Kolom Tanda Tangan', desc: 'Tiga kolom TTD & stempel' },
  { key: 'showBankInfo', label: 'Info Rekening Bank', desc: 'Nomor rekening perusahaan' },
  { key: 'showQrCode', label: 'QR Code', desc: 'QR verifikasi dokumen digital' },
];
const availableVars = ['companyName','docNo','date','dueDate','clientName','total','currency','pageNo','printDate'];

// ── Form State ─────────────────────────────────────────
const defaultForm = () => ({
  name: '',
  docType: 'Sales Invoice',
  module: 'SALES',
  paperSize: 'A4',
  orientation: 'PORTRAIT',
  fontFamily: 'Inter',
  margin: 'NORMAL',
  accentColor: '#7c3aed',
  secondaryColor: '#4f46e5',
  footerText: '',
  status: 'ACTIVE',
  isDefault: false,
  showLogo: true,
  showShippingAddress: false,
  showTax: true,
  showDiscount: false,
  showNotes: true,
  showSignature: true,
  showBankInfo: true,
  showQrCode: false,
  // Tag fields
  formatType: 'DOCUMENT',
  width: 50,
  height: 30,
  barcodeType: 'CODE128',
  showBarcode: true,
  showPrice: true,
  showItemCode: true,
});
const form = reactive(defaultForm());

// ── Templates Data ─────────────────────────────────────
const templates = ref<any[]>([]);

async function loadData() {
  loading.value = true;
  try {
    const [templateRes, profileRes] = await Promise.all([
      api.get('/core/print-formats'),
      api.get('/core/company-profile')
    ]);
    templates.value = templateRes.formats || templateRes.data?.formats || [];
    companyProfile.value = profileRes.companyProfile || profileRes.data?.companyProfile || profileRes.data;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat', detail: e.message });
  } finally {
    loading.value = false;
  }
}

// ── Computed ───────────────────────────────────────────
const filteredTemplates = computed(() => templates.value.filter(t => {
  const tMatch = t.formatType === activeTab.value;
  const fMatch = activeFilter.value === 'Semua' || t.module === activeFilter.value;
  const sMatch = !search.value || t.name.toLowerCase().includes(search.value.toLowerCase()) || t.docType.toLowerCase().includes(search.value.toLowerCase());
  return tMatch && fMatch && sMatch;
}));

// Preview sample data
const sampleLines = [
  { desc: 'Konsultasi Implementasi ERP Modul Finance', note: 'Q1 2026 · 40 jam', qty: 40, uom: 'JAM', price: 750_000 },
  { desc: 'Lisensi Software SES-ERP Enterprise', note: 'Annual License 2026', qty: 1, uom: 'LISENSI', price: 36_000_000 },
  { desc: 'Pelatihan & Training On-Site', note: 'Batch 3 users, 2 hari', qty: 2, uom: 'HARI', price: 5_500_000 },
  { desc: 'Maintenance & Support Priority', note: 'SLA 4 jam response', qty: 12, uom: 'BULAN', price: 2_000_000 },
];
const subtotal = computed(() => sampleLines.reduce((s, l) => s + l.qty * l.price, 0));
const sampleDocNumber = computed(() => {
  const p = selected.value?.docType?.slice(0,3)?.toUpperCase() || 'DOC';
  return `${p}-202604-0047`;
});
const docTypeLabel = computed(() => selected.value?.docType || 'INVOICE');
const docMeta = computed(() => [
  { label: 'Tanggal Terbit', value: '21 April 2026' },
  { label: 'Jatuh Tempo', value: '21 Mei 2026' },
  { label: 'Ref PO', value: 'PO-202603-0031' },
]);

// ── Methods ────────────────────────────────────────────
function formatRp(v: number) { return 'Rp ' + v.toLocaleString('id-ID'); }

function openPreview(t: any) { selected.value = t; previewDialog.value = true; }
function openCreate(type: any = 'DOCUMENT') {
  isEdit.value = false;
  Object.assign(form, defaultForm());
  form.formatType = type;
  if (type === 'TAG') {
    form.docType = 'Packing Label';
    form.module = 'LOGISTICS';
  }
  formDialog.value = true;
}
function openEdit(t: any) {
  selected.value = t;
  isEdit.value = true;
  Object.assign(form, { ...t });
  formDialog.value = true;
}
function previewCurrent() { formDialog.value = false; selected.value = { ...form }; previewDialog.value = true; }
function confirmDelete(t: any) { selected.value = t; deleteDialog.value = true; }

async function doDelete() {
  if (!selected.value) return;
  try {
    await api.delete(`/core/print-formats/${selected.value.id}`);
    toast.add({ severity: 'warn', summary: 'Dihapus', detail: `Template ${selected.value.name} dihapus.`, life: 3000 });
    deleteDialog.value = false;
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menghapus', detail: e.message });
  }
}

async function duplicateTemplate(t: any) {
  try {
    const copy = { ...t, name: t.name + ' (Copy)', isDefault: false, usageCount: 0, status: 'DRAFT' };
    delete copy.id;
    await api.put('/core/print-formats', copy);
    toast.add({ severity: 'success', summary: 'Diduplikat', detail: `${copy.name} berhasil dibuat.`, life: 3000 });
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menduplikat', detail: e.message });
  }
}
function applyPreset(preset: any) {
  form.accentColor = preset.accent;
  form.secondaryColor = preset.secondary;
}

async function saveForm() {
  if (!form.name || !form.docType) {
    toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Nama dan Jenis Dokumen wajib diisi.', life: 3000 });
    return;
  }
  
  saving.value = true;
  try {
    await api.put('/core/print-formats', form);
    toast.add({ severity: 'success', summary: 'Berhasil', detail: `Template ${form.name} disimpan ke database.`, life: 3000 });
    formDialog.value = false;
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menyimpan', detail: e.message });
  } finally {
    saving.value = false;
  }
}

function printPreview() {
  window.print();
}
function varLabel(v: string) { return '{{' + v + '}}'; }
function appendVar(v: string) { form.footerText += '{{' + v + '}}'; }

onMounted(loadData);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1em; }

@media print {
  body > * { display: none !important; }
  #print-preview-area { display: block !important; position: fixed; top: 0; left: 0; width: 100%; }
}
</style>
