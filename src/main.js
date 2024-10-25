import { products } from './products';
const hamburgerButton = document.querySelector('.hamburger-menu-icon');
const mobileNav = document.querySelector('.mobile-nav');
const desktopNav = document.querySelector('.desktop-nav');
const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');
const viewAllProductsBtn = document.querySelector('.view-all-products-btn');
const closeCartBtn = document.querySelector('.close-cart');

const sound = document.getElementById('button-sound');
const placeOrderBtn = document.getElementById('placeOrderBtn');

scrollToTopBtn?.addEventListener('click', scrollToTop);
viewAllProductsBtn?.addEventListener('click', goToAllProducts);
placeOrderBtn?.addEventListener('click', placeOrder);
closeCartBtn?.addEventListener('click', closeCart);

function closeCart() {
  cartItemsEl.classList.remove('open');
}

function placeOrder() {
  if (emailIsOk && nameIsOk && adressIsOk && zipIsOk && cityIsOk) {
    playShortSoundWithFade();

    showToast(
      'Tack för din beställning! Bekräftelse skickas med e-post. God Jul!'
    ),
      clearOrder();
  }
}

function showToast(message) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast');

  toast.innerHTML = `
    <i class="fa fa-check-circle"></i>
    ${message}
  `;

  toastContainer.appendChild(toast);
}

// Function to fade out the sound gradually
function fadeOutSound(audio, duration) {
  let volume = audio.volume;
  const fadeDuration = duration || 8000;
  const fadeInterval = 50;
  const fadeStep = volume / (fadeDuration / fadeInterval);

  const fade = setInterval(() => {
    if (volume > 0) {
      volume = Math.max(0, volume - fadeStep);
      audio.volume = volume;
    } else {
      clearInterval(fade);
      audio.pause();
      audio.currentTime = 0;
    }
  }, fadeInterval);
}

// Function to play the sound and then fade it out
function playShortSoundWithFade() {
  if (sound) {
    sound.volume = 1;
    sound.currentTime = 0;
    sound.play().catch(error => {
      console.error('Error playing the sound:', error);
    });

    setTimeout(() => {
      fadeOutSound(sound, 8000);
    }, 2000);
  }
}

// Function that redirects the user to the product page
function goToAllProducts() {
  window.location.href = 'product-page.html';
}

if (desktopNav && mobileNav) {
  renderNavigation();
  setActive();
}

hamburgerButton?.addEventListener('click', event => {
  event.stopPropagation();
  mobileNav.classList.add('open');
});

function onClickOutside(element, callback) {
  document.addEventListener('click', event => {
    if (!element.contains(event.target)) {
      callback();
    }
  });
}

onClickOutside(mobileNav, () => {
  mobileNav.classList.remove('open');
});

function setActive() {
  const links = [
    ...mobileNav.getElementsByTagName('a'),
    ...desktopNav.getElementsByTagName('a'),
  ];

  for (let i = 0; i < links.length; i++) {
    if (document.location.href === links[i].href) {
      links[i].className = 'active';
    }
  }
}

// Navigation
function renderNavigation() {
  const navigation = ` <h3 class="nav-header">Kategorier</h3>
    <ul>
      <li><a href="product-page.html">Alla produkter</a></li>
      <li><a href="product-page.html?category=belysning">Belysning</a></li>
      <li><a href="product-page.html?category=dekoration">Dekoration</a></li>
      <li><a href="product-page.html?category=krukor">Krukor</a></li>
      <li><a href="product-page.html?category=leksaker">Leksaker</a></li>
      <li><a href="product-page.html?category=tyger">Tyger</a></li>
    </ul>`;

  mobileNav.innerHTML = navigation;
  desktopNav.innerHTML = navigation;
}

// scroll to top button
function scrollToTop() {
  window.scrollTo(0, 0);
}

// Shopping cart
const cartItemsEl = document.querySelector('.shopping-cart');
const cartContent = document.querySelector('.shopping-cart-content');
const cartFooterEl = document.querySelector('.shopping-cart-footer');
const cartIcon = document.querySelector('.gift-icon');
const cartNumber = document.querySelector('.cart-item-number');

let cart = JSON.parse(localStorage.getItem('CART')) || [];

cartIcon?.addEventListener('click', openCart);

updateCart();

function updateCart() {
  renderCartItems();
  renderSubtotal();
  if (cartNumber) {
    updateCartNumber();
  }

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
  cartItemsEl.classList.toggle('open');
}

function removeCartItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function renderCartItems() {
  cartContent.innerHTML = '';
  cart.forEach(item => {
    cartContent.innerHTML += `
   
      <article class="cart-item-wrapper">
        <div class="cart-img"><img src="${item.img[0]}" width="auto" height="200" alt="${item.name}"></div>
        
        <div class="cart-details-wrapper">
          <button class="trash-can" data-id="${item.id}"><i class="fa-regular fa-trash-can"></i></button>
         
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

  // quick rewrite since onclick=myFunction does not work in module
  const minusBtns = document.querySelectorAll('.minus-btn');
  const plusBtns = document.querySelectorAll('.plus-btn');
  const removeBtns = document.querySelectorAll('.trash-can');
  cart.forEach((_, i) => {
    minusBtns[i].addEventListener('click', function (e) {
      changeNumberOfUnits('minus', parseInt(e.currentTarget.dataset.id));
    });
    plusBtns[i].addEventListener('click', function (e) {
      changeNumberOfUnits('plus', parseInt(e.currentTarget.dataset.id));
    });
    removeBtns[i].addEventListener('click', function (e) {
      removeCartItem(parseInt(e.currentTarget.dataset.id));
    });
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
    totalPrice = totalPrice * 0.8;
    rebateHtml = `  <div>Rabatt:</div>
    <div class="rebate-amount-number">- 20%</div>`;
  }
  const sum = totalPrice + delivery;
  cartFooterEl.innerHTML = `
  <div>Beställningsvärde:</div>
  <div>${totalPrice.toFixed(2)}</div>
  ${rebateHtml}
  <div>Leverans:</div>
  <div>${delivery.toFixed(2)}</div>
  <div>Totalt att betala:</div>
  <div><strong>${sum.toFixed(2)}</strong></div>
  <a class="go-to-checkout" href="checkout.html">Gå till kassan</a>
  
  `;
}

function addToCart(id) {
  cartIcon.classList.add('pulse');
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
  setTimeout(() => {
    cartIcon.classList.remove('pulse');
  }, 1000);
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

// PRODUCT PAGE

const productEl = document.querySelector('.product-container');
const category = window.location.search.split('?category=')[1] || 'alla';
const sortingEl = document.querySelector('.drop-down-sort');

sortingEl?.addEventListener('change', onSortingChange);

function renderProducts(sorting) {
  if (!productEl) {
    return;
  }
  productEl.innerHTML = '';
  products
    .filter(product => product.category.includes(category))
    .sort((a, b) => sortProducts(a, b, sorting))
    .forEach(product => {
      productEl.innerHTML += `
    <article class="product-information">
      <img src="${product.img[0]}" alt="${product.alt}">
      <div class="rating-and-price">
        ${renderRating(product.rating)}
      </div>
      <h3>${product.name}</h3>
      <div class="price">${product.price} kr</div>
      <button class="add-to-cart" data-id="${product.id}">
        <span class="button-text">Lägg till</span>
        <div class="success-checkmark" style="display: none;">
          <div class="check-icon">
            <span class="icon-line line-tip"></span>
            <span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
          </div>
        </div>
      </button>
    </article>`;
    });

  document.querySelectorAll('.add-to-cart').forEach(el => {
    el.addEventListener('click', function (e) {
      const button = e.currentTarget;
      const buttonText = button.querySelector('.button-text');
      const checkmark = button.querySelector('.success-checkmark');

      addToCart(parseInt(button.dataset.id));

      buttonText.style.display = 'none';
      button.style.backgroundColor = 'green';
      checkmark.style.display = 'block';

      setTimeout(() => {
        checkmark.style.display = 'none';
        buttonText.style.display = 'block';
        button.style.backgroundColor = 'black';
      }, 2000);
    });
  });
}

renderProducts();

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

// CHECKOUT

const emailField = document.querySelector('#email');
const nameField = document.querySelector('#full-name');
const adressField = document.querySelector('#adress');
const cityField = document.querySelector('#city');
const zipCodeField = document.querySelector('#zip-code');

const useRebateBtn = document.querySelector('.use-rebate-btn');
const orderBtn = document.querySelector('#placeOrderBtn');
const abortOrderBtn = document.querySelector('.abort-order-btn');

let emailIsOk = false;
let nameIsOk = false;
let adressIsOk = false;
let cityIsOk = false;
let zipIsOk = false;

emailField?.addEventListener('change', checkEmail);
nameField?.addEventListener('change', checkName);
adressField?.addEventListener('change', checkAdress);
zipCodeField?.addEventListener('change', checkZip);
cityField?.addEventListener('change', checkCity);

abortOrderBtn?.addEventListener('click', clearOrder);
scrollToTopBtn?.addEventListener('click', scrollToTop);

function clearOrder() {
  cart = [];
  updateCart();
  emailField.value = '';
  nameField.value = '';
  adressField.value = '';
  zipCodeField.value = '';
  cityField.value = '';
}

//rabattlogik
const rebateField = document.querySelector('#rebate-code');
let rebateMessage = document.querySelector('#rebate-message');
useRebateBtn?.addEventListener('click', checkRebate);
function checkRebate() {
  if (rebateField.value === 'jul-2024') {
    rebateMessage.innerHTML = `Du har fått rabatt!`;
    rebateMessage.style.color = 'green';
    renderSubtotal(true);
  } else {
    rebateMessage.innerHTML = `Rabattkoden är inte giltig`;
    rebateMessage.style.color = 'red';
    renderSubtotal();
  }
}

function checkEmail() {
  if (isEmail(emailField.value)) {
    emailIsOk = true;
    emailField.style.borderColor = 'black';
  } else {
    emailIsOk = false;
    emailField.style.borderColor = 'red';
  }
}

function checkName() {
  if (nameField.value.length > 0 && nameField.value.indexOf(' ') > -1) {
    nameIsOk = true;
    nameField.style.borderColor = 'black';
  } else {
    nameIsOk = false;
    nameField.style.borderColor = 'red';
  }
  enableOrderBtn();
}

function checkAdress() {
  if (adressField.value.length > 0) {
    adressIsOk = true;
    adressField.style.borderColor = 'black';
  } else {
    adressIsOk = false;
    adressField.style.borderColor = 'red';
  }
  enableOrderBtn();
}

function checkZip() {
  if (
    zipCodeField.value.replace(' ', '').length === 5 &&
    Number(zipCodeField.value.replace(' ', '')) !== NaN
  ) {
    zipIsOk = true;
    zipCodeField.style.borderColor = 'black';
  } else {
    zipIsOk = false;
    zipCodeField.style.borderColor = 'red';
  }
  enableOrderBtn();
}

function checkCity() {
  if (cityField.value.length > 0) {
    cityIsOk = true;
    cityField.style.borderColor = 'black';
  } else {
    cityIsOk = false;
    cityField.style.borderColor = 'red';
  }
  enableOrderBtn();
}

function enableOrderBtn() {
  if (emailIsOk && nameIsOk && adressIsOk && zipIsOk && cityIsOk) {
    orderBtn.removeAttribute('disabled');
  } else {
    orderBtn.setAttribute('disabled', true);
  }
}

function isEmail(maybeEmail) {
  return String(maybeEmail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
