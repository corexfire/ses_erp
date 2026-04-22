<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-purple-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-purple-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">E-Commerce</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-purple-600">Marketplace Integration</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none">Integrasi <span class="text-purple-600">Marketplace</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-xl">Kelola listings, sinkronisasi stok & harga, serta pantau performa produk di berbagai marketplace Indonesia.</p>
        </div>
        <div class="flex gap-3">
          <Button label="Kelola Channel" severity="secondary" outlined class="p-button-rounded font-black text-[10px] px-6 h-12 uppercase" icon="pi pi-server" @click="openChannelModal" />
          <Button v-if="canManage" label="Sync Semua" icon="pi pi-sync" class="p-button-rounded font-black text-[10px] px-6 h-12 uppercase shadow-lg shadow-purple-100 bg-purple-600 border-none text-white transition-transform hover:scale-105 active:scale-95" @click="syncAll" :loading="syncing" />
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Listings</span>
          <i class="pi pi-box text-slate-300"></i>
        </div>
        <div class="text-3xl font-black text-slate-900 tracking-tighter">{{ stats.total }}</div>
      </div>
      <div class="p-5 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <span class="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Tersinkron</span>
          <i class="pi pi-check-circle text-emerald-400"></i>
        </div>
        <div class="text-3xl font-black text-emerald-700 tracking-tighter">{{ stats.synced }}</div>
      </div>
      <div class="p-5 rounded-xl bg-amber-50 border border-amber-200 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <span class="text-[9px] font-black text-amber-600 uppercase tracking-widest">Menunggu</span>
          <i class="pi pi-clock text-amber-400"></i>
        </div>
        <div class="text-3xl font-black text-amber-700 tracking-tighter">{{ stats.pending }}</div>
      </div>
      <div class="p-5 rounded-xl bg-rose-50 border border-rose-200 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <span class="text-[9px] font-black text-rose-600 uppercase tracking-widest">Gagal</span>
          <i class="pi pi-exclamation-triangle text-rose-400"></i>
        </div>
        <div class="text-3xl font-black text-rose-700 tracking-tighter">{{ stats.failed }}</div>
      </div>
    </div>

    <!-- Channel Overview -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div v-for="channel in channelStats" :key="channel.id" 
           class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
           @click="filterByChannel(channel.id)">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm"
             :class="getChannelStyle(channel.name).bg">
          {{ getChannelEmoji(channel.name) }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-xs font-black text-slate-800 truncate">{{ channel.name }}</div>
          <div class="text-[10px] text-slate-400">{{ channel.totalListings }} listing</div>
        </div>
        <div class="w-2 h-2 rounded-full" :class="channel.status === 'OK' ? 'bg-emerald-500' : 'bg-rose-500'"></div>
      </div>
    </div>

    <!-- Data List -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div class="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/10">
        <div class="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <div class="relative w-full md:w-80">
            <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Produk / SKU..." class="w-full pl-10 text-xs font-bold rounded-2xl border-slate-200 h-11" />
          </div>
          <Select v-model="channelFilter" :options="channels" optionLabel="name" optionValue="id" placeholder="Semua Channel" class="w-48 text-xs font-bold rounded-2xl border-slate-200" showClear />
          <Select v-model="statusFilter" :options="statusOptions" optionLabel="label" optionValue="value" placeholder="Semua Status" class="w-40 text-xs font-bold rounded-2xl border-slate-200" showClear />
          <Button icon="pi pi-filter" severity="secondary" text rounded @click="loadListings" :loading="loading" />
        </div>
        <Button v-if="canManage" label="Tambah Listing" icon="pi pi-plus" class="p-button-rounded font-black text-[10px] px-5 h-10 uppercase shadow-lg bg-purple-600 border-none text-white" @click="openForm(null)" />
      </div>

      <DataTable :value="filteredListings" dataKey="id" class="p-datatable-sm w-full" :loading="loading" stripedRows>
        <template #empty>
          <div class="py-20 text-center text-slate-400">
            <i class="pi pi-shopping-cart text-5xl opacity-20 mb-4 block"></i>
            <span class="font-medium">Tidak ada listing marketplace yang ditemukan.</span>
          </div>
        </template>

        <Column header="PRODUK & MARKETPLACE" class="pl-6">
          <template #body="{ data }">
            <div class="flex items-center gap-4 py-3">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-sm"
                   :class="getChannelStyle(data.channel?.name).bg">
                {{ getChannelEmoji(data.channel?.name) }}
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black text-slate-900 tracking-tight">{{ data.productName }}</span>
                <span class="text-[10px] font-bold text-slate-500 mb-1">{{ data.productSku }}</span>
                <div class="flex items-center gap-1.5">
                  <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">{{ data.channel?.name }}</span>
                </div>
              </div>
            </div>
          </template>
        </Column>

        <Column header="HARGA JUAL" class="text-right">
          <template #body="{ data }">
            <div class="flex flex-col items-end">
              <span class="text-sm font-black font-mono text-purple-700">{{ formatCurrency(data.sellingPrice) }}</span>
              <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest">IDR</span>
            </div>
          </template>
        </Column>

        <Column header="STOK" class="text-center">
          <template #body="{ data }">
            <div class="flex flex-col items-center">
              <span class="text-sm font-black font-mono text-slate-700">{{ data.stockQty }}</span>
              <div class="flex gap-2 mt-1">
                <span v-if="data.syncStock" class="text-[8px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 font-black uppercase">Stok</span>
                <span v-if="data.syncPrice" class="text-[8px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-600 font-black uppercase">Harga</span>
              </div>
            </div>
          </template>
        </Column>

        <Column header="STATUS SYNC" class="text-center">
          <template #body="{ data }">
            <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                  :class="{
                    'bg-emerald-100 text-emerald-700': data.syncStatus === 'SYNCED',
                    'bg-amber-100 text-amber-700': data.syncStatus === 'PENDING',
                    'bg-rose-100 text-rose-700': data.syncStatus === 'FAILED'
                  }">
              {{ data.syncStatus }}
            </span>
          </template>
        </Column>

        <Column header="TERAKHIR SYNC" class="text-center">
          <template #body="{ data }">
            <span class="text-[10px] font-bold text-slate-500">
              {{ data.lastSyncAt ? formatDate(data.lastSyncAt) : 'Belum pernah' }}
            </span>
          </template>
        </Column>

        <Column class="text-right pr-4">
          <template #body="{ data }">
            <div class="flex justify-end gap-1">
              <Button icon="pi pi-sync" text severity="info" class="p-button-sm" @click="syncOne(data)" :loading="syncingId === data.id" v-tooltip.top="'Sync'" />
              <Button icon="pi pi-pencil" text severity="secondary" class="p-button-sm" @click="openForm(data)" v-tooltip.top="'Edit'" />
              <Button icon="pi pi-trash" text severity="danger" class="p-button-sm" @click="confirmDelete(data)" v-tooltip.top="'Hapus'" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Listing Form Modal -->
    <Dialog v-model:visible="formVisible" modal class="w-[700px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden shadow-2xl' }, header: { class: 'hidden' } }">
      <div class="flex items-center justify-between p-4 border-b border-slate-100 bg-white shadow-sm shrink-0">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-purple-900 flex items-center justify-center text-white shadow-xl">
            <i class="pi pi-shopping-cart text-xl"></i>
          </div>
          <div>
            <h4 class="text-xl font-black text-slate-900 leading-tight">{{ editingId ? 'Edit Listing' : 'Tambah Listing Baru' }}</h4>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marketplace Product Listing</p>
          </div>
        </div>
        <Button icon="pi pi-times" severity="secondary" rounded text @click="formVisible = false" />
      </div>

      <div class="p-4 space-y-5 max-h-[65vh] overflow-y-auto bg-slate-50/30">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-wider">Marketplace Channel *</label>
            <Select v-model="form.channelId" :options="channels" optionLabel="name" optionValue="id" placeholder="Pilih Channel" class="w-full text-sm font-bold rounded-xl" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-wider">Kode SKU *</label>
            <InputText v-model="form.productSku" placeholder="SKU-XXXXX" class="w-full text-sm font-bold rounded-xl" />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-500 uppercase tracking-wider">Nama Produk *</label>
          <InputText v-model="form.productName" placeholder="Nama produk di marketplace" class="w-full text-sm font-bold rounded-xl" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-wider">Harga Jual (IDR) *</label>
            <InputNumber v-model="form.sellingPrice" mode="currency" currency="IDR" locale="id-ID" class="w-full text-sm font-bold rounded-xl" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-wider">Stok Qty *</label>
            <InputNumber v-model="form.stockQty" :min="0" class="w-full text-sm font-bold rounded-xl" />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-500 uppercase tracking-wider">ID Produk Marketplace</label>
          <InputText v-model="form.marketplaceProductId" placeholder="ID produk dari marketplace (jika sudah ada)" class="w-full text-sm font-bold rounded-xl" />
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-500 uppercase tracking-wider">URL Produk Marketplace</label>
          <InputText v-model="form.marketplaceUrl" placeholder="https://..." class="w-full text-sm font-bold rounded-xl" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200">
            <Checkbox v-model="form.syncStock" :binary="true" inputId="syncStock" />
            <label for="syncStock" class="text-sm font-bold text-slate-700 cursor-pointer">Sync Stok Otomatis</label>
          </div>
          <div class="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200">
            <Checkbox v-model="form.syncPrice" :binary="true" inputId="syncPrice" />
            <label for="syncPrice" class="text-sm font-bold text-slate-700 cursor-pointer">Sync Harga Otomatis</label>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-500 uppercase tracking-wider">Catatan</label>
          <Textarea v-model="form.notes" rows="2" class="w-full text-sm font-bold rounded-xl" placeholder="Catatan opsional..." />
        </div>
      </div>

      <div class="p-4 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-xl shrink-0">
        <Button label="Batal" severity="secondary" text @click="formVisible = false" class="font-black text-[10px] uppercase px-6" />
        <Button :label="editingId ? 'Simpan Perubahan' : 'Buat Listing'" icon="pi pi-check" class="p-button-rounded font-black text-[10px] uppercase px-8 h-12 bg-purple-600 border-none text-white shadow-lg shadow-purple-100" @click="saveForm" :loading="saving" />
      </div>
    </Dialog>

    <!-- Channel Management Modal -->
    <Dialog v-model:visible="channelModalVisible" modal class="w-[600px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden shadow-2xl' }, header: { class: 'hidden' } }">
      <div class="flex items-center justify-between p-4 border-b border-slate-100 bg-white shadow-sm shrink-0">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl">
            <i class="pi pi-server text-xl"></i>
          </div>
          <div>
            <h4 class="text-xl font-black text-slate-900 leading-tight">Kelola Channel</h4>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marketplace Channel Configuration</p>
          </div>
        </div>
        <Button icon="pi pi-times" severity="secondary" rounded text @click="channelModalVisible = false" />
      </div>

      <div class="p-4 max-h-[60vh] overflow-y-auto bg-slate-50/30">
        <!-- Add Channel Form -->
        <div class="mb-6 p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <h5 class="text-xs font-black text-slate-700 uppercase tracking-wider mb-4">Tambah Channel Baru</h5>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <InputText v-model="newChannel.name" placeholder="Nama Channel (e.g. Tokopedia)" class="text-sm font-bold rounded-xl" />
            <InputText v-model="newChannel.code" placeholder="Kode (e.g. TOKOPEDIA)" class="text-sm font-bold rounded-xl" />
          </div>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <Select v-model="newChannel.type" :options="channelTypes" optionLabel="label" optionValue="value" placeholder="Tipe" class="text-sm font-bold rounded-xl w-full" />
            <InputText v-model="newChannel.apiEndpoint" placeholder="API Endpoint (opsional)" class="text-sm font-bold rounded-xl" />
          </div>
          <div class="grid grid-cols-2 gap-3 mb-4">
            <InputText v-model="newChannel.clientId" placeholder="Client ID (opsional)" class="text-sm font-bold rounded-xl" />
            <InputText v-model="newChannel.clientSecret" placeholder="Client Secret (opsional)" class="text-sm font-bold rounded-xl" />
          </div>
          <div class="flex items-center gap-3 mb-4">
            <Checkbox v-model="newChannel.isActive" :binary="true" inputId="newChannelActive" />
            <label for="newChannelActive" class="text-sm font-bold text-slate-700">Channel Aktif</label>
          </div>
          <Button label="Tambah Channel" icon="pi pi-plus" class="w-full p-button-rounded font-black text-[10px] uppercase bg-emerald-600 border-none text-white" @click="addChannel" :loading="addingChannel" />
        </div>

        <!-- Channel List -->
        <div class="space-y-3">
          <div v-for="ch in channels" :key="ch.id" class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" :class="getChannelStyle(ch.name).bg">
                {{ getChannelEmoji(ch.name) }}
              </div>
              <div>
                <div class="text-sm font-black text-slate-800">{{ ch.name }}</div>
                <div class="text-[10px] text-slate-400 uppercase tracking-wider">{{ ch.code }} • {{ ch.type }}</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 rounded-full text-[9px] font-black uppercase" :class="ch.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'">
                {{ ch.isActive ? 'Aktif' : 'Nonaktif' }}
              </span>
              <Button icon="pi pi-pencil" text severity="secondary" class="p-button-sm" @click="editChannel(ch)" v-tooltip.top="'Edit'" />
              <Button icon="pi pi-plug" text severity="info" class="p-button-sm" @click="testConnection(ch)" v-tooltip.top="'Test Koneksi'" />
              <Button icon="pi pi-trash" text severity="danger" class="p-button-sm" @click="deleteChannel(ch)" v-tooltip.top="'Hapus'" />
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    <!-- Sync Log Modal -->
    <Dialog v-model:visible="syncLogVisible" modal class="w-[900px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden shadow-2xl' }, header: { class: 'hidden' } }">
      <div class="flex items-center justify-between p-4 border-b border-slate-100 bg-white shadow-sm shrink-0">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-blue-900 flex items-center justify-center text-white shadow-xl">
            <i class="pi pi-history text-xl"></i>
          </div>
          <div>
            <h4 class="text-xl font-black text-slate-900 leading-tight">Riwayat Sinkronisasi</h4>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sync History Log</p>
          </div>
        </div>
        <Button icon="pi pi-times" severity="secondary" rounded text @click="syncLogVisible = false" />
      </div>

      <div class="p-4 max-h-[60vh] overflow-y-auto bg-slate-50/30">
        <DataTable :value="syncLogs" dataKey="id" class="p-datatable-sm" :loading="syncLogLoading" stripedRows>
          <template #empty>
            <div class="py-12 text-center text-slate-400">
              <i class="pi pi-history text-4xl opacity-20 mb-3 block"></i>
              <span class="font-medium text-sm">Belum ada riwayat sinkronisasi.</span>
            </div>
          </template>
          <Column header="WAKTU">
            <template #body="{ data }">
              <span class="text-[10px] font-mono font-bold text-slate-500">{{ formatDateTime(data.createdAt) }}</span>
            </template>
          </Column>
          <Column header="CHANNEL">
            <template #body="{ data }">
              <div class="flex items-center gap-2">
                <span class="text-sm">{{ getChannelEmoji(data.channel?.name) }}</span>
                <span class="text-xs font-bold text-slate-700">{{ data.channel?.name }}</span>
              </div>
            </template>
          </Column>
          <Column header="TIPE SYNC">
            <template #body="{ data }">
              <span class="px-2 py-1 rounded text-[9px] font-black uppercase"
                    :class="{
                      'bg-purple-100 text-purple-700': data.syncType === 'MANUAL',
                      'bg-blue-100 text-blue-700': data.syncType === 'BULK',
                      'bg-slate-100 text-slate-600': data.syncType !== 'MANUAL' && data.syncType !== 'BULK'
                    }">
                {{ data.syncType }}
              </span>
            </template>
          </Column>
          <Column header="STATUS">
            <template #body="{ data }">
              <span class="px-2 py-1 rounded text-[9px] font-black uppercase"
                    :class="data.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'">
                {{ data.status === 'SUCCESS' ? 'Berhasil' : 'Gagal' }}
              </span>
            </template>
          </Column>
          <Column header="MESSAGE">
            <template #body="{ data }">
              <span class="text-xs text-slate-600">{{ data.message }}</span>
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="p-4 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-xl shrink-0">
        <Button label="Tutup" severity="secondary" @click="syncLogVisible = false" class="p-button-rounded font-black text-[10px] uppercase px-6" />
      </div>
    </Dialog>

    <!-- Confirm Delete Dialog -->
    <Dialog v-model:visible="deleteConfirmVisible" modal class="w-[400px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden shadow-2xl' }, header: { class: 'hidden' } }">
      <div class="p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
          <i class="pi pi-exclamation-triangle text-2xl text-rose-600"></i>
        </div>
        <h4 class="text-lg font-black text-slate-900 mb-2">Konfirmasi Hapus</h4>
        <p class="text-sm text-slate-500 mb-6">Apakah Anda yakin ingin menghapus listing "{{ deleteTarget?.productName }}" dari marketplace?</p>
        <div class="flex justify-center gap-3">
          <Button label="Batal" severity="secondary" text @click="deleteConfirmVisible = false" class="font-black text-[10px] uppercase px-6" />
          <Button label="Hapus" severity="danger" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-rose-600 border-none text-white" @click="doDelete" :loading="deleting" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/stores/auth';

interface Channel {
  id: string;
  code: string;
  name: string;
  type: string;
  iconUrl?: string;
  apiEndpoint?: string;
  clientId?: string;
  clientSecret?: string;
  isActive: boolean;
}

interface Listing {
  id: string;
  channelId: string;
  productName: string;
  productSku: string;
  marketplaceProductId?: string;
  marketplaceUrl?: string;
  sellingPrice: number;
  stockQty: number;
  syncStock: boolean;
  syncPrice: boolean;
  syncStatus: string;
  lastSyncAt?: string;
  lastSyncError?: string;
  isActive: boolean;
  notes?: string;
  channel?: Channel;
}

interface SyncLog {
  id: string;
  listingId: string;
  channelId: string;
  syncType: string;
  status: string;
  message?: string;
  details?: string;
  createdAt: string;
  channel?: Channel;
  listing?: Listing;
}

const api = useApi();
const toast = useToast();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('ecommerce.marketplace.create') || auth.hasPermission('ecommerce.marketplace.update') || true);

const listings = ref<Listing[]>([]);
const channels = ref<Channel[]>([]);
const syncLogs = ref<SyncLog[]>([]);
const search = ref('');
const channelFilter = ref('');
const statusFilter = ref('');
const loading = ref(false);
const syncing = ref(false);
const syncingId = ref<string | null>(null);
const saving = ref(false);
const deleting = ref(false);

const stats = reactive({ total: 0, synced: 0, pending: 0, failed: 0 });
const channelStats = ref<any[]>([]);

const statusOptions = [
  { label: 'Tersinkron', value: 'SYNCED' },
  { label: 'Menunggu', value: 'PENDING' },
  { label: 'Gagal', value: 'FAILED' }
];

const channelTypes = [
  { label: 'Tokopedia', value: 'TOKOPEDIA' },
  { label: 'Shopee', value: 'SHOPEE' },
  { label: 'Lazada', value: 'LAZADA' },
  { label: 'TikTok Shop', value: 'TIKTOK' },
  { label: 'Bukalapak', value: 'BUKALAPAK' },
  { label: 'Blibli', value: 'BLIBLI' },
  { label: 'Lainnya', value: 'OTHER' }
];

// Form State
const formVisible = ref(false);
const editingId = ref<string | null>(null);
const form = reactive({
  channelId: '',
  productName: '',
  productSku: '',
  marketplaceProductId: '',
  marketplaceUrl: '',
  sellingPrice: 0,
  stockQty: 0,
  syncStock: true,
  syncPrice: true,
  notes: ''
});

// Channel Modal State
const channelModalVisible = ref(false);
const newChannel = reactive({
  name: '',
  code: '',
  type: '',
  apiEndpoint: '',
  clientId: '',
  clientSecret: '',
  isActive: true
});
const addingChannel = ref(false);

// Sync Log State
const syncLogVisible = ref(false);
const syncLogLoading = ref(false);

// Delete State
const deleteConfirmVisible = ref(false);
const deleteTarget = ref<Listing | null>(null);

const filteredListings = computed(() => {
  let result = listings.value;
  if (channelFilter.value) {
    result = result.filter(l => l.channelId === channelFilter.value);
  }
  if (statusFilter.value) {
    result = result.filter(l => l.syncStatus === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    result = result.filter(l =>
      l.productName.toLowerCase().includes(q) ||
      l.productSku.toLowerCase().includes(q) ||
      (l.marketplaceProductId && l.marketplaceProductId.toLowerCase().includes(q))
    );
  }
  return result;
});

const getChannelEmoji = (name?: string) => {
  if (!name) return '🏪';
  const n = name.toLowerCase();
  if (n.includes('tokopedia')) return '🟢';
  if (n.includes('shopee')) return '🟠';
  if (n.includes('lazada')) return '🔴';
  if (n.includes('tiktok')) return '🎵';
  if (n.includes('bukalapak')) return '🟣';
  if (n.includes('blibli')) return '🔵';
  return '🏪';
};

const getChannelStyle = (name?: string) => {
  if (!name) return { bg: 'bg-slate-100 text-slate-600' };
  const n = name.toLowerCase();
  if (n.includes('tokopedia')) return { bg: 'bg-emerald-100 text-emerald-600' };
  if (n.includes('shopee')) return { bg: 'bg-orange-100 text-orange-600' };
  if (n.includes('lazada')) return { bg: 'bg-red-100 text-red-600' };
  if (n.includes('tiktok')) return { bg: 'bg-pink-100 text-pink-600' };
  if (n.includes('bukalapak')) return { bg: 'bg-purple-100 text-purple-600' };
  if (n.includes('blibli')) return { bg: 'bg-blue-100 text-blue-600' };
  return { bg: 'bg-slate-100 text-slate-600' };
};

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val || 0);
};

const formatDate = (iso?: string) => {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatDateTime = (iso?: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

async function loadListings() {
  loading.value = true;
  try {
    const res = await api.get('/ecommerce/marketplace');
    if (res.data?.listings) {
      listings.value = res.data.listings;
    }
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal memuat data listing' });
  } finally {
    loading.value = false;
  }
}

async function loadChannels() {
  try {
    const res = await api.get('/ecommerce/marketplace/channels');
    if (res.data?.channels) {
      channels.value = res.data.channels;
    }
  } catch (e) {}
}

async function loadStats() {
  try {
    const res = await api.get('/ecommerce/marketplace/stats');
    if (res.data) {
      stats.total = res.data.stats?.total || 0;
      stats.synced = res.data.stats?.synced || 0;
      stats.pending = res.data.stats?.pending || 0;
      stats.failed = res.data.stats?.failed || 0;
      channelStats.value = res.data.byChannel || [];
    }
  } catch (e) {}
}

function openForm(listing?: Listing) {
  if (listing) {
    editingId.value = listing.id;
    form.channelId = listing.channelId;
    form.productName = listing.productName;
    form.productSku = listing.productSku;
    form.marketplaceProductId = listing.marketplaceProductId || '';
    form.marketplaceUrl = listing.marketplaceUrl || '';
    form.sellingPrice = listing.sellingPrice;
    form.stockQty = listing.stockQty;
    form.syncStock = listing.syncStock;
    form.syncPrice = listing.syncPrice;
    form.notes = listing.notes || '';
  } else {
    editingId.value = null;
    form.channelId = '';
    form.productName = '';
    form.productSku = '';
    form.marketplaceProductId = '';
    form.marketplaceUrl = '';
    form.sellingPrice = 0;
    form.stockQty = 0;
    form.syncStock = true;
    form.syncPrice = true;
    form.notes = '';
  }
  formVisible.value = true;
}

async function saveForm() {
  if (!form.channelId || !form.productName || !form.productSku) {
    toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Field dengan * wajib diisi' });
    return;
  }

  saving.value = true;
  try {
    if (editingId.value) {
      await api.put(`/ecommerce/marketplace/${editingId.value}`, form);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Listing berhasil diperbarui' });
    } else {
      await api.post('/ecommerce/marketplace', form);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Listing berhasil dibuat' });
    }
    formVisible.value = false;
    await loadListings();
    await loadStats();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message || 'Gagal menyimpan' });
  } finally {
    saving.value = false;
  }
}

function openChannelModal() {
  channelModalVisible.value = true;
}

async function addChannel() {
  if (!newChannel.name || !newChannel.code || !newChannel.type) {
    toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Nama, Kode, dan Tipe channel wajib diisi' });
    return;
  }

  addingChannel.value = true;
  try {
    await api.post('/ecommerce/channels', { ...newChannel });
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Channel berhasil ditambahkan' });
    newChannel.name = '';
    newChannel.code = '';
    newChannel.type = '';
    newChannel.apiEndpoint = '';
    newChannel.clientId = '';
    newChannel.clientSecret = '';
    newChannel.isActive = true;
    await loadChannels();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message || 'Gagal menambah channel' });
  } finally {
    addingChannel.value = false;
  }
}

async function editChannel(ch: Channel) {
  const newName = prompt('Nama Channel:', ch.name);
  if (newName && newName !== ch.name) {
    try {
      await api.put(`/ecommerce/channels/${ch.id}`, { name: newName });
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Channel berhasil diperbarui' });
      await loadChannels();
    } catch (e: any) {
      toast.add({ severity: 'error', summary: 'Error', detail: e.message });
    }
  }
}

async function testConnection(ch: Channel) {
  try {
    const res = await api.post(`/ecommerce/channels/${ch.id}/test-connection`);
    if (res.data?.success) {
      toast.add({ severity: 'success', summary: 'Koneksi Berhasil', detail: res.data.message });
    } else {
      toast.add({ severity: 'error', summary: 'Koneksi Gagal', detail: res.data?.message || 'Gagal terhubung' });
    }
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message });
  }
}

async function deleteChannel(ch: Channel) {
  if (!confirm(`Hapus channel "${ch.name}"?`)) return;
  try {
    await api.delete(`/ecommerce/channels/${ch.id}`);
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Channel berhasil dihapus' });
    await loadChannels();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message });
  }
}

async function syncOne(listing: Listing) {
  syncingId.value = listing.id;
  syncing.value = true;
  try {
    const res = await api.post(`/ecommerce/marketplace/${listing.id}/sync`);
    if (res.data?.result?.success) {
      toast.add({ severity: 'success', summary: 'Sinkronisasi Berhasil', detail: 'Produk berhasil disinkronkan' });
    } else {
      toast.add({ severity: 'warn', summary: 'Sinkronisasi Gagal', detail: res.data?.result?.message || 'Gagal sinkronisasi' });
    }
    await loadListings();
    await loadStats();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message });
  } finally {
    syncingId.value = null;
    syncing.value = false;
  }
}

async function syncAll() {
  syncing.value = true;
  try {
    const res = await api.post('/ecommerce/marketplace/sync-all');
    const summary = res.data?.summary;
    if (summary) {
      toast.add({ severity: 'success', summary: 'Sinkronisasi Selesai', detail: `${summary.success} berhasil, ${summary.failed} gagal dari ${summary.total} listing` });
    }
    await loadListings();
    await loadStats();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message });
  } finally {
    syncing.value = false;
  }
}

function filterByChannel(channelId: string) {
  channelFilter.value = channelFilter.value === channelId ? '' : channelId;
}

async function showSyncLog() {
  syncLogVisible.value = true;
  syncLogLoading.value = true;
  try {
    const res = await api.get('/ecommerce/marketplace/sync-log');
    if (res.data?.logs) {
      syncLogs.value = res.data.logs;
    }
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal memuat riwayat sync' });
  } finally {
    syncLogLoading.value = false;
  }
}

function confirmDelete(listing: Listing) {
  deleteTarget.value = listing;
  deleteConfirmVisible.value = true;
}

async function doDelete() {
  if (!deleteTarget.value) return;
  deleting.value = true;
  try {
    await api.delete(`/ecommerce/marketplace/${deleteTarget.value.id}`);
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Listing berhasil dihapus' });
    deleteConfirmVisible.value = false;
    await loadListings();
    await loadStats();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message });
  } finally {
    deleting.value = false;
  }
}

onMounted(async () => {
  await Promise.all([loadListings(), loadChannels(), loadStats()]);
});
</script>

<style scoped>
:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.25rem 1rem !important;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(241, 245, 249, 0.5) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-dialog-mask) {
  backdrop-filter: blur(4px);
}

:deep(.p-select), :deep(.p-inputtext), :deep(.p-inputnumber-input), :deep(.p-textarea) {
  border-color: #f1f5f9 !important;
  box-shadow: none !important;
  background-color: #f8fafc !important;
}

:deep(.p-select:hover), :deep(.p-inputtext:hover) {
  border-color: #a855f7 !important;
}

:deep(.p-select-label) {
  font-size: 12px !important;
  font-weight: 700 !important;
  color: #1e293b !important;
}

:deep(.p-inputnumber-input) {
  text-align: right !important;
}
</style>
