<template>
  <div class="space-y-4">
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Settings & Tools</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Help & Support</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Help <span class="text-cyan-600 not-italic text-3xl">& Support</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3">Pusat bantuan, dokumentasi teknis, dan tiket dukungan ERP.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="+ Tambah Artikel" size="small" icon="pi pi-book" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase" @click="openCreateArticle" />
          <Button label="+ Buat Tiket" size="small" icon="pi pi-ticket" class="p-button-rounded h-12 px-8 bg-cyan-600 border-none text-white font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-all" @click="openCreateTicket" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <div class="p-4 rounded-2xl bg-cyan-950 text-white shadow-xl flex flex-col justify-between border border-cyan-900 hover:bg-black group transition-all"><div class="text-[10px] font-black uppercase text-cyan-400 tracking-[0.2em] mb-4">Artikel</div><div class="flex items-end justify-between"><h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ articles.length }}</h3><div class="p-3 bg-white/5 rounded-xl group-hover:rotate-12 transition-transform"><i class="pi pi-book text-lg"></i></div></div></div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1"><div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Tiket Terbuka</div><div class="flex items-end justify-between"><h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ tickets.filter(t => t.status === 'OPEN').length }}</h3><div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-ticket text-lg"></i></div></div></div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1"><div class="text-[10px] font-black uppercase text-sky-600 tracking-[0.2em] mb-4">In Progress</div><div class="flex items-end justify-between"><h3 class="text-5xl font-black text-sky-700 tracking-tighter leading-none">{{ tickets.filter(t => t.status === 'IN_PROGRESS').length }}</h3><div class="p-3 bg-sky-50 text-sky-600 rounded-xl border border-sky-100"><i class="pi pi-spin pi-spinner text-lg"></i></div></div></div>
      <div class="p-4 rounded-2xl bg-gradient-to-br from-cyan-600 to-sky-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group"><div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div><div class="text-[10px] font-black uppercase text-cyan-100 tracking-[0.2em] mb-4">Resolved</div><div class="flex items-end justify-between"><h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ tickets.filter(t => t.status === 'RESOLVED').length }}</h3><div class="p-3 bg-white/10 rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-check-circle text-lg"></i></div></div></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Articles List -->
      <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden pb-6">
        <div class="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center text-white shadow-xl"><i class="pi pi-book text-xl"></i></div>
            <div><h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] mb-1">Knowledge Base</h3><p class="text-[9px] font-bold text-slate-400 uppercase font-mono">Panduan & Dokumentasi</p></div>
          </div>
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <input v-model="searchArticle" placeholder="Cari..." class="border-none bg-transparent text-[11px] h-9 w-36 font-black focus:outline-none" />
          </div>
        </div>
        <div class="p-4 space-y-2">
          <div v-for="a in filteredArticles" :key="a.id" class="flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-slate-50 hover:border-slate-100">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center text-sm flex-shrink-0 group-hover:scale-110 transition-transform', a.color]"><i :class="a.icon"></i></div>
            <div class="flex-1 min-w-0">
              <p class="text-[11px] font-black text-slate-800 group-hover:text-cyan-600 transition-colors truncate">{{ a.title }}</p>
              <p class="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{{ a.category }} · {{ a.readTime }} min</p>
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-all flex gap-1">
              <button @click="openViewArticle(a)" class="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-colors"><i class="pi pi-eye text-xs"></i></button>
              <button @click="openEditArticle(a)" class="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors"><i class="pi pi-pencil text-xs"></i></button>
              <button @click="deleteArticle(a)" class="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors"><i class="pi pi-trash text-xs"></i></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tickets List -->
      <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden pb-6">
        <div class="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-xl"><i class="pi pi-ticket text-xl"></i></div>
            <div><h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] mb-1">Tiket Dukungan</h3><p class="text-[9px] font-bold text-slate-400 uppercase font-mono">Support Ticket Registry</p></div>
          </div>
          <select v-model="ticketFilter" class="border border-slate-200 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase text-slate-600 bg-white focus:outline-none">
            <option value="">Semua</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-white text-left border-b border-slate-50">
              <tr>
                <th class="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Tiket</th>
                <th class="px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Prioritas</th>
                <th class="px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Status</th>
                <th class="px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="t in filteredTickets" :key="t.id" class="hover:bg-slate-50/50 transition-colors group border-l-4 border-l-transparent hover:border-l-cyan-400">
                <td class="px-6 py-4">
                  <p class="text-[10px] font-black text-slate-800">{{ t.subject }}</p>
                  <p class="text-[8px] font-bold text-slate-400 mt-0.5 uppercase">{{ t.module }} · {{ t.date }}</p>
                </td>
                <td class="px-4 py-4 border-l border-slate-50"><span :class="['text-[8px] font-black px-2 py-0.5 rounded uppercase border', t.priority === 'HIGH' ? 'bg-rose-100 text-rose-700 border-rose-200' : t.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200']">{{ t.priority }}</span></td>
                <td class="px-4 py-4 border-l border-slate-50 text-center"><span :class="['inline-flex rounded-full px-3 py-0.5 text-[8px] font-black uppercase border', t.status === 'OPEN' ? 'bg-amber-50 text-amber-700 border-amber-200' : t.status === 'IN_PROGRESS' ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200']">{{ t.status }}</span></td>
                <td class="px-4 py-4 border-l border-slate-50 text-right">
                  <div class="opacity-0 group-hover:opacity-100 transition-all flex gap-1 justify-end">
                    <button @click="openViewTicket(t)" class="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-colors"><i class="pi pi-eye text-xs"></i></button>
                    <button @click="openEditTicket(t)" class="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors"><i class="pi pi-pencil text-xs"></i></button>
                    <button @click="deleteTicket(t)" class="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors"><i class="pi pi-trash text-xs"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ARTICLE VIEW DIALOG -->
    <div v-if="articleViewDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="articleViewDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-xl bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-cyan-900 overflow-hidden animate-scale-in max-h-[88vh] flex flex-col">
        <div class="p-8 border-b border-slate-100 flex items-center justify-between relative overflow-hidden shrink-0">
          <div class="absolute top-0 right-0 w-40 h-40 bg-cyan-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div :class="['w-14 h-14 rounded-[1.5rem] flex items-center justify-center shadow-xl text-white', selectedArticle?.color.replace('text-','bg-').replace('-600','-600') || 'bg-cyan-600']"><i :class="['text-2xl', selectedArticle?.icon]"></i></div>
            <div>
              <h3 class="text-lg font-black text-slate-900 leading-tight max-w-xs">{{ selectedArticle?.title }}</h3>
              <p class="text-[9px] font-black text-cyan-600 uppercase mt-1">{{ selectedArticle?.category }} · {{ selectedArticle?.readTime }} min baca</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="articleViewDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="flex-1 overflow-y-auto p-8 bg-slate-50/30">
          <div class="p-5 rounded-2xl bg-white border border-slate-100 mb-4">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Konten Artikel</p>
            <p class="text-[12px] text-slate-700 leading-relaxed">{{ selectedArticle?.content }}</p>
          </div>
          <div class="flex gap-3">
            <div class="flex-1 p-4 rounded-2xl bg-cyan-50 border border-cyan-100 text-center">
              <p class="text-[9px] font-black text-cyan-600 uppercase">Kategori</p>
              <p class="text-[11px] font-black text-cyan-900 mt-1">{{ selectedArticle?.category }}</p>
            </div>
            <div class="flex-1 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <p class="text-[9px] font-black text-slate-500 uppercase">Waktu Baca</p>
              <p class="text-[11px] font-black text-slate-900 mt-1">{{ selectedArticle?.readTime }} menit</p>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
          <Button label="Edit Artikel" icon="pi pi-pencil" class="h-11 px-8 bg-cyan-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="articleViewDialog = false; openEditArticle(selectedArticle)" />
          <Button label="Tutup" severity="secondary" outlined rounded @click="articleViewDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>

    <!-- ARTICLE FORM DIALOG -->
    <div v-if="articleFormDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="articleFormDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-lg bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-cyan-900 overflow-hidden animate-scale-in max-h-[92vh] flex flex-col">
        <div class="p-8 border-b border-slate-100 flex items-center justify-between relative overflow-hidden shrink-0">
          <div class="absolute top-0 right-0 w-40 h-40 bg-cyan-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-14 h-14 rounded-[1.5rem] bg-cyan-600 text-white flex items-center justify-center shadow-xl"><i class="pi pi-book text-2xl"></i></div>
            <div><h3 class="text-xl font-black text-slate-900 uppercase">{{ articleIsEdit ? 'Edit' : 'Tambah' }} Artikel</h3><p class="text-[10px] font-black text-cyan-600 uppercase mt-1">Knowledge Base</p></div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="articleFormDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="flex-1 overflow-y-auto p-8 space-y-4 bg-slate-50/30">
          <div class="space-y-2"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Judul Artikel</label><input v-model="articleForm.title" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[12px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Judul artikel panduan..." /></div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kategori</label>
              <select v-model="articleForm.category" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none">
                <option v-for="c in ['FINANCE','PROCUREMENT','INVENTORY','HRIS','SALES','TAX','SETTINGS','PROJECT']" :key="c">{{ c }}</option>
              </select>
            </div>
            <div class="space-y-2"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Waktu Baca (menit)</label><input v-model.number="articleForm.readTime" type="number" min="1" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[12px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400" /></div>
          </div>
          <div class="space-y-2"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Konten</label><textarea v-model="articleForm.content" rows="6" class="w-full border border-slate-200 rounded-2xl px-4 py-3 text-[11px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Isi konten panduan..."></textarea></div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
          <Button :label="articleIsEdit ? 'Simpan' : 'Tambah Artikel'" icon="pi pi-save" class="h-11 px-8 bg-cyan-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="saveArticle" />
          <Button label="Batal" severity="secondary" outlined rounded @click="articleFormDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>

    <!-- TICKET VIEW DIALOG -->
    <div v-if="ticketViewDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="ticketViewDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-lg bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-amber-900 overflow-hidden animate-scale-in">
        <div class="p-8 border-b border-slate-100 flex items-center justify-between relative overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-14 h-14 rounded-[1.5rem] bg-amber-600 text-white flex items-center justify-center shadow-xl"><i class="pi pi-ticket text-2xl"></i></div>
            <div>
              <h3 class="text-lg font-black text-slate-900 leading-tight max-w-xs">{{ selectedTicket?.subject }}</h3>
              <p class="text-[9px] font-black text-amber-600 uppercase mt-1">{{ selectedTicket?.module }} · {{ selectedTicket?.date }}</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="ticketViewDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="p-8 space-y-4 bg-slate-50/30">
          <div class="grid grid-cols-3 gap-4">
            <div class="p-4 rounded-2xl bg-white border border-slate-100 text-center"><p class="text-[9px] font-black text-slate-400 uppercase">Modul</p><p class="text-[11px] font-black text-slate-900 mt-1">{{ selectedTicket?.module }}</p></div>
            <div class="p-4 rounded-2xl bg-white border border-slate-100 text-center"><p class="text-[9px] font-black text-slate-400 uppercase">Prioritas</p><span :class="['text-[10px] font-black px-2 py-0.5 rounded uppercase mt-1 inline-block', selectedTicket?.priority === 'HIGH' ? 'bg-rose-100 text-rose-700' : selectedTicket?.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600']">{{ selectedTicket?.priority }}</span></div>
            <div class="p-4 rounded-2xl bg-white border border-slate-100 text-center"><p class="text-[9px] font-black text-slate-400 uppercase">Status</p><span :class="['text-[10px] font-black px-2 py-0.5 rounded uppercase mt-1 inline-block', selectedTicket?.status === 'OPEN' ? 'bg-amber-100 text-amber-700' : selectedTicket?.status === 'IN_PROGRESS' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700']">{{ selectedTicket?.status }}</span></div>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-slate-100">
            <p class="text-[9px] font-black text-slate-400 uppercase mb-2">Deskripsi Masalah</p>
            <p class="text-[12px] text-slate-700 leading-relaxed">{{ selectedTicket?.description || 'Tidak ada deskripsi tambahan.' }}</p>
          </div>
          <!-- Status Update -->
          <div class="p-4 rounded-2xl bg-amber-50 border border-amber-100">
            <p class="text-[9px] font-black text-amber-600 uppercase mb-2">Update Status Tiket</p>
            <div class="flex gap-2">
              <button v-for="s in ['OPEN','IN_PROGRESS','RESOLVED']" :key="s" @click="updateTicketStatus(selectedTicket, s)" :class="['flex-1 py-2 rounded-xl text-[9px] font-black uppercase border transition-all', selectedTicket?.status === s ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-slate-600 border-slate-200']">{{ s }}</button>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3">
          <Button label="Edit Tiket" icon="pi pi-pencil" class="h-11 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="ticketViewDialog = false; openEditTicket(selectedTicket)" />
          <Button label="Tutup" severity="secondary" outlined rounded @click="ticketViewDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>

    <!-- TICKET FORM DIALOG -->
    <div v-if="ticketFormDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="ticketFormDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-lg bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-amber-900 overflow-hidden animate-scale-in">
        <div class="p-8 border-b border-slate-100 flex items-center justify-between relative overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-14 h-14 rounded-[1.5rem] bg-amber-600 text-white flex items-center justify-center shadow-xl rotate-3 hover:rotate-0 transition-transform"><i class="pi pi-ticket text-2xl"></i></div>
            <div><h3 class="text-xl font-black text-slate-900 uppercase">{{ ticketIsEdit ? 'Edit' : 'Buat' }} Tiket</h3><p class="text-[10px] font-black text-amber-600 uppercase mt-1">Support Ticket</p></div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="ticketFormDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="p-8 space-y-4 bg-slate-50/30">
          <div class="space-y-2"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Subjek Masalah</label><input v-model="ticketForm.subject" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[12px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Deskripsikan masalah..." /></div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Modul</label>
              <select v-model="ticketForm.module" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none">
                <option v-for="m in ['FINANCE','SALES','PROCUREMENT','INVENTORY','HRIS','PROJECT','ECOMMERCE','NOTIFICATION','TAX','SETTINGS']" :key="m">{{ m }}</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Prioritas</label>
              <div class="flex gap-2 h-12 items-center">
                <button v-for="p in ['LOW','MEDIUM','HIGH']" :key="p" @click="ticketForm.priority = p" :class="['flex-1 py-2 rounded-xl text-[9px] font-black uppercase border transition-all', ticketForm.priority === p ? (p === 'HIGH' ? 'bg-rose-600 text-white border-rose-600' : p === 'MEDIUM' ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-600 text-white border-slate-600') + ' shadow-lg' : 'bg-white text-slate-500 border-slate-200']">{{ p }}</button>
              </div>
            </div>
          </div>
          <div class="space-y-2"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Deskripsi</label><textarea v-model="ticketForm.description" rows="3" class="w-full border border-slate-200 rounded-2xl px-4 py-3 text-[11px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Detail masalah..."></textarea></div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</label>
            <div class="flex gap-2">
              <button v-for="s in ['OPEN','IN_PROGRESS','RESOLVED']" :key="s" @click="ticketForm.status = s" :class="['flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase border transition-all', ticketForm.status === s ? 'bg-amber-600 text-white border-amber-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200']">{{ s }}</button>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3">
          <Button :label="ticketIsEdit ? 'Simpan' : 'Buat Tiket'" icon="pi pi-save" class="h-11 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="saveTicket" />
          <Button label="Batal" severity="secondary" outlined rounded @click="ticketFormDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const searchArticle = ref('');
const ticketFilter = ref('');
let nextArticleId = 9;
let nextTicketId = 6;

// Article state
const articleViewDialog = ref(false);
const articleFormDialog = ref(false);
const articleIsEdit = ref(false);
const selectedArticle = ref<any>(null);
const articleForm = reactive({ title: '', category: 'FINANCE', readTime: 5, content: '', icon: 'pi pi-file', color: 'bg-slate-50 text-slate-600' });

// Ticket state
const ticketViewDialog = ref(false);
const ticketFormDialog = ref(false);
const ticketIsEdit = ref(false);
const selectedTicket = ref<any>(null);
const ticketForm = reactive({ subject: '', module: 'FINANCE', priority: 'MEDIUM', status: 'OPEN', description: '' });

const articles = ref([
  { id: 1, title: 'Cara Membuat Journal Entry Manual', category: 'FINANCE', readTime: 5, icon: 'pi pi-dollar', color: 'bg-emerald-50 text-emerald-600', content: 'Panduan lengkap membuat jurnal entry manual di modul Finance. Pastikan akun debit dan kredit seimbang sebelum posting.' },
  { id: 2, title: 'Konfigurasi Approval Workflow Purchasing', category: 'PROCUREMENT', readTime: 8, icon: 'pi pi-shopping-bag', color: 'bg-indigo-50 text-indigo-600', content: 'Tutorial konfigurasi approval chain untuk Purchase Request dan Purchase Order berdasarkan nilai transaksi.' },
  { id: 3, title: 'Setup Template Notifikasi WhatsApp', category: 'SETTINGS', readTime: 4, icon: 'pi pi-comment', color: 'bg-emerald-50 text-emerald-600', content: 'Cara menghubungkan WhatsApp Business API dan mengonfigurasi template pesan untuk notifikasi event ERP.' },
  { id: 4, title: 'Rekonsiliasi Bank Otomatis', category: 'FINANCE', readTime: 6, icon: 'pi pi-building-columns', color: 'bg-sky-50 text-sky-600', content: 'Panduan rekonsiliasi bank otomatis menggunakan import statement bank dan matching mutasi transaksi.' },
  { id: 5, title: 'Pengelolaan Stok Multi-Gudang', category: 'INVENTORY', readTime: 10, icon: 'pi pi-box', color: 'bg-amber-50 text-amber-600', content: 'Tutorial pengelolaan stok di beberapa gudang sekaligus, termasuk transfer antar gudang dan putaway rules.' },
  { id: 6, title: 'Cara Input Faktur Pajak Keluaran', category: 'TAX', readTime: 7, icon: 'pi pi-receipt', color: 'bg-rose-50 text-rose-600', content: 'Panduan input faktur pajak keluaran dan sinkronisasi ke sistem DJP e-Faktur Online.' },
  { id: 7, title: 'Konfigurasi Payroll Karyawan', category: 'HRIS', readTime: 12, icon: 'pi pi-id-card', color: 'bg-violet-50 text-violet-600', content: 'Cara mengatur komponen gaji, tunjangan, potongan, dan proses penggajian bulanan di modul HRIS.' },
  { id: 8, title: 'Cara Generate Laporan P&L', category: 'FINANCE', readTime: 5, icon: 'pi pi-chart-bar', color: 'bg-teal-50 text-teal-600', content: 'Panduan membuat laporan Profit & Loss untuk periode tertentu dan menganalisis kinerja keuangan perusahaan.' },
]);

const tickets = ref([
  { id: 1, subject: 'Error sync Tokopedia marketplace', module: 'ECOMMERCE', date: '21 Apr 2026', priority: 'HIGH', status: 'IN_PROGRESS', description: 'Sinkronisasi produk ke Tokopedia gagal sejak kemarin. Error 401 Unauthorized.' },
  { id: 2, subject: 'Payslip tidak generate otomatis', module: 'HRIS', date: '20 Apr 2026', priority: 'HIGH', status: 'OPEN', description: 'Slip gaji April tidak tergenerate otomatis saat payroll dirun. Perlu pengecekan script.' },
  { id: 3, subject: 'Report P&L tidak menampilkan data Maret', module: 'FINANCE', date: '19 Apr 2026', priority: 'MEDIUM', status: 'RESOLVED', description: 'Laporan P&L Maret kosong karena filter tanggal tidak menyertakan posting terakhir.' },
  { id: 4, subject: 'WhatsApp notif tidak terkirim', module: 'NOTIFICATION', date: '18 Apr 2026', priority: 'MEDIUM', status: 'RESOLVED', description: 'Notifikasi approval PO via WhatsApp tidak terkirim. Token WA Business API sudah kadaluarsa.' },
  { id: 5, subject: 'Stock opname tidak bisa submit', module: 'INVENTORY', date: '17 Apr 2026', priority: 'LOW', status: 'RESOLVED', description: 'Tombol submit stock opname tidak berfungsi akibat validasi quantity negatif.' },
]);

const filteredArticles = computed(() => searchArticle.value ? articles.value.filter(a => a.title.toLowerCase().includes(searchArticle.value.toLowerCase()) || a.category.toLowerCase().includes(searchArticle.value.toLowerCase())) : articles.value);
const filteredTickets = computed(() => ticketFilter.value ? tickets.value.filter(t => t.status === ticketFilter.value) : tickets.value);

// Article actions
function openViewArticle(a: any) { selectedArticle.value = a; articleViewDialog.value = true; }
function openCreateArticle() { articleIsEdit.value = false; Object.assign(articleForm, { title: '', category: 'FINANCE', readTime: 5, content: '' }); articleFormDialog.value = true; }
function openEditArticle(a: any) { selectedArticle.value = a; articleIsEdit.value = true; Object.assign(articleForm, { ...a }); articleFormDialog.value = true; }
function saveArticle() {
  if (!articleForm.title) { toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Judul wajib diisi.', life: 3000 }); return; }
  if (articleIsEdit.value) {
    const idx = articles.value.findIndex(x => x.id === selectedArticle.value?.id);
    if (idx >= 0) Object.assign(articles.value[idx], { ...articleForm });
    toast.add({ severity: 'success', summary: 'Diperbarui', detail: `Artikel diperbarui.`, life: 3000 });
  } else {
    articles.value.push({ id: nextArticleId++, ...articleForm, icon: 'pi pi-file', color: 'bg-slate-50 text-slate-600' });
    toast.add({ severity: 'success', summary: 'Ditambahkan', detail: `Artikel ditambahkan.`, life: 3000 });
  }
  articleFormDialog.value = false;
}
function deleteArticle(a: any) { articles.value = articles.value.filter(x => x.id !== a.id); toast.add({ severity: 'warn', summary: 'Dihapus', detail: `Artikel dihapus.`, life: 3000 }); }

// Ticket actions
function openViewTicket(t: any) { selectedTicket.value = { ...t }; ticketViewDialog.value = true; }
function openCreateTicket() { ticketIsEdit.value = false; Object.assign(ticketForm, { subject: '', module: 'FINANCE', priority: 'MEDIUM', status: 'OPEN', description: '' }); ticketFormDialog.value = true; }
function openEditTicket(t: any) { selectedTicket.value = t; ticketIsEdit.value = true; Object.assign(ticketForm, { ...t }); ticketFormDialog.value = true; }
function saveTicket() {
  if (!ticketForm.subject) { toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Subjek wajib diisi.', life: 3000 }); return; }
  const today = new Date(); const d = `${today.getDate()} ${['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][today.getMonth()]} ${today.getFullYear()}`;
  if (ticketIsEdit.value) {
    const idx = tickets.value.findIndex(x => x.id === selectedTicket.value?.id);
    if (idx >= 0) Object.assign(tickets.value[idx], { ...ticketForm });
    toast.add({ severity: 'success', summary: 'Diperbarui', detail: `Tiket diperbarui.`, life: 3000 });
  } else {
    tickets.value.unshift({ id: nextTicketId++, ...ticketForm, date: d });
    toast.add({ severity: 'success', summary: 'Dibuat', detail: `Tiket berhasil dibuat.`, life: 3000 });
  }
  ticketFormDialog.value = false;
}
function deleteTicket(t: any) { tickets.value = tickets.value.filter(x => x.id !== t.id); toast.add({ severity: 'warn', summary: 'Dihapus', detail: `Tiket dihapus.`, life: 3000 }); }
function updateTicketStatus(t: any, status: string) {
  if (!t) return;
  const idx = tickets.value.findIndex(x => x.id === t.id);
  if (idx >= 0) tickets.value[idx].status = status;
  selectedTicket.value = { ...tickets.value[idx] };
  toast.add({ severity: 'success', summary: 'Status Diperbarui', detail: `Tiket diubah ke ${status}.`, life: 3000 });
}
</script>
<style scoped>
.animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
select { appearance: none; }
</style>
