import React from "react";
import styled from "styled-components";

const Home_Header = () => {
  return (
    <Wrapper className="main ">
      <div
        id="carouselExampleInterval"
        className="carousel slide "
        data-bs-ride="carousel"
        slide="auto"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="5000">
            <img
              id="img"
              src="./Images/family-4.jpeg"
              className="d-block w-100"
              height="450px"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img
              id="img"
              src="./Images/hero.jpg"
              className="d-block w-100"
              height="450px"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              id="img"
              src="./Images/family-4.jpg"
              className="d-block w-100"
              height="450px"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              id="img"
              src="./Images/family_2.jpg"
              className="d-block w-100"
              height="450px"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  .main {
    width: 100%;
    height: 6rem;
  }

  #img {
    height: 80vh;
  }
`;

export default Home_Header;
