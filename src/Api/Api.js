import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

export const GetServices = async () => {
  const response = await axiosInstance.get("/services");

  return response;
};
export const GetUserDet = async (id) => {
  const response = await axiosInstance.get(`/userdet/${id}`);

  return response;
};
export const GetService = async (id) => {
  const response = await axiosInstance.get(`/service/${id}`);

  return response;
};

export const NewUser = async (user) => {
  const response = await axiosInstance.post("/newuser", user);

  return response;
};

export const Login = async (user) => {
  const response = await axiosInstance.post("/login", user);

  return response;
};

export const GetUser = async (token) => {

  const response = await axiosInstance.get("/getuser", {headers:{ Authorization:token}});

  return response;
};

export const SendService = async (data, userToken) => {
  const response = await axiosInstance.post("/addservice", data, {
    headers: {
      Authorization: userToken,
    },
  });
  return response;
};

export const SendComment = async (data, userToken) => {
  const response = await axiosInstance.post("/newcomment", data, {
    headers: {
      Authorization: userToken,
    },
  });
  return response;
};
