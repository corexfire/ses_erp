const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../frontend/app/pages/construction/hse.vue');
let content = fs.readFileSync(filePath, 'utf8');

// Fix InputText to InputNumber
const oldInput = '<InputText type="number" v-model="form.score" class="w-full h-14 border-none rounded-2xl px-6 text-[18px] font-black text-emerald-600 bg-slate-100 shadow-inner outline-none text-center font-mono" placeholder="0-100" />';
const newInput = '<InputNumber v-model="form.score" :min="0" :max="100" :minFractionDigits="1" class="w-full" inputClass="w-full h-14 border-none rounded-2xl px-6 text-[18px] font-black text-emerald-600 bg-slate-100 shadow-inner outline-none text-center font-mono" placeholder="0-100" />';

if (content.includes(oldInput)) {
    content = content.replace(oldInput, newInput);
    // Also adjust the % span next to it
    content = content.replace('right-4 top-1/2 -translate-y-1/2 font-black text-emerald-300">%</span>', 'right-12 top-1/2 -translate-y-1/2 font-black text-emerald-300 pointer-events-none">%</span>');
    fs.writeFileSync(filePath, content);
    console.log('Successfully updated InputText to InputNumber and adjusted span.');
} else {
    console.error('Target InputText not found!');
    process.exit(1);
}
