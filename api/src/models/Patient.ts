import { Schema, model } from "mongoose";
import { IPatient } from "../interfaces";
import { nanoid } from "nanoid";

const PatientSchema = new Schema<IPatient>({
  patientId: {
    type: String,
    required: true,
    default: () => `p-${nanoid(5).toLowerCase()}`,
  },
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