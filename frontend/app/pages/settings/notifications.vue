<template>
  <div class="space-y-4">
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Settings & Tools</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Notification Templates</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Notification <span class="text-rose-600 not-italic text-3xl">Templates</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3">Template notifikasi untuk setiap event ERP — email, WhatsApp, dan in-app notification.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="+ Tambah Template" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-all" @click="openCreate" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <div class="p-4 rounded-2xl bg-rose-950 text-white shadow-xl flex flex-col justify-between border border-rose-900 hover:bg-black group transition-all">
        <div class="text-[10px] font-black uppercase text-rose-400 tracking-[0.2em] mb-4">Total Template</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ templates.length }}</h3><div class="p-3 bg-white/5 rounded-xl group-hover:rotate-12 transition-transform"><i class="pi pi-envelope text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Aktif</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ templates.filter(t => t.status === 'ACTIVE').length }}</h3><div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-sky-600 tracking-[0.2em] mb-4">Email</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-sky-700 tracking-tighter leading-none">{{ templates.filter(t => t.channel === 'EMAIL').length }}</h3><div class="p-3 bg-sky-50 text-sky-600 rounded-xl border border-sky-100"><i class="pi pi-at text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-rose-100 tracking-[0.2em] mb-4">WhatsApp</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ templates.filter(t => t.channel === 'WHATSAPP').length }}</h3><div class="p-3 bg-white/10 rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-comment text-lg"></i></div></div>
      </div>
    </div>

    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden mt-6 pb-20">
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-xl"><i class="pi pi-envelope text-xl"></i></div>
          <div><h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] mb-1">Notification Template Registry</h3><p class="text-[9px] font-bold text-slate-400 uppercase font-mono">Event-Driven Notification Engine</p></div>
        </div>
        <div class="flex gap-3">
          <select v-model="filterChannel" class="border border-slate-200 rounded-2xl px-4 py-2 text-[10px] font-black uppercase text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400">
            <option value="">Semua Channel</option>
            <option value="EMAIL">Email</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="IN_APP">In-App</option>
          </select>
          <select v-model="filterModule" class="border border-slate-200 rounded-2xl px-4 py-2 text-[10px] font-black uppercase text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400">
            <option value="">Semua Modul</option>
            <option v-for="m in moduleList" :key="m" :value="m">{{ m }}</option>
          </select>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-white text-left border-b border-slate-50">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Template</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Modul</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Event</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Channel</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Status</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="t in filteredTemplates" :key="t.key" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-rose-400">
              <td class="px-8 py-5">
                <div class="flex items-center gap-3">
                  <div :class="['w-10 h-10 rounded-xl flex items-center justify-center text-sm group-hover:scale-110 transition-transform', channelColor(t.channel)]"><i :class="channelIcon(t.channel)"></i></div>
                  <div>
                    <div class="font-black text-[11px] text-slate-800">{{ t.name }}</div>
                    <div class="font-mono text-[9px] font-bold text-slate-400 uppercase mt-0.5">{{ t.key }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-5 border-l border-slate-50"><span class="text-[9px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded uppercase border border-indigo-200">{{ t.module }}</span></td>
              <td class="px-6 py-5 border-l border-slate-50"><code class="text-[10px] font-black font-mono text-slate-600">{{ t.eventKey }}</code></td>
              <td class="px-6 py-5 border-l border-slate-50">
                <span :class="['text-[9px] font-black px-2 py-0.5 rounded uppercase border', t.channel === 'EMAIL' ? 'bg-sky-100 text-sky-700 border-sky-200' : t.channel === 'WHATSAPP' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-orange-100 text-orange-700 border-orange-200']">{{ t.channel }}</span>
              </td>
              <td class="px-6 py-5 border-l border-slate-50 text-center">
                <span :class="['inline-flex rounded-full px-3 py-1 text-[9px] font-black uppercase border', t.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200']">{{ t.status }}</span>
              </td>
              <td class="px-8 py-5 border-l border-slate-50 text-right">
                <div class="opacity-0 group-hover:opacity-100 transition-all flex justify-end gap-2">
                  <Button icon="pi pi-eye" severity="secondary" rounded outlined size="small" class="w-8 h-8" @click="openView(t)" v-tooltip.top="'Detail'" />
                  <Button icon="pi pi-pencil" severity="secondary" rounded outlined size="small" class="w-8 h-8 border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white" @click="openEdit(t)" v-tooltip.top="'Edit'" />
                  <Button icon="pi pi-trash" severity="danger" rounded outlined size="small" class="w-8 h-8" @click="confirmDelete(t)" v-tooltip.top="'Hapus'" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- VIEW DIALOG -->
    <div v-if="viewDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="viewDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-2xl bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-rose-900 overflow-hidden animate-scale-in">
        <div class="p-8 border-b border-slate-100 flex items-center justify-between relative overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-rose-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div :class="['w-14 h-14 rounded-[1.5rem] text-white flex items-center justify-center shadow-xl', channelColor(selected?.channel || '')] "><i :class="['text-2xl', channelIcon(selected?.channel || '')]"></i></div>
            <div>
              <h3 class="text-xl font-black text-slate-900 uppercase">{{ selected?.name }}</h3>
              <code class="text-[10px] font-black text-rose-600 uppercase mt-1 block">{{ selected?.key }}</code>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="viewDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="p-8 space-y-4 bg-slate-50/30">
          <div class="grid grid-cols-3 gap-4">
            <div class="p-4 rounded-2xl bg-white border border-slate-100"><p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Modul</p><p class="text-[12px] font-black text-slate-900 mt-1">{{ selected?.module }}</p></div>
            <div class="p-4 rounded-2xl bg-white border border-slate-100"><p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Channel</p><p class="text-[12px] font-black text-slate-900 mt-1">{{ selected?.channel }}</p></div>
            <div class="p-4 rounded-2xl bg-white border border-slate-100"><p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</p><p class="text-[12px] font-black text-slate-900 mt-1">{{ selected?.status }}</p></div>
          </div>
          <div class="p-4 rounded-2xl bg-white border border-slate-100"><p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Event Key</p><code class="text-[12px] font-black text-indigo-600 font-mono">{{ selected?.eventKey }}</code></div>
          <div class="p-4 rounded-2xl bg-white border border-slate-100" v-if="selected?.subject"><p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject</p><p class="text-[12px] font-black text-slate-800">{{ selected?.subject }}</p></div>
          <div class="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Template Body</p>
            <pre class="text-[10px] font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed">{{ selected?.body }}</pre>
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3">
          <Button label="Edit Template" icon="pi pi-pencil" class="h-11 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="viewDialog = false; openEdit(selected)" />
          <Button label="Tutup" severity="secondary" outlined rounded @click="viewDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>

    <!-- CREATE / EDIT DIALOG -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="formDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-xl bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-rose-900 overflow-hidden animate-scale-in max-h-[92vh] flex flex-col">
        <div class="p-8 border-b border-slate-100 flex items-center justify-between relative overflow-hidden shrink-0">
          <div class="absolute top-0 right-0 w-40 h-40 bg-rose-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-14 h-14 rounded-[1.5rem] bg-rose-600 text-white flex items-center justify-center shadow-xl rotate-3 hover:rotate-0 transition-transform"><i class="pi pi-envelope text-2xl"></i></div>
            <div><h3 class="text-xl font-black text-slate-900 uppercase">{{ isEdit ? 'Edit' : 'Tambah' }} Template</h3><p class="text-[10px] font-black text-rose-600 uppercase mt-1">Notification Configuration</p></div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="formDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="flex-1 overflow-y-auto p-8 space-y-4 bg-slate-50/30">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Key</label>
              <input v-model="form.key" :disabled="isEdit" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-mono disabled:bg-slate-100" placeholder="event.key" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nama Template</label>
              <input v-model="form.name" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400" placeholder="Nama tampilan" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Modul</label>
              <select v-model="form.module" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 appearance-none">
                <option v-for="m in ['SALES','PROCUREMENT','FINANCE','INVENTORY','HRIS','PROJECT','SUPPORT','NOTIFICATION','TAX']" :key="m">{{ m }}</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Event Key</label>
              <input v-model="form.eventKey" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-black text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-mono" placeholder="module.event" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Channel</label>
            <div class="flex gap-3">
              <button v-for="ch in ['EMAIL','WHATSAPP','IN_APP']" :key="ch" @click="form.channel = ch" :class="['flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all', form.channel === ch ? 'bg-rose-600 text-white border-rose-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200']">{{ ch }}</button>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Subject (Email)</label>
            <input v-model="form.subject" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400" placeholder="Subject email..." />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Template Body</label>
            <textarea v-model="form.body" rows="5" class="w-full border border-slate-200 rounded-2xl px-4 py-3 text-[11px] font-mono text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400" placeholder="Halo {{name}}, notifikasi: ..."></textarea>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</label>
            <div class="flex gap-3">
              <button v-for="s in ['ACTIVE','INACTIVE']" :key="s" @click="form.status = s" :class="['px-5 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all', form.status === s ? 'bg-rose-600 text-white border-rose-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200']">{{ s }}</button>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
          <Button :label="isEdit ? 'Simpan' : 'Tambah Template'" icon="pi pi-save" class="h-11 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="saveForm" />
          <Button label="Batal" severity="secondary" outlined rounded @click="formDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>

    <!-- DELETE CONFIRM -->
    <div v-if="deleteDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="deleteDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-sm bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-rose-900 p-8 text-center animate-scale-in">
        <div class="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 text-3xl"><i class="pi pi-exclamation-triangle"></i></div>
        <h3 class="text-lg font-black text-slate-900 uppercase">Hapus Template?</h3>
        <p class="text-[11px] text-slate-500 mt-2">Template <strong>{{ selected?.name }}</strong> akan dihapus permanen.</p>
        <div class="flex gap-3 justify-center mt-6">
          <Button label="Ya, Hapus" icon="pi pi-trash" class="h-11 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="doDelete" />
          <Button label="Batal" severity="secondary" outlined rounded @click="deleteDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const filterChannel = ref('');
const filterModule = ref('');
const viewDialog = ref(false);
const formDialog = ref(false);
const deleteDialog = ref(false);
const isEdit = ref(false);
const selected = ref<any>(null);
const form = reactive({ key: '', name: '', module: 'SALES', eventKey: '', channel: 'EMAIL', subject: '', body: '', status: 'ACTIVE' });

const templates = ref([
  { key: 'inv.created', name: 'Invoice Dibuat', module: 'SALES', eventKey: 'invoice.created', channel: 'EMAIL', status: 'ACTIVE', subject: '[SES-ERP] Invoice Baru: {{invoiceNo}}', body: 'Halo {{customerName}},\n\nInvoice {{invoiceNo}} senilai Rp {{amount}} telah diterbitkan.\nTanggal Jatuh Tempo: {{dueDate}}\n\nTerima kasih.' },
  { key: 'inv.paid', name: 'Invoice Lunas', module: 'SALES', eventKey: 'invoice.paid', channel: 'EMAIL', status: 'ACTIVE', subject: '[SES-ERP] Invoice {{invoiceNo}} Telah Lunas', body: 'Halo {{customerName}},\n\nPembayaran invoice {{invoiceNo}} telah kami terima.\nTerima kasih atas kepercayaan Anda.' },
  { key: 'po.approved', name: 'PO Disetujui', module: 'PROCUREMENT', eventKey: 'po.approved', channel: 'EMAIL', status: 'ACTIVE', subject: '[SES-ERP] PO {{poNo}} Disetujui', body: 'Yth. {{vendorName}},\n\nPurchase Order {{poNo}} senilai Rp {{amount}} telah disetujui.\nMohon segera proses pengiriman sesuai jadwal.' },
  { key: 'po.approved.wa', name: 'PO Disetujui (WA)', module: 'PROCUREMENT', eventKey: 'po.approved', channel: 'WHATSAPP', status: 'ACTIVE', subject: '', body: '✅ *PO Disetujui*\n\nNomor: {{poNo}}\nVendor: {{vendorName}}\nNilai: Rp {{amount}}\n\nSegera proses pengiriman.' },
  { key: 'pr.submitted', name: 'Payment Request Diajukan', module: 'FINANCE', eventKey: 'pr.submitted', channel: 'EMAIL', status: 'ACTIVE', subject: '[SES-ERP] Payment Request Menunggu Approval', body: 'Payment Request {{prNo}} senilai Rp {{amount}} menunggu persetujuan Anda.\n\nSilakan login untuk mereview.' },
  { key: 'pr.approved.wa', name: 'PR Approved (WA)', module: 'FINANCE', eventKey: 'pr.approved', channel: 'WHATSAPP', status: 'ACTIVE', subject: '', body: '💰 *Payment Request Disetujui*\nNo: {{prNo}}\nJumlah: Rp {{amount}}\nDisetujui oleh: {{approver}}' },
  { key: 'grn.received', name: 'Barang Diterima', module: 'INVENTORY', eventKey: 'grn.posted', channel: 'EMAIL', status: 'ACTIVE', subject: '[SES-ERP] GRN {{grnNo}} Posted ke Stok', body: 'GRN {{grnNo}} untuk PO {{poNo}} telah diposting ke stok gudang.' },
  { key: 'low.stock.alert', name: 'Stok Hampir Habis', module: 'INVENTORY', eventKey: 'stock.low', channel: 'IN_APP', status: 'ACTIVE', subject: '', body: '⚠️ Stok produk {{productName}} tersisa {{qty}} {{uom}} — di bawah minimum {{minQty}} {{uom}}.' },
  { key: 'leave.approved', name: 'Cuti Disetujui', module: 'HRIS', eventKey: 'leave.approved', channel: 'EMAIL', status: 'ACTIVE', subject: '[SES-ERP] Cuti Anda Disetujui', body: 'Halo {{employeeName}},\n\nPermohonan cuti {{leaveType}} tanggal {{startDate}} s/d {{endDate}} telah disetujui.' },
  { key: 'payroll.slip', name: 'Slip Gaji Terbit', module: 'HRIS', eventKey: 'payroll.published', channel: 'EMAIL', status: 'ACTIVE', subject: '[SES-ERP] Slip Gaji {{month}} Tersedia', body: 'Halo {{employeeName}},\n\nSlip gaji Anda untuk periode {{month}} kini tersedia. Login untuk melihat detail.' },
  { key: 'compliance.expire', name: 'Sertifikat Akan Expired', module: 'SUPPORT', eventKey: 'compliance.expiring', channel: 'EMAIL', status: 'ACTIVE', subject: '[SES-ERP] Sertifikat {{certName}} Akan Kedaluwarsa', body: 'Sertifikat {{certName}} akan kedaluwarsa pada {{expiry}}.\n\nSegera perbarui untuk menghindari ketidakpatuhan.' },
  { key: 'tender.deadline', name: 'Deadline Tender', module: 'PROJECT', eventKey: 'tender.deadline', channel: 'WHATSAPP', status: 'ACTIVE', subject: '', body: '⏰ *Deadline Tender Mendekat*\nTender: {{tenderName}}\nDeadline: {{deadline}}' },
]);

const moduleList = computed(() => [...new Set(templates.value.map(t => t.module))]);
const filteredTemplates = computed(() => templates.value.filter(t =>
  (!filterChannel.value || t.channel === filterChannel.value) &&
  (!filterModule.value || t.module === filterModule.value)
));

function channelIcon(ch: string) { return ch === 'EMAIL' ? 'pi pi-at' : ch === 'WHATSAPP' ? 'pi pi-comment' : 'pi pi-bell'; }
function channelColor(ch: string) { return ch === 'EMAIL' ? 'bg-sky-500 text-white' : ch === 'WHATSAPP' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'; }

function openView(t: any) { selected.value = t; viewDialog.value = true; }
function openCreate() { isEdit.value = false; Object.assign(form, { key: '', name: '', module: 'SALES', eventKey: '', channel: 'EMAIL', subject: '', body: '', status: 'ACTIVE' }); formDialog.value = true; }
function openEdit(t: any) { selected.value = t; isEdit.value = true; Object.assign(form, { ...t }); formDialog.value = true; }
function confirmDelete(t: any) { selected.value = t; deleteDialog.value = true; }
function saveForm() {
  if (!form.key || !form.name || !form.body) { toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Key, Nama, dan Body wajib diisi.', life: 3000 }); return; }
  if (isEdit.value) {
    const idx = templates.value.findIndex(t => t.key === form.key);
    if (idx >= 0) Object.assign(templates.value[idx], { ...form });
    toast.add({ severity: 'success', summary: 'Diperbarui', detail: `Template ${form.name} diperbarui.`, life: 3000 });
  } else {
    templates.value.push({ ...form });
    toast.add({ severity: 'success', summary: 'Ditambahkan', detail: `Template ${form.name} ditambahkan.`, life: 3000 });
  }
  formDialog.value = false;
}
function doDelete() {
  templates.value = templates.value.filter(t => t.key !== selected.value?.key);
  toast.add({ severity: 'warn', summary: 'Dihapus', detail: `Template ${selected.value?.name} dihapus.`, life: 3000 });
  deleteDialog.value = false;
}
</script>
<style scoped>
.animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
select { appearance: none; }
</style>
