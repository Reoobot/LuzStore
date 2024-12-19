// URL de la API y base URL para imágenes
const jsonUrl = 'https://reoobot.github.io/NewProductAfiliados/newProduc.json';
const imageBaseUrl = 'https://reoobot.github.io/NewProductAfiliados/'; 

// Fetch data y crear las tarjetas
fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar los datos: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const cardsContainer = document.getElementById('cards-container');

        data.forEach(item => {
            // Crear tarjeta
            const card = document.createElement('div');
            const imageUrl = `${imageBaseUrl}${item.image}`; 

            card.className = 'col';
            card.innerHTML = `
                <div class="card">
                    <a href="${item.link}">
                        <img src="${imageUrl}" alt="${item.title}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            ${item.offer ? '<span class="badge bg-warning text-dark">¡Oferta!</span>' : ''}
                        </div>
                    </a>
                </div>`;
            cardsContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error al cargar los datos:', error));
// Toggle menu visibility
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});