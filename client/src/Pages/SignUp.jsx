import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../style/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux-toolkit/Action";
import Spinner from "react-bootstrap/esm/Spinner";

const SignUp = ({ setModalComponente, setShowModal }) => {
  const [formData, setFormData] = useState({
    lName: "",
    email: "",
    fName: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const Dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    Dispatch(registerUser(formData));
    setShowModal(false);
  };

  const { isLoading, error, token } = useSelector((state) => state.auth);

  return (
    <Wrapper>
      <div className="main">
        <div className="form_container">
          <form className="main_form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  value={formData.fName}
                  name="fName"
                  onChange={handleChange}
                  autoFocus
                  placeholder="First Name"
                  className="inp"
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  value={formData.lName}
                  name="lName"
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="inp"
                />
              </div>
            </div>
            <input
              type="text"
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-100 inp"
            />
            <br />
            <input
              type="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter Password"
              className="inp w-100"
            />
            <textarea
              type="text"
              value={formData.address}
              name="address"
              onChange={handleChange}
              placeholder="Enter Address"
              className="w-100 inp"
            />

            <div className="d-flex justify-content-end mb-3">
              <span> Already a member ?</span>
              <NavLink
                className="ms-2"
                style={{ textDecoration: "underline" }}
                onClick={() => setModalComponente(false)}
              >
                Login
              </NavLink>
            </div>
            <Button className="w-100" type="submit">
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  form {
    font-size: 1.8rem;
  }
  .inp {
    border: none;
    outline: none;
    border-bottom: 2px solid #cfc4c4;
    margin: 10px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile_screen}) {
    input {
      width: 100%;
    }
  }
`;

export default SignUp;
