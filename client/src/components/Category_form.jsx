import React, { useState } from "react";
import styled from "styled-components";

const Category_form = ({ handleSubmit, value, setChange }) => {
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div className="parent_div">
          <input
            type="text"
            className="form-control"
            name=""
            id="inp"
            value={value}
            placeholder="Enter Category"
            autoComplete="off"
            onChange={(e) => setChange(e.target.value)}
            style={{ height: "6vh", marginBottom: "3px", fontSize: "16px" }}
          />
          <button
            type="submit"
            className="btn btn-primary text-uppercase ms-2 mb-1 p-2 mt-2"
            style={{ fontSize: "14px" }}
          >
            Update
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`

  button {
    border-radius: 10%;
    padding: 7px;
  }
`;

export default Category_form;
