import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {dependency} from './runtime.mjs';
const {chromium}=dependency('playwright');
const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'tmp','verification');await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.platform==='win32'?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
let checks=0;const check=(value,message)=>{assert.ok(value,message);checks++;};
const base=process.env.PORTFOLIO_TEST_URL||pathToFileURL(path.join(root,'index.html')).href;
async function images(){return page.locator('img:visible').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>i.decode().catch(()=>{})));return imgs.filter(i=>!i.naturalWidth).map(i=>i.src);});}
async function route(id){await page.evaluate(id=>{location.hash=id},id);await page.locator(`#${id}`).waitFor({state:'visible'});}
try{
 await page.goto(base);check((await page.locator('.page:visible').count())===1,'One page visible');check((await images()).length===0,'Home images available');
 await page.screenshot({path:path.join(out,'desktop.png'),fullPage:true});
 const farm=page.locator('.tile-farm');await farm.click();check(await page.locator('#project-dialog').isVisible(),'Farm dialog opens');
 const farmText=await page.locator('#dialog-content').innerText();check(farmText.includes('Maestro')&&farmText.includes('Windows UI Automation')&&farmText.includes('Obsidian'),'Farm architecture present');check(!/fazenda|agroneg|agrícola/i.test(farmText),'Farm has no agricultural interpretation');check(farmText.includes('não testes executados por este portfólio'),'Published evaluation distinguished from executed checks');
 await page.screenshot({path:path.join(out,'farm-dialog.png'),fullPage:true});
 for(let i=0;i<8;i++){await page.keyboard.press('Tab');check(await page.evaluate(()=>document.activeElement.closest('#project-dialog')!==null),'Modal retains keyboard focus');}
 await page.keyboard.press('Escape');check(!(await page.locator('#project-dialog').isVisible()),'Escape closes modal');check(await farm.evaluate(el=>document.activeElement===el),'Focus restored to opener');
 check((await page.locator('.avatar-choice').count())===4&&(await page.locator('.controller-key').count())===3,'Original avatars and console controls restored');
 check(await page.locator('#sobre .player-card img').isVisible()===false,'Profile page initially hidden');
 check((await page.locator('#inicio').innerText()).includes('AI Engineer no Grupo Papaki'),'Current AI Engineering profile');
 const avatars=page.locator('.avatar-choice');await avatars.nth(0).focus();await page.keyboard.press('ArrowRight');check(await avatars.nth(1).evaluate(el=>el===document.activeElement),'Avatar arrow navigation restored');await page.keyboard.press('Enter');check(await page.locator('#project-dialog').isVisible(),'Enter activates selected avatar');await page.keyboard.press('Escape');
 await page.locator('.tile-mouse').focus();await page.keyboard.press('Enter');check(await page.locator('#project-dialog').isVisible(),'Keyboard activates featured project');await page.keyboard.press('Escape');
 await route('projetos');await page.locator('[data-filter="ai"]').click();check((await page.locator('.library-card:visible').count())===4,'AI filter');await page.locator('[data-filter="cloud"]').click();check((await page.locator('.library-card:visible').count())===2,'Cloud filter');await page.locator('[data-filter="all"]').click();check((await page.locator('.library-card:visible').count())===6,'All projects restored');
 await page.screenshot({path:path.join(out,'projects.png'),fullPage:true});
 for(const id of ['mouse','farm','decupa','skills','cloud','skate']){await page.locator(`.card-open[data-project="${id}"]`).click();check(await page.locator('#project-dialog').isVisible(),`Library details ${id}`);await page.keyboard.press('Escape');}
 await route('conquistas');check((await page.locator('.cert-card').count())===13,'13 supplied credentials');check((await images()).length===0,'Credential badges loaded');
 for(const [issuer,count] of [['AWS',4],['Microsoft',2],['IBM',2],['other',5],['all',13]]){await page.locator(`[data-issuer="${issuer}"]`).click();check((await page.locator('.cert-card:visible').count())===count,`Credential filter ${issuer}`);}
 await page.screenshot({path:path.join(out,'certifications.png'),fullPage:true});
 await page.locator('.legacy-courses summary').click();check((await page.locator('#legacy-courses article:visible').count())===12,'Original courses preserved');
 await route('contato');await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.testCopiedEmail=text}}}));await page.locator('#copy-email').click();check((await page.locator('#copy-feedback').innerText()).includes('E-mail copiado')&&(await page.evaluate(()=>window.testCopiedEmail))==='og.guifranco@gmail.com','Clipboard success state');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('denied'))}}));await page.locator('#copy-email').click();check((await page.locator('#copy-feedback').innerText()).includes('Copie manualmente'),'Clipboard failure recovery');
 await page.locator('#quick-menu-button').click();check(await page.locator('#quick-menu').isVisible(),'Quick menu opens');await page.locator('#quick-menu a[href="#sobre"]').click();await page.locator('#sobre').waitFor({state:'visible'});check(!(await page.locator('#quick-menu').isVisible()),'Quick menu navigation closes modal');
 await page.evaluate(()=>{location.hash='stack'});await page.locator('#stack').waitFor({state:'visible'});check(await page.locator('#sobre').isVisible(),'Stack deep link');
 await page.locator('#about-title').focus();await page.evaluate(()=>window.scrollTo(0,0));check(await page.locator('#sobre .player-card img').isVisible(),'Original profile avatar restored');check((await page.locator('#sobre').innerText()).includes('AI Engineer no Grupo Papaki'),'Professional profile copy retained');await page.screenshot({path:path.join(out,'about.png'),fullPage:true});
 const hashes=['inicio','projetos','sobre','conquistas','contato'];
 for(const width of [320,390,768,1024,1440]){await page.setViewportSize({width,height:900});for(const id of hashes){await route(id);check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`No overflow ${width}px ${id}`);check(await page.locator(`.navigation a[href="#${id}"]`).getAttribute('aria-current')==='page',`Active navigation ${id}`);if(width===390)await page.screenshot({path:path.join(out,`mobile-${id}.png`),fullPage:true});}}
 await page.setViewportSize({width:1440,height:1000});await route('inicio');check(await page.locator('#inicio').evaluate(el=>getComputedStyle(el).animationName)==='none','Reduced motion');
 check(await page.locator('a[target="_blank"]').evaluateAll(as=>as.every(a=>a.rel.includes('noopener')&&a.rel.includes('noreferrer'))),'External link isolation');
 await route('conquistas');const failedBadge=page.locator('.cert-card img').first();await failedBadge.evaluate(el=>el.src='assets/badges/unavailable-test.png');await failedBadge.waitFor({state:'hidden'});check(await page.locator('.issuer-fallback').first().isVisible(),'Failed badge exposes issuer fallback');
 const resume=await browser.newPage({viewport:{width:900,height:1200},reducedMotion:'reduce'});resume.on('pageerror',e=>errors.push(e.message));await resume.goto(pathToFileURL(path.join(root,'curriculo.html')).href);check((await resume.locator('.resume-role').innerText())==='AI Engineer · Grupo Papaki','Résumé current role');check(!(await resume.locator('body').innerText()).includes('IT Universe · Atual'),'Previous role no longer presented as current');check((await resume.locator('.resume-cert').count())===13,'Shared résumé credentials');check(await resume.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>i.decode()));return imgs.every(i=>i.naturalWidth>0)}),'Résumé badges available');
 for(let i=0;i<2;i++){await resume.locator('.resume-sheet').nth(i).screenshot({path:path.join(out,`resume-${i+1}.png`)});const dims=await resume.locator('.resume-sheet').nth(i).evaluate(el=>({height:el.getBoundingClientRect().height,footerTop:el.querySelector('footer').getBoundingClientRect().top,lastBottom:el.querySelector(':scope > .resume-section:last-of-type').getBoundingClientRect().bottom}));check(dims.lastBottom<dims.footerTop,`Résumé page ${i+1} content clears footer`);console.log('Résumé layout',i+1,dims);}
 await resume.setViewportSize({width:390,height:844});check(await resume.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile résumé no overflow');
 await resume.setViewportSize({width:900,height:1200});await resume.emulateMedia({media:'print'});
 for(let i=0;i<2;i++){check(await resume.locator('.resume-sheet').nth(i).evaluate(el=>{const content=el.querySelector('.resume-source-note')||el.querySelector(':scope > .resume-section:last-of-type');return content.getBoundingClientRect().bottom<el.querySelector('footer').getBoundingClientRect().top;}),`Printed résumé page ${i+1} content clears footer`);}
 await resume.close();
 const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base);check((await nojs.locator('.page:visible').count())===5,'No-JS content remains readable');await nojs.close();
 check(errors.length===0,'No JavaScript runtime errors');
 await fs.writeFile(path.join(out,'results.json'),JSON.stringify({checks,errors,viewports:[320,390,768,1024,1440],browser:'Chromium via installed Google Chrome',transport:base.startsWith('file:')?'file':'http',artifacts:out},null,2));
 console.log(`PASS: ${checks} checks; no JavaScript errors. Screenshots: ${out}`);
}finally{await browser.close();}
