import React, { useReducer } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.val, isValid: validate(action.val, action.validators) };
    case "TOUCH":
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, { value: "", isValid: false, isTouched: false });

  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value, validators: props.validators });
  };
  const touchHandler = (event) => {
    dispatch({ type: "TOUCH", val: event.target.value, validators: props.validators });
  };

  const element =
    props.element === "input" ? (
      <input type={props.type} id={props.id} placeholder={props.placeholder} value={inputState.value} onChange={changeHandler} onBlur={touchHandler} />
    ) : (
      <textarea rows={props.rows || 3} id={props.id} value={inputState.value} onChange={changeHandler} onBlur={touchHandler}></textarea>
    );

  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && "form-control--invalid"}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
