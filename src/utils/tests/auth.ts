import { fakeUserToken } from "mocks/utils/generateFakeUser";

export const auth = {
  setToken: () => window.localStorage.setItem("token", fakeUserToken),
};
