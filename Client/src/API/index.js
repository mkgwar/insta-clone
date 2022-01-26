import axios from "axios";

const URL = "http://localhost:5000";

export const signup = async (userData) => {
  const { data } = await axios.post(`${URL}/signup`, userData);
  return data;
};
