import {
  updateSingleBarColor,
  updateComparedBars,
  sfx,
  start,
  end,
} from './helperFunctions';

const selectionSort = async function (array) {
  const arrayBars = start();

  for (let i = 0; i < array.length; i++) {
    let currentSmallest = i;

    for (let j = i + 1; j < array.length; j++) {
      updateSingleBarColor(arrayBars, currentSmallest, 'active-red');
      updateSingleBarColor(arrayBars, i, 'active-blue');
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
  end(array, arrayBars);
};

export default selectionSort;
