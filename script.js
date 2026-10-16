/* =========================================================
   ATHAADA PORTFOLIO V3
========================================================= */

document.documentElement.classList.add("js-enabled");

/* =========================================================
   LOADER
========================================================= */

const loader = document.getElementById("loader");
const loaderProgress = document.getElementById("loaderProgress");
const loaderPercent = document.getElementById("loaderPercent");

 let loadValue = 0;

function runLoader() {
    const loader = document.getElementById("loader");
    const loaderProgress = document.getElementById("loaderProgress");
    const loaderPercent = document.getElementById("loaderPercent");

    let value = 0;

    const timer = setInterval(() => {
        value += 5;

        if (value >= 100) {
            value = 100;
            clearInterval(timer);

            if (loaderProgress) {
                loaderProgress.style.width = "100%";
            }

            if (loaderPercent) {
                loaderPercent.textContent = "100%";
            }

            setTimeout(() => {
                if (loader) {
                    loader.classList.add("hide");
                }
            }, 300);

            return;
        }

        if (loaderProgress) {
            loaderProgress.style.width = value + "%";
        }

        if (loaderPercent) {
            loaderPercent.textContent = value + "%";
        }
    }, 100);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runLoader);
} else {
    runLoader();
}

/* =========================================================
   ELEMENTS
========================================================= */

const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");
const topBtn = document.getElementById("topBtn");

const heroClock = document.getElementById("heroClock");
const bootClock = document.getElementById("bootClock");

const osClock = document.getElementById("osClock");
const osTaskClock = document.getElementById("osTaskClock");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================================================
   MOBILE MENU
========================================================= */

menuBtn?.addEventListener("click", () => {

    navLinks?.classList.toggle("open");

    const opened =
        navLinks?.classList.contains("open");

    menuBtn.textContent =
        opened ? "×" : "☰";

});

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks?.classList.remove("open");

            if (menuBtn) {
                menuBtn.textContent = "☰";
            }

        });

    });


/* =========================================================
   SCROLL
========================================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        navbar?.classList.add("scrolled");
    } else {
        navbar?.classList.remove("scrolled");
    }

    const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        height > 0
            ? (window.scrollY / height) * 100
            : 0;

    if (scrollProgress) {
        scrollProgress.style.width =
            `${progress}%`;
    }

    if (topBtn) {

        const visible =
            window.scrollY > 500;

        topBtn.style.opacity =
            visible ? "1" : "0";

        topBtn.style.pointerEvents =
            visible ? "auto" : "none";
    }

});


/* =========================================================
   ACTIVE NAV
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navAnchors =
    document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    navAnchors.forEach(link => {
                        link.classList.remove("active");
                    });

                    const current =
                        document.querySelector(
                            `.nav-links a[href="#${entry.target.id}"]`
                        );

                    current?.classList.add("active");

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* =========================================================
   REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("show");
    });

}


/* =========================================================
   CLOCKS
========================================================= */

function updateClocks() {

    const now = new Date();

    const fullTime =
        now.toLocaleTimeString(
            "id-ID",
            {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

    const shortTime =
        now.toLocaleTimeString(
            "id-ID",
            {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    if (heroClock) {
        heroClock.textContent = fullTime;
    }

    if (bootClock) {
        bootClock.textContent =
            `${fullTime} WIB`;
    }

    if (osClock) {
        osClock.textContent = shortTime;
    }

    if (osTaskClock) {
        osTaskClock.textContent = shortTime;
    }

}

updateClocks();

setInterval(updateClocks, 1000);


/* =========================================================
   TOP BUTTON
========================================================= */

topBtn?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   TYPING BADGE
========================================================= */

const typingText =
    document.getElementById("typingText");

const typingWords = [
    "DEVELOPER",
    "CREATOR",
    "AI EXPLORER",
    "PROBLEM SOLVER",
    "BUILDER"
];

let typingIndex = 0;

setInterval(() => {

    typingIndex =
        (typingIndex + 1) %
        typingWords.length;

    if (!typingText) return;

    typingText.animate(
        [
            {
                opacity: 0,
                transform:
                    "translateY(5px)"
            },
            {
                opacity: 1,
                transform:
                    "translateY(0)"
            }
        ],
        {
            duration: 350,
            easing: "ease-out"
        }
    );

    typingText.textContent =
        typingWords[typingIndex];

}, 2500);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    if (!toast || !toastMessage) {
        return;
    }

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}


/* =========================================================
   COPY IDENTITY
========================================================= */

function copyIdentity() {

    const identity =
        "ATHAADA ICHIRO — Developer / Creator";

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(identity)
            .then(() => {
                showToast("Identity copied.");
            })
            .catch(() => {
                showToast(identity);
            });

    } else {

        showToast(identity);

    }

}


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(".counter");

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter =
                    entry.target;

                const target =
                    Number(counter.dataset.target);

                let value = 0;

                const interval =
                    setInterval(() => {

                        value++;

                        counter.textContent =
                            value;

                        if (value >= target) {
                            clearInterval(interval);
                        }

                    }, 150);

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: .6
        }
    );

counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* =========================================================
   SKILL FILTER
========================================================= */

const skillFilterButtons =
    document.querySelectorAll(".skill-filter-btn");

const skillCards =
    document.querySelectorAll(".skill-card");

skillFilterButtons.forEach(button => {

    button.addEventListener("click", () => {

        skillFilterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.dataset.skill;

        skillCards.forEach(card => {

            const category =
                card.dataset.skill;

            if (
                filter === "all" ||
                filter === category
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =========================================================
   PROJECT DATA
========================================================= */

const projectData = {

    "NOVA AI": {

        description:
            "AI chat application yang dibuat untuk mengeksplorasi pengembangan aplikasi AI, memory percakapan, dan pengalaman chat modern.",

        tech: [
            "Python",
            "Flask",
            "AI",
            "JavaScript"
        ],

        type:
            "AI APPLICATION",

        status:
            "BUILDING",

        link:
            "#"

    },

    "WEB AZRIEL": {

        description:
            "Website kampanye calon Ketua OSIS yang dirancang dengan fokus pada informasi visi, misi, program kerja, dan tampilan modern.",

        tech: [
            "HTML",
            "CSS",
            "JavaScript",
            "GitHub Pages"
        ],

        type:
            "WEB PROJECT",

        status:
            "LIVE",

        link:
            "https://darooo14.github.io/WEB-AZRIEL/"

    },

    "HAND TRACKING": {

        description:
            "Eksperimen computer vision untuk mendeteksi gerakan tangan menggunakan kamera dan menghubungkannya dengan interaksi visual.",

        tech: [
            "Python",
            "OpenCV",
            "MediaPipe",
            "Computer Vision"
        ],

        type:
            "COMPUTER VISION",

        status:
            "EXPERIMENT",

        link:
            "#"

    }

};


/* =========================================================
   PROJECT MODAL
========================================================= */

const projectModal =
    document.getElementById("projectModal");

const projectModalClose =
    document.getElementById(
        "projectModalClose"
    );

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const modalType =
    document.getElementById("modalType");

const modalStatus =
    document.getElementById("modalStatus");

const modalTags =
    document.getElementById("modalTags");

const modalLink =
    document.getElementById("modalLink");


function openProject(name) {

    const data =
        projectData[name];

    if (!data) return;

    modalTitle.textContent =
        name;

    modalDescription.textContent =
        data.description;

    modalType.textContent =
        data.type;

    modalStatus.textContent =
        data.status;

    modalTags.innerHTML =
        data.tech
            .map(
                tech =>
                    `<span>${tech}</span>`
            )
            .join("");

    modalLink.href =
        data.link;

    if (data.link === "#") {

        modalLink.style.opacity =
            ".35";

        modalLink.style.pointerEvents =
            "none";

    } else {

        modalLink.style.opacity =
            "1";

        modalLink.style.pointerEvents =
            "auto";

    }

    projectModal?.classList.add("open");

    document.body.classList.add(
        "modal-open"
    );

}


function closeProjectModal() {

    projectModal?.classList.remove("open");

    document.body.classList.remove(
        "modal-open"
    );

}


document
    .querySelectorAll(".project-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            openProject(
                card.dataset.project
            );

        });

    });


projectModalClose?.addEventListener(
    "click",
    closeProjectModal
);

projectModal
    ?.querySelector(".modal-backdrop")
    ?.addEventListener(
        "click",
        closeProjectModal
    );


/* =========================================================
   PROJECT FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        projectCards.forEach(card => {

            const category =
                card.dataset.category;

            if (
                filter === "all" ||
                filter === category
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =========================================================
   PARTICLES
========================================================= */

const canvas =
    document.getElementById(
        "particleCanvas"
    );

const ctx =
    canvas?.getContext("2d");

let particles = [];

function resizeCanvas() {

    if (!canvas) return;

    canvas.width =
        canvas.offsetWidth *
        window.devicePixelRatio;

    canvas.height =
        canvas.offsetHeight *
        window.devicePixelRatio;

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

}

function createParticles() {

    if (!canvas) return;

    particles = [];

    const amount =
        window.innerWidth < 700
            ? 30
            : 70;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.offsetWidth,

            y:
                Math.random() *
                canvas.offsetHeight,

            vx:
                (Math.random() - .5) *
                .25,

            vy:
                (Math.random() - .5) *
                .25,

            size:
                Math.random() * 1.5 + .3

        });

    }

}

function drawParticles() {

    if (!ctx || !canvas) return;

    ctx.clearRect(
        0,
        0,
        canvas.offsetWidth,
        canvas.offsetHeight
    );

    particles.forEach(p => {

        p.x += p.vx;
        p.y += p.vy;

        if (
            p.x < 0 ||
            p.x > canvas.offsetWidth
        ) {
            p.vx *= -1;
        }

        if (
            p.y < 0 ||
            p.y > canvas.offsetHeight
        ) {
            p.vy *= -1;
        }

        ctx.fillStyle =
            "rgba(255,255,255,.45)";

        ctx.fillRect(
            p.x,
            p.y,
            p.size,
            p.size
        );

    });

    requestAnimationFrame(
        drawParticles
    );

}

if (canvas) {

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener(
        "resize",
        () => {

            resizeCanvas();
            createParticles();

        }
    );

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

document
    .querySelectorAll(".magnetic")
    .forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * .08}px, ${y * .08}px)`;

            }
        );

        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


/* =========================================================
   CURSOR
========================================================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");

if (
    cursorDot &&
    cursorRing &&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            cursorDot.style.left =
                `${event.clientX}px`;

            cursorDot.style.top =
                `${event.clientY}px`;

            cursorRing.style.left =
                `${event.clientX}px`;

            cursorRing.style.top =
                `${event.clientY}px`;

        }
    );

    document
        .querySelectorAll(
            "a, button, .project-card"
        )
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {
                    cursorRing.classList.add(
                        "hover"
                    );
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    cursorRing.classList.remove(
                        "hover"
                    );
                }
            );

        });

}


/* =========================================================
   COMMAND PALETTE
========================================================= */

const commandPalette =
    document.getElementById(
        "commandPalette"
    );

const commandInput =
    document.getElementById(
        "commandInput"
    );

function openCommandPalette() {

    commandPalette?.classList.add(
        "open"
    );

    setTimeout(() => {
        commandInput?.focus();
    }, 100);

}

function closeCommandPalette() {

    commandPalette?.classList.remove(
        "open"
    );

    if (commandInput) {
        commandInput.value = "";
    }

}

document
    .querySelectorAll("[data-command]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const command =
                    button.dataset.command;

                closeCommandPalette();

                if (command === "home") {
                    location.hash = "home";
                }

                if (
                    command === "projects" ||
                    command === "skills" ||
                    command === "contact"
                ) {

                    document
                        .getElementById(command)
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                }

                if (command === "os") {
                    openOS();
                }

                if (command === "terminal") {
                    openTerminal();
                }

            }
        );

    });

commandPalette
    ?.querySelector(".command-backdrop")
    ?.addEventListener(
        "click",
        closeCommandPalette
    );


/* =========================================================
   TERMINAL
========================================================= */

const terminalModal =
    document.getElementById(
        "terminalModal"
    );

const terminalClose =
    document.getElementById(
        "terminalClose"
    );

const terminalInput =
    document.getElementById(
        "terminalInput"
    );

const terminalOutput =
    document.getElementById(
        "terminalOutput"
    );


function openTerminal() {

    terminalModal?.classList.add(
        "open"
    );

    document.body.classList.add(
        "modal-open"
    );

    setTimeout(() => {
        terminalInput?.focus();
    }, 100);

}

function closeTerminal() {

    terminalModal?.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "modal-open"
    );

}

terminalClose?.addEventListener(
    "click",
    closeTerminal
);

terminalModal
    ?.querySelector(".modal-backdrop")
    ?.addEventListener(
        "click",
        closeTerminal
    );


function printTerminal(text) {

    if (!terminalOutput) return;

    const line =
        document.createElement("div");

    line.innerHTML = text;

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;

}


function terminalCommand(rawCommand) {

    const command =
        rawCommand.trim().toLowerCase();

    if (!command) return;

    printTerminal(
        `<span style="color:#9dffb0">
        visitor@athaada:~$
        </span> ${rawCommand}`
    );

    switch (command) {

        case "help":

            printTerminal(
                "Available: help, about, projects, skills, whoami, neofetch, date, os, nova, clear"
            );

            break;

        case "about":

            printTerminal(
                "ATHAADA ICHIRO — Developer / Creator"
            );

            break;

        case "projects":

            printTerminal(
                "NOVA AI | WEB AZRIEL | HAND TRACKING"
            );

            break;

        case "skills":

            printTerminal(
                "HTML / CSS / JavaScript / Python / AI / OpenCV"
            );

            break;

        case "whoami":

            printTerminal(
                "visitor connected to ATHAADA SYSTEM."
            );

            break;

        case "neofetch":

            printTerminal(
                "ATHAADA OS<br>Developer: Athaada<br>System: Online<br>Mode: Building"
            );

            break;

        case "date":

            printTerminal(
                new Date().toString()
            );

            break;

        case "os":

            openOS();

            break;

        case "nova":

            printTerminal(
                "NOVA AI online. Type anything in the OS NOVA window."
            );

            break;

        case "clear":

            terminalOutput.innerHTML =
                "";

            break;

        default:

            printTerminal(
                `Command not found: ${command}`
            );

    }

}


terminalModal?.addEventListener(
    "keydown",
    event => {

        if (
            event.target !== terminalInput ||
            event.key !== "Enter"
        ) {
            return;
        }

        const command =
            terminalInput.value;

        terminalInput.value = "";

        terminalCommand(command);

    }
);


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openCommandPalette();

        }

        if (
            event.key === "Escape"
        ) {

            closeCommandPalette();
            closeTerminal();
            closeProjectModal();

        }

    }
);


/* =========================================================
   ATHAADA OS
========================================================= */

const osOverlay =
    document.getElementById(
        "osOverlay"
    );

const osStartButton =
    document.getElementById(
        "osStartButton"
    );

const osStartMenu =
    document.getElementById(
        "osStartMenu"
    );

const osTaskApps =
    document.getElementById(
        "osTaskApps"
    );


let highestZ = 30;


function openOS() {

    osOverlay?.classList.add(
        "open"
    );

    osStartMenu?.classList.remove(
        "open"
    );

}

function closeOS() {

    osOverlay?.classList.remove(
        "open"
    );

    osStartMenu?.classList.remove(
        "open"
    );

}

window.openOS = openOS;
window.closeOS = closeOS;


function focusWindow(win) {

    highestZ++;

    win.style.zIndex =
        highestZ;

}


function showOSWindow(id) {

    const win =
        document.getElementById(id);

    if (!win) return;

    win.classList.add("open");

    focusWindow(win);

}


document
    .querySelectorAll(
        ".desktop-icon"
    )
    .forEach(icon => {

        icon.addEventListener(
            "dblclick",
            () => {

                const id =
                    icon.dataset.window;

                const action =
                    icon.dataset.action;

                if (id) {
                    showOSWindow(id);
                }

                if (
                    action === "terminal"
                ) {
                    openTerminal();
                }

            }
        );

        icon.addEventListener(
            "click",
            () => {

                if (
                    !icon.dataset.clicked
                ) {

                    icon.dataset.clicked =
                        "true";

                    setTimeout(() => {

                        delete icon.dataset.clicked;

                    }, 500);

                }

            }
        );

    });


document
    .querySelectorAll(
        ".os-start-apps button, .start-apps button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const windowId =
                    button.dataset.window;

                const action =
                    button.dataset.action;

                if (windowId) {

                    showOSWindow(
                        windowId
                    );

                    osStartMenu?.classList.remove(
                        "open"
                    );

                }

                if (
                    action === "terminal"
                ) {

                    openTerminal();

                    osStartMenu?.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


osStartButton?.addEventListener(
    "click",
    () => {

        osStartMenu?.classList.toggle(
            "open"
        );

    }
);


/* =========================================================
   OS WINDOWS
========================================================= */

document
    .querySelectorAll(".os-window")
    .forEach(win => {

        win.addEventListener(
            "mousedown",
            () => {

                focusWindow(win);

            }
        );

        win
            .querySelector("[data-close]")
            ?.addEventListener(
                "click",
                () => {

                    win.classList.remove(
                        "open"
                    );

                }
            );

        win
            .querySelector("[data-minimize]")
            ?.addEventListener(
                "click",
                () => {

                    win.classList.remove(
                        "open"
                    );

                }
            );

    });


/* =========================================================
   OS WINDOW DRAG
========================================================= */

document
    .querySelectorAll(".os-window")
    .forEach(win => {

        const header =
            win.querySelector(
                ".os-window-header"
            );

        if (!header) return;

        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;

        header.addEventListener(
            "mousedown",
            event => {

                if (
                    event.target.closest("button")
                ) {
                    return;
                }

                if (
                    window.innerWidth < 700
                ) {
                    return;
                }

                dragging = true;

                const rect =
                    win.getBoundingClientRect();

                offsetX =
                    event.clientX -
                    rect.left;

                offsetY =
                    event.clientY -
                    rect.top;

                focusWindow(win);

            }
        );

        document.addEventListener(
            "mousemove",
            event => {

                if (!dragging) return;

                win.style.left =
                    `${event.clientX - offsetX}px`;

                win.style.top =
                    `${event.clientY - offsetY}px`;

                win.style.transform =
                    "none";

            }
        );

        document.addEventListener(
            "mouseup",
            () => {

                dragging = false;

            }
        );

    });


/* =========================================================
   OS TASKBAR
========================================================= */

function updateTaskbar() {

    if (!osTaskApps) return;

    osTaskApps.innerHTML = "";

    document
        .querySelectorAll(
            ".os-window.open"
        )
        .forEach(win => {

            const button =
                document.createElement(
                    "button"
                );

            button.textContent =
                win.dataset.title ||
                "Window";

            button.style.cssText = `
                border:1px solid rgba(255,255,255,.1);
                background:transparent;
                color:#aaa;
                padding:7px 10px;
                font-size:8px;
                cursor:pointer;
            `;

            button.addEventListener(
                "click",
                () => {

                    win.classList.add(
                        "open"
                    );

                    focusWindow(win);

                }
            );

            osTaskApps.appendChild(
                button
            );

        });

}

document
    .querySelectorAll(
        ".os-window [data-close], .os-window [data-minimize]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                setTimeout(
                    updateTaskbar,
                    20
                );

            }
        );

    });

document
    .querySelectorAll(
        ".desktop-icon"
    )
    .forEach(icon => {

        icon.addEventListener(
            "dblclick",
            () => {

                setTimeout(
                    updateTaskbar,
                    20
                );

            }
        );

    });


/* =========================================================
   NOVA MINI
========================================================= */

const novaInput =
    document.getElementById(
        "novaInput"
    );

const novaSend =
    document.getElementById(
        "novaSend"
    );

const novaResponse =
    document.getElementById(
        "novaResponse"
    );


function novaReply() {

    if (!novaInput || !novaResponse) {
        return;
    }

    const text =
        novaInput.value.trim();

    if (!text) return;

    const replies = [

        "Interesting. Let's build it.",

        "System received your message.",

        "NOVA is thinking...",

        "That sounds like an experiment worth building.",

        "Connection established. Keep creating."

    ];

    novaResponse.textContent =
        replies[
            Math.floor(
                Math.random() *
                replies.length
            )
        ];

    novaInput.value = "";

}


novaSend?.addEventListener(
    "click",
    novaReply
);

novaInput?.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            novaReply();

        }

    }
);


/* =========================================================
   MUSIC SYSTEM
========================================================= */

const playlistButton =
    document.getElementById(
        "playlistButton"
    );

const musicPlayer =
    document.getElementById(
        "musicPlayer"
    );

const musicClose =
    document.getElementById(
        "musicClose"
    );

const audioPlayer =
    document.getElementById(
        "audioPlayer"
    );

const musicPlay =
    document.getElementById(
        "musicPlay"
    );

const musicPrev =
    document.getElementById(
        "musicPrev"
    );

const musicNext =
    document.getElementById(
        "musicNext"
    );

const musicTitle =
    document.getElementById(
        "musicTitle"
    );

const musicArtist =
    document.getElementById(
        "musicArtist"
    );

const musicProgress =
    document.getElementById(
        "musicProgress"
    );

const musicCurrent =
    document.getElementById(
        "musicCurrent"
    );

const musicDuration =
    document.getElementById(
        "musicDuration"
    );

const playlistList =
    document.getElementById(
        "playlistList"
    );


const playlist = [

    {
        title:
            "Shape of My Heart",

        artist:
            "Athaada Playlist",

        src:
            "images/music/music.mp3"

    }

];


let currentSong = 0;


function togglePlaylist() {

    musicPlayer?.classList.toggle(
        "active"
    );

}


playlistButton?.addEventListener(
    "click",
    event => {

        event.preventDefault();
        event.stopPropagation();

        togglePlaylist();

    }
);


musicClose?.addEventListener(
    "click",
    event => {

        event.preventDefault();
        event.stopPropagation();

        musicPlayer?.classList.remove(
            "active"
        );

    }
);


function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return `${minutes}:${String(
        secs
    ).padStart(2, "0")}`;

}


function renderPlaylist() {

    if (!playlistList) return;

    playlistList.innerHTML = "";

    playlist.forEach(
        (song, index) => {

            const item =
                document.createElement(
                    "button"
                );

            item.textContent =
                `${index + 1}. ${song.title} — ${song.artist}`;

            if (
                index === currentSong
            ) {
                item.classList.add(
                    "active"
                );
            }

            item.addEventListener(
                "click",
                () => {

                    currentSong =
                        index;

                    loadSong(
                        currentSong
                    );

                    playSong();

                }
            );

            playlistList.appendChild(
                item
            );

        }
    );

}


function loadSong(index) {

    const song =
        playlist[index];

    if (!song || !audioPlayer) {
        return;
    }

    audioPlayer.src =
        song.src;

    audioPlayer.load();

    if (musicTitle) {
        musicTitle.textContent =
            song.title;
    }

    if (musicArtist) {
        musicArtist.textContent =
            song.artist;
    }

    if (musicCurrent) {
        musicCurrent.textContent =
            "0:00";
    }

    if (musicDuration) {
        musicDuration.textContent =
            "0:00";
    }

    if (musicProgress) {
        musicProgress.value = 0;
    }

    renderPlaylist();

}


function playSong() {

    if (!audioPlayer) return;

    audioPlayer
        .play()
        .then(() => {

            if (musicPlay) {
                musicPlay.textContent =
                    "Ⅱ";
            }

        })
        .catch(() => {

            showToast(
                "Audio tidak dapat diputar."
            );

        });

}


function pauseSong() {

    if (!audioPlayer) return;

    audioPlayer.pause();

    if (musicPlay) {
        musicPlay.textContent =
            "▶";
    }

}


musicPlay?.addEventListener(
    "click",
    () => {

        if (
            audioPlayer?.paused
        ) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


musicNext?.addEventListener(
    "click",
    () => {

        currentSong++;

        if (
            currentSong >=
            playlist.length
        ) {

            currentSong = 0;

        }

        loadSong(currentSong);
        playSong();

    }
);


musicPrev?.addEventListener(
    "click",
    () => {

        currentSong--;

        if (
            currentSong < 0
        ) {

            currentSong =
                playlist.length - 1;

        }

        loadSong(currentSong);
        playSong();

    }
);


audioPlayer?.addEventListener(
    "ended",
    () => {

        currentSong++;

        if (
            currentSong >=
            playlist.length
        ) {

            currentSong = 0;

        }

        loadSong(currentSong);
        playSong();

    }
);


audioPlayer?.addEventListener(
    "loadedmetadata",
    () => {

        if (musicDuration) {

            musicDuration.textContent =
                formatTime(
                    audioPlayer.duration
                );

        }

    }
);


audioPlayer?.addEventListener(
    "timeupdate",
    () => {

        if (
            !audioPlayer.duration
        ) {
            return;
        }

        if (musicProgress) {

            musicProgress.value =
                (
                    audioPlayer.currentTime /
                    audioPlayer.duration
                ) * 100;

        }

        if (musicCurrent) {

            musicCurrent.textContent =
                formatTime(
                    audioPlayer.currentTime
                );

        }

    }
);


musicProgress?.addEventListener(
    "input",
    () => {

        if (
            !audioPlayer?.duration
        ) {
            return;
        }

        audioPlayer.currentTime =
            (
                musicProgress.value / 100
            ) *
            audioPlayer.duration;

    }
);


if (playlist.length > 0) {
    loadSong(0);
}


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );

if (
    heroVisual &&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (
                    event.clientX /
                    window.innerWidth -
                    .5
                ) * 10;

            const y =
                (
                    event.clientY /
                    window.innerHeight -
                    .5
                ) * 10;

            heroVisual.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}


/* =========================================================
   EASTER EGG
========================================================= */

console.log(
    "%c ATHAADA SYSTEM ",
    "background:#fff;color:#000;padding:8px;font-weight:bold;"
);

console.log(
    "Welcome to ATHAADA OS."
);
/* =========================================================
   ATHAADA V5 — LIVE SYSTEM ENGINE
   Additive only.
   ATHAADA OS DESKTOP TETAP AMAN.
========================================================= */

(() => {
    "use strict";

    /* ================= V5 HTML AUTO INJECT ================= */

    const v5System = `
        <section class="v5-system reveal" id="v5-system">

            <div class="v5-system-shell">

                <div class="v5-system-head">
                    <div>
                        <span class="v5-label">ATHAADA // SYSTEM MONITOR</span>
                        <h2 class="v5-system-title">
                            LIVE SYSTEM
                        </h2>
                    </div>

                    <div class="v5-system-status">
                        <i></i>
                        ALL SYSTEMS ONLINE
                    </div>
                </div>

                <div class="v5-metrics">

                    <div class="v5-metric">
                        <small>SYSTEM STATUS</small>
                        <strong class="v5-counter" data-target="98">0%</strong>
                        <span>Operational</span>
                    </div>

                    <div class="v5-metric">
                        <small>PROJECTS</small>
                        <strong class="v5-counter" data-target="03">0</strong>
                        <span>Active builds</span>
                    </div>

                    <div class="v5-metric">
                        <small>UPTIME</small>
                        <strong id="v5Uptime">00:00</strong>
                        <span>Session uptime</span>
                    </div>

                    <div class="v5-metric">
                        <small>BUILD MODE</small>
                        <strong>ON</strong>
                        <span>Experimenting</span>
                    </div>

                </div>

                <div class="v5-bars">

                    <div class="v5-bar-row">
                        <span>WEB</span>
                        <div class="v5-bar">
                            <span></span>
                        </div>
                        <b>98%</b>
                    </div>

                    <div class="v5-bar-row">
                        <span>JAVASCRIPT</span>
                        <div class="v5-bar">
                            <span></span>
                        </div>
                        <b>91%</b>
                    </div>

                    <div class="v5-bar-row">
                        <span>PYTHON</span>
                        <div class="v5-bar">
                            <span></span>
                        </div>
                        <b>86%</b>
                    </div>

                    <div class="v5-bar-row">
                        <span>AI / ML</span>
                        <div class="v5-bar">
                            <span></span>
                        </div>
                        <b>94%</b>
                    </div>

                </div>

                <div class="v5-monitor">

                    <div class="v5-monitor-box">

                        <div class="v5-monitor-head">
                            <i></i>
                            <i></i>
                            <i></i>
                            <span>NOVA_MONITOR</span>
                        </div>

                        <div class="v5-monitor-body">
                            <p>&gt; initializing NOVA monitor...</p>
                            <p>&gt; checking memory........ <b>OK</b></p>
                            <p>&gt; checking interface..... <b>OK</b></p>
                            <p>&gt; checking response....... <b>OK</b></p>
                            <p>&gt; neural interface........ <b>ONLINE</b></p>
                            <p>&gt; system state............. <span class="v5-green">READY</span></p>
                        </div>

                    </div>

                    <div class="v5-monitor-box">

                        <div class="v5-monitor-head">
                            <i></i>
                            <i></i>
                            <i></i>
                            <span>ACTIVITY_FEED</span>
                        </div>

                        <div class="v5-monitor-body">
                            <p>[LIVE] portfolio system loaded</p>
                            <p>[LIVE] V4 interface detected</p>
                            <p>[LIVE] V5 engine started</p>
                            <p>[SCAN] project matrix........ <b>03</b></p>
                            <p>[SCAN] skill matrix.......... <b>05</b></p>
                            <p>[STATUS] everything nominal</p>
                        </div>

                    </div>

                </div>

            </div>

        </section>

        <section class="v5-spotlight reveal">

            <div class="v5-section-head">
                <small>05 // PROJECT SPOTLIGHT</small>

                <h2>
                    NOW <span>BUILDING.</span>
                </h2>
            </div>

            <div class="v5-spotlight-card">

                <div class="v5-spotlight-main">

                    <div class="v5-spotlight-status">
                        <i></i>
                        CURRENT BUILD
                    </div>

                    <h3>NOVA<br>AI</h3>

                    <p>
                        Eksperimen AI personal dengan interface chat,
                        memory percakapan, sistem backend, dan berbagai
                        eksperimen model untuk membangun pengalaman AI sendiri.
                    </p>

                    <div class="v5-spotlight-tags">
                        <span>PYTHON</span>
                        <span>FLASK</span>
                        <span>AI</span>
                        <span>JAVASCRIPT</span>
                    </div>

                </div>

                <div class="v5-spotlight-visual">
                    <div class="v5-core">
                        N.
                    </div>
                </div>

            </div>

            <div class="v5-build">

                <div class="v5-build-top">
                    <span>BUILD PROGRESS</span>
                    <span id="v5BuildPercent">72%</span>
                </div>

                <div class="v5-build-track">
                    <span></span>
                </div>

            </div>

        </section>

        <section class="v5-pulse reveal">

            <div class="v5-pulse-shell">

                <div class="v5-pulse-head">
                    <strong>SYSTEM PULSE</strong>
                    <span>REALTIME ACTIVITY</span>
                </div>

                <div class="v5-wave">

                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>

                </div>

            </div>

        </section>
    `;


    /* ================= INSERT V5 ================= */

    function injectV5() {

        if (document.getElementById("v5-system")) {
            return;
        }

        const footer = document.querySelector("footer");

        if (!footer) {
            console.warn("V5: footer tidak ditemukan.");
            return;
        }

        footer.insertAdjacentHTML(
            "beforebegin",
            v5System
        );
    }


    /* ================= COUNTER ================= */

    function animateV5Counters() {

        const counters =
            document.querySelectorAll(".v5-counter");

        counters.forEach(counter => {

            if (counter.dataset.animated === "true") {
                return;
            }

            const target =
                Number(counter.dataset.target);

            if (!Number.isFinite(target)) {
                return;
            }

            counter.dataset.animated = "true";

            let current = 0;

            const duration = 1200;
            const start = performance.now();

            function update(now) {

                const progress =
                    Math.min(
                        (now - start) / duration,
                        1
                    );

                const eased =
                    1 - Math.pow(1 - progress, 3);

                current =
                    Math.round(target * eased);

                if (target < 10) {
                    counter.textContent =
                        String(current).padStart(2, "0");
                } else {
                    counter.textContent =
                        current + "%";
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }

            }

            requestAnimationFrame(update);

        });

    }


    /* ================= UPTIME ================= */

    const v5StartTime = Date.now();

    function updateV5Uptime() {

        const element =
            document.getElementById("v5Uptime");

        if (!element) {
            return;
        }

        const elapsed =
            Math.floor(
                (Date.now() - v5StartTime) / 1000
            );

        const hours =
            Math.floor(elapsed / 3600);

        const minutes =
            Math.floor((elapsed % 3600) / 60);

        const seconds =
            elapsed % 60;

        const formatted =
            [
                hours,
                minutes,
                seconds
            ]
                .map(value =>
                    String(value).padStart(2, "0")
                )
                .join(":");

        element.textContent = formatted;

    }


    /* ================= BUILD PERCENT ================= */

    function updateBuildPercent() {

        const element =
            document.getElementById("v5BuildPercent");

        if (!element) {
            return;
        }

        const base = 72;

        const variation =
            Math.sin(Date.now() / 1800) * 3;

        const value =
            Math.round(base + variation);

        element.textContent =
            value + "%";

    }


    /* ================= REVEAL V5 ================= */

    function setupV5Reveal() {

        const elements =
            document.querySelectorAll(
                "#v5-system.reveal, .v5-spotlight.reveal, .v5-pulse.reveal"
            );

        if (!elements.length) {
            return;
        }

        if (!("IntersectionObserver" in window)) {

            elements.forEach(element => {
                element.classList.add("show");
            });

            animateV5Counters();
            return;
        }

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("show");

                        if (
                            entry.target.id ===
                            "v5-system"
                        ) {
                            entry.target.classList.add(
                                "is-loaded"
                            );

                            animateV5Counters();
                        }

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: .15
                }
            );

        elements.forEach(element => {
            observer.observe(element);
        });

    }


    /* ================= PULSE RANDOMIZER ================= */

    function randomizePulse() {

        const bars =
            document.querySelectorAll(
                ".v5-wave i"
            );

        bars.forEach(bar => {

            const height =
                Math.floor(
                    Math.random() * 75
                ) + 20;

            bar.style.height =
                height + "%";

        });

    }


    /* ================= START V5 ================= */

    function startV5() {

    injectV5();

    setupV5Reveal();

    /* FORCE V5 COUNTER */
    setTimeout(() => {
        const system = document.getElementById("v5-system");

        if (system) {
            system.classList.add("show");
            system.classList.add("is-loaded");
        }

        animateV5Counters();
    }, 100);

    updateV5Uptime();
    updateBuildPercent();
    randomizePulse();

    setInterval(
        updateV5Uptime,
        1000
    );

    setInterval(
        updateBuildPercent,
        1200
    );

    setInterval(
        randomizePulse,
        900
    );

    }


    /* ================= DOM READY ================= */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            startV5
        );

    } else {

        startV5();

    }

})();
/* =========================================================
   ATHAADA V6 — LIVE COMMAND CENTER
   ADDITIVE ONLY
   ATHAADA OS DESKTOP TIDAK DISENTUH
========================================================= */

(() => {
    if (document.getElementById("athaadaV6")) return;

    const style = document.createElement("style");

    style.textContent = `
        /* ================= V6 ROOT ================= */

        #athaadaV6 {
            width: min(1180px, 90%);
            margin: 150px auto 110px;
            position: relative;
            z-index: 3;
            color: #fff;
        }

        .v6-shell {
            border: 1px solid rgba(255,255,255,.12);
            background:
                radial-gradient(
                    circle at 90% 10%,
                    rgba(255,255,255,.06),
                    transparent 30%
                ),
                linear-gradient(
                    145deg,
                    rgba(255,255,255,.045),
                    rgba(255,255,255,.008)
                );
            overflow: hidden;
        }

        /* ================= HEADER ================= */

        .v6-head {
            padding: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 25px;
            border-bottom: 1px solid rgba(255,255,255,.08);
        }

        .v6-kicker {
            color: #666;
            font: 9px monospace;
            letter-spacing: 3px;
        }

        .v6-title {
            margin-top: 10px;
            font-family: "Space Grotesk", sans-serif;
            font-size: clamp(34px, 6vw, 68px);
            line-height: .9;
            letter-spacing: -4px;
        }

        .v6-title span {
            color: #666;
        }

        .v6-live {
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 10px 13px;
            border: 1px solid rgba(255,255,255,.12);
            color: #888;
            font: 9px monospace;
            letter-spacing: 1.5px;
            white-space: nowrap;
        }

        .v6-live i {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #a8ff9d;
            box-shadow: 0 0 14px #a8ff9d;
            animation: v6Blink 1.5s infinite;
        }

        @keyframes v6Blink {
            50% {
                opacity: .25;
                transform: scale(.65);
            }
        }

        /* ================= TELEMETRY ================= */

        .v6-telemetry {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1px;
            background: rgba(255,255,255,.08);
        }

        .v6-stat {
            min-height: 145px;
            padding: 22px;
            background: #070707;
            position: relative;
            overflow: hidden;
        }

        .v6-stat::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255,255,255,.4),
                transparent
            );
            transform: translateX(-100%);
            animation: v6Scan 4s linear infinite;
        }

        @keyframes v6Scan {
            to {
                transform: translateX(100%);
            }
        }

        .v6-stat small {
            color: #555;
            font: 8px monospace;
            letter-spacing: 2px;
        }

        .v6-stat strong {
            display: block;
            margin-top: 22px;
            font: 700 30px "Space Grotesk", sans-serif;
            letter-spacing: -1px;
        }

        .v6-stat span {
            display: block;
            margin-top: 5px;
            color: #555;
            font: 8px monospace;
        }

        /* ================= MAIN GRID ================= */

        .v6-main {
            display: grid;
            grid-template-columns: 1.2fr .8fr;
            gap: 1px;
            background: rgba(255,255,255,.08);
        }

        .v6-panel {
            background: #060606;
            padding: 28px;
        }

        .v6-panel-label {
            color: #555;
            font: 8px monospace;
            letter-spacing: 2px;
            margin-bottom: 18px;
        }

        /* ================= TERMINAL ================= */

        .v6-terminal {
            min-height: 230px;
            border: 1px solid rgba(255,255,255,.08);
            background: #020202;
            padding: 18px;
            font: 10px/2 monospace;
            color: #666;
        }

        .v6-terminal p {
            margin: 0;
        }

        .v6-terminal b {
            color: #fff;
            font-weight: 500;
        }

        .v6-ok {
            color: #a8ff9d !important;
        }

        .v6-cursor {
            display: inline-block;
            width: 6px;
            height: 11px;
            background: #fff;
            margin-left: 3px;
            vertical-align: middle;
            animation: v6Cursor .8s infinite;
        }

        @keyframes v6Cursor {
            50% {
                opacity: 0;
            }
        }

        /* ================= MISSION ================= */

        .v6-mission {
            display: grid;
            gap: 9px;
        }

        .v6-mission-card {
            padding: 17px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(255,255,255,.015);
            transition: .25s ease;
        }

        .v6-mission-card:hover {
            transform: translateX(5px);
            border-color: rgba(255,255,255,.22);
        }

        .v6-mission-card small {
            display: block;
            color: #555;
            font: 8px monospace;
            letter-spacing: 1.5px;
        }

        .v6-mission-card strong {
            display: block;
            margin-top: 7px;
            font-size: 13px;
        }

        .v6-mission-card span {
            display: block;
            margin-top: 4px;
            color: #666;
            font: 9px monospace;
        }

        /* ================= ACTIONS ================= */

        .v6-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 18px;
        }

        .v6-btn {
            padding: 11px 14px;
            border: 1px solid rgba(255,255,255,.15);
            background: transparent;
            color: #fff;
            cursor: pointer;
            font: 700 8px monospace;
            letter-spacing: 1.5px;
            transition: .25s ease;
        }

        .v6-btn:hover {
            background: #fff;
            color: #000;
            transform: translateY(-2px);
        }

        .v6-btn.primary {
            background: #fff;
            color: #000;
        }

        /* ================= ACTIVITY ================= */

        .v6-activity {
            border-top: 1px solid rgba(255,255,255,.08);
            padding: 20px 28px;
            background: #050505;
            display: flex;
            align-items: center;
            gap: 15px;
            overflow: hidden;
        }

        .v6-activity-label {
            color: #444;
            font: 8px monospace;
            letter-spacing: 2px;
            flex-shrink: 0;
        }

        .v6-activity-text {
            color: #777;
            font: 9px monospace;
            white-space: nowrap;
            transition: opacity .25s;
        }

        .v6-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 12px #fff;
            flex-shrink: 0;
        }

        /* ================= FOCUS MODE ================= */

        body.v6-focus-mode .v6-stat,
        body.v6-focus-mode .v6-panel,
        body.v6-focus-mode .v6-activity {
            opacity: .35;
            transition: opacity .3s ease;
        }

        body.v6-focus-mode #athaadaV6 {
            opacity: 1;
        }

        body.v6-focus-mode .v6-shell {
            border-color: rgba(255,255,255,.35);
            box-shadow:
                0 0 0 1px rgba(255,255,255,.05),
                0 0 80px rgba(255,255,255,.04);
        }

        /* ================= MOBILE ================= */

        @media (max-width: 850px) {

            .v6-telemetry {
                grid-template-columns: repeat(2, 1fr);
            }

            .v6-main {
                grid-template-columns: 1fr;
            }

            .v6-head {
                flex-direction: column;
            }

            .v6-live {
                width: fit-content;
            }
        }

        @media (max-width: 520px) {

            #athaadaV6 {
                width: calc(100% - 30px);
                margin-top: 100px;
            }

            .v6-head,
            .v6-panel {
                padding: 20px;
            }

            .v6-title {
                font-size: 42px;
                letter-spacing: -2px;
            }

            .v6-stat {
                min-height: 115px;
                padding: 16px;
            }

            .v6-stat strong {
                font-size: 24px;
            }

            .v6-activity {
                padding: 16px;
            }

            .v6-actions {
                flex-direction: column;
            }

            .v6-btn {
                width: 100%;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .v6-stat::after,
            .v6-live i,
            .v6-cursor {
                animation: none;
            }

            .v6-mission-card,
            .v6-btn {
                transition: none;
            }
        }
    `;

    document.head.appendChild(style);

    /* ================= HTML ================= */

   const v6 = document.createElement("section");

    v6.id = "athaadaV6";
    v6.className = "reveal";
    
    v6.innerHTML = `
        <div class="v6-shell">

            <div class="v6-head">

                <div>
                    <div class="v6-kicker">
                        ATHAADA // COMMAND CENTER
                    </div>

                    <h2 class="v6-title">
                       LIVE <span>SYSTEM.</span>
                    </h2>
                </div>

                <div class="v6-live">
                    <i></i>
                    SYSTEM ONLINE
                </div>

            </div>

            <div class="v6-telemetry">

                <div class="v6-stat">
                    <small>LOCAL TIME</small>
                    <strong id="v6Time">00:00:00</strong>
                    <span>WIB</span>
                </div>

                <div class="v6-stat">
                    <small>SESSION</small>
                    <strong id="v6Session">00:00</strong>
                    <span>UPTIME</span>
                </div>

                <div class="v6-stat">
                    <small>VIEWPORT</small>
                    <strong id="v6Viewport">---</strong>
                    <span>DISPLAY</span>
                </div>

                <div class="v6-stat">
                    <small>NETWORK</small>
                    <strong id="v6Network">ONLINE</strong>
                    <span id="v6NetworkType">CONNECTION</span>
                </div>

            </div>

            <div class="v6-main">

                <div class="v6-panel">

                    <div class="v6-panel-label">
                        SYSTEM TERMINAL
                    </div>

                    <div class="v6-terminal" id="v6Terminal">

                        <p>&gt; booting command center...</p>
                        <p>&gt; loading telemetry modules...</p>
                        <p>&gt; checking interface integrity...</p>
                        <p>&gt; connection status: <b class="v6-ok">ONLINE</b></p>
                        <p>&gt; ATHAADA V6 ready.</p>
                        <p>&gt; <span id="v6TerminalMessage">
                            awaiting command
                        </span><span class="v6-cursor"></span></p>

                    </div>

                    <div class="v6-actions">

                        <button
                            type="button"
                            class="v6-btn primary"
                            id="v6SystemCheck">
                            RUN SYSTEM CHECK
                        </button>

                        <button
                            type="button"
                            class="v6-btn"
                            id="v6Focus">
                            FOCUS MODE
                        </button>

                        <button
                            type="button"
                            class="v6-btn"
                            id="v6Copy">
                            COPY STATUS
                        </button>

                    </div>

                </div>

                <div class="v6-panel">

                    <div class="v6-panel-label">
                        MISSION CONTROL
                    </div>

                    <div class="v6-mission">

                        <div class="v6-mission-card">
                            <small>NOW BUILDING</small>
                            <strong>ATHAADA V6</strong>
                            <span>LIVE COMMAND CENTER</span>
                        </div>

                        <div class="v6-mission-card">
                            <small>CORE FOCUS</small>
                            <strong>WEB / AI / TECH</strong>
                            <span>EXPERIMENTAL SYSTEMS</span>
                        </div>

                        <div class="v6-mission-card">
                            <small>PROJECT STATUS</small>
                            <strong>ACTIVE</strong>
                            <span>CONTINUOUS DEVELOPMENT</span>
                        </div>

                        <div class="v6-mission-card">
                            <small>PORTFOLIO MODE</small>
                            <strong>BUILDING</strong>
                            <span>ALWAYS EXPERIMENTING</span>
                        </div>

                    </div>

                </div>

            </div>

            <div class="v6-activity">

                <span class="v6-dot"></span>

                <span class="v6-activity-label">
                    LIVE FEED
                </span>

                <span
                    class="v6-activity-text"
                    id="v6Activity">
                    ATHAADA SYSTEM INITIALIZED
                </span>

            </div>

        </div>
    `;

    /* ================= INSERT ================= */

    const footer = document.querySelector("footer");

    if (footer) {
        footer.parentNode.insertBefore(v6, footer);
    } else {
        document.body.appendChild(v6);
    }

    /* ================= CLOCK ================= */

    const v6Time = document.getElementById("v6Time");

    function updateV6Time() {
        if (!v6Time) return;

        const now = new Date();

        v6Time.textContent =
            now.toLocaleTimeString("id-ID", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
    }

    updateV6Time();
    setInterval(updateV6Time, 1000);

    /* ================= SESSION ================= */

    const sessionStart = Date.now();
    const sessionEl = document.getElementById("v6Session");

    function updateSession() {
        if (!sessionEl) return;

        const seconds =
            Math.floor((Date.now() - sessionStart) / 1000);

        const minutes =
            Math.floor(seconds / 60);

        const secs =
            seconds % 60;

        sessionEl.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(secs).padStart(2, "0");
    }

    updateSession();
    setInterval(updateSession, 1000);

    /* ================= VIEWPORT ================= */

    const viewport = document.getElementById("v6Viewport");

    function updateViewport() {
        if (!viewport) return;

        viewport.textContent =
            `${window.innerWidth}×${window.innerHeight}`;
    }

    updateViewport();
    window.addEventListener("resize", updateViewport);

    /* ================= NETWORK ================= */

    const network = document.getElementById("v6Network");
    const networkType =
        document.getElementById("v6NetworkType");

    function updateNetwork() {

        if (!network) return;

        const online = navigator.onLine;

        network.textContent =
            online ? "ONLINE" : "OFFLINE";

        network.style.color =
            online ? "#a8ff9d" : "#ff7777";

        if (networkType) {

            const connection =
                navigator.connection ||
                navigator.mozConnection ||
                navigator.webkitConnection;

            networkType.textContent =
                connection?.effectiveType
                    ? connection.effectiveType.toUpperCase()
                    : online
                        ? "CONNECTED"
                        : "NO CONNECTION";
        }
    }

    updateNetwork();

    window.addEventListener(
        "online",
        updateNetwork
    );

    window.addEventListener(
        "offline",
        updateNetwork
    );

    /* ================= SYSTEM CHECK ================= */

    const systemCheck =
        document.getElementById("v6SystemCheck");

    const terminalMessage =
        document.getElementById("v6TerminalMessage");

    systemCheck?.addEventListener("click", () => {

        const messages = [
            "scanning interface...",
            "checking animations...",
            "checking portfolio modules...",
            "checking playlist system...",
            "checking ATHAADA OS...",
            "checking responsive layout...",
            "checking network...",
            "SYSTEM CHECK COMPLETE"
        ];

        let index = 0;

        systemCheck.disabled = true;

        const timer = setInterval(() => {

            if (terminalMessage) {
                terminalMessage.textContent =
                    messages[index];
            }

            index++;

            if (index >= messages.length) {

                clearInterval(timer);

                systemCheck.disabled = false;

                if (typeof showToast === "function") {
                    showToast("ATHAADA V6 SYSTEM CHECK COMPLETE");
                }
            }

        }, 350);
    });

    /* ================= FOCUS MODE ================= */

    const focusButton =
        document.getElementById("v6Focus");

    focusButton?.addEventListener("click", () => {

        document.body.classList.toggle(
            "v6-focus-mode"
        );

        const active =
            document.body.classList.contains(
                "v6-focus-mode"
            );

        focusButton.textContent =
            active
                ? "EXIT FOCUS"
                : "FOCUS MODE";

        if (typeof showToast === "function") {
            showToast(
                active
                    ? "Focus mode enabled."
                    : "Focus mode disabled."
            );
        }
    });

    /* ================= COPY STATUS ================= */

    const copyButton =
        document.getElementById("v6Copy");

    copyButton?.addEventListener("click", async () => {

        const status =
`ATHAADA ICHIRO
ATHAADA V6
SYSTEM: ONLINE
NETWORK: ${navigator.onLine ? "ONLINE" : "OFFLINE"}
VIEWPORT: ${window.innerWidth}x${window.innerHeight}
MODE: BUILDING`;

        try {

            await navigator.clipboard.writeText(status);

            if (typeof showToast === "function") {
                showToast("V6 system status copied.");
            }

        } catch {

            if (typeof showToast === "function") {
                showToast("ATHAADA V6");
            }
        }
    });

    /* ================= LIVE FEED ================= */

    const activity =
        document.getElementById("v6Activity");

    const feeds = [
        "ATHAADA SYSTEM INITIALIZED",
        "LIVE TELEMETRY CONNECTED",
        "PORTFOLIO MODULES ONLINE",
        "ATHAADA OS PRESERVED",
        "PLAYLIST SYSTEM READY",
        "V6 COMMAND CENTER ACTIVE",
        "BUILD MODE: ALWAYS EXPERIMENTING"
    ];

    let feedIndex = 0;

    setInterval(() => {

        if (!activity) return;

        activity.style.opacity = "0";

        setTimeout(() => {

            feedIndex =
                (feedIndex + 1) % feeds.length;

            activity.textContent =
                feeds[feedIndex];

            activity.style.opacity = "1";

        }, 250);

    }, 3000);

    /* ================= KEYBOARD ================= */

    document.addEventListener("keydown", event => {

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "a"
        ) {

            event.preventDefault();

            document
                .getElementById("athaadaV6")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
        }

    });
 /* ================= START V6 ================= */

const v6Element = document.getElementById("athaadaV6");

if (v6Element) {
    v6Element.style.display = "block";
}

})();
/* =========================================================
   CONTACT NAVIGATION FIX
========================================================= */

document.addEventListener("click", function (event) {
    const link = event.target.closest('a[href="#contact"]');

    if (!link) return;

    event.preventDefault();

    const contact = document.getElementById("contact");

    if (!contact) {
        console.warn("CONTACT SECTION TIDAK DITEMUKAN");
        return;
    }

    // Pastikan contact terlihat
    contact.style.display = "block";
    contact.style.visibility = "visible";
    contact.style.opacity = "1";

    const box = contact.querySelector(".contact-box");

    if (box) {
        box.style.display = "block";
        box.style.visibility = "visible";
        box.style.opacity = "1";
        box.style.transform = "none";
    }

    // Scroll ke Contact
    setTimeout(() => {
        const offset = 80;
        const position =
            contact.getBoundingClientRect().top +
            window.scrollY -
            offset;

        window.scrollTo({
            top: position,
            behavior: "smooth"
        });
    }, 50);
});