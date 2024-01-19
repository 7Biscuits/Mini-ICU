import express, { Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import session from "express-session";
import passport from "passport";
import { signup } from "../controllers/auth.controller";
import "../config/passport.config";

export const authRouter: express.Router = express.Router();

authRouter.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    resave: false,
    saveUninitialized: false,
  })
);

authRouter.use(json(), urlencoded({ extended: true }));
authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.route("/signup").post(signup);

authRouter.post("/login", (req: Request, res: Response, next) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) {
      return res.status(500).json({ message: "An error occurred", error: err });
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed", error: info });
    }

    req.logIn(user, (err): void => {
      if (err) {
        res
          .status(500)
          .json({ message: "An error occurred during login", error: err });
        return;
      }
      res.json({ message: "Login successful", user: user });
    });
  })(req, res, next);
});