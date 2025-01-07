let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleModeButton = document.getElementById('toggle-mode');
const addTimeButton = document.getElementById('add-time');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

// Add these new variables at the top with the other DOM elements
const focusDisplay = document.getElementById('focus-display');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the page title
    document.title = `${timeString} - Pomodoro Timer`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleModeButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        
        // Only prompt for focus task during work sessions
        if (isWorkTime) {
            const focusTask = prompt('What are you focusing on this session?');
            if (focusTask) {
                focusDisplay.textContent = `Focus: ${focusTask}`;
                focusDisplay.style.display = 'block';
            }
        }

        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
        startButton.disabled = true;
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Work Time';
    focusDisplay.style.display = 'none'; // Hide focus display on reset
    updateDisplay();
    startButton.disabled = false;
}

function manualModeSwitch() {
    clearInterval(timerId);
    timerId = null;
    switchMode();
    startButton.disabled = false;
    toggleModeButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
}

function addFiveMinutes() {
    timeLeft += 5 * 60; // Add 5 minutes (300 seconds)
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleModeButton.addEventListener('click', manualModeSwitch);
addTimeButton.addEventListener('click', addFiveMinutes);

// Initialize the display
resetTimer(); 