// Sample product data (you can fetch this from your database)
const products = [
    { name: 'Product 1', description: 'Description 1', price: 10 },
    { name: 'Product 2', description: 'Description 2', price: 20 },
    { name: 'Product 3', description: 'Description 3', price: 30 },
    // Add more products here
];

// Constants for pagination
const cardsPerPage = 4;
let currentPage = 1;

// Function to generate product cards
function generateProductCards() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear previous cards

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    for (let i = startIndex; i < endIndex && i < products.length; i++) {
        const product = products[i];

        // Create a card element
        const card = document.createElement('div');
        card.classList.add('card');
        // Create card content (image, title, description, price, button, etc.)
        // Append card content to the card element

        // Append the card element to the product container
        productContainer.appendChild(card);
    }
}

// Function to handle "Next" button click
document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPage < Math.ceil(products.length / cardsPerPage)) {
        currentPage++;
        generateProductCards();
    }
});

// Function to handle "Previous" button click
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        generateProductCards();
    }
});

// Initial load of product cards
generateProductCards();
