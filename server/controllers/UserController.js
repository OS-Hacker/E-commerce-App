import { Token, comparePass, heshPass } from "../helper/userAuth.js";
import { userModel } from "../model/UserModel.js";

export const RegistationController = async (req, res) => {
  try {
    const { fName, lName, email, password, address } = req.body;

    if (!fName || !lName || !email || !password || !address) {
      return res.status(402).send({
        success: false,
        msg: "All Fileds Required",
      });
    }

    // Already Exist User

    const ExistUser = await userModel.findOne({ email });

    if (ExistUser) {
      return res.status(401).send({
        success: false,
        msg: "User Already Exist",
      });
    }

    // hesh password

    const heshedPass = await heshPass(password);

    const user = await new userModel({
      fName,
      lName,
      email,
      password: heshedPass,
      address,
    }).save();

    return res.status(201).send({
      success: true,
      msg: "Registration Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      msg: "Registration Failed Try Again",
    });
  }
};

export const getUserController = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).send({
      success: true,
      msg: "users successfully get",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: "Error in get users",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(402).send({
        success: false,
        msg: "All Fileds Required",
      });
    }

    // check Email

    const registerUser = await userModel.findOne({ email });

    if (!registerUser) {
      return res.status(401).send({
        success: false,
        msg: "Invalid Email & Password",
      });
    }

    // check password

    const matchPassword = await comparePass(password, registerUser.password);

    if (!matchPassword) {
      return res.status(401).send({
        success: false,
        msg: "Invalid Email & Password",
      });
    }

    // add token
    const token = await Token(registerUser);

    res.status(201).send({
      success: true,
      msg: "Login Successfully",
      user: {
        fName: registerUser.fName,
        lName: registerUser.lName,
        email: registerUser.email,
        address: registerUser.address,
        role: registerUser.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      msg: "Login Failed Try Again",
    });
  }
};

// UPDATE PROFILE DATA
export const updateProfileController = async (req, res) => {
  try {
    const { fName, lName, email, address } = req.body;

    const user = await userModel.findById(req.user._id);

    const updateUserProfile = await userModel.findByIdAndUpdate(
      user._id,
      {
        fName: fName || user.fName,
        lName: lName || user.lName,
        email: email || user.email,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      msg: "Profile Successfully Updateed",
      updateUserProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      msg: "Something Went Wrong Profile",
      error,
    });
  }
};

//  protected Routes
export const testController = async (req, res) => {
  res.send("protected Routes");
};

// USER PROTECT ROUTES

export const protectUserController = async (req, res, next) => {
  try {
    await res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// ADMIN PROTECT ROUTE
export const protectAdminController = async (req, res, next) => {
  try {
    await res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteUserController = async (req, res) => {
  try {
    //  product data delete
    const user = await userModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      msg: "user successfully deleted",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: "Error in Delete user ",
      error,
    });
  }
};
