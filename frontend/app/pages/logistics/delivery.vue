<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Unit Pengiriman</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Surat Jalan & Konfirmasi</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Delivery <span class="text-indigo-600">Order</span></h1>
        <p class="text-slate-500 text-sm font-medium">Manajemen dokumen pengiriman, monitoring status real-time, dan validasi bukti penerimaan (POD).</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Generate DO" icon="pi pi-bolt" severity="secondary" class="p-button-rounded font-black text-xs shadow-md" @click="openGenerate" :disabled="!canManage" />
        <Button label="Buat DO Manual" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-indigo-100 bg-indigo-600 border-indigo-600" @click="openCreate" :disabled="!canManage" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="s in stats" :key="s.label" class="group p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <i :class="[s.icon, 'text-6xl', s.iconColor]"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ s.value }} <span class="text-xs font-medium text-slate-400">Unit</span></h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main Table Area -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/10 gap-4">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Tracking Pengiriman</h2>
             <p class="text-xs text-slate-500 font-medium">Monitoring status dokumen pengiriman dari persiapan hingga penerimaan.</p>
          </div>
          <div class="flex items-center gap-3">
             <div class="p-input-icon-left">
                <i class="pi pi-search text-slate-400" />
                <InputText v-model="q" placeholder="Cari No. DO atau Shipment..." class="p-inputtext-sm rounded-xl border-slate-200 w-64" />
             </div>
             <Select v-model="statusFilter" :options="statusOptions" optionLabel="label" optionValue="value" placeholder="Filter Status" class="p-select-sm rounded-xl text-[10px] font-bold uppercase w-48" />
          </div>
       </div>

       <DataTable :value="deliveryOrders" dataKey="id" class="p-datatable-sm w-full" :loading="loading" :rows="10" paginator>
          <Column field="code" header="DOKUMEN DO" class="pl-8">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-800">{{ data.code }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tight" v-if="data.shipmentId">Ref: {{ data.shipmentId }}</span>
                </div>
             </template>
          </Column>
          <Column header="PENERIMA & TUJUAN">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-900 uppercase">{{ data.customer?.name || 'N/A' }}</span>
                   <div class="flex items-center gap-1">
                      <i class="pi pi-map-marker text-[9px] text-slate-400" />
                      <span class="text-[10px] font-bold text-slate-400 truncate max-w-[200px]">{{ data.deliveryCity || data.deliveryAddress1 }}</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="JADWAL KIRIM">
             <template #body="{ data }">
                <div class="flex items-center gap-2">
                   <div class="flex flex-col">
                      <span class="text-[11px] font-bold text-slate-700">{{ fmt(data.plannedShipDate) }}</span>
                      <span class="text-[9px] font-black text-slate-400 uppercase leading-none" v-if="data.actualShipDate">ACT: {{ fmt(data.actualShipDate) }}</span>
                   </div>
                   <div v-if="data.priority === 'URGENT'" class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                </div>
             </template>
          </Column>
          <Column header="PRIORITAS">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', priorityClass(data.priority)]">
                   {{ data.priority || 'NORMAL' }}
                </span>
             </template>
          </Column>
          <Column header="STATUS">
             <template #body="{ data }">
                <div class="flex items-center gap-2">
                   <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', statusClass(data.status)]">
                      {{ statusLabel(data.status) }}
                   </span>
                   <i v-if="data.status === 'DELIVERED'" class="pi pi-verified text-emerald-500 text-xs"></i>
                </div>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <div class="flex gap-2 justify-end">
                   <Button icon="pi pi-eye" severity="secondary" rounded text @click="openView(data)" v-tooltip.top="'Lihat Detail'" />
                   <Button v-if="['DRAFT', 'PLANNED'].includes(data.status)" icon="pi pi-send" severity="info" rounded text @click="release(data)" :disabled="!canManage" v-tooltip.top="'Release DO'" />
                   <Button v-if="['DRAFT', 'PLANNED'].includes(data.status)" icon="pi pi-times-circle" severity="danger" rounded text @click="cancel(data)" :disabled="!canManage" v-tooltip.top="'Batalkan'" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Manual Create Drawer -->
    <Drawer v-model:visible="createDrawerOpen" header="Registrasi Delivery Order (Manual)" position="right" class="w-[850px] shadow-2xl">
       <div class="h-full flex flex-col pt-4 overflow-hidden">
          <div class="flex-1 overflow-y-auto px-6 space-y-8 pb-32 custom-scrollbar">
             <!-- Section 1: Customer & Logistics -->
             <div class="grid grid-cols-2 gap-8">
                <div class="space-y-6">
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">1</div>
                      <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Partner & Warehouse</h4>
                   </div>
                   <div class="space-y-4 pt-1">
                      <div class="space-y-1">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer / Penerima</label>
                         <Select v-model="manualDoForm.customerId" :options="customers" optionLabel="name" optionValue="id" filter placeholder="Cari Customer..." class="w-full rounded-xl" @change="onCustomerSelect" />
                      </div>
                      <div class="space-y-1">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gudang Pengirim</label>
                         <Select v-model="manualDoForm.warehouseId" :options="warehouses" optionLabel="name" optionValue="id" placeholder="Pilih Gudang" class="w-full rounded-xl" />
                      </div>
                   </div>
                </div>
                <div class="space-y-6">
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">2</div>
                      <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Jadwal & Prioritas</h4>
                   </div>
                   <div class="space-y-4 pt-1">
                      <div class="space-y-1">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimasi Pengiriman</label>
                         <InputText v-model="manualDoForm.plannedShipDate" type="date" class="w-full rounded-xl border-slate-200" />
                      </div>
                      <div class="space-y-1">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority Class</label>
                         <Select v-model="manualDoForm.priority" :options="priorityOptions" optionLabel="label" optionValue="value" class="w-full rounded-xl" />
                      </div>
                   </div>
                </div>
             </div>

             <!-- Section 2: Address Details -->
             <div class="space-y-4">
                <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs"><i class="pi pi-map-marker text-[10px]"></i></div>
                   <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Detail Alamat Pengiriman</h4>
                </div>
                <div class="grid grid-cols-2 gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                   <div class="space-y-4">
                      <div class="space-y-1">
                         <label class="text-[9px] font-black text-slate-400 uppercase">Alamat Lengkap</label>
                         <Textarea v-model="manualDoForm.deliveryAddress1" rows="2" class="w-full rounded-xl text-xs border-slate-200" />
                      </div>
                      <div class="grid grid-cols-2 gap-3">
                         <div class="space-y-1">
                            <label class="text-[9px] font-black text-slate-400 uppercase">Kota</label>
                            <InputText v-model="manualDoForm.deliveryCity" class="w-full rounded-xl text-xs border-slate-200" />
                         </div>
                         <div class="space-y-1">
                             <label class="text-[9px] font-black text-slate-400 uppercase">Kode Pos</label>
                             <InputText v-model="manualDoForm.deliveryPostalCode" class="w-full rounded-xl text-xs border-slate-200" />
                         </div>
                      </div>
                   </div>
                   <div class="space-y-4">
                      <div class="space-y-1">
                         <label class="text-[9px] font-black text-slate-400 uppercase">Provinsi</label>
                         <InputText v-model="manualDoForm.deliveryProvince" class="w-full rounded-xl text-xs border-slate-200" />
                      </div>
                      <div class="space-y-1">
                         <label class="text-[9px] font-black text-slate-400 uppercase">Catatan Khusus (Notes)</label>
                         <Textarea v-model="manualDoForm.deliveryNotes" rows="2" class="w-full rounded-xl text-xs border-slate-200" placeholder="Ex: Masuk Gang, Titip di Security..." />
                      </div>
                   </div>
                </div>
             </div>

             <!-- Section 3: Item Lines -->
             <div class="space-y-4">
                <div class="flex items-center justify-between">
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs"><i class="pi pi-plus text-[10px]"></i></div>
                      <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Rincian Barang</h4>
                   </div>
                   <Button label="Tambah Item" icon="pi pi-plus" text class="text-[10px] font-black uppercase tracking-widest text-indigo-600" @click="addItemRow" />
                </div>
                <div class="rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-white">
                   <table class="w-full text-xs">
                      <thead class="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                         <tr>
                            <th class="px-4 py-4 text-left">Pilih Item Master</th>
                            <th class="px-4 py-4 text-left">Deskripsi</th>
                            <th class="px-4 py-4 text-center w-24">Qty</th>
                            <th class="px-4 py-4 text-center w-20">UOM</th>
                            <th class="px-4 py-4 text-center w-12"></th>
                         </tr>
                      </thead>
                      <tbody>
                         <tr v-for="(item, idx) in manualDoForm.items" :key="idx" class="border-t border-slate-100 hover:bg-slate-50/50">
                            <td class="px-4 py-3">
                               <Select v-model="item.itemId" :options="itemsMaster" optionLabel="name" optionValue="id" filter placeholder="Cari SKU..." class="w-full p-select-xs border-none bg-transparent" @change="onItemSelect(idx, item.itemId)" />
                            </td>
                            <td class="px-4 py-3">
                               <InputText v-model="item.description" class="w-full p-inputtext-xs border-none bg-transparent font-bold text-slate-700" />
                            </td>
                            <td class="px-4 py-3">
                               <InputNumber v-model="item.orderedQty" class="w-full p-inputnumber-xs" inputClass="text-center bg-transparent border-none font-black" />
                            </td>
                            <td class="px-4 py-3">
                               <InputText v-model="item.uomCode" class="w-full p-inputtext-xs text-center border-none bg-transparent font-black text-slate-400" />
                            </td>
                            <td class="px-4 py-3 text-center">
                               <Button icon="pi pi-trash" severity="danger" text rounded @click="removeItemRow(idx)" />
                            </td>
                         </tr>
                         <tr v-if="manualDoForm.items.length === 0">
                            <td colspan="5" class="p-8 text-center bg-slate-50/30">
                               <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Belum ada item ditambahkan</p>
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>
          </div>

          <!-- Bottom Actions -->
          <div class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 flex items-center justify-between rounded-t-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.04)]">
             <div class="flex items-center gap-4">
                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ manualDoForm.items.length }} Items Terdaftar</span>
             </div>
             <div class="flex items-center gap-3">
                <Button label="Batalkan" severity="secondary" text @click="createDrawerOpen = false" class="font-black text-[10px] uppercase" />
                <Button label="Simpan DO" icon="pi pi-check" class="p-button-rounded font-black text-[10px] uppercase px-10 bg-slate-900 border-slate-900 shadow-xl" @click="saveManualDo" :loading="saving" />
             </div>
          </div>
       </div>
    </Drawer>
    <Drawer v-model:visible="viewDialogOpen" :header="`Detail Pengiriman: ${viewingDo?.code}`" position="right" class="w-[700px]">
       <div v-if="viewingDo" class="space-y-8 pt-4 px-4 overflow-y-auto pb-24 h-full custom-scrollbar">
          <!-- Timeline & Header -->
          <div class="p-4 rounded-3xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between">
             <div class="space-y-1">
                <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest text-[rgb(129,140,248)]">Tracking Status</span>
                <div class="flex items-center gap-3">
                   <h3 class="text-2xl font-black text-slate-900">{{ statusLabel(viewingDo.status) }}</h3>
                   <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase', priorityClass(viewingDo.priority)]">{{ viewingDo.priority }}</span>
                </div>
             </div>
             <div class="text-right">
                <p class="text-[10px] font-black text-slate-400 uppercase">Estimasi Pengiriman</p>
                <p class="text-lg font-black text-slate-700">{{ fmt(viewingDo.plannedShipDate) }}</p>
             </div>
          </div>

          <!-- Section 1: Customer & Address -->
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs"><i class="pi pi-user text-[10px]"></i></div>
                <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Informasi Penerima</h4>
             </div>
             <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                <div class="space-y-4">
                   <div>
                      <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Nama Customer</label>
                      <p class="text-sm font-black text-slate-900 leading-tight uppercase">{{ viewingDo.customer?.name }}</p>
                      <p class="text-xs font-bold text-slate-500 mt-1">{{ viewingDo.customer?.phone || 'No phone' }}</p>
                   </div>
                   <div>
                      <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Gudang Pengirim</label>
                      <div class="flex items-center gap-2">
                         <i class="pi pi-building text-[10px] text-slate-400"></i>
                         <p class="text-xs font-bold text-slate-700 uppercase">{{ viewingDo.warehouse?.name }}</p>
                      </div>
                   </div>
                </div>
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 relative">
                   <div class="absolute top-4 right-4"><i class="pi pi-map text-slate-300"></i></div>
                   <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Alamat Pengiriman</label>
                   <p class="text-xs font-bold text-slate-600 leading-relaxed">{{ viewingDo.deliveryAddress1 }}</p>
                   <p class="text-xs font-bold text-slate-600">{{ viewingDo.deliveryCity }}, {{ viewingDo.deliveryProvince || '' }} {{ viewingDo.deliveryPostalCode || '' }}</p>
                   <div v-if="viewingDo.deliveryNotes" class="mt-2 pt-2 border-t border-slate-200">
                      <p class="text-[9px] font-black text-red-400 uppercase mb-0.5">Catatan Kurir</p>
                      <p class="text-[10px] italic text-slate-500">"{{ viewingDo.deliveryNotes }}"</p>
                   </div>
                </div>
             </div>
          </div>

          <!-- Section 2: Items Table -->
          <div class="space-y-4">
             <div class="flex items-center gap-3 justify-between">
                <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs"><i class="pi pi-box text-[10px]"></i></div>
                   <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Rincian Barang</h4>
                </div>
                <span class="text-[9px] font-black text-slate-400 uppercase">{{ viewingDo.items?.length || 0 }} SKU Terdaftar</span>
             </div>
             <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <table class="w-full text-xs border-collapse">
                   <thead class="bg-slate-50 text-slate-400 uppercase font-black text-[9px] tracking-widest">
                      <tr>
                         <th class="px-6 py-4 text-left">SKU / Deskripsi</th>
                         <th class="px-6 py-4 text-right">Qty Order</th>
                         <th class="px-6 py-4 text-right">Picked</th>
                         <th class="px-6 py-4 text-right">Delivered</th>
                         <th class="px-6 py-4 text-center">Satuan</th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr v-for="item in viewingDo.items" :key="item.id" class="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                         <td class="px-6 py-4 font-black text-slate-700 uppercase text-[10px]">{{ item.description }}</td>
                         <td class="px-6 py-4 text-right font-bold text-slate-600">{{ item.orderedQty }}</td>
                         <td class="px-6 py-4 text-right font-bold text-indigo-600">{{ item.pickedQty || 0 }}</td>
                         <td class="px-6 py-4 text-right font-black text-emerald-600">{{ item.deliveredQty || 0 }}</td>
                         <td class="px-6 py-4 text-center text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ item.uomCode || 'PCS' }}</td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </div>

          <!-- Section 3: POD Summary -->
          <div v-if="viewingDo.proofOfDelivery" class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs"><i class="pi pi-check-circle text-[10px]"></i></div>
                <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Proof of Delivery (POD)</h4>
             </div>
             <div class="p-4 rounded-3xl bg-emerald-50 border border-emerald-100 grid grid-cols-2 gap-4 relative overflow-hidden">
                <div class="absolute top-0 right-0 p-4 opacity-5"><i class="pi pi-verified text-8xl text-emerald-900"></i></div>
                <div class="space-y-4 relative">
                   <div>
                      <label class="text-[9px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Diterima Oleh</label>
                      <p class="text-sm font-black text-emerald-900 leading-tight uppercase">{{ viewingDo.proofOfDelivery.receivedBy }}</p>
                      <p class="text-xs font-bold text-emerald-700 mt-1">{{ fmtLong(viewingDo.proofOfDelivery.receivedAt) }}</p>
                   </div>
                   <div v-if="viewingDo.proofOfDelivery.notes">
                      <label class="text-[9px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Catatan Penerimaan</label>
                      <p class="text-xs italic text-emerald-800">"{{ viewingDo.proofOfDelivery.notes }}"</p>
                   </div>
                </div>
                <div class="flex items-center justify-center relative">
                   <div class="aspect-video w-full rounded-2xl border-2 border-dashed border-emerald-200 bg-white/50 flex flex-col items-center justify-center gap-2">
                       <i class="pi pi-images text-emerald-300 text-2xl"></i>
                       <span class="text-[9px] font-black text-emerald-400 uppercase">Digital POD Signature</span>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </Drawer>

    <!-- Generate Dialog -->
    <Dialog v-model:visible="generateDialogOpen" header="Generate Delivery Orders" :modal="true" class="w-[500px] border-none shadow-2xl overflow-hidden rounded-xl">
       <template #header>
          <div class="flex items-center gap-3">
             <i class="pi pi-bolt text-indigo-500 text-xl animate-pulse"></i>
             <div>
                <h3 class="font-black text-slate-900 text-sm uppercase tracking-widest">Auto-Generate DO</h3>
                <p class="text-[10px] text-slate-500 font-medium">Buat dokumen pengiriman massal dari Shipment.</p>
             </div>
          </div>
       </template>
       <div class="space-y-5 pt-4">
          <div class="space-y-1">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gudang Pengambil (Warehouse)</label>
             <Select v-model="generateForm.warehouseId" :options="warehouses" optionLabel="name" optionValue="id" placeholder="Pilih Gudang" class="w-full rounded-xl" />
          </div>
          <div class="space-y-1">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jadwal Pengiriman</label>
             <InputText v-model="generateForm.plannedShipDate" type="date" class="w-full rounded-xl border-slate-200" />
          </div>
          <div class="space-y-1">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shipment ID (Comma Separated)</label>
             <Textarea v-model="generateForm.shipmentIds" rows="3" class="w-full rounded-xl border-slate-200 text-xs" placeholder="SHP-001, SHP-005, ..." />
          </div>
          <div class="space-y-1">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prioritas Default</label>
             <Select v-model="generateForm.priority" :options="priorityOptions" optionLabel="label" optionValue="value" class="w-full rounded-xl" />
          </div>
       </div>
       <template #footer>
          <div class="flex items-center justify-end gap-3 pb-2 pt-4">
             <Button label="Batalkan" severity="secondary" text @click="generateDialogOpen = false" class="font-black text-[10px] uppercase" />
             <Button label="Mulai Generate" icon="pi pi-cog" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-indigo-600 border-indigo-600" @click="generate" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const api = useApi()
const auth = useAuthStore()
const toast = useToast()
const confirm = useConfirm()

const canRead = computed(() => auth.hasPermission('logistics.delivery.read'))
const canManage = computed(() => auth.hasPermission('logistics.delivery.manage'))

const q = ref('')
const statusFilter = ref('')
const loading = ref(false)
const deliveryOrders = ref<any[]>([])

const viewDialogOpen = ref(false)
const viewingDo = ref<any>(null)

const generateDialogOpen = ref(false)
const createDrawerOpen = ref(false)
const saving = ref(false)
const warehouses = ref<any[]>([])
const customers = ref<any[]>([])
const itemsMaster = ref<any[]>([])

const manualDoForm = reactive({
  customerId: '',
  warehouseId: '',
  plannedShipDate: new Date().toISOString().slice(0, 10),
  priority: 'NORMAL',
  deliveryAddress1: '',
  deliveryCity: '',
  deliveryProvince: '',
  deliveryPostalCode: '',
  deliveryNotes: '',
  items: [] as any[]
})

const generateForm = reactive({
  warehouseId: '',
  plannedShipDate: new Date().toISOString().slice(0, 10),
  shipmentIds: '',
  priority: 'NORMAL',
})

const statusOptions = [
  { label: 'Semua Status', value: '' },
  { label: 'Draft / Persiapan', value: 'DRAFT' },
  { label: 'Terjadwal', value: 'PLANNED' },
  { label: 'Ready to Ship', value: 'RELEASED' },
  { label: 'Dalam Perjalanan', value: 'IN_TRANSIT' },
  { label: 'Delivered (Selesai)', value: 'DELIVERED' },
  { label: 'Pengiriman Gagal', value: 'FAILED' },
  { label: 'Canceled', value: 'CANCELED' },
]

const priorityOptions = [
  { label: 'Low', value: 'LOW' },
  { label: 'Normal', value: 'NORMAL' },
  { label: 'High', value: 'HIGH' },
  { label: 'Urgent', value: 'URGENT' },
]

const stats = computed(() => {
  const total = deliveryOrders.value.length
  const inTransit = deliveryOrders.value.filter(r => r.status === 'IN_TRANSIT').length
  const delivered = deliveryOrders.value.filter(r => r.status === 'DELIVERED').length
  const failed = deliveryOrders.value.filter(r => r.status === 'FAILED').length

  return [
    { label: 'Total Pengiriman', value: total, icon: 'pi pi-file-o', iconColor: 'text-indigo-600', color: 'bg-indigo-50 text-indigo-600', sub: 'Master Dokumen' },
    { label: 'Dalam Perjalanan', value: inTransit, icon: 'pi pi-truck', iconColor: 'text-amber-600', color: 'bg-amber-50 text-amber-600', sub: 'Status Aktif' },
    { label: 'Selesai Terkirim', value: delivered, icon: 'pi pi-check-circle', iconColor: 'text-emerald-600', color: 'bg-emerald-50 text-emerald-600', sub: 'Tervalidasi POD' },
    { label: 'Gagal / Masalah', value: failed, icon: 'pi pi-exclamation-triangle', iconColor: 'text-red-600', color: 'bg-red-50 text-red-600', sub: 'Butuh Resolusi' }
  ]
})

async function load() {
  loading.value = true
  try {
    const params: any = {}
    if (q.value) params.q = q.value
    if (statusFilter.value) params.status = statusFilter.value
    const res = await api.get('/logistics/delivery-orders', { params })
    deliveryOrders.value = res.data?.deliveryOrders || []
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat', detail: e.message })
  } finally {
    loading.value = false
  }
}

async function openView(data: any) {
  try {
    const res = await api.get(`/logistics/delivery-orders/${data.id}`)
    viewingDo.value = res.data?.deliveryOrder
    viewDialogOpen.value = true
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat Detail', detail: e.message })
  }
}

async function openCreate() {
  manualDoForm.customerId = ''
  manualDoForm.warehouseId = ''
  manualDoForm.items = []
  manualDoForm.deliveryAddress1 = ''
  manualDoForm.deliveryCity = ''
  manualDoForm.deliveryProvince = ''
  manualDoForm.deliveryPostalCode = ''
  manualDoForm.deliveryNotes = ''
  
  try {
    const [custRes, itemRes, whRes] = await Promise.all([
      api.get('/crm/customers'),
      api.get('/inventory/items'),
      api.get('/inventory/warehouses')
    ])
    customers.value = custRes.data?.customers || []
    itemsMaster.value = itemRes.data?.items || []
    warehouses.value = whRes.data?.warehouses || whRes.data?.data || []
    createDrawerOpen.value = true
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat Data', detail: e.message })
  }
}

async function saveManualDo() {
  if (!manualDoForm.customerId || !manualDoForm.warehouseId || manualDoForm.items.length === 0) {
    toast.add({ severity: 'warn', summary: 'Gagal', detail: 'Pastikan customer, gudang, dan item telah terisi.' })
    return
  }
  
  saving.value = true
  try {
    await api.post('/logistics/delivery-orders', manualDoForm)
    toast.add({ severity: 'success', summary: 'DO Berhasil Dibuat', detail: 'Status dokumen saat ini adalah DRAFT.' })
    createDrawerOpen.value = false
    load()
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menyimpan', detail: e.message })
  } finally {
    saving.value = false
  }
}

function addItemRow() {
  manualDoForm.items.push({ itemId: '', description: '', orderedQty: 1, uomCode: 'PCS', unitPrice: 0 })
}

function removeItemRow(idx: number) {
  manualDoForm.items.splice(idx, 1)
}

function onCustomerSelect() {
  const cust = customers.value.find(c => c.id === manualDoForm.customerId)
  if (cust) {
    manualDoForm.deliveryAddress1 = cust.address1 || ''
    manualDoForm.deliveryCity = cust.city || ''
    manualDoForm.deliveryProvince = cust.province || ''
    manualDoForm.deliveryPostalCode = cust.postalCode || ''
  }
}

function onItemSelect(idx: number, itemId: string) {
  const item = itemsMaster.value.find(i => i.id === itemId)
  if (item) {
    manualDoForm.items[idx].description = item.name
    manualDoForm.items[idx].uomCode = item.uomCode || 'PCS'
  }
}

async function openGenerate() {
  try {
    const res = await api.get('/inventory/warehouses')
    warehouses.value = res.data?.warehouses || res.data?.data || []
    generateDialogOpen.value = true
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Could not load warehouses' })
  }
}

async function generate() {
  saving.value = true
  try {
    const ids = generateForm.shipmentIds.split(',').map(s => s.trim()).filter(Boolean)
    await api.post('/logistics/delivery-orders/generate', { ...generateForm, shipmentIds: ids })
    toast.add({ severity: 'success', summary: 'DO Berhasil Dibuat', detail: 'Dokumen pengiriman massal telah diproses.' })
    generateDialogOpen.value = false
    load()
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Generate', detail: e.message })
  } finally {
    saving.value = false
  }
}

async function release(data: any) {
  confirm.require({
    message: `Release dokumen DO ${data.code} untuk proses pengiriman?`,
    header: 'Konfirmasi Release',
    icon: 'pi pi-send',
    acceptClass: 'p-button-info rounded-xl font-bold px-4',
    accept: async () => {
      try {
        await api.post(`/logistics/delivery-orders/${data.id}/release`)
        toast.add({ severity: 'success', summary: 'DO Released', detail: 'Dokumen siap untuk proses muat.' })
        load()
      } catch (e: any) {
        toast.add({ severity: 'error', summary: 'Gagal', detail: e.message })
      }
    }
  })
}

async function cancel(data: any) {
  confirm.require({
    message: `Batalkan dokumen DO ${data.code}? Tindakan ini tidak dapat dibatalkan.`,
    header: 'Konfirmasi Pembatalan',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger rounded-xl font-bold px-4',
    accept: async () => {
      try {
        await api.post(`/logistics/delivery-orders/${data.id}/cancel`)
        toast.add({ severity: 'info', summary: 'DO Dibatalkan', detail: 'Dokumen pengiriman telah dinonaktifkan.' })
        load()
      } catch (e: any) {
        toast.add({ severity: 'error', summary: 'Gagal', detail: e.message })
      }
    }
  })
}

function fmt(val: string) { if (!val) return '-'; return new Date(val).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) }
function fmtLong(val: string) { if (!val) return '-'; return new Date(val).toLocaleString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }

function statusClass(status: string) {
  switch (status) {
    case 'DRAFT': return 'bg-slate-100 text-slate-500 border border-slate-200'
    case 'PLANNED': return 'bg-blue-50 text-blue-700'
    case 'RELEASED': return 'bg-indigo-50 text-indigo-700'
    case 'IN_TRANSIT': return 'bg-amber-50 text-amber-700'
    case 'DELIVERED': return 'bg-emerald-50 text-emerald-700'
    case 'FAILED': return 'bg-red-50 text-red-700'
    case 'CANCELED': return 'bg-slate-50 text-slate-400'
    default: return 'bg-slate-50'
  }
}

function statusLabel(status: string) {
  return statusOptions.find(o => o.value === status)?.label || status
}

function priorityClass(p: string) {
  switch (p) {
    case 'URGENT': return 'bg-red-600 text-white shadow-lg shadow-red-100'
    case 'HIGH': return 'bg-amber-100 text-amber-700'
    case 'LOW': return 'bg-slate-100 text-slate-500'
    default: return 'bg-indigo-50 text-indigo-600 font-bold'
  }
}

onMounted(load)
watch([q, statusFilter], load)
</script>

<style scoped>
:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 11px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(79, 70, 229, 0.03) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 10px;
}
</style>
