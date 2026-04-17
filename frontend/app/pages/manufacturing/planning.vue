<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20 p-6">

    <!-- Header -->
    <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200">
          <i class="pi pi-calculator text-xl text-white" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-slate-800">Production Planning (MRP)</h1>
          <p class="text-sm text-slate-500">Material Requirements Planning — kelola kebutuhan bahan dan jadwal produksi</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm md:flex">
          <i class="pi pi-history text-emerald-500" />
          <span class="font-semibold text-slate-700">{{ runs.length }}</span> MRP Runs
        </div>
        <button
          class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:scale-105 hover:shadow-emerald-300 active:scale-95 disabled:opacity-50"
          :disabled="running"
          @click="openRunDialog"
        >
          <i v-if="running" class="pi pi-spinner pi-spin text-xs" />
          <i v-else class="pi pi-play text-xs" />
          Run MRP
        </button>
      </div>
    </div>

    <!-- Stats -->
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

    <!-- Main Layout: 2 panels -->
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">

      <!-- LEFT: MRP Runs History -->
      <div class="lg:col-span-1">
        <div class="rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div class="border-b border-slate-100 px-5 py-4">
            <h2 class="text-sm font-bold text-slate-800">Riwayat MRP Run</h2>
            <p class="mt-0.5 text-xs text-slate-500">Klik run untuk lihat detail suggestions</p>
          </div>

          <div v-if="loading" class="flex flex-col items-center py-12">
            <div class="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-500" />
          </div>
          <div v-else-if="runs.length === 0" class="flex flex-col items-center py-10 text-slate-400">
            <i class="pi pi-history text-4xl" />
            <p class="mt-3 text-sm">Belum ada MRP run</p>
            <button class="mt-3 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600" @click="openRunDialog">Run MRP Sekarang</button>
          </div>
          <div v-else class="divide-y divide-slate-50">
            <button
              v-for="r in runs"
              :key="r.id"
              :class="selectedRunId === r.id ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : 'hover:bg-slate-50 border-l-4 border-l-transparent'"
              class="w-full px-5 py-4 text-left transition-all"
              @click="selectRun(r)"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div :class="r.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'" class="flex h-7 w-7 items-center justify-center rounded-lg">
                    <i class="pi pi-check text-xs" v-if="r.status === 'COMPLETED'" />
                    <i class="pi pi-clock text-xs" v-else />
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-slate-800">{{ fmtDate(r.runDate) }}</p>
                    <p class="text-xs text-slate-500">{{ r.planType || 'STANDARD' }} · {{ r.demandSource || '—' }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <span :class="r.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'" class="rounded-full px-2 py-0.5 text-xs font-semibold">{{ r.status }}</span>
                  <p class="mt-0.5 text-xs text-slate-400">{{ r.suggestions?.length || 0 }} suggestions</p>
                </div>
              </div>
              <div v-if="r.periodStart || r.notes" class="mt-2 text-xs text-slate-500">
                <span v-if="r.periodStart">📅 {{ fmtDate(r.periodStart) }} – {{ fmtDate(r.periodEnd) }}</span>
                <span v-if="r.notes" class="mt-0.5 block truncate text-slate-400">{{ r.notes }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT: Suggestions Detail -->
      <div class="lg:col-span-2">
        <div class="rounded-2xl border border-slate-100 bg-white shadow-sm">

          <!-- Header with filter tabs -->
          <div class="border-b border-slate-100 px-5 py-4">
            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 class="text-sm font-bold text-slate-800">MRP Suggestions</h2>
                <p v-if="selectedRun" class="mt-0.5 text-xs text-slate-500">
                  Run: {{ fmtDate(selectedRun.runDate) }} · {{ filteredSuggestions.length }} items
                </p>
                <p v-else class="mt-0.5 text-xs text-slate-500">Pilih MRP Run dari kiri untuk melihat suggestions</p>
              </div>
              <div class="flex items-center gap-2">
                <select v-model="suggestionFilter" class="h-8 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100">
                  <option value="">All Types</option>
                  <option value="PURCHASE">Purchase</option>
                  <option value="MANUFACTURE">Manufacture</option>
                  <option value="TRANSFER">Transfer</option>
                </select>
                <select v-model="statusFilter" class="h-8 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100">
                  <option value="">All Status</option>
                  <option value="OPEN">Open</option>
                  <option value="CONVERTED">Converted</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Suggestions empty -->
          <div v-if="!selectedRunId" class="flex flex-col items-center py-20">
            <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <i class="pi pi-list text-3xl text-slate-400" />
            </div>
            <p class="mt-4 text-sm font-semibold text-slate-600">Pilih MRP Run</p>
            <p class="mt-1 text-xs text-slate-400">Klik salah satu MRP Run di sebelah kiri untuk melihat suggestions</p>
          </div>

          <div v-else-if="loadingSuggestions" class="flex items-center justify-center py-16">
            <div class="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-500" />
          </div>

          <div v-else-if="filteredSuggestions.length === 0" class="flex flex-col items-center py-16 text-slate-400">
            <i class="pi pi-inbox text-4xl" />
            <p class="mt-3 text-sm">Tidak ada suggestions untuk filter yang dipilih</p>
          </div>

          <div v-else class="divide-y divide-slate-50">
            <div
              v-for="s in filteredSuggestions"
              :key="s.id"
              class="group px-5 py-4 transition-colors hover:bg-slate-50/70"
            >
              <div class="flex items-start gap-4">
                <!-- Priority indicator -->
                <div class="mt-0.5 flex flex-col items-center">
                  <div :class="priorityColor(s.priority)" class="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm">
                    {{ s.priority || 50 }}
                  </div>
                  <div :class="suggestionTypeColor(s.suggestionType)" class="mt-1 h-6 w-0.5 rounded-full" />
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-start gap-2">
                    <span :class="suggestionTypeBadge(s.suggestionType)" class="flex items-center gap-1 text-xs font-semibold">
                      <i :class="suggestionTypeIcon(s.suggestionType)" class="text-[10px]" />
                      {{ s.suggestionType }}
                    </span>
                    <span :class="statusBadge(s.status)" class="text-xs font-semibold">{{ s.status }}</span>
                  </div>

                  <div class="mt-1.5 flex items-center gap-2">
                    <p class="font-semibold text-slate-800">{{ s.item?.code }}</p>
                    <span class="text-slate-300">·</span>
                    <p class="text-sm text-slate-600 truncate">{{ s.item?.name }}</p>
                  </div>

                  <div class="mt-2 flex flex-wrap gap-4 text-xs">
                    <div>
                      <span class="text-slate-400">Required</span>
                      <span class="ml-1 font-mono font-semibold text-slate-700">{{ Number(s.qtyRequired).toLocaleString() }} {{ s.uomCode || '' }}</span>
                    </div>
                    <div>
                      <span class="text-slate-400">On Hand</span>
                      <span :class="Number(s.qtyOnHand) < Number(s.qtyRequired) ? 'text-red-600 font-bold' : 'text-slate-700'" class="ml-1 font-mono font-semibold">{{ Number(s.qtyOnHand).toLocaleString() }}</span>
                    </div>
                    <div>
                      <span class="text-slate-400">On Order</span>
                      <span class="ml-1 font-mono font-semibold text-slate-700">{{ Number(s.qtyOnOrder).toLocaleString() }}</span>
                    </div>
                    <div class="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5">
                      <i class="pi pi-arrow-right text-emerald-500 text-[10px]" />
                      <span class="text-slate-400">Suggested</span>
                      <span class="ml-1 font-mono font-bold text-emerald-700">{{ Number(s.qtySuggested).toLocaleString() }}</span>
                    </div>
                  </div>

                  <div class="mt-2 flex flex-wrap gap-4 text-xs">
                    <div v-if="s.workCenter">
                      <i class="pi pi-map-marker text-slate-400 mr-1" />
                      <span class="text-slate-600">{{ s.workCenter }}</span>
                    </div>
                    <div v-if="s.dueDate">
                      <i class="pi pi-calendar text-slate-400 mr-1" />
                      <span :class="isOverdue(s.dueDate) ? 'text-red-600 font-semibold' : 'text-slate-600'">
                        Due: {{ fmtDate(s.dueDate) }}
                        <span v-if="isOverdue(s.dueDate)" class="ml-1 text-red-500">⚠ Overdue</span>
                      </span>
                    </div>
                    <div v-if="s.leadTimeDays">
                      <i class="pi pi-clock text-slate-400 mr-1" />
                      <span class="text-slate-600">Lead: {{ s.leadTimeDays }}d</span>
                    </div>
                    <div v-if="s.totalCost">
                      <i class="pi pi-dollar text-slate-400 mr-1" />
                      <span class="font-semibold text-slate-700">Rp {{ Number(s.totalCost).toLocaleString('id-ID') }}</span>
                    </div>
                  </div>

                  <div v-if="s.notes" class="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    <i class="pi pi-info-circle mr-1" />{{ s.notes }}
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    v-if="s.suggestionType === 'PURCHASE' && s.status === 'OPEN'"
                    class="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                    @click="convertToPO(s)"
                  >→ PO</button>
                  <button
                    v-if="s.suggestionType === 'MANUFACTURE' && s.status === 'OPEN'"
                    class="rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                    @click="convertToWO(s)"
                  >→ WO</button>
                  <button
                    class="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                    @click="closeSuggestion(s)"
                  >Close</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer total cost -->
          <div v-if="filteredSuggestions.length > 0" class="border-t border-slate-100 px-5 py-3">
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500">Total estimated cost:</span>
              <span class="font-bold text-slate-800">Rp {{ totalEstimatedCost }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="toastMsg" :class="toastType === 'error' ? 'bg-red-500' : 'bg-emerald-500'" class="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-medium text-white shadow-xl">
        <i :class="toastType === 'error' ? 'pi-times-circle' : 'pi-check-circle'" class="pi text-base" />
        {{ toastMsg }}
      </div>
    </transition>

    <!-- Run MRP Dialog -->
    <transition name="modal">
      <div v-if="runDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="runDialogOpen = false" />
        <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl">
          <div class="border-b border-slate-100 px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                <i class="pi pi-calculator text-sm text-white" />
              </div>
              <div>
                <h2 class="font-bold text-slate-800">Jalankan MRP</h2>
                <p class="text-xs text-slate-500">Konfigurasi parameter MRP sebelum dijalankan</p>
              </div>
            </div>
          </div>

          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-600">Demand Source</label>
                <select v-model="runForm.demandSource" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
                  <option value="MANUAL">Manual</option>
                  <option value="SALES_ORDER">Sales Order</option>
                  <option value="FORECAST">Forecast</option>
                  <option value="ALL">All Sources</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-600">Plan Type</label>
                <select v-model="runForm.planType" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
                  <option value="STANDARD">Standard</option>
                  <option value="REGENERATIVE">Regenerative</option>
                  <option value="NET_CHANGE">Net Change</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-600">Planning Horizon (hari)</label>
                <input v-model="runForm.planningHorizonDays" type="number" min="1" max="365" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-600">Periode Mulai</label>
                <input v-model="runForm.periodStart" type="date" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
              </div>
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Catatan</label>
              <input v-model="runForm.notes" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" placeholder="Opsional..." />
            </div>
            <div class="flex flex-wrap gap-4">
              <label class="flex cursor-pointer items-center gap-2">
                <div class="relative">
                  <input v-model="runForm.includeSalesOrder" type="checkbox" class="sr-only" />
                  <div :class="runForm.includeSalesOrder ? 'bg-emerald-500' : 'bg-slate-200'" class="h-5 w-9 rounded-full transition-colors">
                    <div :class="runForm.includeSalesOrder ? 'translate-x-4' : 'translate-x-0.5'" class="mt-0.5 h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform" />
                  </div>
                </div>
                <span class="text-xs font-semibold text-slate-600">Include Sales Orders</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2">
                <div class="relative">
                  <input v-model="runForm.includeForecast" type="checkbox" class="sr-only" />
                  <div :class="runForm.includeForecast ? 'bg-emerald-500' : 'bg-slate-200'" class="h-5 w-9 rounded-full transition-colors">
                    <div :class="runForm.includeForecast ? 'translate-x-4' : 'translate-x-0.5'" class="mt-0.5 h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform" />
                  </div>
                </div>
                <span class="text-xs font-semibold text-slate-600">Include Forecast</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2">
                <div class="relative">
                  <input v-model="runForm.includeMinStock" type="checkbox" class="sr-only" />
                  <div :class="runForm.includeMinStock ? 'bg-emerald-500' : 'bg-slate-200'" class="h-5 w-9 rounded-full transition-colors">
                    <div :class="runForm.includeMinStock ? 'translate-x-4' : 'translate-x-0.5'" class="mt-0.5 h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform" />
                  </div>
                </div>
                <span class="text-xs font-semibold text-slate-600">Include Min Stock</span>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
            <button class="rounded-xl border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" @click="runDialogOpen = false">Batal</button>
            <button
              class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 text-sm font-semibold text-white shadow-md disabled:opacity-60"
              :disabled="running"
              @click="runMrp"
            >
              <i v-if="running" class="pi pi-spinner pi-spin text-xs" />
              <i v-else class="pi pi-play text-xs" />
              {{ running ? 'Running...' : 'Jalankan MRP' }}
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
const running = ref(false);
const loadingSuggestions = ref(false);
const runs = ref<any[]>([]);
const suggestions = ref<any[]>([]);
const selectedRunId = ref<string | null>(null);
const selectedRun = ref<any | null>(null);
const suggestionFilter = ref('');
const statusFilter = ref('');
const runDialogOpen = ref(false);
const toastMsg = ref<string | null>(null);
const toastType = ref<'success' | 'error'>('success');

const runForm = reactive({
  demandSource: 'SALES_ORDER',
  planType: 'STANDARD',
  planningHorizonDays: 90,
  periodStart: '',
  notes: '',
  includeSalesOrder: true,
  includeForecast: false,
  includeMinStock: true,
});

// Computed
const filteredSuggestions = computed(() => {
  return suggestions.value
    .filter(s => !suggestionFilter.value || s.suggestionType === suggestionFilter.value)
    .filter(s => !statusFilter.value || s.status === statusFilter.value)
    .sort((a, b) => (b.priority || 50) - (a.priority || 50));
});

const totalEstimatedCost = computed(() => {
  const total = filteredSuggestions.value
    .filter(s => s.suggestionType === 'PURCHASE')
    .reduce((sum, s) => sum + (Number(s.totalCost) || 0), 0);
  return total.toLocaleString('id-ID');
});

const stats = computed(() => [
  { label: 'Total Suggestions', value: suggestions.value.length, icon: 'pi-list', color: 'bg-emerald-500' },
  { label: 'Open', value: suggestions.value.filter(s => s.status === 'OPEN').length, icon: 'pi-clock', color: 'bg-amber-500' },
  { label: 'Critical', value: suggestions.value.filter(s => (s.priority || 50) >= 80).length, icon: 'pi-exclamation-circle', color: 'bg-red-500' },
  { label: 'Converted', value: suggestions.value.filter(s => s.status === 'CONVERTED').length, icon: 'pi-check-circle', color: 'bg-indigo-500' },
]);

// Helpers
const fmtDate = (v: string | Date | null | undefined) => {
  if (!v) return '—';
  const d = new Date(v as string);
  if (isNaN(d.getTime())) return '—';
  return d.toISOString().slice(0, 10);
};

const isOverdue = (date: string) => new Date(date) < new Date();

const priorityColor = (p: number) => {
  if (!p || p < 40) return 'bg-slate-400';
  if (p < 60) return 'bg-blue-500';
  if (p < 80) return 'bg-amber-500';
  return 'bg-red-500';
};

const suggestionTypeColor = (type: string) => {
  if (type === 'PURCHASE') return 'bg-violet-200';
  if (type === 'MANUFACTURE') return 'bg-indigo-200';
  return 'bg-slate-200';
};

const suggestionTypeBadge = (type: string) => {
  if (type === 'PURCHASE') return 'inline-flex items-center rounded-full bg-violet-100 px-2.5 py-0.5 text-violet-700';
  if (type === 'MANUFACTURE') return 'inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700';
  return 'inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-700';
};

const suggestionTypeIcon = (type: string) => {
  if (type === 'PURCHASE') return 'pi-shopping-cart';
  if (type === 'MANUFACTURE') return 'pi-cog';
  return 'pi-arrows-h';
};

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    OPEN: 'inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700',
    CONVERTED: 'inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700',
    CLOSED: 'inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-500',
  };
  return map[status] || map.OPEN;
};

const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  toastMsg.value = msg;
  toastType.value = type;
  setTimeout(() => { toastMsg.value = null; }, 3500);
};

// Methods
const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/manufacturing/planning/runs');
    runs.value = res.data?.runs ?? [];
    // Auto-select the latest run
    if (runs.value.length > 0 && !selectedRunId.value) {
      await selectRun(runs.value[0]);
    }
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal memuat data', 'error');
  } finally {
    loading.value = false;
  }
};

const selectRun = async (r: any) => {
  selectedRunId.value = r.id;
  selectedRun.value = r;
  loadingSuggestions.value = true;
  suggestionFilter.value = '';
  statusFilter.value = '';
  try {
    const res = await api.get(`/manufacturing/planning/runs/${r.id}`);
    suggestions.value = res.data?.run?.suggestions ?? [];
  } catch (e: any) {
    showToast('Gagal memuat suggestions', 'error');
  } finally {
    loadingSuggestions.value = false;
  }
};

const openRunDialog = () => {
  runForm.demandSource = 'SALES_ORDER';
  runForm.planType = 'STANDARD';
  runForm.planningHorizonDays = 90;
  runForm.periodStart = new Date().toISOString().slice(0, 10);
  runForm.notes = '';
  runForm.includeSalesOrder = true;
  runForm.includeForecast = false;
  runForm.includeMinStock = true;
  runDialogOpen.value = true;
};

const runMrp = async () => {
  running.value = true;
  try {
    await api.post('/manufacturing/planning/run', {
      demandSource: runForm.demandSource,
      planType: runForm.planType,
      planningHorizonDays: runForm.planningHorizonDays,
      periodStart: runForm.periodStart || undefined,
      notes: runForm.notes || undefined,
      includeSalesOrder: runForm.includeSalesOrder,
      includeForecast: runForm.includeForecast,
      includeMinStock: runForm.includeMinStock,
    });
    showToast('MRP berhasil dijalankan!');
    runDialogOpen.value = false;
    selectedRunId.value = null;
    selectedRun.value = null;
    suggestions.value = [];
    await load();
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal menjalankan MRP', 'error');
  } finally {
    running.value = false;
  }
};

const convertToPO = async (s: any) => {
  showToast(`Suggestion ${s.item?.code} akan dikonversi ke Purchase Order`, 'success');
};

const convertToWO = async (s: any) => {
  showToast(`Suggestion ${s.item?.code} akan dikonversi ke Work Order`, 'success');
};

const closeSuggestion = async (s: any) => {
  showToast(`Suggestion ${s.item?.code} ditutup`);
};

onMounted(load);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(10px); }

.modal-enter-active { transition: all 0.25s ease; }
.modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>