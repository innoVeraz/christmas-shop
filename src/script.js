//hamburger menu
const hamburgerButton = document.querySelector('.hamburger-menu-icon');
const mobileNav = document.querySelector('.mobile-nav');
hamburgerButton.addEventListener('click', toggleHamburger);
function toggleHamburger(event) {
  event.currentTarget.classList.toggle('change');
  mobileNav.classList.toggle('hidden');
}

const desktopNav = document.querySelector('.desktop-nav');

function renderNaviation() {
  const navigation = `
<ul>
  <li><a href="product-page.html">alla produkter</a></li>
  <li><a href="product-page.html?category=dekoration">dekoration</a></li>
  <li><a href="product-page.html?category=belysning">belysning</a></li>
  <li><a href="product-page.html?category=tyger">tyger</a></li>
</ul>`;

  mobileNav.innerHTML = navigation;
  desktopNav.innerHTML = navigation;
}
renderNaviation();

// scroll to hide desktop nav
let scrollPos = 0;
const nav = document.querySelector('.desktop-nav');

function checkPosition() {
  let windowY = window.scrollY;
  if (windowY < scrollPos) {
    // Scrolling UP
    nav.classList.add('is-visible');
    nav.classList.remove('hidden');
    console.log('scrolling up');
  } else {
    // Scrolling DOWN
    nav.classList.add('hidden');
    nav.classList.remove('is-visible');
    console.log('scrolling down');
  }
  scrollPos = windowY;
}

window.addEventListener('scroll', checkPosition);
