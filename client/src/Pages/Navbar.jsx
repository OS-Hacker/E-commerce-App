import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import SignUp from "./SignUp";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Tooltip } from "antd";

const Navbar = () => {
  const Navstyle = ({ isActive }) => {
    return {
      color: isActive ? "#833bda" : "black",
      fontSize: isActive ? "2.1rem" : "2rem",
      fontWeight: isActive ? "bold" : "",
      textDecoration: isActive ? "underline" : "none",
    };
  };

  // responsive navbar

  const [isMobail, setIsMobail] = useState(false);

  // Modal

  const [showModal, setShowModal] = useState(false);

  const [modalComponente, setModalComponente] = useState(false);

  // send token in headers by Default

  const { token, user } = useSelector((state) => state?.auth);

  // verify token
  // if token is exist then send token to the server inside the headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
  }, [token]);

  // toltip

  const [arrow, setArrow] = useState("Show");

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  // Logout

  // const Navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    toast.success("Logout Successfully", {
      position: "bottom-left",
    });
    body.relode();
  };

  // Dropdown

  const drop_style = {
    fontSize: "1.8rem",
    fontWeight: "600",
    fontFamily: "cursive",
  };

  const items = [
    {
      label: (
        <NavLink
          style={drop_style}
          rel="noopener noreferrer"
          to={`/Deshbored/${user?.role === 1 ? "admin" : "user"}`}
        >
          {user?.role === 1 ? "Deshbored" : "Profile"}
        </NavLink>
      ),
      key: "1",
      icon: "👤",
    },
    {
      label: (
        <NavLink
          rel="noopener noreferrer"
          style={drop_style}
          onClick={logoutHandler}
        >
          Logout
        </NavLink>
      ),
      key: "3",
      icon: <LogoutOutlined className="icon" style={{ fontSize: "2rem" }} />,
    },
  ];

  const menuProps = {
    items,
  };

  const { cartProduct } = useSelector((state) => state?.cartData);

  return (
    <Wrapper>
      <div className="Navbar">
        <div className="Main_logo">
          <h4 className="Logo-Size">
            🛍️<span style={{ fontFamily: "cursive" }}>Global</span>-
            <span className="text-danger" style={{ fontFamily: "cursive" }}>
              Bazaar🛒
            </span>
          </h4>
        </div>
        <ul
          className={isMobail ? "Mobile_nav-Links" : "nav-Links"}
          onClick={() => setIsMobail(false)}
        >
          <li>
            <NavLink to="/" className="Links" style={Navstyle}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/About" className="Links" style={Navstyle}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/Contect" className="Links" style={Navstyle}>
              Contact
            </NavLink>
          </li>

          <li>
            <NavLink to="/Product" className="Links" style={Navstyle}>
              Product
            </NavLink>
          </li>

          <div className="trolly">
            <NavLink to="/Cart">
              <i className="bi bi-cart4"></i>
              <span className="number">{cartProduct?.length}</span>
            </NavLink>
          </div>
        </ul>

        <li>
          {!user ? (
            <Tooltip
              placement="bottom"
              title={"Login"}
              color="#833bda"
              arrow={mergedArrow}
            >
              <NavLink className="login" onClick={() => setShowModal(true)}>
                Login
              </NavLink>
            </Tooltip>
          ) : (
            <Dropdown.Button
              menu={menuProps}
              icon={
                <UserOutlined
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: "900",
                    color: "green",
                  }}
                />
              }
            >
              <strong className="user_name">
                {user.fName[0].toUpperCase() + user.fName.slice(1)}
              </strong>
            </Dropdown.Button>
          )}
        </li>

        {/* toggle mobail Icons */}

        <div className="mobail_icons" onClick={() => setIsMobail(!isMobail)}>
          {isMobail ? <RxCross2 /> : <FaBars />}
        </div>
      </div>

      {/* Modal */}

      <Modal
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowModal(false)}
        animation={true}
      >
        <Modal.Header closeButton style={{ position: "relative" }}>
          <Modal.Title
            className="fs-2"
            style={{ position: "absolute", left: "40%", fontWeight: "600" }}
          >
            {modalComponente ? "SIGNIN" : "LOGIN"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalComponente ? (
            <SignUp
              setModalComponente={setModalComponente}
              setShowModal={setShowModal}
            />
          ) : (
            <Login
              setModalComponente={setModalComponente}
              setShowModal={setShowModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.section`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .Main_logo {
    cursor: pointer;
    transition: all 0.5s ease;
  }

  .Main_logo:hover {
    transform: scale(1.1);
  }

  .Logo-Size {
    font-size: 2.5rem;
    text-decoration: underline;
    font-weight: 600;
  }

  .Navbar {
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    padding: 0rem 5rem;
    /* background-color: #f1f3fa; */
    background-color: #f1f3fa;
    z-index: 999999 !important;
    /* position: fixed; */
  }

  .nav-Links {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
  }

  .nav-Links li {
    list-style-type: none;
  }

  .Links {
    text-decoration: none;
    margin: 0rem 1.5rem;
    font-size: 2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color.text};
  }

  .Mobile_Icons {
    display: none;
    z-index: 99999;
  }

  .trolly {
    font-size: 2.5rem;
    color: white;
    position: relative;
    color: black;
    display: grid;
    text-align: center;
  }

  .number {
    position: absolute;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 2rem;
    background-color: ${({ theme }) => theme.color.main};
    font-size: 1.8rem;
    color: white;
    left: 2rem;
    bottom: 2rem;
  }

  .first {
    width: 40px;
    font-weight: 900;
    font-size: 2rem;
    border: 2px solid black;
    padding: 5px;
    border-radius: 50%;
  }

  .login {
    border: 2px solid #bc86fd;
    font-weight: bold;
    background-color: #bc86fd;
    font-size: 1.9rem;
    padding: 5px;
    border-radius: 5px;
    color: white;
    transition: ease-in-out 0.5s;
  }

  .login:hover {
    box-shadow: 1px 2px 1px #a98ace;
    transition: ease-in-out 0.8s;
  }

  .first:hover {
    box-shadow: 1px 2px 3px 1px #a98ace;
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.main};
  }

  .mobail_icons {
    font-size: 20px;
    font-weight: 600;
    display: none;
  }

  .user_name {
    font-size: 2.2rem;
    padding: 4px;
    position: relative;
    bottom: 4px;
    font-family: cursive;
  }

  .drop-items {
    font-size: 1.8rem;
    font-weight: 600;
  }

  // sticky navbar style

  .btn {
    font-size: 2rem;
    margin-bottom: 4px;
    font-weight: 600;
    font-family: cursive;
    z-index: 999999 !important;
  }

  .zIndex {
    z-index: 999999 !important;
  }

  .dropdown-item {
    font-size: 1.7rem;
    z-index: 999999 !important;
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile_screen}) {
    .nav-Links {
      display: none;
    }

    .mobail_icons {
      display: block;
    }

    .Navbar {
      padding: 0rem 2rem;
    }

    .Mobile_nav-Links {
      position: absolute;
      top: 9vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #f1f3fa;
      left: 0;
      text-align: center;
      width: 100%;
      height: 100%;
      overflow: hidden;
      transition: 0.9s ease;
      z-index: 999999;
      transition: 0.8s;
    }

    li {
      padding: 2rem 0rem;
      list-style-type: none;
    }

    .shopping-trolly {
      cursor: pointer;
    }

    .Mobile_Icons {
      display: block;
      font-size: 4rem;
      font-weight: 800;
    }

    .Logo-Size {
      font-size: 2rem;
    }
  }
`;
