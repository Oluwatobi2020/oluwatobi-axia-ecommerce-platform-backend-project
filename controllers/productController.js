import Category from "../schemas/categorySchema.js";
import Product from "../schemas/productSchema.js";

export const createProduct = async (req, res) => {
  const { name, price, color, size, category } = req.body;

  const user = req.user;

  const categoryDetails = await Category.findById(category);
  if (!categoryDetails) {
    return res.status(404).json({ message: "Category not found" });
  }
  if (!name || !price || !color || !size || !category) {
    res.status(400).json({ message: "Please provide all the required fields" });
    return;
  }

  try {
    const newProduct = new Product({
      ...req.body,
      userId: user._id,
      category: categoryDetails?.name,
    });
    await newProduct.save();
    res.status(201).json({ mess: "New Product created successfully", data: newProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const fetchProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
