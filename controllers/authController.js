import getToken from "../jwt/getToken.js";
import User from "../schemas/userSchema.js";
import bcrypt from "bcryptjs";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please provide all the required fields" });
    return;
  }

  try {
    const isUserValid = await User.findOne({ email });
    if (!isUserValid)
      return res
        .status(400)
        .json({ message: "User does not exist. Please sign up" });
    const isValidPassword = await bcrypt.compare(
      password,
      isUserValid.password
    );
    if (!isValidPassword)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect." });

    const token = getToken(isUserValid._id);

    return res
      .cookie("accessToken", token, { httpOnly: true, sameSite: "strict" })
      .status(200)
      .json({ message: "Login Successful!", data:isUserValid });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userLogout = async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET_KEY;
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: jwtSecret,
      path: "/",
    })
    .status(200)
    .json({ message: "Logout Successful!" });
};
