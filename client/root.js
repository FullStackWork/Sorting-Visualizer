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
    for (let i = 0; i < 300; i++) {
      array.push(genRandomNum(5, 500));
    }
    this.setState({ array });
  }

  async bubbleSort(array) {
    const arrayBars = Array.from(document.getElementsByClassName('bar'));
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        arrayBars[j].className = 'active';
        await this.pause();

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          //   [arrayBars[j], arrayBars[j + 1]] = [arrayBars[j + 1], arrayBars[j]];
        }
        arrayBars[j].className = 'bar';
        this.setState({ array });
      }
    }
  }

  async pause() {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 20)
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
          Nav Area
        </nav>
        <div className="bars-container">
          {bars.map(function (barValue, idx) {
            return (
              <div
                key={idx}
                className="bar"
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
