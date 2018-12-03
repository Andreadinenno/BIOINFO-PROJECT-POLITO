import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer cyan darken-4">
        <div className="container">
          <div className="row">
            <div className="container" style={{ padding: "10px" }}>
              © 2014 Copyright Text
              <a className="white-text text-lighten-4 right" href="#!">
                More Links
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
