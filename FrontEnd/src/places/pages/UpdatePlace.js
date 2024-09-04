import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { DUMMY_PLACES } from "./UserPlaces";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.css";
import Card from "../../shared/components/UIElements/Card";

const UpdatePlace = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  const placeToEdit = DUMMY_PLACES.find((place) => place.id === placeId);

  const [formState, inputHandler, setFormData] = useForm(
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
    true
  );

  useEffect(() => {
    if (placeToEdit) {
      setFormData({
        title: {
          value: placeToEdit.title,
          isValid: true,
        },
        description: {
          value: placeToEdit.description,
          isValid: true,
        },
        address: {
          value: placeToEdit.address,
          isValid: true,
        },
      });
    }
    setIsLoading(false);
  }, [setFormData, placeToEdit]);

  const updateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (isLoading) {
    return (
      <Card>
        <div className="center">
          <h2>Loading...</h2>
        </div>
      </Card>
    );
  }

  return (
    <form className="place-form" onSubmit={updateSubmitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        element="input"
        errorText="This field is required."
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
        onInput={inputHandler}
      />
      <Input
        id="description"
        type="textarea"
        label="Description"
        errorText="Less than 10 characters."
        validators={[VALIDATOR_MINLENGTH(10)]}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
        onInput={inputHandler}
      />
      <Input
        id="address"
        type="text"
        label="Address"
        element="input"
        errorText="This field is required."
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={formState.inputs.address.value}
        initialValid={formState.inputs.address.isValid}
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        EDIT PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
