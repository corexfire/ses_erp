const path = require('path');
const wasmBase64Path = path.resolve(__dirname, '../prisma/generated/query_compiler_fast_bg.wasm-base64.js');
console.log('Loading wasm-base64 from:', wasmBase64Path);
try {
    const wasmModule = require(wasmBase64Path);
    console.log('Keys in wasmModule:', Object.keys(wasmModule));
    console.log('typeof wasm:', typeof wasmModule.wasm);
    if (wasmModule.wasm) {
        console.log('wasm length:', wasmModule.wasm.length);
    } else {
        console.log('wasm is UNDEFINED');
        // Check if there's a default export
        if (wasmModule.default) {
            console.log('Default export keys:', Object.keys(wasmModule.default));
            console.log('typeof wasmModule.default.wasm:', typeof wasmModule.default.wasm);
        }
    }
} catch (e) {
    console.error('Error loading module:', e.message);
}
