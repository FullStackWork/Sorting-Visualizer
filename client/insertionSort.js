import {
  updateSingleBarColor,
  updateComparedBars,
  sfx,
  start,
  end,
} from './helperFunctions';

const insertionSort = async function (array) {
  const arrayBars = start();
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

  end(array, arrayBars);
};

export default insertionSort;
