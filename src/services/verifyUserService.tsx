import axios from "axios";
import { TUser } from "types/global";

const verifyUserService = async (): Promise<TUser> => {
  const response = await axios.get("/auth/is-verify");
  return response.data;
};

export { verifyUserService };
