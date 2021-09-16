import {
  updateSingleBarColor,
  updateComparedBars,
  sfx,
  start,
  end,
} from './helperFunctions';

const quickSort = async function (array, speed) {
  const arrayBars = start();
  await this.quickSortHelper(array, arrayBars, 0, array.length - 1, speed);
  end(array, arrayBars);
};

export const quickSortHelper = async function (
  array,
  arrayBars,
  start,
  stop,
  speed
) {
  if (start >= stop) {
    if (start < array.length) {
      updateSingleBarColor(arrayBars, start, 'active-purple', speed);
    }
    return array;
  }

  let pivot = start;
  updateSingleBarColor(arrayBars, pivot, 'active-blue', speed);
  let left = start + 1;
  let right = stop;

  while (left <= right) {
    await updateComparedBars(arrayBars, left, right, 'active-red', speed);
    if (array[left] > array[pivot] && array[right] < array[pivot]) {
      await updateComparedBars(arrayBars, left, right, 'active-green', speed);
      [array[left], array[right]] = [array[right], array[left]];
      sfx.found.play();
    } else {
      if (array[left] <= array[pivot]) {
        updateSingleBarColor(arrayBars, left, 'inactive', speed);
        left++;
        if (left <= array.length - 1) {
          await updateSingleBarColor(arrayBars, left, 'active-red', speed);
        }
      }
      if (array[right] >= array[pivot]) {
        updateSingleBarColor(arrayBars, right, 'inactive', speed);
        right--;
        if (right >= 0) {
          await updateSingleBarColor(arrayBars, right, 'active-red', speed);
        }
      }
    }

    this.setState({ array });
  }
  await updateComparedBars(arrayBars, pivot, right, 'active-green', speed);
  [array[pivot], array[right]] = [array[right], array[pivot]];
  this.setState({ array });
  sfx.split.play();
  updateSingleBarColor(arrayBars, right, 'active-purple', speed);

  if (left <= array.length - 1) {
    updateSingleBarColor(arrayBars, left, 'inactive', speed);
  }

  updateSingleBarColor(arrayBars, pivot, 'inactive', speed);

  await this.quickSortHelper(array, arrayBars, start, right - 1, speed);
  await this.quickSortHelper(array, arrayBars, right + 1, stop, speed);

  for (let i = start; i <= stop + 1; i++) {
    if (i < array.length - 1) {
      updateSingleBarColor(arrayBars, i, 'active-purple', speed);
    }
  }
};

export default quickSort;
