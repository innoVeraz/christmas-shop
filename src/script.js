import './style/style.scss';

document.querySelector('.hamburger-menu-icon').addEventListener('click', function myFunction(x) {
  x.currentTarget.classList.toggle('change');
});
