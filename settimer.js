let timerInterval;
let running = false;
let initialTime = 0;
let elapsedTime = 0;
let lapCounter = 1;

const timerDisplay = document.querySelector('.timer');
const lapList = document.querySelector('.lap-list');
const setResetButton = document.querySelector('.set-reset-timer');
const startStopButton = document.querySelector('.start-stop-timer');
const setTimerModal = document.querySelector('.set-timer-modal');

setResetButton.addEventListener('click', () => {
    if (setResetButton.textContent === 'Set') {
        setTimerModal.style.display = 'flex';
    } else {
        clearInterval(timerInterval);
        running = false;
        elapsedTime = 0;
        timerDisplay.textContent = '00:00:00:00';
        lapList.innerHTML = '';
        setResetButton.textContent = 'Set';
        startStopButton.textContent = 'Start';
    }
});

document.querySelector('.set-time-button').addEventListener('click', () => {
    const hours = parseInt(document.querySelector('.hours-input').value) || 0;
    const minutes = parseInt(document.querySelector('.minutes-input').value) || 0;
    const seconds = parseInt(document.querySelector('.seconds-input').value) || 0;
    const milliseconds = parseInt(document.querySelector('.milliseconds-input').value) || 0;
    initialTime = ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000 + milliseconds * 10;
    timerDisplay.textContent = formatTime(initialTime);
    setTimerModal.style.display = 'none';
    setResetButton.textContent = 'Reset';
});

startStopButton.addEventListener('click', () => {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startStopButton.textContent = 'Start';
    } else {
        running = true;
        const endTime = Date.now() + initialTime - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = endTime - Date.now();
            if (elapsedTime <= 0) {
                clearInterval(timerInterval);
                elapsedTime = 0;
                running = false;
                timerDisplay.textContent = '00:00:00:00';
                startStopButton.textContent = 'Start';
            } else {
                timerDisplay.textContent = formatTime(elapsedTime);
            }
        }, 10);
        startStopButton.textContent = 'Stop';
    }
});

document.querySelector('.lap-timer').addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const lapDiv = document.createElement('div');
    lapDiv.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    lapList.appendChild(lapDiv);
});

document.querySelector('.download-laps').addEventListener('click', () => {
    const laps = lapList.innerHTML.replace(/<div>/g, '').replace(/<\/div>/g, '\n');
    const blob = new Blob([laps], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'laps.txt';
    link.click();
});

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
