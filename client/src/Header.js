import React, { Component } from "react";
class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper cyan">
          <a href="/" className="brand-logo" style={{ marginLeft: "10px" }}>
            <i className="large material-icons left">home</i>
            isomiR-SEA
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="">
                Docs<i className="large material-icons left">link</i>
              </a>
            </li>
            <li>
              <a href="">
                Contacts<i className="large material-icons left">contacts</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
