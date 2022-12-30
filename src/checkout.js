const emailField = document.querySelector('#email');
const nameField = document.querySelector('#full-name');
const adressField = document.querySelector('#adress');
const cityField = document.querySelector('#city');
const zipCodeField = document.querySelector('#zip-code');

const useRebateBtn = document.querySelector('.use-rebate-btn');
const orderBtn = document.querySelector('#placeOrderBtn');
const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');
const abortOrderBtn = document.querySelector('.abort-order-btn');

let emailIsOk = false;
let nameIsOk = false;
let adressIsOk = false;
let cityIsOk = false;
let zipIsOk = false;

emailField.addEventListener('change', checkEmail);
nameField.addEventListener('change', checkName);
adressField.addEventListener('change', checkAdress);
zipCodeField.addEventListener('change', checkZip);
cityField.addEventListener('change', checkCity);

abortOrderBtn.addEventListener('click', clearOrder);
scrollToTopBtn.addEventListener('click', scrollToTop);

function clearOrder() {
  cart = [];
  updateCart();
  emailField.value = '';
  nameField.value = '';
  adressField.value = '';
  zipCodeField.value = '';
  cityField.value = '';
}

//orderBtn.addEventListener('change');

//rabattlogik
const rebateField = document.querySelector('#rebate-code');
let rebateMessage = document.querySelector('#rebate-message');
useRebateBtn.addEventListener('click', checkRebate);
function checkRebate() {
  if (rebateField.value === 'Jule-tid-22') {
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
  enableOrderBtn();
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

function scrollToTop() {
  window.scrollTo(0, 0);
}
