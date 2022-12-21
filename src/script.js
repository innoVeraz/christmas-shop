//hamburger menu
const hamburgerButton = document.querySelector('.hamburger-menu-icon');
const mobileNav = document.querySelector('.mobile-nav');
hamburgerButton.addEventListener('click', toggleHamburger);
function toggleHamburger(event) {
  event.currentTarget.classList.toggle('change');
  mobileNav.classList.toggle('hidden');
}

// click to show shopping cart
const cartIcon = document.querySelector('.gift-icon');
cartIcon.addEventListener('click', openCart);
const cartItemsEl = document.querySelector('.shopping-cart');
const cartContent = document.querySelector('.shopping-cart-content');
const productEl = document.querySelector('.product-container');
const cartFooterEl = document.querySelector('.checkout-footer');

function openCart() {
  cartItemsEl.classList.toggle('hidden');
}

//render products on webpage
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

function addToCart(id) {
  //check if product already exist
  if (cart.some(item => item.id === id)) {
    changeNumberOfUnits('plus', id);
  } else {
    const cartItem = products.find(product => product.id === id);
    cart.push({
      ...cartItem,
      numberOfUnits: 1,
    });
  }
  updateCart();
}

//update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();
}

function renderSubtotal() {
  let totalPrice = 0;
  const delivery = 49;
  cart.forEach(item => {
    totalPrice += item.price * item.numberOfUnits;
  });
  const sum = totalPrice + delivery;
  cartFooterEl.innerHTML = `
<div>Beställningsvärde:</div>
<div>${totalPrice.toFixed(2)}</div>
<div>Leverans:</div>
<div>${delivery.toFixed(2)}</div>
<div>Summa:</div>
<div>${sum.toFixed(2)}</div>

<button>Gå till kassan</button>
`;
}

// render cart items
function renderCartItems() {
  cartContent.innerHTML = '';
  cart.forEach(item => {
    cartContent.innerHTML += `

    <article class="cart-item-wrapper">
    <div class="cart-img"><img src="${item.img[0]}" width="auto" height="200" alt="${item.name}"></div>
    <button class="trash-can"><i class="fa-regular fa-trash-can"></i></button>
    <div class="cart-details-wrapper">
      <h4 class="item-name">${item.name}</h4>
      
      <div class="cart-btns-wrapper">
        <button id="minus-btn" onclick="changeNumberOfUnits('minus', ${item.id})" type="button">-</button>
        <div class="units">${item.numberOfUnits}</div>
        <button id="plus-btn" onclick="changeNumberOfUnits('plus', ${item.id})" type="button">+</button>
      </div>
      <div class="item-amount">${item.price}</div>
    </div>
    
  </article>
    `;
  });
}

//change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map(item => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === 'minus' && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === 'plus') {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
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

//christmas lights
