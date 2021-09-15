import {
  updateSingleBarColor,
  updateComparedBars,
  updateButtons,
  sfx,
} from './updateBarColorFunctions';

const insertionSort = async function (array) {
  updateButtons(true);
  const arrayBars = Array.from(document.getElementsByClassName('inactive'));
  for (let i = 1; i < array.length; i++) {
    let j = i;
    await updateSingleBarColor(arrayBars, j - 1, 'active-purple');
    while (array[j] < array[j - 1] && j > 0) {
      await updateSingleBarColor(arrayBars, j, 'active-red');
      [array[j], array[j - 1]] = [array[j - 1], array[j]];
      await updateComparedBars(arrayBars, j, j - 1, 'active-purple');
      j--;
      this.setState({ array });
    }
    sfx.sorted.play();
  }
  sfx.done.play();
  for (let i = 0; i < array.length; i++) {
    await updateSingleBarColor(arrayBars, i, 'active-green');
  }
  updateButtons(false);
};

export default insertionSort;
