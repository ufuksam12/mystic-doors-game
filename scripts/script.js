
const cursor = document.getElementById("cursor");

const game = document.getElementById("game");
const gameDescription = document.getElementById("game-description");

const theme = new Audio("sounds/horror-suspended-250586.mp3");

const mouseHoverAudio = new Audio("sounds/transition-hover.mp3");

const mouseClickAudio = new Audio("sounds/mouse-click.mp3");

const openBox = new Audio("sounds/open-box.mp3");

const openDoor = new Audio("sounds/door-unlocked.mp3");

const nextLevelAudio = new Audio("sounds/magic-3-278824.mp3");

const failChoose = new Audio("sounds/fail-choose.mp3");

const emptyDoorAudio = new Audio("sounds/door-knock-2.mp3");

const fullDoorAudio = new Audio("sounds/door-knock-1.mp3");

const deadDoorAudio = new Audio("sounds/monster-growl.mp3");

const winGameAudio = new Audio("sounds/win-sound.mp3");

const loseGameAudio = new Audio("sounds/lose-sound.mp3");



let iksirKullaniliyor = false;

function iksirKullan() {
    if(iksirKullaniliyor) {
        uyariGoster("İksir elinde. Şimdi sessizce kapıların üzerine gel ve dinlemeye başla!")
        return false;
    }
    if (envanter.hit) {
        iksirKullaniliyor = true;
        envanterUpdate("hit", -1);
        uyariGoster("Şimdi sessizce kapıların üzerine gel ve dinlemeye başla!")
    } else {
        uyariGoster("Elinde hiç iksir kalmamış.")
    }
}


function levelDegistir(from, level) {
    const simdikiLevel = document.getElementById(`level-${from}`);
    const sonrakiLevel = document.getElementById(`level-${level}`);
    simdikiLevel.classList.add("hide");
    iksirKullaniliyor = false;

    setTimeout(() => {
        sonrakiLevel.classList.remove("hide");

        nextLevelAudio.play();
        nextLevelAudio.currentTime = 0;

        uyariGoster("Şimdi yeni bir bölüme girdin. Şansına güveniyorsan ödüllü kapıyı bulursun!");

    }, 2000)

}


function gameOver(from) {
    const simdikiLevel = document.getElementById(`level-${from}`);
    const sonrakiLevel = document.getElementById(`level-finish`);
    simdikiLevel.classList.add("hide");
    iksirKullaniliyor = false;

    setTimeout(() => {
        sonrakiLevel.classList.remove("hide");
        document.body.classList.add("waiting");
        document.body.classList.add("game-end");
        loseGameAudio.play();
        loseGameAudio.currentTime = 0;

        uyariGoster("Can hakkın bitti geçilecek kapı kalmadı!");

    }, 2000)

}

function winGame(from) {
    const simdikiLevel = document.getElementById(`level-${from}`);
    const sonrakiLevel = document.getElementById(`win-game`);
    simdikiLevel.classList.add("hide");
    document.body.classList.add("game-end");
    iksirKullaniliyor = false;

    setTimeout(() => {
        sonrakiLevel.classList.remove("hide");
        
        winGameAudio.play();
        winGameAudio.currentTime = 0;

        uyariGoster("Tebrikler ! Prensesi kurtardın.");

    }, 2000)

}


function gameStart() {
    document.body.classList.remove("waiting");
    envanter.anahtar = 0;
    envanter.can = 0;
    envanter.hit = 0;
    envanter.score = 0;
    envanter.kapi = 0;

    theme.play();
    theme.currentTime = 0;
    theme.volume = 0.1;
    theme.loop = true;
    uyariGoster("Sandıktaki ödülü bul ve kalenin içine bu gizli kapıdan gir.")
    document.getElementById("level-finish").classList.add("hide")
    levelDegistir("start", 1);
}


function kapiAcilmaAnimasyonu(kapiElement, callback) {
    kapiElement.classList.add("siyah-bg")
    setTimeout(() => {
        kapiElement.src = "images/kapi-acik-1.png";

    }, 100);

    setTimeout(() => {
        kapiElement.src = "images/kapi-acik-2.png";

    }, 300);

    setTimeout(() => {
        kapiElement.src = "images/kapi-acik-3.png";
    }, 500);


    setTimeout(() => {
        if (callback) {
            callback();
        }
    }, 1000)
}

function uyariGoster(mesaj) {
    gameDescription.classList.add("hide");
    setTimeout(() => {
        gameDescription.innerText = mesaj;
        gameDescription.classList.remove("hide");
    }, 500);
}






document.querySelectorAll(".clickable").forEach((button) => {

    button.addEventListener("mouseover", () => {
        mouseHoverAudio.play();
        mouseHoverAudio.currentTime = 0.5;
    });

    button.addEventListener("click", () => {

        mouseClickAudio.play();
        mouseClickAudio.currentTime = 0;
    })
})




document.addEventListener("mousemove", (ev) => {
    cursor.style.left = ev.pageX + "px";
    cursor.style.top = ev.pageY + "px";
})

document.addEventListener("mousedown", () => {
    cursor.src = "images/cursor-grab.png"
});

document.addEventListener("mouseup", () => {
    cursor.src = "images/cursor-normal.png"
})

game.addEventListener("mouseover", () => {

    cursor.style.opacity = 1;

})
game.addEventListener("mouseleave", () => {
    cursor.style.opacity = 0;
});


document.getElementById("level-start-button").addEventListener("click", gameStart);
document.getElementById("level-newgame-button").addEventListener("click", ()=>{
    location.reload();
});
document.getElementById("level-win-button").addEventListener("click", ()=>{
    location.reload();
});

document.getElementById("hit-kullan").addEventListener("click", iksirKullan);

