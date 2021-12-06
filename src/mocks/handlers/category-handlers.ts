import { rest } from "msw";
import { TCategoryPayload } from "screens/BudgetScreen/components/CategoryForm/CategoryForm";
import { fakeUserToken } from "mocks/utils/generateFakeUser";
import { db } from "mocks/db";

type CategoryRequestBody = TCategoryPayload;

export const categoryHandlers = [
  rest.post<CategoryRequestBody>("/category", (req, res, ctx) => {
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
      categoryGroup_id: categoryGroup!,
      created_on_month: new Date(req.body.createdOnMonth),
    };

    // Create a new entity for the categoryGroup model.
    db.category.create(category);

    // Respond with a mocked response.
    return res(ctx.status(201));
  }),
];
