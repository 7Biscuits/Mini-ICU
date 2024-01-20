import { Router } from "express";
import {
  getMonitorData,
  postMonitorData,
  deleteMonitorData,
} from "../controllers/monitor.controller";

export const monitorRouter: Router = Router();

monitorRouter.route("/getMonitorData").get(getMonitorData);
monitorRouter
  .route("/postMonitorData/:bloodOxygenLevel/:ecg/:emg")
  .get(postMonitorData);
monitorRouter.route("/deleteMonitorData").delete(deleteMonitorData);