import { BASE_URL } from "../env";

export const getMonitorData = async (): Promise<any> => {
  const response = await fetch(`${BASE_URL}/api/monitor/`);
  const data = await response.json();
//   console.log(data.data[data.data.length - 1]);
  return data.data;
};

// getMonitorData();