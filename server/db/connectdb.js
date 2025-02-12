import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
    });
    console.log("db successfully connected");
  } catch (error) {
    console.log(error);
  }
};
