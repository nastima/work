'use strict';

let buttonHidden = document.querySelector('.button_hidden');
let arrowUp = document.querySelector('.button_up');
let text = document.querySelector('.button_text');
let allIcons = document.querySelectorAll('.swiper-slide');
let swiperInstance = null;

// Показываем/скрываем иконки
function updateIcons(showAll) {
    const width = window.innerWidth;

    if (width <= 767) {
        // Мобильный свайпер — ничего не скрываем
        for (let i = 0; i < allIcons.length; i++) {
            allIcons[i].classList.remove('section_icon-hidden');
            allIcons[i].style.display = 'flex';
        }
    } else if (width >= 768 && width <= 1119) {
        // Планшет — скрыты иконки с классом
        for (let i = 0; i < allIcons.length; i++) {
            const icon = allIcons[i];
            if (icon.classList.contains('section_icon-hidden')) {
                icon.style.display = showAll ? 'flex' : 'none';
            } else {
                icon.style.display = 'flex';
            }
        }
    } else {
        // Десктоп — скрываем последние 3
        for (let i = 0; i < allIcons.length; i++) {
            if (i >= allIcons.length - 3) {
                allIcons[i].style.display = showAll ? 'flex' : 'none';
            } else {
                allIcons[i].style.display = 'flex';
            }
        }
    }
}

// Обновление состояния кнопки и стрелки
function updateButtonState(showAll) {
    if (showAll) {
        text.textContent = 'Скрыть';
        arrowUp.classList.remove('arrow--rotated'); // стрелка вверх
    } else {
        text.textContent = 'Показать все';
        arrowUp.classList.add('arrow--rotated'); // стрелка вниз
    }
}

// Инициализация свайпера
function initSwiper() {
    if (window.innerWidth <= 767 && !swiperInstance) {
        swiperInstance = new Swiper('.section_swiper', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            simulateTouch: true,
        });
    } else if (window.innerWidth > 767 && swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
    }
}

// Клик по кнопке
buttonHidden.addEventListener('click', function () {
    const isExpanded = text.textContent === 'Скрыть';
    const showAll = !isExpanded;
    updateIcons(showAll);
    updateButtonState(showAll);
});

// Начальное состояние
function initOnLoad() {
    const width = window.innerWidth;

    if (width >= 768) {
        updateIcons(false);
        updateButtonState(false);
    }

    initSwiper();
}

window.addEventListener('resize', initOnLoad);
document.addEventListener('DOMContentLoaded', initOnLoad);


