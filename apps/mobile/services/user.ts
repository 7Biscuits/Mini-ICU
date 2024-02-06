import { BASE_URL } from "../env";

export const getUser = async (userId: string): Promise<any> => {
  const response = await fetch(`${BASE_URL}/api/user/${userId}`);
  const data = await response.json();

  const user = {
    userId: data.user.userId,
    name: data.user.name,
    email: data.user.email,
    age: data.user.age,
    status: data.status,
  };
  
  return user;
};