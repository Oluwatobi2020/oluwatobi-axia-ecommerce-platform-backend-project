import Category from "../schemas/categorySchema.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const user = req.user;

  console.log("userrr", user);

  if (!user) {
    res
      .status(400)
      .json({ message: "You are not authorized to access this resource" });
    return;
  }

  if (!name) {
    res.status(400).json({ message: "Please provide category name" });
    return;
  }
  try {
    const newCategory = new Category({ ...req.body, userId: user._id });
    await newCategory.save();
    res.status(201).json({ mess: "New Category created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const fetchAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};
