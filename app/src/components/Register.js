import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import on from "await-on";
import styled from "styled-components";
import { Button, Card, Input, Typography } from "antd";

const { Title } = Typography;

export function Register(props) {
  const [state, setState] = useState({
    email: "tyler@buchea.com",
    username: "tylerbuchea",
    password: "mobydick",
    passwordConfirmation: "mobydick",
    error: null
  });
  const { email, username, password, passwordConfirmation, error } = state;
  const { className, history } = props;
  const USER_REGISTER = gql`
    mutation userRegister(
      $username: String
      $email: String
      $password: String
      $passwordConfirmation: String
    ) {
      register(
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      )
    }
  `;

  const userRegister = useMutation(USER_REGISTER, {
    variables: {
      email,
      username,
      password,
      passwordConfirmation
    }
  });
  const userRegisterHandler = async () => {
    const [error1] = await on(userRegister());
    if (error1) return setState({ ...state, error: error1 });
    history.push("/login");
  };

  return (
    <div className={className}>
      <Card className="card">
        <Title level={2}>
          Welcome{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </Title>
        <div className="inputs">
          <Input
            onChange={ev => setState({ ...state, email: ev.target.value })}
            placeholder="Email"
            className="input"
            value={email}
            autoCapitalize="none"
          />
          <Input
            onChange={ev => setState({ ...state, username: ev.target.value })}
            placeholder="Username"
            className="input"
            value={username}
            autoCapitalize="none"
          />
          <Input.Password
            onChange={ev => setState({ ...state, password: ev.target.value })}
            placeholder="Password"
            type="password"
            className="input"
            value={password}
          />
          <Input.Password
            onChange={ev =>
              setState({ ...state, passwordConfirmation: ev.target.value })
            }
            placeholder="Confirmation Password"
            type="password"
            className="input"
            value={passwordConfirmation}
          />
        </div>
        <Button block type="primary" onClick={userRegisterHandler}>
          Submit
        </Button>
        <br />
        <br />
        <Button block type="link" onClick={() => history.push("/login")}>
          Login
        </Button>
        <small>{error && error.message}</small>
      </Card>
    </div>
  );
}

Register.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func })
};

Register.defaultProps = {
  navigation: null
};

export default styled(Register)`
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    margin-top: 10vh;
    width: 300px;
  }
  .inputs {
    justify-content: center;
    margin-bottom: 15px;
  }
  input {
    margin-bottom: 7px;
  }
`;
