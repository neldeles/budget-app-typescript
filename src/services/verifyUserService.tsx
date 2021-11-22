import axios from "axios";
import { TUser } from "types/global";

const baseUrl = "http://localhost:5000/auth/is-verify";

const verifyUserService = async (): Promise<TUser> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export { verifyUserService };
