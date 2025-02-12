import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import INR from "../components/INR";
import Empty_cart from "../components/Empty_cart";
import Scrollbars from "react-custom-scrollbars-2";
import { getCartTotal } from "../redux-toolkit/CartSlice";
import Cart_Page from "../components/Cart_Page";
import { useEffect } from "react";
import { Button } from "./../style/Button";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const Cart = () => {
  const { TotalQuntaity, TotalPrice, cartProduct } = useSelector(
    (state) => state?.cartData
  );

  console.log(cartProduct);

  const goproduct = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartProduct, dispatch]);

  const { user, token } = useSelector((state) => state?.auth);

  // payment getway
  const handlePay = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

      if (!stripe) {
        console.error("Stripe failed to load");
        return;
      }

      const body = {
        products: cartProduct,
      };

      // Send the payment details to your server to create a Payment Intent
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        console.error("Failed to create payment intent:", response.statusText);
        return;
      }

      const session = await response.json();

      if (!session.id) {
        console.error("Failed to retrieve session ID:", session);
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log("[PaymentIntent Error]", result.error.message);
      } else {
        console.log("[PaymentIntent Success]", result);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <Wrapper>
      {cartProduct?.length === 0 ? (
        <Empty_cart />
      ) : (
        <div
          className="container mt-5 mb-5"
          style={{ backgroundColor: "#f2f2f3" }}
        >
          <div className="back_logo">
            <i
              className="bi bi-arrow-left-circle-fill"
              id="goback"
              onClick={() => goproduct(-1)}
            ></i>
          </div>

          <h2 style={{ position: "relative", left: "50px", top: "40px" }}>
            Shopping Cart
          </h2>
          <h4
            style={{
              position: "relative",
              left: "50px",
              top: "40px",
              color: "GrayText",
            }}
          >
            Deselect all items
          </h4>

          <hr style={{ marginTop: "50px" }} />

          <div className="main">
            <Scrollbars style={{ width: 800, height: 400 }}>
              <div className="cart_pro">
                {cartProduct?.map((products) => {
                  return <Cart_Page products={products} key={products._id} />;
                })}
              </div>
            </Scrollbars>
            <div className="col-lg-3  columns">
              <div className="card mt-2 mb-4">
                <div className="card-header py-3 ">
                  <h3 className="mb-0">Summary</h3>
                </div>
                <div className="card-body w-100">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      <h3>TotalQuantity</h3>
                      <h3>{TotalQuntaity}</h3>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <h3>Subtotal</h3>
                      <h3>{<INR price={TotalPrice} />}</h3>
                    </li>
                  </ul>
                  <div className="text-center ">
                    {token ? (
                      <Button className="w-75" onClick={handlePay}>
                        checkout
                      </Button>
                    ) : (
                      <Button
                        className="w-75"
                        onClick={() =>
                          toast("Please Login", { position: "bottom-right" })
                        }
                      >
                        checkout
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-wrap: wrap;
    padding: 1rem 0rem;
  }

  .container {
    border-start-start-radius: 2rem;
    border-start-end-radius: 2rem;
  }

  .cart_pro {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .back_logo {
    width: 2rem;
    height: 0rem;
  }

  #goback {
    font-size: 4rem;
    cursor: pointer;
    color: #9a9fa5;
  }

  #goback:hover {
    font-size: 4rem;
    transform: scale(1.1);
    color: #36383b;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile_screen}) {
    .columns {
      width: 80%;
    }
  }
`;

export default Cart;
