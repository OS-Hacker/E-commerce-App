import React, { useState } from "react";
import { styled } from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { searchHook } from "../context/SearchContext";
import INR from "./INR";
import { addToCart } from "../redux-toolkit/CartSlice";

const SearchProduct = () => {
  const Dispech = useDispatch();

  const addCartHandler = (e, products) => {
    e.preventDefault();

    Dispech(addToCart(products));

    gocart("/Cart");
  };

  const [value, setValue] = searchHook();
  console.log(value.resalt);

  const goBack = useNavigate();

  return (
    <Wrapper>
      <div className="main">
        <div className="back_logo">
          <i
            className="bi bi-arrow-left-circle-fill"
            id="goback"
            onClick={() => goBack(-1)}
          ></i>
        </div>
        {value.resalt.length < 1 ? (
          <h1 className="text">Product Not Found </h1>
        ) : (
          <>
            <div
              className="text-center alert alert-light mt-5"
              style={{ height: "100%" }}
            >
              {value.resalt.map((products) => {
                const { _id, name, slug, description, img, price, quantity } =
                  products;
                return (
                  <>
                    <div className="row mb-5">
                      <NavLink
                        to={`/SingleProduct/${slug}`}
                        className="Product_card mx-auto"
                      >
                        <div className="Product_Img">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}/${img}`}
                            alt=""
                            className="image"
                          />
                        </div>
                        <div className="second">
                          <div className="Product_name">
                            <h1 className="name" style={{ fontSize: "30px" }}>
                              {name}
                            </h1>
                          </div>
                          <div className="w-100">
                            <p>{description}</p>
                          </div>
                          <div className="container">
                            <strong className="real-price">
                              <INR className="" price={price} />
                            </strong>
                            <strong className="mrp-price">
                              M.R.P <INR price={price + 1000000} />
                            </strong>
                            <h3 className="logo">Deal of the Day</h3>
                          </div>
                          <div className="Product_btn">
                            <Button
                              onClick={(e) => addCartHandler(e, products)}
                            >
                              ADD TO CART
                            </Button>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    width: 100%;
    height: 100%;
  }
  .Product_card {
    width: 90rem;
    height: 25rem;
    box-shadow: 5px 5px 8px 10px #888888;
    text-align: center;
    border-radius: 1.5rem;
    cursor: pointer;
    transition: all 0.5s ease;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .image{
    width: 90%;
    height: 150px;
  } 
  p {
    font-size: 1.8rem;
    color: #9a9fa5;
  }

  img {
    height: 180px;
    width: 220px;
    margin: 20px;
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: cursive;
  }

  .Product_name {
    padding: 1rem 1rem;
  }

  .Product_btn {
    padding: 1.5rem 1.5rem;
  }
  .back_logo {
    width: 2rem;
    height: 0rem;
    position: relative;
    left: 100px;
    top: 40px;
  }
  .real-price {
    font-size: 1.8rem;
  }

  .mrp-price {
    font-size: 1.8rem;
    text-decoration: line-through;
  }

  .logo {
    width: 140px;
    text-align: center;
    border-radius: 12px;
    background-color: red;
    color: white;
    border: 2px solid red;
  }

  #goback {
    font-size: 4rem;
    cursor: pointer;
    color: #9a9fa5;
  }

  #goback:hover {
    font-size: 4rem;
    transform: scale(1.1);
    color: #36383b;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile_screen}) {
    .main {
      height: 100%;
    }
    .Product_card {
      width: 75% !important;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
    }

    p {
      font-size: 1.8rem;
      color: #9a9fa5;
      display: none;
    }

    .text {
      font-size: 1.2rem;
    }

    img {
      width: 1.2rem;
      height: 110px;
      width: 154px;
    }

    .grid {
      flex-wrap: wrap;
    }

    .name {
      font-size: 2rem;
    }

    .Product_card {
      width: 16rem;
    }
  }
`;

export default SearchProduct;
