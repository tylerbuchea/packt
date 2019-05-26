import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Layout, Menu } from "antd";

import { withBoundary } from "../components/Boundary";

const { Header: AntHeader } = Layout;

export function Header(props) {
  const { className } = props;
  return (
    <AntHeader className={className}>
      <Link to="/">
        <div className="logo">
          <img src="/icon.svg" alt="logo" />
        </div>
      </Link>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        className="menu"
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="settings">
          <Link to="/settings">Settings</Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">Register</Link>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
}

const BoundaryComponent = withBoundary(Header);

export default styled(BoundaryComponent)`
  position: fixed;
  width: 100%;
  z-index: 1;
  .logo img {
    // width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    float: left;
  }
  .menu {
    line-height: 64px;
  }
`;
