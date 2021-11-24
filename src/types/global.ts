// these are global types that are shared by multiple components

import { fakeUser, fakeUserToken } from "mocks/utils/generateFakeUser";

export type THeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

export type TUser = Omit<typeof fakeUser, "token">;

export type TAuthConfig = {
  headers: { token: typeof fakeUserToken };
};
