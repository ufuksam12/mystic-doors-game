
const envanter = {
    anahtar: 0,
    can: 0,
    kapi: 0,
    score: 0,
    hit: 0,
}


function envanterUpdate(name, value, kacx = "") {
    const oldValue = envanter[name];
    envanter[name] += value;

    const envanterDiv = document.getElementById(`envanter-${name}`);
    const envanterIcon = envanterDiv.querySelector(".envanter-icon-div");
    envanterDiv.querySelector(".envanter-value").innerHTML = envanter[name]

    if (oldValue < envanter[name] && envanter[name] > 0) {

        const envanterIconRect = envanterIcon.getBoundingClientRect();

        const centerPx = (document.body.clientWidth / 2) - envanterIconRect.left;

        envanterIcon.style = `--center-px: ${centerPx - 11}px;`

        envanterIcon.classList.add("show-center");
        if (kacx) {
            envanterIcon.setAttribute("data-x", kacx)
        } else {
            envanterIcon.removeAttribute("data-x")
        }
        setTimeout(() => {
            envanterIcon.classList.remove("show-center");
        }, 1300)
    }
    if (envanter[name]) {
        envanterDiv.classList.remove("hidden")
    } else {
        envanterDiv.classList.add("hidden")
    }
}

