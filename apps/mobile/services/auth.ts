export const signup = async (
  email: string,
  password: string,
  name: string,
  age: string
): Promise<any> => {
  const data = await fetch("http://192.168.190.134:8080/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      age: parseInt(age),
    }),
  });
  const response = await data.json();
  return response;
};

export const login = async (email: string, password: string): Promise<any> => {
  console.log(email, "meow", password);
  const data = await fetch("http://192.168.190.134:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  const response = await data.json();
  return response;
};