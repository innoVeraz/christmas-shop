// import './style/style.scss';
const hamburgerButton = document.querySelector('.hamburger-menu-icon');
hamburgerButton.addEventListener('click', toggleHamburger);
function toggleHamburger(event) {
  event.currentTarget.classList.toggle('change');
}
//producy array
const products = [
  {
    name: 'Tomte vit/grå',
    id: 0,
    price: 199,
    originalPrice: 199,
    rating: 3,
    amount: 0,
    sum: 0,
    img: ['src/style/shop-img/tomte-vit-1.png'],
    alt: ['', ''],
    description: 'Tovad gråvit tomte',
    category: ['tomtar', 'all'],
  },
  {
    name: 'Tomte vit/grå',
    id: 1,
    price: 199,
    originalPrice: 199,
    rating: 3,
    amount: 0,
    sum: 0,
    img: ['', ''],
    alt: ['', ''],
    description: 'Smak av choklad',
    category: ['tomtar', 'all'],
  },
  {
    name: 'Tomte vit/grå',
    id: 2,
    price: 199,
    originalPrice: 199,
    rating: 3,
    amount: 0,
    sum: 0,
    img: ['', ''],
    alt: ['', ''],
    description: 'Smak av choklad',
    category: ['tomtar', 'all'],
  },
];

const productContainer = document.querySelector('.product-container');

for (let i = 0; i < products.length; i++) {
  const product = products[i];
  productContainer.innerHTML += `
    <article class= "xmas-item"
    <h2>${product.name}</h2>
    <img src="${product.img[0]}" alt="" width="200" height="300">
    </article>`;
}
