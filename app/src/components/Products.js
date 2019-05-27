import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const posts = Array(20).fill(undefined);

export function Home(props) {
  const { className } = props;

  const renderPost = (profile, index) => (
    <Link to={`/product/${index}`} className="item" key={index}>
      <img src="" alt="post" />
    </Link>
  );

  return (
    <div className={className}>
      <div className="grid">{posts.map(renderPost)}</div>
    </div>
  );
}

export default styled(Home)`
  /* https://medium.com/cloudaper/how-to-create-a-flexible-square-grid-with-css-grid-layout-ea48baf038f3 */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    grid-auto-rows: 1fr;
    border-top: 2px solid #f0f0f0;
  }

  .grid::before {
    content: "";
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  .grid > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  .item {
    border: 1px solid #f0f0f0;
    cursor: pointer;
    outline: none;
    padding: 10px 20px;
    background: white;
  }

  .item:hover {
    border: 1px solid #1890ff;
    cursor: pointer;
  }

  .item:active {
    border: 1px solid #1890ff;
    cursor: pointer;
    opacity: 0.5;
  }
`;
