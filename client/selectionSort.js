import {
  updateSingleBarColor,
  updateComparedBars,
  sfx,
  start,
  end,
} from './helperFunctions';

const selectionSort = async function (array, speed) {
  const arrayBars = start();

  for (let i = 0; i < array.length; i++) {
    let currentSmallest = i;

    for (let j = i + 1; j < array.length; j++) {
      updateSingleBarColor(arrayBars, currentSmallest, 'active-red', speed);
      updateSingleBarColor(arrayBars, i, 'active-blue', speed);
      await updateSingleBarColor(arrayBars, j, 'active-blue', speed);
      if (array[j] <= array[currentSmallest]) {
        updateSingleBarColor(arrayBars, j, 'active-red', speed);
        updateSingleBarColor(arrayBars, currentSmallest, 'inactive', speed);
        currentSmallest = j;
        sfx.found.play();
      } else {
        updateSingleBarColor(arrayBars, j, 'inactive', speed);
      }
    }

    [array[i], array[currentSmallest]] = [array[currentSmallest], array[i]];
    updateComparedBars(arrayBars, i, currentSmallest, 'inactive', speed);
    this.setState({ array });
    updateSingleBarColor(arrayBars, i, 'active-purple', speed);
    sfx.sorted.play();
  }
  end();
};

export default selectionSort;
