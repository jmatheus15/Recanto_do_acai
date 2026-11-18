// Recanto do Açaí v3 "Pede fácil": comportamento da página. Script clássico (abre com dois cliques;
// o vídeo do hero precisa de servidor, e sem ele o hero estático assume, como a skill "site de 10k" prevê).
(function () {
  'use strict';
  var D = window.RECANTO, P = window.RecantoPedido;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  // busca tolerante: sem acento, maiúscula, espaço ou letra dobrada ("nutela" acha "Nutella", "kitkat" acha "Kit Kat")
  var norm = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, '').replace(/(.)\1+/g, '$1'); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var waDireto = P.linkWhatsApp(D.CONTATO.whatsapp, 'Olá, Recanto do Açaí! Quero fazer um pedido.');
  var semRotulo = function (r) { return r === 'único' || r === 'taça'; };
  var PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>';

  $$('[data-wa]').forEach(function (a) { a.href = P.linkWhatsApp(D.CONTATO.whatsapp, a.dataset.wa); });
  $('[data-year]').textContent = new Date().getFullYear();

  // ---------- entradas: uma por momento; a pincelada se desenha junto ----------
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      setTimeout(function () { e.target.classList.add('done'); }, 1300); // aposenta os atrasos escalonados
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.addEventListener('visibilitychange', function () { document.body.classList.toggle('paused', document.hidden); });

  // ---------- sacola: o formulário final; o destino é o WhatsApp da loja ----------
  var sacola = (function () {
    var KEY = 'recanto-sacola';
    var dlg = $('#sacola'), form = $('form', dlg), list = $('[data-bag-list]', dlg), send = $('[data-bag-send]', dlg);
    var end = $('#bag-end'), endErr = $('#bag-end-err'), addr = $('[data-bag-addr]', dlg), nome = $('#bag-nome'), bar = $('.bagbar');
    var itens = [];
    try { itens = P.validar(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (e) { itens = []; }
    var save = function () { try { localStorage.setItem(KEY, JSON.stringify(itens)); } catch (e) { /* sem armazenamento: vale só nesta visita */ } };
    var cliente = function () { return { nome: nome.value.trim(), entrega: form.entrega.value, endereco: end.value.trim() }; };
    var updateLink = function () { send.href = P.linkWhatsApp(D.CONTATO.whatsapp, P.mensagem(itens, cliente())); };
    function render() {
      var n = P.contar(itens), total = P.brl(P.total(itens)), vazio = n === 0;
      $$('[data-bag-count]').forEach(function (el) { el.textContent = n; el.hidden = vazio; });
      $('[data-bag-items]', bar).textContent = n + (n === 1 ? ' item' : ' itens');
      $('[data-bag-total]', bar).textContent = total;
      bar.hidden = vazio || dlg.open;
      $('[data-bag-sum]', dlg).textContent = total;
      $('[data-bag-empty]', dlg).hidden = !vazio;
      $('[data-bag-checkout]', dlg).hidden = vazio;
      $('[data-bag-foot]', dlg).hidden = vazio;
      list.innerHTML = itens.map(function (i) {
        return '<li class="bag__item" data-key="' + esc(i.key) + '"><div class="bag__item-main"><p class="bag__item-name">' + esc(i.nome) + '</p>' +
          (i.detalhe.length ? '<ul class="bag__item-det">' + i.detalhe.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' : '') +
          '<p class="bag__item-price">' + P.brl(i.preco * i.qtd) + (i.qtd > 1 ? ' <small>(' + P.brl(i.preco) + ' cada)</small>' : '') + '</p></div>' +
          '<span class="qty"><button type="button" data-d="-1" aria-label="' + (i.qtd === 1 ? 'Remover ' : 'Tirar um ') + esc(i.nome) + '">' +
          (i.qtd === 1 ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/></svg>' : '−') + '</button>' +
          '<output aria-live="polite">' + i.qtd + '</output>' +
          '<button type="button" data-d="1" aria-label="Mais um ' + esc(i.nome) + '"' + (i.qtd >= P.MAX_QTD ? ' disabled' : '') + '>+</button></span></li>';
      }).join('');
      updateLink();
    }
    list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-d]'); if (!b) return;
      P.mudarQtd(itens, b.closest('.bag__item').dataset.key, +b.dataset.d); save(); render();
      if (!itens.length) $('.bag__close', dlg).focus();
    });
    form.addEventListener('change', function (e) {
      if (e.target.name === 'entrega') { addr.hidden = e.target.value !== 'delivery'; endErr.textContent = ''; }
      updateLink();
    });
    form.addEventListener('input', function () { endErr.textContent = ''; updateLink(); });
    form.addEventListener('submit', function (e) { if (!e.submitter || e.submitter.value !== 'close') e.preventDefault(); }); // Enter num campo não fecha
    send.addEventListener('click', function (e) {
      if (form.entrega.value === 'delivery' && !end.value.trim()) { e.preventDefault(); endErr.textContent = 'Coloque o endereço para o delivery.'; end.focus(); }
    });
    var open = function () { render(); bar.hidden = true; dlg.showModal(); };
    $$('[data-open-bag]').forEach(function (b) { b.addEventListener('click', open); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.closest('[data-close-bag]')) dlg.close(); });
    dlg.addEventListener('close', function () { bar.hidden = !itens.length; });
    addEventListener('storage', function (e) {
      if (e.key !== KEY) return;
      try { itens = P.validar(JSON.parse(e.newValue || '[]')); } catch (err) { itens = []; }
      render();
    });
    render();
    return {
      add: function (item) { P.adicionar(itens, item); save(); render(); bar.classList.remove('bump'); void bar.offsetWidth; bar.classList.add('bump'); },
      vazia: function () { return itens.length === 0; },
      open: open,
    };
  })();

  // a chamada única: com itens abre a sacola; sem itens, o WhatsApp direto
  $$('[data-cta]').forEach(function (a) {
    a.href = waDireto; a.target = '_blank'; a.rel = 'noopener';
    a.addEventListener('click', function (e) { if (!sacola.vazia()) { e.preventDefault(); sacola.open(); } });
  });

  // botão "+" vira "✓" por um instante: o cliente vê que entrou
  var confirma = function (btn, label) {
    var antes = btn.innerHTML, antesLabel = btn.getAttribute('aria-label');
    btn.classList.add('done');
    if (btn.classList.contains('add')) { btn.innerHTML = CHECK; } else { btn.textContent = label; }
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.classList.remove('done'); btn.innerHTML = antes; if (antesLabel) btn.setAttribute('aria-label', antesLabel); }, 1300);
  };
  var catDe = function (id) { return D.CARDAPIO.find(function (c) { return c.id === id; }); };
  var sizesHtml = function (it) {
    return it.precos.length > 1
      ? '<span class="sizes" role="group" aria-label="Tamanho de ' + esc(it.nome) + '">' + it.precos.map(function (p, k) {
          return '<button type="button" class="size" data-k="' + k + '" aria-pressed="' + (k === 0) + '">' + esc(p[0]) + '</button>';
        }).join('') + '</span>'
      : (semRotulo(it.precos[0][0]) ? '' : '<span class="size" aria-hidden="true">' + esc(it.precos[0][0]) + '</span>');
  };
  var itemSacola = function (catId, it, k) {
    var r = it.precos[k][0];
    return { key: catId + '|' + it.nome + '|' + r, nome: it.precos.length > 1 || !semRotulo(r) ? it.nome + ' ' + r : it.nome, preco: it.precos[k][1] };
  };
  // tamanho escolhido e "+" funcionam igual nos destaques e no cardápio
  function ligaCompra(root, achar) {
    root.addEventListener('click', function (e) {
      var card = e.target.closest('[data-item]'); if (!card) return;
      var x = achar(card), size = e.target.closest('.size[data-k]');
      if (size) {
        $$('.size[data-k]', card).forEach(function (b) { b.setAttribute('aria-pressed', b === size); });
        $('[data-preco]', card).textContent = P.brl(x.it.precos[+size.dataset.k][1]);
        return;
      }
      var add = e.target.closest('[data-add]'); if (!add) return;
      var sel = $('.size[aria-pressed="true"]', card);
      sacola.add(itemSacola(x.c.id, x.it, sel ? +sel.dataset.k : 0));
      confirma(add);
    });
  }

  // ---------- destaques da casa ----------
  (function () {
    var ul = $('[data-destaques]');
    var lista = D.DESTAQUES.map(function (d) { var c = catDe(d.cat); return { d: d, c: c, it: c.itens.find(function (i) { return i.nome === d.item; }) }; });
    ul.innerHTML = lista.map(function (x, n) {
      return '<li class="dc reveal" data-item="' + n + '"><figure class="dc__foto"><img src="' + x.d.foto + '" width="800" height="1200" alt="' + esc(x.d.alt) + '" loading="lazy" decoding="async"></figure>' +
        '<div class="dc__body"><h3 class="dc__nome">' + esc(x.it.nome) + '</h3>' +
        (x.it.desc ? '<p class="dc__desc">' + esc(x.it.desc) + '</p>' : '<p class="dc__desc">' + esc(x.c.nota || '') + '</p>') +
        sizesHtml(x.it) +
        '<div class="dc__buy"><span class="tag" data-preco>' + P.brl(x.it.precos[0][1]) + '</span>' +
        '<button type="button" class="add" data-add aria-label="Adicionar ' + esc(x.it.nome) + ' à sacola">' + PLUS + '</button></div></div></li>';
    }).join('');
    ligaCompra(ul, function (card) { return lista[+card.dataset.item]; });
    $$('.reveal', ul).forEach(function (el, i) { el.style.transitionDelay = (i * 0.08) + 's'; io.observe(el); });
  })();

  // ---------- cardápio numa página só: categorias fixas, busca, "+" em todo item ----------
  var menuBody = $('[data-menu]');
  (function () {
    var cats = $('[data-cats]');
    cats.innerHTML = '<div class="cats__row">' + D.CARDAPIO.map(function (c, i) {
      return '<a href="#cat-' + c.id + '"' + (i === 0 ? ' aria-current="true"' : '') + '>' + esc(c.nome) + '</a>';
    }).join('') + '</div>';
    var inicial = function (nome) { return nome.replace(/^(Taça|Milk-Shake|Açaí|Tigela|Batida)\s+/i, '').split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase(); };
    menuBody.innerHTML = D.CARDAPIO.map(function (c) {
      var head = '<section class="cat" id="cat-' + c.id + '" data-cat="' + c.id + '"><h3 class="cat__title">' + esc(c.nome) + '</h3>' +
        (c.nota ? '<p class="cat__note">' + esc(c.nota) + '</p>' : '');
      if (c.id === 'tradicional') {
        var cob = (c.listas || []).find(function (l) { return /cobertura/i.test(l.titulo); });
        return head + '<div data-monte data-busca="' + esc(norm('monte o seu acai tradicional p m g gg big 1kg ' + D.TRADICIONAL.gratis.join(' '))) + '"></div>' +
          (cob ? '<p class="lista-info"><b>' + esc(cob.titulo) + ':</b> ' + esc(cob.itens.join(', ')) + '. Diga a sua na mensagem.</p>' : '') + '</section>';
      }
      return head + '<ul class="items">' + c.itens.map(function (it, n) {
        return '<li class="it" data-item="' + c.id + ':' + n + '" data-busca="' + esc(norm(it.nome + ' ' + (it.desc || '') + ' ' + c.nome)) + '">' +
          '<span class="it__thumb" aria-hidden="true">' + (it.foto ? '<img src="' + it.foto + '" width="84" height="84" alt="" loading="lazy" decoding="async">' : esc(inicial(it.nome))) + '</span>' +
          '<div class="it__body"><div class="it__head"><h4 class="it__nome">' + esc(it.nome) + '</h4><span class="it__preco" data-preco>' + P.brl(it.precos[0][1]) + '</span></div>' +
          (it.desc ? '<p class="it__desc">' + esc(it.desc) + '</p>' : '') +
          '<div class="it__row">' + sizesHtml(it) + '<button type="button" class="add" data-add aria-label="Adicionar ' + esc(it.nome) + ' à sacola">' + PLUS + '</button></div></div></li>';
      }).join('') + '</ul></section>';
    }).join('');
    ligaCompra(menuBody, function (card) {
      var p = card.dataset.item.split(':'), c = catDe(p[0]);
      return { c: c, it: c.itens[+p[1]] };
    });

    // a categoria visível fica marcada na barra, que rola sozinha até ela
    var links = $$('a', cats), row = $('.cats__row', cats);
    var marcar = function (id) {
      links.forEach(function (a) {
        var on = a.getAttribute('href') === '#cat-' + id;
        if (on) { a.setAttribute('aria-current', 'true'); row.scrollTo({ left: a.offsetLeft - 16, behavior: reduce.matches ? 'auto' : 'smooth' }); }
        else a.removeAttribute('aria-current');
      });
    };
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) marcar(e.target.dataset.cat); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    $$('.cat', menuBody).forEach(function (s) { spy.observe(s); });

    // busca sem acento: esconde o que não bate e as categorias que ficarem vazias
    var busca = $('[data-busca]'), vazio = $('[data-vazio]');
    busca.addEventListener('input', function () {
      var q = norm(busca.value.trim()), achou = 0;
      $$('.cat', menuBody).forEach(function (s) {
        var alvos = $$('[data-busca]', s), vis = 0;
        alvos.forEach(function (el) { var ok = !q || el.dataset.busca.indexOf(q) >= 0; el.hidden = !ok; if (ok) vis++; });
        s.hidden = vis === 0; achou += vis;
      });
      vazio.hidden = achou > 0;
      cats.hidden = !!q;   // buscando, a barra de categorias sai do caminho
    });
  })();

  // ---------- momento interativo: arrastar para escolher o tamanho do tradicional ----------
  (function () {
    var slot = $('[data-monte]', menuBody); if (!slot) return;
    slot.appendChild(document.getElementById('tpl-monte').content.cloneNode(true));
    var T = D.TRADICIONAL, box = $('.monte', slot), range = $('[data-range]', box), stage = $('.monte__stage', box);
    var letter = $('[data-letter]', box), price = $('[data-price]', box), count = $('[data-count]', box);
    var gratis = $('[data-gratis]', box), addBtn = $('[data-add-monte]', box), ticks = $('[data-ticks]', box);
    var frutasEl = $('[data-frutas]', box), cobEl = $('[data-cob]', box);
    var copo = window.RecantoCopo ? window.RecantoCopo.criar($('[data-copo]', box)) : null;
    ticks.innerHTML = T.tamanhos.map(function (t, i) { return '<button type="button" data-i="' + i + '" tabindex="-1">' + esc(t.nome) + '</button>'; }).join('');
    gratis.innerHTML = T.gratis.map(function (g) { return '<label class="chip"><input type="checkbox" value="' + esc(g) + '"><span>' + esc(g) + '</span></label>'; }).join('');
    frutasEl.innerHTML = T.frutas.map(function (f, i) { return '<label class="chip"><input type="checkbox" value="' + i + '"><span>' + esc(f.nome) + ' <em>' + (f.preco ? '+' + P.brl(f.preco) : 'grátis') + '</em></span></label>'; }).join('');
    cobEl.innerHTML = '<label class="chip"><input type="radio" name="monte-cob" value="" checked><span>Sem cobertura</span></label>' +
      T.coberturas.map(function (c) { return '<label class="chip"><input type="radio" name="monte-cob" value="' + esc(c) + '"><span>' + esc(c) + '</span></label>'; }).join('');
    var tam = function () { return T.tamanhos[+range.value]; };
    var escolhidos = function () { return $$('input:checked', gratis).map(function (i) { return i.value; }); };
    var frutas = function () { return $$('input:checked', frutasEl).map(function (i) { return T.frutas[+i.value]; }); };
    var cobertura = function () { var c = $('input:checked', cobEl); return c && c.value ? c.value : null; };
    function update(trocou) {
      var t = tam(), sel = escolhidos(), max = t.faixa ? t.faixa.max : Infinity;
      if (sel.length > max) { $$('input:checked', gratis).slice(max).forEach(function (i) { i.checked = false; }); sel = escolhidos(); }
      var item = P.itemTradicional(t, sel, { frutas: frutas(), cobertura: cobertura() }), valor = item.preco;
      // o copo enche com o tamanho (P mais baixo, BIG quase na borda) e recebe cada escolha
      if (copo) copo.update({ enche: Math.round((0.56 + (t.escala - 0.6) * 0.9) * 100) / 100, gratis: sel, frutas: frutas().map(function (f) { return f.nome; }), cobertura: cobertura() });
      $('[data-copo]', box).setAttribute('aria-label', 'Copo de açaí ' + t.nome + (sel.length ? ' com ' + sel.join(', ') : ''));
      range.style.setProperty('--p', (+range.value / 4 * 100) + '%');
      range.setAttribute('aria-valuetext', 'Açaí ' + t.nome + ', ' + P.brl(valor));
      $$('button', ticks).forEach(function (b, i) { b.classList.toggle('on', i === +range.value); });
      price.textContent = P.brl(valor);
      count.textContent = t.faixa ? '(' + sel.length + ' de ' + max + ', até ' + t.faixa.ate + ' por ' + P.brl(t.preco) + ')' : '(' + sel.length + ' marcados)';
      $$('input', gratis).forEach(function (i) { i.disabled = !i.checked && sel.length >= max; });
      addBtn.textContent = 'Adicionar Açaí ' + t.nome + ' à sacola';
      if (trocou) {
        letter.textContent = t.id === 'BIG' ? '1kg' : t.id;
        if (!reduce.matches && letter.animate) letter.animate([{ opacity: 0, transform: 'translateY(20px) scale(.94)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: 'cubic-bezier(.22,1,.36,1)' });
      }
    }
    range.addEventListener('input', function () { update(true); });
    ticks.addEventListener('click', function (e) { var b = e.target.closest('[data-i]'); if (b) { range.value = b.dataset.i; update(true); range.focus(); } });
    [gratis, frutasEl, cobEl].forEach(function (el) { el.addEventListener('change', function () { update(false); }); });
    addBtn.addEventListener('click', function () {
      sacola.add(P.itemTradicional(tam(), escolhidos(), { frutas: frutas(), cobertura: cobertura() }));
      confirma(addBtn, '✓ Açaí ' + tam().nome + ' na sacola');
    });
    update(true);
  })();

  // ---------- fotos reais ampliáveis ----------
  var lb = $('.lightbox'), lbImg = $('img', lb);
  $$('[data-full]').forEach(function (b) { b.addEventListener('click', function () { lbImg.src = b.dataset.full; lbImg.alt = $('img', b).alt; lb.showModal(); }); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });

  // ---------- loop da chamada final: só no computador, na tela, sem movimento reduzido nem economia de dados ----------
  (function () {
    var v = $('.cta__media video'), pode = matchMedia('(min-width: 861px) and (prefers-reduced-motion: no-preference)');
    new IntersectionObserver(function (es) {
      if (es[es.length - 1].isIntersecting && pode.matches && !(navigator.connection && navigator.connection.saveData)) {
        if (!v.getAttribute('src')) v.src = v.dataset.src;
        var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); // autoplay bloqueado: fica o pôster
      } else v.pause();
    }, { rootMargin: '200px 0px' }).observe(v.closest('.cta'));
    pode.addEventListener('change', function () { if (!pode.matches) v.pause(); });
  })();

  $$('.reveal:not(.in)').forEach(function (el) { io.observe(el); });

  // ---------- hero controlado pelo scroll (references/pipeline-scrub.md) ----------
  (function (MIDIA) {
    var GATES = [
      '(max-width: 720px)',
      '(orientation: portrait) and (max-width: 1024px)',
      '(orientation: portrait) and (pointer: coarse)',
      '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
      '(prefers-reduced-motion: reduce)',
    ];
    var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };
    var smoothstep = function (p, e0, e1) { var t = clamp((p - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
    var rng = function (seed) { var s = seed >>> 0; return function () { return (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296; }; };
    var hero = $('#hero'), root = document.documentElement, track = $('.hero__track', hero), stage = $('.hero__stage', hero);
    var video = $('.hero__video', hero), poster = $('.hero__poster', hero), ring = $('.ring', hero);
    if (!MIDIA.heroVideo) return;

    var bands = $$('.band', hero).map(function (el, i, all) {
      return { el: el, a: +el.dataset.a, b: +el.dataset.b, first: i === 0, last: i === all.length - 1, ramp: el.dataset.ramp ? +el.dataset.ramp : null, op: -1, k: -1, ks: -1, kb: -1 };
    });
    // divide cada faixa em palavras (.w) e caracteres (.c), offsets de semente fixa
    bands.forEach(function (b, n) {
      var p = $('.band__text', b.el), text = p.textContent.trim(), r = rng(101 + n * 7), fx = b.el.dataset.fx;
      var words = text.split(' '), chars = text.replace(/ /g, '').length, ci = 0;
      p.textContent = '';
      var sr = document.createElement('span'); sr.className = 'sr'; sr.textContent = text; p.appendChild(sr);
      var vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
      words.forEach(function (w, wi) {
        var ws = document.createElement('span'); ws.className = 'w'; ws.style.setProperty('--th', (wi / words.length * 0.5).toFixed(3));
        Array.from(w).forEach(function (ch) {
          var cs = document.createElement('span'); cs.className = 'c'; cs.textContent = ch;
          if (fx === 'scatter') {
            cs.style.setProperty('--th', (ci / chars * 0.4 + r() * 0.15).toFixed(3));
            cs.style.setProperty('--jx', ((r() - 0.5) * 60).toFixed(1) + 'px');
            cs.style.setProperty('--jy', (-20 - r() * 50).toFixed(1) + 'px');
            cs.style.setProperty('--jr', ((r() - 0.5) * 40).toFixed(1) + 'deg');
          }
          ws.appendChild(cs); ci++;
        });
        vis.appendChild(ws); if (wi < words.length - 1) vis.appendChild(document.createTextNode(' '));
      });
      p.appendChild(vis);
    });

    var target = 0, shown = 0, rafId = null, lastTick = 0, heroOnScreen = true, scrubOn = false, inited = false;
    var seekBusy = false, pendingTime = null, loadStart = performance.now();
    var heroProgress = function () { var r = track.getBoundingClientRect(); return clamp(-r.top / (r.height - innerHeight), 0, 1); };
    function requestSeek(t) {
      if (!video.duration) return;
      if (seekBusy) { pendingTime = t; return; }
      seekBusy = true; video.currentTime = t;
    }
    video.addEventListener('seeked', function () { seekBusy = false; if (pendingTime !== null) { var t = pendingTime; pendingTime = null; requestSeek(t); } });
    video.addEventListener('error', function () { seekBusy = false; pendingTime = null; failVideo(); });

    function updateCaptions(p) {
      var now = performance.now();
      bands.forEach(function (b) {
        var f = Math.min(0.02, (b.b - b.a) / 3);
        var op = (b.first ? 1 : smoothstep(p, b.a, b.a + f)) * (b.last ? 1 : 1 - smoothstep(p, b.b - f, b.b));
        if (p < b.a || p > b.b) op = (b.first && p <= b.a) || (b.last && p >= b.b) ? 1 : 0;
        var k = clamp((p - b.a) / (b.ramp || Math.min(0.025, (b.b - b.a) * 0.35)), 0, 1);
        if (b.first) k = Math.max(k, clamp((now - loadStart) / 1200, 0, 1)); // faixa 1 abre montada
        var ks = clamp((k - 0.66) * 4, 0, 1), kb = clamp((k - 0.78) * 5, 0, 1);
        if (Math.abs(op - b.op) > 0.004) { b.op = op; b.el.style.opacity = op.toFixed(3); b.el.style.visibility = op > 0 ? 'visible' : 'hidden'; }
        if (Math.abs(k - b.k) > 0.008) { b.k = k; b.el.style.setProperty('--k', k.toFixed(3)); }
        if (Math.abs(ks - b.ks) > 0.008) { b.ks = ks; b.el.style.setProperty('--ks', ks.toFixed(3)); }
        if (Math.abs(kb - b.kb) > 0.008) { b.kb = kb; b.el.style.setProperty('--kb', kb.toFixed(3)); }
      });
    }
    function tick(now) {
      var dt = Math.min(100, now - (lastTick || now)); lastTick = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.16, dt / 16.667));
      var loading = now - loadStart < 1300;
      if (Math.abs(target - shown) < 0.0005 && !loading) { shown = target; rafId = null; lastTick = 0; }
      else rafId = requestAnimationFrame(tick);
      requestSeek(shown * video.duration);
      updateCaptions(shown);
    }
    function onScroll() { target = heroProgress(); if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick); }
    new IntersectionObserver(function (es) { heroOnScreen = es[es.length - 1].isIntersecting; if (heroOnScreen && scrubOn) onScroll(); }).observe(track);

    function initOnce() {
      if (inited) return; inited = true;
      poster.style.backgroundImage = "url('" + MIDIA.heroPoster + "')";   // pôster só no caminho com portão
      var started = false;
      var start = function () { if (!started) { started = true; loadBlob().catch(failVideo); } };
      var im = new Image(); im.onload = im.onerror = start; im.src = MIDIA.heroPoster;
      setTimeout(start, 4000);
    }
    function loadBlob() {
      var ctrl = new AbortController(), watchdog = setTimeout(function () { ctrl.abort(); }, 20000);
      return fetch(MIDIA.heroVideo, { priority: 'low', signal: ctrl.signal }).then(function (res) {
        if (!res.ok) throw new Error('vídeo ' + res.status);
        var total = Number(res.headers.get('Content-Length')) || MIDIA.heroVideoBytes || 1;
        var reader = res.body.getReader(), chunks = [], got = 0, lastRing = 0;
        function pump() {
          return reader.read().then(function (r) {
            if (r.done) return;
            clearTimeout(watchdog); watchdog = setTimeout(function () { ctrl.abort(); }, 20000);
            chunks.push(r.value); got += r.value.length;
            var frac = Math.min(1, got / total), now = performance.now();
            if (now - lastRing > 100 || frac === 1) { lastRing = now; ring.style.setProperty('--ld', Math.round(126 * (1 - frac))); }
            return pump();
          });
        }
        return pump().then(function () {
          clearTimeout(watchdog); ring.style.setProperty('--ld', 0);
          video.src = URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' }));
          video.load();
          video.addEventListener('canplay', function () { requestSeek(heroProgress() * video.duration); stage.classList.add('video-ready'); }, { once: true });
        });
      });
    }
    function failVideo() { ring.style.display = 'none'; stage.classList.add('video-failed'); } // o pôster carrega a jornada

    function enableScrub() {
      if (scrubOn) return; scrubOn = true;
      root.classList.add('scrub-on');
      initOnce();
      addEventListener('scroll', onScroll, { passive: true });
      bands.forEach(function (b) { b.op = b.k = b.ks = b.kb = -1; });
      updateCaptions(heroProgress()); onScroll();
    }
    function disableScrub() {
      if (!scrubOn) return; scrubOn = false;
      root.classList.remove('scrub-on');
      removeEventListener('scroll', onScroll);
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    }
    var MQLS = GATES.map(function (q) { return matchMedia(q); });   // referenciadas para os listeners não sumirem
    // dois cliques no index.html (file://) bloqueiam o fetch do vídeo: o hero estático desenhado assume
    var local = location.protocol === 'file:';
    var apply = function () { if (local || MQLS.some(function (m) { return m.matches; })) disableScrub(); else enableScrub(); };
    MQLS.forEach(function (m) { m.addEventListener('change', apply); });
    apply();
  })(D.MIDIA);
})();
