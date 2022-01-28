import axios from "axios";

const URL = "http://localhost:5000";

export const signup = async (userData) => {
  const { data } = await axios.post(`${URL}/signup`, userData);
  return data;
};

export const signin = async (userData) => {
  const { data } = await axios.post(`${URL}/signin`, userData);
  return data;
};

export const getProfileData = async (username, token) => {
  const { data } = await axios.get(`${URL}/user/${username}`, {
    headers: {
      authorization: token,
    },
  });
  return data;
};

export const uploadPic = async (username, pic) => {
  const { data } = await axios.post(`${URL}/user/${username}/profilepic`, pic);
  return data;
};

export const updateDesc = async (username, updatedDesc) => {
  const { data } = await axios.post(
    `${URL}/user/${username}/updatedesc`,
    updatedDesc
  );
  return data;
};
