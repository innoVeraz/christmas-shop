const hamburgerButton = document.querySelector('.hamburger-menu-icon');
const mobileNav = document.querySelector('.mobile-nav');
const desktopNav = document.querySelector('.desktop-nav');
const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');

hamburgerButton.addEventListener('click', toggleHamburger);
scrollToTopBtn.addEventListener('click', scrollToTop);

renderNavigation();
setActive();

function toggleHamburger(event) {
  event.currentTarget.classList.toggle('change');
  mobileNav.classList.toggle('open');
}

function setActive() {
  const links = [
    ...mobileNav.getElementsByTagName('a'),
    ...desktopNav.getElementsByTagName('a'),
  ];

  for (i = 0; i < links.length; i++) {
    if (document.location.href === links[i].href) {
      links[i].className = 'active';
    }
  }
}

function renderNavigation() {
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

// scroll button
function scrollToTop() {
  window.scrollTo(0, 0);
}

// scroll to hide desktop nav
let scrollPos = 0;
const nav = document.querySelector('.desktop-nav');
window.addEventListener('scroll', checkPosition);

function checkPosition() {
  if (window.innerWidth < 481) {
    nav.classList.add('hidden');
    return;
  }
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
