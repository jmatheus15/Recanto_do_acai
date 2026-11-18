// Copo de açaí em 2D (SVG) do "Monte o seu": enche com o tamanho e recebe cada ingrediente marcado.
// Sem bibliotecas; animações só com transform e opacity (CSS). Script clássico: expõe window.RecantoCopo.
(function (root) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var CX = 200, YB = 392, YT = 112, WB = 70, WT = 114, E = 0.28, MH = 22;
  var hw = function (y) { return WB + (WT - WB) * (YB - y) / (YB - YT); };   // meia largura externa na altura y
  var iw = function (y) { return hw(y) - 6; };                               // meia largura interna (conteúdo)
  var f1 = function (n) { return Math.round(n * 10) / 10; };
  function rng(seed) { var s = seed >>> 0; return function () { return (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296; }; }
  function seedOf(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619); return h >>> 0; }
  function poly(r, n, rMin, rMax) {
    var pts = [];
    for (var i = 0; i < n; i++) { var a = i / n * 6.283 + r() * 0.6, d = rMin + r() * (rMax - rMin); pts.push(f1(Math.cos(a) * d) + ',' + f1(Math.sin(a) * d * 0.8)); }
    return pts.join(' ');
  }
  var pick = function (r, arr) { return arr[(r() * arr.length) | 0]; };

  var DEFS = '<defs>' +
    '<linearGradient id="cw-wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a5530"/><stop offset=".5" stop-color="#6d3f1f"/><stop offset="1" stop-color="#4f2b13"/></linearGradient>' +
    '<linearGradient id="cw-side" x1="0" x2="1"><stop offset="0" stop-color="#1f041d"/><stop offset=".22" stop-color="#3c0a3e"/><stop offset=".4" stop-color="#5a1a5c"/><stop offset=".62" stop-color="#3a0a3c"/><stop offset="1" stop-color="#1a0318"/></linearGradient>' +
    '<radialGradient id="cw-top" cx=".42" cy=".3" r=".8"><stop offset="0" stop-color="#7a2e7c"/><stop offset=".55" stop-color="#4a0f4c"/><stop offset="1" stop-color="#2c062c"/></radialGradient>' +
    '<linearGradient id="cw-shade" x1="0" x2="1"><stop offset="0" stop-color="#14020f" stop-opacity=".6"/><stop offset=".28" stop-color="#14020f" stop-opacity="0"/><stop offset=".42" stop-color="#fff" stop-opacity=".07"/><stop offset=".6" stop-color="#14020f" stop-opacity="0"/><stop offset="1" stop-color="#14020f" stop-opacity=".65"/></linearGradient>' +
    '<linearGradient id="cw-glass" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".12" stop-color="#fff" stop-opacity=".3"/><stop offset=".2" stop-color="#fff" stop-opacity=".04"/><stop offset=".8" stop-color="#fff" stop-opacity=".02"/><stop offset=".9" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#fff" stop-opacity=".06"/></linearGradient>' +
    '<pattern id="cw-wafer" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="8" height="8" fill="#e1b77c"/><rect width="3" height="8" fill="#a8703a"/></pattern>' +
    '</defs>';

  // formas dos ingredientes, centradas em 0,0
  var SHAPES = {
    banana: function () { return '<ellipse cy="2.6" rx="15" ry="6" fill="#d4bb72"/><ellipse rx="15" ry="6" fill="#f6eabb"/><ellipse rx="5.5" ry="2.1" fill="#dcc88e" opacity=".8"/>'; },
    morango: function () {
      var seeds = '';
      for (var i = 0; i < 9; i++) { var a = -2.6 + i * 0.65; seeds += '<ellipse cx="' + f1(Math.sin(a) * 10.5) + '" cy="' + f1(-Math.cos(a) * 9 + 2) + '" rx=".8" ry="1.1" fill="#f2d24a"/>'; }
      return '<path d="M0 -13C11 -13 15 -3 0 13C-15 -3 -11 -13 0 -13Z" fill="#c8142c"/><path d="M0 -9C7.5 -9 9.5 -2 0 8.5C-9.5 -2 -7.5 -9 0 -9Z" fill="#f08f98"/><path d="M0 -5.5C3.5 -5.5 4.5 -1 0 4.5C-4.5 -1 -3.5 -5.5 0 -5.5Z" fill="#fde3e1"/>' + seeds;
    },
    kiwi: function () {
      var seeds = '';
      for (var i = 0; i < 12; i++) { var a = i / 12 * 6.283; seeds += '<ellipse cx="' + f1(Math.cos(a) * 8.4) + '" cy="' + f1(Math.sin(a) * 3.9) + '" rx="1" ry=".6" fill="#1a140c"/>'; }
      return '<ellipse cy="1.8" rx="15" ry="7" fill="#5c4c22"/><ellipse rx="15" ry="7" fill="#6b5a2a"/><ellipse rx="13.4" ry="6.2" fill="#86bd3c"/><ellipse rx="5" ry="2.3" fill="#eef1c4"/>' + seeds;
    },
    granola: function (r) { return '<polygon points="' + poly(r, 5, 4, 7) + '" fill="' + pick(r, ['#c98a3c', '#b07330', '#dba25a', '#8f5a25']) + '"/>'; },
    amendoim: function (r) { return '<polygon points="' + poly(r, 4, 2, 3.4) + '" fill="' + pick(r, ['#d9b27c', '#c99a5e', '#ecd0a2']) + '"/>'; },
    gotas: function () { return '<path d="M0 -5C2 -1 3 1 3 2.6A3 3 0 0 1 -3 2.6C-3 1 -2 -1 0 -5Z" fill="#3d1c0e"/><circle cx="-1" cy="1.5" r=".8" fill="#fff" opacity=".25"/>'; },
    flocos: function (r) { return '<ellipse rx="6.5" ry="2.6" fill="' + pick(r, ['#e8b04a', '#d99a35', '#f0c060']) + '"/>'; },
    cereal: function () { return '<circle r="3.8" fill="#5a3015"/><circle cx="-1.2" cy="-1.3" r="1.1" fill="#fff" opacity=".22"/>'; },
    mm: function (r) { return '<ellipse rx="6" ry="4.4" fill="' + pick(r, ['#e2342c', '#f5c51c', '#2d9b3a', '#2a64c8', '#f07c1c', '#6b3a1f']) + '"/><ellipse cx="-1.8" cy="-1.6" rx="2" ry="1.1" fill="#fff" opacity=".45"/>'; },
    chocoball: function () { return '<circle r="6.5" fill="#3a1a0c"/><circle cx="-2" cy="-2.2" r="1.8" fill="#fff" opacity=".2"/>'; },
    wafer: function () { return '<rect x="-5" y="-82" width="10" height="86" rx="5" fill="url(#cw-wafer)"/><rect x="-5" y="-82" width="10" height="86" rx="5" fill="none" stroke="#8a5a2a" stroke-width=".8"/>'; },
  };
  // quantidade, escala, raio de ocupação (0 = pode sobrepor), camada
  var PLAN = {
    banana: { n: 4, s: 2, rad: 26, layer: 'fruta' },
    morango: { n: 4, s: 1.9, rad: 22, layer: 'fruta' },
    kiwi: { n: 3, s: 1.9, rad: 26, layer: 'fruta' },
    granola: { n: 22, s: 1, rad: 0, layer: 'gratis' },
    amendoim: { n: 30, s: 1, rad: 0, layer: 'gratis' },
    gotas: { n: 14, s: 1.2, rad: 0, layer: 'gratis' },
    flocos: { n: 14, s: 1.3, rad: 0, layer: 'gratis' },
    cereal: { n: 16, s: 1.2, rad: 0, layer: 'gratis' },
    mm: { n: 11, s: 1.25, rad: 0, layer: 'gratis' },
    chocoball: { n: 8, s: 1.2, rad: 0, layer: 'gratis' },
    wafer: { n: 2, s: 1, rad: 0, layer: 'alto', stick: true },
  };
  // nome no cardápio -> desenho
  var VIS = {
    'Granola': 'granola', 'Leite em pó': 'leitePo', 'Amendoim triturado': 'amendoim', 'Gotas de chocolate': 'gotas',
    'Flocos de milho': 'flocos', 'Canudos wafer': 'wafer', 'Cereal ball': 'cereal', 'M&M': 'mm', 'Chocoball': 'chocoball',
    'Banana': 'banana', 'Morango': 'morango', 'Kiwi (fruta completa)': 'kiwi',
  };
  var COB = { 'Leite condensado': '#f1e2bd', 'Frutas vermelhas': '#7c0f30', 'Doce de leite': '#b4702c', 'Chocolate': '#3b1a0e', 'Morango': '#cf2a44', 'Kiwi': '#8bbd2a' };
  var LAYERS = ['po', 'fruta', 'gratis', 'cob', 'alto'];

  function criar(svg) {
    var xb = hw(YB), xt = hw(YT);
    svg.innerHTML = DEFS +
      '<ellipse cx="' + CX + '" cy="414" rx="178" ry="34" fill="#3a1d0b"/>' +
      '<ellipse cx="' + CX + '" cy="406" rx="178" ry="34" fill="url(#cw-wood)"/>' +
      '<path d="M40 398 Q200 380 360 398 M60 414 Q200 398 340 414 M95 428 Q200 418 305 428" stroke="#3a1d0b" stroke-width="1.4" fill="none" opacity=".45"/>' +
      '<ellipse cx="' + CX + '" cy="' + (YB + 4) + '" rx="' + (WB + 22) + '" ry="15" fill="#14020f" opacity=".45"/>' +
      '<ellipse cx="' + CX + '" cy="' + YT + '" rx="' + WT + '" ry="' + (WT * E) + '" fill="#fff" fill-opacity=".04" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>' +
      '<g class="cw-fill"></g><g class="cw-tops">' + LAYERS.map(function (l) { return '<g data-layer="' + l + '"></g>'; }).join('') + '</g>' +
      '<path fill="url(#cw-glass)" stroke="#fff" stroke-opacity=".38" stroke-width="2" d="M' + (CX - xt) + ',' + YT + ' L' + (CX - xb) + ',' + YB + ' A' + xb + ',' + (xb * E) + ' 0 0 0 ' + (CX + xb) + ',' + YB + ' L' + (CX + xt) + ',' + YT + ' A' + xt + ',' + (xt * E) + ' 0 0 1 ' + (CX - xt) + ',' + YT + ' Z"/>' +
      '<path fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="4" stroke-linecap="round" d="M' + (CX - xt) + ',' + YT + ' A' + xt + ',' + (xt * E) + ' 0 0 0 ' + (CX + xt) + ',' + YT + '"/>';
    var fillG = svg.querySelector('.cw-fill'), layer = {};
    LAYERS.forEach(function (l) { layer[l] = svg.querySelector('[data-layer="' + l + '"]'); });

    var yf = 0, rt = 0;
    var mound = function (x) { return Math.max(0, MH * (1 - Math.pow((x - CX) / (rt * 0.92), 2))); };

    function drawFill(enche, pour) {
      yf = YB - enche * (YB - YT - 34); rt = iw(yf);
      var rb = iw(YB), r = rng(99), specks = '', mx = rt * 0.92;
      var body = 'M' + (CX - rb) + ',' + (YB - 4) + ' L' + (CX - rt) + ',' + yf + ' L' + (CX + rt) + ',' + yf + ' L' + (CX + rb) + ',' + (YB - 4) + ' A' + rb + ',' + (rb * E) + ' 0 0 1 ' + (CX - rb) + ',' + (YB - 4) + ' Z';
      for (var i = 0; i < 34; i++) { var y = yf + 8 + r() * (YB - yf - 16), w = iw(y) - 6; specks += '<circle cx="' + f1(CX + (r() * 2 - 1) * w) + '" cy="' + f1(y) + '" r="' + f1(0.8 + r() * 1.6) + '" fill="#b066b0" opacity="' + f1(0.12 + r() * 0.2) + '"/>'; }
      var top = 'M' + (CX - mx) + ',' + yf + ' C' + (CX - mx * 0.55) + ',' + (yf - MH * 1.33) + ' ' + (CX + mx * 0.55) + ',' + (yf - MH * 1.33) + ' ' + (CX + mx) + ',' + yf + ' A' + mx + ',' + (mx * E) + ' 0 0 1 ' + (CX - mx) + ',' + yf + ' Z';
      fillG.innerHTML = '<path d="' + body + '" fill="url(#cw-side)"/>' + specks + '<path d="' + body + '" fill="url(#cw-shade)"/>' +
        '<ellipse cx="' + CX + '" cy="' + yf + '" rx="' + rt + '" ry="' + (rt * E) + '" fill="url(#cw-top)"/><path d="' + top + '" fill="url(#cw-top)"/>' +
        '<path d="M' + (CX - mx * 0.55) + ',' + (yf - 4) + ' Q' + (CX - 10) + ',' + (yf - MH - 4) + ' ' + (CX + mx * 0.45) + ',' + (yf - 8) + '" stroke="#a45aa6" stroke-width="2.4" fill="none" opacity=".35" stroke-linecap="round"/>';
      fillG.classList.toggle('pour', !!pour);
    }

    function surfacePoint(r, k) {
      var a = r() * 6.283, d = Math.sqrt(r()) * k, x = CX + Math.cos(a) * d * rt;
      return { x: x, y: yf + Math.sin(a) * d * rt * E - mound(x) * 0.9 };
    }
    var occupied = {};
    function place(r, key, rad, k) {
      var others = []; Object.keys(occupied).forEach(function (o) { others = others.concat(occupied[o]); });
      var best = null, bestGap = -Infinity;
      for (var t = 0; t < 16; t++) {
        var p = surfacePoint(r, k);
        if (!rad) return p;
        var gap = others.reduce(function (m, o) { return Math.min(m, Math.hypot(o.x - p.x, (o.y - p.y) * 2.2) - o.rad - rad); }, 999);
        if (gap > 0) { best = p; break; }
        if (gap > bestGap) { bestGap = gap; best = p; }
      }
      (occupied[key] = occupied[key] || []).push({ x: best.x, y: best.y, rad: rad });
      return best;
    }

    function buildGroup(key, vis, cor) {
      var g = document.createElementNS(NS, 'g'), r = rng(seedOf(key)), i, p;
      g.setAttribute('data-k', key);
      if (vis === 'leitePo') {
        var mx = rt * 0.9, dots = '';
        for (i = 0; i < 70; i++) { p = surfacePoint(r, 0.9); dots += '<circle cx="' + f1(p.x) + '" cy="' + f1(p.y) + '" r="' + f1(0.7 + r() * 1.3) + '" fill="#fffaf0" opacity="' + f1(0.6 + r() * 0.4) + '"/>'; }
        g.innerHTML = '<g class="tp tp--fade"><path d="M' + (CX - mx) + ',' + (yf + 1) + ' C' + (CX - mx * 0.55) + ',' + (yf - MH * 1.3) + ' ' + (CX + mx * 0.55) + ',' + (yf - MH * 1.3) + ' ' + (CX + mx) + ',' + (yf + 1) + ' A' + mx + ',' + (mx * E) + ' 0 0 1 ' + (CX - mx) + ',' + (yf + 1) + ' Z" fill="#f6eee2" opacity=".72"/>' + dots + '</g>';
        layer.po.appendChild(g); return g;
      }
      if (vis === 'cobertura') {
        var pts = [], d;
        for (i = 0; i <= 6; i++) { var t = i / 6, x = CX + (i % 2 ? 1 : -1) * rt * (0.72 - 0.1 * Math.abs(t - 0.5)); pts.push([x, yf - rt * E * 0.9 + t * rt * E * 1.8 - mound(x) * 0.9 - 6]); }
        d = 'M' + f1(pts[0][0]) + ',' + f1(pts[0][1]);
        for (i = 1; i < pts.length; i++) { var a = pts[i - 1], b = pts[i]; d += ' C' + f1(a[0] + (b[0] - a[0]) * 0.2) + ',' + f1(a[1] - 10) + ' ' + f1(b[0] - (b[0] - a[0]) * 0.2) + ',' + f1(b[1] - 10) + ' ' + f1(b[0]) + ',' + f1(b[1]); }
        g.innerHTML = '<g class="tp tp--draw"><path pathLength="1" d="' + d + '" stroke="' + cor + '" stroke-width="4.5" stroke-linecap="round" fill="none"/><path pathLength="1" d="' + d + '" stroke="#fff" stroke-opacity=".3" stroke-width="1.2" stroke-linecap="round" fill="none" transform="translate(-.8 -1.2)"/></g>';
        layer.cob.appendChild(g); return g;
      }
      var plan = PLAN[vis], pieces = [];
      for (i = 0; i < plan.n; i++) {
        var rot;
        if (plan.stick) { p = place(r, key, 0, 0.45); rot = (p.x < CX ? -1 : 1) * (14 + r() * 16); }
        else { p = place(r, key, plan.rad, plan.rad ? 0.62 : 0.86); rot = (r() - 0.5) * (plan.rad ? 50 : 360); }
        pieces.push({ p: p, rot: rot, html: SHAPES[vis](r) });
      }
      pieces.sort(function (a, b) { return a.p.y - b.p.y; });
      g.innerHTML = pieces.map(function (pc, k) {
        return '<g transform="translate(' + f1(pc.p.x) + ' ' + f1(pc.p.y) + ') rotate(' + f1(pc.rot) + ') scale(' + plan.s + ')"><g class="tp" style="animation-delay:' + Math.round(k / plan.n * Math.min(380, plan.n * 26)) + 'ms">' + pc.html + '</g></g>';
      }).join('');
      layer[plan.layer].appendChild(g);
      return g;
    }

    var groups = {}, encheAtual = null, first = true;
    // estado = { enche, gratis: [nomes], frutas: [nomes], cobertura: nome ou null }
    function update(st) {
      var mudouTamanho = st.enche !== encheAtual;
      if (mudouTamanho) { drawFill(st.enche, first); encheAtual = st.enche; }
      var want = {};
      st.frutas.forEach(function (n) { want['f:' + n] = { vis: VIS[n] }; });
      st.gratis.forEach(function (n) { want['g:' + n] = { vis: VIS[n] }; });
      if (st.cobertura) want['c:' + st.cobertura] = { vis: 'cobertura', cor: COB[st.cobertura] || '#3b1a0e' };
      // tamanho mudou: a superfície mudou de altura, tudo é redesenhado no lugar, sem cair de novo
      var redraw = mudouTamanho && !first;
      if (redraw) { Object.keys(groups).forEach(function (k) { groups[k].remove(); }); groups = {}; occupied = {}; }
      Object.keys(groups).forEach(function (k) {
        if (want[k]) return;
        var g = groups[k]; delete groups[k]; delete occupied[k];
        g.classList.add('out'); setTimeout(function () { g.remove(); }, 220);
      });
      Object.keys(want).forEach(function (k) {
        if (groups[k] || !want[k].vis) return;
        var g = buildGroup(k, want[k].vis, want[k].cor);
        if (redraw) g.classList.add('still');
        groups[k] = g;
      });
      first = false;
    }
    return { update: update };
  }
  root.RecantoCopo = { criar: criar };
})(this);
