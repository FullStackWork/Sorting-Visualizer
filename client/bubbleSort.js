import {
  updateSingleBarColor,
  updateComparedBars,
  sfx,
  start,
  end,
} from './helperFunctions';

const bubbleSort = async function (array, speed) {
  const arrayBars = start();
  let stopPos = array.length - 1;

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < stopPos; j++) {
      await updateSingleBarColor(arrayBars, j, 'active-blue', speed);
      if (array[j] > array[j + 1]) {
        await updateComparedBars(arrayBars, j, j + 1, 'active-red', speed);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      } else {
        await updateComparedBars(arrayBars, j, j + 1, 'active-green', speed);
      }
      updateSingleBarColor(arrayBars, j, 'inactive', speed);
      this.setState({ array });
    }
    updateSingleBarColor(arrayBars, stopPos, 'active-purple', speed);
    sfx.sorted.play();
    stopPos -= 1;
  }

  end(array, arrayBars);
};

export default bubbleSort;
