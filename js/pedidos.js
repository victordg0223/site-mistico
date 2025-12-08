// Carregar e exibir histórico de pedidos
document.addEventListener('DOMContentLoaded', function() {
    carregarHistoricoPedidos();
});

function carregarHistoricoPedidos() {
    const historico = localStorage.getItem('historico_pedidos');
    
    if (!historico) {
        mostrarMensagemVazia();
        return;
    }
    
    const pedidos = JSON.parse(historico);
    
    if (pedidos.length === 0) {
        mostrarMensagemVazia();
        return;
    }
    
    // Ordenar pedidos por data (mais recente primeiro)
    pedidos.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    exibirPedidos(pedidos);
}

function mostrarMensagemVazia() {
    document.getElementById('orders-list').style.display = 'none';
    document.getElementById('empty-orders').style.display = 'block';
}

function exibirPedidos(pedidos) {
    document.getElementById('orders-list').style.display = 'block';
    document.getElementById('empty-orders').style.display = 'none';
    
    const ordersList = document.getElementById('orders-list');
    let html = '';
    
    pedidos.forEach(pedido => {
        const statusClass = pedido.status === 'pago' ? 'status-pago' : 'status-pendente';
        const statusText = pedido.status === 'pago' ? 'Pago' : 'Pendente';
        const statusIcon = pedido.status === 'pago' ? '✓' : '⏱';
        
        html += `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-id-date">
                        <h3>Pedido #${pedido.id.slice(-8)}</h3>
                        <p class="order-date">${formatarData(pedido.data)}</p>
                    </div>
                    <div class="order-status ${statusClass}">
                        <span class="status-icon">${statusIcon}</span>
                        <span>${statusText}</span>
                    </div>
                </div>
                <div class="order-items-list">
        `;
        
        pedido.itens.forEach(item => {
            const subtotal = (item.price * item.quantity / 100).toFixed(2).replace('.', ',');
            html += `
                <div class="order-item-row">
                    <div class="item-info">
                        <strong>${item.name}</strong>
                        <span class="item-quantity">Quantidade: ${item.quantity}</span>
                    </div>
                    <div class="item-price">R$ ${subtotal}</div>
                </div>
            `;
        });
        
        const total = (pedido.total / 100).toFixed(2).replace('.', ',');
        html += `
                </div>
                <div class="order-footer">
                    <div class="order-total-row">
                        <strong>Total:</strong>
                        <strong class="total-value">R$ ${total}</strong>
                    </div>
        `;
        
        if (pedido.transactionId) {
            html += `
                    <div class="transaction-info">
                        <small>ID Transação: ${pedido.transactionId}</small>
                    </div>
            `;
        }
        
        html += `
                </div>
            </div>
        `;
    });
    
    ordersList.innerHTML = html;
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
