import { Schema, model } from "mongoose";
import { IUser } from "../interfaces";
import { nanoid } from "nanoid";

const UserSchema = new Schema<IUser>({
  userId: {
    type: String,
    required: true,
    default: () => `u-${nanoid(5).toLowerCase()}`,
  },
  email: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 36,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 128,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

export default model<IUser>("User", UserSchema);