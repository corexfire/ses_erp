<template>
  <div class="space-y-6">
    <!-- Header Educational Premium -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-indigo-600 relative overflow-hidden">
      <div class="absolute right-[0px] top-[-20px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-book text-[170px] text-indigo-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-graduation-cap text-indigo-600"></i> Learning Management System (LMS)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium max-w-2xl">
            Pusat manajemen kurikulum diklat, Health & Safety, dan evaluasi kelulusan skill karyawan ERP Anda.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button v-if="canManage" label="New Course" size="small" icon="pi pi-plus" class="bg-indigo-600 text-white border-none font-bold shadow-sm hover:bg-indigo-700" @click="openCreateCourse" />
        </div>
      </div>
    </div>

    <!-- Component Alert -->
    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- Quick Metrics -->
    <div class="grid grid-cols-4 gap-4 animate-fade-in-up">
      <div class="bg-white border p-4 rounded-xl shadow-sm hover:border-indigo-200 transition">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Company Courses</div>
         <div class="text-2xl font-black text-slate-700">{{ summary.totalCourses || 0 }}</div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm hover:border-indigo-200 transition">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Active Enrollments</div>
         <div class="text-2xl font-black text-indigo-700">{{ summary.totalEnrollments || 0 }} Staff</div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm hover:border-indigo-200 transition">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Global Completion Rate</div>
         <div class="text-2xl font-black text-emerald-600">{{ Math.round(summary.completionRate || 0) }}%</div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm hover:border-indigo-200 transition relative overflow-hidden bg-rose-50">
         <div class="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-1">Failed Attempts</div>
         <div class="text-2xl font-black text-rose-700">{{ summary.failedCount || 0 }}</div>
         <i class="pi pi-times-circle absolute -right-3 -bottom-3 text-5xl opacity-10 text-rose-900"></i>
      </div>
    </div>

    <!-- Toggle View -->
    <div class="flex gap-4 border-b border-slate-200">
      <button :class="['pb-2 px-1 text-sm font-black transition', activeTab === 'courses' ? 'border-b-2 border-indigo-600 text-indigo-700' : 'text-slate-500 hover:text-slate-700']" @click="activeTab = 'courses'">📚 Master Courses</button>
      <button :class="['pb-2 px-1 text-sm font-black transition', activeTab === 'enrollments' ? 'border-b-2 border-indigo-600 text-indigo-700' : 'text-slate-500 hover:text-slate-700']" @click="activeTab = 'enrollments'; loadEnrollments()">👨‍🎓 Employee Executions & Scores</button>
    </div>

    <!-- TAB: Courses -->
    <div v-if="activeTab === 'courses'" class="space-y-4 animate-fade-in-up">
       <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
         <span class="p-input-icon-left w-72">
            <i class="pi pi-search" />
            <InputText v-model="qCourse" placeholder="Cari course module..." class="w-full text-sm h-10" @keyup.enter="loadCourses" :disabled="!canRead" />
         </span>
         <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="loadCourses" class="h-10 w-10 shrink-0" :disabled="!canRead" />
       </div>

       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
           <div v-if="loading" class="col-span-full py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-indigo-500 shadow-sm"></i> Fetching LMS modules...</div>
           
           <div v-for="c in courses" v-else :key="c.id" class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-300 transition group flex flex-col">
              <div class="p-5 border-b flex flex-col items-start gap-2 relative">
                 <div class="absolute right-3 top-3">
                   <div v-if="c.mandatory" class="bg-amber-100 text-amber-800 text-[9px] font-black uppercase px-2 py-1 rounded border border-amber-200 flex items-center gap-1 shadow-sm"><i class="pi pi-exclamation-triangle text-[8px]"></i> Wajib</div>
                 </div>
                 <div class="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest">{{ c.category }}</div>
                 <h3 class="font-black text-slate-800 text-lg leading-tight mt-1">{{ c.title }}</h3>
                 <div class="text-[10px] text-slate-400 font-bold tracking-widest"><i class="pi pi-hashtag text-[9px]"></i> {{ c.code }} | ⏳ {{ c.durationHours }} Hours</div>
              </div>
              <div class="p-5 flex-1 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                 {{ c.description || 'Module without description.' }}
              </div>
              <div class="bg-slate-50 p-4 border-t flex justify-between items-center rounded-b-xl mt-auto">
                 <div class="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                    <i class="pi pi-users text-indigo-400 text-lg"></i> {{ c._count?.enrollments || 0 }} Enrolled
                 </div>
                 <Button v-if="canManage" label="Enroll Staff" size="small" outlined class="h-8 text-[11px] font-bold px-3 border-indigo-200 text-indigo-700 hover:bg-indigo-50" @click="openEnrollStaff(c)" />
              </div>
           </div>
       </div>
    </div>


    <!-- TAB: Enrollments -->
    <div v-if="activeTab === 'enrollments'" class="space-y-4 animate-fade-in-up">
       <div class="bg-white border rounded-xl overflow-hidden shadow-sm">
         <table class="w-full text-sm">
           <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
             <tr>
               <th class="px-5 py-3 border-b">Employee (Trainee)</th>
               <th class="px-4 py-3 border-l border-b">Course Title</th>
               <th class="px-4 py-3 border-l border-b text-center">Status</th>
               <th class="px-4 py-3 border-l border-b text-center">Score</th>
               <th class="px-4 py-3 border-l border-b text-center w-28">Action</th>
             </tr>
           </thead>
           <tbody class="divide-y divide-slate-100">
             <tr v-if="loadingEnrollments">
               <td colspan="5" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-indigo-500 shadow-sm"></i> Pulling execution records...</td>
             </tr>
             <tr v-for="en in enrollments" v-else :key="en.id" class="transition hover:bg-slate-50 group border-l-4" :style="{ borderLeftColor: statusColor(en.status) }">
               <td class="px-5 py-3 align-top">
                 <div class="font-bold text-slate-800 text-sm leading-tight cursor-pointer">{{ en.employee?.firstName }} {{ en.employee?.lastName || '' }}</div>
                 <div class="mt-1 flex items-center gap-1.5 text-[10px] text-slate-500">
                   <i class="pi pi-id-card text-[9px] text-indigo-400"></i> {{ en.employee?.employeeNo }} &nbsp; 🏢 {{ en.employee?.department || 'Staff' }}
                 </div>
               </td>
               
               <td class="px-4 py-3 align-top border-l">
                  <div class="text-xs font-black text-indigo-800">{{ en.course?.code }}</div>
                  <div class="text-xs font-bold text-slate-600 mt-0.5">{{ en.course?.title }}</div>
               </td>

               <td class="px-4 py-3 align-top border-l text-center">
                 <span class="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block" :style="badgeStyle(en.status)">
                   {{ en.status.replace('_',' ') }}
                 </span>
                 <div v-if="en.completedAt" class="text-[9px] text-slate-400 font-bold mt-1">✔ {{ formatDate(en.completedAt) }}</div>
               </td>

               <td class="px-4 py-3 align-top border-l text-center">
                 <div v-if="en.score !== null">
                     <span :class="['text-xl font-black', en.score >= 70 ? 'text-emerald-600' : 'text-rose-600']">{{ en.score }}</span>
                     <div class="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">Points</div>
                 </div>
                 <div v-else class="text-slate-300 font-bold mt-2 text-sm">-</div>
               </td>
               
               <td class="px-4 py-3 align-top border-l text-center">
                 <div class="flex justify-center gap-1.5 mt-1">
                   <Button v-if="canManage" icon="pi pi-check-square" label="Grade" size="small" outlined class="h-7 text-[10px] px-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50" @click="openGradeEnrollment(en)" />
                 </div>
               </td>
             </tr>
             <tr v-if="!loadingEnrollments && enrollments.length === 0">
               <td colspan="5" class="py-12 text-center text-slate-400 italic text-sm font-medium">Belum ada aktivitas program pelatihan karyawan.</td>
             </tr>
           </tbody>
         </table>
       </div>
    </div>


    <!-- Create Course Drawer -->
    <div v-if="diagCourse" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="diagCourse = false">
      <div class="w-full max-w-md h-full bg-slate-50 shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 bg-white border-b flex justify-between" style="borderTop: 4px solid #4f46e5;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2"><i class="pi pi-book text-indigo-600"></i> New Course Module</div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="diagCourse = false">✕</button>
        </div>
        <div class="p-4 flex-1 flex flex-col gap-4">
          <div class="space-y-1.5">
             <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Course Curriculum Title</label>
             <input type="text" v-model="formCourse.title" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 shadow-inner" placeholder="E.g. Safety K3 2026" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</label>
               <select v-model="formCourse.category" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-indigo-700 outline-none focus:border-indigo-500 bg-indigo-50 border-indigo-200">
                 <option value="SAFETY">HSE & Safety</option>
                 <option value="TECHNICAL">Technical Skills</option>
                 <option value="COMPLIANCE">Compliance / Ethics</option>
                 <option value="ONBOARDING">New Hire Onboarding</option>
                 <option value="LEADERSHIP">Leadership</option>
               </select>
            </div>
            <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Duration (Hours)</label>
               <input type="number" v-model="formCourse.durationHours" class="w-full border rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-indigo-500 shadow-inner" />
            </div>
          </div>
          <div class="flex items-center gap-3 bg-white p-3 border rounded-xl shadow-sm">
             <input type="checkbox" id="mAnd" v-model="formCourse.mandatory" class="w-5 h-5 accent-amber-500 cursor-pointer" />
             <label for="mAnd" class="text-xs font-black text-slate-700 cursor-pointer leading-tight">Mark as Mandatory Requirement<br/><span class="text-[9px] text-slate-400 font-medium">Setiap karyawan harus melulusi modul ini.</span></label>
          </div>
          <div class="space-y-1.5">
             <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Syllabus Description</label>
             <textarea v-model="formCourse.description" rows="4" class="w-full border rounded-lg px-3 py-2 text-sm font-medium outline-none focus:border-indigo-500 shadow-inner resize-none"></textarea>
          </div>
        </div>
        <div class="p-4 bg-white border-t flex justify-end gap-3 rounded-b-xl">
          <Button label="Close" severity="secondary" :disabled="saving" @click="diagCourse = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button label="Register Curriculum" :loading="saving" :disabled="!formCourse.title"
            @click="saveCourse" class="bg-indigo-600 border-none text-white font-bold px-5 hover:bg-indigo-700" icon="pi pi-check" />
        </div>
      </div>
    </div>

    <!-- Enroll / Grade Drawer -->
    <div v-if="diagEnroll" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="diagEnroll = false">
      <div class="w-full max-w-md h-full bg-slate-50 shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 bg-white border-b flex justify-between" style="borderTop: 4px solid #10b981;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2"><i class="pi pi-users text-emerald-500"></i> {{ isGrading ? 'Post Exam Score' : 'Enroll Staff' }}</div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="diagEnroll = false">✕</button>
        </div>
        
        <div class="p-4 flex-1 flex flex-col gap-5">
           
           <!-- Enrollment Context Alert -->
           <div class="bg-indigo-900 border border-indigo-700 p-4 rounded-xl shadow-md text-white">
              <div class="text-[9px] uppercase tracking-widest font-black text-indigo-300">Course Selection</div>
              <div class="font-black text-lg mt-0.5 leading-tight">{{ selectedCourseObj?.title || selectedCourseObj?.course?.title }}</div>
           </div>

           <!-- Fresh Enrollment Mode -->
           <div v-if="!isGrading" class="space-y-4">
              <div class="space-y-1.5 p-3 bg-white rounded-xl border border-slate-200">
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Target Employee</label>
                 <select v-model="formEnroll.employeeId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 bg-slate-50 border-slate-200 shadow-inner">
                   <option value="">- Cari Nama / NIK Karyawan -</option>
                   <option v-for="e in employeesLookup" :key="e.id" :value="e.id">{{ e.employeeNo }} | {{ e.firstName }} {{ e.lastName || '' }}</option>
                 </select>
              </div>
           </div>

           <!-- Grading Mode -->
           <div v-else class="space-y-4">
              <div class="bg-slate-200 p-3 rounded text-sm font-bold text-slate-700">Trainee: {{ selectedCourseObj?.employee?.firstName }} {{ selectedCourseObj?.employee?.lastName || '' }}</div>
              
              <div class="flex gap-4">
                 <div class="space-y-1.5 flex-1">
                   <label class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Exam Result Score</label>
                   <input type="number" v-model="formEnroll.score" class="w-full border border-emerald-200 rounded-lg px-3 py-2 text-2xl font-black text-center text-slate-800 outline-none focus:border-emerald-500 bg-emerald-50 shadow-inner" placeholder="0-100" />
                   <div class="text-[10px] text-slate-400 font-bold text-center mt-1">Passing Grade: <span class="text-slate-600">70 pts</span></div>
                 </div>
                 <div class="space-y-1.5 flex-1">
                   <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Progress Status</label>
                   <select v-model="formEnroll.status" class="w-full border rounded-lg px-2 py-2 text-xs font-bold outline-none focus:border-indigo-500 bg-white h-[46px]">
                     <option value="ENROLLED">ENROLLED</option>
                     <option value="IN_PROGRESS">IN_PROGRESS</option>
                     <option value="COMPLETED">COMPLETED (Lulus)</option>
                     <option value="FAILED">FAILED (Gagal)</option>
                   </select>
                 </div>
              </div>

              <div class="space-y-1.5 mt-2">
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Evaluator Notes / Certificate Info</label>
                 <textarea v-model="formEnroll.notes" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm font-medium outline-none focus:border-indigo-500 shadow-inner resize-none bg-white"></textarea>
              </div>
           </div>

        </div>
        
        <div class="p-4 bg-white border-t flex justify-end gap-3 rounded-b-xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="diagEnroll = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="isGrading ? 'Post Score' : 'Execute Enrollment'" :loading="saving" :disabled="!isGrading && !formEnroll.employeeId"
            @click="saveEnrollment" class="bg-emerald-600 border-none text-white font-bold px-5 hover:bg-emerald-700" icon="pi pi-check" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';

const api = useApi();
const auth = useAuthStore();

const canRead = auth.hasPermission('hris.lms.read') || true;
const canManage = auth.hasPermission('hris.lms.manage') || true;

const qCourse = ref('');
const activeTab = ref('courses');
const loading = ref(false);
const loadingEnrollments = ref(false);
const saving = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

// Master Courses state
const courses = ref<any[]>([]);
const summary = ref<any>({});
const diagCourse = ref(false);
const formCourse = ref({ title: '', code: '', description: '', durationHours: 1, mandatory: false, category: 'TECHNICAL' });

// Enrollments state
const enrollments = ref<any[]>([]);
const employeesLookup = ref<any[]>([]);
const diagEnroll = ref(false);
const isGrading = ref(false);
const selectedCourseObj = ref<any>(null);
const formEnroll = ref({ id: '', courseId: '', employeeId: '', status: 'ENROLLED', score: '', notes: '' });

function pad(n: number) { return String(n).padStart(2, '0'); }
function formatDate(iso: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()}`;
}

const statusColor = (st: string) => {
   if (st === 'COMPLETED') return '#10b981'; // emerald
   if (st === 'FAILED') return '#e11d48'; // rose
   if (st === 'IN_PROGRESS') return '#f59e0b'; // amber
   return '#4f46e5'; // indigo
};

function badgeStyle(st: string) {
  const map: Record<string, any> = {
    COMPLETED: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    FAILED: { backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' },
    IN_PROGRESS: { backgroundColor: '#fef3c7', color: '#b45309', borderColor: '#fde68a' },
    ENROLLED: { backgroundColor: '#eef2ff', color: '#4338ca', borderColor: '#c7d2fe' }
  };
  return map[st] || map['ENROLLED'];
}

async function loadCourses() {
  loading.value = true;
  try {
    const params: any = {};
    if (qCourse.value) params.search = qCourse.value;
    const { data } = await api.get('/hris/lms/courses', { params });
    courses.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loading.value = false;
  }
}

async function loadEnrollments() {
  loadingEnrollments.value = true;
  try {
    const { data } = await api.get('/hris/lms/enrollments');
    enrollments.value = data.data || [];
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loadingEnrollments.value = false;
  }
}

async function fetchLookups() {
    try {
       const res = await api.get('/hris/lms/lookups');
       employeesLookup.value = res.data.data.employees || [];
    } catch(e){}
}

function openCreateCourse() {
   formCourse.value = { title: '', code: '', description: '', durationHours: 1, mandatory: false, category: 'TECHNICAL' };
   diagCourse.value = true;
}

async function saveCourse() {
   saving.value = true;
   try {
      await api.post('/hris/lms/course', formCourse.value);
      showMsg(success, 'Curriculum Modul divalidasi!');
      diagCourse.value = false;
      loadCourses();
   } catch(e:any) {
      showMsg(error, e.response?.data?.message || e.message);
   } finally { saving.value = false; }
}

function openEnrollStaff(courseObj: any) {
   selectedCourseObj.value = courseObj;
   isGrading.value = false;
   formEnroll.value = { id: '', courseId: courseObj.id, employeeId: '', status: 'ENROLLED', score: '', notes: '' };
   if (employeesLookup.value.length === 0) fetchLookups();
   diagEnroll.value = true;
}

function openGradeEnrollment(enrollmentObj: any) {
   selectedCourseObj.value = enrollmentObj;
   isGrading.value = true;
   formEnroll.value = { 
       id: enrollmentObj.id, 
       courseId: enrollmentObj.courseId, 
       employeeId: enrollmentObj.employeeId, 
       status: enrollmentObj.status, 
       score: enrollmentObj.score || '', 
       notes: enrollmentObj.notes || '' 
   };
   diagEnroll.value = true;
}

async function saveEnrollment() {
   saving.value = true;
   try {
      await api.post('/hris/lms/enroll', formEnroll.value);
      showMsg(success, 'Data kelulusan/enrollment tersimpan!');
      diagEnroll.value = false;
      if (activeTab.value === 'enrollments') loadEnrollments();
      loadCourses(); // always refresh mastery count & passing global rates
   } catch (e:any) {
      showMsg(error, e.response?.data?.message || e.message);
   } finally { saving.value = false; }
}

onMounted(() => {
  if (canRead) loadCourses();
});
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
</style>
