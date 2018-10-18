//readme page..set as homepage
import React, { Component } from "react";
import file from "./README.md";
import ReactMd from "react-md-file";
import { Card } from "semantic-ui-react";

class Homepage extends Component {
  render() {
    return (
      <div style={{ margin: "15px" }}>
        <Card fluid>
          <Card.Content>
            <ReactMd fileName={file} />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Homepage;
