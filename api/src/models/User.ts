import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema = new Schema<IUser>({
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
  }
});

export default model<IUser>("User", UserSchema);