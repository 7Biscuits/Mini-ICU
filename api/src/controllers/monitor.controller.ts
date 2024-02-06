import { Request, Response } from "express";
import Monitor from "../models/Monitor";
import { IMonitor } from "../interfaces";

export const getMonitorData = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await Monitor.find();
    res.json({ data: data });
  } catch (err) {
    res.json({
      message: "An error occured while fetching the monitor data",
      error: err,
    });
  }
};

export const postMonitorData = async (
  req: Request<IMonitor>,
  res: Response
): Promise<void> => {
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

export const deleteMonitorData = async (_: Request, res: Response): Promise<void> => {
  try {
    const data = await Monitor.deleteMany({});
    res.json({
      message: "All Monitor data deleted",
      data: data,
      status: res.statusCode,
    });
  } catch (err) {
    res.status(400).json({
      message: "An error occured while deleting monitor data",
      error: err,
      status: res.statusCode,
    });
  }
};