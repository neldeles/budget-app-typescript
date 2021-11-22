import { rest } from "msw";
import { fakeUser, fakeUserToken } from "./utils/generateFakeUser";
import { TUser } from "types/global";
import { TCategoryGroupPayload } from "components/molecules/Header/Header";
import { db } from "./db";
import { TLoginCredentials } from "components/molecules/LoginForm";

type TExpectedError = {
  message: string;
};

type LoginPostRequestBody = TLoginCredentials;
type LoginPostResponseBody = TExpectedError | TUser;

type CategoryGroupRequestBody = TCategoryGroupPayload;
type CategoryGroupResponseBody = TCategoryGroupPayload & {
  id: string;
};

export const handlers = [
  // Handles a successful POST /login request
  rest.post<LoginPostRequestBody, LoginPostResponseBody>(
    "/auth/login",
    (req, res, ctx) => {
      const { email, password } = req.body;
      const errorMessage = "username and/or password required";
      if (!password) {
        return res(ctx.status(400), ctx.json({ message: errorMessage }));
      }
      if (!email) {
        return res(ctx.status(400), ctx.json({ message: errorMessage }));
      }

      localStorage.setItem("token", fakeUserToken);
      return res(
        // Respond with a 200 status code
        ctx.status(200)
      );
    }
  ),

  // Checks if user is already logged in
  rest.get("http://localhost:5000/auth/is-verify", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          message: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details
    return res(ctx.status(200), ctx.json(fakeUser));
  }),

  // categoryGrouop CRUD handlers
  ...db.categoryGroup.toHandlers("rest"),

  // Handles a GET /user request
  // rest.get("/user", (req, res, ctx) => {
  //   // Check if the user is authenticated in this session
  //   const isAuthenticated = localStorage.getItem("token");

  //   if (!isAuthenticated) {
  //     // If not authenticated, respond with a 403 error
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         errorMessage: "Not authorized",
  //       })
  //     );
  //   }

  //   // If authenticated, return a mocked user details
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       id: 1,
  //       name: "BTS",
  //       email: "bts@email.com",
  //     })
  //   );
  // }),
];
