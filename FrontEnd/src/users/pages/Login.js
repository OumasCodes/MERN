import React, { useContext, useState } from "react";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import "./Login.css";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

const Login = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

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

  const submitHandler = (event) => {
    auth.login();
    event.preventDefault();
    console.log(formState.inputs);
  };

  const switchLoginHndler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
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
        },
        false
      );
    }

    setIsLogin((prevState) => !prevState);
  };

  return (
    <Card className="authentication">
      <h2>Login required</h2>
      <hr />
      <form onSubmit={submitHandler}>
        {!isLogin && <Input id="name" type="text" label="Name" element="input" errorText="This field is required." validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} />}
        <Input id="email" type="email" label="E-mail" element="input" errorText="Wrong email structure." validators={[VALIDATOR_EMAIL()]} onInput={inputHandler} />
        <Input id="password" type="password" label="Password" element="input" errorText="Has to be over 5 characters." validators={[VALIDATOR_MINLENGTH(5)]} onInput={inputHandler} />
        <Button type="submit" disabled={!formState.isValid}>
          {isLogin ? "Login" : "Signup"}
        </Button>
      </form>
      <Button inverse onClick={switchLoginHndler}>
        {isLogin ? "Signup" : "Login"}
      </Button>
    </Card>
  );
};

export default Login;
