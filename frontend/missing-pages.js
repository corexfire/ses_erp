const fs = require("fs");
const path = require("path");
const content = fs.readFileSync("app/config/menu.ts", "utf-8");
const matches = [...content.matchAll(/path:\s*'(.*?)'/g)].map(m => m[1]);
const missing = [];
for (const p of matches) {
  const relPath = p.replace(/^\//, ''); // remove leading slash
  if (!relPath) continue;
  const fp = path.join("app/pages", relPath + ".vue");
  const fpIdx = path.join("app/pages", relPath, "index.vue");
  if (!fs.existsSync(fp) && !fs.existsSync(fpIdx)) {
    missing.push(p);
  }
}
console.log("Missing pages:", missing);
