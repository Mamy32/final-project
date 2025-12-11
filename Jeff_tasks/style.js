const hamburger = document.getElementById('hamburger');
        const navbar = document.querySelector('.navbar');
        const navOverlay = document.getElementById('navOverlay');

        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('nav-open');
            navOverlay.classList.toggle('show');
            hamburger.classList.toggle('is-active');
        });

        navOverlay.addEventListener('click', () => {
            navbar.classList.remove('nav-open');
            navOverlay.classList.remove('show');
            hamburger.classList.remove('is-active');
        });

        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('nav-open');
                navOverlay.classList.remove('show');
                hamburger.classList.remove('is-active');
            });
        });

const amount = document.querySelector('.amount');
const plusBtn = document.querySelector('.plus-button');
const minusBtn = document.querySelector('.minus-button');

plusBtn.addEventListener('click', () => {
    let value = parseInt(amount.textContent);
    amount.textContent = value + 1;
});

minusBtn.addEventListener('click', () => {
    let value = parseInt(amount.textContent);
    if (value > 1) {
        amount.textContent = value - 1;
    }
});

