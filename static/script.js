let timer;
let time;
let selectedTimer;

function updateTimerDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startPauseTimer() {
    playClick();
    if (!timer) {
        timer = setInterval(() => {
            if (time > 0) {
                time--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                timer = null;
                document.getElementById('startPauseBtn').innerText = 'Start';
                playAlarm();
                redirectToNextTimer();
            }
        }, 1000);
        document.getElementById('startPauseBtn').innerText = 'Pause';
    } else {
        clearInterval(timer);
        timer = null;
        document.getElementById('startPauseBtn').innerText = 'Resume';
    }
}

function playAlarm() {
    const audio = document.getElementById('beep');
    audio.play();
}

function playClick() {
    const audio = document.getElementById("play_pause");
    audio.play();
}

function redirectToNextTimer() {
    if (selectedTimer === 'pomodoro') {
        setTimeout(() => {
            selectTimer('shortBreak');
            startPauseTimer();
        }, 3000); // Redirect to short break after 3 seconds (adjust as needed)
    } else if (selectedTimer === 'shortBreak') {
        setTimeout(() => {
            selectTimer('pomodoro');
            startPauseTimer();
        }, 3000); // Redirect to pomodoro after 3 seconds (adjust as needed)
    } else if (selectedTimer === 'longBreak') {
        setTimeout(() => {
            selectTimer('pomodoro');
            startPauseTimer();
        }, 3000); // Redirect to pomodoro after 3 seconds (adjust as needed)
    }
}

function selectTimer(timerType) {
    clearInterval(timer);
    timer = null;
    selectedTimer = timerType;
    setTimerDuration();
    updateTimerDisplay();
    document.getElementById('startPauseBtn').innerText = 'Start';
}

function setCustomTime() {
    const customTime = prompt('Enter custom time in minutes:');
    if (customTime !== null && !isNaN(customTime) && customTime > 0) {
        time = customTime * 60;
        updateTimerDisplay();
    }
}

function setTimerDuration() {
    switch (selectedTimer) {
        case 'pomodoro':
            time = 25 * 60;
            break;
        case 'shortBreak':
            time = 7 * 60;
            break;
        case 'longBreak':
            time = 15 * 60;
            break;
        default:
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    selectTimer('pomodoro'); // Default to Pomodoro timer on page load
});
