import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// Add Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files;
    const imageUrls = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    await Product.create({ ...productData, image: imageUrls });
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error.message);

    res.json({
      message: error.message,
    });
  }
};

// Get Product : /api/product/list
export const productList = async (req, res) => {
  try {
    const proudcts = await Product.find({});
    res.json({ success: true, proudcts });
  } catch (error) {
    console.log(error.message);

    res.json({
      message: error.message,
    });
  }
};

// Get single Product : /api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);

    res.json({
      message: error.message,
    });
  }
};

// Get Product inStock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);

    res.json({
      message: error.message,
    });
  }
};
