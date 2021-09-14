import { Howl, Howler } from 'howler';

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

export const pause = async function () {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 20)
  );
};

export const sfx = {
  sorted: new Howl({
    src: ['coin.wav'],
  }),
  found: new Howl({
    src: ['kick.wav'],
  }),
  done: new Howl({
    src: ['save-menu.wav'],
  }),
  split: new Howl({
    src: ['swimming.wav'],
  }),
};
