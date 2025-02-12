import * as Yup from "yup";

export const Validation = Yup.object({
  name: Yup.string().min(3).max(20).required("Please Enter Your Name"),
  email: Yup.string().email().required("Please Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password"),
  massage: Yup.string().required("Massage is required"),
});




