import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

export const Test = async () => {
  const response = await axiosInstance.get("/services");
 
  return response;
};
export const NewUser = async (user) =>{
   const response = await axiosInstance.post('/newuser',user)

   return response;
}

export const Login = async (user) =>{
  const response = await axiosInstance.post('/login',user)

  return response;
}
