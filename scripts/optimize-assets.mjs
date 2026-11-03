import fs from 'node:fs/promises';
import path from 'node:path';
import {dependency} from './runtime.mjs';
const sharp=dependency('sharp');
const root=path.resolve(import.meta.dirname,'..');
const [landscape,lineup,agent]=process.argv.slice(2);
if(!landscape||!lineup)throw new Error('Usage: node scripts/optimize-assets.mjs <landscape.png> <lineup.png> [agent.png]');
await sharp(landscape).resize({width:1920,withoutEnlargement:true}).webp({quality:85}).toFile(path.join(root,'assets','limbo.webp'));
const meta=await sharp(lineup).metadata();
const width=Math.floor(meta.width/4);
for(const [i,name] of ['about','mouse','farm','cloud'].entries()){
 if(i===2&&agent){await sharp(agent).trim().resize({height:640}).webp({quality:90}).toFile(path.join(root,'assets',`avatar-${name}.webp`));continue;}
 const crop=await sharp(lineup).extract({left:i*width,top:0,width,height:meta.height}).toBuffer();
 await sharp(crop).trim().resize({height:640}).webp({quality:90}).toFile(path.join(root,'assets',`avatar-${name}.webp`));
}
for(const file of await fs.readdir(path.join(root,'assets','badges'))){if(!file.endsWith('.png'))continue;const location=path.join(root,'assets','badges',file);const bytes=await sharp(location).trim().resize({width:260,height:260,fit:'inside',withoutEnlargement:true}).png({compressionLevel:9}).toBuffer();await fs.writeFile(location,bytes);}
console.log('Optimized landscape, four avatars, and local badges.');
