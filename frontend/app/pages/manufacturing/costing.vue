<template>
  <div class="min-h-screen bg-slate-50/50 p-6">
    <!-- Header Section -->
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-200">
            <i class="pi pi-chart-pie text-white text-xl"></i>
          </div>
          <h1 class="text-2xl font-black tracking-tight text-slate-800">Manufacturing Costing</h1>
        </div>
        <p class="mt-1 text-sm font-medium text-slate-500">COGM Calculation, Variance Analysis & Settlement</p>
      </div>

      <div class="flex items-center gap-2">
        <Button 
          label="New Cost Run" 
          icon="pi pi-calculator" 
          class="p-button-sm p-button-rounded shadow-sm"
          @click="openCostingDialog"
        />
        <Button 
          label="Export Report" 
          icon="pi pi-file-pdf" 
          class="p-button-sm p-button-rounded p-button-secondary shadow-sm"
        />
      </div>
    </div>

    <!-- Summary Widgets -->
    <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <!-- Total COGM Card -->
      <div class="rounded-3xl border border-white bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between font-black uppercase tracking-widest text-slate-400 text-[10px] mb-4">
          <span>Total COGM (MTD)</span>
          <i class="pi pi-box"></i>
        </div>
        <div class="text-3xl font-black text-slate-800">IDR {{ fmtMoney(totalCogm) }}</div>
        <div class="mt-2 flex items-center gap-2">
          <span class="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg">+4.2%</span>
          <span class="text-[10px] font-medium text-slate-400">vs target budget</span>
        </div>
      </div>

      <!-- Variance Alert Card -->
      <div class="rounded-3xl border border-white bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between font-black uppercase tracking-widest text-slate-400 text-[10px] mb-4">
          <span>Cost Variance</span>
          <i class="pi pi-exclamation-triangle"></i>
        </div>
        <div :class="['text-3xl font-black', avgVariance > 0 ? 'text-rose-600' : 'text-emerald-600']">
          {{ avgVariance > 0 ? '+' : '' }}{{ avgVariance }}%
        </div>
        <div class="mt-2 flex items-center gap-2">
          <span class="text-[10px] font-medium text-slate-500">Primarily driven by raw material scrap</span>
        </div>
      </div>

      <!-- WIP Card -->
      <div class="rounded-3xl border border-white bg-white p-6 shadow-sm relative overflow-hidden">
        <div class="flex items-center justify-between font-black uppercase tracking-widest text-slate-400 text-[10px] mb-4">
          <span>WIP Valuation</span>
          <i class="pi pi-sync"></i>
        </div>
        <div class="text-3xl font-black text-slate-800 font-mono">IDR {{ fmtMoney(totalWip) }}</div>
        <div class="mt-2 text-[10px] font-bold text-indigo-500">12 Active Work Orders</div>
        <div class="absolute bottom-0 right-0 opacity-10 blur-sm transform translate-x-4 translate-y-4">
          <i class="pi pi-cog text-8xl"></i>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Cost Table (Left 2/3) -->
      <div class="lg:col-span-2 space-y-6">
        <div class="rounded-3xl border border-white bg-white/80 p-6 shadow-sm">
          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-sm font-black uppercase tracking-tighter text-slate-500">Cost Settlements</h3>
            <div class="flex gap-2">
               <Select v-model="selectedPeriod" :options="['2026-03', '2026-04']" class="p-inputtext-sm" />
            </div>
          </div>

          <DataTable :value="costs" class="p-datatable-sm no-border" :rows="8">
            <Column field="period" header="PERIOD" style="width: 15%">
              <template #body="{ data }">
                <span class="text-xs font-black text-slate-400 font-mono">{{ data.period }}</span>
              </template>
            </Column>
            <Column header="WORK ORDER" style="width: 25%">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <span class="text-xs font-black text-slate-700">{{ data.workOrder?.code }}</span>
                  <span class="text-[10px] text-slate-400 uppercase font-bold">{{ data.workOrder?.finishedGood?.name }}</span>
                </div>
              </template>
            </Column>
            <Column field="totalCost" header="TOTAL ACTUAL" style="width: 20%">
              <template #body="{ data }">
                <span class="text-xs font-black text-slate-800 font-mono">{{ fmtMoney(data.totalCost) }}</span>
              </template>
            </Column>
            <Column header="VARIANCE" style="width: 15%">
              <template #body="{ data }">
                <div :class="['text-xs font-black flex items-center gap-1', (data.actualCost - data.standardCost) > 0 ? 'text-rose-500' : 'text-emerald-500']">
                  <i :class="['pi text-[10px]', (data.actualCost - data.standardCost) > 0 ? 'pi-arrow-up' : 'pi-arrow-down']"></i>
                  {{ ((data.actualCost / data.standardCost - 1) * 100).toFixed(1) }}%
                </div>
              </template>
            </Column>
            <Column header="STATUS" style="width: 15%">
              <template #body="{ data }">
                <div :class="['rounded-full px-3 py-1 text-[9px] font-black tracking-widest text-center w-fit uppercase', data.isFinalized ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500']">
                  {{ data.isFinalized ? 'SETTLED' : 'DRAFT' }}
                </div>
              </template>
            </Column>
            <Column header="ACTION" style="width: 10%" class="text-right">
              <template #body="{ data }">
                <div class="flex justify-end gap-1">
                  <Button icon="pi pi-eye" class="p-button-text p-button-rounded p-button-sm" @click="viewDetail(data)" />
                  <Button 
                    v-if="!data.isFinalized"
                    icon="pi pi-check-circle" 
                    class="p-button-text p-button-rounded p-button-sm p-button-success" 
                    @click="finalizeCost(data)"
                    v-tooltip.top="'Settle to GL'"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>

      <!-- Cost Breakdown Side Panel (Right 1/3) -->
      <div class="space-y-6">
        <!-- Breakdown Chart Card -->
        <div class="rounded-3xl border border-white bg-white p-6 shadow-sm">
          <h3 class="text-xs font-black uppercase tracking-tighter text-slate-500 mb-6">Aggregate Cost Mix</h3>
          <div class="h-48 flex items-center justify-center relative">
            <!-- Simulated Chart using CSS/Elements since chart plugins can be tricky in some envs -->
            <div class="flex items-end gap-8 h-full w-full px-6 pt-4">
              <div class="flex-1 flex flex-col items-center">
                <div class="w-12 bg-indigo-500 rounded-t-lg transition-all duration-1000" :style="{ height: '65%' }"></div>
                <div class="text-[10px] font-black mt-2 text-slate-400">MAT</div>
              </div>
              <div class="flex-1 flex flex-col items-center">
                <div class="w-12 bg-amber-500 rounded-t-lg transition-all duration-1000" :style="{ height: '24%' }"></div>
                <div class="text-[10px] font-black mt-2 text-slate-400">LAB</div>
              </div>
              <div class="flex-1 flex flex-col items-center">
                <div class="w-12 bg-emerald-500 rounded-t-lg transition-all duration-1000" :style="{ height: '11%' }"></div>
                <div class="text-[10px] font-black mt-2 text-slate-400">OH</div>
              </div>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
            <div class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-indigo-500"></div>
              <span class="text-[10px] font-bold text-slate-600">Material (65%)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-amber-500"></div>
              <span class="text-[10px] font-bold text-slate-600">Labor (24%)</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity Feed -->
        <div class="rounded-3xl border border-white bg-white p-6 shadow-sm">
          <h3 class="text-xs font-black uppercase tracking-tighter text-slate-500 mb-6">Recent Settlements</h3>
          <div class="space-y-4">
            <div v-for="i in 3" :key="i" class="flex items-start gap-4">
              <div class="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <i class="pi pi-book text-xs"></i>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-800 leading-none">Journal JV-COST-{{ 17618 + i }} posted</p>
                <p class="mt-1 text-[10px] text-slate-400">Settlement for WO Chocolate Batch #00{{ i }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Modals -->
    <!-- 1. Calculation Dialog -->
    <Dialog v-model:visible="calcDialogOpen" header="Costing Calculation Run" :style="{ width: '450px' }" class="p-fluid">
       <div class="space-y-4 pt-4 px-2">
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Work Order *</label>
            <Select v-model="calcForm.workOrderId" :options="workOrders" optionLabel="label" optionValue="id" placeholder="Choose order to cost" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accounting Period</label>
              <Select v-model="calcForm.period" :options="['2026-03', '2026-04']" />
            </div>
             <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</label>
              <Select v-model="calcForm.type" :options="['FINAL_BATCH', 'WIP_PERIODIC']" />
            </div>
          </div>
          <div class="rounded-xl bg-amber-50 p-4 border border-amber-100">
            <div class="flex items-start gap-2">
               <i class="pi pi-info-circle text-amber-600 mt-0.5"></i>
               <p class="text-[10px] font-bold text-amber-800 leading-relaxed uppercase tracking-tight">
                 Calculations will aggregate all Material Issues and Labor Hours logged on the shop floor for this specific work order.
               </p>
            </div>
          </div>
       </div>
       <template #footer>
        <div class="flex gap-2 justify-end pt-4 border-t p-4 w-full">
          <Button label="Cancel" severity="secondary" @click="calcDialogOpen = false" class="p-button-text font-black text-xs" />
          <Button label="Run COGM Math" icon="pi pi-play" @click="runCalculation" class="p-button-rounded font-black text-xs p-button-success" />
        </div>
      </template>
    </Dialog>

    <!-- 2. Cost Detail View Modal -->
    <Dialog v-model:visible="detailDialogOpen" header="Production Cost Breakdown" :style="{ width: '550px' }" class="p-fluid no-border-header">
       <div class="space-y-6 pt-4" v-if="selectedCost">
          <div class="flex flex-col items-center bg-slate-900 rounded-3xl p-8 shadow-xl text-white mx-2 relative overflow-hidden">
             <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
             <p class="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Total Unit Cost (Actual)</p>
             <h2 class="text-4xl font-black font-mono">IDR {{ fmtMoney(selectedCost.totalCost) }}</h2>
             <div class="mt-4 flex items-center gap-4">
                <div class="flex flex-col items-center">
                   <p class="text-[9px] font-black text-white/40 uppercase">Standard</p>
                   <p class="text-xs font-bold text-white/80">{{ fmtMoney(selectedCost.standardCost) }}</p>
                </div>
                <div class="h-8 w-px bg-white/10 mx-2"></div>
                <div class="flex flex-col items-center">
                   <p class="text-[9px] font-black text-white/40 uppercase">Variance</p>
                   <p :class="['text-xs font-black px-2 py-0.5 rounded bg-white/10', (selectedCost.actualCost - selectedCost.standardCost) > 0 ? 'text-rose-400' : 'text-emerald-400']">
                      {{ fmtPercent(selectedCost.actualCost, selectedCost.standardCost) }}%
                   </p>
                </div>
             </div>
          </div>

          <div class="px-2 space-y-4">
             <div v-for="detail in selectedCost.details" :key="detail.id" class="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-100 transition-colors">
                <div class="flex items-center gap-3">
                   <div :class="['h-10 w-10 flex items-center justify-center rounded-xl', getCategoryStyle(detail.costCategory)]">
                      <i :class="getCategoryIcon(detail.costCategory)"></i>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-xs font-black text-slate-800">{{ detail.name }}</span>
                      <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ detail.costCategory }}</span>
                   </div>
                </div>
                <div class="text-right">
                   <p class="text-xs font-black text-slate-800 font-mono">{{ fmtMoney(detail.actualAmount) }}</p>
                   <p class="text-[10px] font-bold text-slate-400">Var: {{ fmtMoney(detail.variance) }}</p>
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
const toast = useToast();

const costs = ref([]);
const workOrders = ref([]);
const selectedPeriod = ref('2026-04');
const calcDialogOpen = ref(false);
const detailDialogOpen = ref(false);
const selectedCost = ref(null);

const calcForm = reactive({
  workOrderId: '',
  period: '2026-04',
  type: 'FINAL_BATCH'
});

// Computed Stats
const totalCogm = computed(() => costs.value.reduce((s: number, c: any) => s + Number(c.totalCost), 0));
const totalWip = computed(() => 125000000); // Simulated WIP
const avgVariance = computed(() => 3.8); // Simulated average

const fmtMoney = (v: any) => Number(v).toLocaleString('id-ID');
const fmtPercent = (act: number, std: number) => (((Number(act) / Number(std)) - 1) * 100).toFixed(1);

const load = async () => {
  try {
    const [costRes, woRes] = await Promise.all([
      api.get('/manufacturing/costing/summaries'),
      api.get('/manufacturing/work-orders?status=COMPLETED'), // Get completed WOs for costing
    ]);
    costs.value = costRes.data?.costs || [];
    workOrders.value = (woRes.data?.workOrders || []).map((wo: any) => ({
      label: `${wo.code} - ${wo.finishedGood?.name}`,
      id: wo.id
    }));
  } catch (e) {
    console.error(e);
  }
};

const openCostingDialog = () => {
  calcDialogOpen.value = true;
};

const runCalculation = async () => {
  try {
    await api.post('/manufacturing/costing/calculate', calcForm);
    toast.add({ severity: 'success', summary: 'Calculation Complete', detail: 'COGM has been computed based on actual production data.', life: 3000 });
    calcDialogOpen.value = false;
    await load();
  } catch (e: any) {
     toast.add({ severity: 'error', summary: 'Calculation Failed', detail: e.response?.data?.message });
  }
};

const viewDetail = (cost: any) => {
  selectedCost.value = cost;
  detailDialogOpen.value = true;
};

const finalizeCost = async (cost: any) => {
  try {
    await api.post('/manufacturing/costing/finalize', { costId: cost.id });
    toast.add({ severity: 'success', summary: 'Period Settled', detail: 'Cost record finalized and Journal Entry posted to General Ledger.', life: 3000 });
    await load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Settlement Error', detail: e.response?.data?.message });
  }
};

const getCategoryIcon = (cat: string) => {
  if (cat.includes('MATERIAL')) return 'pi pi-box';
  if (cat.includes('LABOR')) return 'pi pi-users';
  return 'pi pi-bolt';
};

const getCategoryStyle = (cat: string) => {
  if (cat.includes('MATERIAL')) return 'bg-indigo-50 text-indigo-600';
  if (cat.includes('LABOR')) return 'bg-amber-50 text-amber-600';
  return 'bg-emerald-50 text-emerald-600';
};

onMounted(load);
</script>

<style scoped>
.rounded-3xl { border-radius: 1.5rem; }
.rounded-2xl { border-radius: 1.25rem; }
.rounded-xl { border-radius: 1rem; }

.no-border :deep(.p-datatable-thead > tr > th) {
  border-bottom: 2px solid #f1f5f9;
  background: transparent;
  padding: 1rem 0.5rem;
  font-size: 10px;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.05em;
}

.no-border :deep(.p-datatable-tbody > tr > td) {
  border: none;
  padding: 1rem 0.5rem;
}

.no-border-header :deep(.p-dialog-header) {
  border: none;
  padding-bottom: 0;
}
</style>