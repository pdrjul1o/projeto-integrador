document.addEventListener('DOMContentLoaded', () => {

    // ===== APPS SELECIONÁVEIS =====
    const apps = document.querySelectorAll('.app');
    const screen = document.querySelector('.app-screen');

    if (!apps.length || !screen) {
        console.error('Apps ou tela não encontrados');
        return;
    }

    apps.forEach(app => {
    app.addEventListener('click', () => {

        if (app.classList.contains('open-app')) return;

        apps.forEach(a => a.classList.remove('open-app'));
        app.classList.add('open-app');

        const newImage = app.dataset.image;
        if (!newImage) return;

        // força estado neutro
        screen.classList.remove('entering', 'leaving');
        void screen.offsetWidth;

        // saída
        screen.classList.add('leaving');

        const onLeaveEnd = () => {
            screen.removeEventListener('transitionend', onLeaveEnd);

            // troca imagem
            screen.src = newImage;

            // entrada
            screen.classList.remove('leaving');
            screen.classList.add('entering');

            // limpa estado após entrar
            screen.addEventListener('transitionend', () => {
                screen.classList.remove('entering');
            }, { once: true });
        };

        screen.addEventListener('transitionend', onLeaveEnd, { once: true });
    });
});

    // ===== CARROSSEL =====
    const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const indexContainer = document.querySelector(".carrosel-index");

    let currentIndex = 0;
    const totalSlides = images.length;

    if (!slides || !images.length) return;

    images.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            currentIndex = i;
            updateCarousel();
        });

        indexContainer.appendChild(dot);
    });

    function updateCarousel() {
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;

        document.querySelectorAll(".carrosel-index span")
            .forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
            });
    }

    nextBtn?.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    });

    prevBtn?.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

});
