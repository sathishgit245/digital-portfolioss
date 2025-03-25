let startTime = 0, elapsedTime = 0, timerInterval;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    display.textContent = "00:00:00.00";
    laps.innerHTML = '';
}

function recordLap() {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.children.length + 1}: ${formatTime(elapsedTime)}`;
    laps.appendChild(lapItem);
}

document.getElementById('start').addEventListener('click', function () {
    if (this.textContent === 'Start') {
        startTimer();
        this.textContent = 'Stop';
        document.getElementById('lap').disabled = false;
        document.getElementById('reset').disabled = false;
    } else {
        stopTimer();
        this.textContent = 'Start';
    }
});

document.getElementById('lap').addEventListener('click', recordLap);

document.getElementById('reset').addEventListener('click', resetTimer);
