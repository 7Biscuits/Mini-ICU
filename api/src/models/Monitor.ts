import { Schema, model } from "mongoose";
import { IMonitor } from "../interfaces";

const MonitorSchema = new Schema<IMonitor>({
  bloodOxygenLevel: {
    type: Number,
    required: true,
  },
  ecg: {
    type: Number,
    required: true,
  },
  emg: {
    type: Number,
    required: true,
  },
});

export default model<IMonitor>("Monitor", MonitorSchema);