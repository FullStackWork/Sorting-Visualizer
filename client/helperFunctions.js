import { Howl } from 'howler';

export const start = function () {
  updateButtons(true);
  sfx.background.play();
  sfx.background.fade(0, 0.1, 3000);
  const arrayBars = Array.from(document.getElementsByClassName('inactive'));
  return arrayBars;
};

export const end = async function (array, arrayBars) {
  let timerValue;
  if (arrayBars.length > 250) {
    timerValue = 0;
  } else if (arrayBars.length > 150) {
    timerValue = 20;
  } else if (arrayBars.length > 70) {
    timerValue = 30;
  } else {
    timerValue = 50;
  }
  updateButtons(false);
  for (let i = 0; i < array.length; i++) {
    await allDone(arrayBars, i, 'active-red', timerValue);
    await allDone(arrayBars, i, 'active-blue', timerValue);
    await allDone(arrayBars, i, 'active-green', timerValue);
  }
  await stopMusic();
};

const stopMusic = async function () {
  sfx.background.fade(0.1, 0, 1000);
  setTimeout(() => {
    sfx.background.stop();
  }, 1000);
};

const allDone = async function (arrayBars, position, color, timerValue) {
  arrayBars[position].className = color;
  await allDoneTimer(timerValue);
};
export const updateSingleBarColor = async function (
  arrayBars,
  position,
  color,
  speed
) {
  arrayBars[position].className = color;
  await pause(speed);
};

export const updateComparedBars = async function (
  arrayBars,
  positionOne,
  positionTwo,
  color,
  speed
) {
  arrayBars[positionOne].className = color;
  arrayBars[positionTwo].className = color;
  await pause(speed);
};

//The key to the 'animations', a delay
export const pause = async function (speed) {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, speed)
  );
};
export const allDoneTimer = async function (timerValue) {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, timerValue)
  );
};
export const updateButtons = function (boolean) {
  const slider = document.getElementById('bars');
  const speed = document.getElementById('speed');
  slider.disabled = boolean;
  speed.disabled = boolean;
  const buttons = Array.from(document.getElementsByClassName('button'));
  if (boolean === true) {
    buttons.forEach((button) => {
      if (button.outerText !== 'Refresh') {
        button.disabled = boolean;
        button.classList.add('inactive-button');
      }
    });
  } else {
    buttons.forEach((button) => {
      if (button.outerText === 'Generate New Array') {
        button.disabled = boolean;
        button.classList.remove('inactive-button');
      }
    });
  }
};

export const sfx = {
  background: new Howl({
    src: ['loop.wav'],
    volume: 0.1,
    loop: true,
  }),
  sorted: new Howl({
    src: ['coin.wav'],
    volume: 0.8,
  }),
  found: new Howl({
    src: ['kick.wav'],
    volume: 0.1,
  }),
  done: new Howl({
    src: ['save-menu.wav'],
  }),
  split: new Howl({
    src: ['swimming.wav'],
    volume: 0.3,
  }),
};
