import React, { useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { Button } from "../style/Button";
import Map from "./Map";
import { Validation } from "./Validation";

const ContectForm = ({ Myform, userName }) => {
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: { name: "", email: "", password:"", massage: "" },
      validationSchema: Validation,
      onSubmit: (values) => {
        Myform(true);
        userName(values.name);
      },
    });

  //  show/hide password

  const [showpass, setShowpass] = useState(false);

  return (
    <Wrapper>
      <div className="Form-Main mb-5">

        {/* map  */}

        <Map />

        <div className="row mx-4">
          <div className="col-md-5 gx-4 m-auto mt-5">
            <div className="card">
              <form onSubmit={handleSubmit}>
                <div className="form-floating  mt-3 mx-3 ">
                  <input
                    type="Name"
                    className="form-control"
                    id="Name"
                    placeholder="Password"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="Name">Name</label>
                </div>
                {touched.name && errors.name ? (
                  <span className="text-danger mt-3">{errors.name}</span>
                ) : null}

                <br />
                <div className="form-floating mx-3 ">
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="Email">Email</label>
                </div>

                {touched.email && errors.email ? (
                  <span className="text-danger mt-3">{errors.email}</span>
                ) : null}

                <br />
                <div className="form-floating mx-3 pass">
                  <input
                    type={showpass ? "text" : "password"}
                    className="form-control"
                    id="Password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span
                    className="I-logo"
                    onClick={() => setShowpass(!showpass)}
                  >
                    {showpass ? (
                      <i className="bi bi-eye-slash-fill"></i>
                    ) : (
                      <i className="bi bi-eye-fill"></i>
                    )}
                  </span>
                  <label htmlFor="Password">Password</label>
                </div>

                {touched.password && errors.password ? (
                  <span className="text-danger mt-3">{errors.password}</span>
                ) : null}
                <br />
                <label htmlFor="Address" className="ms-3">Address</label>
                <div className="form-floating mx-3">
                  <textarea
                    className="form-control"
                    id="Massage"
                    placeholder="Address"
                    rows="10"
                    cols="40"
                    name="massage"
                    value={values.massage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
                </div>
                {touched.massage && errors.massage ? (
                  <span className="text-danger mt-3">{errors.massage}</span>
                ) : null}
                <br />
                <Button className=" w-100 my-3" type="submit">
                  Sent
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .Form-Main {
    width: 100%;
    height: 100%;
    background-color: #fcfbfb;
  }

  .card {
    box-shadow: 1.2rem 1rem 0.8rem 1rem #888888;
    padding: 1rem;
  }

  .form-control {
    height: 5rem;
    font-size: 1.9rem;
  }

  label {
    font-size: 1.7rem;
  }

  span {
    margin: 1rem 0rem;
    font-size: 1.5rem;
    margin-left: 1rem;
  }

  .pass {
    position: relative;
  }

  .I-logo {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    cursor: pointer;
  }

  .bi-eye-slash-fill,
  .bi-eye-fill {
    font-size: 2rem;
    color: #292727;
  }
`;

export default ContectForm;
