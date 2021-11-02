import axios from "axios";

const loginService = async (credentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response;
};

export default loginService;
