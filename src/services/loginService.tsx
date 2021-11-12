import axios from "axios";
import { fakeUser } from "mocks/utils/generateFakeUser";

export type TCredentials = {
  email: string;
  password: string;
  isRemembered: boolean;
};

const loginService = async (
  credentials: TCredentials
): Promise<typeof fakeUser> => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};

export default loginService;
