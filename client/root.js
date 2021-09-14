import React from 'react';
import bubbleSort from './bubbleSort';
import insertionSort from './insertionSort';
import selectionSort from './selectionSort';
import quickSort from './quickSort';

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
  }

  componentDidMount() {
    this.genArray();
  }
  genArray() {
    const array = [];
    for (let i = 0; i < 170; i++) {
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
            type="button"
            className="button left"
            style={{ backgroundColor: `#d74e28`, color: 'white' }}
            onClick={() => this.refresh()}
          >
            Refresh
          </button>
          <button
            type="button"
            className="button left"
            style={{ backgroundColor: `#eaf371`, color: 'black' }}
            onClick={() => this.genArray()}
          >
            Generate New Array
          </button>
          <button
            type="button"
            className="button right"
            onClick={() => this.bubbleSort(bars)}
          >
            Bubble Sort
          </button>
          <button
            type="button"
            className="button right"
            onClick={() => this.insertionSort(bars)}
          >
            Insertion Sort
          </button>
          <button
            type="button"
            className="button right"
            onClick={() => this.selectionSort(bars)}
          >
            Selection Sort
          </button>
          <button
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
