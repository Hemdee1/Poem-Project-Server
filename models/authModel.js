import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    penName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (
  email,
  firstName,
  lastName,
  password
) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    firstName,
    lastName,
    password: hashPassword,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email is incorrect");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Password is incorrect");
  }

  return user;
};

const AuthModel = mongoose.model("auth", userSchema);

export default AuthModel;
