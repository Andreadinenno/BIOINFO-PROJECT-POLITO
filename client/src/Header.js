import React, { Component } from "react";
import axios from "axios";
import saveAs from 'file-saver';
class Header extends Component {
  downloadDocumentation(event){
    axios
      .get("/api/documentation/",  {responseType: 'blob'})
      .then(result => {
        var filename = "isoMir-SEA.pdf"
        //pipe the stream into the files
        var blob = new Blob([result.data],{type : 'application/octet-stream'});
        //var file = new File([blob], filename, {type: 'application/pdf'});
        saveAs(blob, filename);

      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  }
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
              <a onClick={this.downloadDocumentation}>
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
