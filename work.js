'use strict';

let buttonHidden = document.querySelector('.button_hidden');
let arrowUp = document.querySelector('.button_up');
let text = document.querySelector('.button_text');
let allIcons = document.querySelectorAll('.swiper-slide');
let swiperInstance = null;
let isIconsExpanded = false;

// Показываем/скрываем иконки
function updateIcons(showAll) {
    const width = window.innerWidth;

    if (width <= 767) {
        for (let i = 0; i < allIcons.length; i++) {
            allIcons[i].style.display = 'flex';
        }
    } else if (width >= 768 && width <= 1119) {
        for (let i = 0; i < allIcons.length; i++) {
            const icon = allIcons[i];
            if (icon.classList.contains('section_icon-hidden')) {
                icon.style.display = showAll ? 'flex' : 'none';
            } else {
                icon.style.display = 'flex';
            }
        }
    } else {
        // Desktop (1120+): показываем только первые 8 по порядку, скрываем все остальные
        for (let i = 0; i < allIcons.length; i++) {
            if (showAll || i < 8) {
                allIcons[i].style.display = 'flex';
            } else {
                allIcons[i].style.display = 'none';
            }
        }
    }
}

// Обновление состояния кнопки и стрелки
function updateButtonState(showAll) {
    text.textContent = showAll ? 'Скрыть' : 'Показать все';
    arrowUp.classList.toggle('arrow--rotated', !showAll);
}

// Инициализация свайпера
function initSwiper() {
    const isMobile = window.innerWidth <= 767;

    if (isMobile && !swiperInstance) {
        swiperInstance = new Swiper('.section_swiper', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            simulateTouch: true,
        });
    } else if (!isMobile && swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
    }
}

// Клик по кнопке
buttonHidden.addEventListener('click', function () {
    isIconsExpanded = !isIconsExpanded;
    updateIcons(isIconsExpanded);
    updateButtonState(isIconsExpanded);
});

// Начальное состояние
function initOnLoad() {
    const width = window.innerWidth;

    isIconsExpanded = false;
    updateIcons(false);
    updateButtonState(false);
    initSwiper();
}

window.addEventListener('resize', () => {
    // Чтобы избежать дерганья свайпера
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(initOnLoad, 300);
});

document.addEventListener('DOMContentLoaded', initOnLoad);


