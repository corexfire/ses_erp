<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">

    <!-- Header Hero -->
    <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200">
          <i class="pi pi-sitemap text-xl text-white" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-slate-800">Bill of Materials</h1>
          <p class="text-sm text-slate-500">Kelola struktur BOM, komponen, dan routing operasi produksi</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm md:flex">
          <i class="pi pi-database text-indigo-500" />
          <span class="font-semibold text-slate-700">{{ boms.length }}</span> BOM Records
        </div>
        <button
          class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300 hover:scale-105 active:scale-95 disabled:opacity-50"
          :disabled="loading"
          @click="openCreate"
        >
          <i class="pi pi-plus text-xs" />
          New BOM
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

    <!-- Search & Filter Bar -->
    <div class="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row md:items-center">
      <div class="relative flex-1">
        <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          v-model="q"
          type="text"
          placeholder="Cari kode BOM, nama, atau produk..."
          class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          @keyup.enter="load"
        />
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="typeFilter"
          class="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All Types</option>
          <option value="MANUFACTURING">Manufacturing</option>
          <option value="SUBCONTRACTING">Subcontracting</option>
          <option value="KIT">Kit</option>
          <option value="PHANTOM">Phantom</option>
        </select>
        <select
          v-model="activeFilter"
          class="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button
          class="flex h-10 items-center gap-2 rounded-xl bg-slate-800 px-4 text-sm font-medium text-white transition hover:bg-slate-700"
          :disabled="loading"
          @click="load"
        >
          <i v-if="loading" class="pi pi-spinner pi-spin text-xs" />
          <i v-else class="pi pi-filter text-xs" />
          Filter
        </button>
      </div>
    </div>

    <!-- BOM Table -->
    <div class="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="flex flex-col items-center gap-3">
          <div class="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-500" />
          <p class="text-sm text-slate-500">Memuat data BOM...</p>
        </div>
      </div>
      <div v-else-if="boms.length === 0" class="flex flex-col items-center justify-center py-20">
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <i class="pi pi-sitemap text-3xl text-slate-400" />
        </div>
        <p class="mt-4 text-base font-semibold text-slate-700">Belum ada data BOM</p>
        <p class="mt-1 text-sm text-slate-500">Klik "New BOM" untuk membuat Bill of Materials pertama</p>
        <button class="mt-5 flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600" @click="openCreate">
          <i class="pi pi-plus text-xs" /> New BOM
        </button>
      </div>
      <table v-else class="w-full">
        <thead class="border-b border-slate-100 bg-slate-50/80">
          <tr>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">BOM Code</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Name</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Finished Good</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Type</th>
            <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Base Qty</th>
            <th class="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Version</th>
            <th class="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr
            v-for="b in boms"
            :key="b.id"
            class="group cursor-pointer transition-colors hover:bg-indigo-50/40"
            @click="openDetail(b)"
          >
            <td class="px-5 py-4">
              <span class="inline-flex items-center gap-2">
                <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <i class="pi pi-sitemap text-xs" />
                </span>
                <span class="font-mono text-sm font-bold text-indigo-700">{{ b.code }}</span>
              </span>
            </td>
            <td class="px-5 py-4">
              <div class="text-sm font-semibold text-slate-800">{{ b.name }}</div>
              <div v-if="b.isMain" class="mt-0.5 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                <i class="pi pi-star-fill text-[10px]" /> Main BOM
              </div>
            </td>
            <td class="px-5 py-4">
              <div v-if="b.item" class="text-sm">
                <span class="font-medium text-slate-700">{{ b.item.code }}</span>
                <span class="text-slate-400"> · </span>
                <span class="text-slate-600">{{ b.item.name }}</span>
              </div>
              <span v-else class="text-xs text-slate-400">-</span>
            </td>
            <td class="px-5 py-4">
              <span :class="bomTypeBadge(b.bomType || 'MANUFACTURING')">{{ b.bomType || 'MANUFACTURING' }}</span>
            </td>
            <td class="px-5 py-4 text-right">
              <span class="font-mono text-sm font-semibold text-slate-700">{{ Number(b.baseQty || 1).toLocaleString() }}</span>
              <span class="ml-1 text-xs text-slate-400">{{ b.item?.baseUomCode || 'PCS' }}</span>
            </td>
            <td class="px-5 py-4 text-center">
              <span class="inline-flex items-center justify-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                v{{ b.version || 1 }}
              </span>
            </td>
            <td class="px-5 py-4 text-center">
              <span :class="b.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'" class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold">
                <span :class="b.isActive ? 'bg-emerald-500' : 'bg-slate-400'" class="h-1.5 w-1.5 rounded-full" />
                {{ b.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-5 py-4 text-right">
              <div class="inline-flex gap-1.5" @click.stop>
                <button
                  class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
                  @click="openEdit(b)"
                >Edit</button>
                <button
                  class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600"
                  @click="confirmDelete(b)"
                >Hapus</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Error / Success feedback -->
    <transition name="fade">
      <div v-if="toastMsg" :class="toastType === 'error' ? 'bg-red-500' : 'bg-emerald-500'" class="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-medium text-white shadow-xl">
        <i :class="toastType === 'error' ? 'pi-times-circle' : 'pi-check-circle'" class="pi text-base" />
        {{ toastMsg }}
      </div>
    </transition>

    <!-- ============ DETAIL DRAWER ============ -->
    <transition name="slide-right">
      <div v-if="detailOpen" class="fixed inset-y-0 right-0 z-50 flex">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" @click="detailOpen = false" />
        <div class="relative ml-auto flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-white shadow-2xl">
          <!-- Drawer Header -->
          <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/90 px-6 py-4 backdrop-blur">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <i class="pi pi-sitemap text-sm text-white" />
              </div>
              <div>
                <p class="font-mono text-sm font-bold text-indigo-600">{{ detailBom?.code }}</p>
                <p class="text-xs text-slate-500">{{ detailBom?.name }}</p>
              </div>
            </div>
            <button class="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-slate-100" @click="detailOpen = false">
              <i class="pi pi-times text-slate-500" />
            </button>
          </div>

          <!-- Detail Tabs -->
          <div class="border-b border-slate-100 px-6">
            <div class="flex gap-1">
              <button
                v-for="tab in detailTabs"
                :key="tab.key"
                :class="activeDetailTab === tab.key ? 'border-b-2 border-indigo-500 text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-700'"
                class="px-4 py-3 text-sm transition-colors"
                @click="activeDetailTab = tab.key"
              >{{ tab.label }}</button>
            </div>
          </div>

          <!-- Tab: Overview -->
          <div v-if="activeDetailTab === 'overview'" class="flex-1 p-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">BOM Type</p>
                <p class="mt-1 font-semibold text-slate-800">{{ detailBom?.bomType || 'MANUFACTURING' }}</p>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Base Quantity</p>
                <p class="mt-1 font-semibold text-slate-800">{{ Number(detailBom?.baseQty || 1).toLocaleString() }}</p>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Costing Method</p>
                <p class="mt-1 font-semibold text-slate-800">{{ detailBom?.costingMethod || 'STANDARD' }}</p>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Version</p>
                <p class="mt-1 font-semibold text-slate-800">v{{ detailBom?.version || 1 }}</p>
              </div>
              <div class="col-span-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Finished Good</p>
                <p class="mt-1 font-semibold text-slate-800">{{ detailBom?.item?.code }} · {{ detailBom?.item?.name }}</p>
              </div>
            </div>
          </div>

          <!-- Tab: Components -->
          <div v-if="activeDetailTab === 'components'" class="flex-1 p-6">
            <div v-if="!detailBom?.items || detailBom.items.length === 0" class="flex flex-col items-center py-10 text-slate-400">
              <i class="pi pi-box text-4xl" />
              <p class="mt-3 text-sm">Tidak ada komponen</p>
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="(it, idx) in detailBom.items"
                :key="it.id || idx"
                class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 hover:bg-indigo-50/40 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-indigo-500 shadow-sm border border-slate-100">
                    <span class="text-xs font-bold">{{ idx + 1 }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-slate-800">{{ it.componentItem?.code || it.componentItemId }}</p>
                    <p class="text-xs text-slate-500">{{ it.componentItem?.name || '' }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-mono text-sm font-bold text-slate-800">{{ Number(it.qty).toLocaleString() }} <span class="font-normal text-slate-400 text-xs">{{ it.uomCode }}</span></p>
                  <span class="text-xs text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">{{ it.issueMethod || 'BACKFLUSH' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab: Operations -->
          <div v-if="activeDetailTab === 'operations'" class="flex-1 p-6">
            <div v-if="!detailBom?.operations || detailBom.operations.length === 0" class="flex flex-col items-center py-10 text-slate-400">
              <i class="pi pi-cog text-4xl" />
              <p class="mt-3 text-sm">Tidak ada operasi routing</p>
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="(op, idx) in detailBom.operations"
                :key="op.id || idx"
                class="relative rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div class="absolute -left-0 top-4 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white shadow">
                  {{ op.operationNo }}
                </div>
                <div class="ml-4">
                  <div class="flex items-start justify-between">
                    <div>
                      <p class="font-semibold text-slate-800">{{ op.description }}</p>
                      <p v-if="op.workstation" class="text-xs text-indigo-500 mt-0.5"><i class="pi pi-map-marker mr-1" />{{ op.workstation }}</p>
                    </div>
                  </div>
                  <div v-if="op.setupTime || op.cycleTime" class="mt-3 flex gap-4">
                    <div v-if="op.setupTime" class="text-xs">
                      <span class="text-slate-400">Setup Time</span>
                      <span class="ml-1 font-semibold text-slate-700">{{ op.setupTime }} min</span>
                    </div>
                    <div v-if="op.cycleTime" class="text-xs">
                      <span class="text-slate-400">Cycle Time</span>
                      <span class="ml-1 font-semibold text-slate-700">{{ op.cycleTime }} min</span>
                    </div>
                    <div v-if="op.laborScrap" class="text-xs">
                      <span class="text-slate-400">Labor Scrap</span>
                      <span class="ml-1 font-semibold text-slate-700">{{ op.laborScrap }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="sticky bottom-0 flex items-center justify-between border-t border-slate-100 bg-white/90 px-6 py-4 backdrop-blur">
            <button class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" @click="detailOpen = false">Tutup</button>
            <button class="rounded-xl bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-600" @click="editFromDetail">Edit BOM Ini</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ============ FORM MODAL ============ -->
    <transition name="modal">
      <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeDialog" />
        <div class="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <i class="pi pi-sitemap text-sm text-white" />
              </div>
              <div>
                <h2 class="text-base font-bold text-slate-800">{{ editingId ? 'Edit BOM' : 'Buat BOM Baru' }}</h2>
                <p class="text-xs text-slate-500">{{ editingId ? 'Perbarui data Bill of Materials' : 'Isi detail Bill of Materials baru' }}</p>
              </div>
            </div>
            <button class="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-slate-100" @click="closeDialog">
              <i class="pi pi-times text-slate-500" />
            </button>
          </div>

          <!-- Modal Body -->
          <div class="flex-1 overflow-y-auto p-6">

            <!-- Section: BOM Info -->
            <div class="mb-6">
              <div class="mb-4 flex items-center gap-2">
                <div class="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <h3 class="text-sm font-bold text-slate-700">Informasi BOM</h3>
              </div>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Kode BOM <span class="text-red-500">*</span></label>
                  <input v-model="form.code" :disabled="Boolean(editingId)" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:cursor-not-allowed" placeholder="BOM-001" />
                </div>
                <div class="space-y-1.5 md:col-span-2">
                  <label class="text-xs font-semibold text-slate-600">Nama BOM <span class="text-red-500">*</span></label>
                  <input v-model="form.name" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" placeholder="Nama Bill of Materials" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Finished Good <span class="text-red-500">*</span></label>
                  <select v-model="form.itemId" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                    <option value="">-- Pilih Item --</option>
                    <option v-for="it in items" :key="it.id" :value="it.id">{{ it.code }} · {{ it.name }}</option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">BOM Type</label>
                  <select v-model="form.bomType" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                    <option value="MANUFACTURING">Manufacturing</option>
                    <option value="SUBCONTRACTING">Subcontracting</option>
                    <option value="KIT">Kit</option>
                    <option value="PHANTOM">Phantom</option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Costing Method</label>
                  <select v-model="form.costingMethod" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                    <option value="STANDARD">Standard Cost</option>
                    <option value="MOVING_AVERAGE">Moving Average</option>
                    <option value="FIFO">FIFO</option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Base Qty <span class="text-red-500">*</span></label>
                  <input v-model="form.baseQty" type="number" min="1" step="0.0001" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" placeholder="1" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-600">Version</label>
                  <input v-model="form.version" type="number" min="1" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" placeholder="1" />
                </div>
                <div class="flex items-center gap-4 pt-5">
                  <label class="flex cursor-pointer items-center gap-2">
                    <div class="relative">
                      <input v-model="form.isMain" type="checkbox" class="sr-only" />
                      <div :class="form.isMain ? 'bg-indigo-500' : 'bg-slate-200'" class="h-5 w-9 rounded-full transition-colors">
                        <div :class="form.isMain ? 'translate-x-4' : 'translate-x-0.5'" class="mt-0.5 h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform" />
                      </div>
                    </div>
                    <span class="text-xs font-semibold text-slate-600">Main BOM</span>
                  </label>
                  <label class="flex cursor-pointer items-center gap-2">
                    <div class="relative">
                      <input v-model="form.isActive" type="checkbox" class="sr-only" />
                      <div :class="form.isActive ? 'bg-emerald-500' : 'bg-slate-200'" class="h-5 w-9 rounded-full transition-colors">
                        <div :class="form.isActive ? 'translate-x-4' : 'translate-x-0.5'" class="mt-0.5 h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform" />
                      </div>
                    </div>
                    <span class="text-xs font-semibold text-slate-600">Active</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Section: Components -->
            <div class="mb-6">
              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  <h3 class="text-sm font-bold text-slate-700">Komponen / Materials</h3>
                  <span class="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-600">{{ form.items.length }}</span>
                </div>
                <button
                  class="flex items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
                  @click="addItem"
                >
                  <i class="pi pi-plus text-[10px]" /> Tambah Komponen
                </button>
              </div>

              <div v-if="form.items.length === 0" class="flex flex-col items-center rounded-xl border border-dashed border-slate-200 py-8 text-slate-400">
                <i class="pi pi-box text-3xl" />
                <p class="mt-2 text-sm">Belum ada komponen. Klik "Tambah Komponen"</p>
              </div>
              <div v-else class="overflow-hidden rounded-xl border border-slate-100">
                <table class="w-full">
                  <thead class="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th class="px-4 py-2.5 text-left">#</th>
                      <th class="px-4 py-2.5 text-left">Item Komponen</th>
                      <th class="px-4 py-2.5 text-right">Qty</th>
                      <th class="px-4 py-2.5 text-left">UOM</th>
                      <th class="px-4 py-2.5 text-left">Issue Method</th>
                      <th class="px-4 py-2.5 text-right">Scrap %</th>
                      <th class="px-4 py-2.5 text-center">Op No</th>
                      <th class="px-4 py-2.5"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50">
                    <tr v-for="(it, idx) in form.items" :key="idx" class="group hover:bg-slate-50/50">
                      <td class="px-4 py-2 text-xs font-bold text-slate-400">{{ idx + 1 }}</td>
                      <td class="px-4 py-2">
                        <select v-model="it.componentItemId" class="h-8 w-52 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100">
                          <option value="">-- Item --</option>
                          <option v-for="opt in items" :key="opt.id" :value="opt.id">{{ opt.code }} · {{ opt.name }}</option>
                        </select>
                      </td>
                      <td class="px-4 py-2 text-right">
                        <input v-model="it.qty" type="number" min="0" step="0.0001" class="h-8 w-24 rounded-lg border border-slate-200 bg-white px-2 text-right text-xs outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100" />
                      </td>
                      <td class="px-4 py-2">
                        <input v-model="it.uomCode" class="h-8 w-16 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100" placeholder="PCS" />
                      </td>
                      <td class="px-4 py-2">
                        <select v-model="it.issueMethod" class="h-8 w-28 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100">
                          <option value="BACKFLUSH">Backflush</option>
                          <option value="MANUAL">Manual</option>
                          <option value="PICK">Pick</option>
                        </select>
                      </td>
                      <td class="px-4 py-2 text-right">
                        <input v-model="it.scrapPercent" type="number" min="0" max="100" step="0.01" class="h-8 w-16 rounded-lg border border-slate-200 bg-white px-2 text-right text-xs outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100" placeholder="0" />
                      </td>
                      <td class="px-4 py-2 text-center">
                        <input v-model="it.operationNo" type="number" min="1" class="h-8 w-14 rounded-lg border border-slate-200 bg-white px-2 text-center text-xs outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100" placeholder="-" />
                      </td>
                      <td class="px-4 py-2 text-right">
                        <button class="invisible h-7 w-7 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 group-hover:visible flex" @click="removeItem(idx)">
                          <i class="pi pi-times text-xs" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Section: Operations / Routing -->
            <div class="mb-2">
              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <h3 class="text-sm font-bold text-slate-700">Operations / Routing</h3>
                  <span class="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-600">{{ form.operations.length }}</span>
                </div>
                <button
                  class="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600 transition hover:bg-amber-100"
                  @click="addOperation"
                >
                  <i class="pi pi-plus text-[10px]" /> Tambah Operasi
                </button>
              </div>

              <div v-if="form.operations.length === 0" class="flex flex-col items-center rounded-xl border border-dashed border-slate-200 py-8 text-slate-400">
                <i class="pi pi-cog text-3xl" />
                <p class="mt-2 text-sm">Belum ada routing operasi. Klik "Tambah Operasi"</p>
              </div>
              <div v-else class="space-y-2">
                <div
                  v-for="(op, idx) in form.operations"
                  :key="idx"
                  class="group grid grid-cols-7 gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3"
                >
                  <div class="space-y-1 col-span-1">
                    <label class="text-[10px] text-slate-400 font-semibold">Op No</label>
                    <input v-model="op.operationNo" type="number" min="1" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-center text-xs outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100" />
                  </div>
                  <div class="space-y-1 col-span-2">
                    <label class="text-[10px] text-slate-400 font-semibold">Workstation</label>
                    <input v-model="op.workstation" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100" placeholder="Mesin A" />
                  </div>
                  <div class="space-y-1 col-span-3">
                    <label class="text-[10px] text-slate-400 font-semibold">Deskripsi Operasi</label>
                    <input v-model="op.description" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100" placeholder="Proses mixing..." />
                  </div>
                  <div class="flex items-end justify-end">
                    <button class="invisible h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 group-hover:visible flex" @click="removeOperation(idx)">
                      <i class="pi pi-times text-xs" />
                    </button>
                  </div>
                  <div class="space-y-1 col-span-1">
                    <label class="text-[10px] text-slate-400 font-semibold">Setup (min)</label>
                    <input v-model="op.setupTime" type="number" min="0" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100" placeholder="0" />
                  </div>
                  <div class="space-y-1 col-span-1">
                    <label class="text-[10px] text-slate-400 font-semibold">Cycle (min)</label>
                    <input v-model="op.cycleTime" type="number" min="0" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100" placeholder="0" />
                  </div>
                  <div class="space-y-1 col-span-1">
                    <label class="text-[10px] text-slate-400 font-semibold">Labor Scrap %</label>
                    <input v-model="op.laborScrap" type="number" min="0" step="0.01" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100" placeholder="0" />
                  </div>
                  <div class="space-y-1 col-span-4">
                    <label class="text-[10px] text-slate-400 font-semibold">Catatan</label>
                    <input v-model="op.notes" class="h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100" placeholder="Opsional..." />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Modal Footer -->
          <div class="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <div v-if="dialogError" class="flex items-center gap-2 text-sm text-red-600">
              <i class="pi pi-exclamation-circle" />
              {{ dialogError }}
            </div>
            <div v-else />
            <div class="flex items-center gap-2">
              <button class="rounded-xl border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" :disabled="saving" @click="closeDialog">Batal</button>
              <button
                class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:shadow-indigo-300 disabled:opacity-60"
                :disabled="saving || !form.code || !form.name || !form.itemId"
                @click="save"
              >
                <i v-if="saving" class="pi pi-spinner pi-spin text-xs" />
                <i v-else class="pi pi-check text-xs" />
                {{ saving ? 'Menyimpan...' : (editingId ? 'Simpan Perubahan' : 'Buat BOM') }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </transition>

    <!-- Delete Confirmation -->
    <transition name="modal">
      <div v-if="deleteConfirmOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="deleteConfirmOpen = false" />
        <div class="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 mx-auto">
            <i class="pi pi-trash text-xl text-red-500" />
          </div>
          <h3 class="mt-4 text-center text-base font-bold text-slate-800">Hapus BOM?</h3>
          <p class="mt-2 text-center text-sm text-slate-500">
            BOM <strong>{{ deletingBom?.code }}</strong> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
          </p>
          <div class="mt-5 flex gap-3">
            <button class="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50" @click="deleteConfirmOpen = false">Batal</button>
            <button class="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600" @click="doDelete">Hapus</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
type BomRow = {
  id: string;
  code: string;
  name: string;
  version?: number;
  bomType?: string;
  baseQty?: number;
  costingMethod?: string;
  isMain: boolean;
  isActive: boolean;
  item?: { id: string; code: string; name: string; baseUomCode?: string } | null;
  items?: any[];
  operations?: any[];
};

type BomItemForm = {
  componentItemId: string;
  qty: string;
  uomCode: string;
  issueMethod: string;
  operationNo: string;
  scrapPercent: string;
};

type BomOperationForm = {
  operationNo: string;
  description: string;
  workstation: string;
  setupTime: string;
  cycleTime: string;
  laborScrap: string;
  notes: string;
};

const api = useApi();

// State
const q = ref('');
const typeFilter = ref('');
const activeFilter = ref('');
const loading = ref(false);
const saving = ref(false);
const boms = ref<BomRow[]>([]);
const items = ref<any[]>([]);
const dialogError = ref<string | null>(null);
const toastMsg = ref<string | null>(null);
const toastType = ref<'success' | 'error'>('success');

// Detail Drawer
const detailOpen = ref(false);
const detailBom = ref<BomRow | null>(null);
const activeDetailTab = ref('overview');
const detailTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'components', label: 'Komponen' },
  { key: 'operations', label: 'Routing' },
];

// Dialog
const dialogOpen = ref(false);
const editingId = ref<string | null>(null);

const form = reactive({
  code: '',
  name: '',
  itemId: '',
  bomType: 'MANUFACTURING',
  costingMethod: 'STANDARD',
  baseQty: '1',
  version: '1',
  isMain: false,
  isActive: true,
  items: [] as BomItemForm[],
  operations: [] as BomOperationForm[],
});

// Delete
const deleteConfirmOpen = ref(false);
const deletingBom = ref<BomRow | null>(null);

// Stats
const stats = computed(() => [
  { label: 'Total BOM', value: boms.value.length, icon: 'pi-sitemap', color: 'bg-indigo-500' },
  { label: 'Active', value: boms.value.filter(b => b.isActive).length, icon: 'pi-check-circle', color: 'bg-emerald-500' },
  { label: 'Manufacturing', value: boms.value.filter(b => !b.bomType || b.bomType === 'MANUFACTURING').length, icon: 'pi-cog', color: 'bg-violet-500' },
  { label: 'Main BOM', value: boms.value.filter(b => b.isMain).length, icon: 'pi-star', color: 'bg-amber-500' },
]);

const bomTypeBadge = (type: string) => {
  const map: Record<string, string> = {
    MANUFACTURING: 'inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700',
    SUBCONTRACTING: 'inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700',
    KIT: 'inline-flex items-center rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700',
    PHANTOM: 'inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600',
  };
  return map[type] || map.MANUFACTURING;
};

const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  toastMsg.value = msg;
  toastType.value = type;
  setTimeout(() => { toastMsg.value = null; }, 3000);
};

const load = async () => {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.q = q.value;
    if (typeFilter.value) params.bomType = typeFilter.value;
    if (activeFilter.value !== '') params.isActive = activeFilter.value;
    const res = await api.get('/manufacturing/bom', { params });
    boms.value = res.data?.boms ?? [];
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal memuat data BOM', 'error');
  } finally {
    loading.value = false;
  }
};

const loadItems = async () => {
  try {
    const res = await api.get('/inventory/items', { params: { take: 300 } });
    items.value = res.data?.items ?? [];
  } catch { items.value = []; }
};

const resetForm = () => {
  form.code = '';
  form.name = '';
  form.itemId = '';
  form.bomType = 'MANUFACTURING';
  form.costingMethod = 'STANDARD';
  form.baseQty = '1';
  form.version = '1';
  form.isMain = false;
  form.isActive = true;
  form.items = [];
  form.operations = [];
};

const openCreate = async () => {
  editingId.value = null;
  dialogError.value = null;
  resetForm();
  await loadItems();
  dialogOpen.value = true;
};

const openEdit = async (b: BomRow) => {
  editingId.value = b.id;
  dialogError.value = null;
  form.code = b.code;
  form.name = b.name;
  form.itemId = b.item?.id ?? '';
  form.bomType = b.bomType || 'MANUFACTURING';
  form.costingMethod = b.costingMethod || 'STANDARD';
  form.baseQty = String(b.baseQty || 1);
  form.version = String(b.version || 1);
  form.isMain = b.isMain;
  form.isActive = b.isActive;
  form.items = (b.items || []).map((it) => ({
    componentItemId: it.componentItemId ?? it.componentItem?.id ?? '',
    qty: String(it.qty),
    uomCode: it.uomCode || '',
    issueMethod: it.issueMethod || 'BACKFLUSH',
    operationNo: it.operationNo != null ? String(it.operationNo) : '',
    scrapPercent: it.scrapPercent != null ? String(it.scrapPercent) : '',
  }));
  form.operations = (b.operations || []).map((op) => ({
    operationNo: String(op.operationNo),
    description: op.description,
    workstation: op.workstation || '',
    setupTime: op.setupTime != null ? String(op.setupTime) : '',
    cycleTime: op.cycleTime != null ? String(op.cycleTime) : '',
    laborScrap: op.laborScrap != null ? String(op.laborScrap) : '',
    notes: op.notes || '',
  }));
  await loadItems();
  dialogOpen.value = true;
};

const closeDialog = () => {
  if (saving.value) return;
  dialogOpen.value = false;
};

const addItem = () => {
  form.items.push({ componentItemId: '', qty: '1', uomCode: '', issueMethod: 'BACKFLUSH', operationNo: '', scrapPercent: '' });
};

const removeItem = (idx: number) => { form.items.splice(idx, 1); };

const addOperation = () => {
  const nextNo = form.operations.length > 0 ? Math.max(...form.operations.map(o => parseInt(o.operationNo) || 0)) + 10 : 10;
  form.operations.push({ operationNo: String(nextNo), description: '', workstation: '', setupTime: '', cycleTime: '', laborScrap: '', notes: '' });
};

const removeOperation = (idx: number) => { form.operations.splice(idx, 1); };

const save = async () => {
  saving.value = true;
  dialogError.value = null;
  try {
    const payload: any = {
      code: form.code,
      name: form.name,
      itemId: form.itemId || undefined,
      bomType: form.bomType,
      costingMethod: form.costingMethod,
      baseQty: parseFloat(form.baseQty) || 1,
      version: parseInt(form.version) || 1,
      isMain: form.isMain,
      isActive: form.isActive,
      items: form.items.map((it, idx) => ({
        lineNo: idx + 1,
        componentItemId: it.componentItemId,
        qty: parseFloat(it.qty) || 1,
        uomCode: it.uomCode || undefined,
        issueMethod: it.issueMethod,
        operationNo: it.operationNo ? parseInt(it.operationNo) : undefined,
        scrapPercent: it.scrapPercent ? parseFloat(it.scrapPercent) : undefined,
      })).filter(it => it.componentItemId),
      operations: form.operations.map(op => ({
        operationNo: parseInt(op.operationNo) || 0,
        description: op.description,
        workstation: op.workstation || undefined,
        setupTime: op.setupTime ? parseFloat(op.setupTime) : undefined,
        cycleTime: op.cycleTime ? parseFloat(op.cycleTime) : undefined,
        laborScrap: op.laborScrap ? parseFloat(op.laborScrap) : undefined,
        notes: op.notes || undefined,
      })).filter(op => op.description),
    };

    if (editingId.value) {
      await api.patch(`/manufacturing/bom/${editingId.value}`, payload);
      showToast('BOM berhasil diperbarui');
    } else {
      await api.post('/manufacturing/bom', payload);
      showToast('BOM berhasil dibuat');
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    dialogError.value = e?.response?.data?.message ?? 'Gagal menyimpan BOM';
  } finally {
    saving.value = false;
  }
};

const openDetail = (b: BomRow) => {
  detailBom.value = b;
  activeDetailTab.value = 'overview';
  detailOpen.value = true;
};

const editFromDetail = async () => {
  detailOpen.value = false;
  if (detailBom.value) await openEdit(detailBom.value);
};

const confirmDelete = (b: BomRow) => {
  deletingBom.value = b;
  deleteConfirmOpen.value = true;
};

const doDelete = async () => {
  if (!deletingBom.value) return;
  try {
    await api.delete(`/manufacturing/bom/${deletingBom.value.id}`);
    showToast(`BOM ${deletingBom.value.code} dihapus`);
    deleteConfirmOpen.value = false;
    deletingBom.value = null;
    await load();
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal menghapus BOM', 'error');
    deleteConfirmOpen.value = false;
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
.modal-enter-from :deep(.relative) { transform: scale(0.95); }

.slide-right-enter-active { transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.slide-right-leave-active { transition: all 0.25s ease; }
.slide-right-enter-from { opacity: 0; }
.slide-right-enter-from .relative { transform: translateX(100%); }
.slide-right-leave-to { opacity: 0; }
</style>