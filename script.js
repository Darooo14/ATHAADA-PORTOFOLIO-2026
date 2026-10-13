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

const loaderTimer = setInterval(() => {

    loadValue += Math.floor(Math.random() * 8) + 3;

    if (loadValue >= 100) {

        loadValue = 100;

        clearInterval(loaderTimer);

        setTimeout(() => {
            loader?.classList.add("hide");
        }, 400);

    }

    if (loaderProgress) {
        loaderProgress.style.width = `${loadValue}%`;
    }

    if (loaderPercent) {
        loaderPercent.textContent = `${loadValue}%`;
    }

}, 70);


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