function getZero (num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
};

let timeInterval;

const timeBlock = document.querySelector('.time__time');

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

  timeBlock.textContent = `${t.hours} : ${t.minutes} : ${t.seconds}`;
};

console.log(getTime())
