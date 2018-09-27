import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import alignmentParameters from "./alignmentParameters";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      inputFile: "",
      refDbFile: "Formatted in fasta and converted in txt",
      tagsFile: "Tags counts ﬁle name without .txt extension.",
      r: "off",
      s: "",
      l: "",
      ss: "",
      sb: "",
      se: "",
      b: "",
      i: "/",
      t: "",
      h: "",
      errors: [
        ("r": ""),
        ("s": ""),
        ("l": ""),
        ("ss": ""),
        ("sb": ""),
        ("se": ""),
        ("b": ""),
        ("i": ""),
        ("h": "")
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.id);
    if (event.target.id === "r") {
      if (this.state[event.target.id] === "on") {
        this.setState({ [event.target.id]: "off" });
      } else {
        this.setState({ [event.target.id]: "on" });
      }
    } else if (event.target.id === "i") {
      this.setState({ inputFile: event.target.files[0].name });
      this.setState({ [event.target.id]: event.target.files[0] });
    } else if (event.target.id === "m") {
      this.setState({ refDbFile: event.target.files[0].name });
      this.setState({ [event.target.id]: event.target.files[0] });
    } else if (event.target.id === "t") {
      this.setState({ tagsFile: event.target.files[0].name });
      this.setState({ [event.target.id]: event.target.files[0] });
    } else {
      this.setState({ [event.target.id]: event.target.value });
    }
  }

  validateForm(data) {
    var keyToMaxValue = [];
    var isValid = true;

    //get locally max value for each input from alignmentParameters
    for (var item in alignmentParameters) {
      keyToMaxValue[alignmentParameters[item].id] =
        alignmentParameters[item].max;
    }

    for (var key in data) {
      if (key !== "response" && key !== "errors") {
        if (data[key] === "") {
          this.state.errors[key] = "Provide this value";
          isValid = false;
        } else if (data[key].length > keyToMaxValue[key]) {
          this.state.errors[key] =
            "The value has max length of  " + keyToMaxValue[key] + "characters";
          isValid = false;
        } else {
          this.state.errors[key] = "";
        }
      }
    }

    if (isValid) return true;
    else {
      this.forceUpdate();
      return false;
    }
  }

  handleSubmit(event) {
    var data = this.state;
    if (!this.validateForm(data)) {
      event.preventDefault();
      return;
    }

    //data can be sent
    const { i, r, s, l, ss, sb, se, b, h, m, t } = data;
    let form = new FormData();
    form.append("i", i);
    form.append("m", m);
    form.append("t", t);
    form.append("r", r);
    form.append("s", s);
    form.append("l", l);
    form.append("ss", ss);
    form.append("sb", sb);
    form.append("se", se);
    form.append("b", b);
    form.append("h", h);

    //default values
    form.append("o", "/"); //output folder path -> root

    axios
      .post("/api/request", form)
      .then(result => {
        this.setState({ response: "Processing.." });
      })
      .catch(err => {
        this.setState({ response: "Error.." });
      });

    /*
    fetch("/api/request", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ response: "Processing.." });
      })
      .catch(err => console.log(err));*/

    event.preventDefault();
  }

  renderAlignmentParameters() {
    return _.map(alignmentParameters, field => {
      return (
        <div className="row" style={{ marginBottom: "0px" }}>
          <div className="input-field col s12">
            <input
              placeholder={field.help}
              id={field.id}
              type={field.type}
              className="validate"
              onChange={this.handleChange}
            />
            <h6 style={{ color: "red" }}>{this.state.errors[field.id]}</h6>
            <label
              className="active"
              style={{
                color: "#006064",
                fontSize: "20px",
                marginBottom: "3px"
              }}
            >
              {field.label}
            </label>
          </div>
        </div>
      );
    });
  }

  renderFiles() {
    return (
      <div className="col s6">
        <div
          className="file-field input-field col s6"
          style={{ width: "50%", marginLeft: "12px" }}
        >
          <div className="btn">
            <span>Input folder</span>
            <input
              type="file"
              id="i"
              className="i"
              name="i"
              onChange={this.handleChange}
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              style={{ color: "red" }}
              type="text"
              placeholder={this.state.inputFile}
            />
          </div>
        </div>

        <div
          className="file-field input-field col s12"
          style={{ width: "50%", marginLeft: "12px" }}
        >
          <div className="btn">
            <span>Reference database file</span>
            <input
              type="file"
              id="m"
              className="m"
              name="m"
              onChange={this.handleChange}
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              style={{ color: "red" }}
              type="text"
              placeholder={this.state.refDbFile}
            />
          </div>
        </div>

        <div
          className="file-field input-field col s12"
          style={{ width: "50%", marginLeft: "12px" }}
        >
          <div className="btn">
            <span>Tags count file</span>
            <input
              type="file"
              id="t"
              className="t"
              name="t"
              onChange={this.handleChange}
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              style={{ color: "red" }}
              type="text"
              placeholder={this.state.tagsFile}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.response === "") {
      return (
        <div style={{ padding: "10px" }}>
          <h1 />
          <form
            onSubmit={this.handleSubmit}
            style={{
              padding: "40px",
              marginLeft: "20px",
              marginRight: "20px",
              borderRadius: "10px",
              marginBottom: "60px",
              backgroundColor: "#fff3e0"
            }}
          >
            {this.renderAlignmentParameters()}

            <div className="row">
              <div className="switch col s12">
                <label
                  style={{
                    marginRight: "10px",
                    fontSize: "20px",
                    color: "#006064"
                  }}
                >
                  Dna to Rna
                </label>
                <label
                  style={{
                    fontSize: "17px"
                  }}
                >
                  No
                  <input type="checkbox" id="r" onChange={this.handleChange} />
                  <span className="lever" />
                  Yes
                </label>
              </div>
            </div>

            {this.renderFiles()}

            <button
              type="submit"
              className="teal btn-flat left white-text"
              style={{ marginLeft: "420px", marginTop: "50px" }}
            >
              <i className="material-icons left">done</i>
              Submit
            </button>
            <button
              type="reset"
              className="red btn-flat right white-text"
              style={{ marginRight: "420px", marginTop: "50px" }}
            >
              <i className="material-icons left">cancel</i>
              Reset
            </button>
          </form>
        </div>
      );
    } else {
      return <h1>{this.state.response}</h1>;
    }
  }
}

export default Form;
