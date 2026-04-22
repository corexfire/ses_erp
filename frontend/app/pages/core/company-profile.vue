<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <DashboardHero
      badge="Core Identity"
      badge-accent="Profil Perusahaan"
      title="Company"
      title-accent="Profile"
      description="Manajemen identitas hukum, informasi kontak, dan alamat korespondensi resmi perusahaan."
      color="sky"
      :loading="loading"
      @refresh="load"
    >
      <template #actions>
        <Button 
          label="Simpan Perubahan" 
          icon="pi pi-save" 
          class="p-button-sm font-black text-xs px-6 bg-white/20 hover:bg-white/30 text-white border-white/20" 
          @click="save" 
          :loading="saving" 
        />
      </template>
    </DashboardHero>

    <!-- Stats / Overview Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
       <MiniStatsCard
          v-for="s in stats"
          :key="s.label"
          :label="s.label"
          :value="s.value"
          :sub="s.sub"
          :icon="s.icon"
          :sub-color="s.subColor"
       />
    </div>

    <!-- Main Content: Forms -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left Column: Legal & Contact -->
      <div class="lg:col-span-12 space-y-8 h-full">
        
        <div class="flex flex-col md:flex-row gap-8">
          <!-- LEGAL CARD -->
          <PanelCard
            title="Identitas Hukum"
            subtitle="Data legalitas yang tercatat pada akta pendirian."
            icon="pi pi-id-card"
            theme="blue"
            :show-search="false"
            :show-filter="false"
            :show-refresh="false"
            class="flex-1"
          >
            <template #table>
              <div class="p-8 space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Legal Perusahaan</label>
                        <InputText v-model="form.legalName" class="w-full text-sm font-black rounded-2xl border-slate-200 hover:border-blue-400 transition-all" placeholder="Contoh: PT. Sinergi Era Solusi" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Komersial / Brand</label>
                        <InputText v-model="form.tradeName" class="w-full text-sm font-black rounded-2xl border-slate-200 hover:border-blue-400 transition-all" placeholder="Contoh: SES ERP" />
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">NPWP (Nomor Pokok Wajib Pajak)</label>
                    <InputText v-model="form.npwp" class="w-full text-sm font-black rounded-2xl border-slate-200 font-mono tracking-widest" placeholder="00.000.000.0-000.000" />
                  </div>
              </div>
            </template>
          </PanelCard>

          <!-- CONTACT CARD -->
          <PanelCard
            title="Informasi Kontak"
            subtitle="Saluran komunikasi resmi korespondensi perusahaan."
            icon="pi pi-envelope"
            theme="emerald"
            :show-search="false"
            :show-filter="false"
            :show-refresh="false"
            class="flex-1"
          >
            <template #table>
              <div class="p-8 space-y-6">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Email Resmi</label>
                   <InputText v-model="form.email" class="w-full text-sm font-black rounded-2xl border-slate-200" placeholder="admin@corporate.id" />
                </div>
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">No. Telepon / Kantor</label>
                   <InputText v-model="form.phone" class="w-full text-sm font-black rounded-2xl border-slate-200" placeholder="021-xxxx-xxxx" />
                </div>
              </div>
            </template>
          </PanelCard>
        </div>

        <!-- ADDRESS CARD (Full Width) -->
        <PanelCard
          title="Lokasi & Alamat Kantor Pusat"
          subtitle="Titik koordinat penagihan dan pengiriman dokumen resmi."
          icon="pi pi-map-marker"
          theme="indigo"
          :show-search="false"
          :show-filter="false"
          :show-refresh="false"
          class="mt-8"
        >
          <template #table>
            <div class="p-8 space-y-6">
               <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Negara</label>
                     <InputText v-model="form.country" class="w-full text-sm font-black rounded-2xl border-slate-200" placeholder="Indonesia" />
                  </div>
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Provinsi / State</label>
                     <InputText v-model="form.province" class="w-full text-sm font-black rounded-2xl border-slate-200" placeholder="DKI Jakarta" />
                  </div>
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kota / Kabupaten</label>
                     <InputText v-model="form.city" class="w-full text-sm font-black rounded-2xl border-slate-200" placeholder="Jakarta Pusat" />
                  </div>
               </div>

               <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div class="md:col-span-3 space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Lengkap (Baris 1)</label>
                     <InputText v-model="form.address1" class="w-full text-sm font-black rounded-2xl border-slate-200" placeholder="Nama Jalan, Gedung, No." />
                  </div>
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Pos</label>
                     <InputText v-model="form.postalCode" class="w-full text-sm font-black rounded-2xl border-slate-200" placeholder="10110" />
                  </div>
               </div>
               
               <!-- Map Location & Company Size -->
               <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                  <!-- Map Location -->
                  <div class="space-y-4">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lokasi Mapa (Koordinat GPS)</label>
                     <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                           <label class="text-[10px] text-slate-500 font-bold">Latitude</label>
                           <InputNumber v-model="form.latitude" class="w-full" :minfractiondigits="6" :maxfractiondigits="6" placeholder="-6.2088" />
                        </div>
                        <div class="space-y-2">
                           <label class="text-[10px] text-slate-500 font-bold">Longitude</label>
                           <InputNumber v-model="form.longitude" class="w-full" :minfractiondigits="6" :maxfractiondigits="6" placeholder="106.8456" />
                        </div>
                     </div>
                     <div v-if="form.latitude && form.longitude" class="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div class="text-[10px] text-slate-500 mb-2 font-bold">Preview:</div>
                        <div class="text-xs text-slate-600">
                           <a :href="`https://www.google.com/maps?q=${form.latitude},${form.longitude}`" target="_blank" class="text-blue-600 hover:underline flex items-center gap-1">
                              <i class="pi pi-external-link text-xs"></i>
                              Buka di Google Maps
                           </a>
                        </div>
                     </div>
                  </div>
                  
                  <!-- Company Size (Tax Classification) -->
                  <div class="space-y-4">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Klasifikasi Ukuran Perusahaan</label>
                     <p class="text-[10px] text-slate-500 -mt-2">Berpengaruh terhadap tarif PPh dan kewajiban pelaporan SPT.</p>
                     <div class="space-y-3">
                        <div v-for="opt in companySizeOptions" :key="opt.value" 
                           class="p-4 rounded-xl border-2 cursor-pointer transition-all"
                           :class="form.companySize === opt.value 
                              ? 'border-amber-500 bg-amber-50' 
                              : 'border-slate-200 hover:border-slate-300'"
                           @click="form.companySize = opt.value">
                           <div class="flex items-center gap-3">
                              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                                 :class="form.companySize === opt.value ? 'border-amber-500 bg-amber-500' : 'border-slate-300'">
                                 <div v-if="form.companySize === opt.value" class="w-2 h-2 rounded-full bg-white"></div>
                              </div>
                              <span class="text-sm font-bold" :class="form.companySize === opt.value ? 'text-amber-700' : 'text-slate-700'">
                                 {{ opt.label }}
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </template>
        </PanelCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const loading = ref(false);
const saving = ref(false);
const profileData = ref<any>(null);

const form = ref<any>({
  legalName: '',
  tradeName: '',
  npwp: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  province: '',
  postalCode: '',
  countryCode: 'ID',
  latitude: null,
  longitude: null,
  companySize: 'KECIL'
});

const companySizeOptions = [
  { label: 'Kecil (Omzet < 4.5 Milyar)', value: 'KECIL' },
  { label: 'Menengah (Omzet 4.5 M - 50 Milyar)', value: 'MENENGAH' },
  { label: 'Besar (Omzet > 50 Milyar)', value: 'BESAR' }
];

const stats = computed(() => {
  const sizeLabel = ({
    'KECIL': 'Kecil',
    'MENENGAH': 'Menengah',
    'BESAR': 'Besar'
  } as Record<string, string>)[form.value.companySize] || 'Kecil';
  
  return [
    { label: 'Entitas Resmi', value: form.value.legalName || 'Belum Diatur', sub: 'Nama Terdaftar', icon: 'pi pi-verified', subColor: 'emerald' as const },
    { label: 'Domisili Pajak', value: form.value.province || 'Belum Diatur', sub: form.value.city || 'Nasional', icon: 'pi pi-map', subColor: 'blue' as const },
    { label: 'Klasifikasi Pajak', value: sizeLabel, sub: 'Berpengaruh ke PPh & SPT', icon: 'pi pi-building', subColor: 'amber' as const }
  ];
});

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/company-profile');
    const data = res.data?.companyProfile || res.data;
    
    if (data) {
      profileData.value = data;
      form.value = { 
        legalName: data.legalName || '',
        tradeName: data.tradeName || '',
        npwp: data.npwp || '',
        email: data.email || '',
        phone: data.phone || '',
        address1: data.address1 || '',
        address2: data.address2 || '',
        city: data.city || '',
        province: data.province || '',
        postalCode: data.postalCode || '',
        countryCode: data.countryCode || 'ID',
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        companySize: data.companySize || 'KECIL'
      };
    }
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat', detail: e.message });
  } finally {
    loading.value = false;
  }
}

async function save() {
  saving.value = true;
  try {
    await api.put('/core/company-profile', form.value);
    toast.add({ severity: 'success', summary: 'Profil Disimpan', detail: 'Informasi perusahaan berhasil diperbarui.' });
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menyimpan', detail: e.message });
  } finally {
    saving.value = false;
  }
}

onMounted(load);
</script>

<style scoped>
:deep(.p-inputtext) {
  padding: 1rem 1.25rem !important;
}

:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
}

.scale-in-center {
  animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes scale-in-center {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
