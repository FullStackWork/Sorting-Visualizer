import {
  updateSingleBarColor,
  updateComparedBars,
  sfx,
} from './updateBarColorFunctions';

const selectionSort = async function (array) {
  const arrayBars = Array.from(document.getElementsByClassName('inactive'));

  for (let i = 0; i < array.length; i++) {
    let currentSmallest = i >= array.length - 1 ? i : i + 1;
    updateSingleBarColor(arrayBars, i, 'active-blue');

    for (let j = i + 1; j < array.length; j++) {
      updateSingleBarColor(arrayBars, currentSmallest, 'active-red');
      await updateSingleBarColor(arrayBars, j, 'active-blue');
      if (array[j] <= array[currentSmallest]) {
        updateSingleBarColor(arrayBars, j, 'active-red');
        updateSingleBarColor(arrayBars, currentSmallest, 'inactive');
        currentSmallest = j;
        sfx.found.play();
      } else {
        updateSingleBarColor(arrayBars, j, 'inactive');
      }
    }

    [array[i], array[currentSmallest]] = [array[currentSmallest], array[i]];
    updateComparedBars(arrayBars, i, currentSmallest, 'inactive');
    this.setState({ array });
    updateSingleBarColor(arrayBars, i, 'active-purple');
    sfx.sorted.play();
  }
  sfx.done.play();
  for (let i = 0; i < array.length; i++) {
    await updateSingleBarColor(arrayBars, i, 'active-green');
  }
};

export default selectionSort;