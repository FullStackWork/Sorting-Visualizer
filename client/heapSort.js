import {
  updateSingleBarColor,
  updateComparedBars,
  sfx,
  start,
  end,
} from './helperFunctions';

const heapSort = async function (array, speed) {
  const arrayBars = start();
  await this.constructHeap(array, arrayBars, speed);

  for (let i = array.length - 1; i >= 0; i--) {
    await this.swap(0, i, array, arrayBars, speed);
    this.setState({ array });
    await updateSingleBarColor(arrayBars, i, 'active-purple', speed);
    await this.siftDown(0, i - 1, array, arrayBars, speed);
  }
  updateSingleBarColor(arrayBars, 0, 'active-purple', speed);
  this.setState({ array });
  end();
};

export async function constructHeap(array, arrayBars, speed) {
  const firstParentIndex = Math.floor((array.length - 2) / 2);
  for (let i = firstParentIndex; i >= 0; i--) {
    await updateSingleBarColor(arrayBars, i, 'active-blue', speed);
    await this.siftDown(i, array.length - 1, array, arrayBars, speed);
    await updateSingleBarColor(arrayBars, i, 'inactive', speed);
  }
}

export async function siftDown(
  position,
  lastIndexOfHeap,
  array,
  arrayBars,
  speed
) {
  let leftChild = position * 2 + 1;
  while (leftChild <= lastIndexOfHeap) {
    await updateSingleBarColor(arrayBars, leftChild, 'active-red', speed);
    const rightChild =
      position * 2 + 2 <= lastIndexOfHeap ? position * 2 + 2 : -1;
    if (rightChild !== -1)
      await updateSingleBarColor(arrayBars, rightChild, 'active-red', speed);

    let indexToSwap;
    if (rightChild !== -1 && array[rightChild] > array[leftChild]) {
      indexToSwap = rightChild;
    } else {
      indexToSwap = leftChild;
    }
    updateSingleBarColor(arrayBars, leftChild, 'inactive', speed);
    if (rightChild !== -1)
      updateSingleBarColor(arrayBars, rightChild, 'inactive', speed);

    if (array[indexToSwap] > array[position]) {
      await updateComparedBars(
        arrayBars,
        indexToSwap,
        position,
        'active-green',
        speed
      );
      await swap(position, indexToSwap, array);
      this.setState({ array });
      await updateSingleBarColor(arrayBars, position, 'active-green', speed);
      updateSingleBarColor(arrayBars, position, 'inactive', speed);
      position = indexToSwap;
      leftChild = position * 2 + 1;
      updateSingleBarColor(arrayBars, indexToSwap, 'inactive', speed);
      await updateSingleBarColor(arrayBars, position, 'active-blue', speed);
    } else {
      updateComparedBars(arrayBars, position, indexToSwap, 'inactive', speed);
      return;
    }
  }
  updateSingleBarColor(arrayBars, position, 'inactive', speed);
}

export async function swap(positionOne, positionTwo, array) {
  [array[positionOne], array[positionTwo]] = [
    array[positionTwo],
    array[positionOne],
  ];

  sfx.found.play();
}

export default heapSort;
