import React from 'react';

class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.genArray();
  }
  genArray() {
    const array = [];
    for (let i = 0; i < 200; i++) {
      array.push(genRandomNum(5, 500));
    }
    this.setState({ array });
  }

  async bubbleSort(array) {
    //the bars in the DOM
    const arrayBars = Array.from(document.getElementsByClassName('inactive'));
    let stopPos = array.length - 1;

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < stopPos; j++) {
        //bar will start as blue in every new iteration
        await this.updateSingleBarColor(arrayBars, j, 'active-blue');
        //bar value comparison
        if (array[j] > array[j + 1]) {
          //if bars are out of order, their colors change to red
          await this.updateComparedBars(arrayBars, j, j + 1, 'active-red');
          //the swap
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        } else {
          //if bars are not out of order, their colors change to green
          await this.updateComparedBars(arrayBars, j, j + 1, 'active-green');
        }
        //resetting bar color for the current position
        this.updateSingleBarColor(arrayBars, j, 'inactive');
        //setting state after every turn of the inner loop to 'animate' the swaps and colors
        this.setState({ array });
      }
      //after a full iteration of the inner loop the bar at 'stopPos' should be in final position, so make it green
      this.updateSingleBarColor(arrayBars, stopPos, 'active-green');
      stopPos -= 1;
    }
  }

  async insertionSort(array) {
    const arrayBars = Array.from(document.getElementsByClassName('inactive'));
    for (let i = 1; i < array.length; i++) {
      let j = i;
      await this.updateSingleBarColor(arrayBars, j - 1, 'active-green');
      while (array[j] < array[j - 1] && j > 0) {
        await this.updateSingleBarColor(arrayBars, j, 'active-red');
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
        this.updateComparedBars(arrayBars, j, j - 1, 'active-green');
        j--;
        this.setState({ array });
      }
    }
  }

  async selectionSort(array) {
    const arrayBars = Array.from(document.getElementsByClassName('inactive'));

    for (let i = 0; i < array.length; i++) {
      let currentSmallest = i + 1;
      await this.updateSingleBarColor(arrayBars, i, 'active-blue');

      for (let j = i + 1; j < array.length - 1; j++) {
        await this.updateSingleBarColor(arrayBars, j, 'active-blue');
        if (array[j] < array[currentSmallest]) {
          this.updateSingleBarColor(arrayBars, j, 'active-red');
          this.updateSingleBarColor(arrayBars, currentSmallest, 'inactive');
          currentSmallest = j;
        } else {
          this.updateSingleBarColor(arrayBars, j, 'inactive');
        }
      }

      [array[i], array[currentSmallest]] = [array[currentSmallest], array[i]];
      this.updateComparedBars(arrayBars, i, currentSmallest, 'inactive');
      this.setState({ array });
      this.updateSingleBarColor(arrayBars, i, 'active-green');
    }
  }

  async updateSingleBarColor(arrayBars, position, color) {
    arrayBars[position].className = color;
    await this.pause();
  }

  async updateComparedBars(arrayBars, positionOne, positionTwo, color) {
    arrayBars[positionOne].className = color;
    arrayBars[positionTwo].className = color;
    await this.pause();
  }

  async pause() {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1)
    );
  }

  render() {
    const bars = this.state.array;
    return (
      <React.Fragment>
        <nav>
          <button type="button" onClick={() => this.genArray()}>
            Generate New Array
          </button>
          <button type="button" onClick={() => this.bubbleSort(bars)}>
            Bubble Sort
          </button>
          <button type="button" onClick={() => this.insertionSort(bars)}>
            Insertion Sort
          </button>
          <button type="button" onClick={() => this.selectionSort(bars)}>
            Selection Sort
          </button>
          Nav Area
        </nav>
        <div className="bars-container">
          {bars.map(function (barValue, idx) {
            return (
              <div
                key={idx}
                className="inactive"
                style={{ height: `${barValue}px` }}
              ></div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

function genRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default Root;
