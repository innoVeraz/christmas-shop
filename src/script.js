const hamburgerButton = document.querySelector('.hamburger-menu-icon');
const mobileNav = document.querySelector('.mobile-nav');
const desktopNav = document.querySelector('.desktop-nav');

hamburgerButton.addEventListener('click', toggleHamburger);

renderNavigation();
setActive();

function toggleHamburger(event) {
  event.currentTarget.classList.toggle('change');
  mobileNav.classList.toggle('hidden');
}

function setActive() {
  const links = [...mobileNav.getElementsByTagName('a'), ...desktopNav.getElementsByTagName('a')];
  console.log(links);
  for (i = 0; i < links.length; i++) {
    if (document.location.href === links[i].href) {
      links[i].className = 'active';
    }
  }
}

function renderNavigation() {
  const href = window.location.pathname;
  console.log(href);
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
