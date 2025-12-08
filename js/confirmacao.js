// Processar confirmação de pagamento
document.addEventListener('DOMContentLoaded', function() {
    verificarStatusPagamento();
});

function verificarStatusPagamento() {
    // Obter parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const transactionId = urlParams.get('transaction_id');
    const paymentStatus = urlParams.get('payment_status');
    
    // Recuperar pedido pendente do localStorage
    const pedidoPendente = localStorage.getItem('pedido_pendente');
    
    if (!pedidoPendente) {
        // Se não há pedido pendente, mostrar mensagem de erro
        mostrarMensagem('error');
        return;
    }
    
    const pedido = JSON.parse(pedidoPendente);
    
    // Verificar status do pagamento baseado nos parâmetros da URL
    // Infinity Pay pode retornar diferentes parâmetros, então verificamos vários
    if (status === 'success' || status === 'paid' || paymentStatus === 'paid' || paymentStatus === 'approved') {
        // Pagamento confirmado
        confirmarPagamento(pedido, transactionId);
    } else if (status === 'pending' || paymentStatus === 'pending') {
        // Pagamento pendente
        mostrarPendente(pedido);
    } else if (status === 'cancelled' || status === 'failed' || paymentStatus === 'cancelled' || paymentStatus === 'failed') {
        // Pagamento cancelado ou falhou
        mostrarMensagem('error');
    } else {
        // Sem parâmetros específicos - mostrar pendente
        // O usuário deve aguardar confirmação ou entrar em contato
        mostrarPendente(pedido);
    }
}

function confirmarPagamento(pedido, transactionId) {
    // Atualizar status do pedido
    pedido.status = 'pago';
    pedido.transactionId = transactionId;
    pedido.dataPagamento = new Date().toISOString();
    
    // Salvar pedido confirmado no histórico
    salvarPedidoNoHistorico(pedido);
    
    // Limpar dados temporários
    localStorage.removeItem('pedido_pendente');
    localStorage.removeItem('carrinho_checkout');
    
    // Limpar carrinho atual (caso ainda exista)
    if (typeof carrinho !== 'undefined') {
        carrinho = {};
        if (typeof atualizarCarrinho === 'function') {
            atualizarCarrinho();
        }
        if (typeof atualizarContadorCarrinho === 'function') {
            atualizarContadorCarrinho();
        }
    }
    
    // Exibir mensagem de sucesso com detalhes do pedido
    mostrarSucesso(pedido);
}

function salvarPedidoNoHistorico(pedido) {
    // Recuperar histórico de pedidos
    let historico = localStorage.getItem('historico_pedidos');
    historico = historico ? JSON.parse(historico) : [];
    
    // Adicionar novo pedido ao histórico
    historico.push(pedido);
    
    // Limitar histórico a últimos 10 pedidos
    if (historico.length > 10) {
        historico = historico.slice(-10);
    }
    
    // Salvar histórico atualizado
    localStorage.setItem('historico_pedidos', JSON.stringify(historico));
}

function mostrarSucesso(pedido) {
    document.getElementById('loading-message').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';
    
    // Exibir detalhes do pedido
    const orderInfo = document.getElementById('order-info');
    let html = '<div class="order-items">';
    
    pedido.itens.forEach(item => {
        const subtotal = (item.price * item.quantity / 100).toFixed(2).replace('.', ',');
        html += `
            <div class="order-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>Quantidade: ${item.quantity} × R$ ${(item.price / 100).toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="item-subtotal">R$ ${subtotal}</div>
            </div>
        `;
    });
    
    html += '</div>';
    html += `<div class="order-meta">
        <p><strong>Pedido ID:</strong> ${pedido.id}</p>
        <p><strong>Data:</strong> ${formatarData(pedido.data)}</p>
    `;
    
    if (pedido.transactionId) {
        html += `<p><strong>ID Transação:</strong> ${pedido.transactionId}</p>`;
    }
    
    html += '</div>';
    
    orderInfo.innerHTML = html;
    
    // Exibir total
    const total = (pedido.total / 100).toFixed(2).replace('.', ',');
    document.getElementById('order-total').textContent = total;
}

function mostrarPendente(pedido) {
    document.getElementById('loading-message').style.display = 'none';
    document.getElementById('pending-message').style.display = 'block';
    
    // Exibir detalhes do pedido pendente
    const orderInfo = document.getElementById('pending-order-info');
    let html = '<div class="order-items">';
    
    pedido.itens.forEach(item => {
        const subtotal = (item.price * item.quantity / 100).toFixed(2).replace('.', ',');
        html += `
            <div class="order-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>Quantidade: ${item.quantity}</p>
                </div>
                <div class="item-subtotal">R$ ${subtotal}</div>
            </div>
        `;
    });
    
    html += '</div>';
    html += `<p><strong>Pedido ID:</strong> ${pedido.id}</p>`;
    html += `<p><strong>Data:</strong> ${formatarData(pedido.data)}</p>`;
    html += `<p><strong>Total:</strong> R$ ${(pedido.total / 100).toFixed(2).replace('.', ',')}</p>`;
    
    orderInfo.innerHTML = html;
}

function mostrarMensagem(tipo) {
    document.getElementById('loading-message').style.display = 'none';
    
    if (tipo === 'error') {
        document.getElementById('error-message').style.display = 'block';
    }
}

function formatarData(isoString) {
    const data = new Date(isoString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}
