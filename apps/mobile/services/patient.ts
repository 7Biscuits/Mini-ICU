import { BASE_URL } from "../env";

export const getPatients = async (): Promise<any> => {
  const response = await fetch(`${BASE_URL}/api/patients/`);
  const data = await response.json();
  return data;
};

export const getPatient = async (patientId: string): Promise<any> => {
  const response = await fetch(`${BASE_URL}/api/patient/${patientId}`);
  const data = await response.json();
  return data;
};

export const createPatient = async (
  name: string,
  age: string,
  gender: string,
  disease: string
): Promise<any> => {
  const currentDate = new Date();
  const formattedDate = `${
    currentDate.getDate()
  }/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  const response = await fetch(`${BASE_URL}/api/patient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      age: age,
      gender: gender,
      disease: disease,
      dateAdded: formattedDate,
    }),
  });

  const data = await response.json();

  const patient = {
    patientId: data.patient.patientId,
    name: data.patient.name,
    age: data.patient.age,
    gender: data.patient.gender,
    disease: data.patient.disease,
    dateAdded: data.patient.dateAdded,
    message: data.message,
    status: data.status,
  };

  return patient;
};