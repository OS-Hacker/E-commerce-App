import React from "react";
import { Button } from "../style/Button";
import styled from "styled-components";

const HeroSection = ({ data }) => {
  return (
    <Wrapper>
      <div className="section_container">
        <div className="left-side">
          <h1 className="title text-uppercase">{data.title}</h1>
          <strong className="subTitle">{data.subTitle}</strong>
          <p className="para">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Praesentium, animi quam, adipisci mollitia inventor non eius Lorem
            dolor. ipsum dolor sit amet consecte adipisicing elit. Lorem ipsum
            dolor sit.
            <br />
          </p>
          <Button>Shopping Now</Button>
        </div>
        <div className="right-side">
          <img src="/Images/Heor-3.png" alt="" className="about_img" />
        </div>
      </div>
    </Wrapper>
  );
};

export default HeroSection;

const Wrapper = styled.section`
  .section_container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    height: 50vh;
  }
  .subTitle {
    font-size: 2rem;
  }

  .para {
    width: 60rem;
  }

  .about_img {
    width: 340px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile_screen}) {
    .section_container {
      text-align: center;
      flex-direction: column;
      height: 40%;
    }

    .title {
      font-size: 4.3rem;
      margin-top: 0px;
    }
    .para {
      width: 37rem;
    }
  }
`;
