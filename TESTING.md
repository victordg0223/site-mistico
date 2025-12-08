# Guia de Teste - Sistema de Confirmação de Pagamento

## Como Testar o Sistema Localmente

### 1. Testar o Fluxo de Compra Básico

1. Abra `index.html` em um navegador
2. Adicione produtos ao carrinho clicando em "Adicionar ao Carrinho"
3. Clique no ícone do carrinho para abrir o sidebar
4. Ajuste quantidades usando os botões + e -
5. Verifique se o total está sendo calculado corretamente
6. Clique em "Finalizar Compra"

**Resultado Esperado:**
- Uma nova aba será aberta com o checkout do Infinity Pay
- O pedido será salvo no localStorage como "pedido_pendente"
- O carrinho será mantido até a confirmação

### 2. Testar Confirmação de Pagamento com Sucesso

Para testar a confirmação sem fazer um pagamento real:

1. Complete o fluxo de compra até o checkout
2. Simule o retorno do Infinity Pay adicionando parâmetros à URL:
   ```
   obrigado.html?status=success&transaction_id=TEST123456
   ```
3. Abra esta URL diretamente no navegador

**Resultado Esperado:**
- Página mostra mensagem de sucesso
- Detalhes do pedido são exibidos
- Pedido é salvo no histórico
- Carrinho é limpo
- Botões para voltar ao início ou ver mais produtos

### 3. Testar Pagamento Pendente

1. Abra a URL com status pendente:
   ```
   obrigado.html?status=pending
   ```

**Resultado Esperado:**
- Página mostra mensagem de "Pagamento Pendente"
- Detalhes do pedido são exibidos
- Pedido permanece como pendente
- Informações de contato são mostradas

### 4. Testar Erro no Pagamento

1. Abra a URL com status de erro:
   ```
   obrigado.html?status=failed
   ```

**Resultado Esperado:**
- Página mostra mensagem de erro
- Informações de contato para suporte
- Botão para voltar ao início

### 5. Testar Histórico de Pedidos

1. Após confirmar alguns pedidos (reais ou simulados)
2. Acesse `meus-pedidos.html`
3. Verifique a lista de pedidos

**Resultado Esperado:**
- Lista de todos os pedidos confirmados
- Status visual (pago/pendente)
- Detalhes de cada pedido
- Data formatada corretamente
- Total calculado corretamente

### 6. Testar Histórico Vazio

1. Limpe o localStorage:
   ```javascript
   localStorage.clear()
   ```
2. Acesse `meus-pedidos.html`

**Resultado Esperado:**
- Mensagem "Você ainda não fez nenhum pedido"
- Ícone ilustrativo
- Botão para ver produtos

## Testes Manuais no Console do Navegador

### Ver Pedido Pendente
```javascript
console.log(JSON.parse(localStorage.getItem('pedido_pendente')));
```

### Ver Histórico de Pedidos
```javascript
console.log(JSON.parse(localStorage.getItem('historico_pedidos')));
```

### Simular Pedido Pendente
```javascript
const pedido = {
    id: Date.now().toString(),
    data: new Date().toISOString(),
    itens: [
        {
            name: "Tiragem Baralho Cigano",
            price: 1500,
            quantity: 1
        }
    ],
    total: 1500,
    status: 'aguardando_pagamento'
};
localStorage.setItem('pedido_pendente', JSON.stringify(pedido));
```

### Limpar Todos os Dados
```javascript
localStorage.clear();
location.reload();
```

## Parâmetros de URL Aceitos

A página `obrigado.html` aceita os seguintes parâmetros:

### Status do Pagamento
- `status=success` ou `status=paid` → Pagamento confirmado
- `status=pending` → Pagamento pendente
- `status=cancelled` ou `status=failed` → Pagamento falhou

### Status Alternativo (payment_status)
- `payment_status=paid` ou `payment_status=approved` → Pagamento confirmado
- `payment_status=pending` → Pagamento pendente
- `payment_status=cancelled` ou `payment_status=failed` → Pagamento falhou

### ID da Transação
- `transaction_id=ABC123` → Identificador da transação

### Exemplos de URLs

**Pagamento bem-sucedido:**
```
obrigado.html?status=success&transaction_id=IP123456789
obrigado.html?payment_status=paid&transaction_id=TEST001
```

**Pagamento pendente:**
```
obrigado.html?status=pending
obrigado.html?payment_status=pending
```

**Pagamento cancelado:**
```
obrigado.html?status=cancelled
obrigado.html?payment_status=failed
```

## Casos de Teste

### Caso 1: Compra Simples
1. Adicionar 1 produto ao carrinho
2. Finalizar compra
3. Simular sucesso do pagamento
4. Verificar se pedido aparece no histórico

### Caso 2: Compra Múltipla
1. Adicionar 3 unidades de produto A
2. Adicionar 2 unidades de produto B
3. Finalizar compra
4. Verificar se quantidades e totais estão corretos
5. Simular sucesso do pagamento
6. Verificar histórico

### Caso 3: Modificação do Carrinho
1. Adicionar produtos
2. Aumentar quantidades
3. Diminuir quantidades
4. Remover itens
5. Verificar se total atualiza corretamente

### Caso 4: Carrinho Vazio
1. Tentar finalizar compra sem produtos
2. Verificar se alerta é exibido

### Caso 5: Múltiplos Pedidos
1. Fazer 5 pedidos diferentes
2. Verificar se todos aparecem no histórico
3. Verificar ordenação (mais recente primeiro)

### Caso 6: Navegação
1. Testar todos os links do menu
2. Verificar se ícone de pedidos está em todas as páginas
3. Verificar se contador do carrinho atualiza

## Validação de Segurança

### Verificação de XSS
- Nomes de produtos são escapados automaticamente pelo navegador
- IDs de transação são exibidos como texto puro
- Não há uso de innerHTML com dados de usuário sem sanitização

### Verificação de Dados
- Preços são sempre em centavos (integer)
- Quantidades são validadas antes do checkout
- Total é recalculado no cliente para verificação

### LocalStorage
- Dados armazenados são apenas do próprio usuário
- Não contém informações sensíveis de pagamento
- Pode ser limpo a qualquer momento

## Problemas Conhecidos e Soluções

### Problema: Pedido não aparece no histórico
**Solução:** Verifique se o pedido foi confirmado com status=success ou payment_status=paid

### Problema: Carrinho não limpa após pagamento
**Solução:** Verifique se localStorage.removeItem('carrinho_checkout') está funcionando

### Problema: Total incorreto
**Solução:** Verifique se os preços estão em centavos (1500 = R$ 15,00)

### Problema: Data não formata corretamente
**Solução:** Verifique se o timestamp está em formato ISO

## Notas Importantes

1. **Ambiente de Teste:** O sistema funciona totalmente offline, mas o checkout real requer conexão com Infinity Pay

2. **LocalStorage Limits:** O navegador limita localStorage a aproximadamente 5-10MB. O histórico é limitado a 10 pedidos para evitar problemas

3. **Compatibilidade:** Testado em Chrome, Firefox, Safari e Edge modernos

4. **Mobile:** Interface é responsiva e funciona em dispositivos móveis

5. **Privacidade:** Todos os dados ficam no navegador do usuário, não são enviados para nenhum servidor além do Infinity Pay durante o checkout
