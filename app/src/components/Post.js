import React from "react";
import styled from "styled-components";

export function Settings(props) {
  const { className } = props;
  return (
    <div className={className}>
      <h1>Post</h1>
      <div className="file">
        <input type="file" />
      </div>
    </div>
  );
}

export default styled(Settings)`
  .file {
    padding: 10px;
    border: 1px solid #aaa;
  }
`;
