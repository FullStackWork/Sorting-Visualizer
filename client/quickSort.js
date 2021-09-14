import Root from './root';
import {
  updateSingleBarColor,
  updateComparedBars,
  sfx,
} from './updateBarColorFunctions';

// const quickSort = function (array) {
//   const arrayBars = Array.from(document.getElementsByClassName('inactive'));
//   quickSortHelper(array, arrayBars, this.state, 0, array.length - 1);
//   this.setState({ array });
// };

// const arrayBars = Array.from(document.getElementsByClassName('inactive'));
const quickSort = async function (
  array,
  start = 0,
  stop = array.length - 1,
  arrayBars = Array.from(document.getElementsByClassName('inactive'))
) {
  if (start >= stop) return array;

  let left = start + 1;
  let right = stop;
  let pivot = start;
  updateSingleBarColor(arrayBars, pivot, 'active-blue');

  while (left <= right) {
    await updateComparedBars(arrayBars, left, right, 'active-red');
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
      if (left <= array.length - 1 && right >= 0) {
        updateComparedBars(arrayBars, left, right, 'inactive');
      }
    }

    this.setState({ array });
  }

  [array[pivot], array[right]] = [array[right], array[pivot]];
  this.setState({ array });
  sfx.split.play();
  updateSingleBarColor(arrayBars, right, 'active-green');
  updateSingleBarColor(arrayBars, pivot, 'inactive');
  // updateSingleBarColor(arrayBars, right, 'inactive');

  this.quickSort(array, start, right - 1, arrayBars);
  this.quickSort(array, right + 1, stop, arrayBars);
};

export default quickSort;
