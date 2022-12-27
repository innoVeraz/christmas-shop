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
      <p>${product.price}kr</p>
      <h3>${product.name}</h3>
      <button class="add-to-cart" onclick="addToCart(${product.id})">Lägg till</button>
    </article>`;
    });
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
