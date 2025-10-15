const INFINITEPAY_HANDLE = "magiaecura";
const REDIRECT_URL = "https://magiaecura.com.br/obrigado.html";

const PRODUTOS = [
    {
        id: "tiragem-cigano",
        name: "1 Tiragem Baralho Cigano",
        priceCents: 1500,
        priceDisplay: "R$ 15,00",
        description: "Consulte o oráculo cigano para orientações sobre amor, trabalho e vida pessoal.",
        icon: "🔮",
        directLink: "https://checkout.infinitepay.io/magiaecura?items=[{\"name\":\"1+Tiragem+Baralho+Cigano\",\"price\":1500,\"quantity\":1}]&redirect_url=https://magiaecura.com.br"
    },
    {
        id: "kumbaya-sono",
        name: "Kumbaya Raiz do Sono", 
        priceCents: 1500,
        priceDisplay: "R$ 15,00",
        description: "Defumação especial para promover relaxamento e sono tranquilo.",
        icon: "🌿",
        directLink: "https://checkout.infinitepay.io/magiaecura?items=[{\"name\":\"Kumbaya+Raiz+do+Sono\",\"price\":1500,\"quantity\":1}]&redirect_url=https://magiaecura.com.br/"
    }
];

let carrinho = {};

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
    atualizarContadorCarrinho();
});

// Carregar produtos dinamicamente
function carregarProdutos() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';
    
    PRODUTOS.forEach(produto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-icon">${produto.icon}</div>
            <h3>${produto.name}</h3>
            <p class="product-description">${produto.description}</p>
            <div class="product-price">${produto.priceDisplay}</div>
            <div class="product-buttons">
                <button class="cart-button" onclick="adicionarAoCarrinho('${produto.id}')">
                    Adicionar ao Carrinho
                </button>
                <a href="${produto.directLink}" target="_blank" class="buy-button">
                    Comprar Agora
                </a>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Adicionar ao carrinho
function adicionarAoCarrinho(produtoId) {
    if (!carrinho[produtoId]) {
        carrinho[produtoId] = 0;
    }
    carrinho[produtoId]++;
    atualizarCarrinho();
    atualizarContadorCarrinho();
    
    // Feedback visual
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = "Adicionado!";
    button.style.background = "#10B981";
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "";
    }, 1000);
}

// Toggle carrinho
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');
    atualizarCarrinho();
}

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const contador = document.getElementById('cart-count');
    const total = Object.values(carrinho).reduce((sum, qty) => sum + qty, 0);
    contador.textContent = total;
}

// Atualizar carrinho
function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (Object.keys(carrinho).length === 0 || Object.values(carrinho).every(qty => qty === 0)) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartTotal.textContent = '0,00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    Object.keys(carrinho).forEach(produtoId => {
        if (carrinho[produtoId] > 0) {
            const produto = PRODUTOS.find(p => p.id === produtoId);
            const subtotal = produto.priceCents * carrinho[produtoId] / 100;
            total += subtotal;
            
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${produto.name}</h4>
                        <p>${produto.priceDisplay}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="alterarQuantidade('${produto.id}', -1)"><i class="fas fa-minus"></i></button>
                        <span>${carrinho[produtoId]}</span>
                        <button onclick="alterarQuantidade('${produto.id}', 1)"><i class="fas fa-plus"></i></button>
                        <button onclick="removerDoCarrinho('${produto.id}')"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        }
    });
    
    cartItems.innerHTML = html;
    cartTotal.textContent = total.toFixed(2).replace('.', ',');
}

// Alterar quantidade
function alterarQuantidade(produtoId, delta) {
    if (!carrinho[produtoId]) carrinho[produtoId] = 0;
    carrinho[produtoId] += delta;
    if (carrinho[produtoId] <= 0) {
        delete carrinho[produtoId];
    }
    atualizarCarrinho();
    atualizarContadorCarrinho();
}

// Remover do carrinho
function removerDoCarrinho(produtoId) {
    delete carrinho[produtoId];
    atualizarCarrinho();
    atualizarContadorCarrinho();
}

// Checkout InfinitePay
function checkoutInfinitePay() {
    const itensParaCheckout = Object.keys(carrinho)
        .filter(id => carrinho[id] > 0)
        .map(id => {
            const produtoInfo = PRODUTOS.find(p => p.id === id);
            return {
                name: produtoInfo.name,
                price: produtoInfo.priceCents,
                quantity: carrinho[id]
            };
        });

    if (itensParaCheckout.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const jsonString = JSON.stringify(itensParaCheckout);
    const encodedItems = encodeURIComponent(jsonString).replace(/%20/g, '+');
    const checkoutUrl = `https://checkout.infinitepay.io/${INFINITEPAY_HANDLE}?items=${encodedItems}&redirect_url=${encodeURIComponent(REDIRECT_URL)}`;
    
    console.log("URL de Checkout:", checkoutUrl);
    window.open(checkoutUrl, '_blank');
}
