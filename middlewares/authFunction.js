import jwt from "jsonwebtoken";
// import AuthModel from "../models/authModel.js";

const authFunction = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    // const user = await AuthModel.findById(id);

    req.user_id = id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default authFunction;
