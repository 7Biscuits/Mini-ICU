import { Request, Response } from "express";
import Patient from "../models/Patient";
import { IPatient } from "../interfaces";

export const getPatients = async (_: Request, res: Response): Promise<void> => {
  try {
    const patients = await Patient.find();
    res.json({ patients: patients, status: res.statusCode });
  } catch (err) {
    res.status(400).json({
      message: "An error occured while fetching all patients",
      error: err,
      status: res.statusCode,
    });
  }
};

export const getPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const patient = await Patient.findOne({ patientId: req.params.patientId });
    if (!patient) {
      res.status(400).json({
        message: `Patient with id '${req.params.patientId}' doesn't exists`,
        status: res.statusCode,
      });
      return;
    }
    res.json({ patient: patient });
  } catch (err) {
    res.status(400).json({
      message: "An error occured while fetching this patient",
      error: err,
      status: res.statusCode,
    });
  }
};

export const createPatient = (req: Request<IPatient>, res: Response): void => {
  try {
    const { name, age, gender, disease, dateAdded }: IPatient = req.body;

    const newPatient = new Patient({
      name: name,
      age: age,
      gender: gender,
      disease: disease,
      dateAdded: dateAdded,
    });

    newPatient.save();
    res.json({
      message: "Patient added successfully",
      patient: newPatient,
      status: res.statusCode,
    });
  } catch (err) {
    res.status(400).json({
      message: "An error occured while creating patient",
      error: err,
      status: res.statusCode,
    });
  }
};

export const deletePatients = async (_: Request, res: Response): Promise<void> => {
  try {
    const data = await Patient.deleteMany({});
    res.json({
      message: "All patients deleted successfully",
      data: data,
      status: res.statusCode,
    });
  } catch (err) {
    res.status(400).json({
      message: "An error occured while deleting all patients",
      error: err,
      status: res.statusCode,
    });
  }
};