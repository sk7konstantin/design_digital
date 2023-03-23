let slider = document.querySelector('.slider'),
    sliderList = document.querySelector('.slider__box'),
    sliderItems = document.querySelectorAll('.slider__item'),
    arrow = document.querySelector('.slider__buttons'),
    buttons = document.querySelectorAll('.slider__button'),
    slides = document.querySelectorAll('.slider__item'),
    prev = buttons[0],
    next = buttons[1],
    slideWidth = slides[0].offsetWidth,
    slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posFinal = 0,
    posThreshold = slideWidth * .10,
    trfRegExp = /[-0-9.]+(?=px)/,

    slide = function () {
        sliderList.style.transition = 'transform .5s';
        sliderList.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

        prev.classList.toggle('disabled', slideIndex === 0);
        next.classList.toggle('disabled', slideIndex === --slides.length);
        console.log(slideWidth)
    },
    getEvent = () => event.type.search('touch') !== -1 ? event.type.touches[0]: event,

    swipeStart = function() {
        let evt = getEvent();
        posInit = posX1 = evt.clientX;
        sliderList.style.transition = '';

        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('mouseup', swipeEnd);
    },

    swipeAction = function() {
        let evt = getEvent(),
        style = sliderList.style.transform,
        transform = +style.match(trfRegExp)[0];

        posX2 = posX1 - evt.clientX;
        posX1 = evt.clientX;

        sliderList.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    },

    swipeEnd = function() {
        posFinal = posInit - posX1;

        document.removeEventListener('touchmove', swipeAction);
        document.removeEventListener('mousemove', swipeAction);
        document.removeEventListener('touchend', swipeEnd);
        document.removeEventListener('mouseup', swipeEnd);

        if (Math.abs(posFinal) > posThreshold) {
            if (posInit < posX1) {
                slideIndex--;
            } else if (posInit > posX1) {
                slideIndex++;
            }
        }

        if (posInit !== posX1) {
            slide();
        }
    }

sliderList.style.transform = 'translate3d(0px,0px,0px)';

// slider.addEventListener('touchstart', swipeStart);

slider.addEventListener('mousedown', swipeStart);
slider.addEventListener('touchstart', swipeStart);

prev.addEventListener('click', () => {
    slideIndex -= 1;
    sliderList.style.transform = `translate3d(${slideWidth * (slideIndex)}px, 0px, 0px)`;
});

arrow.addEventListener('click', function() {
    let target = event.target;

    if (target === next) {
        slideIndex++;
    } else if (target === prev) {
        slideIndex--;
    } else {
        return;
    }

    slide()
});
