# Site Místico - Magia e Cura

Site para vender produtos e serviços místicos com integração ao Infinity Pay.

## Funcionalidades

### Sistema de Carrinho
- Adicionar produtos ao carrinho
- Ajustar quantidades
- Visualizar total em tempo real
- Compra direta ou checkout completo

### Integração Infinity Pay
- Checkout seguro via Infinity Pay
- Sistema de confirmação de pagamento
- Salvamento automático de pedidos
- Histórico de compras

### Páginas
- **index.html**: Página principal com produtos
- **conta.html**: Informações de contato e sobre os produtos
- **obrigado.html**: Página de confirmação após pagamento
- **meus-pedidos.html**: Histórico de pedidos realizados

## Como Funciona o Sistema de Confirmação

### 1. Processo de Checkout
Quando o usuário clica em "Finalizar Compra":
- Os dados do pedido são salvos no localStorage
- O usuário é redirecionado para o checkout do Infinity Pay
- O carrinho é mantido até a confirmação

### 2. Confirmação de Pagamento
Após o pagamento no Infinity Pay, o usuário é redirecionado para `obrigado.html`:
- A página verifica os parâmetros da URL (status, payment_status, transaction_id)
- Se o pagamento for confirmado: exibe detalhes do pedido e limpa o carrinho
- Se estiver pendente: exibe mensagem de aguardando confirmação
- Se houver erro: exibe mensagem de erro com contato

### 3. Parâmetros Aceitos
O sistema reconhece os seguintes parâmetros de retorno:
- `status=success|paid|pending|cancelled|failed`
- `payment_status=paid|approved|pending|cancelled|failed`
- `transaction_id`: ID da transação

### 4. Armazenamento Local
Utiliza localStorage para:
- `pedido_pendente`: Pedido aguardando confirmação
- `carrinho_checkout`: Backup do carrinho durante checkout
- `historico_pedidos`: Histórico de até 10 pedidos confirmados

## Configuração

### Infinity Pay Handle
O handle atual está configurado em `js/app.js`:
```javascript
const INFINITEPAY_HANDLE = "magiaecura";
const REDIRECT_URL = "https://magiaecura.com.br/obrigado.html";
```

Para alterar, edite estas constantes com seu handle e URL de retorno.

## Estrutura de Dados

### Pedido
```javascript
{
  id: "timestamp",
  data: "ISO timestamp",
  itens: [
    {
      name: "Nome do Produto",
      price: 1500, // centavos
      quantity: 1
    }
  ],
  total: 1500, // centavos
  status: "pago" | "aguardando_pagamento",
  transactionId: "ID da transação",
  dataPagamento: "ISO timestamp"
}
```

## Tecnologias
- HTML5
- CSS3
- JavaScript (Vanilla)
- Infinity Pay API
- LocalStorage API

## Contato
- Email: miwoadm@gmail.com
- Telefone: (11) 91199-3949
