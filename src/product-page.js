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
      <img src="${product.img[0]}" alt="" width="" height="200">
      <div class="rating-and-price">
      <span>${product.price} kr</span>
      ${renderRating(product.rating)}
      </div>
      <h3>${product.name}</h3>
      <button class="add-to-cart" onclick="addToCart(${product.id})">Lägg till</button>
    </article>`;
    });
}

function renderRating(rating) {
  let html = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `
        <i class="fa-regular fa-snowflake color-rating"></i>
        `;
    } else {
      html += `
        <i class="fa-regular fa-snowflake rating-color-none"></i>
        `;
    }
  }
  return html;
}

function onSortingChange() {
  renderProducts(this.value);
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
