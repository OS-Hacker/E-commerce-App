import React from "react";
import styled from "styled-components";
import { Button } from "../style/Button";
import { useNavigate } from "react-router-dom";

const ContectGreed = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="greed-main alert alert-success">
        <div className="row">
          <div className="col-lg-3 col-md-5 col-sm-0 m-auto">
            <div className="card">
              <h1 className="card-header">Your Massage succefully sent</h1>
              <div className="card-body" style={{ textAlign: "center" }}>
                <strong>👉Thanks For Contact Us</strong> <br />
                <strong>👉{data}</strong> <br />
                <Button onClick={() => navigate("/")}>Back</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .greed-main {
    width: 100%;
    height: 100vh;
    font-size: 2.5rem;
  }
  .row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60vh;
  }

  .card-header {
    font-size: 1.5rem;
  }
`;

export default ContectGreed;
