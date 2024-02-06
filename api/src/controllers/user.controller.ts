import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (_: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json({ users: users, status: res.statusCode });
  } catch (err) {
    res.status(400).json({
      message: "An error occured while fetching all users",
      error: err,
      status: res.statusCode,
    });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({
      userId: req.params.userId,
    });
    if (!user) {
      res.status(400).json({
        message: `User with id ${req.params.userId} doesn't exist`,
        status: res.statusCode,
      });
      return;
    }

    res.json({ user: user, status: res.statusCode });
  } catch (err) {
    res.status(400).json({
      message: "An error occured while fetching this user",
      error: err,
      status: res.statusCode,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = User.findOneAndDelete({ userId: req.params.userId });
    res.json({
      message: "User deleted successfully",
      user: user,
      status: res.statusCode,
    });
  } catch (err) {
    res.status(400).json({
      message: `User with id ${req.params.userId} couldn't be deleted`,
      error: err,
      status: res.statusCode,
    });
  }
};

export const deleteUsers = (_: Request, res: Response): void => {
  try {
    const user = User.deleteMany({});
    res.json({
      message: "User deleted successfully",
      user: user,
      status: res.statusCode,
    });
  } catch (err) {
    res.status(400).json({
      message: `All users couldn't be deleted`,
      error: err,
      status: res.statusCode,
    });
  }
};