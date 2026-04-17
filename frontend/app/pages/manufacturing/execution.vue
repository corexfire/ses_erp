<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-rose-50/20 p-6">

    <!-- Header -->
    <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 shadow-lg shadow-orange-200">
          <i class="pi pi-bolt text-xl text-white" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-slate-800">Production Execution</h1>
          <p class="text-sm text-slate-500">Issue material, terima produk jadi, dan jalankan QC in-process</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button
          :class="activeTab === 'issues' ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'"
          class="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
          @click="activeTab = 'issues'"
        >
          <i class="pi pi-arrow-right-arrow-left text-xs" />
          Issues
          <span class="rounded-full bg-white/30 px-1.5 text-xs font-bold">{{ issues.length }}</span>
        </button>
        <button
          :class="activeTab === 'receipts' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'"
          class="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
          @click="activeTab = 'receipts'"
        >
          <i class="pi pi-inbox text-xs" />
          Receipts
          <span class="rounded-full bg-white/30 px-1.5 text-xs font-bold">{{ receipts.length }}</span>
        </button>
        <button
          :class="activeTab === 'qc' ? 'bg-violet-500 text-white shadow-md shadow-violet-200' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'"
          class="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
          @click="activeTab = 'qc'"
        >
          <i class="pi pi-check-square text-xs" />
          QC
          <span class="rounded-full bg-white/30 px-1.5 text-xs font-bold">{{ qcs.length }}</span>
        </button>
        <button
          :class="tabAccentClass"
          class="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          :disabled="loading"
          @click="openCreate"
        >
          <i class="pi pi-plus text-xs" />
          New {{ tabLabel }}
        </button>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-500">{{ stat.label }}</p>
            <p class="mt-1 text-2xl font-bold text-slate-800">{{ stat.value }}</p>
          </div>
          <div :class="`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`">
            <i :class="`pi ${stat.icon} text-sm text-white`" />
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">

      <!-- Issues Tab -->
      <template v-if="activeTab === 'issues'">
        <div class="border-b border-slate-100 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 class="text-sm font-bold text-slate-800">Production Issues</h2>
            <p class="text-xs text-slate-500 mt-0.5">Pengeluaran bahan baku dari gudang ke lini produksi</p>
          </div>
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input v-model="searchQ" class="h-9 w-52 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" placeholder="Cari kode issue..." />
          </div>
        </div>

        <div v-if="loading" class="flex justify-center py-16">
          <div class="h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
        </div>
        <div v-else-if="filteredIssues.length === 0" class="flex flex-col items-center py-16 text-slate-400">
          <i class="pi pi-arrow-right-arrow-left text-4xl" />
          <p class="mt-3 text-sm font-medium">Belum ada Production Issue</p>
          <button class="mt-3 rounded-xl bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600" @click="openCreate">New Issue</button>
        </div>
        <table v-else class="w-full">
          <thead class="border-b border-slate-100 bg-slate-50/80">
            <tr>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Issue Code</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Work Order</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Tanggal</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Shift</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Issued By</th>
              <th class="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Items</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="item in filteredIssues" :key="item.id" class="group cursor-pointer hover:bg-orange-50/30 transition-colors" @click="openDetail(item, 'issue')">
              <td class="px-5 py-4">
                <div class="flex items-center gap-2">
                  <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                    <i class="pi pi-arrow-right text-xs" />
                  </div>
                  <span class="font-mono text-sm font-bold text-orange-700">{{ item.code }}</span>
                </div>
              </td>
              <td class="px-5 py-4">
                <span class="font-medium text-slate-700 text-sm">{{ item.workOrder?.code }}</span>
              </td>
              <td class="px-5 py-4 text-sm text-slate-600">{{ fmtDate(item.issueDate) }}</td>
              <td class="px-5 py-4 text-center">
                <span v-if="item.shiftNo" class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">Shift {{ item.shiftNo }}</span>
                <span v-else class="text-slate-400">—</span>
              </td>
              <td class="px-5 py-4 text-xs text-slate-500">{{ item.issuedBy || '—' }}</td>
              <td class="px-5 py-4 text-center">
                <span class="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700">{{ item.items?.length || 0 }}</span>
              </td>
              <td class="px-5 py-4">
                <span :class="item.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'" class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold">
                  <span :class="item.status === 'POSTED' ? 'bg-emerald-500' : 'bg-slate-400'" class="h-1.5 w-1.5 rounded-full" />
                  {{ item.status }}
                </span>
              </td>
              <td class="px-5 py-4 text-right">
                <button class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 opacity-0 group-hover:opacity-100 transition hover:border-orange-300 hover:text-orange-600" @click.stop="openDetail(item, 'issue')">Detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>

      <!-- Receipts Tab -->
      <template v-if="activeTab === 'receipts'">
        <div class="border-b border-slate-100 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 class="text-sm font-bold text-slate-800">Production Receipts</h2>
            <p class="text-xs text-slate-500 mt-0.5">Penerimaan produk jadi dari lini produksi ke gudang</p>
          </div>
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input v-model="searchQ" class="h-9 w-52 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" placeholder="Cari kode receipt..." />
          </div>
        </div>

        <div v-if="loading" class="flex justify-center py-16">
          <div class="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-500" />
        </div>
        <div v-else-if="filteredReceipts.length === 0" class="flex flex-col items-center py-16 text-slate-400">
          <i class="pi pi-inbox text-4xl" />
          <p class="mt-3 text-sm font-medium">Belum ada Production Receipt</p>
          <button class="mt-3 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600" @click="openCreate">New Receipt</button>
        </div>
        <table v-else class="w-full">
          <thead class="border-b border-slate-100 bg-slate-50/80">
            <tr>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Receipt Code</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Work Order</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Tanggal</th>
              <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Qty Produced</th>
              <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Qty Rejected</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Batch No</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="r in filteredReceipts" :key="r.id" class="group cursor-pointer hover:bg-emerald-50/30 transition-colors" @click="openDetail(r, 'receipt')">
              <td class="px-5 py-4">
                <div class="flex items-center gap-2">
                  <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <i class="pi pi-inbox text-xs" />
                  </div>
                  <span class="font-mono text-sm font-bold text-emerald-700">{{ r.code }}</span>
                </div>
              </td>
              <td class="px-5 py-4 text-sm font-medium text-slate-700">{{ r.workOrder?.code }}</td>
              <td class="px-5 py-4 text-sm text-slate-600">{{ fmtDate(r.receiptDate) }}</td>
              <td class="px-5 py-4 text-right">
                <span class="font-mono text-sm font-bold text-slate-800">{{ Number(r.qtyProduced).toLocaleString() }}</span>
                <span class="ml-1 text-xs text-slate-400">{{ r.uomCode || 'PCS' }}</span>
              </td>
              <td class="px-5 py-4 text-right">
                <span :class="Number(r.qtyRejected) > 0 ? 'text-red-600 font-bold' : 'text-slate-400'" class="font-mono text-sm">{{ Number(r.qtyRejected).toLocaleString() }}</span>
              </td>
              <td class="px-5 py-4">
                <span v-if="r.batchNo" class="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-700">{{ r.batchNo }}</span>
                <span v-else class="text-slate-400 text-xs">—</span>
              </td>
              <td class="px-5 py-4">
                <span :class="r.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'" class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold">
                  <span :class="r.status === 'POSTED' ? 'bg-emerald-500' : 'bg-slate-400'" class="h-1.5 w-1.5 rounded-full" />
                  {{ r.status }}
                </span>
              </td>
              <td class="px-5 py-4 text-right">
                <button class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 opacity-0 group-hover:opacity-100 transition hover:border-emerald-300 hover:text-emerald-600" @click.stop="openDetail(r, 'receipt')">Detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>

      <!-- QC Tab -->
      <template v-if="activeTab === 'qc'">
        <div class="border-b border-slate-100 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 class="text-sm font-bold text-slate-800">In-Process Quality Control</h2>
            <p class="text-xs text-slate-500 mt-0.5">Inspeksi kualitas selama proses produksi berlangsung</p>
          </div>
        </div>

        <div v-if="loading" class="flex justify-center py-16">
          <div class="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-500" />
        </div>
        <div v-else-if="qcs.length === 0" class="flex flex-col items-center py-16 text-slate-400">
          <i class="pi pi-check-square text-4xl" />
          <p class="mt-3 text-sm font-medium">Belum ada data QC</p>
          <button class="mt-3 rounded-xl bg-violet-500 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-600" @click="openCreate">New QC</button>
        </div>
        <table v-else class="w-full">
          <thead class="border-b border-slate-100 bg-slate-50/80">
            <tr>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Work Order</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">QC Date</th>
              <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Inspected</th>
              <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Passed</th>
              <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Failed</th>
              <th class="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Pass Rate</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Disposition</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="qc in qcs" :key="qc.id" class="group hover:bg-violet-50/30 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-2">
                  <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                    <i class="pi pi-check text-xs" />
                  </div>
                  <div>
                    <p class="font-mono text-sm font-bold text-violet-700">{{ qc.workOrder?.code }}</p>
                    <p v-if="qc.inspectedBy" class="text-xs text-slate-400">{{ qc.inspectedBy }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 text-sm text-slate-600">{{ fmtDate(qc.qcDate || qc.createdAt) }}</td>
              <td class="px-5 py-4 text-right font-mono text-sm font-bold text-slate-700">{{ Number(qc.qtyInspected).toLocaleString() }}</td>
              <td class="px-5 py-4 text-right font-mono text-sm font-bold text-emerald-600">{{ Number(qc.qtyPassed).toLocaleString() }}</td>
              <td class="px-5 py-4 text-right font-mono text-sm font-bold" :class="Number(qc.qtyFailed) > 0 ? 'text-red-600' : 'text-slate-400'">{{ Number(qc.qtyFailed).toLocaleString() }}</td>
              <td class="px-5 py-4 text-center">
                <div class="flex items-center gap-2 justify-center">
                  <div class="relative h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                    <div :style="{ width: passRate(qc) + '%' }" :class="passRate(qc) >= 95 ? 'bg-emerald-500' : passRate(qc) >= 80 ? 'bg-amber-500' : 'bg-red-500'" class="absolute h-full rounded-full" />
                  </div>
                  <span class="font-mono text-xs font-bold text-slate-700">{{ passRate(qc) }}%</span>
                </div>
              </td>
              <td class="px-5 py-4">
                <span :class="qcStatusBadge(qc.status)" class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold">
                  <span :class="qcStatusDot(qc.status)" class="h-1.5 w-1.5 rounded-full" />
                  {{ qc.status }}
                </span>
              </td>
              <td class="px-5 py-4">
                <span :class="dispositionBadge(qc.disposition)" class="rounded-full px-2.5 py-1 text-xs font-semibold">{{ qc.disposition || 'PENDING' }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="toastMsg" :class="toastType === 'error' ? 'bg-red-500' : 'bg-emerald-500'" class="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-medium text-white shadow-xl">
        <i :class="toastType === 'error' ? 'pi-times-circle' : 'pi-check-circle'" class="pi text-base" />
        {{ toastMsg }}
      </div>
    </transition>

    <!-- Detail Drawer -->
    <transition name="slide-right">
      <div v-if="detailOpen" class="fixed inset-y-0 right-0 z-50 flex">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" @click="detailOpen = false" />
        <div class="relative ml-auto flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl">
          <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/90 px-6 py-4 backdrop-blur">
            <div class="flex items-center gap-3">
              <div :class="detailType === 'issue' ? 'from-orange-500 to-rose-500' : 'from-emerald-500 to-teal-500'" class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br">
                <i :class="detailType === 'issue' ? 'pi-arrow-right' : 'pi-inbox'" class="pi text-sm text-white" />
              </div>
              <div>
                <p class="font-mono text-sm font-bold" :class="detailType === 'issue' ? 'text-orange-700' : 'text-emerald-700'">{{ detailItem?.code }}</p>
                <p class="text-xs text-slate-500">{{ detailType === 'issue' ? 'Production Issue' : 'Production Receipt' }} · {{ detailItem?.workOrder?.code }}</p>
              </div>
            </div>
            <button class="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-slate-100" @click="detailOpen = false">
              <i class="pi pi-times text-slate-500" />
            </button>
          </div>

          <div class="flex-1 p-6 space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Tanggal</p>
                <p class="mt-1 text-sm font-semibold text-slate-800">{{ fmtDate(detailItem?.issueDate || detailItem?.receiptDate) }}</p>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Status</p>
                <p class="mt-1 text-sm font-semibold text-slate-800">{{ detailItem?.status }}</p>
              </div>
              <div v-if="detailType === 'issue'" class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Issued By</p>
                <p class="mt-1 text-sm font-semibold text-slate-800">{{ detailItem?.issuedBy || '—' }}</p>
              </div>
              <div v-if="detailType === 'receipt'" class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Qty Produced</p>
                <p class="mt-1 text-sm font-bold text-emerald-700">{{ Number(detailItem?.qtyProduced).toLocaleString() }} {{ detailItem?.uomCode }}</p>
              </div>
              <div v-if="detailType === 'receipt'" class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Qty Rejected</p>
                <p class="mt-1 text-sm font-bold" :class="Number(detailItem?.qtyRejected) > 0 ? 'text-red-600' : 'text-slate-400'">{{ Number(detailItem?.qtyRejected || 0).toLocaleString() }}</p>
              </div>
              <div v-if="detailType === 'receipt' && detailItem?.batchNo" class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Batch No</p>
                <p class="mt-1 font-mono text-sm font-bold text-slate-800">{{ detailItem.batchNo }}</p>
              </div>
              <div v-if="detailItem?.shiftNo" class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Shift</p>
                <p class="mt-1 text-sm font-semibold text-slate-800">Shift {{ detailItem.shiftNo }}</p>
              </div>
              <div v-if="detailItem?.notes" class="col-span-2 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p class="text-xs font-semibold text-amber-700"><i class="pi pi-info-circle mr-1" />Notes</p>
                <p class="mt-1 text-sm text-amber-800">{{ detailItem.notes }}</p>
              </div>
            </div>

            <!-- Issue Items -->
            <div v-if="detailType === 'issue' && detailItem?.items?.length > 0">
              <h3 class="text-sm font-bold text-slate-700 mb-3">Items yang Diissue</h3>
              <div class="space-y-2">
                <div v-for="(it, idx) in detailItem.items" :key="it.id" class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div class="flex items-center gap-3">
                    <span class="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">{{ idx + 1 }}</span>
                    <div>
                      <p class="text-sm font-semibold text-slate-800">{{ it.item?.code }}</p>
                      <p class="text-xs text-slate-500">{{ it.item?.name }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-mono text-sm font-bold text-slate-700">{{ Number(it.qty).toLocaleString() }} {{ it.uomCode }}</p>
                    <p v-if="it.qtyRequired" class="text-xs text-slate-400">Required: {{ Number(it.qtyRequired).toLocaleString() }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="sticky bottom-0 border-t border-slate-100 bg-white/90 px-6 py-4 backdrop-blur">
            <button class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" @click="detailOpen = false">Tutup</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Create Modal -->
    <transition name="modal">
      <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeDialog" />
        <div class="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div class="flex items-center gap-3">
              <div :class="activeTab === 'issues' ? 'from-orange-500 to-rose-500' : activeTab === 'receipts' ? 'from-emerald-500 to-teal-500' : 'from-violet-500 to-indigo-500'" class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br">
                <i :class="activeTab === 'issues' ? 'pi-arrow-right' : activeTab === 'receipts' ? 'pi-inbox' : 'pi-check-square'" class="pi text-sm text-white" />
              </div>
              <div>
                <h2 class="text-base font-bold text-slate-800">New {{ tabLabel }}</h2>
                <p class="text-xs text-slate-500">Isi informasi {{ tabLabel }} baru</p>
              </div>
            </div>
            <button class="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-slate-100" @click="closeDialog">
              <i class="pi pi-times text-slate-500" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-5">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-600">Kode <span class="text-red-500">*</span></label>
                <input v-model="form.code" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" :placeholder="activeTab === 'issues' ? 'PI-001' : activeTab === 'receipts' ? 'PR-001' : 'QC-001'" />
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-600">Work Order <span class="text-red-500">*</span></label>
                <select v-model="form.workOrderId" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100">
                  <option value="">— Pilih Work Order —</option>
                  <option v-for="wo in workOrders" :key="wo.id" :value="wo.id">{{ wo.code }} · {{ wo.finishedGood?.name }}</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-600">Tanggal <span class="text-red-500">*</span></label>
                <input v-model="form.date" type="date" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
              </div>
              <div v-if="activeTab !== 'qc'" class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-600">Shift</label>
                <select v-model="form.shiftNo" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100">
                  <option value="">— Pilih Shift —</option>
                  <option value="1">Shift 1 (06:00 - 14:00)</option>
                  <option value="2">Shift 2 (14:00 - 22:00)</option>
                  <option value="3">Shift 3 (22:00 - 06:00)</option>
                </select>
              </div>

              <!-- Receipt specific -->
              <template v-if="activeTab === 'receipts'">
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Qty Produced <span class="text-red-500">*</span></label>
                  <input v-model="form.qtyProduced" type="number" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" placeholder="0" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Qty Rejected</label>
                  <input v-model="form.qtyRejected" type="number" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100" placeholder="0" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">UOM</label>
                  <input v-model="form.uomCode" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400" placeholder="PCS" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Batch No</label>
                  <input v-model="form.batchNo" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400" placeholder="BATCH-001" />
                </div>
              </template>

              <!-- QC specific -->
              <template v-if="activeTab === 'qc'">
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Qty Inspected <span class="text-red-500">*</span></label>
                  <input v-model="form.qtyInspected" type="number" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" placeholder="0" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Qty Passed</label>
                  <input v-model="form.qtyPassed" type="number" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400" placeholder="0" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Qty Failed</label>
                  <input v-model="form.qtyFailed" type="number" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-red-400" placeholder="0" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Disposition</label>
                  <select v-model="form.disposition" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100">
                    <option value="PENDING">Pending</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="REWORK">Rework</option>
                  </select>
                </div>
              </template>

              <div class="space-y-1.5 md:col-span-2">
                <label class="text-xs font-semibold text-slate-600">Notes</label>
                <input v-model="form.notes" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400" placeholder="Catatan tambahan..." />
              </div>
            </div>

            <!-- Issue items -->
            <div v-if="activeTab === 'issues'">
              <div class="mb-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <h3 class="text-sm font-bold text-slate-700">Items yang Diissue</h3>
                  <span class="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-600">{{ form.items.length }}</span>
                </div>
                <button class="flex items-center gap-1.5 rounded-xl border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 hover:bg-orange-100 transition" @click="addItem">
                  <i class="pi pi-plus text-[10px]" /> Tambah Item
                </button>
              </div>
              <div v-if="form.items.length === 0" class="flex flex-col items-center rounded-xl border border-dashed border-slate-200 py-6 text-slate-400">
                <i class="pi pi-box text-3xl" />
                <p class="mt-2 text-sm">Tambah items untuk diissue dari gudang</p>
              </div>
              <div v-else class="overflow-hidden rounded-xl border border-slate-100">
                <table class="w-full">
                  <thead class="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th class="px-4 py-2.5 text-left">#</th>
                      <th class="px-4 py-2.5 text-left">Item</th>
                      <th class="px-4 py-2.5 text-right">Qty</th>
                      <th class="px-4 py-2.5 text-left">UOM</th>
                      <th class="px-4 py-2.5"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50">
                    <tr v-for="(it, idx) in form.items" :key="idx" class="group hover:bg-slate-50">
                      <td class="px-4 py-2 text-xs font-bold text-slate-400">{{ idx + 1 }}</td>
                      <td class="px-4 py-2">
                        <select v-model="it.itemId" class="h-8 w-48 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-orange-400">
                          <option value="">— Pilih Item —</option>
                          <option v-for="opt in items" :key="opt.id" :value="opt.id">{{ opt.code }} · {{ opt.name }}</option>
                        </select>
                      </td>
                      <td class="px-4 py-2 text-right">
                        <input v-model="it.qty" type="number" class="h-8 w-24 rounded-lg border border-slate-200 bg-white px-2 text-right text-xs outline-none focus:border-orange-400" />
                      </td>
                      <td class="px-4 py-2">
                        <input v-model="it.uomCode" class="h-8 w-16 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-orange-400" placeholder="PCS" />
                      </td>
                      <td class="px-4 py-2 text-right">
                        <button class="invisible flex h-7 w-7 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 group-hover:visible" @click="removeItem(idx)">
                          <i class="pi pi-times text-xs" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <div v-if="dialogError" class="flex items-center gap-2 text-sm text-red-600">
              <i class="pi pi-exclamation-circle" /> {{ dialogError }}
            </div>
            <div v-else />
            <div class="flex items-center gap-2">
              <button class="rounded-xl border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" :disabled="saving" @click="closeDialog">Batal</button>
              <button
                :class="activeTab === 'issues' ? 'from-orange-500 to-rose-500' : activeTab === 'receipts' ? 'from-emerald-500 to-teal-500' : 'from-violet-500 to-indigo-500'"
                class="flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-2 text-sm font-semibold text-white shadow-md disabled:opacity-60"
                :disabled="saving || !form.code || !form.workOrderId"
                @click="save"
              >
                <i v-if="saving" class="pi pi-spinner pi-spin text-xs" />
                <i v-else class="pi pi-check text-xs" />
                {{ saving ? 'Menyimpan...' : 'Simpan' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
const api = useApi();

// State
const loading = ref(false);
const saving = ref(false);
const activeTab = ref<'issues' | 'receipts' | 'qc'>('issues');
const issues = ref<any[]>([]);
const receipts = ref<any[]>([]);
const qcs = ref<any[]>([]);
const workOrders = ref<any[]>([]);
const items = ref<any[]>([]);
const searchQ = ref('');
const dialogOpen = ref(false);
const dialogError = ref<string | null>(null);
const toastMsg = ref<string | null>(null);
const toastType = ref<'success' | 'error'>('success');
const detailOpen = ref(false);
const detailItem = ref<any>(null);
const detailType = ref<'issue' | 'receipt'>('issue');

const form = reactive({
  code: '', workOrderId: '', date: new Date().toISOString().slice(0, 10),
  shiftNo: '', notes: '',
  // Receipt
  qtyProduced: '', qtyRejected: '0', uomCode: '', batchNo: '',
  // QC
  qtyInspected: '', qtyPassed: '', qtyFailed: '', disposition: 'PENDING',
  items: [] as { itemId: string; qty: string; uomCode: string }[]
});

// Computed
const tabLabel = computed(() => activeTab.value === 'issues' ? 'Production Issue' : activeTab.value === 'receipts' ? 'Production Receipt' : 'In-Process QC');

const tabAccentClass = computed(() =>
  activeTab.value === 'issues' ? 'bg-gradient-to-r from-orange-500 to-rose-600 shadow-orange-200' :
  activeTab.value === 'receipts' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-200' :
  'bg-gradient-to-r from-violet-500 to-indigo-600 shadow-violet-200'
);

const filteredIssues = computed(() =>
  issues.value.filter(i => !searchQ.value || i.code?.toLowerCase().includes(searchQ.value.toLowerCase()))
);
const filteredReceipts = computed(() =>
  receipts.value.filter(r => !searchQ.value || r.code?.toLowerCase().includes(searchQ.value.toLowerCase()))
);

const stats = computed(() => [
  { label: 'Total Issues', value: issues.value.length, icon: 'pi-arrow-right-arrow-left', color: 'bg-orange-500' },
  { label: 'Total Receipts', value: receipts.value.length, icon: 'pi-inbox', color: 'bg-emerald-500' },
  { label: 'QC Records', value: qcs.value.length, icon: 'pi-check-square', color: 'bg-violet-500' },
  { label: 'QC Passed', value: qcs.value.filter(q => q.status === 'PASSED').length, icon: 'pi-check-circle', color: 'bg-teal-500' },
]);

// Helpers
const fmtDate = (v: any) => v ? new Date(v).toISOString().slice(0, 10) : '—';
const passRate = (qc: any) => {
  if (!qc.qtyInspected || Number(qc.qtyInspected) === 0) return 0;
  return Math.round((Number(qc.qtyPassed) / Number(qc.qtyInspected)) * 100);
};
const qcStatusBadge = (s: string) => ({
  PENDING: 'bg-slate-100 text-slate-600', IN_PROGRESS: 'bg-amber-100 text-amber-700',
  PASSED: 'bg-emerald-100 text-emerald-700', FAILED: 'bg-red-100 text-red-700'
}[s] || 'bg-slate-100 text-slate-600');
const qcStatusDot = (s: string) => ({
  PENDING: 'bg-slate-400', IN_PROGRESS: 'bg-amber-500', PASSED: 'bg-emerald-500', FAILED: 'bg-red-500'
}[s] || 'bg-slate-400');
const dispositionBadge = (d: string) => ({
  PENDING: 'bg-slate-100 text-slate-600', ACCEPTED: 'bg-emerald-100 text-emerald-700',
  REJECTED: 'bg-red-100 text-red-700', REWORK: 'bg-amber-100 text-amber-700'
}[d] || 'bg-slate-100 text-slate-600');

const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  toastMsg.value = msg; toastType.value = type;
  setTimeout(() => { toastMsg.value = null; }, 3500);
};

// Load
const load = async () => {
  loading.value = true;
  try {
    const [iRes, rRes, qRes] = await Promise.all([
      api.get('/manufacturing/production/issues'),
      api.get('/manufacturing/production/receipts'),
      api.get('/manufacturing/production/qc'),
    ]);
    issues.value = iRes.data?.issues ?? [];
    receipts.value = rRes.data?.receipts ?? [];
    qcs.value = qRes.data?.qcs ?? [];
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal memuat data', 'error');
  } finally {
    loading.value = false;
  }
};

const loadMasterData = async () => {
  const [woRes, itRes] = await Promise.all([
    api.get('/manufacturing/work-orders', { params: { status: '' } }),
    api.get('/inventory/items', { params: { take: 300 } }),
  ]);
  workOrders.value = woRes.data?.workOrders ?? [];
  items.value = itRes.data?.items ?? [];
};

const addItem = () => form.items.push({ itemId: '', qty: '1', uomCode: '' });
const removeItem = (i: number) => form.items.splice(i, 1);

const openCreate = async () => {
  form.code = ''; form.workOrderId = ''; form.date = new Date().toISOString().slice(0, 10);
  form.shiftNo = ''; form.notes = ''; form.qtyProduced = ''; form.qtyRejected = '0';
  form.uomCode = ''; form.batchNo = ''; form.qtyInspected = ''; form.qtyPassed = '';
  form.qtyFailed = ''; form.disposition = 'PENDING'; form.items = [];
  dialogError.value = null;
  await loadMasterData();
  dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };

const openDetail = (item: any, type: 'issue' | 'receipt') => {
  detailItem.value = item; detailType.value = type; detailOpen.value = true;
};

const save = async () => {
  saving.value = true; dialogError.value = null;
  try {
    if (activeTab.value === 'issues') {
      await api.post('/manufacturing/production/issues', {
        code: form.code, workOrderId: form.workOrderId,
        issueDate: form.date, notes: form.notes || undefined,
        shiftNo: form.shiftNo ? parseInt(form.shiftNo) : undefined,
        items: form.items.filter(it => it.itemId).map(it => ({
          itemId: it.itemId, qty: parseFloat(it.qty) || 0, uomCode: it.uomCode || undefined
        })),
      });
      showToast('Production Issue berhasil dibuat');
    } else if (activeTab.value === 'receipts') {
      await api.post('/manufacturing/production/receipts', {
        code: form.code, workOrderId: form.workOrderId,
        receiptDate: form.date, notes: form.notes || undefined,
        qtyProduced: parseFloat(form.qtyProduced) || 0,
        qtyRejected: parseFloat(form.qtyRejected) || 0,
        uomCode: form.uomCode || undefined,
        batchNo: form.batchNo || undefined,
        shiftNo: form.shiftNo ? parseInt(form.shiftNo) : undefined,
      });
      showToast('Production Receipt berhasil dibuat');
    } else {
      await api.post('/manufacturing/production/qc', {
        workOrderId: form.workOrderId,
        qtyInspected: parseFloat(form.qtyInspected) || 0,
        qtyPassed: parseFloat(form.qtyPassed) || 0,
        qtyFailed: parseFloat(form.qtyFailed) || 0,
        disposition: form.disposition,
        notes: form.notes || undefined,
        qcDate: form.date,
      });
      showToast('QC record berhasil dibuat');
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    dialogError.value = e?.response?.data?.message ?? 'Gagal menyimpan';
  } finally {
    saving.value = false;
  }
};

onMounted(load);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(10px); }
.modal-enter-active { transition: all 0.25s ease; }
.modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.slide-right-enter-active { transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.slide-right-leave-active { transition: all 0.25s ease; }
.slide-right-enter-from, .slide-right-leave-to { opacity: 0; }
</style>