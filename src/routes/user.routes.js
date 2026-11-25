import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";

const router=Router()
router.route("/register").post(registerUser)
// router.route("/api/v1/login").post(login)

// http://localhost:8000/api/v1/users/register
//this is how route will work api/v1 is just standard practice



export default router