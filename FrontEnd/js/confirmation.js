document.addEventListener('DOMContentLoaded', function() {
    // Get order details from localStorage or URL params
    const orderId = new URLSearchParams(window.location.search).get('order_id') 
        || localStorage.getItem('lastOrderId') 
        || 'GLAMORA-' + Math.floor(Math.random() * 10000);
    
    // Set order ID
    document.getElementById('order-id').textContent = orderId;
    
    // Set delivery date (3 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    document.getElementById('delivery-date').textContent = 
        deliveryDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });

    // If you want to show order items (from localStorage)
    const cart = JSON.parse(localStorage.getItem('lastOrderCart')) || [];
    const orderItemsEl = document.getElementById('order-items');
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        orderItemsEl.innerHTML += `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity} × KSh ${item.price.toFixed(2)}</p>
                </div>
                <span>KSh ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });

    // Set totals
    const delivery = 200;
    document.getElementById('confirmation-subtotal').textContent = `KSh ${subtotal.toFixed(2)}`;
    document.getElementById('confirmation-total').textContent = `KSh ${(subtotal + delivery).toFixed(2)}`;
});