import React from "react";
import styled from "styled-components";

import { withBoundary } from "../components/Boundary";

export function Settings(props) {
  const { className } = props;
  return (
    <div className={className}>
      <h1>Settings</h1>
      <div className="file">
        <input type="file" />
      </div>
    </div>
  );
}

const BoundaryComponent = withBoundary(Settings);

export default styled(BoundaryComponent)`
  .file {
    padding: 10px;
    border: 1px solid #aaa;
  }
`;
