let timerInterval;
let running = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const timerDisplay = document.querySelector('.timer');
const lapList = document.querySelector('.lap-list');

document.querySelector('.start-stop-timer').addEventListener('click', () => {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        document.querySelector('.start-stop-timer').textContent = 'Start';
    } else {
        running = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        document.querySelector('.start-stop-timer').textContent = 'Stop';
    }
});

document.querySelector('.lap-timer').addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const lapDiv = document.createElement('div');
    lapDiv.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    lapList.appendChild(lapDiv);
});

document.querySelector('.restart-timer').addEventListener('click', () => {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    lapCounter = 1;
    timerDisplay.textContent = '00:00:00:00';
    document.querySelector('.start-stop-timer').textContent = 'Start';
    lapList.innerHTML = '';
});

document.querySelector('.download-laps').addEventListener('click', () => {
    const laps = lapList.innerHTML.replace(/<div>/g, '').replace(/<\/div>/g, '\n');
    const blob = new Blob([laps], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'laps.txt';
    link.click();
});

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    let milliseconds = Math.floor((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}
