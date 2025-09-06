import router from "express"
import {userLogin, userLogout} from "../controllers/authController.js"


const AuthRouter = router()
  .post("/user/login", userLogin)
  .post("/user/logout", userLogout)

export default AuthRouter
