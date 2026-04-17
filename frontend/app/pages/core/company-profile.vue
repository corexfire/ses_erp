<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Core Identity</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-blue-600">Profil Perusahaan</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Company <span class="text-blue-600">Profile</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight italic">Manajemen identitas hukum, informasi kontak, dan alamat korespondensi resmi perusahaan.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Simpan Perubahan" icon="pi pi-save" class="p-button-rounded font-black text-xs shadow-lg shadow-blue-100 px-6" @click="save" :loading="saving" />
      </div>
    </div>

    <!-- Stats / Overview Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase truncate">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main Content: Forms -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left Column: Legal & Contact -->
      <div class="lg:col-span-12 space-y-8 h-full">
        
        <div class="flex flex-col md:flex-row gap-8">
          <!-- LEGAL CARD -->
          <div class="flex-1 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-blue-300 transition-all duration-300">
             <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10 shrink-0">
                <div>
                   <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Identitas Hukum</h2>
                   <p class="text-xs text-slate-500 font-medium">Data legalitas yang tercatat pada akta pendirian.</p>
                </div>
                <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                  <i class="pi pi-id-card text-lg"></i>
                </div>
             </div>

             <div class="p-8 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <!-- CONTACT CARD -->
          <div class="flex-1 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-emerald-300 transition-all duration-300">
             <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10 shrink-0">
                <div>
                   <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Informasi Kontak</h2>
                   <p class="text-xs text-slate-500 font-medium">Saluran komunikasi resmi korespondensi perusahaan.</p>
                </div>
                <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-all">
                  <i class="pi pi-envelope text-lg"></i>
                </div>
             </div>

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
          </div>
        </div>

        <!-- ADDRESS CARD (Full Width) -->
        <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-indigo-300 transition-all duration-300">
           <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
              <div>
                 <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Lokasi & Alamat Kantor Pusat</h2>
                 <p class="text-xs text-slate-500 font-medium">Titik koordinat penagihan dan pengiriman dokumen resmi.</p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                <i class="pi pi-map-marker text-lg"></i>
              </div>
           </div>

           <div class="p-8 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Baris 1</label>
                    <InputText v-model="form.address1" class="w-full text-sm font-black rounded-2xl border-slate-200" placeholder="Nama Jalan, Gedung, No." />
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Baris 2 (Opsional)</label>
                    <InputText v-model="form.address2" class="w-full text-sm font-black rounded-2xl border-slate-200" placeholder="Lantai, Suite, Unit" />
                 </div>
              </div>

               <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kota / Kabupaten</label>
                     <InputText v-model="form.city" class="w-full text-sm font-black rounded-2xl border-slate-200" />
                  </div>
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Provinsi</label>
                     <InputText v-model="form.province" class="w-full text-sm font-black rounded-2xl border-slate-200" />
                  </div>
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Pos</label>
                     <InputText v-model="form.postalCode" class="w-full text-sm font-black rounded-2xl border-slate-200" />
                  </div>
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Negara (ISO)</label>
                     <InputText v-model="form.countryCode" class="w-full text-sm font-black rounded-2xl border-slate-200" placeholder="ID" />
                  </div>
               </div>
               
               <!-- Map Location & Company Size -->
               <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
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
         </div>

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
  const sizeLabel = {
    'KECIL': 'Kecil',
    'MENENGAH': 'Menengah',
    'BESAR': 'Besar'
  }[form.value.companySize] || 'Kecil';
  
  return [
    { label: 'Entitas Resmi', value: form.value.legalName || 'Belum Diatur', sub: 'Nama Terdaftar', icon: 'pi pi-verified', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Domisili Pajak', value: form.value.province || 'Belum Diatur', sub: form.value.city || 'Nasional', icon: 'pi pi-map', color: 'bg-blue-50 text-blue-600' },
    { label: 'Klasifikasi Pajak', value: sizeLabel, sub: 'Berpengaruh ke PPh & SPT', icon: 'pi pi-building', color: 'bg-amber-50 text-amber-600' }
  ];
});

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/company-profile');
    const data = res.companyProfile || res.data?.companyProfile || res.data;
    
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
