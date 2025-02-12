import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import INR from "./INR";
import {
  addToCart,
  decreaseCart,
  removeItem,
} from "../redux-toolkit/CartSlice";


const Cart_Page = ({ products }) => {
  const { _id, img, name, price, quantity } = products;
  const dispatch = useDispatch();

  const handleRemove = (_id) => {
    dispatch(removeItem(_id));
  };

  const handledecrease = (products) => {
    dispatch(decreaseCart(products));
  };

  const handlerincrease = (products) => {
    dispatch(addToCart(products));
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="row d-flex justify-content-center my-2">
          <div className="col-md-8 w-100">
            <div className="card w-100">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <div className="">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/${img}`}
                        alt=""
                        id="Emage"
                        width="100%"
                        height="150px"
                      />
                    </div>
                  </div>

                  <div className="col-lg-7 col-md-6 mb-lg-0">
                    <div className="d-flex">
                      <h3 className="mt-3" style={{ fontSize: "2.1rem" }}>
                        <strong>{name}</strong>
                      </h3>
                      <h3 className="mt-4" style={{ marginLeft: "5rem" }}>
                        Price: <INR price={price} />
                      </h3>
                    </div>
                    <div className="d-flex mt-4">
                      <div className="RemoveIcon ms-4">
                        <i
                          className="bi bi-trash3"
                          onClick={() => handleRemove(_id)}
                        ></i>
                      </div>
                      <div className="ps-5 mt-3">
                        <h3>
                          TotalPrice: <INR price={price * quantity} />
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-2 col-md-6 mb-lg-0">
                    <div className="d-flex mt-3">
                      <div className="minus">
                        <i
                          className="bi bi-dash-circle-fill"
                          onClick={() => handledecrease(products)}
                        ></i>
                      </div>
                      <div className="form-outline">
                        <input
                          id="form1"
                          min="0"
                          name="quantity"
                          value={quantity}
                          type=""
                          className="form-control"
                        />
                      </div>
                      <div className="plus">
                        <i
                          className="bi bi-plus-circle-fill"
                          onClick={() => handlerincrease(products)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .bi-dash-circle-fill {
    font-size: 2.5rem;
    color: #18cde1;
    cursor: pointer;
    transition: all 0.5s ease;
  }

  .bi-dash-circle-fill:hover {
    color: #7cc4cc;
  }

  .minus:hover {
    transform: scale(0.9);
    transition: all 0.5s ease;
  }

  .bi-plus-circle-fill {
    font-size: 2.5rem;
    cursor: pointer;
    color: #4ee118;
  }

  .bi-plus-circle-fill:hover {
    color: #94d77c;
  }

  .plus:hover {
    transform: scale(0.9);
    transition: all 0.5s ease;
  }

  .bi-trash3 {
    color: red;
    font-size: 2.5rem;
    cursor: pointer;
    transform: scale(1, 1);
  }

  .RemoveIcon:hover {
    transform: scale(0.9);
    transition: all 0.5s ease;
  }

  #form1 {
    width: 4rem;
    border: 0.1rem solid black;
    text-align: center;
    font-size: 1.5rem;
    margin: 0rem 1rem;
  }

  #Emage {
    border-radius: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    #Emage {
      height: 23vh;
    }
  }
`;

export default Cart_Page;
