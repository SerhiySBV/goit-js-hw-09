import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix, { Notify } from 'notiflix';

const daysEL = document.querySelector('[data-days]');
const hoursEL = document.querySelector('[data-hours]');
const minutesEL = document.querySelector('[data-minutes]');
const secondsEL = document.querySelector('[data-seconds]');
const startButtonEL = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');

startButtonEL.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  // Event onClose

  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) <= Date.parse(new Date())) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButtonEL.disabled = true;
      return;
    }

    startButtonEL.disabled = false;

    function onButtonClick() {
      dateTimePicker.disabled = true;
      startButtonEL.disabled = true;
      let timerId = null;
      timerId = setInterval(() => {
        let timerCount = convertMs(
          Date.parse(selectedDates[0]) - Date.parse(new Date())
        );

        daysEL.textContent = addLeadingZero(timerCount.days);
        hoursEL.textContent = addLeadingZero(timerCount.hours);
        minutesEL.textContent = addLeadingZero(timerCount.minutes);
        secondsEL.textContent = addLeadingZero(timerCount.seconds);

        if (Date.parse(selectedDates[0]) - Date.parse(new Date()) === 0) {
          clearInterval(timerId);
          Notify.success('Time is up!');
          dateTimePicker.disabled = false;
        }
      }, 1000);
    }
    startButtonEL.addEventListener('click', onButtonClick);
  },
};

// Formating uncounter

const inputEL = flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// CSS style

const timeValues = document.querySelectorAll('.value');
timeValues.forEach(timeValue => (timeValue.style.fontSize = '40px'));

const timeLabels = document.querySelectorAll('.label');
timeLabels.forEach(timeLabel => (timeLabel.style.fontSize = '15px'));

const timerEl = document.querySelector('.timer');
timerEl.style.cssText =
  'display: grid; grid-template-columns: 80px 80px 80px 80px; grid-gap: 10px; text-transform: uppercase;';
