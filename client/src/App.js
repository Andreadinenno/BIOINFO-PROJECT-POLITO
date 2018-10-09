import React, { Component } from "react";
import Header from "./Header";
import InputForm from "./inputForm/InputForm";
import { Route, BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ margin: "15px" }}>
          <Header />
          <Route exact path="/" component={InputForm} />
        </div>
      </BrowserRouter>
    );
  }
}

//actions are passed to the component as props
export default App;
