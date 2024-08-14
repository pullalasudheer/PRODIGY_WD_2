
let startTime, updatedTime, difference, tInterval, running = false, lapCount = 1;
let time = { minutes: 0, seconds: 0, milliseconds: 0 };

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    time.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    time.seconds = Math.floor((difference % (1000 * 60)) / 1000);
    time.milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = 
        (time.minutes < 10 ? '0' : '') + time.minutes + ":" +
        (time.seconds < 10 ? '0' : '') + time.seconds + ":" +
        (time.milliseconds < 10 ? '0' : '') + time.milliseconds;
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    time = { minutes: 0, seconds: 0, milliseconds: 0 };
    display.innerHTML = "00:00:00";
    lapList.innerHTML = '';
    lapCount = 1;
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', recordLap);
