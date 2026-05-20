// Reading progress + active TOC highlight
(function(){
  const bar = document.getElementById('progress');
  const tocLinks = [...document.querySelectorAll('.toc[href^="#"]')];
  const targets = tocLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function onScroll(){
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    if (bar) bar.style.width = (pct*100).toFixed(2) + '%';

    // active section
    let activeIdx = 0;
    const y = h.scrollTop + 120;
    for (let i=0;i<targets.length;i++){
      if (targets[i].offsetTop <= y) activeIdx = i;
    }
    tocLinks.forEach((a,i)=> a.classList.toggle('active', i===activeIdx));
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();
