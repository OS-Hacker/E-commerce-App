import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSimilarProduct,
  searchFilterController,
  singleProductController,
  updateProductController,
  upload,
} from "../controllers/ProductController.js";
import { isAdmin, requiredSignIn } from "../middleware/AuthMiddleware.js";

const ProductRoute = express.Router();

ProductRoute.get("/get-product", getProductController);

ProductRoute.get("/single-product/:slug", singleProductController);

ProductRoute.post(
  "/create-product",
  upload.single("img"),
  requiredSignIn,
  isAdmin,
  createProductController
);

ProductRoute.put(
  "/update-product/:id",
  upload.single("img"),
  requiredSignIn,
  isAdmin,
  updateProductController
);

ProductRoute.delete(
  "/delete-product/:id",
  upload.single("img"),
  requiredSignIn,
  isAdmin,
  deleteProductController
);

ProductRoute.get("/search-filter/:keyword", searchFilterController);

ProductRoute.get("/similar-product/:pId/:cId", getSimilarProduct);

export default ProductRoute;
