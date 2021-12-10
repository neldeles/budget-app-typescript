import { rest } from "msw";
import { TCategoryPayload } from "screens/BudgetScreen/components/CategoryForm/CategoryForm";
import { fakeUser, fakeUserToken } from "mocks/utils/generateFakeUser";
import { db } from "mocks/db";
import moment from "moment";

type CategoriesPostRequestBody = TCategoryPayload;

export const categoryHandlers = [
  rest.post<CategoriesPostRequestBody>("/categories", (req, res, ctx) => {
    // Only authenticated users can create a category group.
    if (req.headers.get("token") !== fakeUserToken) {
      return res(ctx.status(403));
    }

    const categoryGroup = db.categoryGroup.findFirst({
      where: {
        id: {
          equals: req.body.categoryGroupId,
        },
      },
    });

    const category = {
      name: req.body.name,
      categoryGroup: categoryGroup!,
      created_on_month: new Date(req.body.createdOnMonth),
    };

    // Create a new entity for the categoryGroup model.
    db.category.create(category);

    // Respond with a mocked response.
    return res(ctx.status(201));
  }),
  rest.get("/categories", (req, res, ctx) => {
    if (req.headers.get("token") !== fakeUserToken) {
      return res(ctx.status(403));
    }

    const selectedMonthString = req.url.searchParams.get("month");
    const categoryGroupIds = req.url.searchParams.getAll("categoryGroupIds");

    const allUserCategories = db.category.findMany({
      where: {
        user_id: {
          equals: fakeUser.id,
        },
      },
    });

    const userCategoriesWithCategoryGroup = allUserCategories.filter(
      // A category cannot exist without a category group, so we can
      // non-null assert it.
      (category) => categoryGroupIds.includes(category.categoryGroup!.id)
    );

    const selectedMonthCategories = userCategoriesWithCategoryGroup.filter(
      (category) => {
        const selectedMonth = moment(selectedMonthString, "MMM YYYY");
        // Rules for category to be displayed in selected month.
        // 1. Created on or before the selected month-year.
        const condition1 =
          moment(
            moment(category.created_on_month).format("MMM YYYY"),
            "MMM YYYY"
          ) <= selectedMonth;
        // 2. Not deleted or deleted after the selected month-year.
        const condition2 =
          category.deleted_at == null ||
          moment(moment(category.deleted_at).format("MMM YYYY"), "MMM YYYY") >
            selectedMonth;
        return condition1 && condition2;
      }
    );

    // TODO: # Do some calculating for the table values
    // - in meantime we just return default values of 0
    const categoryTable = selectedMonthCategories.map((category) => ({
      categoryGroupId: category.categoryGroup!.id,
      data: {
        category: category.name,
        budgeted: 0,
        activity: 0,
        available: 0,
      },
    }));

    return res(ctx.json(categoryTable));
  }),
];
