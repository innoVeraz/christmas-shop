//hamburger menu
const hamburgerButton = document.querySelector('.hamburger-menu-icon');
const mobileNav = document.querySelector('.mobile-nav');
hamburgerButton.addEventListener('click', toggleHamburger);
function toggleHamburger(event) {
  event.currentTarget.classList.toggle('change');
  mobileNav.classList.toggle('hidden');
}

//render products on webpage
const productEl = document.querySelector('.product-container');
const cartItemsEl = document.querySelector('.shopping-cart');

//Render
function renderProducts() {
  products.forEach(product => {
    productEl.innerHTML += `
    <article class="product-information">
      <img src="${product.img[0]}" alt="" width="" height="">
      <p>${product.price}kr</p>
      <h3>${product.name}</h3>
      <button class="add-to-cart" onclick="addToCart(${product.id})">Lägg till</button>
    </article>`;
  });
}
renderProducts();

//cart array
let cart = [];

//add to cart
function addToCart(id) {
  //check if product already exist
  if (cart.some(item => item.id === id)) {
    alert('product already in cart');
  } else {
    const cartItem = products.find(product => product.id === id);
    cart.push({
      ...cartItem,
      numberOfUnits: 1,
    });
  }
  updateCart();
  console.log(cart);
}

//update cart
function updateCart() {
  renderCartItems();
  //renderSubtotal();
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = '';
  cart.forEach(item => {
    cartItemsEl.innerHTML += `

    <div class="master">
    <div class="cart-img">
    <img src="${item.img[0]}" width="auto" height="200" alt="${item.name}">
    </div>
    <article class="cart-info">
    <button class="trash-can"><i class="fa-regular fa-trash-can"></i></button>
      <h4 class="item-name">${item.name}</h4>
      <div class="units">
        <div class="cart-btns">
          <button class="decrease-btn" type="button" data-operator="decrease">-</button>
          <div class="unit-number">${item.numberOfUnits}</div>
          <button class="increase-btn" type="button" data-operator="increase">+</button>
        </div>
      </div>
      <div class="item-amount">${item.price}</div>
    </article>
    </div>`;
  });
}

// scroll to hide desktop nav
let scrollPos = 0;
const nav = document.querySelector('.desktop-nav');

function checkPosition() {
  let windowY = window.scrollY;
  if (windowY < scrollPos) {
    // Scrolling UP
    nav.classList.add('is-visible');
    nav.classList.remove('hidden');
  } else {
    // Scrolling DOWN
    nav.classList.add('hidden');
    nav.classList.remove('is-visible');
  }
  scrollPos = windowY;
}

window.addEventListener('scroll', checkPosition);

// form valuation
const generateBtn = document.querySelector('#place-order');
const emailField = document.querySelector('#email');
const nameField = document.querySelector('#full-name');
const adressField = document.querySelector('#adress');
const cityField = document.querySelector('#city');
const zipCodeField = document.querySelector('#zip-code');

//för att upptäcka om någon fyllt i något
nameField.addEventListener('change', checkName);

function checkName() {
  if (nameField.value.indexOf(' ') > -1) {
  }
}
