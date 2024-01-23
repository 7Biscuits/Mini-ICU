import express, { Express, Request, Response } from "express";
import { json } from "body-parser";
import session from "express-session";
import cors from "cors";
import { connect } from "mongoose";
import { authRouter } from "./routes/auth.router";
import { userRouter } from "./routes/user.router";
import { monitorRouter } from "./routes/monitor.router";
import { patientRouter } from "./routes/patient.router";
import { getIPAddress } from "./helpers/getIP";
import { configDotenv } from "dotenv";

configDotenv();

connect(`${process.env.MONGO_URI}`).then((): void => {
  console.log("Connected to database");
});

const app: Express = express();

app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.get("/", (_: Request, res: Response): void => {
  res.status(200).send("Welcome to Mini-ICU API");
});

app.use("/auth", authRouter);
app.use("/api", userRouter);
app.use("/api", monitorRouter);
app.use("/api", patientRouter);

const port = process.env.PORT || 8080;

app.listen(port, (): void => {
  console.log(
    `server listening on http://localhost:${port} \n${getIPAddress()}`
  );
});