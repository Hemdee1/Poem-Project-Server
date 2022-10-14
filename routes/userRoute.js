import { Router } from "express";
import {
  getOwner,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import authFunction from "../middlewares/authFunction.js";
import upload from "../middlewares/userUpload.js";

const router = Router();

router.use(authFunction);

router.get("/", getOwner);

router.get("/:id", getUser);

router.post("/update", upload.single("image"), updateUser);

export default router;
