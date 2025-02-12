import slugify from "slugify";
import { productModel } from "../model/ProdutcModel.js";
import multer from "multer";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, category, shipping } = req.body;

    if (!name) {
      return res.status(402).send({ success: false, msg: "Name is required" });
    }
    if (!description) {
      return res
        .status(402)
        .send({ success: false, msg: "Description is required" });
    }
    if (!price) {
      return res.status(402).send({ success: false, msg: "Price is required" });
    }
    if (!quantity) {
      return res
        .status(402)
        .send({ success: false, msg: "Quantity is required" });
    }
    if (!category) {
      return res
        .status(402)
        .send({ success: false, msg: "Category is required" });
    }
    if (!shipping) {
      return res
        .status(402)
        .send({ success: false, msg: "Shipping is required" });
    }

    const product = await new productModel({
      ...req.body,
      slug: slugify(req.body.name),
      image: req.file.filename,
    }).save();

    res.status(201).send({
      success: true,
      msg: "producr successfully createed",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(401).send({
      success: false,
      msg: "Error in create product ",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const product = await productModel.find().populate("category");

    res.status(200).send({
      success: true,
      msg: "producr successfully get",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: "Error in get product",
      error,
    });
  }
};

export const singleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug });
    // .populate("category");

    res.status(200).send({
      success: true,
      msg: "single Product successfully get",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: "Error in single product ",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const existUser = await productModel.findById(req.params.id);

    await delete existUser.img;

    // console.log(req.file);

    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
    };

    if (req.file) {
      const img = req.file.filename;
      updateData.img = img;
    }

    const product = await productModel.findByIdAndUpdate(
      existUser,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: "Product Successfully Updated",
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductController = async (req, res) => {
  try {
    //  product data delete
    const product = await productModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      msg: "product successfully deleted",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: "Error in Delete product ",
      error,
    });
  }
};

// multer image uplode

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = multer({ storage: storage });

// Search Filter

export const searchFilterController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resalt = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    res.send(resalt);
    console.log(resalt);
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: "Error in search filter product",
      error,
    });
  }
};

// get Similer Product

export const getSimilarProduct = async (req, res) => {
  try {
    const { pId, cId } = req.params;

    const product = await productModel
      .find({
        category: cId,
        _id: { $ne: pId },
      })
      .limit(4)
      .populate("category");

    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

// import { productModle } from "../modules/ProductModle.js";
// import slugify from "slugify";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "dzqxjwoy6",
//   api_key: "952824576935937",
//   api_secret: "yKjzm0_4HAZq9zkYtH2mrnFX374",
// });

// export const createProductController = async (req, res) => {
//   try {
//     const { title, description, price, quantity, category, shipping } =
//       req.fields;

//     const { image } = req.files;

//     const resalt = await cloudinary.uploader.upload(image.path);

//     const product = await productModel.create({
//       ...req.fields,
//       slug: slugify(req.fields.title),
//       image: resalt.url,
//       cloudinary_id: resalt.public_id,
//     });

//     res.status(201).send({
//       success: true,
//       msg: "producr successfully createed",
//       product,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(401).send({
//       success: false,
//       msg: "Error in create product ",
//       error,
//     });
//   }
// };

// export const getProductController = async (req, res) => {
//   try {
//     const product = await productModle.find().populate("category");

//     res.status(200).send({
//       success: true,
//       msg: "producr successfully get",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       msg: "Error in get product ",
//       error,
//     });
//   }
// };

// export const singleProductController = async (req, res) => {
//   try {
//     const product = await productModle.findOne({ slug: req.params.slug });

//     res.status(200).send({
//       success: true,
//       msg: "single Product successfully get",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       msg: "Error in single product ",
//       error,
//     });
//   }
// };

// export const updateProductController = async (req, res) => {
//   try {

//     //  delete cloudinary image
//     cloudinary.uploader.destroy(Existproduct.cloudinary_id);

//     // new uplode image
//     const resalt = await cloudinary.uploader.upload(req.files.image.path);


//     const updateData = {
//       ...req.fields,
//       slug: slugify(req.fields.title),
//       cloudinary_id: resalt.public_id || Existproduct.public_id,
//       image: resalt.url || Existproduct.url,
//     };

//     const product = await productModle.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     res.status(200).send({
//       success: true,
//       msg: "product successfully updateed",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       msg: "Error in Update product ",
//       error,
//     });
//   }
// };

// export const deleteProductController = async (req, res) => {
//   try {
//     //  product data delete
//     const product = await productModle.findByIdAndDelete(req.params.id);

//     // product image delete
//     await cloudinary.uploader.destroy(product.cloudinary_id);

//     res.status(200).send({
//       success: true,
//       msg: "product successfully deleted",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       msg: "Error in Delete product ",
//       error,
//     });
//   }
// };
