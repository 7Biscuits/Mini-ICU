import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = (_: Request, res: Response): void => {
  try {
    const users = User.find();
    res.json({ users: users });
  } catch (err) {
    res.status(400).json({
      message: "An error occured while fetching all users",
      error: err,
    });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      res
        .status(400)
        .json({ message: `User with id ${req.params.userId} doesn't exist` });
      return;
    }
  } catch (err) {
    res.status(400).json({
      message: "An error occured while fetching this user",
      error: err,
    });
  }
};

export const deleteUser = (req: Request, res: Response): void => {
  try {
    const user = User.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: "User deleted successfully", user: user });
  } catch (err) {
    res.status(400).json({
      message: `User with id ${req.params.userId} couldn't be deleted`,
      error: err,
    });
  }
};

export const deleteUsers = (_: Request, res: Response): void => {
  try {
    const user = User.deleteMany({});
    res.json({ message: "User deleted successfully", user: user });
  } catch (err) {
    res.status(400).json({
      message: `All users couldn't be deleted`,
      error: err,
    });
  }
};