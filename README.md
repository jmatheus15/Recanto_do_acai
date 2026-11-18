# Recanto do Açaí

Site do Recanto do Açaí: cardápio com busca, "Monte o seu" com copo animado, sacola que vira pedido no WhatsApp e um topo em que o açaí se monta conforme a rolagem.

Feito com a skill "site de 10k": `index.html` + `assets/`, com HTML, CSS e JavaScript puros, sem build e sem bibliotecas. As decisões de design e os textos estão em `docs/PACOTE_DE_DESIGN.md`.

## Ver no computador

- **Com dois cliques no `index.html`:** o site abre completo, com a foto do copo no lugar do vídeo.
- **Para ver o vídeo que avança com a rolagem:** rode um servidor local e abra http://localhost:5173.

```bash
npx http-server -p 5173 -c-1
```

## Onde mudar cada coisa

| O quê | Arquivo |
|---|---|
| Preços, produtos, fotos, destaques, frutas, coberturas e contato | `assets/js/dados.js` |
| Regra de preço do tradicional, sacola e mensagem do WhatsApp | `assets/js/pedido.js` |
| Desenho do copo do "Monte o seu" | `assets/js/copo2d.js` |
| Comportamento da página (busca, categorias, hero) | `assets/js/site.js` |
| Cores, fontes e espaçamentos | `assets/css/site.css` (`:root`) |
| Textos da página | `index.html` |

## Vídeos do topo

- **Computador:** `assets/videos/hero/hero-scrub.mp4`, 1600px, 7,3 MB.
- **Celular:** `assets/videos/hero/hero-scrub-mobile.mp4`, recortado no copo, 2,6 MB.
- Os dois usam um quadro-chave a cada 8 quadros e não têm áudio.
- Quem usa "movimento reduzido" ou "economia de dados" vê a foto parada.

## Publicação

Hospedado na Vercel a partir deste repositório. É um site estático, sem build: cada envio para a branch `main` publica de novo.

## Testes

```bash
node tests/pedido.test.mjs
```

Esse teste confere os preços do tradicional (inclusive BIG 1kg e frutas), a sacola e a mensagem do WhatsApp.

## Dados provisórios

- O horário de funcionamento não foi informado. O site mostra "consulte no WhatsApp".
- A regra de uma cobertura no tradicional segue o cardápio das tigelas e ainda precisa ser confirmada com a loja.
