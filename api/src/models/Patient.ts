import { Schema, model } from "mongoose";
import { IPatient } from "../interfaces";

const PatientSchema = new Schema<IPatient>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  disease: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: String,
    required: true,
  },
});

export default model<IPatient>("Patient", PatientSchema);