// Rode com: node tests/pedido.test.mjs
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const P = require('../assets/js/pedido.js');
const D = require('../assets/js/dados.js');

const T = Object.fromEntries(D.TRADICIONAL.tamanhos.map((t) => [t.id, t]));

// preços do cardápio Tradicional
assert.deepEqual(D.TRADICIONAL.tamanhos.map((t) => P.precoTradicional(t, 0)), [8, 10, 15, 20, 32]);
// BIG 1kg: 32 até 6 grátis, 35 de 7 a 9
assert.equal(P.precoTradicional(T.BIG, 6), 32);
assert.equal(P.precoTradicional(T.BIG, 7), 35);
assert.equal(P.precoTradicional(T.G, 9), 15, 'grátis não muda o preço dos outros tamanhos');
assert.equal(D.TRADICIONAL.gratis.length, 9);

const g = P.itemTradicional(T.G, ['Granola', 'Leite em pó']);
assert.equal(g.nome, 'Açaí G tradicional');
assert.equal(g.preco, 15);
assert.deepEqual(g.detalhe, ['Grátis: Granola, Leite em pó']);
assert.notEqual(g.key, P.itemTradicional(T.G, ['Granola']).key, 'escolhas diferentes viram itens diferentes');

// frutas somam ao preço (banana 0, morango 1,50, kiwi 4); cobertura vai na descrição
const F = Object.fromEntries(D.TRADICIONAL.frutas.map((f) => [f.nome.split(' ')[0], f]));
const comFruta = P.itemTradicional(T.M, ['Granola'], { frutas: [F.Banana, F.Morango, F.Kiwi], cobertura: 'Chocolate' });
assert.equal(comFruta.preco, 10 + 0 + 1.5 + 4);
assert.deepEqual(comFruta.detalhe, ['Grátis: Granola', 'Frutas: Banana, Morango, Kiwi (fruta completa)', 'Cobertura: Chocolate']);
assert.equal(P.itemTradicional(T.BIG, D.TRADICIONAL.gratis.slice(0, 7), { frutas: [F.Morango] }).preco, 36.5, 'BIG 35 + morango 1,50');
assert.notEqual(comFruta.key, P.itemTradicional(T.M, ['Granola'], { frutas: [F.Banana] }).key);
assert.equal(D.TRADICIONAL.coberturas.length, 6);

// sacola
const s = [];
P.adicionar(s, { key: 'copo|Ninhotella|400ml', nome: 'Ninhotella 400ml', preco: 17.99 });
P.adicionar(s, { key: 'copo|Ninhotella|400ml', nome: 'Ninhotella 400ml', preco: 17.99 });
P.adicionar(s, g);
assert.equal(P.contar(s), 3);
assert.equal(P.total(s), 50.98);
P.mudarQtd(s, 'copo|Ninhotella|400ml', -2);
assert.equal(s.length, 1);
for (let i = 0; i < 30; i++) P.mudarQtd(s, g.key, 1);
assert.equal(s[0].qtd, P.MAX_QTD, 'quantidade tem teto');

// sacola salva no navegador: lixo é descartado
assert.deepEqual(P.validar('x'), []);
assert.equal(P.validar([{ key: 'a', nome: 'A', preco: 5, qtd: 1 }, { key: 'b', nome: 'B', preco: -1, qtd: 1 }, { key: 'c', nome: 'C', preco: 2, qtd: 1.5 }, null]).length, 1);

// mensagem
const msg = P.mensagem([{ key: 'k', nome: 'Ninhotella 400ml', detalhe: [], preco: 17.99, qtd: 2 }, { ...g, qtd: 1 }], { nome: 'Ana', entrega: 'delivery', endereco: 'Rua A, 12' });
assert.match(msg, /\*2x Ninhotella 400ml\* \(R\$ 35,98\)/);
assert.match(msg, /Grátis: Granola, Leite em pó/);
assert.match(msg, /Total: R\$ 50,98/);
assert.match(msg, /Entrega: delivery, Rua A, 12/);
assert.ok(!/undefined/.test(msg));

// todo destaque do balcão existe no cardápio
for (const d of D.DESTAQUES) assert.ok(D.CARDAPIO.find((c) => c.id === d.cat).itens.some((i) => i.nome === d.item), d.item);

console.log('ok: todos os testes de pedido e sacola passaram');
