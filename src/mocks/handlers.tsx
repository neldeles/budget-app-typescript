import { rest } from "msw";
import { fakeUser, fakeUserToken } from "./utils/generateFakeUser";
import { TUser } from "types/global";
import { TCategoryGroupPayload } from "screens/BudgetScreen/components/Header/Header";
import { db } from "./db";
import { TLoginCredentials } from "screens/LoginScreen/components/LoginForm";
import { TCategoryGroups } from "services/categoryGroupService";
import moment from "moment";
import { categoryHandlers } from "./handlers/category-handlers";

type TExpectedError = {
  message: string;
};

type LoginPostRequestBody = TLoginCredentials;
type LoginPostResponseBody = TExpectedError | TUser;

type CategoryGroupRequestBody = TCategoryGroupPayload;
type CategoryGroupGetResponseBody = TCategoryGroups;

export const handlers = [
  // Handles a successful POST /login request
  rest.post<LoginPostRequestBody, LoginPostResponseBody>(
    "/auth/login",
    (req, res, ctx) => {
      const { email, password } = req.body;
      const errorMessage = "Incorrect username and/or password.";
      if (email !== "test@email.com" || password !== "test123") {
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
  rest.get("/auth/is-verify", (req, res, ctx) => {
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

  rest.post<CategoryGroupRequestBody>("/categoryGroups", (req, res, ctx) => {
    // Only authenticated users can create a category group.
    if (req.headers.get("token") !== fakeUserToken) {
      return res(ctx.status(403));
    }

    const categoryGroup = {
      name: req.body.name,
      created_in_month: new Date(req.body.createdOnMonth),
    };

    // Create a new entity for the categoryGroup model.
    db.categoryGroup.create(categoryGroup);

    // Respond with a mocked response.
    return res(ctx.status(201));
  }),

  rest.get("/categoryGroups", (req, res, ctx) => {
    // Only authenticated users can create a category group.
    if (req.headers.get("token") !== fakeUserToken) {
      return res(ctx.status(403));
    }

    const selectedMonthString = req.url.searchParams.get("month");

    const userCategoryGroups = db.categoryGroup.findMany({
      where: {
        user_id: {
          equals: fakeUser.id,
        },
      },
    });

    const selectedMonthCategoryGroups = userCategoryGroups.filter(
      (categoryGroup) => {
        const selectedMonth = moment(selectedMonthString, "MMM YYYY");
        // Rules for CategoryGroup to be displayed in selected month.
        // 1. Created on or before the selected month-year.
        const condition1 =
          moment(
            moment(categoryGroup.created_in_month).format("MMM YYYY"),
            "MMM YYYY"
          ) <= selectedMonth;
        // 2. Not deleted or deleted after the selected month-year.
        const condition2 =
          categoryGroup.deleted_at == null ||
          moment(
            moment(categoryGroup.deleted_at).format("MMM YYYY"),
            "MMM YYYY"
          ) > selectedMonth;
        return condition1 && condition2;
      }
    );

    return res(ctx.json(selectedMonthCategoryGroups));
  }),

  ...categoryHandlers,

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
