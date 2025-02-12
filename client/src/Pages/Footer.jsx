import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <div className="main-Footer">
        <div className="container-Fluid ">
          <div className="Footer_Text ">
            <h2 className="text_2">Global-Bazaar</h2>
            <p className="para">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
              quisquam doloremque assumenda nisi hic totam?
            </p>
          </div>
          <div className="Lnks text-center text">
            <h2 className="me-5 text_2">Usefull Links</h2>
            <p>
              <Link to="#!" className="text">
                Pricing
              </Link>
            </p>
            <p>
              <Link to="#!" className="text">
                Settings
              </Link>
            </p>
            <p>
              <Link to="#!" className="text">
                Orders
              </Link>
            </p>
            <p>
              <Link to="#!" className="text">
                Help
              </Link>
            </p>
          </div>

          <div className="Products text-center">
            <h2 className="text-center text_2">Products</h2>
            <p>
              <Link to="#!" className="text">
                Angular
              </Link>
            </p>
            <p>
              <Link to="#!" className="text">
                Vue
              </Link>
            </p>
            <p>
              <Link to="#!" className="text">
                React
              </Link>
            </p>
            <p>
              <Link to="#!" className="text">
                Laravel
              </Link>
            </p>
          </div>

          <div className="flex2">
            <div className="Main_Link">
              <p>
                <Link to="#!" className="text">
                  <i className="bi bi-instagram"></i>
                </Link>
              </p>
              <p>
                <Link to="#!" className="text">
                  <i className="bi bi-whatsapp"></i>
                </Link>
              </p>
              <p>
                <Link to="#!" className="text">
                  <i className="bi bi-github"></i>
                </Link>
              </p>
              <p>
                <Link to="#!" className="text">
                  <i className="bi bi-linkedin"></i>
                </Link>
              </p>

              <p>
                <Link to="#!" className="text">
                  <i className="bi bi-twitter"></i>
                </Link>
              </p>
            </div>

            <div className="Icons text-center">
              <img src="/Images/Clean.png" className="Clean" alt="Clean" />

              <img
                src="/Images/recycale.jpg"
                className="recycle"
                alt="recycle"
              />

              <span className="shop">🏪</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  .main-Footer {
    width: 100%;
    height: 40vh;
  }

  .text_2 {
    width: 320px;
    color: #f6f8fa;
    text-transform: uppercase;
    font-family: cursive;
  }

  .text:hover {
    color: #4fe770;
  }

  .text {
    width: 320px;
    color: #f6f8fa;
    text-transform: uppercase;
    font-family: cursive;
  }

  .para {
    font-size: 1.7rem;
    width: 320px;
    color: #f6f8fa;
    font-family: cursive;
  }

  p {
    margin: 20px 0px;
  }

  .container-Fluid {
    font-size: 1.7rem;
    height: 40vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #181d2c;
    color: #f6f8fa;
  }

  .Main_Link {
    font-size: 3rem;
    display: flex;
    /* padding: 1rem 0px; */
  }

  .bi {
    padding: 1rem;
    font-size: 3rem;
    cursor: pointer;
    margin: 3rem 1rem;
  }

  .bi:hover {
    border-radius: 30%;
    box-shadow: 2px 5px 10px 5px #888888;
  }

  .Clean {
    border-radius: 50%;
    width: 9rem;
    height: 9rem;
  }

  .recycle {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    margin-left: 2rem;
  }
  .shopping {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    /* margin: 2rem; */
  }

  .flex2 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .shop {
    font-size: 4rem;
    position: relative;
    top: 10px;
    left: 8px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile_screen}) {
    .container-Fluid {
      flex-direction: column;
      height: auto;
      text-align: center;
      padding-bottom: 10px;
    }

    .Clean {
      border-radius: 50%;
      width: 5rem;
      height: 5rem;
    }

    .recycle {
      width: 5rem;
      height: 5rem;
    }
    .shopping {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
    .shop {
      font-size: 3rem;
      margin-left: 10px;
    }

    .bi {
      padding: 1rem;
      font-size: 3rem;
      cursor: pointer;
      margin: 0.5rem 0.5rem;
    }
  }
`;

export default Footer;
