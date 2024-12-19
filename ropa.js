// URL de la API
const jsonUrl = 'https://reoobot.github.io/RopaAfiliados/ropa.json';
const imageBaseUrl = 'https://reoobot.github.io/RopaAfiliados/'; // Base URL para las imágenes

// Función para renderizar los productos
function renderProducts(data) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar el contenedor

    // Recorrer las categorías y productos
    data.forEach(category => {
        // Crear el título de la categoría
        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = category.category;
        productList.appendChild(categoryTitle);

        const productContainer = document.createElement('div');
        productContainer.classList.add('row');

        category.products.forEach(product => {
            const productCol = document.createElement('div');
            productCol.classList.add('col-md-4', 'mb-4');

            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // Crear el contenido del producto
            productCard.innerHTML = `
                <img src="${imageBaseUrl}${product.images[0]}" alt="${product.title}" class="product-img-main" data-product='${JSON.stringify(product)}' data-bs-toggle="modal" data-bs-target="#imageModal">
                <div class="product-info">
                    <div class="product-title">${product.title}</div>
                    <p class="product-description">${product.description}</p>
                    <div class="d-flex">
                        ${product.images.slice(1).map(image => `
                            <img src="${imageBaseUrl}${image}" alt="${product.title}" class="product-img-secondary" data-product='${JSON.stringify(product)}' data-bs-toggle="modal" data-bs-target="#imageModal">
                        `).join('')}
                    </div>
                    <div class="price-button-container">
                        <a href="${product.price_link}" target="_blank" class="buy-btn">Ver más</a>
                    </div>
                </div>
            `;
            productCol.appendChild(productCard);
            productContainer.appendChild(productCol);
        });

        productList.appendChild(productContainer);
    });

    // Configurar eventos del modal
    setupImageModal();
}

// Configurar eventos de clic para mostrar imágenes en el modal
function setupImageModal() {
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));

    document.querySelectorAll('.product-img-main, .product-img-secondary').forEach(img => {
        img.addEventListener('click', function() {
            const productData = JSON.parse(this.getAttribute('data-product'));

            // Actualizar los contenidos del modal
            modalImage.src = this.src;
            modalTitle.textContent = productData.title;
            modalDescription.textContent = productData.description;
            modalLink.href = productData.price_link;

            modal.show();
        });
    });
}

// Cargar datos usando fetch
fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar los datos: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        renderProducts(data);
        console.log("respuesta",jsonUrl);
        
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
    });

        // Toggle menu visibility
 const toggle = document.getElementById('menu-toggle');
 const navLinks = document.getElementById('nav-links');

 toggle.addEventListener('click', () => {
     navLinks.classList.toggle('active');
 });
