import React from "react";
import { ColorRing } from "react-loader-spinner";
import styled from "styled-components";

const Spinner_2 = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          width:"100%"
        }}
      >
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    </>
  );
};

const Wrapper = styled.section``;

export default Spinner_2;
