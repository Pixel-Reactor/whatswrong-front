import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const GetServices = async (orderby) => {
  const response = await axiosInstance.get(`/services/${orderby}`);

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

export const GetLikesServices = async (id) => {
  const response = await axiosInstance.get(`/getlikesservices/${id}`);

  return response;
};

export const GetLikesComents = async (id) => {
  const response = await axiosInstance.get(`/getlikescoments/${id}`);

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
  const response = await axiosInstance.get("/getuser", {
    headers: { Authorization: token },
  });

  return response;
};

export const GetUserById = async (byId, token) => {
  // console.log(token);
  const response = await axiosInstance.get(`/getuserbyid/${byId}`, {
    headers: { Authorization: token },
  });

  return response;
};

export const GetColaboraciones = async (token) => {
  const response = await axiosInstance.get("/getcolaboraciones", {
    headers: { Authorization: token },
  });

  return response;
};

export const SendService = async (data, file, userToken) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("fichero", file);

  const response = await axiosInstance.post(
    "/addservice",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: userToken,
      },
    },
    formData
  );
  return response;
};

export const SendComment = async (data, file, userToken) => {
  const formData = new FormData();
  formData.append("comment", data.comment);
  formData.append("service_id", data.service_id);
  formData.append("fichero", file);
  const response = await axiosInstance.post("/newcomment", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: userToken,
    },
  });
  return response;
};

export const ModifyUser = async (data, userToken) => {
  const response = await axiosInstance.post("/modifyUser", data, {
    headers: {
      Authorization: userToken,
    },
  });
  return response;
};

export const ModifyUserPwd = async (data, userToken) => {
  const response = await axiosInstance.post("/modifyPwd", data, {
    headers: {
      Authorization: userToken,
    },
  });
  return response;
};

export const AddLike = async (data, userToken) => {
  // console.log(userToken);
  const response = await axiosInstance.post("/addLike", data, {
    headers: {
      Authorization: userToken,
    },
  });
  return response;
};

export const BestComent = async (idcomentarios, userToken) => {
  console.log("hola");
  console.log(userToken);
  console.log(idcomentarios);
  console.log("hola");

  const response = await axiosInstance.post(`/bestcoment/${idcomentarios}`, {
    headers: { Authorization: userToken },
  });

  return response;
};

export const MarkDone = async (data, userToken) => {
  const response = await axiosInstance.post("/markdone", data, {
    headers: {
      Authorization: userToken,
    },
  });
  return response;
};
export const DeleteComment = async (data, userToken) => {
  const response = await axiosInstance.post("/deletecomment", data, {
    headers: {
      Authorization: userToken,
    },
  });
  return response;
};
export const Search = async (data) => {
  const response = await axiosInstance.post("/search", data);
  return response;
};
