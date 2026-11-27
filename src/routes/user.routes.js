import {Router} from "express";
import { loginUser, logoutUser, registerUser,refreshAccessToken } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router()
router.route("/register").post(
    upload.fields([
        {
        name:"avatar",
        maxCount:1},
        {
            name:"coverImage",
            maxCount:1
        }

    ]),
    registerUser)
// router.route("/api/v1/login").post(login)

// http://localhost:8000/api/v1/users/register
//this is how route will work api/v1 is just standard practice


router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token")
export default router