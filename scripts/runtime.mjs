import {createRequire} from 'node:module';
import {homedir} from 'node:os';
import path from 'node:path';
export function dependency(name){
 try{return createRequire(import.meta.url)(name);}catch{
   const base=process.env.CODEX_RUNTIME_NODE_MODULES||path.join(homedir(),'.cache','codex-runtimes','codex-primary-runtime','dependencies','node','node_modules');
   return createRequire(path.join(base,'package.json'))(name);
 }
}
