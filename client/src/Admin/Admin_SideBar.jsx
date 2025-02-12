import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const Admin_SideBar = () => {
  return (
    <Wrapper>
      <div className="list-group text-center bg-info mt-5">
        <h1 className="p-3 mt-2">Admin Panal</h1>
        <NavLink
          to="/Deshbored/admin/Create_Category"
          className="list-group-item list-group-item-action list-group-item-light"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/Deshbored/admin/Create_Product"
          className="list-group-item list-group-item-action list-group-item-light"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/Deshbored/admin/Show_Product"
          className="list-group-item list-group-item-action list-group-item-light"
        >
          Products
        </NavLink>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .list-group-item {
    font-size: 1.8rem;
  }
`;

export default Admin_SideBar;
