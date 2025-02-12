import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../style/Button";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux-toolkit/Action";
import Spinner from "react-bootstrap/Spinner";

const Login = ({ setModalComponente, setShowModal }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

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

  const submitHandler = (e) => {
    e.preventDefault();
    Dispatch(loginUser(formData));
    setShowModal(false);
  };

  const { isLoading, error } = useSelector((state) => state?.auth);

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={formData.email}
          name="email"
          onChange={handleChange}
          className="w-100 inp"
          placeholder="Enter Email"
          autoComplete="off"
          autoFocus
        />
        <br />
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          className="w-100 inp"
          placeholder="Enter Password"
        />
        <div className="d-flex justify-content-end mb-3">
          <span className="me-2"> Not registered? </span>
          <NavLink
            className=""
            style={{ textDecoration: "underline" }}
            onClick={() => setModalComponente(true)}
          >
            Create An Account
          </NavLink>
        </div>
        <Button type="submit" className="w-100 ml-5">
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="lg"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Login"
          )}
        </Button>
      </form>
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
    width: 440px;
  }
`;

export default Login;
