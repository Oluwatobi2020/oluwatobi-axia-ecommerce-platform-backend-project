import User from "../schemas/userSchema.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields" });
  }
  try {
    const emailExist = await User.findOne({ email });
    if (emailExist)
      return res.status(400).json({ message: "Email already exist!" });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully!", data: user });
  } catch (err) {
    console.log(err);
  }
};

export const getAllUser = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

export const updateAUser = async (req, res) => {
  const { userId } = req.params;
  const updatedData = req.body;
  try {
    const searchUserId = await User.findById(userId);
    if (!searchUserId) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateRes = await User.findByIdAndUpdate(userId, updatedData);

    res.json({ message: "User updated successfully" }).send(updateRes);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// export const deleteAUser = async (req, res) => {
//   const { userId } = req.params;
//   const updatedData = req.body;
//   try {
//     const searchUserId = await User.findById(userId);
//     if (!searchUserId) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const deleteRes = await User.findByIdAndDelete(userId, updatedData);

//     res.json({ message: "User deleted successfully" }).send(deleteRes);
//   } catch (err) {
//     res.status(400).json({ message: "Update failed", error: err.message });
//   }
// };

export const deleteAUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this user" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
