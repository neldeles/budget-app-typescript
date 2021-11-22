import axios from "axios";
import { TLoginCredentials } from "components/molecules/LoginForm";
import { TUser } from "types/global";

const loginService = async (credentials: TLoginCredentials): Promise<TUser> => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};

export default loginService;
