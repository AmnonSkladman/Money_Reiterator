import React, { Component } from "react";

export default class FunctionalComponent extends Component {
  state = {
    L: 0,
    T: 0,
    five: 0,
    ten: 0,
    twenty: 0,
    fifty: 0,
    hundred: 0,
    total: 0,
    value: "Your values will show up here.",
    input: 0
  };

  componentDidMount() {
    const docStyle = document.documentElement.style;
    const aElem = document.querySelector("a");
    const boundingClientRect = aElem.getBoundingClientRect();

    aElem.onmousemove = e => {
      const x = e.clientX - boundingClientRect.left;
      const y = e.clientY - boundingClientRect.top;

      const xc = boundingClientRect.width / 2;
      const yc = boundingClientRect.height / 2;

      const dx = x - xc;
      const dy = y - yc;

      docStyle.setProperty("--rx", `${dy / -1}deg`);
      docStyle.setProperty("--ry", `${dx / 10}deg`);
    };

    aElem.onmouseleave = e => {
      docStyle.setProperty("--ty", "0");
      docStyle.setProperty("--rx", "0");
      docStyle.setProperty("--ry", "0");
    };

    aElem.onmousedown = e => {
      docStyle.setProperty("--tz", "-25px");
    };

    document.body.onmouseup = e => {
      docStyle.setProperty("--tz", "-12px");
    };
  }

  handleChange = ({ target: { value } }) => {
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      this.setState({ input: value });
    }
  };

  reiterateBills = m => {
    const { state } = this;

    //* $100
    const firstIteration = m % 100;
    const firstResult = firstIteration ? (m - firstIteration) / 100 : m / 100;

    //* $50
    const secondIteration = m > 100 ? firstIteration % 50 : m % 50;
    const secondResult = secondIteration
      ? (m > 100 ? firstIteration - secondIteration : m - secondIteration) / 50
      : firstIteration
      ? firstIteration / 50
      : m > 100
      ? 0
      : m / 50;

    //* $20
    const thirdIteration = m > 100 ? secondIteration % 20 : m % 20;
    const thirdResult = thirdIteration
      ? (m > 100 ? secondIteration - thirdIteration : m - thirdIteration) / 20
      : secondIteration
      ? secondIteration / 20
      : m > 100
      ? 0
      : m / 20;

    //* $10
    const fourthIteration = m > 100 ? thirdIteration % 10 : m % 10;
    const fourthResult = fourthIteration
      ? (m > 100 ? thirdIteration - fourthIteration : m - fourthIteration) / 10
      : thirdIteration
      ? thirdIteration / 10
      : m > 100
      ? 0
      : m / 10;

    //* $5
    const fifthIteration = m > 10 ? fourthIteration % 5 : m % 5;
    const fifthResult = fifthIteration
      ? (m > 10 ? fourthIteration - fifthIteration : m - fifthIteration) / 5
      : fourthIteration
      ? fourthIteration / 5
      : m > 10
      ? 0
      : m / 5;

    //* $2
    const sixthIteration = m > 4 ? fifthIteration % 2 : m % 2;
    const sixthResult = sixthIteration
      ? (m > 4 ? fifthIteration - sixthIteration : m - sixthIteration) / 2
      : fifthIteration
      ? fifthIteration / 2
      : m > 4
      ? 0
      : m / 2;

    //* $1
    const seventhIteration = m % 2;
    const seventhResult = seventhIteration
      ? fifthResult
        ? 0
        : 1
      : sixthResult && fifthResult
      ? 1
      : 0;

    this.setState({
      hundred: firstResult,
      fifty: secondResult,
      twenty: thirdResult,
      ten: fourthResult,
      five: fifthResult,
      T: sixthResult,
      L: seventhResult,
      value: `100 x${firstResult} | 50 x${secondResult} | 20 x${thirdResult} | 10 x${fourthResult} | 5 x${fifthResult} | 2 x${sixthResult} | 1 x${seventhResult}`
    });

    return state.value;
  };

  render() {
    const { input, value } = this.state;

    return (
      <div>
        <input
          autoFocus="autofocus"
          onChange={this.handleChange}
          placeholder="Enter a number here, digits only"
          step="1"
          type="number"
        />
        <a
          data-title={`Reiterate Money - ${input}`}
          disabled={!input}
          onClick={e => this.reiterateBills(input)}
        />
        <p>{value}</p>
      </div>
    );
  }
}
