import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// hesh password
export const heshPass = async (password) => {
  try {
    const salt = 10;
    const heshPassword = await bcrypt.hash(password, salt);
    return heshPassword;
  } catch (error) {
    console.log(error);
  }
};

// compare password
export const comparePass = async (password, ExistUserPass) => {
  try {
    const comparePassword = await bcrypt.compare(password, ExistUserPass);
    return comparePassword;
  } catch (error) {
    console.log(error);
  }
};

export const Token = async (user) => {
  try {
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
