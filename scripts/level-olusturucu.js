


function levelInit(levelNumber, kapiSayisi = 3) {



    if (kapiSayisi === 3) {
        game.insertAdjacentHTML('beforeend', `
            <section class="level hide" id="level-${levelNumber}">
                <img draggable="false" class="clickable kapi-3 kapi-3-1" id="level-${levelNumber}-kapi-1" src="images/kapi-kapali.png">
                <img draggable="false" class="clickable kapi-3 kapi-3-2" id="level-${levelNumber}-kapi-2" src="images/kapi-kapali.png">
                <img draggable="false" class="clickable kapi-3 kapi-3-3" id="level-${levelNumber}-kapi-3" src="images/kapi-kapali.png">
                <video class="theme-video" loop autoplay muted src="videos/game_theme.mp4"></video>

            </section>
        `);

    } else if (kapiSayisi === 5) {
        game.insertAdjacentHTML('beforeend', `
            <section class="level hide" id="level-${levelNumber}">
                <img draggable="false" class="clickable kapi-5 kapi-5-1" id="level-${levelNumber}-kapi-1" src="images/kapi-kapali.png">
                <img draggable="false" class="clickable kapi-5 kapi-5-2" id="level-${levelNumber}-kapi-2" src="images/kapi-kapali.png">
                <img draggable="false" class="clickable kapi-5 kapi-5-3" id="level-${levelNumber}-kapi-3" src="images/kapi-kapali.png">
                <img draggable="false" class="clickable kapi-5 kapi-5-4" id="level-${levelNumber}-kapi-4" src="images/kapi-kapali.png">
                <img draggable="false" class="clickable kapi-5 kapi-5-5" id="level-${levelNumber}-kapi-5" src="images/kapi-kapali.png">
                <video class="theme-video" loop autoplay muted src="videos/game_theme.mp4"></video>

            </section>
        `);
    }

    let kapiAcildi = false;
    let doors =
        kapiSayisi === 3 ? ["1", "2", "3"] : ["1", "2", "3", "4", "5"];

    doors = doors.sort(() => (Math.random() - 0.5))
        .sort(() => (Math.random() - 0.5))
        .sort(() => (Math.random() - 0.5))
        .sort(() => (Math.random() - 0.5));
        
    let kapisesiTimer = null;
    const odulSesiVersin = Math.random() > 0.5;

    document.querySelectorAll(`[id^='level-${levelNumber}-kapi']`).forEach((kapi) => {

        const kapiId = kapi.getAttribute("id");

        kapi.addEventListener("mouseenter", () => {
            if (!iksirKullaniliyor) {
                return false;
            }

            if (kapisesiTimer) {
                clearTimeout(kapisesiTimer);
            }

            console.log(odulSesiVersin, kapiId, `level-${levelNumber}-kapi-${doors[0]}`)

            kapisesiTimer = setTimeout(() => {

                if (odulSesiVersin && kapiId === `level-${levelNumber}-kapi-${doors[0]}`) {

                    fullDoorAudio.currentTime = 0;
                    fullDoorAudio.play();
                }
                else if (!odulSesiVersin && kapiId === `level-${levelNumber}-kapi-${doors[1]}`) {
                    deadDoorAudio.currentTime = 0;
                    deadDoorAudio.play();
                }
                else {
                    emptyDoorAudio.currentTime = 0;
                    emptyDoorAudio.play();
                }
            }, 2000);
        });

        kapi.addEventListener("mouseleave", () => {
            if (kapisesiTimer) {
                clearTimeout(kapisesiTimer);
            }
        });


        kapi.addEventListener("click", () => {
            if (kapiAcildi) return;

            kapiAcildi = true;
            if (!kapi.classList.contains("acik")) {
                kapi.classList.add("acik");
                openDoor.currentTime = 0;
                openDoor.play();


                if (kapiId === `level-${levelNumber}-kapi-${doors[0]}`) {
                    if (levelNumber % 3 === 0) {
                        kapi.classList.add("kapi-odul-can")
                        envanterUpdate("can", 1);
                    } else {
                        kapi.classList.add("kapi-odul-iksir")
                        envanterUpdate("hit", 1);
                    }


                    envanterUpdate("score", Math.floor((Math.random() * 20 + 90)));
                }

                if (kapiId === `level-${levelNumber}-kapi-${doors[1]}`) {
                    kapi.classList.add("kapi-ceza-kurukafa")
                    envanterUpdate("can", -1)
                    failChoose.play();
                    failChoose.currentTime = 0;
                }

                kapiAcilmaAnimasyonu(kapi, () => {
                    if (envanter.can === 0) {
                        gameOver(levelNumber);
                        return;//; alert("Can hakkın bitti geçilecek kapı kalmadı!")
                    }

                    if (levelNumber === 15) {

                        document.getElementById("win-game");
                        winGame(levelNumber);

                    }

                    envanterUpdate("kapi", 1);
                    levelDegistir(levelNumber, levelNumber + 1);
                });
            }
        });
    });


}


levelInit(2);
levelInit(3);
levelInit(4);
levelInit(5);
levelInit(6);
levelInit(7);
levelInit(8);
levelInit(9);
levelInit(10, 5);
levelInit(11, 5);
levelInit(12, 5);
levelInit(13, 5);
levelInit(14, 5);
levelInit(15, 5);