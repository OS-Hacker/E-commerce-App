import React from "react";
import { Button } from "../style/Button";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {

    const Navigate = useNavigate()
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "90vh",
        marginTop: "70px",
      }}
    >
      <img
        id="img"
        src="./Images/PaymentSuccessfull.gif"
        alt="..."
        style={{ width: "400px", height: "300px" }}
      />
      <h3>Payment Successfull</h3>
      <Button className="mt-2" onClick={() => Navigate("/")}>
        Back To HomePage
      </Button>
    </div>
  );
};

export default PaymentSuccess;
