import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {dependency} from './runtime.mjs';
const {chromium}=dependency('playwright');
const root=path.resolve(import.meta.dirname,'..');
const browser=await chromium.launch({headless:true,...(process.platform==='win32'?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{})});
try{const page=await browser.newPage();await page.goto(pathToFileURL(path.join(root,'curriculo.html')).href);await page.locator('.resume-cert').last().waitFor();await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));await page.pdf({path:path.join(root,'assets','curriculo-guilherme-moraes-franco.pdf'),format:'A4',preferCSSPageSize:true,printBackground:true,tagged:true});console.log('Created assets/curriculo-guilherme-moraes-franco.pdf');}finally{await browser.close();}
