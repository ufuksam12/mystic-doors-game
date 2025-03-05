
function level1KapiClick() {

    const kapi = document.getElementById("level-1-kapi");

    if (!envanter.anahtar && !kapi.classList.contains("kilit-acik")) {
        uyariGoster("Anahtar olmadan giremezsin. Önce Anahtarı Bul")
        return;
    }

    if (!kapi.classList.contains("kilit-acik") && envanter.anahtar) {

        envanterUpdate("anahtar", -1);
        uyariGoster("Zindan kilidi açıldı! Şimdi kaleden çıkış yolunu bulmaya başla.")

        kapi.src = "images/kapi-kapali.png";

        kapi.classList.add("kilit-acik");

        openDoor.play();
        openDoor.currentTime = 0;
        return;
    }

    if (!kapi.classList.contains("acik")) {
        kapi.classList.add("acik");
        kapiAcilmaAnimasyonu(kapi, () => {
            //alert("Slogan! Sonraki levela geçtin.")
            envanterUpdate("hit", 1);
            uyariGoster("Tebrikler. İlk ödülü buldun!")
            setTimeout(() => {
                envanterUpdate("score", 100);
            }, 1500);
            setTimeout(() => {
                envanterUpdate("kapi", 1);
                levelDegistir(1, 2);                
            }, 3000)
        });
    }
}


function level1SandikClick() {

    const sandik = document.getElementById("level-1-sandik");

    if (sandik.classList.contains("kullanildi")) {

        uyariGoster("Anahtarı zaten buldun! Artık kapıyı açman gerek.");

        return;
    }

    envanterUpdate("anahtar", 1);


    uyariGoster("Tebrikler 1 anahtar buldun!");

    setTimeout(() => {
        envanterUpdate("can", 3, "3");

        uyariGoster("Seni tehlikeden kurtaracak 3 can buldun.")

        openBox.play();
        openBox.currentTime = 0;
    }, 3000)

    sandik.classList.add("kullanildi");

    openBox.play();
    openBox.currentTime = 0;

    setTimeout(() => {
        sandik.src = "images/sandik-acik.png";
    }, 100);
}


function levelInit() {

    game.insertAdjacentHTML('beforeend', `
<section class="level" id="level-1">
            <img draggable="false" class="clickable" id="level-1-kapi" src="images/kapi-kapali-kilitli 1.png">

            <img draggable="false" class="clickable" id="level-1-sandik" src="images/sandik.png">

            <video id="level-1-mesale-1" class="fire-effect" loop autoplay muted
                src="videos/fire.mp4"></video>
            <video id="level-1-mesale-2" class="fire-effect" loop autoplay muted
                src="videos/fire.mp4"></video>

            <video class="theme-video" loop autoplay muted src="videos/game_theme.mp4"></video>
        </section>        
        `);






    document.getElementById("level-1-kapi").addEventListener("click", level1KapiClick);
    document.getElementById("level-1-sandik").addEventListener("click", level1SandikClick);

}



levelInit();