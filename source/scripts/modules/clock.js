function getZero (num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
};

let timeInterval;

const timeBlock = document.querySelector('.time__clock');
const dateBlock = document.querySelector('.time__date');

const hourseBlock = document.querySelector('.time__hourse');
const minutesBlock = document.querySelector('.time__minutes');
const secondsBlock = document.querySelector('.time__seconds');

timeInterval = setInterval(updateClock, 1000);
updateClock();

export default function getTime() {
  const t = new Date();

  const year = t.getFullYear();
  const mounth = t.getMonth() + 1;
  const days = t.getDate();
  const hours = t.getHours();
  const minutes = t.getMinutes();
  const seconds = t.getSeconds();

  return {
    'year': year,
    'mounth': getZero(mounth),
    'days': getZero(days),
    'hours': getZero(hours),
    'minutes': getZero(minutes),
    'seconds': getZero(seconds)
  }
};

function updateClock() {
  const t = getTime();

  hourseBlock.textContent = `${t.hours}`;
  minutesBlock.textContent = `${t.minutes}`;
  secondsBlock.textContent = `${t.seconds}`;

  dateBlock.textContent = `${t.year}-${t.mounth}-${t.days}`;
};

console.log(getTime())
