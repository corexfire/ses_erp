<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-amber-500 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-wallet text-[140px] text-amber-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-wallet text-amber-600"></i> Manajemen Kas (Cash Management)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola kas tunai perusahaan F&B: Kas Besar (Head Office), Kas Kecil (Petty Cash), Dana Darurat, dan Kas Cabang. Terintegrasi dengan Jurnal & Laporan Arus Kas.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="+ Pengisian Kas" size="small" outlined icon="pi pi-arrow-down"
            class="font-bold border-amber-400 text-amber-700 hover:bg-amber-50"
            @click="openReplenish" />
          <Button label="+ Tambah Kas" size="small" icon="pi pi-plus"
            class="bg-amber-500 text-white border-none font-bold shadow-sm hover:bg-amber-600"
            @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- KPI Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white border rounded-xl p-5 shadow-sm">
        <div class="text-3xl font-black text-amber-600">{{ accounts.length }}</div>
        <div class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Akun Kas</div>
      </div>
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm">
        <div class="text-lg font-black text-amber-800">{{ formatRupiah(totalBalance) }}</div>
        <div class="text-xs font-bold text-amber-700 mt-1 uppercase tracking-widest">Total Kas</div>
      </div>
      <div class="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
        <div class="text-3xl font-black text-slate-600">{{ totalTxns }}</div>
        <div class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Transaksi</div>
      </div>
      <div class="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md" @click="activeTab = 'replenish'">
        <div class="text-3xl font-black text-orange-700">{{ pendingReplenish }}</div>
        <div class="text-xs font-bold text-orange-600 mt-1 uppercase tracking-widest">Pengisian Pending</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 bg-white border rounded-xl p-1 shadow-sm w-fit">
      <button v-for="tab in TABS" :key="tab.key"
        class="px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-1.5"
        :class="activeTab === tab.key ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'"
        @click="activeTab = tab.key">
        <i :class="tab.icon" class="text-[11px]"></i> {{ tab.label }}
      </button>
    </div>

    <!-- ===== TAB: ACCOUNTS ===== -->
    <div v-if="activeTab === 'accounts'" class="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <!-- Account cards -->
      <div class="lg:col-span-2 space-y-3">
        <!-- Filter pills -->
        <div class="flex flex-wrap gap-1.5 mb-1">
          <button v-for="t in typeList" :key="t"
            class="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-all"
            :class="activeType === t ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'"
            @click="activeType = activeType === t ? '' : t">
            {{ t }}
          </button>
        </div>

        <div v-if="loading" class="bg-white border rounded-xl p-8 text-center text-slate-400">
          <i class="pi pi-spinner pi-spin mr-2 text-amber-500"></i> Memuat akun kas...
        </div>

        <div v-for="acct in filteredAccounts" :key="acct.id"
          class="bg-white border rounded-xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md"
          :class="selectedAccount?.id === acct.id ? 'border-amber-500 ring-2 ring-amber-200' : 'border-slate-200'"
          @click="selectedAccount = acct">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                :class="acctIconClass(acct.accountType)">
                <i :class="acctIcon(acct.accountType)" class="text-lg"></i>
              </div>
              <div>
                <div class="font-black text-slate-800 text-sm leading-tight">{{ acct.name }}</div>
                <div class="text-[10px] text-slate-400 font-mono mt-0.5">{{ acct.accountNo }}</div>
              </div>
            </div>
            <span class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0"
              :class="acctTypeBadge(acct.accountType)">{{ acct.accountType }}</span>
          </div>
          <div class="mt-3 pt-3 border-t flex justify-between items-center">
            <div>
              <div class="text-[10px] text-slate-400 font-bold mb-0.5">SALDO KAS</div>
              <div class="font-black text-lg" :class="Number(acct.balance) < 1_000_000 ? 'text-rose-600' : 'text-amber-700'">
                {{ formatRupiah(Number(acct.balance)) }}
              </div>
            </div>
            <div class="text-right">
              <div class="text-[10px] text-slate-400 font-bold mb-0.5">MUTASI</div>
              <div class="font-black text-slate-600">{{ acct.transactions?.length ?? 0 }}</div>
            </div>
          </div>
          <!-- Low balance warning -->
          <div v-if="Number(acct.balance) < 1_000_000 && acct.accountType === 'PETTY_CASH'"
            class="mt-2 flex items-center gap-1.5 text-[10px] font-black text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-2 py-1.5">
            <i class="pi pi-exclamation-triangle text-[9px]"></i> Kas kecil hampir habis — perlu pengisian!
          </div>
          <div class="mt-2 flex justify-end">
            <Button label="+ Transaksi" size="small" outlined icon="pi pi-plus"
              class="text-[9px] h-6 px-2 font-bold text-amber-700 border-amber-300 hover:bg-amber-500 hover:text-white hover:border-amber-500"
              @click.stop="openAddTxn(acct)" />
          </div>
        </div>

        <div v-if="!loading && filteredAccounts.length === 0" class="bg-white border rounded-xl p-8 text-center text-slate-400 italic">
          Tidak ada akun kas.
        </div>
      </div>

      <!-- Right: ledger detail -->
      <div class="lg:col-span-3">
        <div v-if="!selectedAccount" class="bg-white border rounded-xl p-12 text-center h-full flex flex-col items-center justify-center gap-3">
          <i class="pi pi-wallet text-5xl text-slate-200"></i>
          <div class="font-bold text-slate-400">Pilih akun kas di kiri untuk melihat ledger mutasi</div>
        </div>

        <div v-else class="bg-white border rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
          <!-- Header -->
          <div class="p-5 border-b flex-shrink-0" style="border-left: 4px solid #f59e0b; background: linear-gradient(to right, #fffbeb, #fff)">
            <div class="flex items-start justify-between">
              <div>
                <div class="font-black text-xl text-slate-800">{{ selectedAccount.name }}</div>
                <div class="text-sm text-slate-500 font-mono font-bold mt-0.5">{{ selectedAccount.accountNo }} · {{ selectedAccount.accountType }}</div>
              </div>
              <span class="text-[9px] font-black uppercase px-2 py-1 rounded-full border"
                :class="acctTypeBadge(selectedAccount.accountType)">
                {{ selectedAccount.accountType }}
              </span>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-3">
              <div class="bg-amber-50 border border-amber-100 rounded-lg p-3 text-center">
                <div class="text-[9px] text-amber-600 font-black uppercase tracking-widest">Saldo</div>
                <div class="font-black text-amber-900 text-sm mt-0.5">{{ formatRupiah(Number(selectedAccount.balance)) }}</div>
              </div>
              <div class="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-center">
                <div class="text-[9px] text-emerald-600 font-black uppercase tracking-widest">Penerimaan</div>
                <div class="font-black text-emerald-900 text-sm mt-0.5">{{ formatRupiah(totalCredit(selectedAccount)) }}</div>
              </div>
              <div class="bg-rose-50 border border-rose-100 rounded-lg p-3 text-center">
                <div class="text-[9px] text-rose-600 font-black uppercase tracking-widest">Pengeluaran</div>
                <div class="font-black text-rose-900 text-sm mt-0.5">{{ formatRupiah(totalDebit(selectedAccount)) }}</div>
              </div>
            </div>
          </div>

          <!-- Transactions -->
          <div class="flex-1 overflow-y-auto max-h-96">
            <div class="px-5 py-2.5 bg-slate-50 border-b flex items-center justify-between sticky top-0 z-10">
              <div class="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                Ledger Mutasi ({{ selectedAccount.transactions?.length ?? 0 }})
              </div>
              <InputText v-model="txnSearch" placeholder="Cari..." class="w-36 h-7 text-[10px]" />
            </div>

            <div v-if="!filteredTxns.length" class="p-8 text-center text-slate-400 italic text-sm">Belum ada mutasi kas.</div>

            <div v-for="(txn, idx) in filteredTxns" :key="txn.id"
              class="px-5 py-3 hover:bg-amber-50/20 transition border-b border-slate-50 flex items-center gap-3 last:border-0">
              <div class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
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
                <div class="text-[9px] text-slate-400 font-bold">{{ txn.status }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== TAB: PETTY CASH / REPLENISHMENT ===== -->
    <div v-if="activeTab === 'replenish'">
      <div class="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div class="p-4 border-b bg-slate-50 flex items-center justify-between">
          <div class="text-[11px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
            <i class="pi pi-arrow-circle-down text-amber-600"></i> Daftar Pengisian Kas Kecil (Petty Cash Replenishment)
          </div>
          <Button label="+ Pengisian Baru" size="small" icon="pi pi-plus"
            class="bg-amber-500 text-white border-none font-bold text-[10px] h-7 px-3"
            @click="openReplenish" />
        </div>
        <table class="w-full text-sm">
          <thead class="bg-amber-900 text-left text-[11px] text-white uppercase tracking-widest font-bold">
            <tr>
              <th class="px-5 py-3">No. Permintaan</th>
              <th class="px-4 py-3 border-l">Akun Kas Kecil</th>
              <th class="px-4 py-3 border-l text-right">Jumlah</th>
              <th class="px-4 py-3 border-l text-center">Tanggal</th>
              <th class="px-4 py-3 border-l text-center">Status</th>
              <th class="px-4 py-3 border-l">Catatan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loadingReplenish">
              <td colspan="6" class="py-10 text-center text-slate-400">
                <i class="pi pi-spinner pi-spin mr-2 text-amber-500"></i> Memuat data pengisian kas...
              </td>
            </tr>
            <tr v-for="rep in replenishments" v-else :key="rep.id"
              class="border-t transition hover:bg-amber-50/10"
              :class="rep.status === 'REJECTED' ? 'opacity-50' : ''">
              <td class="px-5 py-3 align-middle">
                <span class="font-mono font-black text-sm text-amber-700">{{ rep.requestNo }}</span>
              </td>
              <td class="px-4 py-3 border-l align-middle text-sm font-medium text-slate-700">
                {{ rep.cashAccount?.name ?? '—' }}
              </td>
              <td class="px-4 py-3 border-l text-right align-middle">
                <span class="font-black font-mono text-blue-700">{{ formatRupiah(Number(rep.amount)) }}</span>
              </td>
              <td class="px-4 py-3 border-l text-center align-middle text-xs text-slate-600">
                {{ formatDate(rep.requestDate) }}
              </td>
              <td class="px-4 py-3 border-l text-center align-middle">
                <span :class="{
                  'bg-emerald-50 text-emerald-700 border-emerald-300': rep.status === 'APPROVED',
                  'bg-amber-50 text-amber-700 border-amber-300': rep.status === 'PENDING',
                  'bg-rose-50 text-rose-700 border-rose-300': rep.status === 'REJECTED',
                }" class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border">
                  {{ rep.status }}
                </span>
              </td>
              <td class="px-4 py-3 border-l text-xs text-slate-500 max-w-xs truncate" :title="rep.notes">
                {{ rep.notes ?? '—' }}
              </td>
            </tr>
            <tr v-if="!loadingReplenish && replenishments.length === 0">
              <td colspan="6" class="py-10 text-center text-slate-400 italic">Belum ada permintaan pengisian kas kecil.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Account Dialog -->
    <div v-if="createDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-wallet text-amber-600"></i> Tambah Akun Kas
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="createDialog = false">✕</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tipe Kas <span class="text-red-500">*</span></label>
              <select v-model="form.accountType" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-amber-500 shadow-inner">
                <option v-for="t in CASH_TYPES" :key="t.value" :value="t.value">{{ t.label }}</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. Akun <span class="text-red-500">*</span></label>
              <input v-model="form.accountNo" class="w-full border rounded-lg px-3 py-2 text-sm font-mono font-black text-slate-800 outline-none focus:border-amber-500 shadow-inner" placeholder="CASH-008" />
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Akun Kas <span class="text-red-500">*</span></label>
            <input v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-amber-500 shadow-inner" placeholder="Kas Kecil Cabang Medan" />
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Saldo Awal (Rp)</label>
            <input type="number" v-model.number="form.balance" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-amber-700 outline-none focus:border-amber-500 shadow-inner" placeholder="0" />
          </div>
          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="createDialog = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button label="Buat Akun Kas" :loading="saving" :disabled="!form.name || !form.accountNo"
            @click="createAccount" class="bg-amber-500 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>

    <!-- Add Transaction Dialog -->
    <div v-if="txnDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-base font-black text-slate-800">Tambah Mutasi Kas</div>
            <div class="text-xs text-slate-500 mt-0.5 font-mono">{{ txnTarget?.accountNo }} · {{ txnTarget?.name }}</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="txnDialog = false">✕</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Jenis <span class="text-red-500">*</span></label>
              <select v-model="txnForm.transType" class="w-full border rounded-lg px-3 py-2 text-sm font-black outline-none focus:border-amber-500"
                :class="txnForm.transType === 'CREDIT' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'">
                <option value="CREDIT">PENERIMAAN KAS (↑)</option>
                <option value="DEBIT">PENGELUARAN KAS (↓)</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tanggal <span class="text-red-500">*</span></label>
              <input type="date" v-model="txnForm.transDate" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-amber-500" />
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Keterangan <span class="text-red-500">*</span></label>
            <input v-model="txnForm.description" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-amber-500" placeholder="Pembelian ATK kantor..." />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Jumlah (Rp) <span class="text-red-500">*</span></label>
              <input type="number" v-model.number="txnForm.amount" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono outline-none focus:border-amber-500"
                :class="txnForm.transType === 'CREDIT' ? 'text-emerald-700' : 'text-rose-700'"
                placeholder="500000" min="1" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. Referensi</label>
              <input v-model="txnForm.reference" class="w-full border rounded-lg px-3 py-2 text-sm font-mono text-slate-600 outline-none focus:border-amber-500" placeholder="BKK-001" />
            </div>
          </div>
          <div v-if="txnError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ txnError }}</div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="txnSaving" @click="txnDialog = false" class="bg-white border text-slate-700 font-bold px-4" />
          <Button label="Catat Mutasi" :loading="txnSaving"
            :disabled="!txnForm.transType || !txnForm.transDate || !txnForm.description || !txnForm.amount"
            @click="submitTxn"
            :class="txnForm.transType === 'CREDIT' ? 'bg-emerald-600' : 'bg-rose-600'"
            class="border-none text-white font-bold px-5" icon="pi pi-check" />
        </div>
      </div>
    </div>

    <!-- Replenishment Dialog -->
    <div v-if="replenishDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-amber-50 flex justify-between items-center rounded-t-2xl">
          <div class="text-base font-black text-amber-900 flex items-center gap-2">
            <i class="pi pi-arrow-down text-amber-600"></i> Permintaan Pengisian Kas Kecil
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="replenishDialog = false">✕</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Akun Kas Kecil <span class="text-red-500">*</span></label>
            <select v-model="repForm.cashAccountId" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-amber-500">
              <option value="">-- Pilih Akun --</option>
              <option v-for="a in pettyAccounts" :key="a.id" :value="a.id">
                {{ a.accountNo }} — {{ a.name }} (Saldo: {{ formatRupiah(Number(a.balance)) }})
              </option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. Permintaan</label>
              <input v-model="repForm.requestNo" class="w-full border rounded-lg px-3 py-2 text-sm font-mono font-black text-slate-800 outline-none focus:border-amber-500" placeholder="PCR-2026/005" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Jumlah (Rp) <span class="text-red-500">*</span></label>
              <input type="number" v-model.number="repForm.amount" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-amber-700 outline-none focus:border-amber-500" placeholder="5000000" min="1" />
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Catatan</label>
            <input v-model="repForm.notes" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-amber-500" placeholder="Top-up rutin kas kecil bulan ini..." />
          </div>
          <div class="bg-amber-50 border border-amber-100 rounded-lg p-3 text-[10px] text-amber-800 font-medium flex items-start gap-2">
            <i class="pi pi-info-circle text-amber-600 mt-0.5"></i>
            Permintaan akan disimpan dengan status <b>PENDING</b> dan menunggu persetujuan. Dana akan masuk ke saldo kas setelah APPROVED.
          </div>
          <div v-if="repError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ repError }}</div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="repSaving" @click="replenishDialog = false" class="bg-white border text-slate-700 font-bold px-4" />
          <Button label="Ajukan Pengisian" :loading="repSaving"
            :disabled="!repForm.cashAccountId || !repForm.amount"
            @click="submitReplenish"
            class="bg-amber-500 border-none text-white font-bold px-5" icon="pi pi-send" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type CashTransaction = { id: string; transDate: string; transType: string; description: string; amount: number | string; reference?: string; status: string; };
type CashAccount = { id: string; accountNo: string; name: string; accountType: string; balance: number | string; isActive: boolean; transactions?: CashTransaction[]; };
type Replenishment = { id: string; requestNo: string; cashAccountId: string; cashAccount?: CashAccount; requestDate: string; amount: number | string; status: string; notes?: string; };

const api = useApi();
const accounts = ref<CashAccount[]>([]);
const replenishments = ref<Replenishment[]>([]);
const loading = ref(false);
const loadingReplenish = ref(false);
const saving = ref(false);
const txnSaving = ref(false);
const repSaving = ref(false);

const selectedAccount = ref<CashAccount | null>(null);
const activeTab = ref('accounts');
const activeType = ref('');
const txnSearch = ref('');
const createDialog = ref(false);
const txnDialog = ref(false);
const replenishDialog = ref(false);
const txnTarget = ref<CashAccount | null>(null);
const formError = ref('');
const txnError = ref('');
const repError = ref('');

const form = reactive({ accountNo: '', name: '', accountType: 'CASH', balance: 0 });
const txnForm = reactive({ transType: 'DEBIT', transDate: new Date().toISOString().slice(0, 10), description: '', amount: 0, reference: '' });
const repForm = reactive({ cashAccountId: '', requestNo: '', amount: 0, notes: '' });

const TABS = [
  { key: 'accounts', label: 'Daftar Akun Kas', icon: 'pi pi-wallet' },
  { key: 'replenish', label: 'Pengisian Kas Kecil', icon: 'pi pi-arrow-down' },
];
const CASH_TYPES = [
  { value: 'CASH', label: 'Kas Umum (Cash)' },
  { value: 'PETTY_CASH', label: 'Kas Kecil (Petty Cash)' },
  { value: 'SAFE', label: 'Brankas / Dana Darurat' },
  { value: 'ADVANCE', label: 'Dana Panjar Dinas' },
];

const TYPE_ICONS: Record<string, string> = {
  CASH: 'pi pi-money-bill', PETTY_CASH: 'pi pi-wallet', SAFE: 'pi pi-lock', ADVANCE: 'pi pi-credit-card',
};
const TYPE_ICON_CLASS: Record<string, string> = {
  CASH: 'bg-amber-100 text-amber-700', PETTY_CASH: 'bg-orange-100 text-orange-700',
  SAFE: 'bg-slate-200 text-slate-700', ADVANCE: 'bg-blue-100 text-blue-700',
};
const TYPE_BADGE: Record<string, string> = {
  CASH: 'bg-amber-50 text-amber-700 border-amber-300',
  PETTY_CASH: 'bg-orange-50 text-orange-700 border-orange-300',
  SAFE: 'bg-slate-100 text-slate-600 border-slate-300',
  ADVANCE: 'bg-blue-50 text-blue-700 border-blue-200',
};
const acctIcon = (t: string) => TYPE_ICONS[t] ?? 'pi pi-wallet';
const acctIconClass = (t: string) => TYPE_ICON_CLASS[t] ?? 'bg-slate-100 text-slate-600';
const acctTypeBadge = (t: string) => TYPE_BADGE[t] ?? 'bg-slate-100 text-slate-600 border-slate-200';

const typeList = computed(() => [...new Set(accounts.value.map(a => a.accountType))]);
const pettyAccounts = computed(() => accounts.value.filter(a => a.accountType === 'PETTY_CASH'));
const totalBalance = computed(() => accounts.value.reduce((s, a) => s + Number(a.balance), 0));
const totalTxns = computed(() => accounts.value.reduce((s, a) => s + (a.transactions?.length ?? 0), 0));
const pendingReplenish = computed(() => replenishments.value.filter(r => r.status === 'PENDING').length);

const filteredAccounts = computed(() => activeType.value ? accounts.value.filter(a => a.accountType === activeType.value) : accounts.value);
const filteredTxns = computed(() => {
  if (!selectedAccount.value?.transactions) return [];
  const list = [...selectedAccount.value.transactions].sort((a, b) => new Date(b.transDate).getTime() - new Date(a.transDate).getTime());
  if (!txnSearch.value) return list;
  const q = txnSearch.value.toLowerCase();
  return list.filter(t => t.description?.toLowerCase().includes(q) || t.reference?.toLowerCase().includes(q));
});

const totalCredit = (acct: CashAccount) => (acct.transactions ?? []).filter(t => t.transType === 'CREDIT').reduce((s, t) => s + Number(t.amount), 0);
const totalDebit = (acct: CashAccount) => (acct.transactions ?? []).filter(t => t.transType === 'DEBIT').reduce((s, t) => s + Math.abs(Number(t.amount)), 0);

const MONTHS_ID = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const formatDate = (iso: string) => { if (!iso) return '-'; const d = new Date(iso); return `${String(d.getDate()).padStart(2,'0')} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`; };
const formatRupiah = (n: number) => {
  if (Math.abs(n) >= 1_000_000_000) return `Rp${(n / 1_000_000_000).toFixed(2)} M`;
  if (Math.abs(n) >= 1_000_000) return `Rp${(n / 1_000_000).toFixed(1)} jt`;
  return `Rp${Math.abs(n).toLocaleString('id-ID')}`;
};

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/finance/cash');
    accounts.value = res.data?.accounts ?? res.accounts ?? [];
    if (selectedAccount.value) selectedAccount.value = accounts.value.find(a => a.id === selectedAccount.value!.id) ?? null;
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const loadReplenishments = async () => {
  loadingReplenish.value = true;
  try {
    const res = await api.get('/finance/cash/replenishments').catch(() => ({ data: { replenishments: [] } }));
    replenishments.value = res.data?.replenishments ?? [];
  } catch (e) { replenishments.value = []; }
  finally { loadingReplenish.value = false; }
};

const openCreate = () => {
  form.accountNo = ''; form.name = ''; form.accountType = 'CASH'; form.balance = 0;
  formError.value = '';
  createDialog.value = true;
};

const createAccount = async () => {
  saving.value = true; formError.value = '';
  try {
    await api.post('/finance/cash', { accountNo: form.accountNo, name: form.name, accountType: form.accountType });
    createDialog.value = false;
    await load();
  } catch (e: any) { formError.value = e?.response?.data?.message ?? 'Gagal membuat akun kas'; }
  finally { saving.value = false; }
};

const openAddTxn = (acct: CashAccount) => {
  txnTarget.value = acct;
  txnForm.transType = 'DEBIT'; txnForm.transDate = new Date().toISOString().slice(0, 10);
  txnForm.description = ''; txnForm.amount = 0; txnForm.reference = '';
  txnError.value = '';
  txnDialog.value = true;
};

const submitTxn = async () => {
  if (!txnTarget.value) return;
  txnSaving.value = true; txnError.value = '';
  try {
    const amt = txnForm.transType === 'DEBIT' ? -Math.abs(txnForm.amount) : Math.abs(txnForm.amount);
    await api.post(`/finance/cash/${txnTarget.value.id}/transactions`, {
      transDate: new Date(txnForm.transDate).toISOString(),
      transType: txnForm.transType, description: txnForm.description,
      amount: amt, reference: txnForm.reference || undefined,
    });
    txnDialog.value = false; await load();
  } catch (e: any) { txnError.value = e?.response?.data?.message ?? 'Gagal menyimpan'; }
  finally { txnSaving.value = false; }
};

const openReplenish = () => {
  repForm.cashAccountId = ''; repForm.requestNo = ''; repForm.amount = 0; repForm.notes = '';
  repError.value = '';
  replenishDialog.value = true;
};

const submitReplenish = async () => {
  repSaving.value = true; repError.value = '';
  try {
    await api.post('/finance/cash/replenishments', {
      cashAccountId: repForm.cashAccountId,
      requestNo: repForm.requestNo,
      amount: repForm.amount,
      notes: repForm.notes,
      requestDate: new Date().toISOString(),
    }).catch(() => {});
    replenishDialog.value = false;
    await loadReplenishments();
    activeTab.value = 'replenish';
  } catch (e: any) { repError.value = e?.response?.data?.message ?? 'Gagal mengajukan pengisian'; }
  finally { repSaving.value = false; }
};

watch(activeTab, (tab) => { if (tab === 'replenish') loadReplenishments(); });
onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>