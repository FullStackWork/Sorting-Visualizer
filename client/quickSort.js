import {
  updateSingleBarColor,
  updateComparedBars,
  sfx,
} from './updateBarColorFunctions';

const quickSort = async function (array) {
  const arrayBars = Array.from(document.getElementsByClassName('inactive'));
  await this.quickSortHelper(array, arrayBars, 0, array.length - 1);
  sfx.done.play();
};

export const quickSortHelper = async function (array, arrayBars, start, stop) {
  if (start >= stop) {
    if (start < array.length) {
      updateSingleBarColor(arrayBars, start, 'active-green');
    }
    return array;
  }

  let pivot = start;
  updateSingleBarColor(arrayBars, pivot, 'active-blue');
  let left = start + 1;
  let right = stop;

  while (left <= right) {
    updateComparedBars(arrayBars, left, right, 'active-red');
    if (array[left] > array[pivot] && array[right] < array[pivot]) {
      await updateComparedBars(arrayBars, left, right, 'active-green');
      [array[left], array[right]] = [array[right], array[left]];
      sfx.found.play();
    } else {
      if (array[left] <= array[pivot]) {
        updateSingleBarColor(arrayBars, left, 'inactive');
        left++;
        if (left <= array.length - 1) {
          await updateSingleBarColor(arrayBars, left, 'active-red');
        }
      }
      if (array[right] >= array[pivot]) {
        updateSingleBarColor(arrayBars, right, 'inactive');
        right--;
        if (right >= 0) {
          await updateSingleBarColor(arrayBars, right, 'active-red');
        }
      }
    }

    this.setState({ array });
  }

  [array[pivot], array[right]] = [array[right], array[pivot]];
  this.setState({ array });
  sfx.split.play();
  updateSingleBarColor(arrayBars, right, 'active-green');

  if (left <= array.length - 1) {
    updateSingleBarColor(arrayBars, left, 'inactive');
  }

  updateSingleBarColor(arrayBars, pivot, 'inactive');

  await this.quickSortHelper(array, arrayBars, start, right - 1);
  await this.quickSortHelper(array, arrayBars, right + 1, stop);

  for (let i = start; i <= stop + 1; i++) {
    if (i < array.length - 1) {
      updateSingleBarColor(arrayBars, i, 'active-green');
    }
  }
};

export default quickSort;
