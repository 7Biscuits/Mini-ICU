const postData = async (): Promise<void> => {
  const spo2Value = Math.floor(Math.random() * (100 - 80 + 1) + 80);
  const ecgValue = Math.floor(Math.random() * (100 - 80 + 1) + 80);
  const emgValue = Math.floor(Math.random() * (100 - 80 + 1) + 80);

  const response = await fetch(
    `http://localhost:8080/api/monitor/${spo2Value}/${ecgValue}/${emgValue}`
  );
  const data = await response.json();
  console.log(data);
};

setInterval(postData, 2500);
