import express from "express";
import {
  RegistationController,
  deleteUserController,
  loginController,
  protectAdminController,
  protectUserController,
  testController,
  updateProfileController,
} from "../controllers/UserController.js";

import { isAdmin, requiredSignIn } from "../middleware/AuthMiddleware.js";
import { getUserController } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/registation", RegistationController);

// get users
userRouter.get("/getUsers", requiredSignIn, isAdmin, getUserController);

userRouter.post("/login", loginController);

// update-profile
userRouter.post("/update-user", requiredSignIn, updateProfileController);

// delete User

userRouter.delete(
  "/delete-user/:id",
  requiredSignIn,
  isAdmin,
  deleteUserController
);

// protected Router
userRouter.get("/test", requiredSignIn, isAdmin, testController);

// user Protected Routes
userRouter.get("/user-protect", requiredSignIn, protectUserController);

// user Protected Routes
userRouter.get(
  "/admin-protect",
  requiredSignIn,
  isAdmin,
  protectAdminController
);

export default userRouter;
