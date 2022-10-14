import { unlink } from "fs";
import mongoose from "mongoose";
import AuthModel from "../models/authModel.js";
import postModel from "../models/postModel.js";
import fs from "fs";

const getPoems = async (req, res) => {
  const data = await postModel.find().sort({ createdAt: -1 });

  res.json(data);
};

const getPoem = async (req, res) => {
  // const id = mongoose.Types.ObjectId(req.params.id.trim());
  const id = req.params.id;

  if (id === undefined) return;

  const data = await postModel.findById(id);

  if (!data) {
    res.status(401).json({ error: "There is no poem of such" });
  }
  res.json(data);
};

const postPoem = async (req, res) => {
  const body = req.body;
  const image = req.file.path;
  const user_id = req.user_id;

  const user = await AuthModel.findById(user_id);

  const user_penName = user.penName ? user.penName : "";
  const user_image = user.image ? user.image : "";

  try {
    const data = await postModel.create({
      ...body,
      image,
      user_id,
      user_penName,
      user_image,
    });

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePoem = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  const data = await postModel.findByIdAndDelete(id);

  // delete the image
  const filepath = data.image;
  unlink(filepath, () => {
    console.log("file deleted");
  });

  res.json(data);
};

const updatePoem = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());
  const body = req.body;

  const post = await postModel.findById(id);

  let image = post.image;

  if (req.file) {
    // delete previous image
    const filepath = post.image;

    fs.unlink(filepath, () => {
      console.log("file deleted");
    });

    image = req.file.path;
  }

  const newPost = { ...post._doc, ...body, image };

  try {
    const data = await postModel.findByIdAndUpdate(id, newPost, { new: true });

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());
  const comment = req.body.comment;

  const posts = await postModel.findById(id);
  const comments = [...posts.comments, comment];

  try {
    const data = await postModel.findByIdAndUpdate(
      id,
      { ...posts._doc, comments },
      { new: true }
    );

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());
  const user = req.body.user_id;

  const posts = await postModel.findById(id);
  let likes = posts.likes;

  if (likes.includes(user)) {
    likes = likes.filter((item) => item !== user);
  } else {
    likes.push(user);
  }

  try {
    const data = await postModel.findByIdAndUpdate(
      id,
      { ...posts._doc, likes },
      { new: true }
    );

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkRead = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());
  const user_id = req.user_id;

  const posts = await postModel.findById(id);
  let read = [...posts.read, user_id];

  try {
    const data = await postModel.findByIdAndUpdate(
      id,
      { ...posts._doc, read },
      { new: true }
    );

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  getPoems,
  getPoem,
  postPoem,
  deletePoem,
  updatePoem,
  addComment,
  likePost,
  checkRead,
};
