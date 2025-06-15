const products = [
            {
                id: 1,
                name: "Fenty Moisturizing Primer",
                price: 900,
                rating: 4.5,
                category: "face",
                description: "Fenty Primer is a smooth, pore-blurring base that preps skin for flawless makeup application while keeping it shine-free all day.",
                image: "../images/primer f.jpg"
            },
            {
                id: 2,
                name: "Huda beauty Blush",
                price: 2500,
                rating: 4,
                category: "face",
                description: "Huda beauty Cheeky Tint Blush delivers a lightweight, bleandable wash of buildable color for a natural,long-lasting flush.",
                image: "../images/huda b.jpg"
            },
            {
                id: 3,
                name: "Fenty Lip oil",
                price: 2000,
                rating: 4.7,
                category: "lips",
                description: "Non-sticky hydrating oil that nourishes and softens lips with cherry jojoba and rosehip oils leaving a glossy finish and fruity scent.",
                image: "../images/lip oil.jpg"
            },
            {
                id: 4,
                name: "Vitamin C Serum",
                price: 1200,
                rating: 4.2,
                category: "skincare",
                description: "This potent antioxidant serum brightens skin, reduces the appearance of dark spots, and boosts collagen production. With 20% vitamin C, it helps protect against free radical damage while improving skin texture and tone.",
                image: "../images/garnier serum.jpg"
            },
            {
                id: 5,
                name: "Professional Makeup Brush Set",
                price: 2500,
                rating: 3.8,
                category: "tools",
                description: "A complete 12-piece brush set for flawless makeup application. Made with ultra-soft synthetic fibers that are cruelty-free and perfect for both liquid and powder products. Includes a travel case.",
                image: "../images/brushes.jpg"
            },
            {
                id: 6,
                name: "La Roche Posay Suncreen",
                price: 3500,
                rating: 4.7,
                category: "skincare",
                description: "Color-correcting cream that evens skin tone while providing sun protection and hydration. This multitasking product combines skincare and makeup with a lightweight formula that adapts to your skin tone.",
                image: "../images/sunscreen.jpg"
            },
            {
                id: 7,
                name: " Sephora Eyeshadow Palette",
                price: 1200,
                rating: 4.4,
                category: "eyes",
                description: "A versatile 12-shade palette with matte and shimmer finishes. Highly pigmented colors blend effortlessly and last all day without creasing. Perfect for creating both natural daytime looks and dramatic evening styles.",
                image: "../images/sephora eye pallet.jpg"
            },
            {
                id: 8,
                name: " She Glam Lip oil",
                price: 1200,
                rating: 4.3,
                category: "lips",
                description: "A lip gloss that gives your lips an irresistible look with great stability that lasts all day.",
                image: "../images/she glam.jpg"
            },
             {
                id: 9,
                name: "CeraVe Cleanser",
                price: 1200,
                rating: 4.3,
                category: "skincare",
                description: "Designed to effectively remove dirt and oil without stripping the skin's natural moisture barrier, which is crucial for maintaining skin health..",
                image: "../images/cleanser.jpg"
            },
             {
                id: 10,
                name: "Makeup Sponge",
                price: 300,
                rating: 3.3,
                category: "tools",
                description: "A versatile tool used for applying and blending makeup, typically made of soft, porous material like foam or latex.",
                image: "../images/set of sponge.jpg"
            },
             {
                id: 11,
                name: " Fenty Foundation",
                price: 2200,
                rating: 4.3,
                category: "face",
                description: "The Pro Filt'r Soft Matte Longwear Foundation, known for its climate-adaptive technology and longwear, soft matte finish, and the Soft'lit Naturally Luminous Longwear Foundation, which provides a dewy, naturally radiant finish ",
                image: "../images/foundation.jpg"
            },
             {
                id: 12,
                name: " Rare beauty lipstick",
                price: 1200,
                rating: 4.3,
                category: "lips",
                description: "The Kind Words Lipstick is a more traditional, buttery formula, while the Lip Soufflé is a weightless, air-whipped cream. .",
                image: "../images/rare lipstick.jpg"
            },
             {
                id: 13,
                name: " Nivea Cherry Moisturizer",
                price: 700,
                rating: 4.3,
                category: "skincare",
                description: "Known for it's nourishing and protective properties, often enriched with ingredients like Vitamin E and Jojoba oil.",
                image: "../images/moisturizer.jpg"
            },
             {
                id: 14,
                name: "Weyolog eyeliner",
                price: 600,
                rating: 4.3,
                category: "eyes",
                description: "A cosmetic used to accentuate the eyes by creating a line along the lash line, often used to define the eyes and create a more dramatic or natural look.",
                image: "../images/eye liner.jpg"
            },
             {
                id: 15,
                name: " Nars Concealer",
                price: 2100,
                rating: 4.5,
                category: "face",
                description: "The Radiant Creamy Concealer is a versatile, medium-coverage concealer known for its 16-hour wear, hydrating formula, and ability to blur imperfections and fine lines.",
                image: "../images/concealer.jpg"
            }
            
        ];

       // Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const productsContainer = document.getElementById('products-container');
const navTabs = document.querySelectorAll('.nav-tabs button');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const productModal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-modal');

// ====== WAVE EFFECT ADDITION ======
// Add these CSS classes dynamically
const waveEffectStyles = `
    <style>
        .product-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .product-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
        @keyframes waveIn {
            0% { opacity: 0; transform: translateY(30px) rotate(-2deg); }
            100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        @keyframes waveInOdd {
            0% { opacity: 0; transform: translateY(30px) rotate(2deg); }
            100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
    </style>
`;
document.head.insertAdjacentHTML('beforeend', waveEffectStyles);

// Modified displayProducts function with wave effect
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    
    productsToDisplay.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.ceil(product.rating));
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">Ksh ${product.price.toFixed(2)}</div>
                <div class="product-rating" title="${product.rating} out of 5">${stars}</div>
                <p class="product-description">${product.description}</p>
                <button class="see-more" data-id="${product.id}">See More</button>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
        
        // Wave effect animation
        setTimeout(() => {
            productCard.classList.add('visible');
            if (index % 2 === 0) {
                productCard.style.animation = 'waveIn 0.8s forwards';
            } else {
                productCard.style.animation = 'waveInOdd 0.8s forwards';
            }
        }, 100 * index); // Staggered delay
    });
    
       
            
            // Add event listeners to "See More" buttons
            document.querySelectorAll('.see-more').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.getAttribute('data-id'));
                    showProductDetails(productId);
                });
            });
            
            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.getAttribute('data-id'));
                    addToCart(productId);
                });
            });
        }

        // Show product details in modal
        function showProductDetails(productId) {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.ceil(product.rating));
                
                modalContent.innerHTML = `
                    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                        <img src="${product.image}" alt="${product.name}" style="width: 200px; height: 200px; object-fit: cover;">
                        <div>
                            <h2 style="margin-top: 0;">${product.name}</h2>
                            <div style="font-size: 24px; font-weight: bold; color: #ff6b81; margin: 10px 0;">Ksh ${product.price.toFixed(2)}</div>
                            <div style="color: #ffc107; font-size: 20px; margin: 10px 0;" title="${product.rating} out of 5">${stars}</div>
                            <button class="add-to-cart" data-id="${product.id}" style="padding: 10px 20px; background-color: #ff6b81; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Add to Cart</button>
                        </div>
                    </div>
                    <div>
                        <h3>Description</h3>
                        <p>${product.description}</p>
                    </div>
                `;
                
                // Add event listener to modal's "Add to Cart" button
                modalContent.querySelector('.add-to-cart').addEventListener('click', () => {
                    addToCart(productId);
                    productModal.style.display = 'none';
                });
                
                productModal.style.display = 'flex';
            }
        }
             
       

        // Add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} has been added to your cart!`);
            }
        }

        // Filter products by category
        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                navTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const category = tab.getAttribute('data-category');
                let filteredProducts = products;
                
                if (category !== 'all') {
                    filteredProducts = products.filter(product => product.category === category);
                }
                
                displayProducts(filteredProducts);
            });
        });

        // Search functionality
        searchButton.addEventListener('click', searchProducts);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
        
        function searchProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const activeCategory = document.querySelector('.nav-tabs button.active').getAttribute('data-category');
            
            let filteredProducts = products;
            
            if (activeCategory !== 'all') {
                filteredProducts = products.filter(product => product.category === activeCategory);
            }
            
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) || 
                    product.description.toLowerCase().includes(searchTerm)
                );
            }
            
            displayProducts(filteredProducts);
        }
         // Close modal
        closeModal.addEventListener('click', () => {
            productModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === productModal) {
                productModal.style.display = 'none';
            }
        });

        // Initialize
        displayProducts(products);

       