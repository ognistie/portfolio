(() => {
 'use strict';
 const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const data=window.PORTFOLIO;if(!data)return;
 document.querySelector('#resume-certifications').innerHTML=data.certifications.map(c=>`<article class="resume-cert"><img src="assets/badges/${c.image}" width="46" height="53" alt="${c.kind==='issuer'?'Símbolo de '+esc(c.issuer):'Badge de '+esc(c.name)}"><span class="issuer-placeholder" hidden>${esc(c.issuer)}</span><div><h3>${esc(c.name)}</h3><p>${esc(c.issuer)} · ${esc(c.date)}${c.expiry?' · até '+esc(c.expiry):''}${c.credential?'<br>ID: '+esc(c.credential):''}</p><a href="${esc(c.url)}">${c.linkLabel||(c.kind==='issuer'?'Programa / emissor':'Badge oficial')} ↗</a></div></article>`).join('');
 document.querySelectorAll('.resume-cert img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.nextElementSibling.hidden=false;}));
 document.querySelector('#resume-courses').innerHTML=data.courses.map(([name,issuer])=>`<p>${esc(name)}<br><span>${esc(issuer)}</span></p>`).join('');
 document.querySelector('#print-resume').addEventListener('click',()=>window.print());
})();
