import React from "react";
import styled from "styled-components";
import { FaAmazon } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import { FaShopify } from "react-icons/fa";
import { SiWalmart } from "react-icons/si";
import { SiBigbasket } from "react-icons/si";

const TrustedCompunys = () => {
  return (
    <Wrapper>
      <div className=" Main_Section ">
        <div className="compunysIcon">
          <marquee behavior="right" direction="">
            <FaAmazon className="bi" />
            <SiFlipkart className="bi" />
            <FaShopify className="bi" />
            <SiWalmart className="bi" />
            <SiBigbasket className="bi" />
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
    height: 33vh;
  }

  .bi {
    font-size: 12rem;
    padding: 1.3rem;
    border-radius: 2rem;
    margin: 0rem 8rem;
    box-shadow: 10px 0px 5px 4px #921eb9;
  }
`;

export default TrustedCompunys;
