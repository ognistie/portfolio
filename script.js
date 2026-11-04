(() => {
 'use strict';
 const data=window.PORTFOLIO;
 const icons={
 user:'<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3Z"/>',
 layers:'<path d="m12 2 11 6-11 6L1 8Zm-10 11 10 6 10-6M2 18l10 6 10-6"/>',
 github:'<path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .5-2 1-2 4-.5 6-2 6-6 0-2-.7-3-1.5-4 .3-1 .3-3-.5-4-2 0-4 1-5 2a14 14 0 0 0-6 0C8 3 6 2 4 2c-.8 1-1 3-.5 4C2.7 7 2 8 2 10c0 4 2 5.5 6 6 .5.5 1 1 1 2v4"/>',
 hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v6-9a1.5 1.5 0 0 1 3 0v9-7a1.5 1.5 0 0 1 3 0v8-4a1.5 1.5 0 0 1 3 0v7c0 5-3 7-7 7-3 0-5-2-7-5l-3-5c-1-2 1-3 2-2l3 3"/>',
 cursor:'<path d="m4 2 16 13-8 1-4 7Z"/>',
 cloud:'<path d="M6 18a5 5 0 1 1 0-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11Z"/><path d="m9 14 3-3 3 3m-3-3v11"/>',
 network:'<rect x="9" y="9" width="6" height="6" rx="1"/><rect x="1" y="1" width="4" height="4" rx=".5"/><rect x="19" y="1" width="4" height="4" rx=".5"/><rect x="1" y="19" width="4" height="4" rx=".5"/><rect x="19" y="19" width="4" height="4" rx=".5"/><path d="m5 5 4 4m6 6 4 4m-4-10 4-4M5 19l4-4"/>',
 folder:'<path d="M2 5h7l3 3h10v14H2Z"/>',
 file:'<path d="M5 1h10l5 5v17H5Zm10 0v6h5M9 12h7m-7 4h7"/>',
 copy:'<rect x="8" y="8" width="14" height="15" rx="2"/><path d="M16 8V2H2v15h6"/>',
 award:'<circle cx="12" cy="8" r="6"/><path d="m8 14-2 9 6-3 6 3-2-9m-6-6 1.5 1.5L15 6"/>',
 briefcase:'<rect x="2" y="7" width="20" height="15" rx="2"/><path d="M8 7V2h8v5M2 12l10 3 10-3m-10 0v4"/>',
 graduation:'<path d="m1 8 11-6 11 6-11 6Zm4 3v7c4 4 10 4 14 0v-7m4-3v10"/>',
 play:'<rect x="1" y="3" width="22" height="17" rx="3"/><path d="m10 8 6 4-6 4Z"/>'
 };
 const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const icon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.file}</svg>`;
 const tags=values=>`<div class="tags">${values.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`;
 document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon);});
 if(!data)return;
 document.querySelector('#project-library').innerHTML=data.projects.map(p=>`<article class="library-card" data-category="${p.category}"><img class="project-cover" src="${esc(p.image)}" alt="" loading="lazy" width="1400" height="788"><div class="card-head">${icon(p.icon)}<span>${p.label}</span></div><h2>${esc(p.name)}</h2><p>${esc(p.summary)}</p><div class="card-bottom">${tags(p.tags)}<button class="card-open" data-project="${p.id}" aria-label="Explorar detalhes de ${esc(p.name)}">explorar ↗</button></div></article>`).join('');
 document.querySelector('#certifications').innerHTML=data.certifications.map(c=>`<article class="glass cert-card" data-cert-issuer="${esc(c.issuer)}"><div class="badge-frame"><img src="assets/badges/${c.image}" width="58" height="65" loading="lazy" alt="${c.kind==='issuer'?'Símbolo de '+esc(c.issuer):'Badge de '+esc(c.name)}"><span class="issuer-fallback">${esc(c.issuer)}</span></div><div><p class="cert-issuer">${esc(c.issuer)}</p><h2>${esc(c.name)}</h2><p class="cert-date">${esc(c.date)}${c.expiry?' · validade: '+esc(c.expiry):''}${c.credential?'<br>ID: '+esc(c.credential):''}</p><a class="cert-link" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${c.linkLabel||(c.kind==='issuer'?'Ver no LinkedIn':'Sobre o badge')} ↗</a>${c.kind==='issuer'?'<span class="badge-kind">Símbolo do emissor</span>':''}</div></article>`).join('');
 document.querySelector('#legacy-courses').innerHTML=data.courses.map(([name,issuer])=>`<article><h3>${esc(name)}</h3><p>${esc(issuer)}</p></article>`).join('');
 document.querySelectorAll('.badge-frame img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.nextElementSibling.style.display='block';}));

 const pages=[...document.querySelectorAll('.page')];
 const aliases={hero:'inicio',cursos:'conquistas',stack:'sobre',experiencia:'sobre'};
 function route(focus=false){
   const raw=location.hash.slice(1)||'inicio';
   const id=aliases[raw]||raw;
   const active=pages.find(p=>p.id===id)||pages[0];
   pages.forEach(p=>p.hidden=p!==active);
   document.querySelectorAll('.navigation a').forEach(a=>{if(a.hash==='#'+active.id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
   if(focus){window.scrollTo({top:0,behavior:'instant'});active.querySelector('h1').focus({preventScroll:true});}
   if(raw==='stack'||raw==='experiencia')document.getElementById(raw).scrollIntoView({behavior:'instant',block:'start'});
   document.title=(active.id==='inicio'?'Guilherme Moraes Franco':active.querySelector('h1').textContent+' · Guilherme Moraes Franco')+' · Portfólio';
 }
 window.addEventListener('hashchange',()=>route(true));route();
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{if(a.hash===location.hash)route(true);}));

 document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
   document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',b===button?'true':'false');});
   let count=0;document.querySelectorAll('.library-card').forEach(c=>{c.hidden=button.dataset.filter!=='all'&&c.dataset.category!==button.dataset.filter;if(!c.hidden)count++;});
   document.querySelector('#project-count').textContent=`${count} projetos encontrados.`;
 }));
 document.querySelectorAll('.cert-filter').forEach(button=>button.addEventListener('click',()=>{
   document.querySelectorAll('.cert-filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',b===button?'true':'false');});
   let count=0;document.querySelectorAll('.cert-card').forEach(c=>{const issuer=c.dataset.certIssuer;const key=button.dataset.issuer;c.hidden=key==='other'?['AWS','Microsoft','IBM','Databricks'].includes(issuer):key!=='all'&&key!==issuer;if(!c.hidden)count++;});
   document.querySelector('#cert-count').textContent=`${count} credenciais encontradas.`;
 }));

 document.querySelector('[data-filter="all"] span').textContent = data.projects.length;

 const preview = document.querySelector('#mouse-preview');
 const previewToggle = document.querySelector('.preview-toggle');
 const projectDialog=document.querySelector('#project-dialog');
 const home = document.querySelector('#inicio');
 let previewEnabled = !matchMedia('(prefers-reduced-motion: reduce)').matches;
 function syncPreview() {
   if (previewEnabled && !home.hidden && !projectDialog.open) {
     preview.play().catch(() => {});
   } else {
     preview.pause();
   }
 }
 previewToggle.addEventListener('click', async () => {
   previewEnabled = preview.paused;
   if (!previewEnabled) { preview.pause(); return; }
   try { await preview.play(); } catch { previewToggle.textContent = 'Clipe indisponível'; }
 });
 preview.addEventListener('play', () => { previewToggle.textContent = 'Pausar clipe'; });
 preview.addEventListener('pause', () => { previewToggle.textContent = 'Reproduzir clipe'; });
 window.addEventListener('hashchange', syncPreview);
 projectDialog.addEventListener('close', syncPreview);
 syncPreview();
 const dialogReturnFocus=new WeakMap();
 function openDialog(dialog){preview.pause();dialogReturnFocus.set(dialog,document.activeElement);dialog.showModal();document.body.classList.add('scroll-locked');dialog.scrollTop=0;}
 [projectDialog].forEach(dialog=>{
   dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
   dialog.addEventListener('keydown',event=>{
     if(event.key!=='Tab')return;
     const controls=[...dialog.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]')].filter(el=>el.getClientRects().length);
     const first=controls[0],last=controls.at(-1);
     if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
     else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
   });
   dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
   dialog.addEventListener('close',()=>{dialog.querySelector('video')?.pause();document.body.classList.remove('scroll-locked');const target=dialogReturnFocus.get(dialog);if(target?.isConnected&&!target.closest('[hidden]'))target.focus({preventScroll:true});});
 });
 document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
   const p=data.projects.find(p=>p.id===button.dataset.project);if(!p)return;
   const media = p.video
     ? '<video controls playsinline preload="none" poster="'+esc(p.image)+'" src="'+esc(p.video)+'" aria-label="Demonstração de '+esc(p.name)+'"></video><a class="text-link" href="'+esc(p.video)+'" target="_blank" rel="noopener noreferrer">Abrir vídeo em outra aba ↗</a>'
     : '<img src="'+esc(p.image)+'" alt="'+esc(p.imageAlt || 'Imagem do projeto '+p.name)+'">';
   const repository = p.repo ? '<div class="dialog-links"><a class="button button-green" href="'+esc(p.repo)+'" target="_blank" rel="noopener noreferrer">Explorar repositório ↗</a></div>' : '';
   document.querySelector('#dialog-content').innerHTML=`<div class="dialog-hero">${icon(p.icon)}<p class="eyebrow">${p.label}</p><h2 id="dialog-title">${esc(p.name)}</h2><p>${esc(p.summary)}</p>${tags(p.tags)}${p.status?`<span class="project-status">${esc(p.status)}</span>`:''}</div><div class="dialog-body"><div class="project-media">${media}</div>${p.flow?`<div class="flow" aria-label="Fluxo de execução">${p.flow.map((s,i)=>(i?'<b aria-hidden="true">→</b>':'')+`<span>${esc(s)}</span>`).join('')}</div>`:''}${p.sections.map(s=>`<section><h3>${esc(s.title)}</h3>${s.text?`<p>${esc(s.text)}</p>`:`<ul>${s.items.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`}</section>`).join('')}${repository}</div>`;
   const back=document.createElement("button");back.className="button dialog-return";back.textContent="← Voltar ao portfólio";back.addEventListener("click",()=>projectDialog.close());document.querySelector(".dialog-body").append(back);
   openDialog(projectDialog);
 }));
 document.querySelector('#copy-email').addEventListener('click',async()=>{const feedback=document.querySelector('#copy-feedback');try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText('og.guifranco@gmail.com');feedback.textContent='E-mail copiado!';}catch{feedback.textContent='Copie manualmente: og.guifranco@gmail.com';}});
})();
