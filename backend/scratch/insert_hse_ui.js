const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../frontend/app/pages/construction/hse.vue');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = 'Dokumen ini akan tercatat dalam log audit K3 tahunan perusahaan.</p>';
const insertionPoint = content.indexOf(targetStr);

if (insertionPoint === -1) {
    console.error('Target string not found!');
    process.exit(1);
}

const closingDivIndex = content.indexOf('</div>', insertionPoint);
if (closingDivIndex === -1) {
    console.error('Closing div not found!');
    process.exit(1);
}

const endOfDiv = closingDivIndex + 6; // length of </div>

const attachmentSection = `

                     <!-- Attachment Section -->
                     <div class="pt-8 border-t border-slate-100">
                        <div class="flex justify-between items-center mb-6">
                           <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Attachments & Evidence (DMS)</label>
                           <Button label="Add Evidence Link" icon="pi pi-plus" text size="small" class="text-[9px] font-black uppercase tracking-widest text-emerald-600" @click="addAttachment" />
                        </div>
                        
                        <div v-if="form.attachments?.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div v-for="(at, idx) in form.attachments" :key="idx" class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group">
                              <div class="flex items-center gap-3 overflow-hidden">
                                 <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400">
                                    <i :class="at.type?.includes('image') ? 'pi pi-image' : 'pi pi-file-pdf'"></i>
                                 </div>
                                 <div class="overflow-hidden">
                                    <div class="text-[10px] font-black text-slate-700 truncate text-left">{{ at.name }}</div>
                                    <a :href="at.url" target="_blank" class="text-[8px] font-bold text-emerald-600 truncate block hover:underline text-left">{{ at.url }}</a>
                                 </div>
                              </div>
                              <Button icon="pi pi-trash" text rounded severity="danger" class="opacity-0 group-hover:opacity-100 transition-all h-8 w-8" @click="removeAttachment(idx)" />
                           </div>
                        </div>
                        <div v-else class="py-12 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center">
                           <i class="pi pi-cloud-upload text-3xl text-slate-200 mb-2"></i>
                           <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest">No evidence attached. Audit score may be affected.</p>
                        </div>
                     </div>`;

if (content.includes('Attachment Section')) {
    console.log('Attachment section already exists.');
} else {
    content = content.slice(0, endOfDiv) + attachmentSection + content.slice(endOfDiv);
    fs.writeFileSync(filePath, content);
    console.log('Successfully inserted attachment section!');
}
