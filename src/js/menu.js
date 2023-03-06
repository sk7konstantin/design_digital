const navigaton = document.querySelector('.navigation');
const button = document.querySelector('.navigation__button-menu');
const menuList = document.querySelector('.navigation__list');
const items = document.querySelectorAll('.navigation__item');
const contactsMobile = document.querySelector('.header__contacts-mobile');

const body = document.querySelector('body');

button.addEventListener('click', ()=> {
    body.classList.toggle('body--active')
    navigaton.classList.toggle('navigation--mobile-bg-on');
    menuList.classList.toggle('navigation__list--active');
    contactsMobile.classList.toggle('header__contacts-mobile--active')
    button.classList.toggle('navigation__button-menu--active')

    for (const i of items) {
        i.classList.toggle('navigation__item--active')
    }
})