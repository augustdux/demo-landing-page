const header = document.querySelector('.header');
const containers = document.querySelectorAll('[data-bg-color]');
const dialog = document.querySelector(".feedback-block_dialog");
const closeButton = document.querySelector(".feedback-block_button_close");

window.addEventListener('scroll', () => {
    let currentBgColor = 'transparent';

    containers.forEach(container => {
        const rect = container.getBoundingClientRect();


        if (rect.top <= 0 && rect.bottom > 0) {
            currentBgColor = container.getAttribute('data-bg-color');
        }
    });


    if (window.scrollY === 0) {
        currentBgColor = 'transparent';
    }


    header.style.backgroundColor = currentBgColor;
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu_close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});
