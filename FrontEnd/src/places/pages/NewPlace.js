import React from "react";

import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./PlaceForm.css";

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <Input id="title" type="text" label="Title" element="input" errorText="This field is required." validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} />
      <Input id="description" type="textarea" label="Description" errorText="Less than 10 characters." validators={[VALIDATOR_MINLENGTH(10)]} onInput={inputHandler} />
      <Input id="address" type="text" label="Address" element="input" errorText="This field is required." validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
