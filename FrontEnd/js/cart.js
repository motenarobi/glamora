// cart.js - Complete Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cartContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const deliveryEl = document.getElementById('delivery');
    const totalEl = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Constants
    const DELIVERY_FEE = 200;
    const EMPTY_CART_HTML = `
        <div class="empty-cart">
            <img src="../images/empty-cart.png" alt="Empty cart">
            <h3>Your beauty bag is empty</h3>
            <a href="../html/products.html" class="btn-pink">Shop Now</a>
        </div>
    `;

    // Load cart data
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 1. Calculate subtotal
    function calculateSubtotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // 2. Update all totals
    function updateTotals() {
        const subtotal = calculateSubtotal();
        subtotalEl.textContent = `KSh ${subtotal.toFixed(2)}`;
        deliveryEl.textContent = `KSh ${DELIVERY_FEE.toFixed(2)}`;
        totalEl.textContent = `KSh ${(subtotal + DELIVERY_FEE).toFixed(2)}`;
    }

    // 3. Render cart items
    function renderCart() {
        cartContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartContainer.innerHTML = EMPTY_CART_HTML;
            checkoutBtn.disabled = true;
            updateTotals();
            return;
        }

        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">KSh ${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn minus" data-id="${item.id}">−</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
                <div class="item-total">
                    KSh ${(item.price * item.quantity).toFixed(2)}
                </div>
            `;
            cartContainer.appendChild(itemEl);
        });

        updateTotals();
        checkoutBtn.disabled = false;
    }

    // 4. Event listeners
    cartContainer.addEventListener('click', function(e) {
        const target = e.target.closest('button');
        if (!target) return;

        const itemId = parseInt(target.dataset.id);
        const itemIndex = cart.findIndex(item => item.id === itemId);

        if (target.classList.contains('qty-btn')) {
            if (target.classList.contains('plus')) {
                cart[itemIndex].quantity++;
            } else {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    cart.splice(itemIndex, 1);
                }
            }
        } 
        else if (target.classList.contains('remove-btn')) {
            cart.splice(itemIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    });

    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            window.location.href = 'checkout.html';
        }
    });

    // Initial render
    renderCart();
});