import { Router } from "express";
import {
  getMonitorData,
  postMonitorData,
  deleteMonitorData,
} from "../controllers/monitor.controller";

export const monitorRouter: Router = Router();

monitorRouter.route("/monitor").get(getMonitorData);
monitorRouter
  .route("/monitor/:bloodOxygenLevel/:ecg/:emg")
  .get(postMonitorData);
monitorRouter.route("/monitor").delete(deleteMonitorData);