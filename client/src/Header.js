import React, { Component } from "react";
class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper cyan">
          <a href="/" className="brand-logo" style={{ marginLeft: "10px" }}>
            <i className="large material-icons right">home</i>
            isomiR-SEA
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/new">
                Start <i className="large material-icons right">play_arrow</i>
              </a>
            </li>
            <li>
              <a href="/documents/isomiR-SEA.pdf" download="isomiR-SEA.pdf">
                Docs<i className="large material-icons right">link</i>
              </a>
            </li>
            <li>
              <a href="">
                Contacts<i className="large material-icons right">contacts</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
