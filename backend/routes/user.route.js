import express from "express";
import { login, logout, register, updateProfile,  forgotPassword,
  resetPassword , getUserById} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').post(resetPassword); 
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile); 
router.route("/:id").get(getUserById);
export default router;

