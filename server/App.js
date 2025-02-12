import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./db/connectdb.js";
import userRouter from "./routes/UserRouter.js";
import cors from "cors";
import CategoryRoute from "./routes/CategoryRouter.js";
import productRouter from "./routes/ProductRouter.js";
import Stripe from "stripe";

dotenv.config(); // Load environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const App = express();

// Connect to database
connectdb();

// Middleware
App.use(cors());
App.use(express.json());

// Routers
App.use(userRouter);
App.use(productRouter);
App.use(CategoryRoute);

// Multer
App.use(express.static("public/images"));

App.post("/create-payment-intent", async (req, res) => {
  const { products } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "INR",
      product_data: { name: product.name, images: [product.image] },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/failed",
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

App.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
