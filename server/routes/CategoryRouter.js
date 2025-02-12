import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/CategoryController.js";
import { isAdmin, requiredSignIn } from "../middleware/AuthMiddleware.js";

const CategoryRoute = express.Router();

CategoryRoute.post(
  "/create-category",
  requiredSignIn,
  isAdmin,
  createCategoryController
);

CategoryRoute.get("/get-category", getCategoryController);

CategoryRoute.get(
  "/single-category/:id",
  requiredSignIn,
  isAdmin,
  singleCategoryController
);

CategoryRoute.put(
  "/update-category/:id",
  requiredSignIn,
  isAdmin,
  updateCategoryController
);

CategoryRoute.delete(
  "/delete-category/:id",
  requiredSignIn,
  isAdmin,
  deleteCategoryController
);

export default CategoryRoute;
