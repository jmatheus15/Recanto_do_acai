// Fonte única dos dados comerciais, lidos dos cardápios em arte (imagens/) e do Instagram.
// Para mudar um preço, mude só aqui. Gerado a partir do cardápio aprovado em 10/11/2026.
(function (root, dados) {
  if (typeof module === 'object' && module.exports) module.exports = dados;
  else root.RECANTO = dados;
})(this, {
  "CONTATO": {
    "whatsapp": "5583996723523",
    "whatsappLabel": "(83) 9 9672-3523",
    "instagram": "recanto_do_acaipb",
    "endereco": "Principal da Linha de Ferro, próximo ao Mercado de Valdênio",
    "servicos": [
      "Delivery",
      "Retirada",
      "Self-service"
    ],
    "horario": null
  },
  "MIDIA": {
    "heroVideo": "assets/videos/hero/hero-scrub.mp4",
    "heroVideoBytes": 7255881,
    "heroPoster": "assets/images/hero/hero-scrub-poster.webp"
  },
  "DESTAQUES": [
    {
      "cat": "copo",
      "item": "Ninhotella",
      "foto": "assets/images/products/ninhotella-pro.webp",
      "alt": "Copo de Ninhotella com camadas de Nutella e creme de ninho e canudos wafer"
    },
    {
      "cat": "copo",
      "item": "Ninho Splash",
      "foto": "assets/images/products/ninho-splash-pro.webp",
      "alt": "Copo de Ninho Splash com creme de ninho, leite condensado e açaí"
    },
    {
      "cat": "copo",
      "item": "Completão",
      "foto": "assets/images/products/completao-pro.webp",
      "alt": "Copos de Completão com açaí, leite condensado, granola e confeitos coloridos"
    },
    {
      "cat": "tacas",
      "item": "Taça Napolitano",
      "foto": "assets/images/products/taca-napolitano-pro.webp",
      "alt": "Taça Napolitano com sorvete napolitano, morangos, amendoim e canudos wafer"
    }
  ],
  "TRADICIONAL": {
    "foto": "assets/images/products/tradicional-pro.webp",
    "alt": "Açaí tradicional na marmita com banana, granola, chocoball, confeitos e leite em pó",
    "tamanhos": [
      {
        "id": "P",
        "nome": "P",
        "preco": 8,
        "escala": 0.6
      },
      {
        "id": "M",
        "nome": "M",
        "preco": 10,
        "escala": 0.7
      },
      {
        "id": "G",
        "nome": "G",
        "preco": 15,
        "escala": 0.8
      },
      {
        "id": "GG",
        "nome": "GG",
        "preco": 20,
        "escala": 0.9
      },
      {
        "id": "BIG",
        "nome": "BIG 1kg",
        "preco": 32,
        "escala": 1,
        "faixa": {
          "ate": 6,
          "acima": 35,
          "max": 9
        }
      }
    ],
    "gratis": [
      "Granola",
      "Leite em pó",
      "Amendoim triturado",
      "Gotas de chocolate",
      "Flocos de milho",
      "Canudos wafer",
      "Cereal ball",
      "M&M",
      "Chocoball"
    ],
    "frutas": [
      {
        "nome": "Banana",
        "preco": 0
      },
      {
        "nome": "Morango",
        "preco": 1.5
      },
      {
        "nome": "Kiwi (fruta completa)",
        "preco": 4
      }
    ],
    "coberturas": [
      "Leite condensado",
      "Frutas vermelhas",
      "Doce de leite",
      "Chocolate",
      "Morango",
      "Kiwi"
    ]
  },
  "CARDAPIO": [
    {
      "id": "copo",
      "nome": "Açaí no Copo",
      "nota": "Montados em camadas, no copo com tampa.",
      "itens": [
        {
          "nome": "Napolitano",
          "desc": "Açaí, creme de ninho, creme de morango e Nutella",
          "precos": [
            [
              "300ml",
              14.5
            ],
            [
              "400ml",
              16.5
            ],
            [
              "500ml",
              19.5
            ]
          ]
        },
        {
          "nome": "Ninho Splash",
          "desc": "Açaí, leite condensado e leite ninho",
          "precos": [
            [
              "300ml",
              10
            ],
            [
              "400ml",
              12
            ],
            [
              "500ml",
              18
            ]
          ],
          "foto": "assets/images/products/ninho-splash-pro.webp"
        },
        {
          "nome": "Ninhotella",
          "desc": "Açaí, Nutella, leite ninho e leite condensado",
          "precos": [
            [
              "300ml",
              15.99
            ],
            [
              "400ml",
              17.99
            ],
            [
              "500ml",
              20.99
            ]
          ],
          "foto": "assets/images/products/ninhotella-pro.webp"
        },
        {
          "nome": "Kit Kat Premium",
          "desc": "Nutella, Kit Kat, leite condensado, leite ninho e canudinho",
          "precos": [
            [
              "300ml",
              19
            ],
            [
              "400ml",
              22.99
            ],
            [
              "500ml",
              27.99
            ]
          ]
        },
        {
          "nome": "Chocolatudo",
          "desc": "Creme de leite ninho e Nutella",
          "precos": [
            [
              "300ml",
              16
            ],
            [
              "400ml",
              17.99
            ],
            [
              "500ml",
              20
            ]
          ]
        },
        {
          "nome": "Ninho de Ouro",
          "desc": "Creme de leitinho, Ouro Branco, leite ninho e leite condensado",
          "precos": [
            [
              "300ml",
              19.99
            ],
            [
              "400ml",
              22.99
            ],
            [
              "500ml",
              27.99
            ]
          ]
        },
        {
          "nome": "Completão",
          "desc": "Açaí, leite em pó, leite condensado, M&Ms, chocoball, amendoim triturado e granola",
          "precos": [
            [
              "300ml",
              7.99
            ],
            [
              "400ml",
              9.99
            ],
            [
              "500ml",
              12.99
            ]
          ],
          "foto": "assets/images/products/completao-pro.webp"
        },
        {
          "nome": "Tropical",
          "desc": "Açaí, Nutella, morango e leite condensado",
          "precos": [
            [
              "300ml",
              18
            ],
            [
              "400ml",
              21.99
            ],
            [
              "500ml",
              27.99
            ]
          ]
        },
        {
          "nome": "AçaíTella",
          "desc": "Açaí, leite condensado, paçoca e Nutella",
          "precos": [
            [
              "300ml",
              16
            ],
            [
              "400ml",
              17.99
            ],
            [
              "500ml",
              20
            ]
          ]
        },
        {
          "nome": "Moda da Casa",
          "desc": "Açaí, Nutella, paçoca, Ouro Branco e leite condensado",
          "precos": [
            [
              "300ml",
              18
            ],
            [
              "400ml",
              20
            ],
            [
              "500ml",
              25
            ]
          ]
        }
      ]
    },
    {
      "id": "tradicional",
      "nome": "Monte o seu",
      "nota": "Escolha seus acompanhamentos grátis. Retirada em apenas 10 minutos.",
      "itens": [
        {
          "nome": "Açaí P",
          "precos": [
            [
              "P",
              8
            ]
          ]
        },
        {
          "nome": "Açaí M",
          "precos": [
            [
              "M",
              10
            ]
          ]
        },
        {
          "nome": "Açaí G",
          "precos": [
            [
              "G",
              15
            ]
          ]
        },
        {
          "nome": "Açaí GG",
          "precos": [
            [
              "GG",
              20
            ]
          ]
        },
        {
          "nome": "BIG 1kg",
          "desc": "Com 6 ou com 9 acompanhamentos",
          "precos": [
            [
              "6 acomp.",
              32
            ],
            [
              "9 acomp.",
              35
            ]
          ]
        }
      ],
      "listas": [
        {
          "titulo": "Acompanhamentos grátis",
          "itens": [
            "Amendoim triturado",
            "Gotas de chocolate",
            "Flocos de milho",
            "Canudos wafer",
            "Cereal ball",
            "Leite em pó",
            "M&M",
            "Chocoball",
            "Granola"
          ]
        },
        {
          "titulo": "Coberturas",
          "itens": [
            "Leite condensado",
            "Frutas vermelhas",
            "Doce de leite",
            "Chocolate",
            "Morango",
            "Kiwi"
          ]
        }
      ]
    },
    {
      "id": "tigelas",
      "nome": "Tigelas e Frutas",
      "nota": "Valores apenas para consumo no local.",
      "itens": [
        {
          "nome": "Tigela P",
          "desc": "Amendoim, granola, M&M, chocoball, leite em pó, banana e uma cobertura da sua preferência",
          "precos": [
            [
              "P",
              8
            ]
          ],
          "foto": "assets/images/products/tigela-pro.webp"
        },
        {
          "nome": "Tigela M",
          "desc": "Amendoim, granola, M&M, chocoball, leite em pó, banana e uma cobertura da sua preferência",
          "precos": [
            [
              "M",
              10
            ]
          ],
          "foto": "assets/images/products/tigela-pro.webp"
        },
        {
          "nome": "Tigela G",
          "desc": "Amendoim, granola, M&M, chocoball, leite em pó, banana e uma cobertura da sua preferência",
          "precos": [
            [
              "G",
              16
            ]
          ],
          "foto": "assets/images/products/tigela-pro.webp"
        },
        {
          "nome": "Frutas Mix",
          "desc": "Kiwi, banana, morango e granola",
          "precos": [
            [
              "único",
              15
            ]
          ]
        }
      ]
    },
    {
      "id": "tacas",
      "nome": "Taças",
      "nota": "Valores apenas para consumo no local.",
      "itens": [
        {
          "nome": "Taça Chocolatudo",
          "desc": "Açaí, Nutella, canudo e creme de leitinho",
          "precos": [
            [
              "taça",
              18
            ]
          ]
        },
        {
          "nome": "Taça Kit Kat Premium",
          "precos": [
            [
              "taça",
              20
            ]
          ]
        },
        {
          "nome": "Taça Premium",
          "desc": "Paçoca, Ouro Branco, morango, Nutella e creme de ninho",
          "precos": [
            [
              "taça",
              20
            ]
          ]
        },
        {
          "nome": "Taça Napolitano",
          "desc": "Picolé napolitano, morango, amendoim, creme de ninho, creme de morango, Ouro Branco e canudos",
          "precos": [
            [
              "taça",
              25
            ]
          ],
          "foto": "assets/images/products/taca-napolitano-pro.webp"
        },
        {
          "nome": "Taça Sensação",
          "desc": "Creme de ninho, creme de avelã, creme de morango, canudo e morangos cortados",
          "precos": [
            [
              "taça",
              20
            ]
          ]
        },
        {
          "nome": "Taça NinhoTella",
          "desc": "Leite em pó, creme de avelã, leite condensado e canudo wafer",
          "precos": [
            [
              "taça",
              18
            ]
          ]
        },
        {
          "nome": "Milk-Shake Ovomaltine com Nutella",
          "precos": [
            [
              "taça",
              18
            ]
          ]
        },
        {
          "nome": "Milk-Shake Morango com Nutella",
          "precos": [
            [
              "taça",
              18
            ]
          ]
        },
        {
          "nome": "Milk-Shake Kit Kat Cream",
          "precos": [
            [
              "taça",
              18
            ]
          ]
        }
      ]
    },
    {
      "id": "batidas",
      "nome": "Batidas",
      "nota": "Batida de açaí.",
      "itens": [
        {
          "nome": "Batida tradicional",
          "precos": [
            [
              "único",
              10
            ]
          ]
        },
        {
          "nome": "Açaí com Ninho",
          "precos": [
            [
              "único",
              10
            ]
          ]
        },
        {
          "nome": "Açaí com morango",
          "precos": [
            [
              "único",
              10
            ]
          ]
        },
        {
          "nome": "Açaí com banana",
          "precos": [
            [
              "único",
              10
            ]
          ]
        }
      ]
    }
  ]
});
