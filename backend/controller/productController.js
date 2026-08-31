import mongoose from "mongoose";
import Product from "../models/productModel.js";
import errorHandler from "../helper/handleError.js";

const validateProductId = (id, next) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new errorHandler("Invalid product ID", 400));
  }
  return true;
};

//create product to DB
export const addProduct = async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//update product in DB
export const updateProduct = async (req, res, next) => {
  const id = req.params.id;

  if (!validateProductId(id, next)) {
    return;
  }

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return next(new errorHandler("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return next(err);
  }
};

//delete product from DB
export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;

  if (!validateProductId(id, next)) {
    return;
  }

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return next(new errorHandler("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    return next(err);
  }
};

//get all products from DB
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

//get single product from db using id
export const getSingleProduct = async (req, res, next) => {
  const id = req.params.id;

  if (!validateProductId(id, next)) {
    return;
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return next(new errorHandler("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return next(err);
  }
};
