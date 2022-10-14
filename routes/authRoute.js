import { Router } from "express";
import { LogIn, SignUp } from "../controllers/authController.js";

const router = Router();

router.post("/signup", SignUp);

router.post("/login", LogIn);

export default router;
