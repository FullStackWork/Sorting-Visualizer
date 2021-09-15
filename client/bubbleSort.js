import {
  updateSingleBarColor,
  updateComparedBars,
  sfx,
  start,
  end,
} from './helperFunctions';

const bubbleSort = async function (array) {
  const arrayBars = start();
  let stopPos = array.length - 1;

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < stopPos; j++) {
      await updateSingleBarColor(arrayBars, j, 'active-blue');
      if (array[j] > array[j + 1]) {
        await updateComparedBars(arrayBars, j, j + 1, 'active-red');
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      } else {
        await updateComparedBars(arrayBars, j, j + 1, 'active-green');
      }
      updateSingleBarColor(arrayBars, j, 'inactive');
      this.setState({ array });
    }
    updateSingleBarColor(arrayBars, stopPos, 'active-purple');
    sfx.sorted.play();
    stopPos -= 1;
  }

  end(array, arrayBars);
};

export default bubbleSort;
