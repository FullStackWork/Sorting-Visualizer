import {
  updateSingleBarColor,
  updateComparedBars,
  updateButtons,
  sfx,
} from './updateBarColorFunctions';

const bubbleSort = async function (array) {
  updateButtons(true);
  //the bars in the DOM
  const arrayBars = Array.from(document.getElementsByClassName('inactive'));
  let stopPos = array.length - 1;

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < stopPos; j++) {
      //bar will start as blue in every new iteration
      await updateSingleBarColor(arrayBars, j, 'active-blue');
      //bar value comparison
      if (array[j] > array[j + 1]) {
        //if bars are out of order, their colors change to red
        await updateComparedBars(arrayBars, j, j + 1, 'active-red');
        //the swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      } else {
        //if bars are not out of order, their colors change to green
        await updateComparedBars(arrayBars, j, j + 1, 'active-green');
      }
      //resetting bar color for the current position
      updateSingleBarColor(arrayBars, j, 'inactive');
      //setting state after every turn of the inner loop to 'animate' the swaps and colors
      this.setState({ array });
    }
    //after a full iteration of the inner loop the bar at 'stopPos' should be in final position, so make it green
    updateSingleBarColor(arrayBars, stopPos, 'active-purple');
    sfx.sorted.play();
    stopPos -= 1;
  }
  sfx.done.play();
  for (let i = 0; i < array.length; i++) {
    await updateSingleBarColor(arrayBars, i, 'active-green');
  }
  updateButtons(false);
};

export default bubbleSort;
