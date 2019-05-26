import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "antd";

import { withBoundary } from "../components/Boundary";

import Header from "../components/Header";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Settings from "../screens/Settings";

const { Content } = Layout;

export function AppNavigator(props) {
  const { className } = props;
  return (
    <Router>
      <Layout className={className} style={{ minHeight: "100vh" }}>
        <Header />
        <Content className="content">
          <Route path="/" exact component={Home} />
          <Route path="/login/" component={Login} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/register/" component={Register} />
          <Route path="/settings/" component={Settings} />
        </Content>
      </Layout>
    </Router>
  );
}

const BoundaryComponent = withBoundary(AppNavigator);

export default styled(BoundaryComponent)`
  min-height: 100vh;
  .content {
    margin-top: 64px;
    background-color: #f0f0f0;
  }
`;
