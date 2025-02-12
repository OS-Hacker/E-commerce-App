import React from "react";
import styled from "styled-components";
import HeroSection from "../components/HeroSection";

const About = () => {
  const data = {
    title: "Global-Bazaar",
    subTitle: "Secure Payment",
  };
  return (
    <Wrapper>
      <HeroSection data={data} />
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.section``;
