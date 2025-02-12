import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Spinner = () => {
   const [count, setcount] = useState(3000);

   const goHome = useNavigate();

   useEffect(() => {
     const Time = setInterval(() => {
       goHome("/");
     }, count);

     return () => clearInterval(Time);
   }, [count, goHome]);
  return (
    <Wrapper>
      <div className="container">
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
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

export default Spinner;
