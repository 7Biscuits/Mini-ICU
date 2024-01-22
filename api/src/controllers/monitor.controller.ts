import { Request, Response } from "express";
import Monitor from "../models/Monitor";
import { IMonitor } from "../interfaces";

export const getMonitorData = (_: Request, res: Response): void => {
  try {
    const data = Monitor.find();
    res.json({ data: data });
  } catch (err) {
    res.json({
      message: "An error occured while fetching the monitor data",
      error: err,
    });
  }
};

export const postMonitorData = (
  req: Request<IMonitor>,
  res: Response
): void => {
  try {
    const { bloodOxygenLevel, ecg, emg }: IMonitor = req.params;

    const data: IMonitor = new Monitor({
      bloodOxygenLevel: bloodOxygenLevel,
      ecg: ecg,
      emg: emg,
    });

    data.save();
    res.json({ response: "Monitor data saved", data: data });
  } catch (err) {
    res.status(400).json({
      message: "An error occured while posting monitor data",
      error: err,
    });
  }
};

export const deleteMonitorData = (_: Request, res: Response): void => {
  try {
    const data = Monitor.deleteMany({});
    res.json({ message: "All Monitor data deleted", data: data });
  } catch (err) {
    res.status(400).json({
      message: "An error occured while deleting monitor data",
      error: err,
    });
  }
};