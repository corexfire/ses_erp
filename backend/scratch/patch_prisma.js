const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '../prisma/generated/index.js');
console.log('Patching Prisma client at:', indexPath);

if (!fs.existsSync(indexPath)) {
    console.error('File not found!');
    process.exit(1);
}

let content = fs.readFileSync(indexPath, 'utf8');

const target = `      getQueryCompilerWasmModule: async () => {
        const { Buffer } = require('node:buffer')
        const { wasm } = require('./query_compiler_fast_bg.wasm-base64.js')
        const queryCompilerWasmFileBytes = Buffer.from(wasm, 'base64')`;

const replacement = `      getQueryCompilerWasmModule: async () => {
        const { Buffer } = require('node:buffer')
        let wasm;
        try {
          const wasmModule = require('./query_compiler_fast_bg.wasm-base64.js')
          wasm = wasmModule.wasm
        } catch (e) {}
        
        if (!wasm) {
          try {
            const fs = require('node:fs')
            const path = require('node:path')
            const wasmPath = path.join(__dirname, 'query_compiler_fast_bg.wasm-base64.js')
            const content = fs.readFileSync(wasmPath, 'utf8')
            const match = content.match(/const wasm = "([^"]+)"/)
            if (match) {
              wasm = match[1]
            }
          } catch (e) {}
        }
        
        if (!wasm) {
           throw new Error('Prisma Query Compiler WASM module could not be loaded. This often happens in specific JS runtimes. Please check if ./query_compiler_fast_bg.wasm-base64.js exists in the generated directory.')
        }
        
        const queryCompilerWasmFileBytes = Buffer.from(wasm, 'base64')`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(indexPath, content);
    console.log('Successfully patched Prisma client!');
} else if (content.includes('let wasm;')) {
    console.log('Prisma client already patched.');
} else {
    console.error('Target content not found in index.js. Prisma internal structure might have changed.');
    process.exit(1);
}
