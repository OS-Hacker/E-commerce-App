import React from "react";
import styled from "styled-components";
import Home_Header from "../components/Home_Header";
import ServiceSection from "../components/ServiceSection";
import TrustedCompunys from "../components/TrustedCompunys";

const Home = () => {

 return (
    <>
      <Home_Header />
      <ServiceSection />
      <TrustedCompunys />
    </>
  );
};

export default Home;

const Wrapper = styled.section``;
