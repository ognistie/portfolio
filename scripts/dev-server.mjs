import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.pdf':'application/pdf','.json':'application/json'};
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const pathname=decodeURIComponent(url.pathname);const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));const relative=path.relative(root,file);if(relative.startsWith('..')||path.isAbsolute(relative)||relative.split(path.sep).some(s=>s.startsWith('.'))){res.writeHead(403);res.end('Forbidden');return;}const bytes=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes);}catch{res.writeHead(404);res.end('Not found');}}).listen(port,'127.0.0.1',()=>console.log(`Portfolio: http://127.0.0.1:${port}`));
