const butonStartEl = document.querySelector(`button[data-start]`);
const butonStopEl = document.querySelector(`button[data-stop]`);

let timer = null;

butonStartEl.addEventListener('click', onStartClick);
butonStopEl.addEventListener('click', onStopClick);

function onStartClick() {
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  butonStartEl.disabled = true;
  butonStopEl.disabled = false;
}

function onStopClick() {
  clearInterval(timer);
  butonStartEl.disabled = false;
  butonStopEl.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
