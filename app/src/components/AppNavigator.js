import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "antd";

import Header from "./Header";
import Login from "./Login";
import Post from "./Post";
import ProductDetail from "./ProductDetail";
import Products from "./Products";
import Register from "./Register";

const { Content } = Layout;

export function AppNavigator(props) {
  const { className } = props;
  return (
    <Router>
      <Layout className={className} style={{ minHeight: "100vh" }}>
        <Header />
        <Content className="content">
          <Route path="/" exact component={Products} />
          <Route path="/login" component={Login} />
          <Route path="/post" component={Post} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/register" component={Register} />
        </Content>
      </Layout>
    </Router>
  );
}

export default styled(AppNavigator)`
  min-height: 100vh;
  .content {
    margin-top: 64px;
    background-color: #f0f0f0;
  }
`;
