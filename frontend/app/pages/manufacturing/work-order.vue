<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/20 to-indigo-50/20 p-6">

    <!-- Header -->
    <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-200">
          <i class="pi pi-list-check text-xl text-white" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-slate-800">Work Orders</h1>
          <p class="text-sm text-slate-500">Kelola perintah kerja produksi — dari DRAFT hingga COMPLETED</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm md:flex">
          <i class="pi pi-list text-violet-500" />
          <span class="font-semibold text-slate-700">{{ workOrders.length }}</span> Work Orders
        </div>
        <button
          class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all hover:scale-105 hover:shadow-violet-300 active:scale-95 disabled:opacity-50"
          :disabled="loading"
          @click="openCreate"
        >
          <i class="pi pi-plus text-xs" />
          New Work Order
        </button>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
      <div v-for="stat in stats" :key="stat.label" :class="stat.active ? 'ring-2 ring-offset-1 ' + stat.ring : ''"
        class="cursor-pointer rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md"
        @click="filterByStatus(stat.filterVal)"
      >
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

    <!-- Search bar -->
    <div class="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row md:items-center">
      <div class="relative flex-1">
        <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          v-model="q"
          type="text"
          placeholder="Cari kode WO, produk..."
          class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
          @keyup.enter="load"
        />
      </div>
      <div class="flex items-center gap-2">
        <select v-model="statusFilter" class="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100">
          <option value="">All Status</option>
          <option value="DRAFT">Draft</option>
          <option value="RELEASED">Released</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELED">Canceled</option>
        </select>
        <select v-model="priorityFilter" class="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100">
          <option value="">All Priority</option>
          <option value="high">High (≥80)</option>
          <option value="medium">Medium (50-79)</option>
          <option value="low">Low ({"<"}50)</option>
        </select>
        <button
          class="flex h-10 items-center gap-2 rounded-xl bg-slate-800 px-4 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
          :disabled="loading"
          @click="load"
        >
          <i v-if="loading" class="pi pi-spinner pi-spin text-xs" />
          <i v-else class="pi pi-filter text-xs" />
          Filter
        </button>
      </div>
    </div>

    <!-- Work Orders Table -->
    <div class="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="flex flex-col items-center gap-3">
          <div class="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-500" />
          <p class="text-sm text-slate-500">Memuat Work Orders...</p>
        </div>
      </div>

      <div v-else-if="filteredWorkOrders.length === 0" class="flex flex-col items-center justify-center py-20">
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <i class="pi pi-list-check text-3xl text-slate-400" />
        </div>
        <p class="mt-4 font-semibold text-slate-700">Tidak ada Work Order</p>
        <p class="mt-1 text-sm text-slate-500">Klik "New Work Order" untuk membuat perintah kerja</p>
        <button class="mt-5 flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-600" @click="openCreate">
          <i class="pi pi-plus text-xs" /> New Work Order
        </button>
      </div>

      <table v-else class="w-full">
        <thead class="border-b border-slate-100 bg-slate-50/80">
          <tr>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">WO Code</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Finished Good</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Work Center</th>
            <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Qty Plan</th>
            <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Progress</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Jadwal</th>
            <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr
            v-for="wo in filteredWorkOrders"
            :key="wo.id"
            class="group cursor-pointer transition-colors hover:bg-violet-50/30"
            @click="openDetail(wo)"
          >
            <td class="px-5 py-4">
              <div class="flex items-center gap-2">
                <span :class="priorityDot(wo.priority)" class="h-2 w-2 flex-shrink-0 rounded-full" />
                <div>
                  <p class="font-mono text-sm font-bold text-violet-700">{{ wo.code }}</p>
                  <p v-if="wo.productionOrder" class="text-xs text-slate-400">{{ wo.productionOrder }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4">
              <div class="text-sm font-semibold text-slate-800">{{ wo.finishedGood?.code }}</div>
              <div class="text-xs text-slate-500 truncate max-w-[140px]">{{ wo.finishedGood?.name }}</div>
            </td>
            <td class="px-5 py-4">
              <div class="text-sm text-slate-700">{{ wo.workCenter || '—' }}</div>
              <div v-if="wo.scheduleType === 'URGENT'" class="mt-0.5 inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                <i class="pi pi-bolt text-[10px]" /> URGENT
              </div>
            </td>
            <td class="px-5 py-4 text-right">
              <span class="font-mono text-sm font-bold text-slate-700">{{ Number(wo.qtyPlanned).toLocaleString() }}</span>
              <span class="ml-1 text-xs text-slate-400">{{ wo.uomCode || 'PCS' }}</span>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-2">
                <div class="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    :style="{ width: progressPct(wo) + '%' }"
                    :class="progressColor(wo)"
                    class="absolute h-full rounded-full transition-all"
                  />
                </div>
                <span class="w-10 text-right font-mono text-xs font-semibold text-slate-600">{{ progressPct(wo) }}%</span>
              </div>
              <div class="mt-0.5 text-xs text-slate-400">{{ Number(wo.qtyProduced).toLocaleString() }} / {{ Number(wo.qtyPlanned).toLocaleString() }}</div>
            </td>
            <td class="px-5 py-4">
              <span :class="statusBadge(wo.status)" class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold">
                <span :class="statusDot(wo.status)" class="h-1.5 w-1.5 rounded-full" />
                {{ wo.status.replace('_', ' ') }}
              </span>
            </td>
            <td class="px-5 py-4">
              <div v-if="wo.plannedStartDate" class="text-xs text-slate-600">
                <i class="pi pi-calendar text-slate-400 mr-1" />{{ fmtDate(wo.plannedStartDate) }}
              </div>
              <div v-if="wo.plannedEndDate" :class="isOverdue(wo) ? 'text-red-600 font-semibold' : 'text-slate-400'" class="text-xs">
                → {{ fmtDate(wo.plannedEndDate) }}
                <span v-if="isOverdue(wo)" class="ml-1">⚠</span>
              </div>
            </td>
            <td class="px-5 py-4 text-right">
              <div class="inline-flex gap-1.5" @click.stop>
                <button
                  v-if="wo.status === 'DRAFT'"
                  class="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition"
                  @click="release(wo)"
                >Release</button>
                <button
                  v-if="wo.status === 'IN_PROGRESS' || wo.status === 'RELEASED'"
                  class="rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition"
                  @click="openComplete(wo)"
                >Complete</button>
                <button
                  v-if="wo.status === 'DRAFT'"
                  class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 transition"
                  @click="openEdit(wo)"
                >Edit</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="toastMsg" :class="toastType === 'error' ? 'bg-red-500' : 'bg-emerald-500'" class="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-medium text-white shadow-xl">
        <i :class="toastType === 'error' ? 'pi-times-circle' : 'pi-check-circle'" class="pi text-base" />
        {{ toastMsg }}
      </div>
    </transition>

    <!-- ========== DETAIL DRAWER ========== -->
    <transition name="slide-right">
      <div v-if="detailOpen" class="fixed inset-y-0 right-0 z-50 flex">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" @click="detailOpen = false" />
        <div class="relative ml-auto flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-white shadow-2xl">
          <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/90 px-6 py-4 backdrop-blur">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600">
                <i class="pi pi-list-check text-sm text-white" />
              </div>
              <div>
                <p class="font-mono text-sm font-bold text-violet-700">{{ detailWo?.code }}</p>
                <span :class="statusBadge(detailWo?.status)" class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  {{ detailWo?.status }}
                </span>
              </div>
            </div>
            <button class="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-slate-100" @click="detailOpen = false">
              <i class="pi pi-times text-slate-500" />
            </button>
          </div>

          <!-- Detail tabs -->
          <div class="border-b border-slate-100 px-6">
            <div class="flex gap-1">
              <button v-for="tab in detailTabs" :key="tab.key"
                :class="activeDetailTab === tab.key ? 'border-b-2 border-violet-500 text-violet-600 font-semibold' : 'text-slate-500 hover:text-slate-700'"
                class="px-4 py-3 text-sm transition-colors"
                @click="activeDetailTab = tab.key"
              >{{ tab.label }}</button>
            </div>
          </div>

          <!-- Tab: Overview -->
          <div v-if="activeDetailTab === 'overview'" class="flex-1 p-6 space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">BOM</p>
                <p class="mt-1 text-sm font-semibold text-slate-800">{{ detailWo?.bom?.code || '—' }}</p>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Priority</p>
                <div class="mt-1 flex items-center gap-2">
                  <span :class="priorityDot(detailWo?.priority)" class="h-3 w-3 rounded-full" />
                  <span class="text-sm font-semibold text-slate-800">{{ detailWo?.priority || 50 }}</span>
                </div>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Qty Planned</p>
                <p class="mt-1 text-sm font-semibold text-slate-800">{{ Number(detailWo?.qtyPlanned).toLocaleString() }} {{ detailWo?.uomCode }}</p>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Qty Produced</p>
                <p class="mt-1 text-sm font-semibold text-emerald-700">{{ Number(detailWo?.qtyProduced).toLocaleString() }}</p>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Work Center</p>
                <p class="mt-1 text-sm font-semibold text-slate-800">{{ detailWo?.workCenter || '—' }}</p>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Schedule Type</p>
                <p class="mt-1 text-sm font-semibold text-slate-800">{{ detailWo?.scheduleType || '—' }}</p>
              </div>
              <div class="col-span-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Progress</p>
                <div class="mt-2 flex items-center gap-3">
                  <div class="relative h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div :style="{ width: progressPct(detailWo) + '%' }" :class="progressColor(detailWo)" class="absolute h-full rounded-full" />
                  </div>
                  <span class="font-bold text-slate-800">{{ progressPct(detailWo) }}%</span>
                </div>
              </div>
              <div v-if="detailWo?.notes" class="col-span-2 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p class="text-xs font-semibold text-amber-700"><i class="pi pi-info-circle mr-1" />Notes</p>
                <p class="mt-1 text-sm text-amber-800">{{ detailWo.notes }}</p>
              </div>
            </div>
          </div>

          <!-- Tab: Components -->
          <div v-if="activeDetailTab === 'components'" class="flex-1 p-6">
            <div v-if="!detailWo?.components || detailWo.components.length === 0" class="flex flex-col items-center py-10 text-slate-400">
              <i class="pi pi-box text-4xl" />
              <p class="mt-3 text-sm">Tidak ada komponen</p>
            </div>
            <div v-else class="space-y-2">
              <div v-for="(c, i) in detailWo.components" :key="c.id" class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold text-violet-600 shadow-sm border border-slate-100">{{ i + 1 }}</div>
                  <div>
                    <p class="text-sm font-semibold text-slate-800">{{ c.item?.code }}</p>
                    <p class="text-xs text-slate-500">{{ c.item?.name }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-mono text-sm font-bold text-slate-700">{{ Number(c.qtyRequired).toLocaleString() }} <span class="font-normal text-slate-400 text-xs">{{ c.uomCode }}</span></p>
                  <div class="flex items-center gap-2 justify-end mt-0.5">
                    <span class="text-xs text-slate-400">Issued: {{ Number(c.qtyIssued).toLocaleString() }}</span>
                    <span v-if="c.issueMethod" class="text-xs text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">{{ c.issueMethod }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab: Operations -->
          <div v-if="activeDetailTab === 'operations'" class="flex-1 p-6">
            <div v-if="!detailWo?.operations || detailWo.operations.length === 0" class="flex flex-col items-center py-10 text-slate-400">
              <i class="pi pi-cog text-4xl" />
              <p class="mt-3 text-sm">Tidak ada operasi routing</p>
            </div>
            <div v-else class="relative pl-6">
              <div class="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-100" />
              <div v-for="op in detailWo.operations" :key="op.id" class="relative mb-4">
                <div class="absolute -left-6 top-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white shadow" :class="opStatusColor(op.status)">
                  {{ op.operationNo }}
                </div>
                <div class="rounded-xl border border-slate-100 bg-white p-4 shadow-sm ml-2">
                  <div class="flex items-start justify-between">
                    <div>
                      <p class="font-semibold text-slate-800">{{ op.description }}</p>
                      <p class="text-xs text-slate-500 mt-0.5"><i class="pi pi-map-marker mr-1" />{{ op.workstation }}</p>
                    </div>
                    <span :class="opStatusBadge(op.status)" class="rounded-full px-2.5 py-1 text-xs font-semibold">{{ op.status }}</span>
                  </div>
                  <div class="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span v-if="op.setupTime">Setup: <strong>{{ op.setupTime }}m</strong></span>
                    <span v-if="op.laborHours">Labor: <strong>{{ op.laborHours }}h</strong></span>
                    <span v-if="op.actualLaborHours" class="text-emerald-600">Actual: <strong>{{ op.actualLaborHours }}h</strong></span>
                    <span v-if="op.machineHours">Machine: <strong>{{ op.machineHours }}h</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="sticky bottom-0 flex items-center justify-between border-t border-slate-100 bg-white/90 px-6 py-4 backdrop-blur">
            <button class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" @click="detailOpen = false">Tutup</button>
            <div class="flex gap-2">
              <button v-if="detailWo?.status === 'DRAFT'" class="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600" @click="release(detailWo); detailOpen = false">Release</button>
              <button v-if="detailWo?.status === 'RELEASED' || detailWo?.status === 'IN_PROGRESS'" class="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600" @click="openComplete(detailWo); detailOpen = false">Complete</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ========== FORM MODAL ========== -->
    <transition name="modal">
      <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeDialog" />
        <div class="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600">
                <i class="pi pi-list-check text-sm text-white" />
              </div>
              <div>
                <h2 class="text-base font-bold text-slate-800">{{ editingId ? 'Edit Work Order' : 'Buat Work Order Baru' }}</h2>
                <p class="text-xs text-slate-500">Isi detail perintah kerja produksi</p>
              </div>
            </div>
            <button class="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-slate-100" @click="closeDialog">
              <i class="pi pi-times text-slate-500" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-6">

            <!-- Section: WO Info -->
            <div>
              <div class="mb-4 flex items-center gap-2">
                <div class="h-1.5 w-1.5 rounded-full bg-violet-500" />
                <h3 class="text-sm font-bold text-slate-700">Informasi Work Order</h3>
              </div>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Kode WO <span class="text-red-500">*</span></label>
                  <input v-model="form.code" :disabled="Boolean(editingId)" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-50 disabled:cursor-not-allowed" placeholder="WO-001" />
                </div>
                <div class="space-y-1.5 md:col-span-2">
                  <label class="text-xs font-semibold text-slate-600">BOM (opsional)</label>
                  <select v-model="form.bomId" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100">
                    <option value="">— Tanpa BOM —</option>
                    <option v-for="b in boms" :key="b.id" :value="b.id">{{ b.code }} · {{ b.name }}</option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Finished Good <span class="text-red-500">*</span></label>
                  <select v-model="form.finishedGoodItemId" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100">
                    <option value="">— Pilih Item —</option>
                    <option v-for="it in items" :key="it.id" :value="it.id">{{ it.code }} · {{ it.name }}</option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Qty Planned <span class="text-red-500">*</span></label>
                  <input v-model="form.qtyPlanned" type="number" min="1" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" placeholder="0" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">UOM</label>
                  <input v-model="form.uomCode" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" placeholder="PCS" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Work Center</label>
                  <input v-model="form.workCenter" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" placeholder="Line Produksi A" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Schedule Type</label>
                  <select v-model="form.scheduleType" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100">
                    <option value="PLANNED">Planned</option>
                    <option value="URGENT">Urgent</option>
                    <option value="MRP">From MRP</option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Priority (1-100)</label>
                  <input v-model="form.priority" type="number" min="1" max="100" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" placeholder="50" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Production Order No.</label>
                  <input v-model="form.productionOrder" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" placeholder="PO-001" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Planned Start</label>
                  <input v-model="form.plannedStartDate" type="date" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Planned End</label>
                  <input v-model="form.plannedEndDate" type="date" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
                </div>
                <div class="space-y-1.5 md:col-span-3">
                  <label class="text-xs font-semibold text-slate-600">Notes</label>
                  <input v-model="form.notes" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" placeholder="Catatan tambahan..." />
                </div>
              </div>
            </div>

            <!-- Components section -->
            <div>
              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <h3 class="text-sm font-bold text-slate-700">Komponen Material</h3>
                  <span class="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-600">{{ form.components.length }}</span>
                </div>
                <button class="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition" @click="addComponent">
                  <i class="pi pi-plus text-[10px]" /> Tambah Komponen
                </button>
              </div>

              <div v-if="form.components.length === 0" class="flex flex-col items-center rounded-xl border border-dashed border-slate-200 py-6 text-slate-400">
                <i class="pi pi-box text-3xl" />
                <p class="mt-2 text-sm">Klik "Tambah Komponen" atau pilih BOM untuk auto-fill</p>
              </div>

              <div v-else class="overflow-hidden rounded-xl border border-slate-100">
                <table class="w-full">
                  <thead class="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th class="px-4 py-2.5 text-left">#</th>
                      <th class="px-4 py-2.5 text-left">Item</th>
                      <th class="px-4 py-2.5 text-right">Qty</th>
                      <th class="px-4 py-2.5 text-left">UOM</th>
                      <th class="px-4 py-2.5 text-left">Issue Method</th>
                      <th class="px-4 py-2.5 text-center">Op No</th>
                      <th class="px-4 py-2.5"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50">
                    <tr v-for="(c, idx) in form.components" :key="idx" class="group hover:bg-slate-50/50">
                      <td class="px-4 py-2 text-xs font-bold text-slate-400">{{ idx + 1 }}</td>
                      <td class="px-4 py-2">
                        <select v-model="c.itemId" class="h-8 w-52 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100">
                          <option value="">— Item —</option>
                          <option v-for="it in items" :key="it.id" :value="it.id">{{ it.code }} · {{ it.name }}</option>
                        </select>
                      </td>
                      <td class="px-4 py-2 text-right">
                        <input v-model="c.qtyRequired" type="number" class="h-8 w-24 rounded-lg border border-slate-200 bg-white px-2 text-right text-xs outline-none focus:border-indigo-400" />
                      </td>
                      <td class="px-4 py-2">
                        <input v-model="c.uomCode" class="h-8 w-16 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-indigo-400" placeholder="PCS" />
                      </td>
                      <td class="px-4 py-2">
                        <select v-model="c.issueMethod" class="h-8 w-28 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-indigo-400">
                          <option value="BACKFLUSH">Backflush</option>
                          <option value="MANUAL">Manual</option>
                          <option value="PICK">Pick</option>
                        </select>
                      </td>
                      <td class="px-4 py-2 text-center">
                        <input v-model="c.operationNo" type="number" class="h-8 w-14 rounded-lg border border-slate-200 bg-white px-2 text-center text-xs outline-none focus:border-indigo-400" placeholder="—" />
                      </td>
                      <td class="px-4 py-2 text-right">
                        <button class="invisible flex h-7 w-7 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 group-hover:visible" @click="removeComponent(idx)">
                          <i class="pi pi-times text-xs" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Operations section -->
            <div>
              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <h3 class="text-sm font-bold text-slate-700">Operations / Routing</h3>
                  <span class="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-600">{{ form.operations.length }}</span>
                </div>
                <button class="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600 hover:bg-amber-100 transition" @click="addOperation">
                  <i class="pi pi-plus text-[10px]" /> Tambah Operasi
                </button>
              </div>

              <div v-if="form.operations.length === 0" class="flex flex-col items-center rounded-xl border border-dashed border-slate-200 py-6 text-slate-400">
                <i class="pi pi-cog text-3xl" />
                <p class="mt-2 text-sm">Klik "Tambah Operasi" atau pilih BOM untuk auto-fill routing</p>
              </div>
              <div v-else class="space-y-2">
                <div v-for="(op, idx) in form.operations" :key="idx" class="group grid grid-cols-7 gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div class="space-y-1 col-span-1">
                    <label class="text-[10px] text-slate-400 font-semibold">Op No</label>
                    <input v-model="op.operationNo" type="number" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-center text-xs outline-none focus:border-amber-400" />
                  </div>
                  <div class="space-y-1 col-span-2">
                    <label class="text-[10px] text-slate-400 font-semibold">Workstation</label>
                    <input v-model="op.workstation" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-amber-400" placeholder="Mesin A" />
                  </div>
                  <div class="space-y-1 col-span-3">
                    <label class="text-[10px] text-slate-400 font-semibold">Deskripsi</label>
                    <input v-model="op.description" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-amber-400" />
                  </div>
                  <div class="flex items-end justify-end">
                    <button class="invisible flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 group-hover:visible" @click="removeOperation(idx)">
                      <i class="pi pi-times text-xs" />
                    </button>
                  </div>
                  <div class="space-y-1 col-span-1">
                    <label class="text-[10px] text-slate-400 font-semibold">Setup (min)</label>
                    <input v-model="op.setupTime" type="number" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-amber-400" />
                  </div>
                  <div class="space-y-1 col-span-1">
                    <label class="text-[10px] text-slate-400 font-semibold">Labor (jam)</label>
                    <input v-model="op.laborHours" type="number" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-amber-400" />
                  </div>
                  <div class="space-y-1 col-span-5">
                    <label class="text-[10px] text-slate-400 font-semibold">Notes</label>
                    <input v-model="op.notes" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-amber-400" />
                  </div>
                </div>
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
                class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md disabled:opacity-60"
                :disabled="saving || !form.code || !form.finishedGoodItemId || !form.qtyPlanned"
                @click="save"
              >
                <i v-if="saving" class="pi pi-spinner pi-spin text-xs" />
                <i v-else class="pi pi-check text-xs" />
                {{ saving ? 'Menyimpan...' : (editingId ? 'Simpan' : 'Buat WO') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Complete Dialog -->
    <transition name="modal">
      <div v-if="completeDialogOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="completeDialogOpen = false" />
        <div class="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 mx-auto">
            <i class="pi pi-check text-xl text-emerald-500" />
          </div>
          <h3 class="mt-4 text-center text-base font-bold text-slate-800">Complete Work Order</h3>
          <p class="mt-1 text-center text-sm text-slate-500">{{ completingWo?.code }}</p>
          <div class="mt-4 space-y-3">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Qty Produced <span class="text-red-500">*</span></label>
              <input v-model="completeForm.qtyProduced" type="number" class="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Qty Rejected</label>
              <input v-model="completeForm.qtyRejected" type="number" class="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Notes</label>
              <input v-model="completeForm.notes" class="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-400" placeholder="Opsional..." />
            </div>
          </div>
          <div class="mt-5 flex gap-3">
            <button class="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50" @click="completeDialogOpen = false">Batal</button>
            <button class="flex-1 rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60" :disabled="saving || !completeForm.qtyProduced" @click="doComplete">
              <i v-if="saving" class="pi pi-spinner pi-spin mr-1" />Complete
            </button>
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
const workOrders = ref<any[]>([]);
const items = ref<any[]>([]);
const boms = ref<any[]>([]);
const q = ref('');
const statusFilter = ref('');
const priorityFilter = ref('');
const dialogError = ref<string | null>(null);
const toastMsg = ref<string | null>(null);
const toastType = ref<'success' | 'error'>('success');

// Dialog
const dialogOpen = ref(false);
const editingId = ref<string | null>(null);

// Detail
const detailOpen = ref(false);
const detailWo = ref<any>(null);
const activeDetailTab = ref('overview');
const detailTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'components', label: 'Komponen' },
  { key: 'operations', label: 'Routing' },
];

// Complete dialog
const completeDialogOpen = ref(false);
const completingWo = ref<any>(null);
const completeForm = reactive({ qtyProduced: '', qtyRejected: '0', notes: '' });

const form = reactive({
  code: '',
  bomId: '',
  finishedGoodItemId: '',
  qtyPlanned: '',
  uomCode: '',
  workCenter: '',
  scheduleType: 'PLANNED',
  priority: '50',
  productionOrder: '',
  plannedStartDate: '',
  plannedEndDate: '',
  notes: '',
  components: [] as any[],
  operations: [] as any[],
});

// Computed
const filteredWorkOrders = computed(() => {
  return workOrders.value
    .filter(wo => !q.value || wo.code?.toLowerCase().includes(q.value.toLowerCase()) || wo.finishedGood?.code?.toLowerCase().includes(q.value.toLowerCase()))
    .filter(wo => !statusFilter.value || wo.status === statusFilter.value)
    .filter(wo => {
      if (!priorityFilter.value) return true;
      const p = wo.priority || 50;
      if (priorityFilter.value === 'high') return p >= 80;
      if (priorityFilter.value === 'medium') return p >= 50 && p < 80;
      return p < 50;
    })
    .sort((a, b) => (b.priority || 50) - (a.priority || 50));
});

const stats = computed(() => {
  const all = workOrders.value;
  const active = statusFilter.value;
  return [
    { label: 'All WO', value: all.length, icon: 'pi-list', color: 'bg-slate-500', filterVal: '', ring: 'ring-slate-400', active: !active },
    { label: 'Draft', value: all.filter(w => w.status === 'DRAFT').length, icon: 'pi-file', color: 'bg-slate-400', filterVal: 'DRAFT', ring: 'ring-slate-400', active: active === 'DRAFT' },
    { label: 'Released', value: all.filter(w => w.status === 'RELEASED').length, icon: 'pi-send', color: 'bg-blue-500', filterVal: 'RELEASED', ring: 'ring-blue-400', active: active === 'RELEASED' },
    { label: 'In Progress', value: all.filter(w => w.status === 'IN_PROGRESS').length, icon: 'pi-spin pi-cog', color: 'bg-amber-500', filterVal: 'IN_PROGRESS', ring: 'ring-amber-400', active: active === 'IN_PROGRESS' },
    { label: 'Completed', value: all.filter(w => w.status === 'COMPLETED').length, icon: 'pi-check-circle', color: 'bg-emerald-500', filterVal: 'COMPLETED', ring: 'ring-emerald-400', active: active === 'COMPLETED' },
  ];
});

// Helpers
const fmtDate = (v: string | Date | null) => v ? new Date(v as string).toISOString().slice(0, 10) : '—';
const progressPct = (wo: any) => {
  if (!wo?.qtyPlanned || Number(wo.qtyPlanned) === 0) return 0;
  return Math.min(100, Math.round((Number(wo.qtyProduced) / Number(wo.qtyPlanned)) * 100));
};
const progressColor = (wo: any) => {
  const p = progressPct(wo);
  if (p >= 100) return 'bg-emerald-500';
  if (p >= 50) return 'bg-blue-500';
  if (p > 0) return 'bg-amber-500';
  return 'bg-slate-300';
};
const isOverdue = (wo: any) => wo.status !== 'COMPLETED' && wo.plannedEndDate && new Date(wo.plannedEndDate) < new Date();
const priorityDot = (p: number) => {
  if (!p || p < 40) return 'bg-slate-300';
  if (p < 60) return 'bg-blue-400';
  if (p < 80) return 'bg-amber-400';
  return 'bg-red-500';
};
const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    DRAFT: 'bg-slate-100 text-slate-600',
    RELEASED: 'bg-blue-100 text-blue-700',
    IN_PROGRESS: 'bg-amber-100 text-amber-700',
    COMPLETED: 'bg-emerald-100 text-emerald-700',
    CANCELED: 'bg-red-100 text-red-600',
  };
  return map[status] || 'bg-slate-100 text-slate-600';
};
const statusDot = (status: string) => {
  const map: Record<string, string> = {
    DRAFT: 'bg-slate-400', RELEASED: 'bg-blue-500', IN_PROGRESS: 'bg-amber-500',
    COMPLETED: 'bg-emerald-500', CANCELED: 'bg-red-400',
  };
  return map[status] || 'bg-slate-400';
};
const opStatusColor = (s: string) => s === 'COMPLETED' ? 'bg-emerald-500' : s === 'IN_PROGRESS' ? 'bg-amber-500' : 'bg-slate-400';
const opStatusBadge = (s: string) => ({
  COMPLETED: 'bg-emerald-100 text-emerald-700', IN_PROGRESS: 'bg-amber-100 text-amber-700', PENDING: 'bg-slate-100 text-slate-500'
}[s] || 'bg-slate-100 text-slate-500');

const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  toastMsg.value = msg;
  toastType.value = type;
  setTimeout(() => { toastMsg.value = null; }, 3500);
};

const filterByStatus = (val: string) => { statusFilter.value = val; };

// Data loading
const load = async () => {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.q = q.value;
    if (statusFilter.value) params.status = statusFilter.value;
    const res = await api.get('/manufacturing/work-orders', { params });
    workOrders.value = res.data?.workOrders ?? [];
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal memuat Work Orders', 'error');
  } finally {
    loading.value = false;
  }
};

const loadItems = async () => {
  try {
    const [iRes, bRes] = await Promise.all([
      api.get('/inventory/items', { params: { take: 300 } }),
      api.get('/manufacturing/bom', { params: { isActive: 'true' } }),
    ]);
    items.value = iRes.data?.items ?? [];
    boms.value = bRes.data?.boms ?? [];
  } catch { items.value = []; boms.value = []; }
};

// Form
const resetForm = () => {
  form.code = ''; form.bomId = ''; form.finishedGoodItemId = '';
  form.qtyPlanned = ''; form.uomCode = ''; form.workCenter = '';
  form.scheduleType = 'PLANNED'; form.priority = '50';
  form.productionOrder = ''; form.plannedStartDate = ''; form.plannedEndDate = '';
  form.notes = ''; form.components = []; form.operations = [];
};

const openCreate = async () => {
  editingId.value = null; dialogError.value = null;
  resetForm();
  await loadItems();
  dialogOpen.value = true;
};

const openEdit = async (wo: any) => {
  editingId.value = wo.id; dialogError.value = null;
  form.code = wo.code; form.bomId = wo.bomId ?? '';
  form.finishedGoodItemId = wo.finishedGoodItemId ?? '';
  form.qtyPlanned = String(wo.qtyPlanned); form.uomCode = wo.uomCode ?? '';
  form.workCenter = wo.workCenter ?? ''; form.scheduleType = wo.scheduleType ?? 'PLANNED';
  form.priority = String(wo.priority ?? 50); form.productionOrder = wo.productionOrder ?? '';
  form.plannedStartDate = wo.plannedStartDate ? fmtDate(wo.plannedStartDate) : '';
  form.plannedEndDate = wo.plannedEndDate ? fmtDate(wo.plannedEndDate) : '';
  form.notes = wo.notes ?? '';
  form.components = (wo.components || []).map((c: any) => ({
    itemId: c.itemId, qtyRequired: String(c.qtyRequired), uomCode: c.uomCode ?? '',
    issueMethod: c.issueMethod ?? 'BACKFLUSH', operationNo: c.operationNo ? String(c.operationNo) : ''
  }));
  form.operations = (wo.operations || []).map((op: any) => ({
    lineNo: op.lineNo, operationNo: op.operationNo, description: op.description ?? '',
    workstation: op.workstation ?? '', laborHours: op.laborHours ? String(op.laborHours) : '',
    setupTime: op.setupTime ? String(op.setupTime) : '', notes: op.notes ?? ''
  }));
  await loadItems();
  dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };
const addComponent = () => form.components.push({ itemId: '', qtyRequired: '1', uomCode: '', issueMethod: 'BACKFLUSH', operationNo: '' });
const removeComponent = (i: number) => form.components.splice(i, 1);
const addOperation = () => {
  const nextNo = form.operations.length > 0 ? Math.max(...form.operations.map(o => parseInt(o.operationNo) || 0)) + 10 : 10;
  form.operations.push({ lineNo: form.operations.length + 1, operationNo: String(nextNo), description: '', workstation: '', laborHours: '', setupTime: '', notes: '' });
};
const removeOperation = (i: number) => form.operations.splice(i, 1);

const save = async () => {
  saving.value = true; dialogError.value = null;
  try {
    const payload: any = {
      code: form.code, bomId: form.bomId || undefined,
      finishedGoodItemId: form.finishedGoodItemId,
      qtyPlanned: parseFloat(form.qtyPlanned) || 1,
      uomCode: form.uomCode || undefined, workCenter: form.workCenter || undefined,
      scheduleType: form.scheduleType, priority: parseInt(form.priority) || 50,
      productionOrder: form.productionOrder || undefined,
      plannedStartDate: form.plannedStartDate || undefined,
      plannedEndDate: form.plannedEndDate || undefined,
      notes: form.notes || undefined,
      components: form.components.filter(c => c.itemId).map((c, idx) => ({
        itemId: c.itemId, qtyRequired: parseFloat(c.qtyRequired) || 1,
        uomCode: c.uomCode || undefined, issueMethod: c.issueMethod,
        operationNo: c.operationNo ? parseInt(c.operationNo) : undefined,
        lineNo: idx + 1,
      })),
      operations: form.operations.filter(op => op.description).map((op, idx) => ({
        lineNo: idx + 1, operationNo: parseInt(op.operationNo) || (idx + 1) * 10,
        description: op.description, workstation: op.workstation || undefined,
        laborHours: op.laborHours ? parseFloat(op.laborHours) : undefined,
        setupTime: op.setupTime ? parseFloat(op.setupTime) : undefined,
        notes: op.notes || undefined,
      })),
    };
    if (editingId.value) {
      await api.patch(`/manufacturing/work-orders/${editingId.value}`, payload);
      showToast('Work Order diperbarui');
    } else {
      await api.post('/manufacturing/work-orders', payload);
      showToast('Work Order dibuat');
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    dialogError.value = e?.response?.data?.message ?? 'Gagal menyimpan WO';
  } finally {
    saving.value = false;
  }
};

const openDetail = (wo: any) => {
  detailWo.value = wo; activeDetailTab.value = 'overview'; detailOpen.value = true;
};

const release = async (wo: any) => {
  try {
    await api.patch(`/manufacturing/work-orders/${wo.id}/release`);
    showToast(`WO ${wo.code} dirilis ke produksi`);
    await load();
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal release WO', 'error');
  }
};

const openComplete = (wo: any) => {
  completingWo.value = wo;
  completeForm.qtyProduced = String(wo.qtyPlanned);
  completeForm.qtyRejected = '0';
  completeForm.notes = '';
  completeDialogOpen.value = true;
};

const doComplete = async () => {
  if (!completingWo.value) return;
  saving.value = true;
  try {
    await api.patch(`/manufacturing/work-orders/${completingWo.value.id}/complete`, {
      qtyProduced: parseFloat(completeForm.qtyProduced) || 0,
    });
    showToast(`WO ${completingWo.value.code} selesai!`);
    completeDialogOpen.value = false;
    await load();
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal complete WO', 'error');
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
.slide-right-enter-from { opacity: 0; }
.slide-right-leave-to { opacity: 0; }
</style>