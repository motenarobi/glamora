 const container = document.querySelector('.categories-container');
        
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        });
        
        // Handle category clicks - navigate to products.html
        document.querySelectorAll('.category').forEach(category => {
            category.addEventListener('click', function() {
                const categoryName = this.getAttribute('data-category');
                
                // Store the selected category in localStorage
                localStorage.setItem('selectedCategory', categoryName);
                
                // Navigate to products.html
                window.location.href = 'products.html';
                
               
            });
        });