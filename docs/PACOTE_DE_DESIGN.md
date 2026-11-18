# Pacote de Design v3: Recanto do Açaí, "Pede fácil"

Refeito do zero em 17/11/2026 com a skill "site de 10k". O cliente pediu um site moderno e fácil de usar e deixou as decisões de design comigo. Imagens e vídeos são os já gerados pelo cliente em outra IA (Higgsfield proibido). Todo texto daqui embarca ao pé da letra.

O que a v2 errou e esta corrige:
- O vídeo do hero ficou pequeno no canto, deixando um vazio escuro enorme. Agora ele ocupa a tela toda, logo abaixo do menu.
- O espaço entre seções era grande demais. Agora é compacto.
- O cardápio em abas escondia os produtos. Agora fica numa página só, com busca e categorias fixas no topo, como os apps de pedido.

## 1. Premissa

**"Pede fácil."** O cliente chega com vontade e quer resolver em segundos: ver, escolher, mandar. Abrimos com o vídeo do açaí enchendo o copo, que dá a vontade. Logo abaixo vem um cardápio que funciona como app: busca, categorias e botão de adicionar em todo item. Tudo afunila para uma única chamada, **Pedir pelo WhatsApp**: a sacola vira uma mensagem pronta.

## 2. Paleta

O topo e o fim da página são noturnos, como a filmagem. O cardápio é claro, para ler e escolher sem esforço.

Desvio dito em voz alta: a área clara é um lilás muito suave tirado do roxo do logo, não creme. Ela existe pela legibilidade dos preços e das descrições.

```css
:root{
  --night:#22061e; --night-2:#2f0a2c; --plum:#510861; --purple:#830b95; --magenta:#be1b79;
  --accent:#fdc93e; --accent-hover:#ffd96b;
  --paper:#f7f0f8; --card:#ffffff; --ink:#2a0626; --ink-2:#6e4f72; --line-light:#e7d9ea;
  --text-on-dark:#fbf2fc; --muted-on-dark:#d8c2dc;
}
```

## 3. Trio de fontes

Baloo 2 (700/800) para títulos, Plus Jakarta Sans (400/600/700) para texto e DM Mono (500) para preços e rótulos.

## 4. Elemento assinatura

**A etiqueta de preço em pincelada amarela** dos cardápios da loja. Ela aparece nos preços dos destaques, no preço do "Monte o seu" e sob uma palavra de cada título, e se desenha ao entrar na tela.

## 5. Hero (vídeo VID-03, 340vh de rolagem; trocado em 17/11/2026)

| Faixa | Intervalo | Filmagem | Texto | Entrada |
|---|---|---|---|---|
| 1 | 0.00 a 0.34 | ingredientes flutuando em coluna, começam a cair no copo | "Açaí cremoso, montado camada por camada." | deriva para baixo |
| 2 | 0.38 a 0.70 | camadas assentam, frutas pousam | "Granola, creme, frutas. Você escolhe tudo." | dispersão |
| 3 | 0.74 a 1.00 | leite em pó assenta, copo pronto em repouso | "Escolhe o seu. A gente prepara." + subtítulo + botões | subida |

Subtítulo: "9 acompanhamentos grátis no tradicional. Retirada em 10 minutos."
Botões: "Ver o cardápio" e "Pedir pelo WhatsApp".

O hero estático (celular, movimento reduzido, arquivo aberto com dois cliques) usa a foto do copo, com o mesmo título, subtítulo e botões.

## 6. Abaixo da dobra

1. **Faixa de fatos** (escura, logo após o hero): "Retirada em 10 min" · "9 grátis no tradicional" · "Delivery e self-service".
2. **Destaques da casa** (escura, cartões com foto em linha que rola para o lado): título "Destaques da casa."; Ninhotella, Ninho Splash, Completão e Taça Napolitano, cada um com foto, nome, "a partir de" e "Adicionar".
3. **Cardápio** (clara, numa página só):
   - título "Cardápio." e busca "Buscar no cardápio";
   - categorias fixas no topo: Açaí no Copo, Monte o seu, Tigelas e Frutas, Taças, Batidas;
   - cada item com miniatura (foto ou monograma), nome, descrição, tamanhos, preço e "+";
   - sem resultado na busca: "Não achamos isso no cardápio. Tenta outra palavra ou chama no WhatsApp."
4. **Monte o seu** (o momento interativo, dentro do cardápio, como a categoria do Tradicional):
   - título "Monte o seu tradicional.";
   - instrução "Arrasta para escolher o tamanho e marca os grátis.";
   - controle P, M, G, GG, BIG 1kg; a foto cresce com o tamanho e o preço real fica na pincelada;
   - os 9 grátis; botão "Adicionar Açaí G à sacola". No BIG 1kg, R$ 32 com até 6 grátis e R$ 35 com 7 a 9.
5. **Como pedir** (escura, três passos):
   - título "Pedir é rapidinho.";
   - "Escolhe" / "Toca no + do que você quiser. Vai tudo para a sacola.";
   - "Manda" / "A sacola vira uma mensagem pronta no nosso WhatsApp. Você confere e envia.";
   - "Pega" / "Retirada em 10 minutos, ou a gente leva até você."
6. **Perguntas** (clara): título "Perguntas de quem vai pedir.", com as mesmas respostas reais da v2: grátis, tempo, entrega, tigela e taça para levar, endereço e horário a confirmar.
7. **Prova** (escura, fotos reais em leque): kicker "De verdade"; título "Fotos da nossa mesa."; texto "O Recanto fica na Principal da Linha de Ferro, perto do Mercado de Valdênio. Mais de 4.700 pessoas acompanham a gente no Instagram."
8. **Chamada final** (vídeo VID-02 em loop): título "Bateu a vontade? Chama no WhatsApp."; texto "Delivery, retirada em 10 minutos ou self-service na loja."; botão "Pedir pelo WhatsApp".
9. **Rodapé**: logo, links, WhatsApp, Instagram, endereço, "Horário: consulte no WhatsApp", direitos.

Formulário final: a sacola (nome, retirada ou delivery, endereço). Destino dito no botão: o WhatsApp da loja.

## 7. Movimento

Uma entrada por momento, com easing. A pincelada se desenha ao entrar. O ambiente noturno fica fixo atrás de tudo. A barra de categorias acompanha a rolagem. Nada estala, e o movimento reduzido é honrado.

## 8. Engenharia

`index.html` + `assets/` com JS clássico, abrindo com dois cliques no hero estático. O hero segue o padrão de scrub da skill. Gate de texto antes de mostrar.
