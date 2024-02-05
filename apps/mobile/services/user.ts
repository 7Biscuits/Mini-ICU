import { BASE_URL } from "../env";

export const getUser = async (userId: string): Promise<any> => {
  const response = await fetch(
    `${BASE_URL}/api/user/${userId}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
};
