import { Router } from "express";
import { json, urlencoded } from "body-parser";
import { getUsers, getUser, deleteUser, deleteUsers } from "../controllers/user.controller";

export const userRouter: Router = Router();

userRouter.use(json(), urlencoded({ extended: true }));

userRouter.route("/users").get(getUsers);
userRouter.route("/user/:userId").get(getUser);
userRouter.route("/users/:userId").delete(deleteUser);
userRouter.route("/patients").delete(deleteUsers);