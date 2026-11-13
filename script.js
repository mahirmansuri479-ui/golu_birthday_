
// CONTINUOUS BACKGROUND MUSIC

const music = document.getElementById("bgMusic");

if (music) {

    music.volume = 0.5;

    // Restore previous music position
    const savedTime = sessionStorage.getItem("musicTime");
    const musicStarted = sessionStorage.getItem("musicStarted");

    if (savedTime) {
        music.addEventListener("loadedmetadata", () => {
            music.currentTime = Number(savedTime);
        }, { once: true });
    }

    // Continue music on the next page
    if (musicStarted === "yes") {
        music.play().catch(() => {
            console.log("Browser requires another click to resume music.");
        });
    }

    // Start music on first visitor click
    document.addEventListener("click", function startMusic() {

        if (sessionStorage.getItem("musicStarted") !== "yes") {
            sessionStorage.setItem("musicStarted", "yes");
            music.play().catch(console.log);
        }

    }, { once: true });

    // Save music position before changing pages
    window.addEventListener("pagehide", () => {
        sessionStorage.setItem("musicTime", music.currentTime);
    });

}



// Birthday Gift Surprise

const giftBtn = document.getElementById("giftBtn");

const giftMessage = document.getElementById("giftMessage");

if (giftBtn && giftMessage) {

    giftBtn.addEventListener("click", function() {

        giftMessage.classList.add("show");

        giftBtn.innerHTML = "💝";

        giftBtn.disabled = true;

        createHearts();

    });

}


// Floating Hearts

function createHearts() {

    for (let i = 0; i < 30; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "❤️";

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-30px";
        heart.style.fontSize = "20px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "1000";

        document.body.appendChild(heart);

        heart.animate(
            [
                {
                    transform: "translateY(0)",
                    opacity: 1
                },
                {
                    transform: "translateY(-100vh)",
                    opacity: 0
                }
            ],
            {
                duration: 3000 + Math.random() * 2000
            }
        );

        setTimeout(() => {
            heart.remove();
        }, 5000);

    }

}