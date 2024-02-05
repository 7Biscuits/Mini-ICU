import { IP } from "../env";

export const getUser = async (userId: string): Promise<any> => {
  const response = await fetch(
    `http://${IP}:8080/api/user/${userId}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
};
