import { Request, Response } from "express";
import User from "../models/User";
import { IUser } from "../interfaces/IUser";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, age }: IUser = req.body;
    if (await User.findOne({ email: email })) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const newUser = new User({
      email: email,
      password: password,
      name: name,
      age: age,
    }).save();

    res.json({ message: "Signup successful", user: newUser });
  } catch (err) {
    res.status(400).json({ message: "An error occured", error: err });
  }
};