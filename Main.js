const timerInput = document.getElementById('timerInput');
const setTimerButton = document.getElementById('setTimerButton');
const timerDisplay = document.getElementById('timerDisplay');
const startTimerButton = document.getElementById('startTimerButton');
const pauseTimerButton = document.getElementById('pauseTimerButton');
const resetTimerButton = document.getElementById('resetTimerButton');

let timerDuration;
let timerStartTime;
let timerElapsedTime = 0;
let timerInterval;

const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startStopwatchButton = document.getElementById('startStopwatchButton');
const pauseStopwatchButton = document.getElementById('pauseStopwatchButton');
const resetStopwatchButton = document.getElementById('resetStopwatchButton');

let stopwatchStartTime;
let stopwatchElapsedTime = 0;
let stopwatchInterval;

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function setTimerDuration() {
  const durationInMinutes = parseInt(timerInput.value, 10);
  if (isNaN(durationInMinutes) || durationInMinutes <= 0) {
    alert('Please enter a valid duration in minutes.');
    return;
  }
  timerDuration = durationInMinutes * 60 * 1000;
  timerInput.value = '';
  timerInput.disabled = true;
  setTimerButton.disabled = true;
  startTimerButton.disabled = false;
}

function startTimer() {
  timerStartTime = Date.now();
  const endTime = timerStartTime + timerDuration;
  updateTimer(endTime);
  timerInterval = setInterval(() => {
    updateTimer(endTime);
  }, 1000);
  startTimerButton.disabled = true;
}

function updateTimer(endTime) {
  const currentTime = Date.now();
  const remainingTime = endTime - currentTime;
  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    timerDisplay.textContent = '00:00:00';
    timerInput.disabled = false;
    setTimerButton.disabled = false;
    startTimerButton.disabled = true;
    return;
  }
  timerDisplay.textContent = formatTime(remainingTime);
}

function pauseTimer() {
  clearInterval(timerInterval);
  startTimerButton.disabled = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerDisplay.textContent = '00:00:00';
  timerInput.disabled = false;
  setTimerButton.disabled = false;
  startTimerButton.disabled = true;
}

function startStopwatch() {
  stopwatchStartTime = Date.now() - stopwatchElapsedTime;
  stopwatchInterval = setInterval(updateStopwatch, 10);
  startStopwatchButton.disabled = true;
}

function updateStopwatch() {
  const currentTime = Date.now();
  stopwatchElapsedTime = currentTime - stopwatchStartTime;
  stopwatchDisplay.textContent = formatTime(stopwatchElapsedTime);
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  startStopwatchButton.disabled = false;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchElapsedTime = 0;
  stopwatchDisplay.textContent = '00:00:00';
  startStopwatchButton.disabled = false;
}

setTimerButton.addEventListener('click', setTimerDuration);
startTimerButton.addEventListener('click', startTimer);
pauseTimerButton.addEventListener('click', pauseTimer);
resetTimerButton.addEventListener('click', resetTimer);

startStopwatchButton.addEventListener('click', startStopwatch);
pauseStopwatchButton.addEventListener('click', pauseStopwatch);
resetStopwatchButton.addEventListener('click', resetStopwatch);
