import axios from "axios";

export type TCredentials = {
  email: string;
  password: string;
  isRemembered: boolean;
};

const loginService = async (credentials: TCredentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};

export default loginService;
