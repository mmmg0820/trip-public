import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,relative,isAbsolute} from 'node:path';
const root=resolve(process.cwd()),port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const path=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(relative(root,path).startsWith('..')||isAbsolute(relative(root,path))||pathname.includes('/.')||pathname.startsWith('/scripts/')||pathname.startsWith('/tests/')){res.writeHead(403);return res.end();}const body=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}}).listen(port,'127.0.0.1',()=>console.log(`Trip preview: http://127.0.0.1:${port}`));
