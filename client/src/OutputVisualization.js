import React, { Component } from "react";

class OutputVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
    console.log(this.props.data);
  }
  render() {
    return <h1>Tanchia</h1>;
  }
}

export default OutputVisualization;
