import React from "react";
//{...props.input} means include all methods of props.input and link them to input tag
//onBlur, onSubmit ecc
//this component will be run by redux-form and will take as input props
//which contains all properties of the redux-form FIELD component
//props.label is passed along from the Field component
//{props.meta.error} is to show validate errors
export default props => {
  console.log(props.input);
  return (
    <div>
      <label>{props.label}</label>
      <input style={{ marginBottom: "5px" }} {...props.input} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};
