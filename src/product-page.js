import { products } from './products';
import { addToCart } from './shopping-cart';
const productEl = document.querySelector('.product-container');
const category = window.location.search.split('?category=')[1] || 'alla';
const sortingEl = document.querySelector('.drop-down-filter');

sortingEl.addEventListener('change', onSortingChange);

renderProducts();

function renderProducts(sorting) {
  productEl.innerHTML = '';

  products
    .filter(product => product.category.includes(category))
    .sort((a, b) => sortProducts(a, b, sorting))
    .forEach(product => {
      productEl.innerHTML += `
    <article class="product-information">
      <img loading="lazy" src="${product.img[0]}" alt="${product.alt}">
      <div class="rating-and-price">
      ${renderRating(product.rating)}
      </div>
      <h3>${product.name}</h3>
      <div class="price">${product.price} SEK</div>
      <button class="add-to-cart" data-id="${product.id}">Lägg till</button>
    </article>`;
    });
  document.querySelectorAll('.add-to-cart').forEach(el => {
    el.addEventListener('click', function (event) {
      addToCart(parseInt(event.currentTarget.dataset.id));
    });
  });
}

function renderRating(rating) {
  let html = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `
      <i class="fa-solid fa-heart color-rating"></i>
        
        `;
    } else {
      html += `
       <i class="fa-solid fa-heart rating-color-none"></i>
    
        `;
    }
  }
  return html;
}

function onSortingChange(event) {
  renderProducts(event.target.value);
}

function sortProducts(a, b, sorting) {
  switch (sorting) {
    case 'pris-stigande':
      return a.price - b.price;
    case 'pris-fallande':
      return b.price - a.price;
    case 'rating-stigande':
      return a.rating - b.rating;
    case 'rating-fallande':
      return b.rating - a.rating;
    default:
      return 0;
  }
}
