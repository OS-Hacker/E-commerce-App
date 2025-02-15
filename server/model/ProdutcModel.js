import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "category",
    required: true,
  },
  shipping: {
    type: Boolean,
    required: true,
  },
});

export const productModel = mongoose.model("product", productSchema);
