import {mkdir,copyFile,rm} from 'node:fs/promises';
// Explicit publish allowlist. Never copy an entire working directory or assets tree.
export const publicFiles=['index.html','style.css','public.js','core.js','map.js','data.js','sw.js','manifest.webmanifest','assets/world.json','assets/budapest.jpg','assets/favicon.svg','assets/icon-180.png','assets/icon-192.png','assets/icon-512.png'];
await rm('dist',{recursive:true,force:true});await mkdir('dist/assets',{recursive:true});
for(const file of publicFiles)await copyFile(file,'dist/'+file);
await copyFile('.nojekyll','dist/.nojekyll');
console.log('Public-only static guide built in dist/');
