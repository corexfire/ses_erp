const mod = require('../prisma/generated/query_compiler_fast_bg.wasm-base64.js');
console.log('Module keys:', Object.keys(mod));
console.log('Wasm type:', typeof mod.wasm);
if (mod.wasm) {
  console.log('Wasm length:', mod.wasm.length);
} else {
  console.log('Wasm is UNDEFINED');
}
