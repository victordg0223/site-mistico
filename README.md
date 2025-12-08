# 🌙 Magia e Cura - Site de E-commerce Místico

Site de e-commerce especializado em produtos e serviços místicos, com integração completa ao sistema de pagamento Infinity Pay.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Páginas do Site](#-páginas-do-site)
- [Sistema de Carrinho](#-sistema-de-carrinho)
- [Integração Infinity Pay](#-integração-infinity-pay)
- [Fluxo de Compra](#-fluxo-de-compra)
- [Armazenamento de Dados](#-armazenamento-de-dados)
- [Estruturas de Dados](#-estruturas-de-dados)
- [Configuração](#️-configuração)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Design e Interface](#-design-e-interface)
- [Responsividade](#-responsividade)
- [Como Usar](#-como-usar)
- [Contato](#-contato)

## 🔮 Visão Geral

O **Magia e Cura** é um site de e-commerce completo desenvolvido para a venda de produtos místicos (Kumbaya - ervas naturais) e serviços de consultas espirituais (Baralho Cigano e Tarot). O projeto foi construído com tecnologias web modernas e integra-se perfeitamente com o gateway de pagamento Infinity Pay.

### Produtos Oferecidos
- **Tiragem Baralho Cigano** (R$ 15,00) - Consultas de oráculo cigano
- **Kumbaya Raiz do Sono** (R$ 15,00) - Defumação natural para relaxamento

## ✨ Funcionalidades

### Sistema Completo de E-commerce
- ✅ Catálogo de produtos dinâmico
- ✅ Carrinho de compras com sidebar deslizante
- ✅ Ajuste de quantidades em tempo real
- ✅ Cálculo automático de subtotais e totais
- ✅ Duas opções de compra: direta ou via carrinho
- ✅ Sistema de checkout integrado ao Infinity Pay
- ✅ Confirmação automática de pagamentos
- ✅ Histórico completo de pedidos
- ✅ Interface responsiva para mobile e desktop

### Gerenciamento de Pedidos
- 📦 Salvamento automático de pedidos pendentes
- 📦 Histórico de até 10 pedidos confirmados
- 📦 Visualização detalhada de cada pedido
- 📦 Status de pagamento (pago/pendente)
- 📦 ID de transação para rastreamento
- 📦 Data e hora de cada compra

### Experiência do Usuário
- 🎨 Design místico com paleta de cores temática
- 🎨 Animações suaves e transições elegantes
- 🎨 Feedback visual em todas as ações
- 🎨 Mensagens claras de confirmação e erro
- 🎨 Interface intuitiva e fácil de navegar

## 📁 Estrutura do Projeto

```
site-mistico/
├── index.html              # Página principal com catálogo de produtos
├── conta.html              # Página de informações e contato
├── meus-pedidos.html       # Histórico de pedidos do usuário
├── obrigado.html          # Página de confirmação pós-pagamento
├── css/
│   └── style.css          # Estilos completos do site
├── js/
│   ├── app.js             # Lógica principal (carrinho, produtos, checkout)
│   ├── pedidos.js         # Gerenciamento do histórico de pedidos
│   └── confirmacao.js     # Processamento de confirmação de pagamento
├── README.md              # Documentação do projeto
├── CHANGELOG.md           # Histórico de mudanças
└── TESTING.md             # Documentação de testes
```

## 📄 Páginas do Site

### 1. **index.html** - Página Principal
**Função**: Página inicial com exibição de produtos e carrinho de compras.

**Características**:
- Header fixo com navegação completa
- Seção hero com título e ícones animados
- Grid de produtos carregados dinamicamente
- Sidebar do carrinho com animação de slide
- Ícone do carrinho com contador de itens
- Integração com os scripts principais

**Elementos Interativos**:
- Botão "Adicionar ao Carrinho" - adiciona produto ao carrinho
- Botão "Comprar Agora" - redireciona diretamente para checkout
- Ícone do carrinho - abre/fecha o sidebar
- Links de navegação para outras páginas

### 2. **conta.html** - Minha Conta
**Função**: Página de informações sobre os produtos e contato.

**Conteúdo**:
- Informações de contato (email e telefone)
- Descrição detalhada do Kumbaya (ervas naturais)
- Explicação sobre o Baralho Cigano (36 cartas)
- Informações sobre o Tarot (78 arcanos)

**Propósito**: Educar os clientes sobre os produtos e serviços oferecidos.

### 3. **meus-pedidos.html** - Histórico de Pedidos
**Função**: Exibição do histórico completo de pedidos do usuário.

**Características**:
- Lista de todos os pedidos realizados
- Ordenação por data (mais recente primeiro)
- Cards informativos para cada pedido
- Status visual (pago/pendente)
- Detalhes de cada item comprado
- Total de cada pedido
- ID da transação quando disponível
- Mensagem amigável quando não há pedidos

**Dados Exibidos por Pedido**:
- Número do pedido (últimos 8 dígitos)
- Data e hora da compra
- Status do pagamento com ícone
- Lista de itens com quantidades
- Valor total
- ID da transação (se disponível)

### 4. **obrigado.html** - Confirmação de Pagamento
**Função**: Processar e exibir confirmação após pagamento no Infinity Pay.

**Fluxo de Funcionamento**:
1. **Loading**: Mostra spinner enquanto processa
2. **Análise de Parâmetros**: Verifica status da URL
3. **Confirmação**: Exibe uma das três mensagens:

**Mensagens Possíveis**:
- ✅ **Sucesso**: Pagamento confirmado
  - Ícone verde de check
  - Detalhes completos do pedido
  - Próximos passos
  - Informações de contato
  - Botões para continuar navegando
  
- ⏱ **Pendente**: Pagamento em processamento
  - Ícone laranja de relógio
  - Detalhes do pedido
  - Mensagem de aguardo
  
- ❌ **Erro**: Falha no pagamento
  - Ícone vermelho de X
  - Informações de contato para suporte
  - Botão para voltar ao início

**Ações Automáticas**:
- Salva pedido confirmado no histórico
- Limpa carrinho após confirmação
- Remove dados temporários do localStorage
- Atualiza contador do carrinho

## 🛒 Sistema de Carrinho

### Funcionalidades do Carrinho

**Adicionar Produtos**:
```javascript
// Adiciona produto ao carrinho
adicionarAoCarrinho(produtoId)
// Feedback visual: botão muda para "Adicionado!" em verde
```

**Gerenciar Quantidades**:
- Botão **+**: Aumenta quantidade
- Botão **-**: Diminui quantidade
- Botão **🗑️**: Remove item completamente
- Atualização automática de subtotais e total

**Interface do Carrinho**:
- Sidebar deslizante (400px de largura)
- Lista de itens com nome e preço
- Controles de quantidade inline
- Total atualizado em tempo real
- Botão "Finalizar Compra" destacado
- Mensagem "Carrinho vazio" quando apropriado

**Contador Visual**:
- Badge no ícone do carrinho
- Atualização automática
- Soma de todos os itens

### Persistência do Carrinho

O carrinho utiliza variável JavaScript em memória e é salvo no localStorage apenas durante o checkout:
- **Durante navegação**: Armazenado em variável `carrinho`
- **Durante checkout**: Backup em `carrinho_checkout`
- **Após confirmação**: Carrinho é limpo automaticamente

## 💳 Integração Infinity Pay

### Como Funciona

O Infinity Pay é um gateway de pagamento brasileiro que permite checkout simplificado via URL parametrizada.

### Configuração Atual

```javascript
// Constantes em js/app.js
const INFINITEPAY_HANDLE = "magiaecura";
const REDIRECT_URL = "https://magiaecura.com.br/obrigado.html";
```

### Dois Métodos de Compra

#### 1. Compra Direta
**Botão**: "Comprar Agora" em cada produto

**Processo**:
1. Gera link instantâneo com um item
2. Abre checkout em nova aba
3. Não adiciona ao carrinho

**Formato do Link**:
```
https://checkout.infinitepay.io/{handle}?items={json}&redirect_url={url}
```

#### 2. Checkout via Carrinho
**Botão**: "Finalizar Compra" no carrinho

**Processo**:
1. Valida que há itens no carrinho
2. Salva pedido como pendente no localStorage
3. Gera link com todos os itens
4. Abre checkout em nova aba
5. Aguarda retorno via redirect_url

### Formato dos Itens

Os itens são enviados como JSON codificado:
```javascript
[
  {
    name: "Nome do Produto",
    price: 1500,        // Preço em centavos
    quantity: 1
  }
]
```

### Parâmetros de Retorno

Após o pagamento, o Infinity Pay redireciona para `obrigado.html` com parâmetros:

**Parâmetros Reconhecidos**:
- `status`: success | paid | pending | cancelled | failed
- `payment_status`: paid | approved | pending | cancelled | failed
- `transaction_id`: Identificador único da transação

**Lógica de Processamento**:
```javascript
// Pagamento confirmado
if (status === 'success' || status === 'paid' || 
    paymentStatus === 'paid' || paymentStatus === 'approved')

// Pagamento pendente
if (status === 'pending' || paymentStatus === 'pending')

// Pagamento falhou
if (status === 'cancelled' || status === 'failed' || 
    paymentStatus === 'cancelled' || paymentStatus === 'failed')
```

## 🔄 Fluxo de Compra

### Fluxo Completo (Via Carrinho)

```
1. NAVEGAÇÃO
   └─> Usuário navega pelos produtos na index.html

2. ADIÇÃO AO CARRINHO
   └─> Clica em "Adicionar ao Carrinho"
       └─> Produto adicionado à variável carrinho
       └─> Contador atualizado
       └─> Feedback visual (botão verde)

3. VISUALIZAÇÃO DO CARRINHO
   └─> Clica no ícone do carrinho
       └─> Sidebar abre com animação
       └─> Mostra todos os itens
       └─> Permite ajustar quantidades
       └─> Exibe total em tempo real

4. CHECKOUT
   └─> Clica em "Finalizar Compra"
       └─> Valida que carrinho não está vazio
       └─> Cria objeto de pedido
       └─> Salva em localStorage como "pedido_pendente"
       └─> Faz backup do carrinho em "carrinho_checkout"
       └─> Gera URL do Infinity Pay
       └─> Abre checkout em nova aba

5. PAGAMENTO
   └─> Usuário completa pagamento no Infinity Pay
       └─> Infinity Pay processa transação
       └─> Redireciona para obrigado.html com parâmetros

6. CONFIRMAÇÃO
   └─> obrigado.html recebe parâmetros
       └─> Recupera pedido pendente do localStorage
       └─> Analisa status do pagamento
       
       SE SUCESSO:
       └─> Atualiza status para "pago"
       └─> Adiciona transactionId e dataPagamento
       └─> Salva no histórico de pedidos
       └─> Limpa dados temporários
       └─> Exibe mensagem de sucesso com detalhes
       
       SE PENDENTE:
       └─> Mantém pedido pendente
       └─> Exibe mensagem de aguardando confirmação
       
       SE ERRO:
       └─> Exibe mensagem de erro
       └─> Fornece informações de contato

7. PÓS-COMPRA
   └─> Usuário pode:
       ├─> Ver histórico em meus-pedidos.html
       ├─> Continuar comprando
       └─> Entrar em contato se necessário
```

### Fluxo Simplificado (Compra Direta)

```
1. Usuário clica em "Comprar Agora"
2. Abre checkout com 1 item
3. Completa pagamento
4. Retorna para confirmação
5. Vê mensagem de sucesso/pendente/erro
```

## 💾 Armazenamento de Dados

O projeto utiliza exclusivamente **localStorage** do navegador para persistência de dados.

### Estrutura do localStorage

#### 1. `pedido_pendente`
**Quando é criado**: No momento do checkout
**Quando é removido**: Após confirmação de pagamento bem-sucedida
**Propósito**: Armazenar pedido aguardando confirmação do Infinity Pay

```javascript
{
  id: "1701234567890",
  data: "2024-12-08T10:30:00.000Z",
  itens: [
    {
      name: "1 Tiragem Baralho Cigano",
      price: 1500,
      quantity: 1
    }
  ],
  total: 1500,
  status: "aguardando_pagamento"
}
```

#### 2. `carrinho_checkout`
**Quando é criado**: No momento do checkout
**Quando é removido**: Após confirmação de pagamento
**Propósito**: Backup do carrinho durante o processo de pagamento

```javascript
{
  "tiragem-cigano": 1,
  "kumbaya-sono": 2
}
```

#### 3. `historico_pedidos`
**Quando é criado**: Após primeiro pedido confirmado
**Quando é atualizado**: A cada novo pedido confirmado
**Limite**: Últimos 10 pedidos
**Propósito**: Manter histórico de compras do usuário

```javascript
[
  {
    id: "1701234567890",
    data: "2024-12-08T10:30:00.000Z",
    itens: [...],
    total: 1500,
    status: "pago",
    transactionId: "txn_abc123xyz",
    dataPagamento: "2024-12-08T10:35:00.000Z"
  },
  // ... até 10 pedidos
]
```

## 📊 Estruturas de Dados

### Produto
```javascript
{
  id: "tiragem-cigano",           // Identificador único
  name: "1 Tiragem Baralho Cigano", // Nome exibido
  priceCents: 1500,                 // Preço em centavos
  priceDisplay: "R$ 15,00",        // Preço formatado
  description: "Consulte o oráculo...", // Descrição
  icon: "🔮"                        // Emoji/ícone
}
```

### Item do Carrinho
```javascript
{
  name: "Nome do Produto",
  price: 1500,        // Em centavos
  quantity: 2
}
```

### Pedido Completo
```javascript
{
  id: "1701234567890",              // Timestamp como string
  data: "2024-12-08T10:30:00.000Z", // ISO 8601
  itens: [                          // Array de itens
    {
      name: "Produto",
      price: 1500,
      quantity: 1
    }
  ],
  total: 1500,                      // Total em centavos
  status: "pago",                   // ou "aguardando_pagamento"
  transactionId: "txn_abc123xyz",   // Do Infinity Pay
  dataPagamento: "2024-12-08T10:35:00.000Z" // ISO 8601
}
```

## ⚙️ Configuração

### Para Personalizar o Site

#### 1. Alterar Produtos

Edite o array `PRODUTOS` em `js/app.js`:

```javascript
const PRODUTOS = [
  {
    id: "seu-produto-id",
    name: "Nome do Seu Produto",
    priceCents: 2500,              // R$ 25,00
    priceDisplay: "R$ 25,00",
    description: "Descrição do produto...",
    icon: "✨"
  }
];
```

#### 2. Configurar Infinity Pay

Edite as constantes em `js/app.js`:

```javascript
const INFINITEPAY_HANDLE = "seu-handle-aqui";
const REDIRECT_URL = "https://seu-dominio.com/obrigado.html";
```

**Importante**: A URL de retorno deve estar registrada no painel do Infinity Pay.

#### 3. Alterar Informações de Contato

Edite os seguintes arquivos:
- `conta.html`: Seção de informações de contato
- `obrigado.html`: Informações na seção "next-steps"
- `README.md`: Seção de contato

#### 4. Personalizar Cores e Design

Edite as variáveis CSS em `css/style.css`:

```css
:root {
  --background-dark: #2c2a4a;   /* Fundo escuro principal */
  --background-light: #4f4c7a;  /* Fundo claro secundário */
  --primary: #9e8db8;           /* Cor primária */
  --accent: #f7d59c;            /* Cor de destaque */
  --text-light: #f2e9e4;        /* Texto claro */
  --text-dark: #333333;         /* Texto escuro */
}
```

## 🛠 Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com variáveis CSS, flexbox e grid
- **JavaScript (ES6+)**: Lógica do aplicativo (Vanilla JS, sem frameworks)

### Bibliotecas Externas
- **Font Awesome 5.13.1**: Ícones para interface
- **Google Fonts (Georgia)**: Tipografia serif elegante

### APIs e Serviços
- **Infinity Pay Checkout API**: Gateway de pagamento
- **LocalStorage API**: Persistência de dados no navegador

### Padrões Web
- **Responsive Design**: Media queries para mobile-first
- **CSS Variables**: Temas e cores configuráveis
- **ES6 Modules Pattern**: Organização do código JavaScript
- **DOM Manipulation**: Renderização dinâmica de conteúdo
- **Event Handling**: Interatividade rica

## 🎨 Design e Interface

### Paleta de Cores Mística

O design utiliza uma paleta inspirada no misticismo:

- **Background Dark** (#2c2a4a): Roxo escuro profundo - base principal
- **Background Light** (#4f4c7a): Roxo médio - cards e seções
- **Primary** (#9e8db8): Lavanda - elementos secundários
- **Accent** (#f7d59c): Dourado claro - destaques e CTAs
- **Text Light** (#f2e9e4): Bege claro - texto principal
- **Text Dark** (#333333): Cinza escuro - texto em fundos claros

### Tipografia
- **Fonte Principal**: Georgia (serif) - elegância e legibilidade
- **Line Height**: 1.6 - espaçamento confortável para leitura

### Elementos de Design

#### Animações
- **Float**: Ícones flutuantes na seção hero
- **Spin**: Loading spinner na confirmação
- **Transitions**: Efeitos suaves em botões e cards (0.3s ease)
- **Hover Effects**: Transform translateY e mudança de cores

#### Cards
- Border-radius: 15px
- Box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2)
- Hover: translateY(-5px) e sombra aumentada

#### Botões
- Border-radius: 25px (pill shape)
- Font-weight: bold
- Padding: 0.8rem 1.5rem
- Estados hover com transform e cor

#### Sidebar do Carrinho
- Largura: 400px (desktop), 100vw (mobile)
- Animação de slide da direita
- Border-left com cor primária
- Overlay escuro opcional

### Ícones e Emojis
- 🌙 Lua - Logo do site
- 🔮 Bola de cristal - Baralho Cigano
- 🌿 Folha - Kumbaya
- ✨🌟 Estrelas - Elementos decorativos
- ✓ Check - Confirmação de sucesso
- ⏱ Relógio - Status pendente
- ✕ X - Erro

## 📱 Responsividade

### Breakpoint Principal: 768px

#### Desktop (> 768px)
- Header horizontal com navegação inline
- Hero com título grande (3rem)
- Grid de produtos 2+ colunas
- Carrinho sidebar de 400px
- Cards com hover effects
- Layout em duas colunas quando aplicável

#### Mobile (≤ 768px)
- Header em coluna com navegação empilhada
- Hero com título reduzido (2rem)
- Grid de produtos 1 coluna
- Carrinho em tela cheia (100vw)
- Botões em largura total
- Order cards simplificados
- Elementos empilhados verticalmente

### Elementos Adaptáveis
- Container com padding responsivo
- Font-sizes escaláveis
- Imagens e ícones flexíveis
- Espaçamentos proporcionais
- Touch targets adequados (min 44px)

## 📖 Como Usar

### Para Clientes

1. **Navegue pelos Produtos**
   - Acesse a página inicial
   - Veja os produtos disponíveis com descrições

2. **Compre de Duas Formas**
   
   **Opção A - Compra Direta**:
   - Clique em "Comprar Agora"
   - Vai direto para pagamento
   
   **Opção B - Via Carrinho**:
   - Clique em "Adicionar ao Carrinho"
   - Ajuste quantidades se desejar
   - Clique no ícone do carrinho
   - Revise os itens
   - Clique em "Finalizar Compra"

3. **Complete o Pagamento**
   - Abrirá o checkout do Infinity Pay
   - Escolha sua forma de pagamento
   - Complete a transação

4. **Confirmação**
   - Aguarde o redirecionamento
   - Veja os detalhes do seu pedido
   - Anote o ID da transação

5. **Acompanhe Seus Pedidos**
   - Acesse "Meus Pedidos" no menu
   - Veja todo o histórico
   - Verifique status de pagamento

### Para Desenvolvedores

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/victordg0223/site-mistico.git
   cd site-mistico
   ```

2. **Configure o Infinity Pay**
   - Abra `js/app.js`
   - Altere `INFINITEPAY_HANDLE` e `REDIRECT_URL`
   - Registre a URL no painel do Infinity Pay

3. **Personalize os Produtos**
   - Edite o array `PRODUTOS` em `js/app.js`
   - Adicione/remova/modifique produtos

4. **Teste Localmente**
   - Abra `index.html` em um navegador
   - Ou use um servidor local:
     ```bash
     python -m http.server 8000
     # ou
     npx serve
     ```

5. **Deploy**
   - Faça upload para seu servidor
   - Configure HTTPS (obrigatório para localStorage)
   - Teste o fluxo completo de pagamento

## 📞 Contato

### Suporte e Informações

- **Email**: miwoadm@gmail.com
- **Telefone**: (11) 91199-3949
- **Horário de Atendimento**: Segunda a Sexta, 9h às 18h

### Para Consultas
Entre em contato para agendar:
- Tiragens de Baralho Cigano
- Consultas de Tarot
- Dúvidas sobre produtos Kumbaya

### Dúvidas Técnicas
Para questões sobre:
- Status de pagamento
- Problemas com pedidos
- Informações sobre entrega

---

## 📄 Licença

Este projeto foi desenvolvido para uso privado da loja **Magia e Cura**.

## 🙏 Agradecimentos

Obrigado por escolher o **Magia e Cura** para sua jornada espiritual!

✨ *"Conectando você com a sabedoria ancestral"* ✨
