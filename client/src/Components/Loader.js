import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import styled from "styled-components";

const LoaderBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;

  .blur-box {
    width: 100%;
    height: 100%;
    position: absolute;
    filter: blur(2px);
    z-index: 50;
  }
`;

const Loader = () => {
  return (
    <LoaderBox>
      <div className="blur-box" />
      <CircularProgress />
    </LoaderBox>
  );
};

export default Loader;
