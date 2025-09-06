import jwt from "jsonwebtoken"
import user from "../schemas/userSchema.js"


export const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const jwtSecret = process.env.JWT_SECRET_KEY;
  if (!accessToken) {
    return res.status(401).json({ message: "Please login first" });
  }
  try {
    const decodeJwt = jwt.verify(accessToken, jwtSecret);

    if (!decodeJwt) {
      return res.status(401).json({ message: "Please login first" });
    }
    const isValidUser = await user.findById(decodeJwt.userId).select("-password")
    if(!isValidUser){
        return res.status(401).json({ message: "Unautorized user." });
    }
    req.user = isValidUser
    next()
  } catch (err) {
    res.status(400).json({responseMessage: err.message})
  }
};

