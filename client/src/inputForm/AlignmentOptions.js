import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import alignmentParameters from "./alignmentParameters";
import Select from "react-select";

class AlignmentOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ald: "",
      dap: 0,
      go: "",
      ge: "",
      ma: "",
      mm: "",
      gl: 0,
      ut: 0,
      ul: 0,
      ur: 0,
      ud: 0,
      sc: "",
      msas: "",
      mas: "",
      ss: "",
      se: "",
      mspt: "",
      mst: "",
      tst: "",
      mos: "",
      mis: ""
    };
  }

  handleChange(field, event) {
    if (field === "checkbox") {
      if (this.state[event.target.id] === 1) {
        this.setState({ [event.target.id]: 0 });
      } else {
        this.setState({ [event.target.id]: 1 });
      }
    } else {
      //selection item
      this.setState({ [field.id]: event });
    }

    this.forceUpdate();
    console.log(this.state);
  }

  renderBool(field) {
    return (
      <div className="row">
        <div className="switch col s12">
          <label
            style={{
              marginRight: "10px",
              fontSize: "18px",
              color: "#006064"
            }}
          >
            {field.label}
          </label>
          <label
            style={{
              fontSize: "17px"
            }}
          >
            {field.falseValue}
            <input
              type="checkbox"
              id={field.id}
              onChange={this.handleChange.bind(this, "checkbox")}
            />
            <span className="lever" />
            {field.trueValue}
          </label>
        </div>
      </div>
    );
  }

  renderSelection(field) {
    const options = [];
    for (var i in field.options) {
      var object = { value: field.options[i], label: field.options[i] };
      options.push(object);
    }

    const selectedOption = this.state[field.id];

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange.bind(this, field)}
        options={options}
        id={field.id}
      />
    );
  }

  render() {
    return _.map(alignmentParameters, field => {
      switch (field.type) {
        case "switch":
          return this.renderBool(field);
          break;
        case "radio":
          return this.renderSelection(field);
          break;
        /*default:
          return <h1>Ok</h1>;
          break;*/
      }
    });
  }
}

export default AlignmentOptions;
