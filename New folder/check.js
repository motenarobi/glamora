document.addEventListener('DOMContentLoaded', function() {
    // Load cart data (existing code)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItems = document.getElementById('order-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const deliveryEl = document.getElementById('checkout-delivery');
    const totalEl = document.getElementById('checkout-total');
    const paymentOptions = document.querySelectorAll('.payment-option input');
    const cardDetails = document.getElementById('card-details');
    const shippingForm = document.getElementById('shipping-form');

    // Generate a unique order ID (add this new function)
    function generateOrderId() {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000);
        return `GLAMORA-${timestamp}-${randomNum}`;
    }

    // Render order summary 
    function renderOrderSummary() {
        orderItems.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            window.location.href = '../html/products.html';
            return;
        }

        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            
            const itemEl = document.createElement('div');
            itemEl.className = 'order-item';
            itemEl.innerHTML = `
                <div class="order-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity}</p>
                </div>
                <div class="order-item-price">KSh ${(item.price * item.quantity).toFixed(2)}</div>
            `;
            
            orderItems.appendChild(itemEl);
        });

        const delivery = 200;
        subtotalEl.textContent = `KSh ${subtotal.toFixed(2)}`;
        deliveryEl.textContent = `KSh ${delivery.toFixed(2)}`;
        totalEl.textContent = `KSh ${(subtotal + delivery).toFixed(2)}`;
    }


    // Handle payment method toggle
    paymentOptions.forEach(option => {
       option.addEventListener('change', function() {
            document.querySelector('.payment-option.active').classList.remove('active');
            this.parentElement.classList.add('active');
            
            if (this.id === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });

    // Form submission 
    shippingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const paymentMethod = document.querySelector('input[name="payment"]:checked').id;
        
        if (paymentMethod === 'mpesa') {
            processMpesaPayment();
        } else {
            processCardPayment();
        }
    });

    // Process M-Pesa Payment
    async function processMpesaPayment() {
        const btn = document.querySelector('.place-order-btn');
        btn.disabled = true;
        btn.textContent = 'Processing M-Pesa Payment...';
        
        // Get customer phone number 
        const phone = prompt("Please enter your M-Pesa phone number (2547XXXXXXX):");
        if (!phone || !phone.startsWith('254')) {
            alert('Please enter a valid M-Pesa number starting with 254');
            btn.disabled = false;
            btn.textContent = 'Place Order';
            return;
        }
        // In your processMpesaPayment() function:
localStorage.setItem('lastOrderId', orderId); // Save for confirmation page
localStorage.setItem('lastOrderCart', JSON.stringify(cart)); // Save cart copy
window.location.href = `../html/confirmation.html?order_id=${orderId}`;

        // Calculate total amount
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = 200;
        const total = subtotal + delivery;
        
        // Generate order ID
        const orderId = generateOrderId();

        try {
            // Call your backend to initiate STK Push
            const response = await fetch('https://yourbackend.com/initiate_mpesa.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone,
                    amount: total,
                    order_id: orderId
                })
            });

            const result = await response.json();
            
            if (result.success) {
                // Show success message
                alert('M-Pesa payment request sent! Please complete the payment on your phone.');
                
                // Poll for payment confirmation (simplified version)
                const paymentConfirmed = await checkPaymentStatus(orderId);
                if (paymentConfirmed) {
                    localStorage.removeItem('cart');
                    window.location.href = '../html/confirmation.html';
                } else {
                    alert('Payment not completed. Please try again.');
                    btn.disabled = false;
                    btn.textContent = 'Place Order';
                }
            } else {
                throw new Error(result.error || 'Failed to initiate payment');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed: ' + error.message);
            btn.disabled = false;
            btn.textContent = 'Place Order';
        }
    }

    // Check payment status (new function)
    async function checkPaymentStatus(orderId) {
        // This would call your backend to verify if payment was completed
        // In a real implementation, you would poll your server or use webhooks
        
        // Simplified version for demo:
        return new Promise((resolve) => {
            setTimeout(() => {
                // In reality, you would check your database via API
                resolve(true); // Assume payment succeeded for demo
            }, 5000);
        });
    }

    // Process Card Payment (existing code)
    function processCardPayment() {
        // ... (keep your existing implementation)
    }

    // Initialize (existing code)
    renderOrderSummary();
});