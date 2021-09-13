import {
  updateSingleBarColor,
  updateComparedBars,
  sfx,
} from './updateBarColorFunctions';

const quickSort = function (array) {
  const arrayBars = Array.from(document.getElementsByClassName('inactive'));
  quickSortHelper(array, arrayBars, this.state, 0, array.length - 1);
  this.setState({ array });
};

const quickSortHelper = async function (array, arrayBars, state, start, stop) {
  if (start >= stop) return array;

  let left = start + 1;
  let right = stop;
  let pivot = start;
  while (left <= right) {
    if (array[left] > array[pivot] && array[right] < array[pivot]) {
      [array[left], array[right]] = [array[right], array[left]];
    }
    if (array[left] <= array[pivot]) {
      left++;
    }
    if (array[right] >= array[pivot]) {
      right--;
    }
  }
  [array[pivot], array[right]] = [array[right], array[pivot]];
  quickSortHelper(array, arrayBars, state, start, right - 1);
  quickSortHelper(array, arrayBars, state, right + 1, stop);
};

export default quickSort;
