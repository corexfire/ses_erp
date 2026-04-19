import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export default defineNuxtPlugin((nuxtApp) => {
  const ResolutionSwal = Swal.mixin({
    customClass: {
      confirmButton: 'px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 outline-none focus:ring-4 focus:ring-slate-100 mx-2',
      cancelButton: 'px-6 py-3 bg-white text-slate-400 border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all mx-2',
      popup: 'rounded-[2.5rem] border border-slate-100 shadow-2xl p-8',
      title: 'text-2xl font-black text-slate-800 uppercase tracking-tight italic font-outfit',
      htmlContainer: 'text-sm font-medium text-slate-500 italic mt-4 px-4',
    },
    buttonsStyling: false,
  })

  // Toasts
  const ResolutionToast = ResolutionSwal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    customClass: {
      popup: 'rounded-2xl border-l-8 border-emerald-500 shadow-2xl p-6 bg-white flex items-center gap-4',
      title: 'text-[13px] font-black text-slate-900 uppercase tracking-tight italic',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  return {
    provide: {
      swal: ResolutionSwal,
      toast: ResolutionToast
    }
  }
})
