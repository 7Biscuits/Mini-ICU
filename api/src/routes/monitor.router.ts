import { Router } from "express";
import {
  getMonitorData,
  postMonitorData,
  deleteMonitorData,
  // postMonitorSpo2,
} from "../controllers/monitor.controller";

export const monitorRouter: Router = Router();

monitorRouter.route("/monitor").get(getMonitorData);
monitorRouter
  .route("/monitor/:bloodOxygenLevel/:heartBeat")
  .post(postMonitorData);
// monitorRouter.route("/hello").post(() => { console.log("helloworld"); });
// monitorRouter.route("/monitor/:bloodOxygenLevel/:heartBeat").post(postMonitorSpo2);
monitorRouter.route("/monitor").delete(deleteMonitorData);