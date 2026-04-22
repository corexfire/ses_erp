<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium Analytics Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-violet-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-violet-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-violet-100">Financial Intelligence</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-violet-600 uppercase tracking-widest tracking-tighter">Dasbor Analisis Pusat</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Laporan <span class="text-violet-600 italic font-medium">Keuangan</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70 italic border-l-2 border-violet-500 pl-4">Konsolidasi neraca saldo, laba rugi, dan kesehatan likuiditas perusahaan per tanggal cut-off yang ditentukan.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Laporan</div>
           <div class="text-2xl font-black text-violet-700 tabular-nums tracking-tighter">VERIFIED (SYNC)</div>
        </div>
        <Button label="KONFIGURASI LAPORAN" icon="pi pi-cog" severity="help" @click="dialogOpen = true"
          class="h-14 px-8 rounded-[1.25rem] bg-violet-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-violet-100 hover:scale-[1.05] active:scale-95 transition-all text-violet-100" />
      </div>
    </div>

    <!-- Analytics Board (KPI Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mx-6">
        <!-- Net Profit Card -->
        <div class="bg-slate-900 rounded-[2rem] p-8 shadow-xl relative overflow-hidden group transition-all hover:translate-y-[-5px]">
           <div class="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-125 transition-transform duration-700 text-violet-500"><i class="pi pi-chart-line text-[140px]"></i></div>
           <div class="flex justify-between items-start relative z-10">
              <span class="px-3 py-1 bg-violet-500/20 text-violet-300 text-[8px] font-black uppercase tracking-[0.2em] rounded-full border border-violet-500/30 shadow-sm">NET PROFITABILITY</span>
              <i class="pi pi-bolt text-violet-400 animate-pulse"></i>
           </div>
           <div class="mt-8 text-4xl font-black text-white tabular-nums tracking-tighter relative z-10">
              {{ formatRupiah(profitLossObj.netProfit) }}
           </div>
           <div class="mt-6 flex items-center justify-between text-[9px] font-black uppercase tracking-widest relative z-10 opacity-70">
              <div class="flex flex-col">
                 <span class="text-slate-500 mb-1">Total Pendapatan</span>
                 <span class="text-emerald-400">{{ formatRupiah(profitLossObj.totalIncome) }}</span>
              </div>
              <div class="flex flex-col text-right">
                 <span class="text-slate-500 mb-1">Total Beban</span>
                 <span class="text-rose-400">-{{ formatRupiah(profitLossObj.totalExpenses) }}</span>
              </div>
           </div>
        </div>

        <!-- Total Assets Card -->
        <div class="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col justify-between group transition-all hover:bg-slate-50">
           <div class="flex justify-between items-center">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Aset (Aktiva)</div>
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm"><i class="pi pi-wallet"></i></div>
           </div>
           <div>
              <div class="mt-4 text-3xl font-black text-slate-800 tabular-nums tracking-tighter">{{ formatRupiah(balanceSheetObj.totalAssets) }}</div>
              <p class="mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest italic opacity-50">Posisi Likuiditas Per {{ fmtDate(asOfDate) }}</p>
           </div>
        </div>

        <!-- Balance Check Card -->
        <div class="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col justify-between group transition-all" :class="balanceSheetObj.check ? 'hover:bg-emerald-50/50' : 'bg-rose-50 border-rose-200'">
           <div class="flex justify-between items-center">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hutang & Modal (Pasiva)</div>
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" :class="balanceSheetObj.check ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-500 text-white animate-bounce'"><i class="pi pi-building"></i></div>
           </div>
           <div>
              <div class="mt-4 text-3xl font-black text-slate-800 tabular-nums tracking-tighter">{{ formatRupiah((balanceSheetObj.totalLiabilities || 0) + (balanceSheetObj.totalEquity || 0)) }}</div>
              <div class="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm" :class="balanceSheetObj.check ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-500 text-white'">
                 <i :class="balanceSheetObj.check ? 'pi pi-check-circle' : 'pi pi-exclamation-triangle'"></i>
                 {{ balanceSheetObj.check ? 'NERACA SEIMBANG' : 'NERACA TIDAK SEIMBANG' }}
              </div>
           </div>
        </div>
    </div>

    <!-- Tabbed Report Workspace -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Tab Navigation -->
      <div class="bg-slate-50 border-b border-slate-100 flex overflow-x-auto custom-scrollbar">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
            class="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative shrink-0"
            :class="activeTab === tab.id ? 'text-violet-700 bg-white shadow-[0_4px_0_0_#7c3aed_inset]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'">
             <i :class="tab.icon" class="mr-2 text-[12px]"></i> {{ tab.label }}
             <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 right-0 h-1 bg-violet-600"></div>
          </button>
      </div>

      <div class="p-10 relative min-h-[500px]">
          <div v-if="loading" class="absolute inset-0 z-10 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
             <i class="pi pi-spinner pi-spin text-4xl text-violet-600 opacity-20"></i>
             <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Sinkronisasi Jurnal Keuangan...</div>
          </div>

          <!-- ════════════════ TAB: PROFIT & LOSS ════════════════ -->
          <div v-if="activeTab === 'pl'" class="animate-fade-in-up">
              <div class="flex justify-between items-center mb-10">
                 <div>
                    <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight italic">Laba Rugi <span class="text-violet-600">Pabrik</span></h2>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Periode Operasional s/d {{ fmtDateIndo(asOfDate) }}</p>
                 </div>
                 <div class="w-16 h-1 bg-slate-100 rounded-full"></div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <!-- Income Section -->
                  <div class="space-y-6">
                     <span class="px-4 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">Revenue Flow</span>
                     <table class="w-full text-sm">
                        <tbody class="divide-y divide-slate-50">
                           <tr v-for="inc in profitLossObj.income" :key="inc.code" class="group transition-colors hover:bg-slate-50">
                               <td class="py-4 font-mono text-[10px] font-black text-slate-400 w-24">{{inc.code}}</td>
                               <td class="py-4 font-black text-slate-800 uppercase tracking-tight text-[11px] group-hover:text-violet-600 transition-colors">{{inc.name}}</td>
                               <td class="py-4 text-right font-mono font-black text-emerald-600 tabular-nums">{{formatRupiah(inc.amount)}}</td>
                           </tr>
                           <tr class="bg-emerald-50/50">
                              <td colspan="2" class="py-5 px-4 font-black text-emerald-900 uppercase tracking-[0.2em] text-[10px]">Total Pendapatan Operasional</td>
                              <td class="py-5 px-4 text-right text-emerald-700 text-lg font-black tabular-nums">{{formatRupiah(profitLossObj.totalIncome)}}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

                  <!-- Expense Section -->
                  <div class="space-y-6">
                     <span class="px-4 py-1 bg-rose-50 text-rose-700 rounded-lg text-[9px] font-black uppercase tracking-widest border border-rose-100 shadow-sm">Operating Expenses</span>
                     <table class="w-full text-sm">
                        <tbody class="divide-y divide-slate-50">
                           <tr v-for="exp in profitLossObj.expenses" :key="exp.code" class="group transition-colors hover:bg-slate-50">
                               <td class="py-4 font-mono text-[10px] font-black text-slate-400 w-24">{{exp.code}}</td>
                               <td class="py-4 font-black text-slate-800 uppercase tracking-tight text-[11px] group-hover:text-rose-600 transition-colors">{{exp.name}}</td>
                               <td class="py-4 text-right font-mono font-black text-rose-600 tabular-nums">{{formatRupiah(exp.amount)}}</td>
                           </tr>
                           <tr class="bg-rose-50/50">
                              <td colspan="2" class="py-5 px-4 font-black text-rose-900 uppercase tracking-[0.2em] text-[10px]">Total Beban & Biaya Unit</td>
                              <td class="py-5 px-4 text-right text-rose-700 text-lg font-black tabular-nums">-{{formatRupiah(profitLossObj.totalExpenses)}}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
              </div>

              <div class="mt-12 p-8 bg-slate-900 rounded-[2.5rem] flex items-center justify-between border-b-8 border-violet-600 shadow-xl overflow-hidden relative group">
                 <div class="absolute right-0 top-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl transition-all group-hover:bg-violet-500/20"></div>
                 <div class="relative">
                    <div class="text-[9px] font-black text-violet-400 uppercase tracking-[0.3em] mb-2 leading-none italic">Net Operational Liquidity Result</div>
                    <div class="text-slate-500 text-[10px] font-bold uppercase tracking-widest opacity-60">Hasil Laba Bersih Setelah Pajak (PAT)</div>
                 </div>
                 <div class="text-5xl font-black tabular-nums tracking-tighter relative" :class="profitLossObj.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'">
                    {{formatRupiah(profitLossObj.netProfit)}}
                 </div>
              </div>
          </div>

          <!-- ════════════════ TAB: BALANCE SHEET ════════════════ -->
          <div v-if="activeTab === 'bs'" class="animate-fade-in-up">
              <div class="flex justify-between items-center mb-10">
                 <div>
                    <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight italic">Neraca <span class="text-violet-600">Keuangan</span></h2>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Snapshot Posisi Aset & Kewajiban per {{ fmtDateIndo(asOfDate) }}</p>
                 </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <!-- Assets -->
                  <div class="space-y-6">
                     <div class="flex items-center justify-between px-6 py-4 bg-blue-900 text-white rounded-2xl shadow-xl">
                        <span class="text-[10px] font-black uppercase tracking-widest">Aktivitas Aset (Aktiva)</span>
                        <span class="font-mono font-black tabular-nums text-blue-300 uppercase tracking-tighter">{{ formatRupiah(balanceSheetObj.totalAssets) }}</span>
                     </div>
                     <table class="w-full text-sm border-x border-b border-slate-50">
                        <tbody class="divide-y divide-slate-50">
                           <tr v-for="ast in balanceSheetObj.assets" :key="ast.code" class="group hover:bg-slate-50">
                               <td class="py-4 px-4 font-mono text-[10px] font-black text-slate-400 w-24 border-r border-slate-50">{{ast.code}}</td>
                               <td class="py-4 px-4 font-black text-slate-800 uppercase tracking-tight text-[11px] transition-colors group-hover:text-blue-700">{{ast.name}}</td>
                               <td class="py-4 px-4 text-right font-mono font-black text-slate-700 tabular-nums italic border-l border-slate-50 opacity-80">{{formatRupiah(ast.balance)}}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

                  <!-- Liabilities & Equity -->
                  <div class="space-y-8">
                     <!-- Liabilities -->
                     <div class="space-y-4">
                        <div class="flex items-center justify-between px-6 py-4 bg-slate-900 text-white rounded-2xl shadow-xl">
                           <span class="text-[10px] font-black uppercase tracking-widest">Kewajiban (Liabilities)</span>
                           <span class="font-mono font-black tabular-nums text-amber-500 uppercase tracking-tighter">{{ formatRupiah(balanceSheetObj.totalLiabilities) }}</span>
                        </div>
                        <table class="w-full text-sm border-x border-b border-slate-50">
                           <tbody class="divide-y divide-slate-50">
                              <tr v-for="liab in balanceSheetObj.liabilities" :key="liab.code" class="group hover:bg-slate-50">
                                  <td class="py-4 px-4 font-mono text-[10px] font-black text-slate-400 w-24 border-r border-slate-50">{{liab.code}}</td>
                                  <td class="py-4 px-4 font-black text-slate-800 uppercase tracking-tight text-[11px] transition-colors group-hover:text-amber-700">{{liab.name}}</td>
                                  <td class="py-4 px-4 text-right font-mono font-black text-slate-700 tabular-nums italic border-l border-slate-50 opacity-80">{{formatRupiah(liab.balance)}}</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>

                     <!-- Equity -->
                     <div class="space-y-4">
                        <div class="flex items-center justify-between px-6 py-4 bg-indigo-50 text-indigo-800 border border-indigo-100 rounded-2xl shadow-sm">
                           <span class="text-[10px] font-black uppercase tracking-widest">Ekuitas (Modal Saham)</span>
                           <span class="font-mono font-black tabular-nums text-indigo-600 uppercase tracking-tighter">{{ formatRupiah(balanceSheetObj.totalEquity) }}</span>
                        </div>
                        <table class="w-full text-sm border-x border-b border-slate-50">
                           <tbody class="divide-y divide-slate-50">
                              <tr v-for="eq in balanceSheetObj.equity" :key="eq.code" class="group hover:bg-slate-50">
                                  <td class="py-4 px-4 font-mono text-[10px] font-black text-slate-400 w-24 border-r border-slate-50">{{eq.code}}</td>
                                  <td class="py-4 px-4 font-black text-slate-800 uppercase tracking-tight text-[11px] transition-colors group-hover:text-indigo-700">{{eq.name}}</td>
                                  <td class="py-4 px-4 text-right font-mono font-black text-slate-700 tabular-nums italic border-l border-slate-50 opacity-80">{{formatRupiah(eq.balance)}}</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
              </div>
          </div>

          <!-- ════════════════ TAB: TRIAL BALANCE ════════════════ -->
          <div v-if="activeTab === 'tb'" class="animate-fade-in-up">
              <div class="flex justify-between items-center mb-10">
                 <div>
                    <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight italic">Neraca <span class="text-violet-600">Saldo</span></h2>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Daftar Saldo Akhir Matrix Buku Besar per {{ fmtDateIndo(asOfDate) }}</p>
                 </div>
              </div>

              <div class="overflow-hidden rounded-3xl border border-slate-100 shadow-xl">
                 <table class="w-full text-sm text-left">
                     <thead class="bg-slate-900 text-white text-[9px] uppercase tracking-[0.2em] font-black">
                        <tr>
                           <th class="px-8 py-5 border-r border-slate-800 w-32">Kode Akun</th>
                           <th class="px-8 py-5 border-r border-slate-800">Nama Akun (COA Registry)</th>
                           <th class="px-8 py-5 border-r border-slate-800 text-center w-36">Ket. Tipe</th>
                           <th class="px-8 py-5 border-r border-slate-800 text-right w-48">Debit (IDR)</th>
                           <th class="px-8 py-5 text-right w-48">Kredit (IDR)</th>
                        </tr>
                     </thead>
                     <tbody class="divide-y divide-slate-50 text-[11px]">
                        <tr v-for="tb in trialBalanceArr" :key="tb.code" class="group hover:bg-violet-50/30 transition-all border-l-4 border-l-transparent hover:border-l-violet-400">
                           <td class="px-8 py-4 border-r border-slate-50 font-mono font-black text-slate-400">{{tb.code}}</td>
                           <td class="px-8 py-4 border-r border-slate-50 font-black text-slate-800 uppercase tracking-tighter group-hover:text-violet-700 transition-colors">{{tb.name}}</td>
                           <td class="px-8 py-4 border-r border-slate-50 text-center">
                              <span class="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-slate-200 shadow-inner italic">{{tb.type}}</span>
                           </td>
                           <td class="px-8 py-4 border-r border-slate-50 text-right font-mono font-black tabular-nums" :class="tb.debit > 0 ? 'text-slate-900 group-hover:text-violet-900' : 'text-slate-100'">{{tb.debit > 0 ? formatRupiah(tb.debit) : '0'}}</td>
                           <td class="px-8 py-4 text-right font-mono font-black tabular-nums" :class="tb.credit > 0 ? 'text-slate-900 group-hover:text-violet-900' : 'text-slate-100'">{{tb.credit > 0 ? formatRupiah(tb.credit) : '0'}}</td>
                        </tr>
                        <tr class="bg-slate-900 text-white">
                           <td colspan="3" class="px-8 py-6 text-right font-black uppercase tracking-[0.3em] text-[9px] text-violet-400 italic">Grand Total Matrix Base</td>
                           <td class="px-8 py-6 font-mono text-right border-l border-slate-800 text-xl font-black tabular-nums">{{formatRupiah(trialBalanceTotal.debit)}}</td>
                           <td class="px-8 py-6 font-mono text-right border-l border-slate-800 text-xl font-black tabular-nums">{{formatRupiah(trialBalanceTotal.credit)}}</td>
                        </tr>
                     </tbody>
                 </table>
              </div>
          </div>

          <!-- ════════════════ TAB: GENERAL LEDGER ════════════════ -->
          <div v-if="activeTab === 'gl'" class="animate-fade-in-up">
              <div class="flex justify-between items-center mb-10">
                 <div>
                    <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight italic">Buku <span class="text-violet-600">Besar Matrix</span></h2>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Detail Mutasi Jurnal per Akun Registry per {{ fmtDateIndo(asOfDate) }}</p>
                 </div>
              </div>

              <div class="space-y-10">
                  <div v-for="gl in glArr" :key="gl.code" class="rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden group">
                      <div class="bg-white px-8 py-6 border-b border-white shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] flex flex-col md:flex-row justify-between md:items-center gap-4 group-hover:bg-slate-50 transition-colors">
                          <div class="flex items-center gap-5">
                              <div class="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center font-mono font-black text-sm shadow-xl">{{gl.code}}</div>
                              <div>
                                 <div class="text-[11px] font-black uppercase text-slate-800 tracking-tight transition-colors group-hover:text-violet-700 italic">{{gl.name}}</div>
                                 <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Chart of Account Ledger</div>
                              </div>
                          </div>
                          <div class="flex items-center gap-10">
                              <div class="text-right">
                                 <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Saldo Awal</div>
                                 <div class="font-mono font-black text-[11px]" :class="gl.openingBalance >= 0 ? 'text-slate-800' : 'text-rose-600'">{{formatRupiah(Math.abs(gl.openingBalance))}}</div>
                              </div>
                              <div class="px-6 py-2 bg-violet-50 rounded-xl border border-violet-100 text-right shadow-sm translate-y-[-2px] group-hover:scale-105 transition-all">
                                 <div class="text-[8px] font-black text-violet-400 uppercase tracking-widest mb-1">Saldo Akhir</div>
                                 <div class="font-mono font-black text-sm text-violet-700 tabular-nums">{{formatRupiah(Math.abs(gl.closingBalance))}}</div>
                              </div>
                          </div>
                      </div>
                      <table class="w-full text-sm text-left">
                          <thead class="bg-white text-[9px] uppercase tracking-widest font-black text-slate-400 border-b border-slate-50">
                              <tr>
                                  <th class="px-8 py-4 border-r border-slate-50 w-32">Entry No</th>
                                  <th class="px-6 py-4 border-r border-slate-50 w-28 text-center">Tgl Mutasi</th>
                                  <th class="px-6 py-4 border-r border-slate-50">Detail Keterangan Ledger</th>
                                  <th class="px-6 py-4 border-r border-slate-50 w-36 text-right">Debit</th>
                                  <th class="px-6 py-4 border-r border-slate-50 w-36 text-right">Kredit</th>
                                  <th class="px-8 py-4 text-right w-40 bg-slate-50/50">Running Balance</th>
                              </tr>
                          </thead>
                          <tbody class="divide-y divide-slate-50 text-[10px]">
                              <tr v-for="tx in gl.transactions" :key="tx.entryNo + tx.entryDate" class="hover:bg-violet-50/20 group">
                                  <td class="px-8 py-4 border-r border-slate-50 font-mono font-black text-slate-400">{{tx.entryNo}}</td>
                                  <td class="px-6 py-4 border-r border-slate-50 text-slate-600 font-bold opacity-70 text-center">{{fmtDate(tx.entryDate)}}</td>
                                  <td class="px-6 py-4 border-r border-slate-50">
                                      <div class="text-slate-800 font-black uppercase tracking-tighter truncate max-w-sm">{{tx.description}}</div>
                                      <div v-if="tx.costCenter" class="mt-1 text-[8px] font-black px-1.5 py-0.5 bg-violet-100 text-violet-600 rounded inline-block uppercase italic tracking-widest">{{tx.costCenter}}</div>
                                  </td>
                                  <td class="px-6 py-4 border-r border-slate-50 text-right font-mono font-black tabular-nums" :class="tx.debit > 0 ? 'text-slate-900 group-hover:text-violet-900' : 'text-slate-50'">{{tx.debit > 0 ? formatRupiah(tx.debit) : '0'}}</td>
                                  <td class="px-6 py-4 border-r border-slate-50 text-right font-mono font-black tabular-nums" :class="tx.credit > 0 ? 'text-slate-900 group-hover:text-violet-900' : 'text-slate-50'">{{tx.credit > 0 ? formatRupiah(tx.credit) : '0'}}</td>
                                  <td class="px-8 py-4 text-right font-mono font-black tabular-nums bg-slate-50/30" :class="tx.balance >= 0 ? 'text-emerald-600' : 'text-rose-600'">{{formatRupiah(Math.abs(tx.balance))}}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>

          <!-- ════════════════ TAB: AGING ════════════════ -->
          <div v-if="activeTab === 'ag'" class="animate-fade-in-up">
              <div class="flex justify-between items-center mb-10">
                 <div>
                    <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight italic">Umur <span class="text-violet-600">Hutang & Piutang</span></h2>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Identifikasi Resiko Gagal Bayar & Jatuh Tempo per {{ fmtDateIndo(asOfDate) }}</p>
                 </div>
              </div>

              <!-- Aging Summary Matrix -->
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                  <div class="rounded-3xl p-4 bg-emerald-900 text-white shadow-xl flex flex-col justify-between group transition-all hover:translate-y-[-5px]">
                     <div class="text-[8px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2 leading-none uppercase italic">Belum Jatuh Tempo</div>
                     <div class="text-2xl font-black font-mono tabular-nums tracking-tighter">{{formatRupiah(agingSummary.current)}}</div>
                     <div class="mt-4 text-[7px] font-black text-emerald-500 uppercase tracking-widest opacity-60">Status Liquid / Aman</div>
                  </div>
                  <div class="rounded-3xl p-4 bg-amber-500 text-white shadow-xl flex flex-col justify-between group transition-all hover:translate-y-[-5px]">
                     <div class="text-[8px] font-black uppercase tracking-[0.3em] text-amber-900 mb-2 leading-none uppercase italic opacity-70">Terlambat 1 - 30 Hari</div>
                     <div class="text-2xl font-black font-mono tabular-nums tracking-tighter text-amber-950">{{formatRupiah(agingSummary.days30)}}</div>
                     <div class="mt-4 text-[7px] font-black text-amber-800 uppercase tracking-widest opacity-60">Status Warning Needed</div>
                  </div>
                  <div class="rounded-3xl p-4 bg-orange-600 text-white shadow-xl flex flex-col justify-between group transition-all hover:translate-y-[-5px]">
                     <div class="text-[8px] font-black uppercase tracking-[0.3em] text-orange-200 mb-2 leading-none uppercase italic opacity-70">Terlambat 31 - 90 Hari</div>
                     <div class="text-2xl font-black font-mono tabular-nums tracking-tighter">{{formatRupiah(agingSummary.days60)}}</div>
                     <div class="mt-4 text-[7px] font-black text-orange-200 uppercase tracking-widest opacity-60">Status Action Required</div>
                  </div>
                  <div class="rounded-3xl p-4 bg-rose-600 text-white shadow-xl flex flex-col justify-between group transition-all hover:translate-y-[-5px]">
                     <div class="text-[8px] font-black uppercase tracking-[0.3em] text-rose-200 mb-2 leading-none uppercase italic opacity-70">Kritis > 90 Hari</div>
                     <div class="text-2xl font-black font-mono tabular-nums tracking-tighter">{{formatRupiah(agingSummary.over90)}}</div>
                     <div class="mt-4 text-[7px] font-black text-rose-200 uppercase tracking-widest opacity-60">Status Bad Debt Threat</div>
                  </div>
              </div>

              <div class="overflow-hidden rounded-3xl border border-slate-100 shadow-xl">
                 <table class="w-full text-sm text-left">
                     <thead class="bg-indigo-900 text-indigo-300 text-[9px] uppercase tracking-[0.2em] font-black border-none">
                        <tr>
                           <th class="px-8 py-5 text-center w-24">Tipe</th>
                           <th class="px-6 py-5">Identitas Mitra Strategis</th>
                           <th class="px-6 py-5 w-40">Referensi Faktur</th>
                           <th class="px-6 py-5 text-center w-36 italic opacity-70">Tgl Jatuh Tempo</th>
                           <th class="px-6 py-5 text-center w-28 italic opacity-70">Keterlambatan</th>
                           <th class="px-8 py-5 text-right w-48">Nilai Saldo (IDR)</th>
                        </tr>
                     </thead>
                     <tbody class="divide-y divide-slate-50 text-[11px] bg-white">
                        <tr v-for="ag in agingArr" :key="ag.invoiceNo" class="group hover:bg-indigo-50/20 transition-all border-l-4 border-l-transparent" :class="ag.daysOverdue > 90 ? 'hover:border-l-rose-500' : 'hover:border-l-indigo-400'">
                           <td class="px-8 py-4 text-center">
                              <span :class="ag.type === 'AR' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-rose-50 text-rose-700 border-rose-100'" 
                                class="inline-flex rounded-lg px-2 py-0.5 text-[8px] font-black uppercase tracking-widest shadow-sm border italic">
                                 {{ag.type}}
                              </span>
                           </td>
                           <td class="px-6 py-4 font-black text-slate-800 uppercase tracking-tighter group-hover:text-indigo-700 transition-colors">{{ag.supplierName || ag.customerName || 'Mitra Anonim'}}</td>
                           <td class="px-6 py-4 font-mono font-black text-slate-400 group-hover:text-slate-600 transition-colors uppercase">{{ag.invoiceNo}}</td>
                           <td class="px-6 py-4 text-center font-black text-slate-500 italic opacity-70">{{fmtDate(ag.dueDate)}}</td>
                           <td class="px-6 py-4 text-center font-black" :class="ag.daysOverdue > 60 ? 'text-rose-600' : 'text-amber-600'">
                              {{ag.daysOverdue}} HARI
                           </td>
                           <td class="px-8 py-4 text-right font-mono font-black tabular-nums italic" :class="ag.type === 'AR' ? 'text-blue-800' : 'text-rose-800'">{{formatRupiah(ag.amount)}}</td>
                        </tr>
                        <tr v-if="agingArr.length === 0">
                           <td colspan="6" class="py-32 text-center text-slate-500 bg-emerald-50/20">
                              <div class="text-6xl mb-4 opacity-10">🗓️</div>
                              <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em]">Sempurna! Tidak ada tunggakan faktur terdeteksi di buku AP/AR.</div>
                           </td>
                        </tr>
                     </tbody>
                 </table>
              </div>
          </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ ANALYTICS CONFIG DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-2xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-violet-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-violet-700 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-violet-200">
               <i class="pi pi-cog text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Opsi <span class="text-violet-600 italic text-2xl">Laporan</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-violet-500 italic">Financial Parameter Configuration</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-violet-50 h-14 w-14" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 pb-32">
           <!-- Form Section -->
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8 text-slate-900">
              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Cut-Off Strategis (As-Of Date)</label>
                 <input type="date" v-model="asOfDate" class="w-full h-16 px-6 rounded-2xl bg-slate-50 border-2 border-slate-50 text-xl font-black text-slate-800 outline-none focus:border-violet-500 focus:bg-white transition-all font-mono shadow-sm" />
              </div>

              <!-- Cost Center Filter Selection -->
              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Filter Departemen / Cost Center (GL Only)</label>
                 <select v-model="filterCostCenter" class="w-full h-16 px-6 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-violet-500 shadow-sm cursor-pointer uppercase italic">
                    <option value="">-- Semua Unit Departemen --</option>
                    <option v-for="cc in costCenters" :key="cc.id" :value="cc.id">{{ cc.name }}</option>
                 </select>
              </div>

              <!-- Export Options Selection -->
              <div class="space-y-4">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Pilih Format Keluaran (Export Format)</label>
                  <div class="grid grid-cols-2 gap-4">
                      <div @click="exportFormat = 'pdf'" :class="exportFormat === 'pdf' ? 'bg-violet-600 text-white shadow-xl shadow-violet-100 border-violet-600' : 'bg-slate-50 text-slate-400 border-slate-50'" class="p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 group">
                          <i class="pi pi-file-pdf text-xl"></i>
                          <div class="text-[10px] font-black uppercase tracking-widest">Dokumen PDF</div>
                      </div>
                      <div @click="exportFormat = 'excel'" :class="exportFormat === 'excel' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100 border-emerald-600' : 'bg-slate-50 text-slate-400 border-slate-50'" class="p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 group">
                          <i class="pi pi-file-excel text-xl"></i>
                          <div class="text-[10px] font-black uppercase tracking-widest">Laporan Excel</div>
                      </div>
                  </div>
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20">
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button label="Jalankan Query & Apply" icon="pi pi-sync" :loading="loading" @click="loadAll"
             class="h-14 px-10 rounded-[1.25rem] bg-violet-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-violet-100 hover:scale-[1.02] active:scale-95 transition-all text-violet-100" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();
const route = useRoute();

const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(() => { refVar.value = null; }, 3000); };

const tabs = [
  { id: 'pl', label: 'Profit & Loss', icon: 'pi pi-chart-line' },
  { id: 'bs', label: 'Balance Sheet', icon: 'pi pi-building' },
  { id: 'tb', label: 'Trial Balance', icon: 'pi pi-table' },
  { id: 'gl', label: 'Buku Besar (GL)', icon: 'pi pi-book' },
  { id: 'ag', label: 'AR/AP Aging', icon: 'pi pi-clock' },
];

const activeTab = ref('pl');

// Deep linking handle
watch(() => route.query.tab, (newTab) => {
  if (newTab && tabs.some(t => t.id === newTab)) {
    activeTab.value = newTab as string;
  }
}, { immediate: true });

const asOfDate = ref(new Date().toISOString().slice(0, 10));
const loading = ref(false);
const dialogOpen = ref(false);

const profitLossObj = ref<any>({ income: [], expenses: [], totalIncome: 0, totalExpenses: 0, netProfit: 0 });
const balanceSheetObj = ref<any>({ assets: [], liabilities: [], equity: [], totalAssets: 0, totalLiabilities: 0, totalEquity: 0, check: true });
const trialBalanceArr = ref<any[]>([]);
const trialBalanceTotal = ref({ debit: 0, credit: 0 });
const agingArr = ref<any[]>([]);
const agingSummary = ref<any>({ current: 0, days30: 0, days60: 0, over90: 0, total: 0 });
const glArr = ref<any[]>([]);

// New filters and configs
const filterCostCenter = ref('');
const costCenters = ref<any[]>([]);
const exportFormat = ref('pdf');

const loadDeps = async () => {
    try {
        const ccRes = await api.get('/core/cost-centers');
        if(ccRes.data?.costCenters) costCenters.value = ccRes.data.costCenters;
    } catch(e) {
        console.warn('Gagal muat deps laporan', e);
    }
}

const loadAll = async () => {
    loading.value = true;
    if(costCenters.value.length === 0) await loadDeps();

    const query = `?asOfDate=${asOfDate.value}${filterCostCenter.value ? `&costCenterId=${filterCostCenter.value}` : ''}`;
    
    // Use an array of report configs to simplify loading and error handling
    const reportConfigs = [
        { key: 'pl', endpoint: `/finance/reports/profit-loss?endDate=${asOfDate.value}`, setterPath: 'profitLoss', dataKey: 'profitLoss' },
        { key: 'bs', endpoint: `/finance/reports/balance-sheet${query}`, setterPath: 'balanceSheetObj', dataKey: 'balanceSheet' },
        { key: 'tb', endpoint: `/finance/reports/trial-balance${query}`, setterPath: 'trialBalanceArr', dataKey: 'trialBalance' },
        { key: 'gl', endpoint: `/finance/reports/general-ledger${query}`, setterPath: 'glArr', dataKey: 'generalLedger' },
        { key: 'ag', endpoint: `/finance/reports/aging${query}`, setterPath: 'agingArr', dataKey: 'agingData' }
    ];

    try {
        await Promise.all(reportConfigs.map(async (config) => {
            try {
                const res = await api.get(config.endpoint);
                const payload: any = res.data || res;
                
                if (config.key === 'pl') {
                    if (payload?.profitLoss) profitLossObj.value = payload.profitLoss;
                } else if (config.key === 'bs') {
                    if (payload?.balanceSheet) balanceSheetObj.value = payload.balanceSheet;
                } else if (config.key === 'tb') {
                    if (payload?.trialBalance) {
                        trialBalanceArr.value = payload.trialBalance;
                        trialBalanceTotal.value = { debit: payload.totalDebit, credit: payload.totalCredit };
                    }
                } else if (config.key === 'gl') {
                    if (payload?.generalLedger) glArr.value = payload.generalLedger;
                } else if (config.key === 'ag') {
                    if (payload?.agingData) {
                        agingArr.value = payload.agingData;
                        agingSummary.value = payload.summary;
                    }
                }
            } catch (err: any) {
                console.error(`Error loading report [${config.key}]:`, err);
                // Optionally notify user about partial failure
            }
        }));

        if(dialogOpen.value) {
           dialogOpen.value = false;
           showMsg(success, 'Data Analitik Keuangan berhasil diregenerasi.');
        }

    } catch(e: any) {
        console.error('Critical failure loading reports', e);
    } finally {
        loading.value = false;
    }
}

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';
const fmtDateIndo = (d: string) => {
    if(!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}

const formatRupiah = (val: number | string) => {
   if(!val && val !== 0) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

onMounted(() => {
    loadAll();
});
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>