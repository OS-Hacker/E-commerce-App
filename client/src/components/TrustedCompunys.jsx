import React from "react";
import styled from "styled-components";

const TrustedCompunys = () => {
  return (
    <Wrapper>
      <div className=" Main_Section ">
        <div className="compunysIcon">
          <marquee behavior="right" direction="">
            <i className="bi bi-discord"></i>
            <i className="bi bi-paypal"></i>
            <i className="bi bi-google"></i>
            <i className="bi bi-apple"></i>
            <i className="bi bi-yelp"></i>
          </marquee>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .Main_Section {
    width: 100%;
    height: 35vh;
    background-color: #d4c3e8;
    margin: 20rem 0rem;
    box-shadow: 10px 6px 8px #484747;
  }

  .compunysIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35vh;
  }

  .bi {
    font-size: 7rem;
    margin: 0rem 8rem;
    box-shadow: 10px 3px 6px 4px #921eb9;
    padding: 2rem;
    border-radius: 2rem;
}
`;

export default TrustedCompunys;
