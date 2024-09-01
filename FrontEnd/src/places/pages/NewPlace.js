import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./NewPlace.css";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input type="text" label="Title" element="input" errorText="The input is invalid." validators={[VALIDATOR_REQUIRE()]} />
    </form>
  );
};

export default NewPlace;
