import { Request, Response } from "express";
import User from "../models/User";
import { IUser } from "../interfaces";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, age }: IUser = req.body;
    if (await User.findOne({ email: email })) {
      res
        .status(400)
        .json({ message: "User already exists", status: res.statusCode });
      return;
    }

    const newUser: IUser = new User({
      email: email,
      password: password,
      name: name,
      age: age,
    });

    newUser.save();
    res.json({
      message: "Signup successful",
      user: newUser,
      status: res.statusCode,
    });
  } catch (err) {
    res
      .status(400)
      .json({
        message: "An error occured",
        error: err,
        status: res.statusCode,
      });
  }
};