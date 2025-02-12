import { useNavigate } from "react-router-dom";
import { Button } from "../style/Button";

const PaymentFailed = () => {
  const Navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "90vh",
      }}
    >
      <img
        src="./Images/paymentFailed.png"
        alt="FailedImg"
        style={{ marginTop: "30px" }}
      />

      <Button
        style={{ position: "relative", bottom: "115px" }}
        onClick={() => Navigate("/")}
      >
        Back to HomePage
      </Button>
    </div>
  );
};

export default PaymentFailed;
