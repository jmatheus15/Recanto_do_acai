# PROMPTS VISUAIS: Recanto do Açaí

Guia de produção das imagens e vídeos do site. Eles serão gerados por outra IA (não Higgsfield). Os prompts estão em inglês porque os geradores rendem melhor assim. Toda imagem gerada fica no ar só até existir uma foto real equivalente.

## Andamento (10/11/2026)

- Geradas e no site: IMG-01 (hero computador, com o fundo estendido para cima), IMG-02 (hero celular), IMG-03 a IMG-08 (cardápio), IMG-13 (galeria).
- Geradas e guardadas para o vídeo: quadro inicial do VID-01 e quadros inicial e final do VID-02, em `producao/imagens/_entregues/`.
- Vídeos gerados no Flow (Veo 3.1) e no site: VID-01 no hero do computador (rolagem; o corte seco aos 4 s virou uma dissolvência de 0,33 s; 6,6 MB) e VID-02 em loop de ida e volta na chamada final (1,4 MB, só no computador).
- O Veo aproximou a câmera em relação aos quadros enviados; o site compensa mostrando o vídeo em 82% da altura, com as bordas se dissolvendo.
- Ajuste para uma próxima rodada: em IMG-01, IMG-02 e IMG-07 a granola saiu parecida com nozes, e nozes não estão no cardápio.

## Regras que valem para TODOS os prompts

1. Terminar sempre com: `No text, no logos, no lettering, no brand names, no watermarks anywhere.` Logo, preços e frases entram pelo site.
2. O copo do Recanto é um **copo descartável de PET transparente, liso, sem estampa**, levemente cônico (boca mais larga que a base). Nos produtos "no copo" ele aparece com **tampa bolha transparente**.
3. O açaí do Recanto é **roxo bem escuro, quase berinjela, cremoso e fosco com leve brilho** (veja as fotos reais). Nunca rosa, nunca lilás claro, nunca líquido.
4. A mesa real da loja é de **tábuas de madeira marrom quente, envernizada, com marcas de uso**. Use essa madeira sempre que houver mesa.
5. Luz da marca: chave quente de estúdio + contra luz suave **roxo/magenta** (cores do logo `#830B95` e `#BE1B79`). Fundo sempre em **roxo berinjela profundo**, nunca preto puro.
6. Não gerar a fachada, o salão ou pessoas da loja. O estabelecimento só entra no site com foto real.
7. Inspecione cada resultado: marcas registradas inventadas, ingredientes errados, copo com estampa, açaí na cor errada. Re-gere se aparecer qualquer um.

## Materiais que JÁ EXISTEM (reais)

| Arquivo original | Versão para o site | Uso |
|---|---|---|
| `logo/logorecantoacai.jpg` | `assets/images/brand/logo-512.png`, `logo-192.png`, `logo-64.png` | navegação, sobre, rodapé, favicon |
| `imagens/coponinhotela.png` | `assets/images/products/ninhotella.webp` | cardápio, galeria, hero provisório, referência |
| `imagens/coponinhosplash.png` | `assets/images/products/ninho-splash.webp` | cardápio, galeria, hero provisório, referência |
| `imagens/copotraidiconal.png` | `assets/images/products/completao.webp` | cardápio, galeria, hero provisório, referência |
| `imagens/acai p m g.png` | `assets/images/products/tradicional-p/m/g.webp` (miniaturas) | cardápio, referência |
| `imagens/cardapiotradicional.png`, `acainocopo.png`, `tigelasefrutas.png` | `assets/images/menu/*.webp` | galeria (cardápio ampliável), fonte dos preços |
| `identidade visual/instagram.png` | (não publicado) | fonte de endereço, contato e serviços |

Vídeos reais: nenhum. Fotos do estabelecimento: nenhuma (pedir ao dono, ver o fim deste arquivo).

## Organização das pastas

```
assets/
  images/
    brand/         logo recortado (EXISTE)
    hero/          IMG-01, IMG-02 (PRODUZIR)
    products/      fotos reais (EXISTE) + IMG-03 a IMG-08 (PRODUZIR)
    gallery/       IMG-13 (PRODUZIR)
    environment/   fotos reais da loja (PEDIR AO DONO)
    menu/          cardápios em arte (EXISTE)
  videos/
    hero/          VID-01 (PRODUZIR)
    products/      VID-02 (PRODUZIR)
```

Nomes finais esperados estão em cada item. Ao entregar um arquivo, basta colocar na pasta com esse nome e me avisar: eu processo (tamanho web, compressão, encode de scrub) e ligo no site.

---

# IMAGENS

## IMG-01: Pôster do hero (desktop, 16:9)

- **Objetivo:** imagem de repouso do hero e quadro final do vídeo VID-01. Aparece enquanto o vídeo carrega e no lugar dele se ele falhar.
- **Arquivo final:** `assets/images/hero/hero-poster.jpg` (2560×1440 ou maior)
- **Referências a anexar:** `imagens/copotraidiconal.png` (textura e cor real do açaí em copo), `imagens/coponinhosplash.png` (madeira real da mesa e copo PET), `logo/logorecantoacai.jpg` (só para a paleta, nunca para aparecer na imagem).
- **Prompt:**
```
Advertising food photograph, 16:9. A single clear smooth PET plastic cup,
slightly tapered, with no print and no lid, filled to just above the rim
with thick, dense, deep aubergine-purple açaí sorbet, matte with a soft
satin sheen, shaped into soft creamy peaks. On top: four fresh banana
slices, three halved red strawberries with visible seeds and pale centers,
a small scatter of golden toasted granola clusters, and a light even
dusting of powdered milk catching the light. A few granola crumbs and one
banana slice rest on the table beside the base. The cup stands on warm
brown varnished wooden planks with fine scratches, placed at the right
third of the frame, the full cup visible with generous margin above and
below. Camera at the cup's mid height, 50mm, eye level, very slight
downward angle. Lighting: warm softbox key from upper left, a soft violet
and magenta rim light from behind right outlining the cup edge, gentle
caustic glow on the wood through the plastic. Background: a deep
aubergine-plum studio backdrop that falls off smoothly into soft shadow
across the left half of the frame, a continuous calm surface for a
headline, with faint out-of-focus violet bokeh. Shallow depth of field,
crisp focus on the toppings, condensation micro-droplets on the cup.
Photorealistic, high-end commercial food photography, rich color, no
plastic CGI look. No text, no logos, no lettering, no brand names, no
watermarks anywhere.
```
- **Restrições:** o açaí não pode ficar rosa nem líquido; o copo não pode ter estampa, canudo ou tampa; nada de cobertura de chocolate (não faz parte da cena); a metade esquerda precisa ficar calma para o título.

## IMG-02: Hero do celular (9:16)

- **Objetivo:** hero estático no celular, que não roda o vídeo de scroll.
- **Arquivo final:** `assets/images/hero/hero-mobile.jpg` (1440×2560)
- **Referências:** IMG-01 aprovada (para manter o mesmo copo, a mesma luz e os mesmos ingredientes).
- **Prompt:**
```
Vertical 9:16 version of the same advertising scene as the reference
image: the same clear PET cup of deep aubergine-purple açaí with banana
slices, halved strawberries, granola and a dusting of powdered milk, on
the same warm brown varnished wooden planks, the same warm key light and
violet-magenta rim light. The cup sits in the lower half of the frame,
centered, its base about 12 percent above the bottom edge. The upper 45
percent of the frame is a calm continuous deep aubergine-plum backdrop
with soft violet bokeh, a smooth surface for a headline. Photorealistic
commercial food photography. No text, no logos, no lettering, no brand
names, no watermarks anywhere.
```
- **Restrições:** mesmas da IMG-01; o copo precisa ser o mesmo da IMG-01.

## IMG-03: Ninhotella (produto)

- **Objetivo:** foto do cardápio e da galeria, substituindo o print atual.
- **Arquivo final:** `assets/images/products/ninhotella-pro.jpg` (1600×2000, 4:5)
- **Referências:** `imagens/coponinhotela.png` (produto real: camadas, tampa bolha, canudos wafer).
- **Prompt:**
```
Advertising product photograph, 4:5 vertical. One clear PET cup with a
clear dome lid, the exact layered dessert from the reference: alternating
thick layers of glossy chocolate hazelnut cream and fluffy sweet milk
cream, a layer of dense dark açaí visible near the bottom, sweetened
condensed milk ribbons between layers, and on top under the dome a
mound of powdered-milk cream with two rolled wafer straws lying across
it. The cup stands slightly left of center on warm brown varnished
wooden planks. Lighting: soft warm key from the left, violet-magenta rim
light from behind, subtle reflections on the dome. Background: deep
aubergine-plum backdrop with soft out-of-focus violet bokeh. Condensation
droplets on the cup. 85mm, eye level, shallow depth of field.
Photorealistic, appetizing, commercial quality. No text, no logos, no
lettering, no brand names, no watermarks anywhere.
```
- **Restrições:** manter a ordem e as cores das camadas da foto real; não acrescentar frutas, granola ou calda por fora.

## IMG-04: Ninho Splash (produto)

- **Arquivo final:** `assets/images/products/ninho-splash-pro.jpg` (4:5)
- **Referências:** `imagens/coponinhosplash.png`.
- **Prompt:**
```
Advertising product photograph, 4:5 vertical. One clear PET cup filled
with layers of fluffy white powdered-milk cream, translucent ribbons of
sweetened condensed milk and streaks of deep aubergine açaí pressed
against the cup wall, exactly as in the reference, topped with a flat
generous layer of powdered milk filling the rim. The cup stands on warm
brown varnished wooden planks, centered. Lighting: soft warm key from
upper left, violet-magenta rim light behind, the white cream glowing
softly. Background: deep aubergine-plum backdrop with violet bokeh. 85mm,
eye level, shallow depth of field, condensation droplets. Photorealistic
commercial food photography. No text, no logos, no lettering, no brand
names, no watermarks anywhere.
```
- **Restrições:** sem tampa (a foto real não tem); sem frutas; o freezer do fundo da foto real não deve aparecer.

## IMG-05: Completão (produto)

- **Arquivo final:** `assets/images/products/completao-pro.jpg` (4:5)
- **Referências:** `imagens/copotraidiconal.png`.
- **Prompt:**
```
Advertising product photograph, 4:5 vertical. Two clear PET cups with
clear dome lids, layered exactly as the reference: dense deep aubergine
açaí, a layer of sweetened condensed milk with crushed peanuts and
granola, a layer with colorful candy-coated chocolate lentils pressed
against the wall, more açaí, and a granola base. The cups stand on a
light bamboo board on top of warm brown wooden planks, the front cup
sharp, the second cup slightly behind and right. Colorful candy-coated
chocolate lentils scattered on the board. Lighting: warm soft key from
the left, violet-magenta rim light behind. Background: deep aubergine-plum
backdrop with violet bokeh, no packaging, no boxes. 70mm, slightly above
eye level, shallow depth of field. Photorealistic commercial food
photography. No text, no logos, no lettering, no brand names, no
watermarks anywhere.
```
- **Restrições:** as pastilhas coloridas não podem ter letras impressas; nenhuma caixa ou embalagem de fornecedor ao fundo.

## IMG-06: Açaí Tradicional na marmita

- **Arquivo final:** `assets/images/products/tradicional-pro.jpg` (4:3)
- **Referências:** `imagens/acai p m g.png` (montagem real: marmita de isopor branca com açaí, banana, granola, chocoball, M&M, canudo wafer).
- **Prompt:**
```
Advertising food photograph, 4:3, top-down at 60 degrees. An open white
foam takeaway container filled with deep aubergine açaí, the toppings
arranged in neat diagonal stripes exactly like the reference: banana
slices, golden granola, chocolate cereal balls, colorful candy-coated
chocolate lentils, crushed peanuts, powdered milk, and two rolled wafer
straws. The container rests on warm brown varnished wooden planks.
Lighting: warm soft key from the top left, gentle violet rim light,
crisp detail on every topping. Background falls into deep aubergine
shadow at the edges. Photorealistic commercial food photography. No
text, no logos, no lettering, no brand names, no watermarks anywhere.
```
- **Restrições:** a marmita é de isopor branca simples; manter as faixas diagonais de acompanhamentos.

## IMG-07: Tigela

- **Arquivo final:** `assets/images/products/tigela-pro.jpg` (4:3)
- **Referências:** `imagens/tigelasefrutas.png` (miniaturas das tigelas: tigela azul-violeta, açaí, banana, granola, M&M, canudo).
- **Prompt:**
```
Advertising food photograph, 4:3, 45 degree angle. A wide violet-blue
ceramic bowl filled with deep aubergine açaí, topped with banana slices
fanned in a row, golden granola, crushed peanuts, chocolate cereal balls,
colorful candy-coated chocolate lentils, a dusting of powdered milk and a
drizzle of sweetened condensed milk, one rolled wafer straw standing in
it. The bowl sits on warm brown varnished wooden planks. Warm soft key
light, violet-magenta rim light, deep aubergine-plum background with
bokeh. Photorealistic commercial food photography. No text, no logos, no
lettering, no brand names, no watermarks anywhere.
```

## IMG-08: Taça Napolitano (destaque das taças)

- **Arquivo final:** `assets/images/products/taca-napolitano-pro.jpg` (4:5)
- **Referências:** `imagens/tigelasefrutas.png` (miniatura da Taça Napolitano).
- **Prompt:**
```
Advertising dessert photograph, 4:5 vertical. A tall clear glass sundae
goblet layered with strawberry cream, powdered-milk cream and white
chocolate pieces, topped with a scoop of three-flavor neapolitan ice
cream (strawberry, vanilla, chocolate) coated in crushed peanuts, fresh
halved strawberries and two rolled wafer straws. On warm brown varnished
wooden planks. Warm soft key light, violet-magenta rim light, deep
aubergine-plum background with bokeh. Photorealistic commercial food
photography. No text, no logos, no lettering, no brand names, no
watermarks anywhere.
```
- **Restrições:** sem embalagens de chocolate de marca; os pedaços de chocolate branco aparecem sem papel.

## IMG-13: Galeria, copo no fim de tarde

- **Objetivo:** mosaico da galeria, no clima da foto real do Ninhotella na calçada.
- **Arquivo final:** `assets/images/gallery/fim-de-tarde.jpg` (4:5)
- **Referências:** `imagens/coponinhotela.png` (cenário real: mesa de madeira, rua, céu de fim de tarde).
- **Prompt:**
```
Lifestyle food photograph, 4:5 vertical. One clear PET cup with a clear
dome lid, layered deep aubergine açaí, powdered-milk cream and
condensed-milk ribbons, two rolled wafer straws on top, standing on a
warm brown wooden table outdoors at golden hour. Behind it, softly out of
focus, a quiet small-town street with low white walls and a warm
dusk sky with violet clouds. Warm low sun from the right creating a rim
light on the cup and a long soft shadow. No people. 50mm, shallow depth of
field. Photorealistic. No text, no logos, no lettering, no brand names, no
watermarks anywhere.
```
- **Restrições:** sem pessoas, sem fachadas com placas, sem carros em destaque.

---

# VÍDEOS

Cada vídeo usa dois frames (inicial e final) gerados primeiro como imagem, depois a IA de vídeo anima entre eles. Gerar em **1080p, 6 segundos, 24 ou 30 fps, sem áudio**. Não gerar em 4K.

## VID-01: Hero "A queda" (controlado pelo scroll)

- **Objetivo:** vídeo do hero que avança quando o visitante rola para baixo e volta quando rola para cima. Rolar para baixo é ver o açaí cair e o copo encher.
- **Arquivo final:** `assets/videos/hero/hero-raw.mp4` (eu faço o encode de scrub e extraio o pôster).
- **Referências:** IMG-01 aprovada (é o frame final).

### PROMPT 1: FRAME INICIAL
```
Advertising food photograph, 16:9, identical camera, lens, lighting and
set to the reference image: the same clear smooth PET cup, slightly
tapered, no print, no lid, standing EMPTY at the right third of the frame
on the same warm brown varnished wooden planks. From the top edge of the
frame, a thick glossy ribbon of deep aubergine-purple açaí sorbet falls
straight down into the cup, its leading end just reaching the bottom of
the cup and beginning to fold onto itself. The same warm softbox key from
upper left, the same violet and magenta rim light from behind right, the
same deep aubergine-plum backdrop falling into soft shadow across the
left half of the frame with faint violet bokeh. No toppings anywhere yet,
the table clean. Photorealistic, high-end commercial food photography. No
text, no logos, no lettering, no brand names, no watermarks anywhere.
```

### PROMPT 2: FRAME FINAL
Usar a **IMG-01 aprovada** sem alteração. Se for preciso gerar de novo, usar o prompt da IMG-01.

### PROMPT DE ANIMAÇÃO
```
One continuous shot, no cuts, 6 seconds. Locked-off camera with a very
slow, barely perceptible crane down of about 3 percent so the move reads
as descending. 0.0 to 2.5 s: the thick ribbon of deep aubergine açaí pours
straight down the center of the cup, folding into soft creamy coils that
stack up and fill the cup to just above the rim, the stream thinning and
detaching from above at 2.5 s. 2.5 to 4.0 s: banana slices and halved
strawberries drop one by one from above the frame straight into the açaí,
each landing with a small soft settle, keeping their exact shape and
color. 4.0 to 5.0 s: a few golden granola clusters fall and settle, two
crumbs bounce onto the wood. 5.0 to 5.6 s: a fine veil of powdered milk
sifts down from above and dusts the top evenly. 5.6 to 6.0 s: everything
at rest, the composition matching the final frame exactly. Physics: the
açaí behaves like a thick cold sorbet, heavy and slow, never splashing
like liquid; fruit pieces are rigid. Lighting stays constant, the violet
rim light glints on the cup edge as it fills, condensation appears gently
on the plastic. The cup never moves, never changes shape, never gains a
print or lid. No morphing, no objects appearing from nowhere, no text or
lettering anywhere.
```
- **Restrições:** sem respingo líquido, sem mão aparecendo, sem mudança na cor do açaí, sem câmera girando (o scroll precisa ler como descida).

## VID-02: Taça com calda (fundo da chamada final, em loop)

- **Objetivo:** fundo animado discreto da seção "Bateu a vontade?", tocando em loop sem som, atrás de um véu escuro.
- **Arquivo final:** `assets/videos/products/cta-loop-raw.mp4`
- **Referências:** `imagens/tigelasefrutas.png` (taças reais com calda de chocolate escorrendo).

### PROMPT 1: FRAME INICIAL
```
Advertising dessert photograph, 16:9. A clear glass sundae goblet on warm
brown varnished wooden planks, centered in the right half of the frame,
filled with layers of deep aubergine açaí and powdered-milk cream, topped
with a halved strawberry and a rolled wafer straw. A thin stream of glossy
chocolate hazelnut sauce has just started to fall from above the frame
onto the top of the dessert. Warm soft key light from upper left, violet
and magenta rim light behind, deep aubergine-plum backdrop in soft shadow
across the left half. Photorealistic commercial food photography. No
text, no logos, no lettering, no brand names, no watermarks anywhere.
```

### PROMPT 2: FRAME FINAL
```
The same goblet, same camera, same light and same set as the start frame:
the chocolate hazelnut sauce now coats the top of the dessert and runs
in three glossy drips down the outside of the glass, the stream from above
thinned to nothing. The halved strawberry and wafer straw in the same
positions. Photorealistic commercial food photography. No text, no logos,
no lettering, no brand names, no watermarks anywhere.
```

### PROMPT DE ANIMAÇÃO
```
One continuous shot, no cuts, 6 seconds, locked-off camera with a very
slow push in of about 4 percent. The thin stream of glossy chocolate
hazelnut sauce falls steadily onto the top of the dessert, spreads over
it and forms three slow drips that run down the outside of the glass,
viscous and heavy, never splashing. The stream thins and stops at 5 s.
The strawberry and wafer straw stay perfectly still and unchanged. Light
constant, the violet rim light glints along the drips. No morphing, no new
objects, no text or lettering anywhere.
```
- **Restrições:** a calda escorre por fora do vidro em três fios, sem pingar na mesa; a taça não pode mudar de forma.

---

# O QUE NÃO SE GERA: pedir ao dono

Fotos reais, de celular mesmo, com boa luz:

1. Fachada da loja com a placa (de dia).
2. Balcão e self-service.
3. Atendentes montando um copo (com autorização de quem aparece).
4. Três a cinco produtos novos na mesa de madeira, de lado e de cima.
5. Horário de funcionamento e cidade, para o rodapé.
