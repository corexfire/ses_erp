<template>
  <div class="min-h-screen bg-slate-50/50 p-6">
    <!-- Header Section -->
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200">
            <i class="pi pi-receipt text-white text-xl"></i>
          </div>
          <h1 class="text-2xl font-black tracking-tight text-slate-800">Project Billing & Progress</h1>
        </div>
        <p class="mt-1 text-sm font-medium text-slate-500">Manage progress claims, retention, and project invoicing.</p>
      </div>

      <div class="flex items-center gap-2">
        <Button 
          label="New Progress Claim" 
          icon="pi pi-plus-circle" 
          class="p-button-sm p-button-rounded shadow-sm"
          @click="openClaimDialog"
        />
        <Button 
          label="Billing Setup" 
          icon="pi pi-cog" 
          class="p-button-sm p-button-rounded p-button-secondary shadow-sm"
          @click="openSetupDialog"
        />
      </div>
    </div>

    <!-- Summary Statistics -->
    <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
      <div v-for="stat in summaryStats" :key="stat.label" class="rounded-3xl border border-white bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between font-black uppercase tracking-widest text-slate-400 text-[10px] mb-4">
          <span>{{ stat.label }}</span>
          <i :class="stat.icon"></i>
        </div>
        <div class="text-2xl font-black text-slate-800">{{ stat.prefix }} {{ fmtMoney(stat.value) }}</div>
        <div class="mt-2 text-[10px] font-bold" :class="stat.color">{{ stat.subtext }}</div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Progress & Invoices (Left 2/3) -->
      <div class="lg:col-span-2 space-y-6">
        <div class="rounded-3xl border border-white bg-white/80 p-6 shadow-sm">
          <Tabs value="0">
            <TabList>
              <Tab value="0" class="text-xs font-black uppercase tracking-tighter">Progress Claims</Tab>
              <Tab value="1" class="text-xs font-black uppercase tracking-tighter">Invoices & Settlements</Tab>
            </TabList>
            <TabPanels>
              <!-- Claims Tab -->
              <TabPanel value="0">
                <DataTable :value="claims" class="p-datatable-sm no-border mt-4">
                  <Column field="claimNo" header="CLAIM NO" style="width: 25%">
                    <template #body="{ data }">
                      <span class="text-xs font-black text-slate-700">{{ data.claimNo }}</span>
                    </template>
                  </Column>
                  <Column header="PROGRESS (%)" style="width: 20%">
                    <template #body="{ data }">
                      <div class="flex items-center gap-2">
                        <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div class="h-full bg-blue-500 rounded-full" :style="{ width: data.progressPercent + '%' }"></div>
                        </div>
                        <span class="text-[10px] font-black w-8">{{ data.progressPercent }}%</span>
                      </div>
                    </template>
                  </Column>
                  <Column field="claimDate" header="DATE" style="width: 20%">
                     <template #body="{ data }">
                        <span class="text-[10px] font-bold text-slate-500">{{ formatDate(data.claimDate) }}</span>
                     </template>
                  </Column>
                  <Column header="STATUS" style="width: 15%">
                    <template #body="{ data }">
                      <span :class="['rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-widest', getStatusClass(data.status)]">
                        {{ data.status }}
                      </span>
                    </template>
                  </Column>
                  <Column header="ACTION" style="width: 10%">
                    <template #body="{ data }">
                      <div class="flex gap-1 justify-end">
                        <Button icon="pi pi-file-edit" class="p-button-text p-button-sm p-button-rounded" v-if="data.status === 'DRAFT'" @click="createInvoiceFromClaim(data)" v-tooltip.top="'Create Invoice'" />
                        <Button icon="pi pi-eye" class="p-button-text p-button-sm p-button-rounded" @click="viewClaim(data)" />
                      </div>
                    </template>
                  </Column>
                </DataTable>
              </TabPanel>

              <!-- Invoices Tab -->
              <TabPanel value="1">
                <DataTable :value="invoices" class="p-datatable-sm no-border mt-4">
                  <Column field="invoiceNo" header="INVOICE NO" />
                  <Column header="GROSS AMOUNT">
                    <template #body="{ data }">
                      <span class="text-xs font-black text-slate-500">{{ fmtMoney(data.grossAmount) }}</span>
                    </template>
                  </Column>
                  <Column header="DEDUCTIONS">
                    <template #body="{ data }">
                      <div class="flex flex-col text-[10px] font-bold">
                        <span :class="data.isRetentionReleased ? 'text-slate-400 line-through' : 'text-rose-500'">Ret: {{ fmtMoney(data.retentionAmount) }}</span>
                        <span class="text-amber-600">DP: {{ fmtMoney(data.dpDeductionAmount) }}</span>
                      </div>
                    </template>
                  </Column>
                  <Column header="NET BILLED">
                    <template #body="{ data }">
                      <span class="text-xs font-black text-slate-800">{{ fmtMoney(data.netAmount) }}</span>
                    </template>
                  </Column>
                  <Column header="STATUS">
                    <template #body="{ data }">
                       <span class="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{{ data.status }}</span>
                    </template>
                  </Column>
                </DataTable>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <!-- Right Sidebar: Ledger & Summary -->
      <div class="space-y-6">
        <!-- Project Context -->
        <div class="rounded-3xl border border-white bg-blue-900 p-6 shadow-xl text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10">
            <i class="pi pi-building text-6xl"></i>
          </div>
          <h3 class="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">Active Project</h3>
          <div class="text-lg font-black leading-tight mb-4">{{ activeProject?.name || 'Loading Project...' }}</div>
          <div class="flex items-center gap-4 border-t border-white/10 pt-4 mt-4">
            <div class="flex-1">
              <p class="text-[9px] font-black text-blue-300 uppercase tracking-tighter">Completion</p>
              <div class="flex items-center gap-2">
                <div class="flex-1 h-1 bg-white/20 rounded-full overflow-hidden mt-1">
                  <div class="h-full bg-emerald-400" :style="{ width: ledgerSummary.currentProgress + '%' }"></div>
                </div>
                <span class="text-xs font-black">{{ ledgerSummary.currentProgress }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Retention Ledger -->
        <div class="rounded-3xl border border-white bg-white p-6 shadow-sm">
          <h3 class="text-xs font-black uppercase tracking-tighter text-slate-500 mb-6 flex justify-between">
            <span>Retention Ledger</span>
            <i class="pi pi-lock text-[10px]"></i>
          </h3>
          <div class="space-y-4">
             <div class="flex justify-between items-end">
                <div class="text-[10px] font-bold text-slate-400">TOTAL WITHHELD</div>
                <div class="text-lg font-black text-slate-800">IDR {{ fmtMoney(ledgerSummary.totalRetention) }}</div>
             </div>
             <div class="text-[10px] font-medium text-slate-500 leading-relaxed italic border-l-2 border-slate-100 pl-3">
               Retention will be released in two stages: 5% upon Practical Completion and 5% after Defects Liability Period (6 Months).
             </div>
             <Button label="Release Request" severity="secondary" outlined class="w-full p-button-xs font-black text-[10px] uppercase tracking-widest" @click="openReleaseDialog" :disabled="ledgerSummary.totalRetention <= 0" />
          </div>
        </div>
      </div>

    </div>

    <!-- Modals -->
    <!-- 1. New Progress Claim Dialog -->
    <Dialog v-model:visible="claimDialogOpen" header="Register Progress Claim (BA Kemajuan)" :style="{ width: '450px' }" class="p-fluid">
       <div class="space-y-4 pt-4 px-2">
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Project *</label>
            <Select v-model="claimForm.projectId" :options="projects" optionLabel="label" optionValue="id" @change="onProjectChange" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Claim / BA No.</label>
              <InputText v-model="claimForm.claimNo" placeholder="BA-00X/PRJ/2026" />
            </div>
             <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Physical Progress (%)</label>
              <InputNumber v-model="claimForm.progressPercent" suffix=" %" :min="0" :max="100" />
            </div>
          </div>
          <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Work Description</label>
              <Textarea v-model="claimForm.description" rows="3" placeholder="Explain what was accomplished..." />
          </div>
       </div>
       <template #footer>
        <div class="flex gap-2 justify-end pt-4 border-t p-4 w-full">
          <Button label="Cancel" severity="secondary" @click="claimDialogOpen = false" class="p-button-text font-black text-xs" />
          <Button label="Submit Claim" icon="pi pi-check" @click="submitClaim" class="p-button-rounded font-black text-xs" />
        </div>
      </template>
    </Dialog>

    <!-- 2. Create Invoice Dialog -->
    <Dialog v-model:visible="invoiceDialogOpen" header="Generate Progress Invoice" :style="{ width: '500px' }" class="p-fluid">
       <div class="space-y-6 pt-4 px-2" v-if="selectedClaim">
          <div class="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
             <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
             <p class="text-[9px] font-black uppercase tracking-widest text-indigo-300">GROSS BILLING (DELTA)</p>
             <h2 class="text-3xl font-black font-mono">IDR {{ fmtMoney(calculatedGross) }}</h2>
             <p class="mt-2 text-[10px] font-medium text-indigo-200">Based on {{ claimDelta }}% addition from previous claim.</p>
          </div>

          <div class="space-y-4">
             <div class="grid grid-cols-2 gap-4">
               <div>
                  <label class="text-[10px] font-black text-slate-400 uppercase">Retention (%)</label>
                  <InputNumber v-model="invoiceForm.retentionPercent" suffix=" %" />
               </div>
               <div>
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">DP Recovery (Amount)</label>
                  <InputNumber v-model="invoiceForm.dpDeductionAmount" />
               </div>
             </div>
             
             <!-- Calculation Breakdown -->
             <div class="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-2">
                <div class="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                   <span>Subtotal</span>
                   <span>{{ fmtMoney(calculatedGross) }}</span>
                </div>
                <div class="flex justify-between text-[10px] font-bold text-rose-500 uppercase">
                   <span>Retention ({{ invoiceForm.retentionPercent }}%)</span>
                   <span>- {{ fmtMoney(calculatedRetention) }}</span>
                </div>
                <div class="flex justify-between text-[10px] font-bold text-amber-600 uppercase">
                   <span>DP Recovery</span>
                   <span>- {{ fmtMoney(invoiceForm.dpDeductionAmount) }}</span>
                </div>
                <div class="flex justify-between text-[10px] font-black text-slate-800 border-t pt-2 uppercase mt-2">
                   <span>Invoice Total (excl. tax)</span>
                   <span>IDR {{ fmtMoney(calculatedNet) }}</span>
                </div>
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex gap-2 justify-end pt-4 border-t p-4 w-full">
            <Button label="Cancel" severity="secondary" @click="invoiceDialogOpen = false" class="p-button-text font-black text-xs text-slate-400" />
            <Button label="Finalize & Post to AR" icon="pi pi-send" @click="generateInvoice" class="p-button-rounded font-black text-xs p-button-success shadow-lg shadow-emerald-100" />
          </div>
        </template>
    </Dialog>

    <!-- 3. Claim Detail Dialog -->
    <Dialog v-model:visible="claimDetailDialogOpen" header="Claim Details" :style="{ width: '450px' }" class="p-fluid">
       <div class="space-y-6 pt-4 px-2" v-if="selectedClaim">
          <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
             <div class="flex flex-col">
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress Level</span>
                <span class="text-2xl font-black text-slate-800">{{ selectedClaim.progressPercent }}%</span>
             </div>
             <span :class="['rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest', getStatusClass(selectedClaim.status)]">
                {{ selectedClaim.status }}
             </span>
          </div>
          
          <div class="space-y-1">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Work Accomplished</label>
             <div class="text-xs font-bold text-slate-700 bg-white p-4 rounded-xl border border-slate-100 leading-relaxed">
                {{ selectedClaim.description || 'No description provided.' }}
             </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="flex flex-col">
                <span class="text-[9px] font-black text-slate-400 uppercase">Submission Date</span>
                <span class="text-[11px] font-bold text-slate-700">{{ formatDate(selectedClaim.claimDate) }}</span>
             </div>
             <div class="flex flex-col">
                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Claim ID</span>
                <span class="text-[11px] font-bold text-slate-700 font-mono">#{{ selectedClaim.id.slice(-8) }}</span>
             </div>
          </div>
       </div>
    </Dialog>


    <!-- 4. Billing Setup Dialog -->
    <Dialog v-model:visible="setupDialogOpen" header="Project Billing Configuration" :style="{ width: '500px' }" class="p-fluid">
       <div class="space-y-6 pt-4 px-2">
          <div class="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-4">
             <i class="pi pi-info-circle text-blue-500 mt-0.5"></i>
             <p class="text-[10px] font-medium text-slate-500 leading-relaxed italic">
                Settings defined here will be used as default values for all future progress invoices for this project.
             </p>
          </div>

          <div class="space-y-4">
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing Method</label>
                <div class="flex gap-2 font-black uppercase text-[10px]">
                   <Button :label="'Progress Based'" :severity="setupForm.billingType === 'PROGRESS' ? 'primary' : 'secondary'" @click="setupForm.billingType = 'PROGRESS'" outlined class="flex-1" />
                   <Button :label="'Milestone Based'" :severity="setupForm.billingType === 'MILESTONE' ? 'primary' : 'secondary'" @click="setupForm.billingType = 'MILESTONE'" outlined class="flex-1" />
                </div>
             </div>

             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Default Retention (%)</label>
                   <InputNumber v-model="setupForm.retentionRate" suffix=" %" :min="0" :max="100" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">DP Recovery Rate (%)</label>
                   <InputNumber v-model="setupForm.dpRecoveryRate" suffix=" %" :min="0" :max="100" />
                </div>
             </div>

             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Down Payment (Total Received)</label>
                <InputNumber v-model="setupForm.downPaymentTotal" mode="currency" currency="IDR" locale="id-ID" />
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex gap-2 justify-end pt-4 border-t p-4 w-full">
            <Button label="Cancel" severity="secondary" @click="setupDialogOpen = false" class="p-button-text font-black text-xs text-slate-400" />
            <Button label="Save Configuration" icon="pi pi-save" @click="saveSetup" class="p-button-rounded font-black text-xs shadow-lg" />
          </div>
        </template>
    </Dialog>



    <!-- 5. Retention Release Dialog -->
    <Dialog v-model:visible="releaseDialogOpen" header="Release Retention Funds" :style="{ width: '450px' }" class="p-fluid">
       <div class="space-y-6 pt-4 px-2">
          <div class="bg-emerald-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
             <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
             <p class="text-[9px] font-black uppercase tracking-widest text-emerald-300">TOTAL RELEASABLE</p>
             <h2 class="text-3xl font-black font-mono">IDR {{ fmtMoney(ledgerSummary.totalRetention) }}</h2>
             <p class="mt-2 text-[10px] font-medium text-emerald-100 italic">This will mark all currently withheld retention for project "{{ activeProject?.name }}" as released.</p>
          </div>
          <p class="text-[10px] font-bold text-slate-500 text-center uppercase tracking-tighter">Are you sure you want to proceed with the release request?</p>
       </div>
       <template #footer>
          <div class="flex gap-2 justify-end pt-4 border-t p-4 w-full">
            <Button label="Cancel" severity="secondary" @click="releaseDialogOpen = false" class="p-button-text font-black text-xs text-slate-400" />
            <Button label="Confirm Release" icon="pi pi-check-circle" @click="submitRelease" class="p-button-rounded font-black text-xs p-button-success shadow-lg" />
          </div>
        </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();

const projects = ref([]);
const activeProjectId = ref('');
const claims = ref([]);
const invoices = ref([]);
const ledgerSummary = ref({ contractValue: 0, totalBilled: 0, totalRetention: 0, currentProgress: 0 });

const claimDialogOpen = ref(false);
const claimDetailDialogOpen = ref(false);
const invoiceDialogOpen = ref(false);
const setupDialogOpen = ref(false);
const releaseDialogOpen = ref(false);
const selectedClaim = ref(null);

const claimForm = reactive({
  projectId: '',
  claimNo: '',
  progressPercent: 0,
  description: ''
});

const invoiceForm = reactive({
  retentionPercent: 5,
  dpDeductionAmount: 0
});

const setupForm = reactive({
  retentionRate: 5,
  downPaymentTotal: 0,
  dpRecoveryRate: 0,
  billingType: 'PROGRESS' as any
});

// Computed Calculations
const calculatedGross = computed(() => {
  if (!selectedClaim.value) return 0;
  // Simple simulation: delta PROGRESS * budget
  // For proper ERP logic, backend calculates this based on prior claims
  return (ledgerSummary.value.contractValue * 0.15); // Mock 15% delta
});
const claimDelta = ref(15);
const calculatedRetention = computed(() => calculatedGross.value * (invoiceForm.retentionPercent / 100));
const calculatedNet = computed(() => calculatedGross.value - calculatedRetention.value - invoiceForm.dpDeductionAmount);

const summaryStats = computed(() => [
  { label: 'Contract Value', icon: 'pi pi-briefcase', value: ledgerSummary.value.contractValue, prefix: 'IDR', color: 'text-slate-400' },
  { label: 'Total Billed', icon: 'pi pi-arrow-up-right', value: ledgerSummary.value.totalBilled, prefix: 'IDR', color: 'text-blue-500', subtext: 'Invoiced to date' },
  { label: 'Total Retention', icon: 'pi pi-lock', value: ledgerSummary.value.totalRetention, prefix: 'IDR', color: 'text-rose-500', subtext: 'Withheld by client' },
  { label: 'Remaining', icon: 'pi pi-wallet', value: ledgerSummary.value.remainingBalance || 0, prefix: 'IDR', color: 'text-slate-400' }
]);

const activeProject = computed(() => projects.value.find(p => p.id === activeProjectId.value));

const fmtMoney = (v: any) => Number(v || 0).toLocaleString('id-ID');
const formatDate = (v: any) => v ? new Date(v).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

const load = async () => {
  try {
    const projRes = await api.get('/project/projects');
    projects.value = (projRes.data?.data || []).map(p => ({ ...p, label: `${p.code} - ${p.name}` }));
    if (projects.value.length > 0) {
      activeProjectId.value = projects.value[0].id;
      await loadProjectData(activeProjectId.value);
    }
  } catch (e) {
    console.error(e);
  }
};

const loadProjectData = async (pid: string) => {
   try {
     const res = await api.get(`/project/billing/ledger/${pid}`);
     ledgerSummary.value = res.data?.summary || {};
     claims.value = res.data?.claims || [];
     invoices.value = res.data?.invoices || [];

     // Update Setup Form
     const setup = ledgerSummary.value.billingSetup;
     if (setup) {
       setupForm.retentionRate = Number(setup.retentionRate);
       setupForm.downPaymentTotal = Number(setup.downPaymentTotal);
       setupForm.dpRecoveryRate = Number(setup.dpRecoveryRate);
       setupForm.billingType = setup.billingType;
     }
   } catch (e) {
     toast.add({ severity: 'error', summary: 'Error', detail: 'Could not load project ledger' });
   }
};

const onProjectChange = (e: any) => {
   loadProjectData(e.value);
};

const openClaimDialog = () => {
  claimForm.projectId = activeProjectId.value;
  claimDialogOpen.value = true;
};

const openSetupDialog = () => {
  setupDialogOpen.value = true;
};

const openReleaseDialog = () => {
  releaseDialogOpen.value = true;
};

const saveSetup = async () => {
  try {
     await api.patch(`/project/projects/${activeProjectId.value}/billing-setup`, setupForm);
     toast.add({ severity: 'success', summary: 'Setup Saved', detail: 'Project billing rules updated successfully.', life: 3000 });
     setupDialogOpen.value = false;
     await loadProjectData(activeProjectId.value);
  } catch (e: any) {
     toast.add({ severity: 'error', summary: 'Error', detail: e.response?.data?.message });
  }
};

const submitRelease = async () => {
  try {
     await api.post(`/project/billing/release-retention/${activeProjectId.value}`);
     toast.add({ severity: 'success', summary: 'Retention Released', detail: 'Retention funds have been successfully released for payment.', life: 3000 });
     releaseDialogOpen.value = false;
     await loadProjectData(activeProjectId.value);
  } catch (e: any) {
     toast.add({ severity: 'error', summary: 'Failed', detail: e.response?.data?.message });
  }
};

const submitClaim = async () => {
   try {
      await api.post('/project/billing/claims', claimForm);
      toast.add({ severity: 'success', summary: 'Claim Registered', detail: 'Physical progress claim has been submitted for verification.', life: 3000 });
      claimDialogOpen.value = false;
      await loadProjectData(claimForm.projectId);
   } catch (e: any) {
      toast.add({ severity: 'error', summary: 'Failed', detail: e.response?.data?.message });
   }
};

const viewClaim = (claim: any) => {
  selectedClaim.value = claim;
  claimDetailDialogOpen.value = true;
};

const createInvoiceFromClaim = (claim: any) => {
   selectedClaim.value = claim;
   // Use settings from Setup
   invoiceForm.retentionPercent = setupForm.retentionRate;
   // Calculate DP Deduction: (Gross Amount * Recovery Rate %)
   const gross = (ledgerSummary.value.contractValue * 0.15); // Mock 15% delta
   invoiceForm.dpDeductionAmount = gross * (setupForm.dpRecoveryRate / 100);

   invoiceDialogOpen.value = true;
};

const generateInvoice = async () => {
   try {
      await api.post('/project/billing/invoices', {
         progressClaimId: selectedClaim.value.id,
         retentionPercent: invoiceForm.retentionPercent,
         dpDeductionAmount: invoiceForm.dpDeductionAmount
      });
      toast.add({ severity: 'success', summary: 'Invoice Posted', detail: 'Progress invoice generated and verified successfully.', life: 3000 });
      invoiceDialogOpen.value = false;
      await loadProjectData(activeProjectId.value);
   } catch (e: any) {
      toast.add({ severity: 'error', summary: 'Error', detail: e.response?.data?.message });
   }
};

const getStatusClass = (status: string) => {
  if (status === 'VERIFIED') return 'bg-emerald-100 text-emerald-600';
  if (status === 'INVOICED') return 'bg-blue-100 text-blue-600';
  return 'bg-slate-100 text-slate-500';
};

onMounted(load);
</script>

<style scoped>
.rounded-3xl { border-radius: 1.5rem; }
.rounded-2xl { border-radius: 1.15rem; }
.rounded-xl { border-radius: 0.85rem; }

.no-border :deep(.p-datatable-thead > tr > th) {
  border-bottom: 2px solid #f1f5f9;
  background: transparent;
  padding: 0.75rem 0.5rem;
  font-size: 10px;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.05em;
}

.no-border :deep(.p-datatable-tbody > tr > td) {
  border: none;
  padding: 0.75rem 0.5rem;
}
</style>
