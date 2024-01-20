import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  age: number;
}

export interface IMonitor extends Document {
  bloodOxygenLevel: number;
  ecg: number;
  emg: number;
}

export interface IPatient extends Document {
  name: string;
  age: number;
  gender: string;
  disease: string;
  dateAdded: string;
}