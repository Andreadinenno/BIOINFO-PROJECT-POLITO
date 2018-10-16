import React, { Component } from "react";
import Header from "./Header";
import Homepage from "./Homepage";
import OutputVisualization from "./OutputVisualization";
import InputForm from "./inputForm/InputForm";
import { Route, BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ margin: "15px" }}>
          <Header />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/new" component={InputForm} />
          <Route exact path="/output" component={OutputVisualization} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
