import express from "express";
import {
  addComment,
  checkRead,
  deletePoem,
  getPoem,
  getPoems,
  likePost,
  postPoem,
  updatePoem,
} from "../controllers/postController.js";
import authFunction from "../middlewares/authFunction.js";
import upload from "../middlewares/fileUpload.js";

const router = express.Router();

router.use(authFunction);

router.get("/", getPoems);

router.post("/", upload.single("image"), postPoem);

router.get("/:id", getPoem);

router.delete("/:id", deletePoem);

router.post("/update/:id", upload.single("image"), updatePoem);

router.post("/comment/:id", addComment);

router.post("/like/:id", likePost);

router.get("/read/:id", checkRead);

export default router;
