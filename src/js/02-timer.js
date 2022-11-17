import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix, { Notify } from 'notiflix';

const daysEL = document.querySelector('[data-days]');
const hoursEL = document.querySelector('[data-hours]');
const minutesEL = document.querySelector('[data-minutes]');
const secondsEL = document.querySelector('[data-seconds]');
const startButtonEL = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
console.log(timerEl);
startButtonEL.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(Date.parse(selectedDates[0]));
    if (Date.parse(selectedDates[0]) <= Date.parse(new Date())) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButtonEL.disabled = true;
      return;
    }

    startButtonEL.disabled = false;

    function onButtonClick() {
      dateTimePicker.disabled = true;
      let timerId = null;
      timerId = setInterval(() => {
        let timerCount = convertMs(
          Date.parse(selectedDates[0]) - Date.parse(new Date())
        );

        daysEL.textContent = addLeadingZero(timerCount.days);
        hoursEL.textContent = addLeadingZero(timerCount.hours);
        minutesEL.textContent = addLeadingZero(timerCount.minutes);
        secondsEL.textContent = addLeadingZero(timerCount.seconds);
        console.log(addLeadingZero(secondsEL.textContent));

        if (Date.parse(selectedDates[0]) - Date.parse(new Date()) === 0) {
          clearInterval(timerId);
          Notify.success('Time is up!');
        }
      }, 1000);
    }
    startButtonEL.addEventListener('click', onButtonClick);
    console.log(selectedDates[0]);
  },
};

const inputEL = flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
// timerEl.style.dislay = flex;
// display: grid;
// grid-template-columns: 50px 50px 60px 60px;
// grid-gap: 15px;
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
