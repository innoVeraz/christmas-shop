// click to show shopping cart
const cartIcon = document.querySelector('.gift-icon');
cartIcon.addEventListener('click', openCart);
const cartItemsEl = document.querySelector('.shopping-cart');
const cartContent = document.querySelector('.shopping-cart-content');

const cartFooterEl = document.querySelector('.shopping-cart-footer');
//const checkoutEl = document.querySelector('.checkout');

function openCart() {
  cartItemsEl.classList.toggle('hidden');
}

//cart array
let cart = JSON.parse(localStorage.getItem('CART')) || [];

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
updateCart();

//update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem('CART', JSON.stringify(cart));
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
<a class="go-to-checkout" href="checkout.html">Gå till kassan</a>

`;
}

// render cart items
function renderCartItems() {
  cartContent.innerHTML = '';
  cart.forEach(item => {
    cartContent.innerHTML += `
    <article class="cart-item-wrapper">
      <div class="cart-img"><img src="${item.img[0]}" width="auto" height="200" alt="${item.name}"></div>
      
      <div class="cart-details-wrapper">
        <button class="trash-can" onclick="removeCartItem(${item.id})"><i class="fa-regular fa-trash-can"></i></button>
        <p class="item-name">${item.name}</p>
        <div class="cart-btns-wrapper">
          <button class="minus-btn" onclick="changeNumberOfUnits('minus', ${item.id})" type="button">-</button>
          <div class="units">${item.numberOfUnits}</div>
          <button class="plus-btn" onclick="changeNumberOfUnits('plus', ${item.id})" type="button">+</button>
        </div>
        <div class="item-amount">Pris: ${item.price} kr</div>
      </div>
    </article>
    `;
  });
}

function removeCartItem(id) {
  console.log('removed');
  cart = cart.filter(item => item.id !== id);
  updateCart();
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
