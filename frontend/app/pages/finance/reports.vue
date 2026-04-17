<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-violet-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             <i class="pi pi-chart-line text-violet-600"></i> Financial Reports & Analytics (F&B / Pabrik)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
             Dasbor pusat Laporan Keuangan terintegrasi. Analisis Profit & Loss, Neraca, Trial Balance, dan Umur Hutang/Piutang.
          </div>
        </div>
        <div class="flex gap-2">
           <input type="date" v-model="asOfDate" class="border rounded px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-violet-500" @change="loadAll" />
           <Button label="Refresh Dasbor" size="small" bg="bg-violet-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-violet-700" icon="pi pi-refresh" :loading="loading" @click="loadAll" />
        </div>
      </div>
    </div>

    <!-- P&L and Balance Sheet Quick Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
       <!-- Profit & Loss Summary Card -->
       <div class="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-xl p-5 shadow-lg border border-violet-800 text-white relative overflow-hidden group">
          <div class="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-500"><i class="pi pi-briefcase text-[120px]"></i></div>
          <div class="text-violet-200 text-[10px] font-bold uppercase tracking-widest mb-1 relative z-10">Laba Bersih (Net Profit)</div>
          <div class="text-3xl font-black font-mono tracking-tight relative z-10 flex items-center gap-2">
              {{ formatRupiah(profitLossObj.netProfit) }}
          </div>
          <div class="mt-4 flex gap-4 text-xs font-bold relative z-10">
             <div><span class="text-violet-300">Pendapatan:</span> <span class="text-emerald-400">{{ formatRupiah(profitLossObj.totalIncome) }}</span></div>
             <div><span class="text-violet-300">Beban:</span> <span class="text-rose-400">{{ formatRupiah(profitLossObj.totalExpenses) }}</span></div>
          </div>
       </div>

       <!-- Assets Card -->
       <div class="bg-white rounded-xl p-5 shadow-sm border text-slate-800 group">
          <div class="flex justify-between items-start">
             <div class="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Aset (Aktiva)</div>
             <i class="pi pi-wallet text-emerald-500 p-2 bg-emerald-50 rounded-lg"></i>
          </div>
          <div class="text-2xl font-black font-mono tracking-tight mt-1 text-slate-800">
              {{ formatRupiah(balanceSheetObj.totalAssets) }}
          </div>
          <div class="mt-3 text-[10px] bg-slate-100 py-1 px-2 rounded inline-block font-semibold text-slate-600">
             Cek Neraca Anda di tab Balance Sheet
          </div>
       </div>

       <!-- Liabilities Card -->
       <div class="bg-white rounded-xl p-5 shadow-sm border text-slate-800 group">
          <div class="flex justify-between items-start">
             <div class="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Hutang & Ekuitas (Pasiva)</div>
             <i class="pi pi-building text-rose-500 p-2 bg-rose-50 rounded-lg"></i>
          </div>
          <div class="text-2xl font-black font-mono tracking-tight mt-1" :class="balanceSheetObj.check ? 'text-slate-800' : 'text-rose-600'">
              {{ formatRupiah((balanceSheetObj.totalLiabilities || 0) + (balanceSheetObj.totalEquity || 0)) }}
          </div>
          <div class="mt-3 text-[10px] py-1 px-2 rounded inline-block font-bold tracking-wider" :class="balanceSheetObj.check ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'">
             <i :class="balanceSheetObj.check ? 'pi pi-check-circle' : 'pi pi-exclamation-triangle'"></i>
             {{ balanceSheetObj.check ? ' NERACA SEIMBANG (BALANCE)' : ' NERACA TIDAK SEIMBANG' }}
          </div>
       </div>
    </div>

    <!-- TABS -->
    <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
       <div class="flex border-b bg-slate-50 overflow-x-auto print:hidden">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                  class="px-6 py-3.5 text-sm font-bold tracking-tight transition-all uppercase"
                  :class="activeTab === tab.id ? 'border-b-2 border-violet-600 text-violet-800 bg-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'">
             <i :class="tab.icon" class="mr-2"></i> {{ tab.label }}
          </button>
       </div>

       <div class="p-6 relative min-h-[400px]">
          
          <div v-if="loading" class="absolute inset-0 z-50 bg-white/80 flex flex-col items-center justify-center backdrop-blur-sm">
             <i class="pi pi-spin pi-spinner text-violet-600 text-4xl mb-4"></i>
             <div class="font-bold text-slate-600 animate-pulse">Memuat Laporan Ledger...</div>
          </div>

          <!-- TAB: PROFIT & LOSS -->
          <div v-if="activeTab === 'pl'" class="space-y-6 animate-fade-in-up">
             <div class="text-center mb-8">
                <h2 class="text-2xl font-black text-slate-800">Laporan Laba Rugi (Profit & Loss)</h2>
                <p class="text-slate-500 text-sm mt-1">Periode s/d {{ fmtDateIndo(asOfDate) }}</p>
             </div>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <!-- Pendapatan -->
                 <div>
                    <h3 class="text-lg font-bold text-emerald-700 border-b-2 border-emerald-100 pb-2 mb-4">Pendapatan (Income)</h3>
                    <table class="w-full text-sm">
                       <tbody>
                          <tr v-for="inc in profitLossObj.income" :key="inc.code" class="border-b border-slate-100 hover:bg-slate-50">
                              <td class="py-2.5 font-mono text-slate-500 w-24 border-r pr-2">{{inc.code}}</td>
                              <td class="py-2.5 pl-2 font-semibold text-slate-700">{{inc.name}}</td>
                              <td class="py-2.5 text-right font-mono font-black text-emerald-600">{{formatRupiah(inc.amount)}}</td>
                          </tr>
                          <tr class="bg-emerald-50 font-bold border-t-2 border-emerald-200">
                             <td colspan="2" class="py-3 px-2 text-emerald-900 uppercase tracking-widest text-[11px]">Total Pendapatan</td>
                             <td class="py-3 px-2 text-right text-emerald-700 text-lg">{{formatRupiah(profitLossObj.totalIncome)}}</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>

                 <!-- Beban -->
                 <div>
                    <h3 class="text-lg font-bold text-rose-700 border-b-2 border-rose-100 pb-2 mb-4">Beban & Biaya (Expenses)</h3>
                    <table class="w-full text-sm">
                       <tbody>
                          <tr v-for="exp in profitLossObj.expenses" :key="exp.code" class="border-b border-slate-100 hover:bg-slate-50">
                              <td class="py-2.5 font-mono text-slate-500 w-24 border-r pr-2">{{exp.code}}</td>
                              <td class="py-2.5 pl-2 font-semibold text-slate-700">{{exp.name}}</td>
                              <td class="py-2.5 text-right font-mono font-black text-rose-600">{{formatRupiah(exp.amount)}}</td>
                          </tr>
                          <tr class="bg-rose-50 font-bold border-t-2 border-rose-200">
                             <td colspan="2" class="py-3 px-2 text-rose-900 uppercase tracking-widest text-[11px]">Total Beban</td>
                             <td class="py-3 px-2 text-right text-rose-700 text-lg">-{{formatRupiah(profitLossObj.totalExpenses)}}</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
             </div>
             
             <!-- Net Profit Footer -->
             <div class="mt-8 bg-violet-50 rounded-xl p-6 border border-violet-100 flex justify-between items-center shadow-sm">
                <div>
                    <div class="text-[11px] font-bold uppercase tracking-widest text-violet-500 mb-1">Laba Bersih Operasional</div>
                    <div class="text-slate-700 text-xs font-semibold">Total Pendapatan dikurangi Total Beban</div>
                </div>
                <div class="text-3xl font-black font-mono" :class="profitLossObj.netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'">
                    {{formatRupiah(profitLossObj.netProfit)}}
                </div>
             </div>
          </div>

          <!-- TAB: BALANCE SHEET -->
          <div v-if="activeTab === 'bs'" class="space-y-6 animate-fade-in-up">
             <div class="text-center mb-8">
                <h2 class="text-2xl font-black text-slate-800">Laporan Neraca (Balance Sheet)</h2>
                <p class="text-slate-500 text-sm mt-1">Status posisi keuangan per {{ fmtDateIndo(asOfDate) }}</p>
             </div>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <!-- Assets -->
                 <div>
                    <h3 class="text-lg font-bold text-blue-700 border-b-2 border-blue-100 pb-2 mb-4 bg-blue-50 px-3 py-2 rounded-t-lg">Aset (Assets)</h3>
                    <table class="w-full text-sm border-x border-b rounded-b-lg">
                       <tbody>
                          <tr v-for="ast in balanceSheetObj.assets" :key="ast.code" class="border-b border-slate-100 hover:bg-slate-50">
                              <td class="py-2.5 px-3 font-mono text-slate-500 w-24 border-r pr-2">{{ast.code}}</td>
                              <td class="py-2.5 px-3 font-semibold text-slate-700">{{ast.name}}</td>
                              <td class="py-2.5 px-3 text-right font-mono font-black text-slate-800">{{formatRupiah(ast.balance)}}</td>
                          </tr>
                          <tr class="bg-blue-600 font-bold text-white">
                             <td colspan="2" class="py-3 px-3 uppercase tracking-widest text-[11px]">Total Aktiva</td>
                             <td class="py-3 px-3 text-right text-lg">{{formatRupiah(balanceSheetObj.totalAssets)}}</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>

                 <!-- Liabilities & Equity -->
                 <div>
                    <h3 class="text-lg font-bold text-amber-700 border-b-2 border-amber-100 pb-2 mb-4 bg-amber-50 px-3 py-2 rounded-t-lg">Kewajiban & Ekuitas (Liabilities & Equity)</h3>
                    
                    <div class="mb-2 text-xs font-bold text-amber-600 px-2 uppercase tracking-wide">Kewajiban (Hutang)</div>
                    <table class="w-full text-sm border-x border-t mb-4">
                       <tbody>
                          <tr v-for="liab in balanceSheetObj.liabilities" :key="liab.code" class="border-b border-slate-100 hover:bg-slate-50">
                              <td class="py-2.5 px-3 font-mono text-slate-500 w-24 border-r pr-2">{{liab.code}}</td>
                              <td class="py-2.5 px-3 font-semibold text-slate-700">{{liab.name}}</td>
                              <td class="py-2.5 px-3 text-right font-mono font-black text-slate-800">{{formatRupiah(liab.balance)}}</td>
                          </tr>
                          <tr class="bg-amber-100 font-bold border-b border-amber-200">
                             <td colspan="2" class="py-2 px-3 text-[10px] uppercase text-amber-800">Total Pasiva/Kewajiban</td>
                             <td class="py-2 px-3 text-right text-amber-900 border-l">{{formatRupiah(balanceSheetObj.totalLiabilities)}}</td>
                          </tr>
                       </tbody>
                    </table>

                    <div class="mb-2 text-xs font-bold text-teal-600 px-2 uppercase tracking-wide">Ekuitas (Modal)</div>
                    <table class="w-full text-sm border-x border-t">
                       <tbody>
                          <tr v-for="eq in balanceSheetObj.equity" :key="eq.code" class="border-b border-slate-100 hover:bg-slate-50">
                              <td class="py-2.5 px-3 font-mono text-slate-500 w-24 border-r pr-2">{{eq.code}}</td>
                              <td class="py-2.5 px-3 font-semibold text-slate-700">{{eq.name}}</td>
                              <td class="py-2.5 px-3 text-right font-mono font-black text-slate-800">{{formatRupiah(eq.balance)}}</td>
                          </tr>
                          <tr class="bg-teal-50 font-bold border-b border-teal-200">
                             <td colspan="2" class="py-2 px-3 text-[10px] uppercase text-teal-800">Total Ekuitas</td>
                             <td class="py-2 px-3 text-right text-teal-900 border-l">{{formatRupiah(balanceSheetObj.totalEquity)}}</td>
                          </tr>
                       </tbody>
                    </table>

                    <table class="w-full font-bold text-white mt-4 bg-amber-600 rounded-b-lg overflow-hidden">
                        <tbody>
                            <tr>
                                <td class="py-3 px-3 uppercase tracking-widest text-[11px]">Total Kewajiban + Ekuitas</td>
                                <td class="py-3 px-3 text-right text-lg">{{formatRupiah((balanceSheetObj.totalLiabilities || 0) + (balanceSheetObj.totalEquity || 0))}}</td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
             </div>
          </div>

          <!-- TAB: TRIAL BALANCE -->
          <div v-if="activeTab === 'tb'" class="animate-fade-in-up">
              <div class="flex justify-between items-end mb-6">
                 <div>
                    <h2 class="text-xl font-black text-slate-800">Neraca Saldo (Trial Balance)</h2>
                    <p class="text-slate-500 text-sm mt-1">Daftar saldo akhir Buku Besar per {{ fmtDateIndo(asOfDate) }}</p>
                 </div>
                 <Button icon="pi pi-print" label="Cetak PDF" size="small" outlined />
              </div>

              <div class="border rounded-xl overflow-hidden shadow-sm">
                 <table class="w-full text-sm text-left">
                     <thead class="bg-slate-800 text-white text-[11px] uppercase tracking-wider font-bold">
                        <tr>
                           <th class="px-4 py-3 border-r border-slate-700 w-24">Kode Akun</th>
                           <th class="px-4 py-3 border-r border-slate-700">Nama Akun (COA)</th>
                           <th class="px-4 py-3 border-r border-slate-700 text-center w-28">Tipe</th>
                           <th class="px-4 py-3 border-r border-slate-700 text-right w-36">Debit</th>
                           <th class="px-4 py-3 text-right w-36">Kredit</th>
                        </tr>
                     </thead>
                     <tbody class="divide-y text-xs font-medium">
                        <tr v-for="tb in trialBalanceArr" :key="tb.code" class="hover:bg-slate-50 transition-colors">
                           <td class="px-4 py-2 border-r font-mono text-slate-500">{{tb.code}}</td>
                           <td class="px-4 py-2 border-r font-bold text-slate-800">{{tb.name}}</td>
                           <td class="px-4 py-2 border-r text-center">
                              <span class="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px]">{{tb.type}}</span>
                           </td>
                           <td class="px-4 py-2 border-r text-right font-mono" :class="tb.debit > 0 ? 'text-slate-800' : 'text-slate-300'">{{tb.debit > 0 ? formatRupiah(tb.debit) : '-'}}</td>
                           <td class="px-4 py-2 text-right font-mono" :class="tb.credit > 0 ? 'text-slate-800' : 'text-slate-300'">{{tb.credit > 0 ? formatRupiah(tb.credit) : '-'}}</td>
                        </tr>
                        <tr class="bg-slate-100 border-t-2 border-slate-300 font-bold text-[13px]">
                           <td colspan="3" class="px-4 py-3 text-right uppercase tracking-widest text-[10px] text-slate-500">Grand Total Base</td>
                           <td class="px-4 py-3 font-mono text-right border-x border-slate-300 text-emerald-700">{{formatRupiah(trialBalanceTotal.debit)}}</td>
                           <td class="px-4 py-3 font-mono text-right text-rose-700">{{formatRupiah(trialBalanceTotal.credit)}}</td>
                        </tr>
                     </tbody>
                 </table>
                 <div v-if="trialBalanceTotal.debit !== trialBalanceTotal.credit" class="bg-rose-50 text-rose-700 font-bold text-center py-2 text-xs border-t border-rose-200">
                    <i class="pi pi-exclamation-triangle mr-2"></i> Peringatan: Trial Balance Tidak Balance! (Silakan periksa jurnal manual)
                 </div>
</div>
          </div>

          <!-- TAB: GENERAL LEDGER (BUKU BESAR) -->
          <div v-if="activeTab === 'gl'" class="animate-fade-in-up">
              <div class="flex justify-between items-end mb-6">
                  <div>
                      <h2 class="text-xl font-black text-slate-800">Buku Besar (General Ledger)</h2>
                      <p class="text-slate-500 text-sm mt-1">Détail transaksi per akun COA per {{ fmtDateIndo(asOfDate) }}</p>
                  </div>
                  <Button icon="pi pi-print" label="Cetak PDF" size="small" outlined />
              </div>

              <div v-if="glArr.length === 0" class="text-center py-12 text-slate-400">
                  <i class="pi pi-book text-4xl mb-4"></i>
                  <div>Belum ada transaksi di periode ini.</div>
              </div>

              <div v-else class="space-y-6">
                  <div v-for="gl in glArr" :key="gl.code" class="border rounded-xl overflow-hidden shadow-sm">
                      <div class="bg-slate-800 text-white px-4 py-3 flex justify-between items-center">
                          <div class="flex items-center gap-3">
                              <span class="font-mono font-bold text-emerald-400">{{gl.code}}</span>
                              <span class="font-semibold text-sm">{{gl.name}}</span>
                          </div>
                          <div class="flex items-center gap-4 text-xs">
                              <span class="text-slate-400">Saldo Awal:</span>
                              <span class="font-mono" :class="gl.openingBalance >= 0 ? 'text-white' : 'text-rose-400'">{{formatRupiah(Math.abs(gl.openingBalance))}}</span>
                              <span class="text-slate-400">Saldo Akhir:</span>
                              <span class="font-mono font-bold" :class="gl.closingBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{formatRupiah(Math.abs(gl.closingBalance))}}</span>
                          </div>
                      </div>
                      <table class="w-full text-sm text-left">
                          <thead class="bg-slate-100 text-[11px] uppercase tracking-wider font-bold text-slate-600">
                              <tr>
                                  <th class="px-4 py-2 border-r w-28">No. Jurnal</th>
                                  <th class="px-4 py-2 border-r w-24">Tgl</th>
                                  <th class="px-4 py-2 border-r">Keterangan</th>
                                  <th class="px-4 py-2 border-r w-28 text-center">Debit</th>
                                  <th class="px-4 py-2 border-r w-28 text-center">Kredit</th>
                                  <th class="px-4 py-2 text-right w-32">Saldo</th>
                              </tr>
                          </thead>
                          <tbody class="divide-y text-xs font-medium">
                              <tr v-for="tx in gl.transactions" :key="tx.entryNo + tx.entryDate" class="hover:bg-slate-50">
                                  <td class="px-4 py-2 border-r font-mono text-slate-500">{{tx.entryNo}}</td>
                                  <td class="px-4 py-2 border-r text-slate-600">{{fmtDate(tx.entryDate)}}</td>
                                  <td class="px-4 py-2 border-r">
                                      <div class="text-slate-800 truncate max-w-xs">{{tx.description}}</div>
                                      <div v-if="tx.costCenter" class="text-[9px] text-violet-600">{{tx.costCenter}}</div>
                                  </td>
                                  <td class="px-4 py-2 border-r text-right font-mono" :class="tx.debit > 0 ? 'text-slate-800' : 'text-slate-300'">{{tx.debit > 0 ? formatRupiah(tx.debit) : '-'}}</td>
                                  <td class="px-4 py-2 border-r text-right font-mono" :class="tx.credit > 0 ? 'text-slate-800' : 'text-slate-300'">{{tx.credit > 0 ? formatRupiah(tx.credit) : '-'}}</td>
                                  <td class="px-4 py-2 text-right font-mono font-bold" :class="tx.balance >= 0 ? 'text-emerald-600' : 'text-rose-600'">{{formatRupiah(Math.abs(tx.balance))}}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>

           <!-- TAB: AGING -->
          <div v-if="activeTab === 'ag'" class="animate-fade-in-up">
              <div class="flex justify-between items-center mb-6 border-b pb-4">
                 <div>
                    <h2 class="text-xl font-black text-slate-800">Laporan Umur Piutang & Hutang (Aging)</h2>
                    <p class="text-slate-500 text-sm mt-1">Mendeteksi resiko gagal bayar dan jadwal jatuh tempo per {{ fmtDateIndo(asOfDate) }}</p>
                 </div>
              </div>

              <!-- Summary Aging -->
              <div class="grid grid-cols-4 gap-4 mb-6">
                 <div class="border rounded-lg p-4 bg-emerald-50 text-emerald-800">
                    <div class="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">Belum Jatuh Tempo (< 30 Hari)</div>
                    <div class="text-xl font-black font-mono">{{formatRupiah(agingSummary.current)}}</div>
                 </div>
                 <div class="border rounded-lg p-4 bg-yellow-50 text-yellow-800 border-yellow-200">
                    <div class="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">Telat 1 - 30 Hari</div>
                    <div class="text-xl font-black font-mono">{{formatRupiah(agingSummary.days30)}}</div>
                 </div>
                 <div class="border rounded-lg p-4 bg-orange-50 text-orange-800 border-orange-200">
                    <div class="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">Telat 31 - 60 Hari</div>
                    <div class="text-xl font-black font-mono">{{formatRupiah(agingSummary.days60)}}</div>
                 </div>
                 <div class="border rounded-lg p-4 bg-rose-50 text-rose-800 border-rose-200">
                    <div class="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">Kritis (> 90 Hari)</div>
                    <div class="text-xl font-black font-mono">{{formatRupiah(agingSummary.over90)}}</div>
                 </div>
              </div>

              <div class="border rounded-xl overflow-hidden shadow-sm">
                 <table class="w-full text-sm text-left">
                     <thead class="bg-indigo-50 text-indigo-900 text-[11px] uppercase tracking-wider font-bold">
                        <tr>
                           <th class="px-4 py-3 border-r border-indigo-100 text-center w-20">Tipe</th>
                           <th class="px-4 py-3 border-r border-indigo-100">Mitra (Customer / Supplier)</th>
                           <th class="px-4 py-3 border-r border-indigo-100 w-32">No. Faktur</th>
                           <th class="px-4 py-3 border-r border-indigo-100 text-center w-32">Jatuh Tempo</th>
                           <th class="px-4 py-3 border-r border-indigo-100 text-center w-24">Keterlambatan</th>
                           <th class="px-4 py-3 text-right w-36">Nilai Terhutang</th>
                        </tr>
                     </thead>
                     <tbody class="divide-y text-xs font-medium bg-white">
                        <tr v-for="ag in agingArr" :key="ag.invoiceNo" class="hover:bg-slate-50 transition-colors">
                           <td class="px-4 py-2 border-r text-center">
                              <span :class="ag.type === 'AR' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'" class="px-1.5 py-0.5 rounded text-[10px] font-black tracking-widest">{{ag.type}}</span>
                           </td>
                           <td class="px-4 py-2 border-r font-bold text-slate-800">{{ag.supplierName || ag.customerName || 'Mitra Anonim'}}</td>
                           <td class="px-4 py-2 border-r font-mono text-slate-600">{{ag.invoiceNo}}</td>
                           <td class="px-4 py-2 border-r text-center font-bold text-slate-500">{{fmtDate(ag.dueDate)}}</td>
                           <td class="px-4 py-2 border-r text-center font-black" :class="ag.daysOverdue > 60 ? 'text-rose-600' : 'text-amber-600'">
                              {{ag.daysOverdue}} Hr
                           </td>
                           <td class="px-4 py-2 text-right font-mono font-black" :class="ag.type === 'AR' ? 'text-blue-700' : 'text-rose-700'">{{formatRupiah(ag.amount)}}</td>
                        </tr>
                        <tr v-if="agingArr.length === 0">
                           <td colspan="6" class="px-4 py-8 text-center text-slate-400 italic font-medium">Bagus! Tidak ada tunggakan faktur di atas tanggal ini.</td>
                        </tr>
                     </tbody>
                 </table>
              </div>
          </div>

       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const activeTab = ref('pl');
const tabs = [
  { id: 'pl', label: 'Profit & Loss', icon: 'pi pi-chart-line' },
  { id: 'bs', label: 'Balance Sheet', icon: 'pi pi-building' },
  { id: 'tb', label: 'Trial Balance', icon: 'pi pi-table' },
  { id: 'gl', label: 'Buku Besar (GL)', icon: 'pi pi-book' },
  { id: 'ag', label: 'AR/AP Aging', icon: 'pi pi-clock' },
];

const asOfDate = ref(new Date().toISOString().slice(0, 10));
const loading = ref(false);

const profitLossObj = ref<any>({ income: [], expenses: [], totalIncome: 0, totalExpenses: 0, netProfit: 0 });
const balanceSheetObj = ref<any>({ assets: [], liabilities: [], equity: [], totalAssets: 0, totalLiabilities: 0, totalEquity: 0, check: true });
const trialBalanceArr = ref<any[]>([]);
const trialBalanceTotal = ref({ debit: 0, credit: 0 });
const agingArr = ref<any[]>([]);
const agingSummary = ref<any>({ current: 0, days30: 0, days60: 0, over90: 0, total: 0 });
const glArr = ref<any[]>([]);

const loadAll = async () => {
    loading.value = true;
    try {
        const query = `?asOfDate=${asOfDate.value}`;
        
        // Panggil berbarengan untuk efisiensi
        const [plRes, bsRes, tbRes, glRes, agRes] = await Promise.all([
            api.get(`/finance/reports/profit-loss?endDate=${asOfDate.value}`),
            api.get(`/finance/reports/balance-sheet${query}`),
            api.get(`/finance/reports/trial-balance${query}`),
            api.get(`/finance/reports/general-ledger${query}`),
            api.get(`/finance/reports/aging${query}`)
        ]);

        if(plRes.data?.profitLoss || plRes.profitLoss) profitLossObj.value = plRes.data?.profitLoss || plRes.profitLoss;
        if(bsRes.data?.balanceSheet || bsRes.balanceSheet) balanceSheetObj.value = bsRes.data?.balanceSheet || bsRes.balanceSheet;
        
        if(tbRes.data?.trialBalance || tbRes.trialBalance) {
            const dt = tbRes.data || tbRes;
            trialBalanceArr.value = dt.trialBalance;
            trialBalanceTotal.value = { debit: dt.totalDebit, credit: dt.totalCredit };
        }

        if(glRes.data?.generalLedger || glRes.generalLedger) {
            glArr.value = glRes.data?.generalLedger || glRes.generalLedger;
        }

        if(agRes.data?.agingData || agRes.agingData) {
            const da = agRes.data || agRes;
            agingArr.value = da.agingData;
            agingSummary.value = da.summary;
        }

    } catch(e) {
        console.error('Failed loading reports', e);
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
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

onMounted(() => {
    loadAll();
});
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>