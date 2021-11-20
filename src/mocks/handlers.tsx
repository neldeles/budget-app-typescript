import { rest } from "msw";
import { fakeUser } from "./utils/generateFakeUser";
import type { TCredentials } from "services/loginService";
import { TUser } from "types/global";
import { TCategoryGroupPayload } from "components/molecules/Header/Header";

type TExpectedError = {
  message: string;
};

type LoginPostRequestBody = TCredentials;
type LoginPostResponseBody = TExpectedError | TUser;

type categoryGroupRequestBody = TCategoryGroupPayload;
type categoryGroupResponseBody = TCategoryGroupPayload & {
  id: string;
};

export const handlers = [
  // Handles a successful POST /login request
  rest.post<LoginPostRequestBody, LoginPostResponseBody>(
    "/auth/login",
    (req, res, ctx) => {
      const { email, password } = req.body;
      if (!password) {
        return res(ctx.status(400), ctx.json({ message: "password required" }));
      }
      if (!email) {
        return res(ctx.status(400), ctx.json({ message: "username required" }));
      }

      localStorage.setItem("token", fakeUser.token);
      return res(
        // Respond with a 200 status code
        ctx.status(200),
        ctx.json(fakeUser)
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
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: "BTS",
        email: "bts@email.com",
      })
    );
  }),

  // Handles a successful POST /category-group request
  // TODO: Refactor to use msw data
  rest.post("/category-group", (req, res, ctx) => {}),

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
