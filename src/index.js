import React from "react";
import ReactDOM from "react-dom";
import Main from "/src/Main";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
