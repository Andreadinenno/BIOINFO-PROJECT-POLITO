import React, { Component } from "react";
import _ from "lodash";
import alignmentParameters from "./parameters/alignmentParameters";
import inputParams from "./parameters/inputParameters";
import Select from "react-select";
import {
  Form,
  Button,
  Dropdown,
  Progress,
  Menu,
  Label
} from "semantic-ui-react";

let MAX_PARTS = 2;

class InputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      progress: 1,
      activeItem: "alignmentParams",
      form: {}
    };

    //bind handlers to context
    this.handleSubmit = this.handleSubmit.bind(this);
    this.textFieldChanged = this.textFieldChanged.bind(this);
    this.selectChanged = this.selectChanged.bind(this);
    this.checkboxChanged = this.checkboxChanged.bind(this);
    this.fileChanged = this.fileChanged.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  /*SUBMIT FORM*/
  handleSubmit(event) {
    //validate forms
    console.log(this.state.form);

    if (this.state.progress === MAX_PARTS + 1)
      this.setState({ submitted: true });
    else this.setState({ progress: this.state.progress + 1 });

    event.preventDefault();
  }

  goBack(event) {
    if (this.state.progress > 1)
      this.setState({ progress: this.state.progress - 1 });
  }

  handleItemClick(clickedItem, event) {
    let percentage;
    switch (clickedItem) {
      case "alignmentParams":
        percentage = 1;
        break;
      case "dbParams":
        percentage = 2;
        break;
    }

    this.setState({ progress: percentage, activeItem: clickedItem });
  }

  /* CHANGE HANDLERS */
  checkboxChanged(field, value, event) {
    let form = { ...this.state.form };
    form[field.id] = value; //updating value
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
    form[field.id] = event.target.files[0].name; //updating value
    this.setState({ form });

    let files = { ...this.state.files };
    files[field.id] = event.target.files[0];
    this.setState({ files });
  }

  uploadFile(field, event) {}

  /*RENDERERS*/
  renderTextField(fields) {
    return _.map(fields, field => {
      return (
        <Form.Input
          required={!field.optional}
          fluid
          size={"small"}
          label={`${field.label} - ${field.type}`}
          placeholder={field.help}
          id={field.id}
          value={this.state.form[field.id]}
          key={field.id}
          type={field.type}
          onChange={this.textFieldChanged.bind(field.id)}
        />
      );
    });
  }

  renderCheckbox(fields) {
    return _.map(fields, field => {
      return (
        <Form.Group inline>
          <label>{field.label}</label>
          <Form.Radio
            label={field.falseValue}
            value={field.falseValue}
            checked={this.state.form[field.id] === 0}
            onChange={this.checkboxChanged.bind(this, field, 0)}
          />
          <Form.Radio
            label={field.trueValue}
            value={field.trueValue}
            checked={this.state.form[field.id] === 1}
            onChange={this.checkboxChanged.bind(this, field, 1)}
          />
        </Form.Group>
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
        <span style={{ fontSize: "16px" }}>
          {field.label}
          {":   "}
          <Dropdown
            inline
            options={options}
            id={field.id}
            defaultValue={options[0].value}
            onChange={this.selectChanged.bind(field.id)}
          />
        </span>
      );
    });
  }

  renderFile(fields) {
    return _.map(fields, field => {
      return (
        <Form.Input
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

  /* DISPATCHER RENDERER */
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

    if (textFields.length > 0)
      returnForm.push(this.renderTextField(textFields));

    if (boolFields.length > 0) returnForm.push(this.renderCheckbox(boolFields));

    if (selectionFields.length > 0)
      returnForm.push(this.renderSelection(selectionFields));

    if (fileFields.length > 0) returnForm.push(this.renderFile(fileFields));

    return returnForm;
  }

  /*COMPONENT RENDER*/
  render() {
    var params, header, percentage;
    percentage = (this.state.progress / MAX_PARTS) * 100;
    var activeItem = this.state.activeItem;
    switch (this.state.progress) {
      case 2:
        params = inputParams;
        header = "Input parameters";
        break;
      default:
        params = alignmentParameters;
        header = "Alignment parameters";
        break;
    }

    return (
      <div style={{ padding: "10px" }}>
        <Progress percent={percentage} style={{ height: "10px" }} indicating />
        <Menu tabular>
          <Menu.Item
            name="Alignment Parameters"
            active={activeItem === "alignmentParams"}
            onClick={this.handleItemClick.bind(this, "alignmentParams")}
          />
          <Menu.Item
            name="Database Parameters"
            active={activeItem === "dbParams"}
            onClick={this.handleItemClick.bind(this, "dbParams")}
          />
        </Menu>
        <Form
          unstackable
          size="small"
          style={{
            alignContent: "center",
            width: "50%",
            margin: "10px auto"
          }}
        >
          {this.manageRender(params)}
        </Form>
      </div>
    );
  }
}

export default InputForm;
