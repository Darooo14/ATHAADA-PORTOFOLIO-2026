document.documentElement.classList.add("js-enabled");

/* ================= LOADER ================= */

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
        }, 450);
    }

    if (loaderProgress) {
        loaderProgress.style.width = `${loadValue}%`;
    }

    if (loaderPercent) {
        loaderPercent.textContent = `${loadValue}%`;
    }

}, 70);


/* ================= ELEMENTS ================= */

const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const scrollProgress = document.getElementById("scrollProgress");
const topBtn = document.getElementById("topBtn");

const heroClock = document.getElementById("heroClock");
const osClock = document.getElementById("osClock");
const osTaskClock = document.getElementById("osTaskClock");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* ================= MOBILE MENU ================= */

menuBtn?.addEventListener("click", () => {

    navLinks?.classList.toggle("open");

    const opened = navLinks?.classList.contains("open");

    menuBtn.textContent = opened ? "×" : "☰";

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks?.classList.remove("open");

        if (menuBtn) {
            menuBtn.textContent = "☰";
        }

    });

});


/* ================= NAVBAR ================= */

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
        scrollProgress.style.width = `${progress}%`;
    }

    if (topBtn) {
        topBtn.style.opacity =
            window.scrollY > 500 ? "1" : "0";
        topBtn.style.pointerEvents =
            window.scrollY > 500 ? "auto" : "none";
    }

});


/* ================= ACTIVE NAV ================= */

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
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
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* ================= REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ================= CLOCK ================= */

function updateClocks() {

    const now = new Date();

    const time = now.toLocaleTimeString(
        "id-ID",
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

    const shortTime = now.toLocaleTimeString(
        "id-ID",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

    if (heroClock) {
        heroClock.textContent = time;
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


/* ================= TOP BUTTON ================= */

topBtn?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= TYPING BADGE ================= */

const typingText = document.getElementById("typingText");

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
        (typingIndex + 1) % typingWords.length;

    if (typingText) {

        typingText.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(5px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 350,
                easing: "ease-out"
            }
        );

        typingText.textContent =
            typingWords[typingIndex];

    }

}, 2500);


/* ================= TOAST ================= */

let toastTimer;

function showToast(message) {

    if (!toast || !toastMessage) {
        return;
    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}


/* ================= COPY IDENTITY ================= */

function copyIdentity() {

    const identity =
        "ATHAADA ICHIRO — Developer / Creator";

    navigator.clipboard?.writeText(identity)
        .then(() => {
            showToast("Identity copied.");
        })
        .catch(() => {
            showToast("ATHAADA ICHIRO");
        });

}


/* ================= PROJECT DATA ================= */

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

        type: "AI APPLICATION",

        status: "PERSONAL PROJECT",

        link: "#"

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

        type: "WEB PROJECT",

        status: "CAMPAIGN WEBSITE",

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

        type: "COMPUTER VISION",

        status: "EXPERIMENT",

        link: "#"

    }

};


/* ================= PROJECT MODAL ================= */

const projectModal =
    document.getElementById("projectModal");

const projectModalClose =
    document.getElementById("projectModalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalType =
    document.getElementById("modalType");

const modalStatus =
    document.getElementById("modalStatus");

const modalTags =
    document.getElementById("modalTags");

const modalLink =
    document.getElementById("modalLink");


function openProject(name) {

    const data = projectData[name];

    if (!data) {
        return;
    }

    modalTitle.textContent = name;
    modalDescription.textContent = data.description;
    modalType.textContent = data.type;
    modalStatus.textContent = data.status;

    modalTags.innerHTML =
        data.tech
            .map(
                tech => `<span>${tech}</span>`
            )
            .join("");

    modalLink.href = data.link;

    if (data.link === "#") {
        modalLink.style.opacity = ".35";
        modalLink.style.pointerEvents = "none";
    } else {
        modalLink.style.opacity = "1";
        modalLink.style.pointerEvents = "auto";
    }

    projectModal?.classList.add("open");
    document.body.classList.add("modal-open");

}


function closeProjectModal() {

    projectModal?.classList.remove("open");

    document.body.classList.remove("modal-open");

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

projectModal?.querySelector(".modal-backdrop")
    ?.addEventListener(
        "click",
        closeProjectModal
    );


/* ================= PROJECT FILTER ================= */

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
                category === filter
            ) {

                card.style.display = "flex";

                requestAnimationFrame(() => {
                    card.style.opacity = "1";
                    card.style.transform = "";
                });

            } else {

                card.style.opacity = "0";
                card.style.transform = "scale(.96)";

                setTimeout(() => {
                    card.style.display = "none";
                }, 200);

            }

        });

    });

});


/* ================= TERMINAL ================= */

const terminalModal =
    document.getElementById("terminalModal");

const terminalClose =
    document.getElementById("terminalClose");

const terminalInput =
    document.getElementById("terminalInput");

const terminalOutput =
    document.getElementById("terminalOutput");


function openTerminal() {

    terminalModal?.classList.add("open");

    document.body.classList.add("modal-open");

    setTimeout(() => {
        terminalInput?.focus();
    }, 100);

}


function closeTerminal() {

    terminalModal?.classList.remove("open");

    document.body.classList.remove("modal-open");

}


terminalClose?.addEventListener(
    "click",
    closeTerminal
);

terminalModal?.querySelector(".modal-backdrop")
    ?.addEventListener(
        "click",
        closeTerminal
    );


function printTerminal(text) {

    if (!terminalOutput) {
        return;
    }

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

    if (!command) {
        return;
    }

    printTerminal(
        `<span class="terminal-green">visitor@athaada:~$</span> ${rawCommand}`
    );

    switch (command) {

        case "help":

            printTerminal(
                "Available: help, about, projects, skills, whoami, neofetch, date, os, clear"
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

        case "clear":

            terminalOutput.innerHTML = "";

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


/* ================= COMMAND PALETTE ================= */

const commandPalette =
    document.getElementById("commandPalette");

const commandInput =
    document.getElementById("commandInput");


function openCommandPalette() {

    commandPalette?.classList.add("open");

    setTimeout(() => {
        commandInput?.focus();
    }, 100);

}


function closeCommandPalette() {

    commandPalette?.classList.remove("open");

    if (commandInput) {
        commandInput.value = "";
    }

}


document
    .querySelectorAll("[data-command]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const command =
                button.dataset.command;

            closeCommandPalette();

            if (command === "home") {
                location.hash = "home";
            }

            if (command === "projects") {
                document
                    .getElementById("projects")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });
            }

            if (command === "terminal") {
                openTerminal();
            }

            if (command === "os") {
                openOS();
            }

        });

    });


commandPalette?.addEventListener(
    "click",
    event => {

        if (
            event.target === commandPalette
        ) {
            closeCommandPalette();
        }

    }
);


/* ================= KEYBOARD SHORTCUTS ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openCommandPalette();

        }

        if (event.key === "Escape") {

            closeCommandPalette();
            closeProjectModal();
            closeTerminal();

        }

        if (
            event.key.toLowerCase() === "t" &&
            !event.target.matches("input, textarea")
        ) {

            openTerminal();

        }

    }
);


/* ================= CUSTOM CURSOR ================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

document.addEventListener(
    "mousemove",
    event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursorDot) {
            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;
        }

    }
);


function animateCursor() {

    ringX +=
        (mouseX - ringX) * .15;

    ringY +=
        (mouseY - ringY) * .15;

    if (cursorRing) {

        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;

    }

    requestAnimationFrame(
        animateCursor
    );

}

animateCursor();


document
    .querySelectorAll("a, button, .project-card")
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                if (!cursorRing) {
                    return;
                }

                cursorRing.style.width =
                    "48px";

                cursorRing.style.height =
                    "48px";

            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                if (!cursorRing) {
                    return;
                }

                cursorRing.style.width =
                    "30px";

                cursorRing.style.height =
                    "30px";

            }
        );

    });


/* ================= MAGNETIC BUTTON ================= */

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
                    `translate(${x * .12}px, ${y * .12}px)`;

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


/* ================= HERO PARALLAX ================= */

const heroVisual =
    document.querySelector(".hero-visual");

document.addEventListener(
    "mousemove",
    event => {

        if (!heroVisual) {
            return;
        }

        if (window.innerWidth < 900) {
            return;
        }

        const x =
            (event.clientX /
                window.innerWidth -
                .5) * 10;

        const y =
            (event.clientY /
                window.innerHeight -
                .5) * 10;

        heroVisual.style.transform =
            `translate(${x}px, ${y}px)`;

    }
);


/* ================= PARTICLES ================= */

const canvas =
    document.getElementById("particleCanvas");

const ctx =
    canvas?.getContext("2d");

let particles = [];

function resizeCanvas() {

    if (!canvas) {
        return;
    }

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

function createParticles() {

    particles = [];

    const count =
        window.innerWidth < 600
            ? 25
            : 55;

    for (let i = 0; i < count; i++) {

        particles.push({

            x: Math.random() *
                window.innerWidth,

            y: Math.random() *
                window.innerHeight,

            size:
                Math.random() * 1.5 + .3,

            speed:
                Math.random() * .25 + .05,

            opacity:
                Math.random() * .4 + .1

        });

    }

}

function drawParticles() {

    if (!canvas || !ctx) {
        return;
    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${p.opacity})`;

        ctx.fill();

        p.y -= p.speed;

        if (p.y < -10) {
            p.y =
                canvas.height + 10;

            p.x =
                Math.random() *
                canvas.width;
        }

    });

    requestAnimationFrame(
        drawParticles
    );

}

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


/* ================= ATHAADA OS ================= */

const osOverlay =
    document.getElementById("osOverlay");

const osStartButton =
    document.getElementById("osStartButton");

const osStartMenu =
    document.getElementById("osStartMenu");

const osTaskApps =
    document.getElementById("osTaskApps");

const openWindows =
    new Map();

let highestZ = 30;


function openOS() {

    osOverlay?.classList.add("open");

    document.body.style.overflow =
        "hidden";

}


function closeOS() {

    osOverlay?.classList.remove("open");

    osStartMenu?.classList.remove("open");

    document.body.style.overflow =
        "";

}


window.openOS = openOS;
window.closeOS = closeOS;


function focusWindow(windowElement) {

    highestZ++;

    windowElement.style.zIndex =
        highestZ;

}


function createTaskButton(
    windowId,
    title
) {

    if (
        document.querySelector(
            `[data-task-window="${windowId}"]`
        )
    ) {
        return;
    }

    const button =
        document.createElement("button");

    button.className =
        "os-task-app";

    button.dataset.taskWindow =
        windowId;

    button.textContent =
        title;

    button.addEventListener(
        "click",
        () => {

            const win =
                document.getElementById(windowId);

            if (!win) {
                return;
            }

            if (
                win.classList.contains("open")
            ) {

                focusWindow(win);

            } else {

                win.classList.add("open");
                focusWindow(win);

            }

        }
    );

    osTaskApps?.appendChild(button);

}


function removeTaskButton(windowId) {

    document
        .querySelector(
            `[data-task-window="${windowId}"]`
        )
        ?.remove();

}


function showOSWindow(windowId) {

    const win =
        document.getElementById(windowId);

    if (!win) {
        return;
    }

    win.classList.add("open");

    focusWindow(win);

    createTaskButton(
        windowId,
        win.dataset.title || windowId
    );

    openWindows.set(
        windowId,
        win
    );

}


function hideOSWindow(windowId) {

    const win =
        document.getElementById(windowId);

    if (!win) {
        return;
    }

    win.classList.remove("open");

}


document
    .querySelectorAll(".desktop-icon[data-window]")
    .forEach(icon => {

        icon.addEventListener(
            "dblclick",
            () => {

                showOSWindow(
                    icon.dataset.window
                );

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

                    showOSWindow(windowId);

                    osStartMenu?.classList.remove(
                        "open"
                    );

                }

                if (action === "terminal") {

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


/* ================= OS WINDOW CONTROLS ================= */

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

                    win.classList.remove("open");

                }
            );

        win
            .querySelector("[data-minimize]")
            ?.addEventListener(
                "click",
                () => {

                    win.classList.remove("open");

                }
            );

    });


/* ================= OS PROJECTS ================= */

document
    .querySelectorAll(
        "[data-open-project]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const project =
                    button.dataset.openProject;

                closeOS();

                setTimeout(() => {
                    openProject(project);
                }, 100);

            }
        );

    });


/* ================= NOVA MINI APP ================= */

const novaInput =
    document.getElementById("novaInput");

const novaSend =
    document.getElementById("novaSend");

const novaMessages =
    document.getElementById("novaMessages");


function sendNovaMessage() {

    const value =
        novaInput?.value.trim();

    if (!value) {
        return;
    }

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "nova-message user";

    userMessage.textContent =
        value;

    novaMessages?.appendChild(
        userMessage
    );

    novaInput.value = "";

    setTimeout(() => {

        const botMessage =
            document.createElement("div");

        botMessage.className =
            "nova-message";

        botMessage.innerHTML =
            `Received: "${value}"<br><br>I'm currently running in portfolio demo mode.`;

        novaMessages?.appendChild(
            botMessage
        );

        if (novaMessages) {
            novaMessages.scrollTop =
                novaMessages.scrollHeight;
        }

    }, 500);

}


novaSend?.addEventListener(
    "click",
    sendNovaMessage
);

novaInput?.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            sendNovaMessage();
        }

    }
);


/* ================= WINDOW DRAG ================= */

document
    .querySelectorAll(".os-window")
    .forEach(win => {

        const header =
            win.querySelector(
                ".os-window-header"
            );

        if (!header) {
            return;
        }

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

                if (!dragging) {
                    return;
                }

                if (
                    window.innerWidth < 700
                ) {
                    return;
                }

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


/* ================= EASTER EGG ================= */

console.log(
    "%c ATHAADA SYSTEM ",
    "background:#fff;color:#000;padding:8px;font-weight:bold;"
);

console.log(
    "Welcome to ATHAADA OS."
);
/* =========================================
   ATHAADA OS — SYSTEM BOOT
========================================= */

function updateBootClock() {
    const clock = document.getElementById("bootClock");

    if (!clock) return;

    const now = new Date();

    const time = now.toLocaleTimeString("id-ID", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    clock.textContent = time + " WIB";
}

updateBootClock();
setInterval(updateBootClock, 1000);


/* BOOT STATUS */

setTimeout(() => {
    const status = document.querySelector(".boot-bottom span:first-child");

    if (status) {
        status.textContent = "STATUS: ONLINE";
    }
}, 2300);
/* =========================
   ATHAADA MUSIC SYSTEM
========================= */

const playlistButton = document.getElementById("playlistButton");
const musicPlayer = document.getElementById("musicPlayer");
const musicClose = document.getElementById("musicClose");

const audioPlayer = document.getElementById("audioPlayer");

const musicPlay = document.getElementById("musicPlay");
const musicPrev = document.getElementById("musicPrev");
const musicNext = document.getElementById("musicNext");

const musicTitle = document.getElementById("musicTitle");
const musicArtist = document.getElementById("musicArtist");

const musicProgress = document.getElementById("musicProgress");
const musicCurrent = document.getElementById("musicCurrent");
const musicDuration = document.getElementById("musicDuration");

const playlistList = document.getElementById("playlistList");

/* =========================
   DAFTAR LAGU
=========================

   Taruh file MP3 di:

   images/music/

   Contoh:

   images/music/song1.mp3
   images/music/song2.mp3
   images/music/song3.mp3
*/

const playlist = [
    {
        title: "Shape of My Heart",
        artist: "Athaada Playlist",
        src: "images/music/music.mp3"
    }
];

let currentSong = 0;


/* =========================
   OPEN / CLOSE
========================= */

playlistButton?.addEventListener("click", () => {
    musicPlayer.classList.toggle("active");
});

musicClose?.addEventListener("click", () => {
    musicPlayer.classList.remove("active");
});


/* =========================
   RENDER PLAYLIST
========================= */

function renderPlaylist() {

    if (!playlistList) return;

    playlistList.innerHTML = "";

    playlist.forEach((song, index) => {

        const item = document.createElement("button");

        item.className = "playlist-item";

        if (index === currentSong) {
            item.classList.add("active");
        }

        item.innerHTML = `
            <span class="playlist-number">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <span class="playlist-name">
                ${song.title}
            </span>
        `;

        item.addEventListener("click", () => {
            loadSong(index);
            playSong();
        });

        playlistList.appendChild(item);
    });
}


/* =========================
   LOAD SONG
========================= */

function loadSong(index) {

    if (!playlist[index]) return;

    currentSong = index;

    const song = playlist[currentSong];

    audioPlayer.src = song.src;

    musicTitle.textContent = song.title;
    musicArtist.textContent = song.artist;

    renderPlaylist();
}


/* =========================
   PLAY
========================= */

function playSong() {

    audioPlayer.play()
        .then(() => {
            musicPlay.textContent = "Ⅱ";
        })
        .catch(() => {
            console.log("Musik belum bisa diputar.");
        });
}


/* =========================
   PAUSE
========================= */

function pauseSong() {

    audioPlayer.pause();

    musicPlay.textContent = "▶";
}


/* =========================
   PLAY / PAUSE
========================= */

musicPlay?.addEventListener("click", () => {

    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }

});


/* =========================
   NEXT
========================= */

musicNext?.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= playlist.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});


/* =========================
   PREVIOUS
========================= */

musicPrev?.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = playlist.length - 1;
    }

    loadSong(currentSong);
    playSong();

});


/* =========================
   AUTO NEXT
========================= */

audioPlayer?.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= playlist.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});


/* =========================
   TIME
========================= */

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${String(secs).padStart(2, "0")}`;
}


audioPlayer?.addEventListener("loadedmetadata", () => {

    musicDuration.textContent =
        formatTime(audioPlayer.duration);

});


audioPlayer?.addEventListener("timeupdate", () => {

    if (!audioPlayer.duration) return;

    musicProgress.value =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;

    musicCurrent.textContent =
        formatTime(audioPlayer.currentTime);

});


/* =========================
   SEEK
========================= */

musicProgress?.addEventListener("input", () => {

    if (!audioPlayer.duration) return;

    audioPlayer.currentTime =
        (musicProgress.value / 100) *
        audioPlayer.duration;

});


/* =========================
   INIT
========================= */

if (playlist.length > 0) {
    loadSong(0);
}
function togglePlaylist() {
    const player = document.getElementById("musicPlayer");

    if (!player) {
        console.log("Music player tidak ditemukan");
        return;
    }

    player.classList.toggle("active");
}
// =========================
// FIX PLAYLIST BUTTON
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const playlistButton = document.getElementById("playlistButton");
    const musicPlayer = document.getElementById("musicPlayer");
    const musicClose = document.getElementById("musicClose");

    if (playlistButton && musicPlayer) {
        playlistButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            musicPlayer.classList.toggle("active");
        });
    }

    if (musicClose && musicPlayer) {
        musicClose.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            musicPlayer.classList.remove("active");
        });
    }
});