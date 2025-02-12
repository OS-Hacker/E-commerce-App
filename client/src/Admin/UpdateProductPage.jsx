import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../style/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProductPage = () => {
  const { slug } = useParams();

  const [img, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [singleImage, setSingleImage] = useState("");
  const [singleId, setSingleId] = useState("");

  const navigate = useNavigate();

  // Function to handle image selection
  const selectImage = (e) => {
    setImage(e.target.files[0]);
  };

  // Function to fetch single product data
  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/single-product/${slug}`
        );

        const { name, description, price, category, quantity, img, _id } =
          data?.product;

        setName(name);
        setDescription(description);
        setPrice(price);
        setCategory(category);
        setQuantity(quantity);
        setSingleImage(img);
        setSingleId(_id);
        setImage(""); // Reset img state
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    getSingleProduct();
  }, [slug]);

  // Function to handle product update
  const updateHandler = async (e) => {
    e.preventDefault();

    if (!name || !price || !quantity) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("img", img);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);

      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/update-product/${singleId}`,
        formData
      );

      if (data?.success) {
        toast.success(data.msg, {
          position: "bottom-left",
        });
        navigate("/Dashboard/admin/Show_Product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error?.response?.data.msg);
    }
  };

  return (
    <Wrapper>
      <div className="container my-5">
        <form
          onSubmit={updateHandler}
          encType="multipart/form-data"
          className="shadow-lg p-4"
        >
          <h2 className="text-center text-uppercase">Update Product</h2>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title"
                name="title"
                value={name}
                id="input"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="price"
                value={price}
                placeholder="Enter Price"
                id="input"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <br />
          <input
            type="text"
            className="form-control"
            name="desc"
            value={description}
            placeholder="Enter Description"
            id="input"
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="My-File" className="parint" name="image">
            {img ? (
              <img
                src={URL.createObjectURL(img)}
                className="image"
                alt="Uploaded"
              />
            ) : (
              singleImage && (
                <img src={singleImage} alt="Existing" className="image" />
              )
            )}
          </label>
          <input
            type="file"
            className="form-control file_style"
            name="image"
            id="My-File"
            accept="image/*"
            hidden
            onChange={selectImage}
          />
          <br />
          <input
            type="text"
            className="form-control"
            value={category}
            name="category"
            placeholder="Enter Category"
            id="input"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <input
            type="text"
            className="form-control"
            value={quantity}
            name="quantity"
            placeholder="Enter Quantity"
            id="input"
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <Button className="mt-3 w-100" type="submit">
            Update
          </Button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  section {
    width: 100%;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 85vh;
    width: 100%;
  }
  #input {
    height: 6vh;
    font-size: 1.7rem;
  }

  form {
    width: 500px;
  }
  .file_style {
    width: 50%;
    height: 6vh;
    font-size: 1.6rem;
  }

  .file_Icon {
    cursor: pointer;
  }

  .uplode_file_container {
    display: flex;
    justify-content: space-around;
    gap: 30px;
    align-items: center;
  }

  .parint {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 0px;
    cursor: pointer;
  }

  .bi-image {
    font-size: 50px;
    color: #082608;
    margin-bottom: 0px;
  }

  .image {
    width: 200px;
    height: 120px;
    z-index: 9999;
    margin-top: 20px;
    margin: 0px;
  }

  @media (max-width: 700px) {
    form {
      width: 100%;
    }
  }
`;

export default UpdateProductPage;
