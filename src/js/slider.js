let slider = document.querySelector('.slider'),
    sliderList = document.querySelector('.slider__wrapper'),
    sliderItems = document.querySelectorAll('.slider__item'),
    arrow = document.querySelector('.slider__buttons'),
    buttons = document.querySelectorAll('.slider__button'),
    slides = document.querySelectorAll('.slider__item'),
    prev = buttons[0],
    next = buttons[1],
    paginationCurrent = document.querySelector('.slider__pagination-current'),
    paginationTotal = document.querySelector('.slider__pagination-total');

let width = slides[0].getBoundingClientRect().width;
let countSlides = 1;

let position = 0;

// Меняем значение элемента в верстке на кол-во слайдов
paginationTotal.innerHTML = slides.length;

// Устанавливаем кнопку назад в состояние disabled
if (paginationCurrent.textContent == 1) {
    prev.classList.add('disabled');
}

prev.addEventListener('click', function(event) {
    let count = parseInt(paginationCurrent.textContent) - 1
    paginationCurrent.innerHTML = count;

    if (count != slides.length) {
        next.classList.remove('disabled');
    }
    if (count == 1) {
        prev.classList.add('disabled');
    }

    position += width * countSlides;
    position = Math.min(position, 0);

    sliderList.style.transform = `translate3d(${position}px, 0, 0)`;
})

next.addEventListener('click', function(event) {
    let count = parseInt(paginationCurrent.textContent) + 1
    paginationCurrent.innerHTML = count;

    if (count != 1) {
        prev.classList.remove('disabled');
    }
    if (count == slides.length) {
        next.classList.add('disabled')
    }

    position -= width*countSlides;
    position = Math.max(position, -width*(sliderItems.length - countSlides));

    sliderList.style.transform = `translate3d(${position}px, 0, 0)`;
})