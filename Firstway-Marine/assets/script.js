document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
  const page=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-link').forEach(a=>{
    const href=(a.getAttribute('href')||'').split('/').pop().split('#')[0];
    if(href===page) a.classList.add('active');
  });

  const top=document.getElementById('backToTop');
  const toggleTop=()=>{if(top) top.classList.toggle('show',window.scrollY>450)};
  window.addEventListener('scroll',toggleTop,{passive:true}); toggleTop();
  if(top) top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Quote request: opens the user's email client with a professionally formatted enquiry.
  document.querySelectorAll('.quote-form').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(form);
    const name=(data.get('name')||'').trim();
    const company=(data.get('company')||'').trim();
    const phone=(data.get('phone')||'').trim();
    const email=(data.get('email')||'').trim();
    const service=(data.get('service')||'').trim();
    const message=(data.get('message')||'').trim();
    const subject=`Quote Request - ${service || 'Marine / Industrial Service'}`;
    const body=[
      'FIRSTWAY MARINE MACHINES AND EQUIPMENT MAINTENANCE L.L.C.',
      '',`Name: ${name}`,`Company: ${company}`,`Phone: ${phone}`,`Email: ${email}`,
      `Service Required: ${service}`,'',`Equipment / Requirement: ${message}`,'',
      'Website: www.firstwaymarine.com','Email: info@firstway.ae','Office: +971 2 555 4543','Mobile: +971 52 207 8417'
    ].join('\n');
    window.location.href='mailto:info@firstway.ae?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    form.reset();
    const modalEl=document.getElementById('quoteModal');
    if(modalEl && window.bootstrap){const modal=bootstrap.Modal.getInstance(modalEl);if(modal) modal.hide();}
  }));

  // Close mobile navigation after choosing a page.
  document.querySelectorAll('.navbar-collapse .nav-link:not(.dropdown-toggle)').forEach(link=>link.addEventListener('click',()=>{
    const nav=document.getElementById('nav');
    if(nav && nav.classList.contains('show') && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  }));
});