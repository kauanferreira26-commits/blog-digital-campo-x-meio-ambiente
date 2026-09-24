// ===============================
// TEMA
// ===============================

const themeButton = document.getElementById("themeButton");

let lightMode = false;

themeButton.addEventListener("click", () => {

    lightMode = !lightMode;

    if (lightMode) {

        document.documentElement.style.setProperty(
            "--bg",
            "#eef3eb"
        );

        document.documentElement.style.setProperty(
            "--bg2",
            "#e3ebe1"
        );

        document.documentElement.style.setProperty(
            "--white",
            "#17251d"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#536158"
        );

        themeButton.textContent = "☾";

    } else {

        document.documentElement.style.setProperty(
            "--bg",
            "#07140f"
        );

        document.documentElement.style.setProperty(
            "--bg2",
            "#0b1d15"
        );

        document.documentElement.style.setProperty(
            "--white",
            "#f4f7f2"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#a5b1a8"
        );

        themeButton.textContent = "☼";
    }
});


// ===============================
// MODAL DA HISTÓRIA
// ===============================

const playButton = document.getElementById("playButton");
const modal = document.getElementById("storyModal");
const closeModal = document.getElementById("closeModal");

playButton.addEventListener("click", () => {
    modal.classList.add("show");
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


// ===============================
// NAVEGAÇÃO ATIVA
// ===============================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

});


// ===============================
// ANIMAÇÃO DOS NÚMEROS
// ===============================

const counters = document.querySelectorAll(
    ".impact-grid strong"
);

let counterStarted = false;

function animateCounters() {

    if (counterStarted) return;

    const impact = document.querySelector(".impact");

    const position = impact.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const finalValue = parseInt(
                counter.textContent.replace(/\D/g, "")
            );

            let current = 0;

            const increment = Math.ceil(
                finalValue / 40
            );

            const interval = setInterval(() => {

                current += increment;

                if (current >= finalValue) {

                    current = finalValue;

                    clearInterval(interval);
                }

                counter.textContent =
                    counter.textContent.includes("-")
                        ? `-${current}%`
                        : `+${current}%`;

            }, 35);

        });
    }
}

window.addEventListener("scroll", animateCounters);


// ===============================
// SCROLL REVEAL
// ===============================

const revealElements = document.querySelectorAll(
    ".solution-card, .dash-box, .impact-grid div"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "all .7s ease";

    observer.observe(element);

});
