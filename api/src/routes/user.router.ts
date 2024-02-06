import { Router } from "express";
import { json, urlencoded } from "body-parser";
import { getUsers, getUser, deleteUser, deleteUsers } from "../controllers/user.controller";

export const userRouter: Router = Router();

userRouter.use(json(), urlencoded({ extended: true }));

userRouter.route("/users").get(getUsers);
userRouter.route("/user/:userId").get(getUser);
userRouter.route("/user/:userId").delete(deleteUser);
userRouter.route("/users").delete(deleteUsers);