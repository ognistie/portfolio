import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const badgeDir = path.join(root, 'assets', 'badges');
await fs.mkdir(badgeDir, {recursive:true});
const assets = [
 ['aws-agentic','https://images.credly.com/images/6f40bf38-1725-40d8-99a2-f6bb1bafec0e/blob'],
 ['ibm-genai','https://images.credly.com/images/8d1fe454-ecd2-40c1-b79f-b97ad326f8ea/Generative_20AI_20in_20action.png'],
 ['aws-practitioner','https://images.credly.com/images/15fa08e6-ca73-4fa3-94ed-c36f7f157313/blob'],
 ['aws-architect','https://images.credly.com/images/e3f85edd-57d4-4585-9311-7b99b3bc7a75/blob'],
 ['ibm-algorithms','https://images.credly.com/images/6079f8a6-0f3b-4fe5-b1db-57460d1c9282/image.png'],
 ['ms-skills','https://images.credly.com/images/082c8d0c-5232-4597-b6c4-6bebcc4f3046/blob'],
 ['ms-leader','https://learn.microsoft.com/en-us/media/learn/certification/badges/ai-transformation-leader.svg'],
 ['hf','https://huggingface.co/front/assets/huggingface_logo-noborder.svg'],
 ['oracle-agentic','https://brm-workforce.oracle.com/pdf/certview/images/AAI26OFA.png'],
 ['oracle-foundations','https://brm-workforce.oracle.com/pdf/certview/images/OCI25AICFA.png'],
 ['openai','https://cdn.jsdelivr.net/npm/simple-icons@13/icons/openai.svg'],
];
for (const [name,url] of assets) {
 try {const res=await fetch(url);if(!res.ok)throw new Error(String(res.status));const type=res.headers.get('content-type')||'';const bytes=Buffer.from(await res.arrayBuffer());if(!type.startsWith('image/')&&bytes.readUInt32BE(0)!==0x89504e47)throw new Error(type);const ext=type.includes('svg')?'svg':'png';await fs.writeFile(path.join(badgeDir,`${name}.${ext}`),bytes);console.log('saved',name,ext);}catch(e){console.log('failed',name,e.message);}
}
const pages=[
 ['aws-security','https://www.credly.com/org/amazon-web-services/badge/aws-securing-agent-identities-demonstrated'],
 ['global-agents','https://globalai.community/badges/cf1a6b46-b6cb-443c-91b1-783adf5c7e18']
];
for(const [name,url] of pages){try{const html=await(await fetch(url)).text();const tag=html.match(/<meta[^>]*property=["']og:image["'][^>]*>/i)?.[0];const src=tag?.match(/content=["']([^"']+)/i)?.[1];console.log('badge-source',name,src);if(!src)continue;const res=await fetch(new URL(src.replaceAll('&amp;','&'),url));if(!res.ok)throw new Error(String(res.status));const type=res.headers.get('content-type')||'';if(!type.startsWith('image/'))throw new Error(type);await fs.writeFile(path.join(badgeDir,name+(type.includes('svg')?'.svg':'.png')),Buffer.from(await res.arrayBuffer()));}catch(e){console.log('failed',name,e.message);}}
await fs.mkdir(path.join(root,'tmp','research'),{recursive:true});
for(const file of ['README.md','ai-farm-agent/requirements.txt','config.yaml','ai-farm-agent/core/brain.py']){try{const res=await fetch('https://raw.githubusercontent.com/ognistie/AI-Farm-Agent/main/'+file);if(!res.ok)throw new Error(String(res.status));const content=await res.text();await fs.writeFile(path.join(root,'tmp','research',file.replaceAll('/','-')),content);console.log('read',file,content.length);}catch(e){console.log('failed',file,e.message);}}
