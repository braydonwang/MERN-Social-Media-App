import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
  if (userData.data) {
    localStorage.setItem("profile", JSON.stringify(userData.data));
    return userData.data;
  }

  const res = await axios.post(API_URL, userData.formData);
  localStorage.setItem("profile", JSON.stringify(res.data));
  userData.history.push("/");
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData.formData);
  localStorage.setItem("profile", JSON.stringify(res.data));
  userData.history.push("/");
  return res.data;
};

const logout = async () => {
  localStorage.removeItem("profile");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
