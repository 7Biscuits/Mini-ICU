import { Router } from "express";
import { json, urlencoded } from "body-parser";
import { getPatients, getPatient, createPatient, deletePatients } from "../controllers/patient.controller";

export const patientRouter: Router = Router();

patientRouter.use(json(), urlencoded({ extended: true }));

patientRouter.route("/patients").get(getPatients);
patientRouter.route("patient/:id").get(getPatient);
patientRouter.route("/patient/create").post(createPatient);
patientRouter.route("/patients").delete(deletePatients);