import AuthModel from "../models/authModel.js";
import fs from "fs";
import postModel from "../models/postModel.js";

const updateUser = async (req, res) => {
  const id = req.user_id;
  const body = req.body;

  const user = await AuthModel.findById(id);

  let image = user.image;

  if (req.file) {
    // delete previous image
    const filepath = user.image;

    fs.unlink(filepath, () => {
      console.log("file deleted");
    });

    image = req.file.path;
  }

  const updated = await AuthModel.findByIdAndUpdate(
    id,
    { ...body, image },
    { new: true }
  );

  // update all data in the database;
  postModel.updateMany(
    { user_id: id },
    {
      $set: {
        user_image: updated.image,
        user_penName: updated.penName ? updated.penName : "unknown",
      },
    },
    (err, docs) => {
      if (err) {
        console.log(err);
      }
    }
  );

  res.json(updated);
};

const getOwner = async (req, res) => {
  const id = req.user_id;

  const user = await AuthModel.findById(id);
  const { penName, email, image, firstName, lastName, phone, _id } = user;
  res.json({ penName, email, image, firstName, lastName, phone, _id });
};

const getUser = async (req, res) => {
  const id = req.params.id;

  const user = await AuthModel.findById(id);
  const { penName, email, image, firstName, lastName, phone, _id } = user;
  res.json({ penName, email, image, firstName, lastName, phone, _id });
};

export { updateUser, getOwner, getUser };
