import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Admin_SideBar from "./Admin_SideBar";
import { EditOutlined, DeleteOutlined, StarOutlined } from "@ant-design/icons";
import { Card } from "antd";

const Show_Product = () => {
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/get-product`
      );
      setProduct(data.product);
      console.log(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const [product, setProduct] = useState([]);

  // delete Product
  const deleteProductHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/delete-product/${id}`
      );

      if (data.success) {
        toast.success(data.msg, {
          position: "bottom-left",
        });
        getProduct();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const Navigate = useNavigate();

  return (
    <Wrapper>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <Admin_SideBar />
          </div>
          <div className="col-sm-8 text-center mt-5" style={{ height: "100%" }}>
            <div className="grid">
              {product?.map((products) => {
                const { _id, name, slug, description, img, price, quantity } =
                  products;
                return (
                  <div className="" key={_id}>
                    <Card className="m-3">
                      <div className="row text-center">
                        <div className="col-md-12">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}/${img}`}
                            alt="Img';
"
                            width="100px"
                            height="100px"
                          />
                          <h1 className="mt-2 font">{name}</h1>
                          <h5 className="Cfont">
                            {description.substring(0, 25)}...
                          </h5>
                          <div className="">
                            <i className="me-4 Cfont">{price}</i>
                            <i className="Cfont">{quantity}</i>
                          </div>
                          <div className="icons_parent">
                            <EditOutlined
                              key="edit"
                              onClick={() =>
                                Navigate(
                                  `/Deshbored/admin/UpdateProductPage/${slug}`
                                )
                              }
                            />

                            <DeleteOutlined
                              onClick={() => deleteProductHandler(_id)}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .font {
    font-size: 2rem;
  }
  .Cfont {
    font-size: 1.6rem;
    display: inline;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-template-rows: 1fr;
  }

  .container {
    height: 100%;
  }

  .icons_parent {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 8px;
    font-size: 18px;
  }
`;

export default Show_Product;
