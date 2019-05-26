import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import on from "await-on";
import styled from "styled-components";
import { Button, Card, Input, Typography } from "antd";

import { withBoundary } from "../components/Boundary";

const { Title } = Typography;

export function Login(props) {
  const [state, setState] = useState({
    user: "tylerbuchea",
    password: "mobydick",
    error: null
  });
  const { user, password, error } = state;
  const { className, history } = props;

  const USER_LOGIN = gql`
    mutation userLogin($username: String, $email: String, $password: String) {
      login(username: $username, email: $email, password: $password) {
        jwtToken
      }
    }
  `;
  const alias = user.includes("@") ? { email: user } : { username: user };
  const userLogin = useMutation(USER_LOGIN, {
    variables: {
      ...alias,
      password
    }
  });
  const userLoginHandler = async () => {
    const [error1, response] = await on(userLogin());
    if (error1) return setState({ ...state, error: error1 });
    const { jwtToken } = response.data.login;
    localStorage.set("JWT_TOKEN", jwtToken);
    history.push("/");
  };

  return (
    <div className={className}>
      <Card className="card">
        <Title level={2}>
          Come on in{" "}
          <span role="img" aria-label="tada">
            🎉
          </span>
        </Title>
        <div className="inputs">
          <Input
            autoCapitalize="none"
            onChange={ev => setState({ ...state, user: ev.target.value })}
            placeholder="Username/Email"
            className="input"
            value={user}
          />
          <Input.Password
            onChange={ev => setState({ ...state, password: ev.target.value })}
            placeholder="Password"
            type="password"
            className="input"
            value={password}
          />
        </div>
        <Button block type="primary" onClick={userLoginHandler}>
          Submit
        </Button>
        <br />
        <br />
        <Button block type="link" onClick={() => history.push("/register")}>
          Register
        </Button>
        <small>{error && error.message}</small>
      </Card>
    </div>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func })
};

Login.defaultProps = {
  navigation: null
};

const BoundaryComponent = withBoundary(Login);

export default styled(BoundaryComponent)`
  align-items: center;
  display: flex;
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
