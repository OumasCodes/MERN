import React, { useContext, useState } from "react";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import "./Login.css";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Login = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      if (isLogin) {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData.user.id);
      } else {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest("http://localhost:5000/api/users/signup", "POST", formData);

        auth.login(responseData.user.id);
      }
    } catch (err) {}
  };

  const switchLoginHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }

    setIsLogin((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login required</h2>
        <hr />
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <React.Fragment>
              <Input id="name" type="text" label="Name" element="input" errorText="This field is required." validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} />
              <ImageUpload center id="image" onInput={inputHandler} errorText="This field is required." />
            </React.Fragment>
          )}
          <Input id="email" type="email" label="E-mail" element="input" errorText="Wrong email structure." validators={[VALIDATOR_EMAIL()]} onInput={inputHandler} />
          <Input id="password" type="password" label="Password" element="input" errorText="Has to be over 6 characters." validators={[VALIDATOR_MINLENGTH(6)]} onInput={inputHandler} />
          <Button type="submit" disabled={!formState.isValid}>
            {isLogin ? "Login" : "Signup"}
          </Button>
        </form>
        <Button inverse onClick={switchLoginHandler}>
          {isLogin ? "Signup" : "Login"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Login;
