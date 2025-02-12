import React from "react";
import { Button } from "../style/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Empty_cart = () => {
  const shop = useNavigate();

  const bgImage = {
    width: "300px",
    backgroundImage: "url(./Images/Empty_cart.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <Wrapper>
      <div className="main">
        <div className="parint">
          <div className="Empty" style={bgImage}>
            <strong>Your Cart is Empty</strong>
            <Button onClick={() => shop("/Product")}>Shop Now</Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .Empty {
    width: 100%;
    height: 86vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .parint {
    position: relative;
  }

  strong {
    position: absolute;
    bottom: 23rem;
    font-family: cursive;
    font-size: 2.3rem;
  }

  Button {
    position: absolute;
    bottom: 18rem;
  }
`;

export default Empty_cart;
