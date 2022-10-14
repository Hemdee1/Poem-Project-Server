import AuthModel from "../models/authModel.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

const SignUp = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    const user = await AuthModel.signup(email, firstName, lastName, password);
    const id = user._id;

    // create token
    const token = createToken(id);

    res.json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const LogIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthModel.login(email, password);
    const id = user._id;

    // create token
    const token = createToken(id);

    res.json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { SignUp, LogIn };
