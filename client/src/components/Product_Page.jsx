import React from "react";
import styled from "styled-components";
import { Button } from "../style/Button";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import INR from "./INR";
import { addToCart } from "../redux-toolkit/CartSlice";
import { Card } from "antd";

const Product_Page = ({ product }) => {
  const { slug, img, name, price } = product;

  const Navigate = useNavigate();

  const Dispech = useDispatch();

  const addCartHandler = (e, product) => {
    e.preventDefault();

    Dispech(addToCart(product));

    Navigate("/Cart");
  };

  return (
    <Wrapper>
      <Card hoverable style={{ height: "320px" }}>
        <NavLink to={`/SingleProduct/${slug}`}>
          <div className="Product_Container">
            <div className="Product_Img">
              <img src={`${import.meta.env.VITE_BASE_URL}/${img}`} alt="" />
            </div>
            <div className="Product_name">
              <h1
                className="name"
                style={{
                  fontSize: "23px",
                  fontFamily: "sans-serif",
                  color: "black",
                }}
              >
                {name}
              </h1>
            </div>
            <div className="Product_Price">
              <h3>
                <INR price={price} />
              </h3>
              <h4 className="deletePrice">
                <INR price={price + 1000000} />
              </h4>
            </div>
            <div className="Product_btn">
              <Button
                onClick={(e) => addCartHandler(e, product)}
                className="cart-btn"
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </NavLink>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .Product_Container {
    width: 22rem;
    text-align: center;
    border-top-right-radius: 1.5rem;
    border-top-left-radius: 1.5rem;
    cursor: pointer;
  }

  .Product_card:hover {
    transform: scale(1.04);
    transition: all 0.5s ease;
  }

  img {
    height: 150px;
    width: 200px;
  }

  .Product_name {
    padding: 1rem 1rem;
  }

  .Product_btn {
    padding: 1rem 1rem;
  }

  .Product_Price {
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
  }

  .deletePrice{
    color: gray;
    text-decoration: line-through;

  } 
  
  
  @media (max-width: ${({ theme }) => theme.media.mobile_screen}) {
    img {
      width: 16rem;
      height: 110px;
      width: 154px;
    }

    .name {
      font-size: 2rem;
    }

    .Product_card {
      width: 20rem;
    }

    .cart-btn {
      font-size: 1.2rem;
    }
  }
`;

export default Product_Page;
