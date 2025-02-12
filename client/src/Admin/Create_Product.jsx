import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "../style/Button";
import Admin_SideBar from "../Admin/Admin_SideBar";

const Create_Product = () => {
  
  // get categorys
  const [category, setCategorys] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/get-category`
    );
    setCategorys(data.category);
  };

  useEffect(() => {
    getData();
  }, []);

  const [categoryId, setCategoryId] = useState("");

  //  get image
  const [img, setImage] = useState("");

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // other data
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const Navigate = useNavigate();

  // btn spinner
  const [spinner, setSpinner] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("category", categoryId);
      productData.append("img", img);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);

      setSpinner(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-product`,
        productData
      );

      if (data.success) {
        toast.success(data.msg);
        setSpinner(false);
        Navigate("/Deshbored/admin/Show_Product");
      }
    } catch (error) {
      console.log(error);
      setSpinner(false);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Wrapper>
      <div
        className="container"
        style={{ height: "100%", marginBottom: "10px" }}
      >
        <div className="row">
          <div className="col-sm-4">
            <Admin_SideBar />
          </div>
          <div className="col-sm-8 text-center mt-5">
            <form
              onSubmit={HandleSubmit}
              encType="multipart/form-data"
              className="shadow-lg p-4 m-3"
            >
              <Select
                placeholder="Select Category"
                className="form-select"
                showSearch
                style={{ width: "100%", marginTop: "8px", border: "none" }}
                onChange={(value) => setCategoryId(value)}
              >
                {category?.map((categorys) => {
                  return (
                    <Option value={categorys._id} key={categorys._id}>
                      {categorys.name}
                    </Option>
                  );
                })}
              </Select>
              <label
                htmlFor="inp"
                className="form-control mt-4 alert alert-info"
                style={{ height: "6vh", fontSize: "1.7rem", cursor: "pointer" }}
              >
                {img ? (
                  <strong>{img.name}</strong>
                ) : (
                  <i
                    className="bi bi-camera"
                    style={{
                      fontSize: "35px",
                      position: "relative",
                      bottom: "15px",
                      cursor: "pointer",
                      color: "black",
                    }}
                  ></i>
                )}
                <input
                  type="file"
                  name="img"
                  id="inp"
                  accept="image/*"
                  onChange={imageHandler}
                />
              </label>
              {img && (
                <img src={URL.createObjectURL(img)} alt="img" className="img" />
              )}

              {/* title */}

              <input
                type="text"
                className="form-control mt-4"
                name="name"
                id=""
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                style={{ height: "7vh", marginBottom: "3px", fontSize: "17px" }}
              />
              <textarea
                name=""
                id=""
                cols="130"
                rows="2"
                className="form-control mt-4"
                placeholder="Enter Description"
                style={{ fontSize: "17px" }}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input
                type="text"
                className="form-control mt-4"
                name="price"
                id=""
                placeholder="Enter Price"
                onChange={(e) => setPrice(e.target.value)}
                style={{ height: "7vh", marginBottom: "3px", fontSize: "17px" }}
              />
              <input
                type="text"
                className="form-control mt-4"
                name="quantity"
                id=""
                placeholder="Enter Quantity"
                onChange={(e) => setQuantity(e.target.value)}
                style={{ height: "7vh", marginBottom: "3px", fontSize: "17px" }}
              />
              <Select
                onChange={(value) => setShipping(value)}
                className="form-select mt-3"
                placeholder="Enter Shipping"
                style={{ border: "none", fontSize: "1.7rem" }}
              >
                <Option value={1}>true</Option>
                <Option value={0}>false</Option>
              </Select>
              <Button type="submit" className="mt-3 w-100">
                {spinner ? (
                  <span
                    className="spinner-border spinner-border-lg"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "CREATE"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  #inp {
    display: none;
  }
  .img {
    width: 180px;
    height: 100px;
    margin-top: 5px;
  }
`;

export default Create_Product;
