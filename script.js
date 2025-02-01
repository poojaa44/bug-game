
const mos = document.querySelector('#mos');
const start = document.querySelector('.start');
const reset = document.querySelector('.reset');
const counts = document.querySelector(".countDown");
const timeline = document.querySelector(".countDown h2");
const totalKill = document.querySelector(".total-kill");
mos.style.display = "none";
let kills = new Audio('kill.wav')
let gameover = new Audio('gameover.mp3')
let music = new Audio('music.mp3')
let countdown = 0;
let totalTime = 30;
let time;
let timer;
const blast = document.querySelector("#blast");
let iX;
let jX;
isgameStart = false;
const element = document.querySelector('#bg');

console.log("Width: " + element.clientWidth + "px");
console.log("Height: " + element.clientHeight + "px");

function startGame() {
    isgameStart = true;
    music.play()
    time = setInterval(() => {
        blast.style.display = "none"
        mos.style.display = "block"
        iX = Math.floor(Math.random() * (element.clientWidth - 70 )  );
        jX = Math.floor(Math.random() * (element.clientHeight - 70 )  );
        console.log(`ix ${iX} jx ${jX}`)
        mos.style.left = iX + 'px';
        mos.style.top = jX + 'px';
    }, 1000)

    timer = setInterval(countdown, 1000);

    function countdown() {
        if (totalTime == 0) {
            isgameStart = false;
            clearTimeout(time)
            clearTimeout(timer);
            kills.pause();
            timeline.classList.add("active")
            mos.style.display = "none";
            music.pause()
            timeline.innerText = "Game Over"
            start.disabled = true
            start.classList.add('start')
        } else {
            timeline.classList.add("active")
            timeline.innerText = "Time Remaining :" + totalTime + " Secs"
            totalTime--;
        }
    }
}

function kill() {
    if (isgameStart) {
        blast.style.display = "block"
        blast.style.left = iX + "px";
        blast.style.top = jX + "px";
        mos.style.display = "none"
        kills.play();
        countdown++
        totalKill.innerHTML = "Total Kill :" + countdown

    }
}

mos.addEventListener("click", kill)


reset.addEventListener("click", () => {
    // music.pause()
    music.currentTime = 0 
    music.pause()
    start.classList.remove('start')
    start.disabled = false
    kills.pause();
    clearTimeout(time);
    clearTimeout(timer);
    totalTime = 30;
    countdown = 0;
    timeline.classList.add("active")
    totalKill.innerHTML = "Total Kill :" + countdown
    mos.style.display = "none";

    timeline.innerText = "Timer : 30 Secs"
    mos.style.left = 0 + 'px';
    mos.style.top = 0 + 'px';
})
start.addEventListener("click", startGame)