import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const file of ['index.html','style.css','app.js','core.js','lookup.js','map.js','data.js','sw.js','manifest.webmanifest'])await copyFile(file,'dist/'+file);
await cp('assets','dist/assets',{recursive:true});console.log('Static website built in dist/');
