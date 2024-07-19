import { Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  email: string;
  password: string;
  name: string;
  age: number;
}

export interface IMonitor extends Document {
  bloodOxygenLevel: number;
  heartBeat: number;
  ecg: number;
  emg: number;
}

export interface IPatient extends Document {
  patientId: string;
  name: string;
  age: number;
  gender: string;
  disease: string;
  dateAdded: string;
}