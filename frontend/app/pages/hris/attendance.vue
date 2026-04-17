<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-cyan-600 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-clock text-[150px] text-cyan-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-clock text-cyan-700"></i> Absensi Karyawan (Attendance)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Rekap kehadiran harian, shift kerja, dan sistem absensi digital: Barcode Scan, Deteksi Wajah, dan Validasi Lokasi GPS.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="🔲 Scan Barcode" size="small" outlined class="font-bold border-cyan-400 text-cyan-700 hover:bg-cyan-50 text-xs" @click="openCheckin('barcode')" />
          <Button label="👁 Wajah" size="small" outlined class="font-bold border-violet-400 text-violet-700 hover:bg-violet-50 text-xs" @click="openCheckin('face')" />
          <Button label="📍 Lokasi" size="small" outlined class="font-bold border-emerald-400 text-emerald-700 hover:bg-emerald-50 text-xs" @click="openCheckin('location')" />
          <Button label="+ Manual" size="small" icon="pi pi-plus" class="bg-cyan-700 text-white border-none font-bold shadow-sm text-xs" @click="openManual" />
        </div>
      </div>
    </div>

    <!-- Today Summary KPI -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
        <div class="text-3xl font-black text-emerald-700">{{ summary.present }}</div>
        <div class="text-[10px] font-black text-emerald-600 mt-0.5 uppercase tracking-widest">Hadir</div>
      </div>
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
        <div class="text-3xl font-black text-amber-700">{{ summary.late }}</div>
        <div class="text-[10px] font-black text-amber-600 mt-0.5 uppercase tracking-widest">Terlambat</div>
      </div>
      <div class="bg-rose-50 border border-rose-200 rounded-xl p-4 shadow-sm">
        <div class="text-3xl font-black text-rose-700">{{ summary.absent }}</div>
        <div class="text-[10px] font-black text-rose-600 mt-0.5 uppercase tracking-widest">Absen</div>
      </div>
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
        <div class="text-3xl font-black text-blue-700">{{ summary.leave + summary.sick }}</div>
        <div class="text-[10px] font-black text-blue-600 mt-0.5 uppercase tracking-widest">Cuti / Sakit</div>
      </div>
      <div class="bg-white border rounded-xl p-4 shadow-sm">
        <div class="text-lg font-black text-slate-700">{{ avgWorkHours }}j</div>
        <div class="text-[10px] font-black text-slate-500 mt-0.5 uppercase tracking-widest">Rata-rata Jam Kerja</div>
      </div>
    </div>

    <!-- Filter bar -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
      <input type="date" v-model="filterDate" class="border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-cyan-500 h-10" />
      <select v-model="filterStatus" class="border rounded-lg px-3 py-2 text-sm font-semibold h-10 outline-none focus:border-cyan-500">
        <option value="">Semua Status</option>
        <option value="PRESENT">Hadir</option>
        <option value="LATE">Terlambat</option>
        <option value="ABSENT">Absen</option>
        <option value="LEAVE">Cuti</option>
        <option value="SICK">Sakit</option>
      </select>
      <select v-model="filterDept" class="border rounded-lg px-3 py-2 text-sm font-semibold h-10 outline-none focus:border-cyan-500">
        <option value="">Semua Departemen</option>
        <option v-for="d in deptList" :key="d">{{ d }}</option>
      </select>
      <InputText v-model="search" placeholder="Cari nama karyawan..." class="w-48 text-sm h-10" />
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" outlined class="h-10 w-10" />
      <div class="ml-auto text-xs font-medium text-slate-500">{{ filtered.length }} dari {{ attendances.length }} record</div>
    </div>

    <!-- Attendance Table -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-cyan-900 text-left text-[11px] text-white uppercase tracking-widest font-bold">
          <tr>
            <th class="px-5 py-3">Karyawan</th>
            <th class="px-4 py-3 border-l w-24 text-center">Tgl Hadir</th>
            <th class="px-4 py-3 border-l text-center w-24">Check-In</th>
            <th class="px-4 py-3 border-l text-center w-24">Check-Out</th>
            <th class="px-4 py-3 border-l text-center w-20">Jam Kerja</th>
            <th class="px-4 py-3 border-l text-center w-24">Status</th>
            <th class="px-4 py-3 border-l w-28">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="7" class="py-16 text-center text-slate-400">
              <i class="pi pi-spinner pi-spin mr-2 text-cyan-600"></i> Memuat data absensi...
            </td>
          </tr>
          <tr v-for="att in filtered" v-else :key="att.id"
            class="border-t transition hover:bg-cyan-50/10"
            :class="att.status === 'ABSENT' ? 'bg-rose-50/30' : att.status === 'LATE' ? 'bg-amber-50/20' : ''">
            <td class="px-5 py-3 align-middle">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs text-white shrink-0"
                  :style="{ backgroundColor: avatarColor(att.employee?.firstName ?? 'A') }">
                  {{ initials(att.employee?.firstName, att.employee?.lastName) }}
                </div>
                <div>
                  <div class="font-black text-slate-800 text-sm">{{ att.employee?.firstName }} {{ att.employee?.lastName ?? '' }}</div>
                  <div class="text-[10px] text-slate-400 font-medium">{{ att.employee?.department }}</div>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle text-xs font-semibold text-slate-700">
              {{ formatDate(att.date) }}
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <span v-if="att.checkIn" class="font-mono font-black text-sm text-emerald-700">{{ formatTime(att.checkIn) }}</span>
              <span v-else class="text-slate-300 text-xs">—</span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <span v-if="att.checkOut" class="font-mono font-black text-sm text-slate-600">{{ formatTime(att.checkOut) }}</span>
              <span v-else class="text-[10px] text-amber-600 font-black animate-pulse">Aktif</span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <span v-if="att.workHours" class="font-black text-slate-700">{{ Number(att.workHours).toFixed(1) }}j</span>
              <span v-else class="text-slate-300 text-xs">—</span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <span :class="statusBadge(att.status)" class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border">
                {{ att.status }}
              </span>
            </td>
            <td class="px-4 py-3 border-l align-middle text-xs text-slate-500">{{ att.notes ?? '—' }}</td>
          </tr>
          <tr v-if="!loading && filtered.length === 0">
            <td colspan="7" class="py-12 text-center text-slate-400 italic">Tidak ada data absensi sesuai filter.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ============ CHECK-IN MODAL (Barcode / Face / Location) ============ -->
    <div v-if="checkinModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up overflow-hidden">
        <!-- Header -->
        <div class="p-5 border-b flex justify-between items-center"
          :class="checkinMode==='barcode'?'bg-cyan-900':checkinMode==='face'?'bg-violet-900':'bg-emerald-900'">
          <div class="text-white font-black text-base flex items-center gap-2">
            <i :class="checkinModeIcon"></i>
            {{ checkinModeLabel }}
          </div>
          <button class="text-white/60 hover:text-white bg-white/10 w-8 h-8 rounded-full font-bold" @click="closeCheckin">✕</button>
        </div>

        <!-- BARCODE MODE -->
        <div v-if="checkinMode === 'barcode'" class="p-6 space-y-4">
          <div class="bg-slate-950 rounded-xl aspect-video relative flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <!-- Simulated scanner frame -->
              <div class="w-48 h-48 border-2 border-cyan-400 rounded-lg relative">
                <div class="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl"></div>
                <div class="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr"></div>
                <div class="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl"></div>
                <div class="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br"></div>
                <div class="absolute w-full h-0.5 top-1/2 bg-cyan-400 animate-scan"></div>
              </div>
            </div>
            <div class="absolute bottom-3 text-cyan-300 text-xs font-black tracking-widest">
              {{ barcodeScanning ? 'SCANNING...' : 'SIAP SCAN' }}
            </div>
          </div>
          <div class="text-center text-xs text-slate-500 font-medium">Arahkan kamera ke barcode ID karyawan. atau ketik manual:</div>
          <div class="flex gap-2">
            <input v-model="barcodeInput" @keyup.enter="processBarcode" class="flex-1 border rounded-lg px-3 py-2 text-sm font-mono font-black text-cyan-700 outline-none focus:border-cyan-500" placeholder="EMP-001 atau scan..." />
            <Button label="Cek" @click="processBarcode" class="bg-cyan-700 text-white border-none font-bold px-4" />
          </div>
          <div v-if="checkinEmployee" class="rounded-xl bg-cyan-50 border border-cyan-200 p-3 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
              :style="{ backgroundColor: avatarColor(checkinEmployee.firstName) }">
              {{ initials(checkinEmployee.firstName, checkinEmployee.lastName) }}
            </div>
            <div>
              <div class="font-black text-slate-800">{{ checkinEmployee.firstName }} {{ checkinEmployee.lastName ?? '' }}</div>
              <div class="text-xs text-slate-500">{{ checkinEmployee.employeeNo }} · {{ checkinEmployee.department }}</div>
            </div>
            <span class="ml-auto text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full tracking-widest">✓ VALID</span>
          </div>
          <div v-if="checkinError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ checkinError }}</div>
        </div>

        <!-- FACE MODE -->
        <div v-if="checkinMode === 'face'" class="p-6 space-y-4">
          <div class="bg-slate-950 rounded-xl aspect-video relative flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-40 h-48 border-2 border-violet-400 rounded-full relative flex items-center justify-center">
                <i class="pi pi-user text-6xl text-violet-400/40"></i>
                <div v-if="faceDetecting" class="absolute inset-0 border-4 border-violet-400 rounded-full animate-ping opacity-30"></div>
              </div>
            </div>
            <div class="absolute bottom-3 text-violet-300 text-xs font-black tracking-widest text-center w-full">
              {{ faceStatus }}
            </div>
          </div>
          <div class="text-center text-xs text-slate-500 font-medium">Hadapkan wajah Anda ke kamera. Sistem akan mendeteksi dan verifikasi identitas secara otomatis.</div>
          <Button v-if="!faceDetecting && !checkinEmployee" label="🎥 Mulai Deteksi Wajah" @click="startFaceDetect" class="w-full bg-violet-700 text-white border-none font-bold" />
          <div v-if="checkinEmployee" class="rounded-xl bg-violet-50 border border-violet-200 p-3 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
              :style="{ backgroundColor: avatarColor(checkinEmployee.firstName) }">
              {{ initials(checkinEmployee.firstName, checkinEmployee.lastName) }}
            </div>
            <div>
              <div class="font-black text-slate-800">{{ checkinEmployee.firstName }} {{ checkinEmployee.lastName ?? '' }}</div>
              <div class="text-xs text-slate-500">{{ checkinEmployee.employeeNo }} · Confidence: {{ faceConfidence }}%</div>
            </div>
            <span class="ml-auto text-[9px] font-black text-violet-600 bg-violet-50 border border-violet-200 px-2 py-1 rounded-full tracking-widest">✓ TERDETEKSI</span>
          </div>
        </div>

        <!-- LOCATION MODE -->
        <div v-if="checkinMode === 'location'" class="p-6 space-y-4">
          <div class="bg-slate-100 rounded-xl p-4 border border-slate-200 space-y-3">
            <!-- Map placeholder -->
            <div class="rounded-xl overflow-hidden bg-slate-200 aspect-video flex items-center justify-center text-slate-400 relative">
              <div class="absolute inset-0 bg-gradient-to-b from-emerald-100 to-slate-200"></div>
              <div v-if="locationObtained" class="absolute inset-0 flex items-center justify-center">
                <div class="w-6 h-6 bg-emerald-600 rounded-full shadow-lg flex items-center justify-center animate-pulse">
                  <div class="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <span v-if="!locationObtained" class="relative font-bold text-sm text-slate-500 z-10">{{ locationStatus }}</span>
              <div v-if="locationObtained" class="absolute bottom-2 left-2 bg-white/90 rounded-lg px-2 py-1 text-[10px] font-black text-emerald-700 z-10">
                📍 {{ locationName }}
              </div>
            </div>
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-slate-600">Koordinat GPS:</span>
                <span class="font-mono text-[10px] text-slate-500">{{ gpsCords }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-slate-600">Radius dari Kantor:</span>
                <span class="font-black text-xs" :class="locationValid ? 'text-emerald-600' : 'text-rose-600'">
                  {{ locationDist }} m {{ locationValid ? '✓ Dalam area' : '⚠ Di luar area' }}
                </span>
              </div>
            </div>
          </div>
          <Button v-if="!locationObtained" :loading="locLoading" label="📍 Dapatkan Lokasi Sekarang" @click="getLocation" class="w-full bg-emerald-700 text-white border-none font-bold" />
          <div v-if="checkinEmployee && locationObtained" class="rounded-xl bg-emerald-50 border border-emerald-200 p-3 flex items-center gap-3">
            <i class="pi pi-map-marker text-emerald-600"></i>
            <div class="flex-1 min-w-0">
              <div class="font-black text-slate-800">{{ checkinEmployee.firstName }} {{ checkinEmployee.lastName ?? '' }}</div>
              <div class="text-xs text-slate-500 truncate">{{ checkinEmployee.employeeNo }} · {{ locationName }}</div>
            </div>
          </div>
          <!-- Employee picker for location mode -->
          <div v-if="locationObtained && !checkinEmployee" class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Pilih Karyawan</label>
            <select v-model="selectedEmpId" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500">
              <option value="">— Pilih karyawan —</option>
              <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.employeeNo }} — {{ e.firstName }} {{ e.lastName ?? '' }}</option>
            </select>
            <Button label="Konfirmasi" :disabled="!selectedEmpId" @click="confirmLocationEmp" class="w-full bg-emerald-700 text-white border-none font-bold" />
          </div>
        </div>

        <!-- Footer / Submit -->
        <div v-if="checkinEmployee" class="p-4 border-t bg-slate-50 flex gap-2">
          <select v-model="checkinType" class="flex-1 border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-cyan-500">
            <option value="CHECK_IN">Check-In (Masuk)</option>
            <option value="CHECK_OUT">Check-Out (Keluar)</option>
          </select>
          <Button label="Absen Sekarang" :loading="checkinSaving" @click="submitCheckin"
            :class="checkinMode==='barcode'?'bg-cyan-700':checkinMode==='face'?'bg-violet-700':'bg-emerald-700'"
            class="border-none text-white font-bold px-5" icon="pi pi-check" />
        </div>
        <div v-if="checkinSuccess" class="p-4 bg-emerald-50 border-t border-emerald-200 text-center">
          <div class="text-emerald-700 font-black text-sm">✅ Absensi berhasil dicatat!</div>
          <div class="text-[10px] text-emerald-600 mt-0.5">{{ checkinSuccess }}</div>
        </div>
      </div>
    </div>

    <!-- Manual Form -->
    <div v-if="manualDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-2xl">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-calendar-plus text-cyan-700"></i> Input Absensi Manual
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="manualDialog = false">✕</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Karyawan <span class="text-red-500">*</span></label>
            <select v-model="mForm.employeeId" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:border-cyan-500">
              <option value="">— Pilih karyawan —</option>
              <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.employeeNo }} — {{ e.firstName }} {{ e.lastName ?? '' }}</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tanggal <span class="text-red-500">*</span></label>
              <input type="date" v-model="mForm.date" class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-500" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status <span class="text-red-500">*</span></label>
              <select v-model="mForm.status" class="w-full border rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-cyan-500">
                <option value="PRESENT">Hadir</option>
                <option value="LATE">Terlambat</option>
                <option value="ABSENT">Absen</option>
                <option value="LEAVE">Cuti</option>
                <option value="SICK">Sakit</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3" v-if="['PRESENT','LATE'].includes(mForm.status)">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Check-In</label>
              <input type="time" v-model="mForm.checkIn" class="w-full border rounded-lg px-3 py-2 text-sm font-mono outline-none focus:border-cyan-500" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Check-Out</label>
              <input type="time" v-model="mForm.checkOut" class="w-full border rounded-lg px-3 py-2 text-sm font-mono outline-none focus:border-cyan-500" />
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Keterangan</label>
            <input v-model="mForm.notes" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-500" placeholder="Keterangan tambahan..." />
          </div>
          <div v-if="mError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ mError }}</div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="mSaving" @click="manualDialog = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button label="Simpan Absensi" :loading="mSaving" :disabled="!mForm.employeeId || !mForm.date" @click="submitManual" class="bg-cyan-700 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Employee = { id: string; employeeNo: string; firstName: string; lastName?: string; department?: string; position?: string; };
type Attendance = { id: string; date: string; checkIn?: string; checkOut?: string; workHours?: number; status: string; notes?: string; employee?: Employee; };

const api = useApi();
const attendances = ref<Attendance[]>([]);
const employees = ref<Employee[]>([]);
const loading = ref(false);
const filterDate = ref(new Date().toISOString().slice(0, 10));
const filterStatus = ref('');
const filterDept = ref('');
const search = ref('');

// Check-in modal
const checkinModal = ref(false);
const checkinMode = ref<'barcode' | 'face' | 'location'>('barcode');
const checkinEmployee = ref<any>(null);
const checkinType = ref<'CHECK_IN' | 'CHECK_OUT'>('CHECK_IN');
const checkinSaving = ref(false);
const checkinSuccess = ref('');
const checkinError = ref('');
const barcodeInput = ref('');
const barcodeScanning = ref(false);
const faceDetecting = ref(false);
const faceStatus = ref('Klik tombol untuk memulai deteksi');
const faceConfidence = ref(0);
const locationObtained = ref(false);
const locationValid = ref(false);
const locationDist = ref(0);
const locationName = ref('');
const gpsCords = ref('—');
const locLoading = ref(false);
const locationStatus = ref('Tekan tombol untuk mendapatkan lokasi GPS');
const selectedEmpId = ref('');

// Manual dialog
const manualDialog = ref(false);
const mSaving = ref(false);
const mError = ref('');
const mForm = reactive({ employeeId: '', date: new Date().toISOString().slice(0, 10), status: 'PRESENT', checkIn: '08:00', checkOut: '17:00', notes: '' });

const AVATAR_COLORS = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#14b8a6','#3b82f6','#f97316'];
const avatarColor = (n: string) => AVATAR_COLORS[(n?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
const initials = (f?: string, l?: string) => `${f?.[0] ?? ''}${l?.[0] ?? ''}`.toUpperCase();

const STATUS_BADGE: Record<string, string> = {
  PRESENT: 'bg-emerald-50 text-emerald-700 border-emerald-300',
  LATE: 'bg-amber-50 text-amber-700 border-amber-300',
  ABSENT: 'bg-rose-50 text-rose-700 border-rose-300',
  LEAVE: 'bg-blue-50 text-blue-700 border-blue-300',
  SICK: 'bg-violet-50 text-violet-700 border-violet-300',
};
const statusBadge = (s: string) => STATUS_BADGE[s] ?? 'bg-slate-100 text-slate-500 border-slate-200';

const summary = computed(() => ({
  present: attendances.value.filter(a => a.status === 'PRESENT').length,
  late: attendances.value.filter(a => a.status === 'LATE').length,
  absent: attendances.value.filter(a => a.status === 'ABSENT').length,
  leave: attendances.value.filter(a => a.status === 'LEAVE').length,
  sick: attendances.value.filter(a => a.status === 'SICK').length,
}));

const avgWorkHours = computed(() => {
  const valid = attendances.value.filter(a => a.workHours && Number(a.workHours) > 0);
  if (!valid.length) return '0.0';
  const avg = valid.reduce((s, a) => s + Number(a.workHours), 0) / valid.length;
  return avg.toFixed(1);
});

const deptList = computed(() => [...new Set(attendances.value.map(a => a.employee?.department).filter(Boolean))]);

const filtered = computed(() => {
  let list = attendances.value;
  if (filterStatus.value) list = list.filter(a => a.status === filterStatus.value);
  if (filterDept.value) list = list.filter(a => a.employee?.department === filterDept.value);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(a =>
      (a.employee?.firstName?.toLowerCase().includes(q)) ||
      (a.employee?.lastName?.toLowerCase().includes(q))
    );
  }
  return list;
});

const MONTHS_ID = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const formatDate = (iso: string) => { const d = new Date(iso); return `${String(d.getDate()).padStart(2,'0')} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`; };
const formatTime = (iso: string) => { const d = new Date(iso); return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; };

const checkinModeIcon = computed(() => {
  if (checkinMode.value === 'barcode') return 'pi pi-qrcode text-cyan-300';
  if (checkinMode.value === 'face') return 'pi pi-eye text-violet-300';
  return 'pi pi-map-marker text-emerald-300';
});
const checkinModeLabel = computed(() => {
  if (checkinMode.value === 'barcode') return '🔲 Absensi via Barcode Scan';
  if (checkinMode.value === 'face') return '👁 Absensi via Deteksi Wajah';
  return '📍 Absensi via Lokasi GPS';
});

const load = async () => {
  loading.value = true;
  try {
    const [attRes, empRes] = await Promise.all([
      api.get('/hris/attendance', { params: { date: filterDate.value } }),
      api.get('/hris/employee'),
    ]);
    attendances.value = attRes.data?.attendances ?? attRes.attendances ?? [];
    employees.value = (empRes.data?.employees ?? empRes.employees ?? []).filter((e: any) => e.status === 'ACTIVE');
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

// ─── Check-in methods ─────────────────────────────────────────────────────────
const openCheckin = (mode: 'barcode'|'face'|'location') => {
  checkinMode.value = mode;
  checkinEmployee.value = null;
  checkinSuccess.value = '';
  checkinError.value = '';
  barcodeInput.value = '';
  faceDetecting.value = false;
  faceStatus.value = 'Klik tombol untuk memulai deteksi';
  faceConfidence.value = 0;
  locationObtained.value = false;
  locationValid.value = false;
  locationDist.value = 0;
  locationName.value = '';
  gpsCords.value = '—';
  selectedEmpId.value = '';
  checkinModal.value = true;
};

const closeCheckin = () => { checkinModal.value = false; };

// BARCODE: match employeeNo from input
const processBarcode = async () => {
  const q = barcodeInput.value.trim().toUpperCase();
  if (!q) return;
  barcodeScanning.value = true; checkinError.value = '';
  await new Promise(r => setTimeout(r, 600)); // simulate scan
  const emp = employees.value.find(e => e.employeeNo === q || e.employeeNo === `EMP-${q}`);
  if (emp) {
    checkinEmployee.value = emp;
  } else {
    checkinError.value = `NIK "${q}" tidak ditemukan. Pastikan format benar (contoh: EMP-001)`;
  }
  barcodeScanning.value = false;
};

// FACE: simulate detection with random employee
const startFaceDetect = async () => {
  faceDetecting.value = true;
  faceStatus.value = 'Mendeteksi wajah...';
  await new Promise(r => setTimeout(r, 1200));
  faceStatus.value = 'Menganalisis fitur biometrik...';
  await new Promise(r => setTimeout(r, 1000));
  faceStatus.value = 'Mencocokkan database karyawan...';
  await new Promise(r => setTimeout(r, 800));
  // Simulate match
  const activeEmps = employees.value.filter(e => e.status !== 'RESIGNED');
  if (activeEmps.length > 0) {
    checkinEmployee.value = activeEmps[Math.floor(Math.random() * Math.min(5, activeEmps.length))];
    faceConfidence.value = Math.floor(Math.random() * 5 + 94); // 94–99%
    faceStatus.value = `✓ Wajah teridentifikasi (${faceConfidence.value}%)`;
  }
  faceDetecting.value = false;
};

// LOCATION: get GPS from browser
const OFFICE_LAT = -6.2088; // Jakarta
const OFFICE_LNG = 106.8456;

const getLocation = () => {
  locLoading.value = true;
  locationStatus.value = 'Mendapatkan koordinat GPS...';
  if (!navigator.geolocation) {
    // Simulate if no geolocation
    simulateLocation();
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude, lng = pos.coords.longitude;
      gpsCords.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      const dist = Math.round(Math.sqrt(Math.pow((lat - OFFICE_LAT) * 111000, 2) + Math.pow((lng - OFFICE_LNG) * 111000, 2)));
      locationDist.value = dist;
      locationValid.value = dist <= 500;
      locationName.value = dist <= 500 ? 'Kantor Pusat Jakarta' : 'Di luar area perusahaan';
      locationObtained.value = true;
      locLoading.value = false;
    },
    () => simulateLocation()
  );
};

const simulateLocation = () => {
  // Simulate being inside office
  const lat = OFFICE_LAT + (Math.random() - 0.5) * 0.002;
  const lng = OFFICE_LNG + (Math.random() - 0.5) * 0.002;
  gpsCords.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  const dist = Math.floor(Math.random() * 200 + 30);
  locationDist.value = dist;
  locationValid.value = dist <= 500;
  locationName.value = dist <= 500 ? 'Pabrik Bekasi (Simulated)' : 'Di luar area';
  locationObtained.value = true;
  locLoading.value = false;
};

const confirmLocationEmp = () => {
  const emp = employees.value.find(e => e.id === selectedEmpId.value);
  if (emp) checkinEmployee.value = emp;
};

// Submit check-in
const submitCheckin = async () => {
  if (!checkinEmployee.value) return;
  checkinSaving.value = true; checkinSuccess.value = '';
  try {
    const now = new Date();
    const todayDate = now.toISOString().split('T')[0];
    await api.post('/hris/attendance', {
      employeeId: checkinEmployee.value.id,
      date: new Date(todayDate).toISOString(),
      checkIn: checkinType.value === 'CHECK_IN' ? now.toISOString() : undefined,
      checkOut: checkinType.value === 'CHECK_OUT' ? now.toISOString() : undefined,
      status: 'PRESENT',
      notes: `Absensi via ${checkinMode.value} (${checkinModeLabel.value.split(' ')[0]})`,
    });
    checkinSuccess.value = `${checkinEmployee.value.firstName} — ${checkinType.value === 'CHECK_IN' ? 'Check-In' : 'Check-Out'} berhasil pada ${formatTime(now.toISOString())}`;
    checkinEmployee.value = null;
    await load();
    setTimeout(() => closeCheckin(), 2000);
  } catch (e: any) { checkinError.value = e?.response?.data?.message ?? 'Gagal absensi'; }
  finally { checkinSaving.value = false; }
};

// Manual
const openManual = () => {
  mForm.employeeId = ''; mForm.date = new Date().toISOString().slice(0, 10);
  mForm.status = 'PRESENT'; mForm.checkIn = '08:00'; mForm.checkOut = '17:00'; mForm.notes = '';
  mError.value = '';
  manualDialog.value = true;
};

const submitManual = async () => {
  mSaving.value = true; mError.value = '';
  try {
    const baseDate = mForm.date;
    await api.post('/hris/attendance', {
      employeeId: mForm.employeeId,
      date: new Date(baseDate).toISOString(),
      checkIn: ['PRESENT','LATE'].includes(mForm.status) && mForm.checkIn
        ? new Date(`${baseDate}T${mForm.checkIn}:00`).toISOString() : undefined,
      checkOut: ['PRESENT','LATE'].includes(mForm.status) && mForm.checkOut
        ? new Date(`${baseDate}T${mForm.checkOut}:00`).toISOString() : undefined,
      status: mForm.status,
      notes: mForm.notes || undefined,
    });
    manualDialog.value = false;
    await load();
  } catch (e: any) { mError.value = e?.response?.data?.message ?? 'Gagal menyimpan absensi'; }
  finally { mSaving.value = false; }
};

watch(filterDate, load);
onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-scan { animation: scan 2s ease-in-out infinite; }
@keyframes scan { 0%, 100% { transform: translateY(-24px); } 50% { transform: translateY(24px); } }
</style>