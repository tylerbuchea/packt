import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Layout, Menu } from "antd";

const { Header: AntHeader } = Layout;

export function Header(props) {
  const { className } = props;
  return (
    <AntHeader className={className}>
      <div className="logo">
        <img src="/icon.png" alt="logo" />
      </div>

      <Menu theme="dark" mode="horizontal" className="menu">
        <Menu.Item key="products">
          <Link to="/">Products</Link>
        </Menu.Item>
        <Menu.Item key="post">
          <Link to="/post">Post</Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">Login / Register</Link>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
}

export default styled(Header)`
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
