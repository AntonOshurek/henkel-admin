import { getZero } from '../utils/utils';
import { dateBlock, hourseBlock, minutesBlock, secondsBlock } from '../utils/node-elements';

export default function initClock() {
  const timeInterval = setInterval(updateClock, 1000);
  updateClock(); // for first launch
};

function getTime() {
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

  dateBlock.textContent = `${t.year}-${t.mounth}-${t.days}`;

  hourseBlock.textContent = `${t.hours}`;
  minutesBlock.textContent = `${t.minutes}`;
  secondsBlock.textContent = `${t.seconds}`;
};
