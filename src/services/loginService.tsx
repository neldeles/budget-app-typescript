import axios from "axios";
import { TUser } from "types/global";

export type TCredentials = {
  email: string;
  password: string;
  isRemembered: boolean;
};

const loginService = async (credentials: TCredentials): Promise<TUser> => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};

export default loginService;
