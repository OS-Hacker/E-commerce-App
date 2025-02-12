import React from "react";
import styled from "styled-components";

const PageNotFound = () => {
  return (
    <Wrapper>
      <div className="main-Empty-div">
        <img
          src="../Images/Error_Img.avif"
          alt="Image Not Food"
          className="Empty-img"
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main-Empty-div {
    height: 90vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }

  .Empty-img {
    height: 100vh;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile_screen}) {
    .main-Empty-div img {
      max-width: 120%;
    }
  }
`;

export default PageNotFound;
