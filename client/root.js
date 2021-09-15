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
      currentSpeed: 1000,
    };
    this.bubbleSort = bubbleSort.bind(this);
    this.insertionSort = insertionSort.bind(this);
    this.selectionSort = selectionSort.bind(this);
    this.quickSort = quickSort.bind(this);
    this.quickSortHelper = quickSortHelper.bind(this);
    this.barSlider = this.barSlider.bind(this);
    this.speed = this.speed.bind(this);
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

  barSlider(event) {
    this.genArray(event.target.value);
  }

  speed(event) {
    const speed = event.target.value === 2000 ? 0 : 2000 - event.target.value;
    this.setState({ currentSpeed: speed });
  }

  render() {
    const bars = this.state.array;
    const speed = this.state.currentSpeed;
    const color = this.state.color;
    console.log(color);
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
            onClick={() => this.bubbleSort(bars, speed)}
          >
            Bubble Sort
          </button>
          <button
            disabled={false}
            type="button"
            className="button right"
            onClick={() => this.insertionSort(bars, speed)}
          >
            Insertion Sort
          </button>
          <button
            disabled={false}
            type="button"
            className="button right"
            onClick={() => this.selectionSort(bars, speed)}
          >
            Selection Sort
          </button>
          <button
            disabled={false}
            type="button"
            className="button right"
            onClick={() => this.quickSort(bars, speed)}
          >
            Quick Sort
          </button>
        </nav>
        <nav className="bottom-nav">
          <div className="slidecontainer">
            <label htmlFor="vol">Bars</label>
            <input
              disabled={false}
              type="range"
              id="bars"
              name="bars"
              min="20"
              max="600"
              step="20"
              onChange={this.barSlider}
            />
            <label htmlFor="speed">Speed</label>
            <input
              disabled={false}
              type="range"
              id="speed"
              name="speed"
              defaultValue="0"
              min="0"
              max="2000"
              step="50"
              onChange={this.speed}
            />
          </div>
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
