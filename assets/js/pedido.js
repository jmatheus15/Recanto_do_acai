// Lógica pura do pedido (sem DOM): preço do tradicional, sacola e mensagem do WhatsApp.
// Script clássico para abrir com dois cliques; também carrega com require() nos testes.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RecantoPedido = factory();
})(this, function () {
  'use strict';
  var MAX_QTD = 20;
  var brl = function (v) { return 'R$ ' + v.toFixed(2).replace('.', ','); };
  var linkWhatsApp = function (numero, texto) { return 'https://wa.me/' + numero + '?text=' + encodeURIComponent(texto); };

  // BIG 1kg: R$ 32 com até 6 grátis, R$ 35 com 7 a 9 (cardápio Tradicional)
  function precoTradicional(t, nGratis) {
    return t.faixa && nGratis > t.faixa.ate ? t.faixa.acima : t.preco;
  }
  // extras = { frutas: [{nome, preco}], cobertura: 'nome' ou null }; frutas somam ao preço do tamanho
  function itemTradicional(t, escolhidos, extras) {
    extras = extras || {};
    var frutas = extras.frutas || [], cob = extras.cobertura || null;
    var detalhe = [escolhidos.length ? 'Grátis: ' + escolhidos.join(', ') : 'Sem acompanhamentos'];
    if (frutas.length) detalhe.push('Frutas: ' + frutas.map(function (f) { return f.nome; }).join(', '));
    if (cob) detalhe.push('Cobertura: ' + cob);
    var preco = precoTradicional(t, escolhidos.length) + frutas.reduce(function (s, f) { return s + f.preco; }, 0);
    return {
      key: 'trad|' + t.id + '|' + escolhidos.join(',') + '|' + frutas.map(function (f) { return f.nome; }).join(',') + '|' + (cob || ''),
      nome: 'Açaí ' + t.nome + ' tradicional',
      detalhe: detalhe,
      preco: Math.round(preco * 100) / 100,
    };
  }

  // item = { key, nome, detalhe: [], preco, qtd }
  function adicionar(itens, item) {
    var ex = itens.find(function (i) { return i.key === item.key; });
    if (ex) ex.qtd = Math.min(MAX_QTD, ex.qtd + 1);
    else itens.push(Object.assign({ detalhe: [] }, item, { qtd: 1 }));
    return itens;
  }
  function mudarQtd(itens, key, delta) {
    var i = itens.findIndex(function (x) { return x.key === key; });
    if (i < 0) return itens;
    itens[i].qtd = Math.min(MAX_QTD, itens[i].qtd + delta);
    if (itens[i].qtd <= 0) itens.splice(i, 1);
    return itens;
  }
  var total = function (itens) { return Math.round(itens.reduce(function (s, i) { return s + i.preco * i.qtd; }, 0) * 100) / 100; };
  var contar = function (itens) { return itens.reduce(function (s, i) { return s + i.qtd; }, 0); };

  // A sacola salva no navegador vem de fora do código: só aceita itens bem formados.
  function validar(raw) {
    if (!Array.isArray(raw)) return [];
    return raw.filter(function (i) {
      return i && typeof i.key === 'string' && typeof i.nome === 'string'
        && Number.isFinite(i.preco) && i.preco >= 0 && Number.isInteger(i.qtd) && i.qtd > 0 && i.qtd <= MAX_QTD
        && (i.detalhe === undefined || (Array.isArray(i.detalhe) && i.detalhe.every(function (d) { return typeof d === 'string'; })));
    }).map(function (i) {
      return { key: i.key, nome: i.nome.slice(0, 120), detalhe: (i.detalhe || []).map(function (d) { return d.slice(0, 300); }), preco: i.preco, qtd: i.qtd };
    });
  }

  function mensagem(itens, cliente) {
    cliente = cliente || {};
    var l = ['Olá, Recanto do Açaí! Quero fazer este pedido:', ''];
    itens.forEach(function (i) {
      l.push('*' + i.qtd + 'x ' + i.nome + '* (' + brl(i.preco * i.qtd) + ')');
      i.detalhe.forEach(function (d) { l.push('   ' + d); });
    });
    l.push('', '*Total: ' + brl(total(itens)) + '*');
    if (cliente.nome) l.push('', 'Nome: ' + cliente.nome);
    if (cliente.entrega) l.push(cliente.entrega === 'delivery' ? 'Entrega: delivery' + (cliente.endereco ? ', ' + cliente.endereco : '') : 'Vou retirar na loja.');
    return l.join('\n');
  }

  return { MAX_QTD: MAX_QTD, brl: brl, linkWhatsApp: linkWhatsApp, precoTradicional: precoTradicional, itemTradicional: itemTradicional,
    adicionar: adicionar, mudarQtd: mudarQtd, total: total, contar: contar, validar: validar, mensagem: mensagem };
});
