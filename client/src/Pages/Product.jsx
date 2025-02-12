import React, { useEffect } from "react";
import styled from "styled-components";
import Search_Input from "../components/Search_Input";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux-toolkit/ProductSlice";
import Spinner_2 from "../components/Spinner_2";
import PageNotFound from "./PageNotFound";
import Product_Page from "../components/Product_Page";

const Product = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const { isLoading, error, products } = useSelector(
    (state) => state?.products
  );

  console.log(products);

  return (
    <Wrapper>
      {/* search input */}
      <Search_Input />

      <div className="main">
        {isLoading ? (
          <Spinner_2 />
        ) : error ? (
          <PageNotFound />
        ) : (
          <>
            <div className="container">
              {products?.map((product) => {
                return <Product_Page key={product._id} product={product} />;
              })}
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Product;

const Wrapper = styled.section`
  .main {
    width: 100%;
    height: 100%;
    margin-bottom: 8rem;
  }
  .container {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    justify-content: center;
    justify-items: center;
    gap: 6rem 0rem;
  }
`;
