import slugify from "slugify";
import { CategoryModel } from "../model/CategoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(402).send({
        success: false,
        msg: "Enter category",
      });
    }

    const existCategory = await CategoryModel.findOne({ name });

    if (existCategory) {
      return res.status(402).send({
        success: false,
        msg: "Category Name Allready Exist",
      });
    }

    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      msg: "category successfully created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(402).send({
      success: false,
      msg: "Something went wrong in createCategory ",
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find();

    res.status(200).send({
      success: true,
      msg: "category successfully get",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(402).send({
      success: false,
      msg: "Something went wrong in getCategory ",
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id)

    res.status(200).send({
      success: true,
      msg: "Single category successfully get",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(402).send({
      success: false,
      msg: "Something went wrong in single Category ",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    const updateData = {
      name,
      slug: slugify(name),
    };

    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).send({
      success: true,
      msg: "category successfully Update",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(402).send({
      success: false,
      msg: "Something went wrong in update Category ",
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      msg: "category successfully Delete",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(402).send({
      success: false,
      msg: "Something went wrong in delete Category ",
    });
  }
};
