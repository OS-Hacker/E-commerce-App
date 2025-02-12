import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export const CategoryModel = mongoose.model("category", CategorySchema);
