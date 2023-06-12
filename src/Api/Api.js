import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

export const Test = async () => {
  const response = await axiosInstance.get("/services");
  return response;
};
