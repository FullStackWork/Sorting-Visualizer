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
    this.slider = this.slider.bind(this);
  }

  componentDidMount() {
    this.genArray();
  }
  genArray(value = document.getElementById('bars').value) {
    this.resetBarClasses();
    this.activateButtons();

    const array = [];
    for (let i = 0; i < value; i++) {
      array.push(genRandomNum(5, 500));
    }
    this.setState({ array });
  }

  refresh() {
    window.location.reload();
  }

  activateButtons() {
    const buttons = Array.from(document.getElementsByClassName('button'));
    buttons.forEach((button) => {
      button.disabled = false;
      button.classList.remove('inactive-button');
    });
  }
  resetBarClasses() {
    const arrayBars = Array.from(
      document.getElementsByClassName('active-green')
    );
    if (arrayBars.length) {
      arrayBars.forEach((bar) => (bar.className = 'inactive'));
    }
  }

  slider(event) {
    this.genArray(event.target.value);
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
          <div className="slidecontainer">
            <label htmlFor="vol"></label>
            <input
              disabled={false}
              type="range"
              id="bars"
              name="bars"
              min="50"
              max="600"
              step="20"
              onChange={this.slider}
            />
          </div>
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
