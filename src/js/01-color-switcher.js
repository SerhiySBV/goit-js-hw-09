const butonStartEl = document.querySelector(`button[data-start]`);
const butonStopEl = document.querySelector(`button[data-stop]`);

let timerId = null;
butonStopEl.disabled = true;

butonStartEl.addEventListener('click', onStartClick);
butonStopEl.addEventListener('click', onStopClick);

function onStartClick() {
  document.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  butonStartEl.disabled = true;
  butonStopEl.disabled = false;
}

function onStopClick() {
  clearInterval(timerId);
  butonStartEl.disabled = false;
  butonStopEl.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
