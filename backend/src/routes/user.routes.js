import express from "express"
import {
         registerUser,
         loginUser, 
         logoutUser, 
         changePassword,
         updateProfile
        } from "../controllers/user.controller.js"
 
import { jwtVerify } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

//========================Protected Routes===================
router.use(jwtVerify)

router.route("/logout").post(logoutUser)

router.route("/change-password").patch(changePassword)

router.route("profile").patch(updateProfile)

export default router