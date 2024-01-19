import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done): Promise<void> => {
      try {
        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        if (password === user.password) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
