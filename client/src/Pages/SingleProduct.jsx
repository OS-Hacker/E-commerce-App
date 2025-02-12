import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import INR from "../components/INR";
import { Button } from "../style/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux-toolkit/CartSlice";
import Spinner_2 from "../components/Spinner_2";
import Spinner from "react-bootstrap/esm/Spinner";

const SingleProduct = () => {
  // get single product

  const { slug } = useParams();

  const [singleData, setSingleData] = useState({});

  const getSingleData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/single-product/${slug}`
      );
      setSingleData(data?.product);

      console.log(data);

      getSimilarProduct(data.product._id, data.product.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleData();
  }, [slug]);

  // get similar product

  const [similarProducts, setSililarProducts] = useState([]);

  const getSimilarProduct = async (pId, cId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/similar-product/${pId}/${cId}`
      );
      setSililarProducts(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  // card btn

  const gocart = useNavigate();

  const Dispech = useDispatch();

  const addCartHandler = (e, product) => {
    e.preventDefault();

    Dispech(addToCart(product));

    gocart("/Cart");
  };

  const goBack = useNavigate();

  const { _id, name, img, description, price } = singleData;

  return (
    <Wrapper>
      {/* single Product */}

      {singleData.__v == 0 ? (
        <>
          <div className="back_logo" key={_id}>
            <i
              className="bi bi-arrow-left-circle-fill"
              id="goback"
              onClick={() => goBack(-1)}
            ></i>
          </div>
          <div
            className="alert alert-light flex_dev container px-5 m-5"
            style={{ height: "80%", width: "92%" }}
          >
            <div className="row">
              <div className="col-md-6 text-center">
                <div className="img-container">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${img}`}
                    alt=""
                    className="img"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="productData">
                  <h1>{name}</h1>
                  <h3 className="description">{description}</h3>
                  <hr />
                  <h3 className="logo">Deal of the Day</h3>
                  <h1
                    style={{
                      fontSize: "20px",
                      display: "inline",
                      margin: "5px",
                    }}
                  >
                    M.R.P
                  </h1>
                  <h1
                    style={{
                      fontSize: "20px",
                      display: "inline-block",
                      textDecoration: "line-through",
                    }}
                  >
                    <INR price={price + 1000000} />
                  </h1>
                  <div className="" style={{ fontSize: "30px" }}>
                    <h1 className="text-danger" style={{ fontSize: "20px" }}>
                      10% off
                    </h1>
                    <h1 style={{ fontSize: "30px" }}>
                      <INR price={price} />
                    </h1>
                  </div>
                  <div className="d-flex text-center">
                    <div className="">
                      <i className="bi bi-car-front"></i>
                      <h4>Free Delivery</h4>
                    </div>
                    <div className="mx-5">
                      <i className="bi bi-wallet-fill"></i>
                      <h4 className="">7 days Replacement by Brand</h4>
                    </div>
                    <div className="">
                      <i className="bi bi-shield-fill-check"></i>
                      <h4>1 Year Warranty</h4>
                    </div>
                    <div className="ms-5">
                      <i className="bi bi-award-fill"></i>
                      <h4>Top Brand</h4>
                    </div>
                  </div>
                  <hr />
                  <Button
                    className="me-4"
                    onClick={(e) => addCartHandler(e, singleData)}
                  >
                    Add to card
                  </Button>
                  <Button>Buy Now</Button>
                </div>
              </div>
            </div>
          </div>

          {/* similar Poducts */}
          <div
            className="grid text-center gap-5"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            {similarProducts?.map((product) => {
              const { _id, slug, name, img, price } = product;
              return (
                <NavLink to={`/SingleProduct/${slug}`} key={_id}>
                  <div className="Product_card m-auto">
                    <div className="Product_Img">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/${img}`}
                        alt=""
                        width="200px"
                        height="130px"
                      />
                    </div>
                    <div className="Product_name">
                      <h1 className="name" style={{ fontSize: "23px" }}>
                        {name}
                      </h1>
                    </div>
                    <div className="Product_Price">
                      <h3>
                        <INR price={price} />
                      </h3>
                    </div>
                    <div className="Product_btn">
                      <Button onClick={(e) => addCartHandler(e, product)}>
                        ADD TO CART
                      </Button>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </>
      ) : (
        <Spinner_2 />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .flex_dev {
    /* display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px; */
  }
  .img {
    width: 380px;
    /* box-shadow: 2px 4px 8px 6px; */
    height: 300px;
    margin-top: 30px;
  }

  .productData {
    /* height: 0px; */
  }

  .description {
    width: 95%;
  }
  .logo {
    width: 150px;
    text-align: center;
    border-radius: 20px;
    background-color: red;
    color: white;
    border: 2px solid red;
  }
  i {
    font-size: 30px;
    margin: 20px;
  }
  .delete {
    text-decoration: line-through;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  .back_logo {
    width: 2rem;
    height: 0rem;
    position: relative;
    left: 40px;
    top: 40px;
    z-index: 999;
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

  @media (max-width: 700px) {
    .flex_dev {
      flex-direction: column;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .productData {
      margin-right: 20px;
      margin-top: 20px;
      height: 100%;
    }
    .img {
      margin-top: 0px;
    }
    .grid {
      display: flex;
      overflow-x: scroll;
    }
  }
`;

export default SingleProduct;
