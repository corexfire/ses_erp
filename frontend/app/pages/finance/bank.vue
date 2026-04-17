<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-blue-600 relative overflow-hidden">
      <div class="absolute right-[-15px] top-[-15px] opacity-5 pointer-events-none">
        <i class="pi pi-building-columns text-[150px] text-blue-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-building-columns text-blue-700"></i> Manajemen Rekening Bank
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Master rekening bank perusahaan F&B: operasional, gaji, penerimaan, deposito, dan kas kecil. Terintegrasi dengan Bank Reconciliation dan Journal Entry.
          </div>
        </div>
        <Button label="+ Tambah Rekening" size="small" icon="pi pi-plus"
          class="bg-blue-700 text-white border-none font-bold shadow-sm hover:bg-blue-800 shrink-0"
          @click="openCreate" />
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white border rounded-xl p-5 shadow-sm">
        <div class="text-3xl font-black text-blue-700">{{ accounts.length }}</div>
        <div class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Total Rekening</div>
      </div>
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
        <div class="text-xl font-black text-blue-800">{{ formatRupiah(totalBalance) }}</div>
        <div class="text-xs font-bold text-blue-700 mt-1 uppercase tracking-widest">Total Saldo</div>
      </div>
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm">
        <div class="text-3xl font-black text-emerald-700">{{ activeAccounts.length }}</div>
        <div class="text-xs font-bold text-emerald-700 mt-1 uppercase tracking-widest">Rekening Aktif</div>
      </div>
      <div class="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
        <div class="text-3xl font-black text-slate-500">{{ totalTransactionCount }}</div>
        <div class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Total Transaksi</div>
      </div>
    </div>

    <!-- Bank Filter Pills -->
    <div class="flex flex-wrap gap-2 bg-white border rounded-xl p-4 shadow-sm items-center">
      <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-1">Filter Bank:</span>
      <button
        v-for="bank in bankList" :key="bank"
        class="rounded-full border px-3 py-1 text-xs font-black transition-all"
        :class="activeBank === bank ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'"
        @click="activeBank = activeBank === bank ? '' : bank"
      >
        {{ bank }}
        <span class="ml-1 opacity-70">({{ accounts.filter(a => a.bankName === bank).length }})</span>
      </button>
      <Button severity="secondary" size="small" :disabled="loading" icon="pi pi-refresh" @click="load" outlined class="ml-auto h-8 w-8" />
    </div>

    <!-- Account Cards + Details split view -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <!-- Left: Account List -->
      <div class="lg:col-span-2 space-y-3">
        <div v-if="loading" class="bg-white border rounded-xl p-8 text-center text-slate-400">
          <i class="pi pi-spinner pi-spin mr-2 text-blue-600"></i> Memuat rekening bank...
        </div>
        <div
          v-for="acct in filteredAccounts" :key="acct.id"
          class="bg-white border rounded-xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md"
          :class="selectedAccount?.id === acct.id ? 'border-blue-500 ring-2 ring-blue-200 shadow-md' : 'border-slate-200'"
          @click="selectedAccount = acct"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shrink-0"
                :style="{ backgroundColor: bankColor(acct.bankName) }">
                {{ acct.bankName?.slice(0,3).toUpperCase() ?? '??' }}
              </div>
              <div>
                <div class="font-black text-slate-800 text-sm">{{ acct.name }}</div>
                <div class="font-mono text-[10px] text-slate-400 mt-0.5">{{ acct.accountNo }}</div>
              </div>
            </div>
            <span class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border"
              :class="acctTypeClass(acct.accountType)">
              {{ acct.accountType }}
            </span>
          </div>
          <div class="mt-3 pt-3 border-t flex justify-between items-center">
            <div>
              <div class="text-[10px] text-slate-400 font-bold">SALDO</div>
              <div class="font-black text-lg" :class="Number(acct.balance) >= 0 ? 'text-blue-700' : 'text-rose-700'">
                {{ formatRupiah(Number(acct.balance)) }}
              </div>
            </div>
            <div class="text-right">
              <div class="text-[10px] text-slate-400 font-bold">TRANSAKSI</div>
              <div class="font-black text-slate-600">{{ acct.transactions?.length ?? 0 }}</div>
            </div>
          </div>
          <div class="mt-2 flex justify-end gap-1">
            <Button label="+ Transaksi" size="small" outlined icon="pi pi-plus"
              class="text-[9px] h-6 px-2 font-bold text-blue-700 border-blue-300 hover:bg-blue-700 hover:text-white"
              @click.stop="openAddTxn(acct)" />
          </div>
        </div>

        <div v-if="!loading && filteredAccounts.length === 0" class="bg-white border rounded-xl p-8 text-center text-slate-400 italic">
          Tidak ada rekening bank ditemukan.
        </div>
      </div>

      <!-- Right: Account Detail + Transactions -->
      <div class="lg:col-span-3">
        <div v-if="!selectedAccount" class="bg-white border rounded-xl p-12 text-center text-slate-400 h-full flex flex-col items-center justify-center gap-3">
          <i class="pi pi-building-columns text-5xl text-slate-300"></i>
          <div class="font-bold text-slate-400">Pilih rekening bank di kiri untuk melihat detail dan riwayat transaksi</div>
        </div>

        <div v-else class="bg-white border rounded-xl shadow-sm overflow-hidden">
          <!-- Account Header -->
          <div class="p-5 border-b" :style="{ borderLeftWidth: '4px', borderLeftColor: bankColor(selectedAccount.bankName), background: 'linear-gradient(to right, #f8fafc, #fff)' }">
            <div class="flex items-start justify-between">
              <div>
                <div class="font-black text-xl text-slate-800">{{ selectedAccount.name }}</div>
                <div class="text-sm text-slate-500 mt-0.5 font-mono font-bold">
                  {{ selectedAccount.bankName }} · {{ selectedAccount.accountNo }}
                </div>
              </div>
              <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border"
                :class="acctTypeClass(selectedAccount.accountType)">
                {{ selectedAccount.accountType }}
              </span>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-3">
              <div class="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <div class="text-[10px] text-blue-700 font-black uppercase tracking-widest">Saldo Buku</div>
                <div class="font-black text-blue-900 text-base mt-0.5">{{ formatRupiah(Number(selectedAccount.balance)) }}</div>
              </div>
              <div class="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                <div class="text-[10px] text-emerald-700 font-black uppercase tracking-widest">Total Kredit</div>
                <div class="font-black text-emerald-900 text-base mt-0.5">{{ formatRupiah(totalCredit(selectedAccount)) }}</div>
              </div>
              <div class="bg-rose-50 border border-rose-100 rounded-lg p-3">
                <div class="text-[10px] text-rose-700 font-black uppercase tracking-widest">Total Debit</div>
                <div class="font-black text-rose-900 text-base mt-0.5">{{ formatRupiah(totalDebit(selectedAccount)) }}</div>
              </div>
            </div>
          </div>

          <!-- Transaction list -->
          <div class="divide-y divide-slate-100 max-h-[450px] overflow-y-auto">
            <div class="px-5 py-2.5 bg-slate-50 flex items-center justify-between sticky top-0 z-10">
              <div class="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                Riwayat Transaksi ({{ selectedAccount.transactions?.length ?? 0 }})
              </div>
              <InputText v-model="txnSearch" placeholder="Cari transaksi..." class="w-40 h-7 text-[11px]" />
            </div>

            <div v-if="!filteredTxns.length" class="p-8 text-center text-slate-400 italic text-sm">
              Belum ada riwayat transaksi untuk rekening ini.
            </div>

            <div v-for="txn in filteredTxns" :key="txn.id" class="px-5 py-3 hover:bg-slate-50/50 transition flex items-center gap-4">
              <div class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                :class="txn.transType === 'CREDIT' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'">
                {{ txn.transType === 'CREDIT' ? '↑' : '↓' }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-semibold text-slate-800 truncate">{{ txn.description }}</div>
                <div class="text-[10px] text-slate-400 font-mono mt-0.5">{{ txn.reference }} · {{ formatDate(txn.transDate) }}</div>
              </div>
              <div class="text-right shrink-0">
                <div class="font-black text-sm" :class="txn.transType === 'CREDIT' ? 'text-emerald-700' : 'text-rose-700'">
                  {{ txn.transType === 'CREDIT' ? '+' : '' }}{{ formatRupiah(Number(txn.amount)) }}
                </div>
                <div class="text-[9px] text-slate-400 font-bold uppercase">{{ txn.status }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Account Dialog -->
    <div v-if="createDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-lg font-black text-slate-800 flex items-center gap-2">
              <i class="pi pi-building-columns text-blue-700"></i> Tambah Rekening Bank
            </div>
            <div class="text-xs text-slate-500 mt-0.5">Rekening yang didaftarkan tersedia di modul Reconciliation & Cash Flow.</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="createDialog = false">✕</button>
        </div>

        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Bank <span class="text-red-500">*</span></label>
              <select v-model="form.bankName" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 shadow-inner">
                <option value="">-- Pilih Bank --</option>
                <option v-for="b in BANKS" :key="b" :value="b">{{ b }}</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tipe Rekening <span class="text-red-500">*</span></label>
              <select v-model="form.accountType" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 shadow-inner">
                <option v-for="t in ACCOUNT_TYPES" :key="t.value" :value="t.value">{{ t.label }}</option>
              </select>
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Rekening <span class="text-red-500">*</span></label>
            <input v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 shadow-inner" placeholder="Rekening Operasional Utama" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. Rekening <span class="text-red-500">*</span></label>
              <input v-model="form.accountNo" class="w-full border rounded-lg px-3 py-2 text-sm font-mono font-black text-slate-800 outline-none focus:border-blue-500 shadow-inner" placeholder="1234-5678-901" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Saldo Awal (Rp)</label>
              <input type="number" v-model.number="form.balance" class="w-full border rounded-lg px-3 py-2 text-sm font-mono font-bold text-blue-700 outline-none focus:border-blue-500 shadow-inner" placeholder="0" />
            </div>
          </div>
          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="createDialog = false" class="bg-white border text-slate-700 font-bold px-5 shadow-sm" />
          <Button label="Daftarkan Rekening" :loading="saving" :disabled="!form.bankName || !form.name || !form.accountNo"
            @click="createAccount" class="bg-blue-700 border-none text-white font-bold px-6 shadow-sm" icon="pi pi-check" />
        </div>
      </div>
    </div>

    <!-- Add Transaction Dialog -->
    <div v-if="txnDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-base font-black text-slate-800">Tambah Transaksi Manual</div>
            <div class="text-xs text-slate-500 mt-0.5 font-mono">{{ txnTarget?.bankName }} · {{ txnTarget?.accountNo }}</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="txnDialog = false">✕</button>
        </div>

        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tipe <span class="text-red-500">*</span></label>
              <select v-model="txnForm.transType" class="w-full border rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-blue-500"
                :class="txnForm.transType === 'CREDIT' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'">
                <option value="CREDIT">CREDIT (Masuk ↑)</option>
                <option value="DEBIT">DEBIT (Keluar ↓)</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tanggal <span class="text-red-500">*</span></label>
              <input type="date" v-model="txnForm.transDate" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500" />
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Deskripsi <span class="text-red-500">*</span></label>
            <input v-model="txnForm.description" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500" placeholder="Pembayaran PO-2026/001..." />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Jumlah (Rp) <span class="text-red-500">*</span></label>
              <input type="number" v-model.number="txnForm.amount" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono outline-none focus:border-blue-500"
                :class="txnForm.transType === 'CREDIT' ? 'text-emerald-700' : 'text-rose-700'"
                placeholder="50000000" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Referensi</label>
              <input v-model="txnForm.reference" class="w-full border rounded-lg px-3 py-2 text-sm font-mono text-slate-600 outline-none focus:border-blue-500" placeholder="INV-2026/001" />
            </div>
          </div>
          <div v-if="txnError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ txnError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="txnSaving" @click="txnDialog = false" class="bg-white border text-slate-700 font-bold px-4" />
          <Button label="Simpan Transaksi" :loading="txnSaving"
            :disabled="!txnForm.transType || !txnForm.transDate || !txnForm.description || !txnForm.amount"
            @click="submitTxn"
            :class="txnForm.transType === 'CREDIT' ? 'bg-emerald-600' : 'bg-rose-600'"
            class="border-none text-white font-bold px-5" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type BankTransaction = {
  id: string; transDate: string; transType: string;
  description: string; amount: number | string; reference?: string; status: string;
};
type BankAccount = {
  id: string; accountNo: string; name: string; bankName: string;
  accountType: string; balance: number | string; isActive: boolean;
  transactions?: BankTransaction[];
};

const api = useApi();
const accounts = ref<BankAccount[]>([]);
const loading = ref(false);
const saving = ref(false);
const txnSaving = ref(false);
const selectedAccount = ref<BankAccount | null>(null);
const activeBank = ref('');
const createDialog = ref(false);
const txnDialog = ref(false);
const txnTarget = ref<BankAccount | null>(null);
const txnSearch = ref('');
const formError = ref('');
const txnError = ref('');

const form = reactive({ bankName: '', accountType: 'CHECKING', name: '', accountNo: '', balance: 0 });
const txnForm = reactive({
  transType: 'CREDIT', transDate: new Date().toISOString().slice(0, 10),
  description: '', amount: 0, reference: ''
});

const BANKS = ['BCA', 'Mandiri', 'BNI', 'BRI', 'BSI', 'CIMB Niaga', 'Danamon', 'Permata', 'Panin', 'Lainnya'];
const ACCOUNT_TYPES = [
  { value: 'CHECKING',    label: 'Giro (Checking)' },
  { value: 'SAVINGS',     label: 'Tabungan (Savings)' },
  { value: 'PAYROLL',     label: 'Payroll / Gaji' },
  { value: 'PETTY_CASH',  label: 'Kas Kecil (Petty Cash)' },
  { value: 'DEPOSIT',     label: 'Deposito' },
  { value: 'FOREIGN',     label: 'Valuta Asing (USD/SGD)' },
];

const BANK_COLORS: Record<string, string> = {
  BCA: '#0066AE', Mandiri: '#003d7a', BNI: '#FF6600', BRI: '#003366',
  BSI: '#00A859', 'CIMB Niaga': '#8B0000', Danamon: '#E50020',
  Permata: '#5B2D8E', Panin: '#007BC0',
};
const bankColor = (bank: string) => BANK_COLORS[bank] ?? '#64748b';

const acctTypeClass = (type: string) => {
  const map: Record<string, string> = {
    CHECKING: 'bg-blue-50 text-blue-700 border-blue-200',
    SAVINGS: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    PAYROLL: 'bg-violet-50 text-violet-700 border-violet-200',
    PETTY_CASH: 'bg-amber-50 text-amber-700 border-amber-200',
    DEPOSIT: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    FOREIGN: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  };
  return map[type] ?? 'bg-slate-100 text-slate-600 border-slate-200';
};

const activeAccounts = computed(() => accounts.value.filter(a => a.isActive));
const bankList = computed(() => [...new Set(accounts.value.map(a => a.bankName).filter(Boolean))]);
const totalBalance = computed(() => accounts.value.reduce((s, a) => s + Number(a.balance), 0));
const totalTransactionCount = computed(() => accounts.value.reduce((s, a) => s + (a.transactions?.length ?? 0), 0));

const filteredAccounts = computed(() => {
  if (!activeBank.value) return accounts.value;
  return accounts.value.filter(a => a.bankName === activeBank.value);
});

const filteredTxns = computed(() => {
  if (!selectedAccount.value?.transactions) return [];
  const list = [...selectedAccount.value.transactions].sort((a, b) =>
    new Date(b.transDate).getTime() - new Date(a.transDate).getTime()
  );
  if (!txnSearch.value) return list;
  const q = txnSearch.value.toLowerCase();
  return list.filter(t => t.description?.toLowerCase().includes(q) || t.reference?.toLowerCase().includes(q));
});

const totalCredit = (acct: BankAccount) =>
  (acct.transactions ?? []).filter(t => t.transType === 'CREDIT').reduce((s, t) => s + Number(t.amount), 0);
const totalDebit = (acct: BankAccount) =>
  (acct.transactions ?? []).filter(t => t.transType === 'DEBIT').reduce((s, t) => s + Math.abs(Number(t.amount)), 0);

const formatRupiah = (n: number) => {
  if (Math.abs(n) >= 1_000_000_000) return `Rp${(n / 1_000_000_000).toFixed(2)} M`;
  if (Math.abs(n) >= 1_000_000) return `Rp${(n / 1_000_000).toFixed(1)} jt`;
  return `Rp${n.toLocaleString('id-ID')}`;
};

const MONTHS_ID = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,'0')} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
};

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/finance/bank');
    accounts.value = res.data?.accounts ?? res.accounts ?? [];
    if (selectedAccount.value) {
      selectedAccount.value = accounts.value.find(a => a.id === selectedAccount.value!.id) ?? null;
    }
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openCreate = () => {
  form.bankName = ''; form.accountType = 'CHECKING'; form.name = ''; form.accountNo = ''; form.balance = 0;
  formError.value = '';
  createDialog.value = true;
};

const createAccount = async () => {
  saving.value = true; formError.value = '';
  try {
    await api.post('/finance/bank', {
      accountNo: form.accountNo, name: form.name,
      bankName: form.bankName, accountType: form.accountType,
    });
    createDialog.value = false;
    await load();
  } catch (e: any) {
    formError.value = e?.response?.data?.message ?? 'Gagal membuat rekening';
  } finally { saving.value = false; }
};

const openAddTxn = (acct: BankAccount) => {
  txnTarget.value = acct;
  txnForm.transType = 'CREDIT';
  txnForm.transDate = new Date().toISOString().slice(0, 10);
  txnForm.description = ''; txnForm.amount = 0; txnForm.reference = '';
  txnError.value = '';
  txnDialog.value = true;
};

const submitTxn = async () => {
  if (!txnTarget.value) return;
  txnSaving.value = true; txnError.value = '';
  try {
    const amt = txnForm.transType === 'DEBIT' ? -Math.abs(txnForm.amount) : Math.abs(txnForm.amount);
    await api.post(`/finance/bank/${txnTarget.value.id}/transactions`, {
      transDate: new Date(txnForm.transDate).toISOString(),
      transType: txnForm.transType,
      description: txnForm.description,
      amount: amt,
      reference: txnForm.reference || undefined,
    });
    txnDialog.value = false;
    await load();
  } catch (e: any) {
    txnError.value = e?.response?.data?.message ?? 'Gagal menyimpan transaksi';
  } finally { txnSaving.value = false; }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>