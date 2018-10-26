import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import Select from "react-select";
import OutputVisualization from "../OutputVisualization";
import mandatoryParams from "./parameters/mandatoryParameters";
import alignmentParams from "./parameters/alignmentParameters";
import inputParams from "./parameters/inputParameters";
import databaseParams from "./parameters/miRNAdbParameters";
import performanceParams from "./parameters/performanceParameters";
import Popup from "react-popup";
import fs from "fs";

import {
  Form,
  Button,
  Dropdown,
  Progress,
  Menu,
  Dimmer,
  Checkbox,
  Loader,
  Segment,
  Header,
  Icon
} from "semantic-ui-react";

//they must have the same name of the imported file
const parameterFiles = [
  "mandatoryParams",
  "alignmentParams",
  "inputParams",
  "databaseParams",
  "performanceParams"
];

let uploadsPath;
class InputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      showOutput: false,
      activeItem: "mandatoryParams",
      form: { v: "2", sc: "hsa" },
      errors: {},
      outputData: {},
      response: ""
    };

    //bind handlers to context
    this.handleSubmit = this.handleSubmit.bind(this);
    this.textFieldChanged = this.textFieldChanged.bind(this);
    this.selectChanged = this.selectChanged.bind(this);
    this.checkboxChanged = this.checkboxChanged.bind(this);
    this.fileChanged = this.fileChanged.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.helpPopup = this.helpPopup.bind(this);
  }

  helpPopup(message, event) {
    console.log(message);
    window.alert(message);
  }

  isFormValid() {
    let errors = { ...this.state.errors };
    var countErrors = 0;

    //check that mandatory fields are set
    mandatoryParams.forEach(field => {
      if (!this.state.form[field.id]) {
        errors[field.id] = true;
        countErrors++;
      } else {
        errors[field.id] = false;
      }
    });

    if (countErrors > 0) {
      this.setState({ errors });
      this.setState({ activeItem: "mandatoryParams" });
      return false;
    }
    return true;
  }

  /*SUBMIT FORM*/
  handleSubmit(event) {
    if (this.isFormValid()) {
      //form can be submitted
      let formData = new FormData();

      //append the flag user has set
      for (var key in this.state.form) {
        formData.append(key, this.state.form[key]);
      }

      //append the files user has uploaded
      for (var file in this.state.files) {
        formData.append(key, this.state.files[file]);
      }

      //send form via HTTP POST request - server (node.js) is listening on that route
      this.setState({ submitted: true, response: "" });
      axios
        .post("/api/request", formData)
        .then(result => {
          //stop the loader
          //make the component render the output
          //pass the data down to plot component
          this.setState({ submitted: false, outputData: result, showOutput: true });

        })
        .catch(err => {
          this.setState({ submitted: false, response: err.message });
        });
    }
    event.preventDefault();
  }

  //handle the tab click
  handleItemClick(clickedItem, event) {
    console.log(clickedItem);
    this.setState({ activeItem: clickedItem });
  }

  /* CHANGE HANDLERS */
  checkboxChanged(id, event) {
    let form = { ...this.state.form };
    form[id] = !form[id]; //updating value
    this.setState({ form });
  }

  textFieldChanged(id, event) {
    let form = { ...this.state.form };
    form[event.id] = event.value; //updating value
    this.setState({ form });
  }

  selectChanged(id, event) {
    let form = { ...this.state.form };
    form[event.id] = event.value; //updating value
    this.setState({ form });
  }

  fileChanged(field, event) {
    let form = { ...this.state.form };
    form[field.id] = event.target.files[0].name; //update the file path
    this.setState({ form });

    //upload the file
    let files = { ...this.state.files };
    files[field.id] = event.target.files[0];
    this.setState({ files });
  }

  /*HTML ELEMENTS RENDERERS*/
  renderTextField(fields) {
    return _.map(fields, field => {
      return (
        <Form.Input
          error={this.state.errors[field.id]}
          size="tiny"
          style={{ padding: "0px" }}
          label={field.label}
          placeholder={field.help}
          id={field.id}
          value={this.state.form[field.id]}
          key={field.id}
          type={field.type}
          step="0.01"
          onChange={this.textFieldChanged.bind(field.id)}
        />
      );
    });
  }

  renderCheckbox(fields) {
    return _.map(fields, field => {
      return (
        <span>
          <Checkbox
            label={field.label}
            style={{ marginRight: "5px", marginBottom: "20px" }}
            checked={this.state.form[field.id]}
            onChange={this.checkboxChanged.bind(this, field.id)}
          />
          <Icon
            name="question circle"
            style={{ marginRight: "15px", marginBottom: "20px" }}
            onClick={this.helpPopup.bind(this, field.help)}
          />
        </span>
      );
    });
  }

  renderSelection(fields) {
    return _.map(fields, field => {
      let options = [];

      options[0] = { key: "   ", value: "   ", text: "   " };

      for (var i in field.options) {
        var object = {
          key: field.options[i],
          value: field.options[i],
          text: field.options[i]
        };
        options[++i] = object;
      }

      return (
        <span style={{ fontSize: "16px", marginRight: "20px" }}>
          {field.label}
          {":   "}
          <Dropdown
            inline
            error={this.state.errors[field.id]}
            options={options}
            id={field.id}
            value={this.state.form[field.id]}
            defaultValue={options[0].value}
            onChange={this.selectChanged.bind(field.id)}
          />
          <Icon
            name="question circle"
            style={{ marginRight: "15px", marginBottom: "20px" }}
            onClick={this.helpPopup.bind(this, field.help)}
          />
        </span>
      );
    });
  }

  renderFile(fields) {
    return _.map(fields, field => {
      return (
        <Form.Input
          label={field.label}
          error={this.state.errors[field.id]}
          action={
            <div
              className="file-field input-field col s6"
              style={{ marginLeft: "30px", marginRight: "0" }}
            >
              <div className="btn">
                <span>Upload</span>
                <input
                  type="file"
                  id="i"
                  className="i"
                  name="i"
                  onChange={this.fileChanged.bind(this, field)}
                />
              </div>
            </div>
          }
          fluid
          readOnly
          onChange={this.fileChanged.bind(this, field)}
          placeholder={this.state.form[field.id] || field.placeholder}
        />
      );
    });
  }

  renderMenu() {
    return _.map(parameterFiles, file => {
      var name = file.split("params");
      return (
        <Menu.Item
          name={name}
          key={file}
          active={this.state.activeItem === file}
          onClick={this.handleItemClick.bind(this, file)}
        />
      );
    });
  }

  /* DISPATCHER */
  manageRender(params) {
    let boolFields = [];
    let selectionFields = [];
    let textFields = [];
    let fileFields = [];
    let returnForm = [];

    _.map(params, field => {
      switch (field.type) {
        case "switch":
          boolFields.push(field);
          break;
        case "radio":
          selectionFields.push(field);
          break;
        case "file":
          fileFields.push(field);
          break;
        default:
          textFields.push(field);
          break;
      }
    });

    if (selectionFields.length > 0)
      returnForm.push(this.renderSelection(selectionFields));

    if (boolFields.length > 0) returnForm.push(this.renderCheckbox(boolFields));

    if (textFields.length > 0)
      returnForm.push(this.renderTextField(textFields));

    if (fileFields.length > 0) returnForm.push(this.renderFile(fileFields));

    //return the entire form to render on screen
    return returnForm;
  }

  /*COMPONENT RENDER METHOD*/
  render() {
    //select the file with the parameters to render on the fly
    var paramsToRender;
    switch (this.state.activeItem) {
      case "alignmentParams":
        paramsToRender = alignmentParams;
        break;
      case "inputParams":
        paramsToRender = inputParams;
        break;
      case "databaseParams":
        paramsToRender = databaseParams;
        break;
      case "performanceParams":
        paramsToRender = performanceParams;
        break;
      default:
        paramsToRender = mandatoryParams;
        break;
    }

    if (!this.state.showOutput) {
      return (
        <div style={{ padding: "10px", marginTop: "20px" }} key="container">
          <div>
            <Header
              as="h4"
              style={{
                width: "auto",
                marginRight: "20px",
                display: "inline-block"
              }}
            >
              The tool can be run simply by setting mandatory parameters. All
              the others are optional
            </Header>

            <Button onClick={this.handleSubmit} color="teal" size="big" primary>
              RUN
            </Button>
            <br />
            <Header
              as="h3"
              style={{
                width: "auto",
                marginRight: "20px",
                display: "inline-block",
                color: "red"
              }}
            >
              {this.state.response}
            </Header>
          </div>
          <Segment key="loader">
            <Dimmer inverted active={this.state.submitted}>
              <Loader size="medium" indeterminate>
                Running the computation
              </Loader>
            </Dimmer>
            <Menu tabular size="large" style={{ marginBottom: "35px" }}>
              {this.renderMenu()}
            </Menu>
            <Form
              key="label_form"
              unstackable
              size="small"
              style={{
                width: "100%"
              }}
            >
              {this.manageRender(paramsToRender)}
            </Form>
          </Segment>
        </div>
      );
    } else {
      //render the output visualization with the form passed as props
      //the OutputVisualization component will get the data as props.data
      return <OutputVisualization data={this.state.outputData} />;
    }
  }
}

export default InputForm;
