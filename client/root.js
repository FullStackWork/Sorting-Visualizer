import React from 'react';
import bubbleSort from './bubbleSort';
import insertionSort from './insertionSort';
import selectionSort from './selectionSort';
import quickSort from './quickSort';
import { quickSortHelper } from './quickSort';

class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      array: [],
    };
    this.bubbleSort = bubbleSort.bind(this);
    this.insertionSort = insertionSort.bind(this);
    this.selectionSort = selectionSort.bind(this);
    this.quickSort = quickSort.bind(this);
    this.quickSortHelper = quickSortHelper.bind(this);
  }

  componentDidMount() {
    this.genArray();
  }
  genArray() {
    const arrayBars = Array.from(
      document.getElementsByClassName('active-green')
    );
    if (arrayBars.length) {
      arrayBars.forEach((bar) => (bar.className = 'inactive'));
    }

    const buttons = Array.from(document.getElementsByClassName('button'));
    buttons.forEach((button) => {
      button.disabled = false;
      button.classList.remove('inactive-button');
    });

    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(genRandomNum(5, 500));
    }
    this.setState({ array });
  }

  refresh() {
    window.location.reload();
  }

  render() {
    const bars = this.state.array;
    return (
      <React.Fragment>
        <nav>
          <button
            disabled={false}
            type="button"
            className="button left refresh"
            onClick={() => this.refresh()}
          >
            Refresh
          </button>
          <button
            disabled={false}
            type="button"
            className="button left gen-array"
            onClick={() => this.genArray()}
          >
            Generate New Array
          </button>
          <button
            disabled={false}
            type="button"
            className="button right"
            onClick={() => this.bubbleSort(bars)}
          >
            Bubble Sort
          </button>
          <button
            disabled={false}
            type="button"
            className="button right"
            onClick={() => this.insertionSort(bars)}
          >
            Insertion Sort
          </button>
          <button
            disabled={false}
            type="button"
            className="button right"
            onClick={() => this.selectionSort(bars)}
          >
            Selection Sort
          </button>
          <button
            disabled={false}
            type="button"
            className="button right"
            onClick={() => this.quickSort(bars)}
          >
            Quick Sort
          </button>
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
