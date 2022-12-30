import { products } from './products';
const cartItemsEl = document.querySelector('.shopping-cart');
const cartContent = document.querySelector('.shopping-cart-content');
const cartFooterEl = document.querySelector('.shopping-cart-footer');
const cartIcon = document.querySelector('.gift-icon');
const cartNumber = document.querySelector('.cart-item-number');

let cart = JSON.parse(localStorage.getItem('CART')) || []; //cart array with local storage

cartIcon.addEventListener('click', openCart);

updateCart();

function updateCart() {
  renderCartItems();
  renderSubtotal();
  cartNumber && updateCartNumber();

  localStorage.setItem('CART', JSON.stringify(cart));
}

function updateCartNumber() {
  const productCount = cart.reduce(
    (count, item) => (count = count + item.numberOfUnits),
    0
  );

  cartNumber.innerHTML = productCount;
}

function openCart() {
  cartItemsEl.classList.toggle('hej');
}

function renderCartItems() {
  cartContent.innerHTML = '';
  cart.forEach(item => {
    cartContent.innerHTML += `
    
      <article class="cart-item-wrapper">
        <div class="cart-img"><img src="${item.img[0]}" width="auto" height="200" alt="${item.name}"></div>
        
        <div class="cart-details-wrapper">
          <button class="trash-can" data-id="${item.id})"><i class="fa-regular fa-trash-can"></i></button>
          <p class="item-name">${item.name}</p>
          <div class="cart-btns-wrapper">
            <button class="minus-btn" data-id="${item.id}" type="button">-</button>
            <div class="units">${item.numberOfUnits}</div>
            <button class="plus-btn" data-id="${item.id}" type="button">+</button>
          </div>
          <div class="item-price">${item.price}kr/st</div>
          
        </div>
      </article>
      `;
  });
}

function renderSubtotal(rebate = false) {
  let totalPrice = 0;
  const delivery = 49;
  cart.forEach(item => {
    totalPrice += item.price * item.numberOfUnits;
  });
  let rebateHtml = '';
  if (rebate) {
    totalPrice = totalPrice * 0.76;
    rebateHtml = `  <div>Rabatt:</div>
    <div class="rebate-amount-number">- 24%</div>`;
  }
  const sum = totalPrice + delivery;
  cartFooterEl.innerHTML = `
  <div>Beställningsvärde:</div>
  <div>${totalPrice.toFixed(2)}</div>
  ${rebateHtml}
  <div>Leverans:</div>
  <div>${delivery.toFixed(2)}</div>
  <div>Summa:</div>
  <div>${sum.toFixed(2)}</div>
  <a class="go-to-checkout" href="checkout.html">Gå till kassan</a>
  
  `;
}

export function addToCart(id) {
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

function removeCartItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

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
