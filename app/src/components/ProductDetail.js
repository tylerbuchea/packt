import React from "react";
import styled from "styled-components";

export function ProductDetail(props) {
  const { className, match } = props;
  return (
    <div className={className}>
      <h1>Product Detail {match.params.id}</h1>
    </div>
  );
}

export default styled(ProductDetail)`
  .file {
    padding: 10px;
    border: 1px solid #aaa;
  }
`;
