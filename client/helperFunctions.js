import { Howl } from 'howler';

export const start = function () {
  updateButtons(true);
  sfx.background.play();
  const arrayBars = Array.from(document.getElementsByClassName('inactive'));
  return arrayBars;
};

export const end = async function (array, arrayBars) {
  updateButtons(false);
  sfx.background.stop();
  sfx.done.play();
  for (let i = 0; i < array.length; i++) {
    await updateSingleBarColor(arrayBars, i, 'active-green');
  }
};

export const updateSingleBarColor = async function (
  arrayBars,
  position,
  color
) {
  arrayBars[position].className = color;
  await pause();
};

export const updateComparedBars = async function (
  arrayBars,
  positionOne,
  positionTwo,
  color
) {
  arrayBars[positionOne].className = color;
  arrayBars[positionTwo].className = color;
  await pause();
};

//The key to the 'animations', a delay
export const pause = async function () {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 0)
  );
};

export const updateButtons = function (boolean) {
  const slider = document.getElementById('bars');
  slider.disabled = boolean;
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
