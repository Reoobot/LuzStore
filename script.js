 // Toggle menu visibility
 const toggle = document.getElementById('menu-toggle');
 const navLinks = document.getElementById('nav-links');

 toggle.addEventListener('click', () => {
     navLinks.classList.toggle('active');
 });
// Función para renderizar los productos y categorías
function renderProducts(data) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar el contenedor

    // Recorrer las categorías y productos
    data.forEach(category => {
        // Crear el título de la categoría
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = category.category; // Mostrar nombre de la categoría
        productList.appendChild(categoryTitle);

        // Crear un contenedor para los productos de la categoría
        const productContainer = document.createElement('div');
        productContainer.classList.add('row', 'product-container');

        category.products.forEach(product => {
            const productCol = document.createElement('div');
            productCol.classList.add('col-md-3', 'mb-4'); // Mostrar 4 columnas por fila

            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // Crear el contenido del producto
            productCard.innerHTML = `
                <img src="${product.images[0]}" alt="${product.title}" class="product-img-main" data-image="${product.images[0]}" data-bs-toggle="modal" data-bs-target="#imageModal">
                <div class="product-info">
                    <div class="product-title">${product.title}</div>
                    <p class="product-description">${product.description}</p>
                    <div class="image-thumbnails">
                        ${product.images.slice(1).map(img => `
                            <img src="${img}" alt="Imagen secundaria" class="product-img-secondary" data-image="${img}" data-bs-toggle="modal" data-bs-target="#imageModal">
                        `).join('')}
                    </div>
                    <div class="price-button-container">
                        <div class="price">Є Consultar Precio ➤</div>
                        <a href="${product.price_link}" class="buy-btn">Ver más</a>
                    </div>
                </div>
            `;
            productCol.appendChild(productCard);
            productContainer.appendChild(productCol);
        });

        productList.appendChild(productContainer);
    });

    // Configurar los eventos para mostrar imágenes en el modal
    setupImageModal();
}

// Configurar eventos de clic para las imágenes
// Configurar eventos de clic para mostrar imágenes en el modal
function setupImageModal() {
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalLink = document.getElementById('modal-link');
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));

    // Escuchar clics en todas las imágenes (principal y secundarias)
    document.querySelectorAll('.product-img-main, .product-img-secondary').forEach(img => {
        img.addEventListener('click', function() {
            const productData = JSON.parse(this.getAttribute('data-product')); // Obtener los datos del producto desde el atributo data-product

            // Actualizar los contenidos del modal con los datos del producto
            modalImage.src = this.src;  // Establecer la imagen que se hizo clic
            modalTitle.textContent = productData.title;  // Título del producto
            modalDescription.textContent = productData.description;  // Descripción del producto
            modalPrice.textContent = `€ 🡇`;  // Precio (ajustar según cómo se guarda el precio en los datos)
            modalLink.href = productData.price_link;  // Enlace para ver más detalles

            // Mostrar el modal
            modal.show(); // Mostrar el modal manualmente
        });
    });
}
// Cargar datos usando fetch
fetch('/biblias.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar los datos: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        renderProducts(data); // Renderizar productos con los datos obtenidos
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
    });
