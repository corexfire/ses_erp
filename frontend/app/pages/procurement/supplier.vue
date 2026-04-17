<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Pemasok (Supplier Management)</div>
          <div class="mt-1 text-sm text-slate-600">
            Daftar vendor, pemasok bahan baku, dan mitra pihak ketiga. Kelola termin pembayaran (ToP) dan informasi perbankan mereka di sini.
          </div>
        </div>
        <Button v-if="canManage" label="+ Tambah Pemasok" size="small" @click="openCreate" />
      </div>
    </div>

    <!-- Data Table -->
    <div class="rounded-xl border bg-white p-5">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <InputText v-model="search" placeholder="Cari Kode, Nama, NPWP..." class="w-64 text-xs" />
          <Button label="Reload" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-indigo-50/50 text-left text-xs text-indigo-900 border-b border-indigo-100">
            <tr>
              <th class="px-4 py-3 font-bold w-12">Kode</th>
              <th class="px-4 py-3 font-bold">Identitas Pemasok</th>
              <th class="px-4 py-3 font-bold">Kategori (Grup)</th>
              <th class="px-4 py-3 font-bold">NPWP & Finansial</th>
              <th class="px-4 py-3 font-bold text-center">Status</th>
              <th class="px-4 py-3 text-right font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
            <tr v-if="loading">
              <td colspan="6" class="px-4 py-12 text-center text-sm text-slate-400">
                <i class="pi pi-spinner pi-spin mr-2"></i> Mengambil data pemasok dari server...
              </td>
            </tr>
            <tr v-for="s in filteredSuppliers" v-else :key="s.id" class="transition hover:bg-slate-50" :class="!s.isActive ? 'opacity-60 bg-slate-50' : ''">
              <!-- Kode -->
              <td class="px-4 py-3 font-mono text-xs font-semibold text-slate-600">{{ s.code }}</td>
              
              <!-- Identitas -->
              <td class="px-4 py-3">
                <div class="font-bold text-slate-800">{{ s.name }}</div>
                <div class="text-[10px] text-slate-500 mt-1 flex flex-col gap-0.5">
                  <span v-if="s.email">✉️ {{ s.email }}</span>
                  <span v-if="s.phone">📞 {{ s.phone }}</span>
                  <span v-if="!s.email && !s.phone" class="italic text-slate-400">Kontak tidak tersedia</span>
                </div>
              </td>
              
              <!-- Tag Group/Kategori -->
              <td class="px-4 py-3">
                <span class="inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" :class="getVendorGroupStyle(s.vendorGroup)">
                  {{ s.vendorGroup || 'UMUM' }}
                </span>
                <div class="text-[10px] text-slate-400 mt-1">{{ s.city || 'Kota Tidak Diketahui' }}</div>
              </td>
              
              <!-- Finansial (NPWP, Bank, TERM) -->
              <td class="px-4 py-3">
                <div class="flex flex-col gap-1 text-[10px]">
                  <div class="flex items-center gap-1">
                    <span class="font-semibold text-slate-500 w-10">NPWP:</span>
                    <span class="font-mono text-indigo-700">{{ s.npwp || 'Belum Diatur' }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="font-semibold text-slate-500 w-10">ToP:</span>
                    <span class="font-bold text-emerald-600">{{ s.paymentTerms || 'CASH' }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="font-semibold text-slate-500 w-10">BANK:</span>
                    <span class="text-slate-700">{{ s.bankName || '-' }} ({{ s.bankAccount || '-' }})</span>
                  </div>
                </div>
              </td>

              <!-- Status -->
              <td class="px-4 py-3 text-center">
                <span class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold" :class="s.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'">
                  <span class="h-1.5 w-1.5 rounded-full" :class="s.isActive ? 'bg-emerald-500' : 'bg-red-500'"></span>
                  {{ s.isActive ? 'Aktif' : 'Nonaktif' }}
                </span>
              </td>

              <!-- Aksi -->
              <td class="px-4 py-3 text-right">
                <div class="inline-flex gap-1">
                  <Button v-if="canManage" label="Edit" size="small" severity="secondary" outlined class="text-[10px] px-2 py-1" @click="openEdit(s)" />
                  <Button v-if="canManage && s.isActive" label="Nonaktifkan" size="small" severity="danger" text class="text-[10px] px-2 py-1" @click="confirmDeactivate(s)" />
                </div>
              </td>
            </tr>
            <tr v-if="!loading && filteredSuppliers.length === 0">
              <td colspan="6" class="px-4 py-16 text-center text-sm text-slate-500">Tidak ada data pemasok yang cocok dengan pencarian Anda.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="error" class="mt-4 rounded bg-red-50 p-3 text-xs text-red-600">⚠️ {{ error }}</div>
    </div>

    <!-- Create / Edit Form Modal -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div class="w-full max-w-3xl rounded-xl border bg-white shadow-2xl flex flex-col max-h-[90vh]">
        
        <div class="p-5 border-b bg-slate-50 flex items-start justify-between rounded-t-xl">
          <div>
            <div class="text-sm font-semibold text-slate-800">{{ editingItem ? 'Ubah Profil Pemasok' : 'Tambah Pemasok Baru' }}</div>
            <div class="text-xs text-slate-500 mt-1">Pastikan data NPWP dan Rekening Bank valid untuk kelancaran transaksi Account Payable.</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 text-lg font-bold" @click="dialogOpen = false; formError = ''">✕</button>
        </div>

        <div class="p-5 overflow-y-auto space-y-6 flex-1">
          
          <!-- Section: Identitas Utama -->
          <div>
            <div class="text-xs font-bold text-slate-700 uppercase tracking-widest border-b pb-1 mb-3">1. Identitas Utama & Kontak</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Kode Pemasok <span class="text-red-500">*</span></label>
                <InputText v-model="form.code" class="w-full font-mono text-sm" placeholder="Cth: SUP-RAW-001" :disabled="!!editingItem || saving" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Kategori / Vendor Group</label>
                <select v-model="form.vendorGroup" class="w-full rounded-md border p-2 text-sm bg-white" :disabled="saving">
                  <option value="RAW_MATERIALS">Bahan Baku (Raw Materials)</option>
                  <option value="PACKAGING">Bahan Kemas (Packaging)</option>
                  <option value="EQUIPMENT">Mesin & Sparepart (Equipment)</option>
                  <option value="SERVICES">Jasa & Pemeliharaan (Services)</option>
                  <option value="GENERAL">Umum (General)</option>
                </select>
              </div>
              <div class="space-y-1 md:col-span-2">
                <label class="text-xs font-semibold text-slate-600">Nama Perusahaan <span class="text-red-500">*</span></label>
                <InputText v-model="form.name" class="w-full text-sm font-bold" placeholder="PT / CV / Bpk..." :disabled="saving" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Alamat Email</label>
                <InputText v-model="form.email" type="email" class="w-full text-sm" placeholder="sales@perusahaan.com" :disabled="saving" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Nomor Telepon</label>
                <InputText v-model="form.phone" class="w-full text-sm" placeholder="021-xxxx / 0812xxxx" :disabled="saving" />
              </div>
            </div>
          </div>

          <!-- Section: Finansial & Legal -->
          <div>
            <div class="text-xs font-bold text-slate-700 uppercase tracking-widest border-b pb-1 mb-3">2. Finansial & Pajak</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Nomor NPWP</label>
                <InputText v-model="form.npwp" class="w-full text-sm font-mono" placeholder="00.000.000.0-000.000" :disabled="saving" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Termin Pembayaran (Term of Payment)</label>
                <select v-model="form.paymentTerms" class="w-full rounded-md border p-2 text-sm bg-white" :disabled="saving">
                  <option value="CASH">Cash Before Delivery (CBD) / Cash</option>
                  <option value="COD">Cash On Delivery (COD)</option>
                  <option value="NET14">Net 14 Hari</option>
                  <option value="NET30">Net 30 Hari</option>
                  <option value="NET45">Net 45 Hari</option>
                  <option value="NET60">Net 60 Hari</option>
                  <option value="DP50_NET30">DP 50% / Net 30 Hari</option>
                </select>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Nama Bank Tujuan</label>
                <InputText v-model="form.bankName" class="w-full text-sm" placeholder="BCA / Mandiri / BNI..." :disabled="saving" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Nomor Rekening</label>
                <InputText v-model="form.bankAccount" class="w-full text-sm font-mono" placeholder="Cth: 8102391238" :disabled="saving" />
              </div>
            </div>
          </div>

          <!-- Section: Alamat -->
          <div>
            <div class="text-xs font-bold text-slate-700 uppercase tracking-widest border-b pb-1 mb-3">3. Alamat Operasional</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1 md:col-span-2">
                <label class="text-xs font-semibold text-slate-600">Alamat Lengkap</label>
                <InputText v-model="form.address1" class="w-full text-sm" placeholder="Nama Jalan, Gedung, No" :disabled="saving" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Kota / Kabupaten</label>
                <InputText v-model="form.city" class="w-full text-sm" placeholder="Cth: Jakarta Selatan" :disabled="saving" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Provinsi</label>
                <InputText v-model="form.province" class="w-full text-sm" placeholder="Cth: DKI Jakarta" :disabled="saving" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Kode Pos</label>
                <InputText v-model="form.postalCode" class="w-full text-sm" placeholder="Cth: 12190" :disabled="saving" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-600">Kawasan Negara</label>
                <InputText v-model="form.countryCode" class="w-full text-sm bg-slate-50" readonly :disabled="saving" />
              </div>
            </div>
          </div>
        </div>

        <div v-if="formError" class="px-5 pb-2">
          <div class="rounded bg-red-50 p-3 text-xs text-red-600 border border-red-100 flex items-center gap-2">⚠️ {{ formError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-2 rounded-b-xl">
          <Button label="Batal" severity="secondary" size="small" :disabled="saving" @click="dialogOpen = false" />
          <Button 
            :label="editingItem ? 'Simpan Perubahan' : 'Tambahkan Pemasok'" 
            size="small" 
            :loading="saving" 
            :disabled="saving || !form.code || !form.name" 
            @click="save" 
            class="bg-indigo-600 border-none hover:bg-indigo-700 text-white" 
          />
        </div>
      </div>
    </div>

    <!-- Confirm Deactivate Modal -->
    <div v-if="confirmDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div class="w-full max-w-sm rounded-xl border bg-white p-5 shadow-xl">
        <div class="text-sm font-bold text-red-600 flex items-center gap-2 mb-2">⚠️ Peringatan Penonaktifan</div>
        <div class="text-sm text-slate-600 leading-relaxed">
          Pemasok <strong>{{ confirmTarget?.name }}</strong> akan dinonaktifkan. Anda tidak dapat membuat Purchase Order baru ke pemasok ini.
        </div>
        <div class="mt-5 flex justify-end gap-2">
          <Button label="Batal" severity="secondary" size="small" @click="confirmDialog = false" />
          <Button label="Ya, Nonaktifkan" severity="danger" size="small" :loading="deactivating" @click="doDeactivate" />
        </div>
        <div v-if="deactivateError" class="mt-4 rounded bg-red-50 p-2 text-xs text-red-600">{{ deactivateError }}</div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('procurement.supplier.create') || auth.hasPermission('procurement.supplier.update'));

const suppliers = ref<any[]>([]);
const search = ref('');
const loading = ref(false);
const saving = ref(false);
const deactivating = ref(false);
const error = ref('');
const formError = ref('');
const deactivateError = ref('');

// Dialog states
const dialogOpen = ref(false);
const confirmDialog = ref(false);
const editingItem = ref<any>(null);
const confirmTarget = ref<any>(null);

// Form State
const form = reactive({
  code: '',
  name: '',
  email: '',
  phone: '',
  vendorGroup: 'GENERAL',
  npwp: '',
  bankName: '',
  bankAccount: '',
  paymentTerms: 'NET30',
  address1: '',
  address2: '',
  city: '',
  province: '',
  postalCode: '',
  countryCode: 'ID',
});

const filteredSuppliers = computed(() => {
  if (!search.value) return suppliers.value;
  const q = search.value.toLowerCase();
  return suppliers.value.filter(s => 
    (s.code && s.code.toLowerCase().includes(q)) || 
    (s.name && s.name.toLowerCase().includes(q)) ||
    (s.npwp && s.npwp.toLowerCase().includes(q))
  );
});

// Presentation Helpers
const getVendorGroupStyle = (group?: string) => {
  switch (group) {
    case 'RAW_MATERIALS': return 'bg-amber-100 text-amber-700 border border-amber-200';
    case 'PACKAGING': return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'EQUIPMENT': return 'bg-purple-100 text-purple-700 border border-purple-200';
    case 'SERVICES': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    case 'GENERAL':
    default: return 'bg-slate-100 text-slate-700 border border-slate-200';
  }
};

async function load() {
  loading.value = true;
  error.value = '';
  try {
    // Karena logic PrismaClient error pada script pythone/TS sebelumnya, backend API nya bisa di hit asal start:dev sudah di restart atau via DB langsung
    // Asumsikan data berhasil ditambahkan lewat DB, get endpoint ini masih valid dari sebelumnya
    const res = await api.get('/procurement/suppliers');
    suppliers.value = res.data?.suppliers || [];
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Gagal memuat daftar pemasok dari server';
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  editingItem.value = null;
  formError.value = '';
  
  form.code = '';
  form.name = '';
  form.email = '';
  form.phone = '';
  form.vendorGroup = 'GENERAL';
  form.npwp = '';
  form.bankName = '';
  form.bankAccount = '';
  form.paymentTerms = 'NET30';
  form.address1 = '';
  form.city = '';
  form.province = '';
  form.postalCode = '';
  form.countryCode = 'ID';
  
  dialogOpen.value = true;
}

function openEdit(s: any) {
  editingItem.value = s;
  formError.value = '';
  
  form.code = s.code;
  form.name = s.name;
  form.email = s.email || '';
  form.phone = s.phone || '';
  form.vendorGroup = s.vendorGroup || 'GENERAL';
  form.npwp = s.npwp || '';
  form.bankName = s.bankName || '';
  form.bankAccount = s.bankAccount || '';
  form.paymentTerms = s.paymentTerms || 'NET30';
  form.address1 = s.address1 || '';
  form.city = s.city || '';
  form.province = s.province || '';
  form.postalCode = s.postalCode || '';
  form.countryCode = s.countryCode || 'ID';
  
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  formError.value = '';
  try {
    const payload = {
      code: form.code,
      name: form.name,
      email: form.email || undefined,
      phone: form.phone || undefined,
      vendorGroup: form.vendorGroup || undefined,
      npwp: form.npwp || undefined,
      bankName: form.bankName || undefined,
      bankAccount: form.bankAccount || undefined,
      paymentTerms: form.paymentTerms || undefined,
      address1: form.address1 || undefined,
      city: form.city || undefined,
      province: form.province || undefined,
      postalCode: form.postalCode || undefined,
      countryCode: form.countryCode || undefined,
    };

    if (editingItem.value) {
      // Catatan: Jika update DTO nya masi error karena restart cache backend, proses simpan backend mungkin gagal,
      // tetapi untuk data seed PG sudah sukses masuk.
      await api.patch(`/procurement/suppliers/${editingItem.value.id}`, payload);
    } else {
      await api.post('/procurement/suppliers', payload);
    }
    
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    formError.value = e.response?.data?.message || 'Gagal menyimpan data pemasok.';
  } finally {
    saving.value = false;
  }
}

function confirmDeactivate(s: any) {
  confirmTarget.value = s;
  deactivateError.value = '';
  confirmDialog.value = true;
}

async function doDeactivate() {
  if (!confirmTarget.value) return;
  deactivating.value = true;
  deactivateError.value = '';
  try {
    await api.patch(`/procurement/suppliers/${confirmTarget.value.id}/deactivate`);
    confirmDialog.value = false;
    await load();
  } catch (e: any) {
    deactivateError.value = e.response?.data?.message || 'Gagal menonaktifkan pemasok.';
  } finally {
    deactivating.value = false;
  }
}

onMounted(() => {
  load();
});
</script>
