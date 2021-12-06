import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { fakeUserToken } from "mocks/utils/generateFakeUser";
import { renderWithClient } from "utils/tests";
import App from "App";
import userEvent from "@testing-library/user-event";
import { db } from "mocks/db";

function initializeDatabase() {
  const someCategoryGroup = db.categoryGroup.create({
    name: "Some Category Group",
    created_on_month: new Date(),
  });

  const SomeCategory = db.category.create({
    name: "Some category",
    categoryGroup_id: someCategoryGroup,
  });
}

test("create category modal opens and closes", async () => {
  initializeDatabase();
  window.localStorage.setItem("token", fakeUserToken);
  const { container } = renderWithClient(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  userEvent.click(await screen.findByRole("button", { name: /add category/i }));
  const modal = await screen.findByRole("dialog");
  expect(modal).toHaveAttribute("aria-modal", "true");
  screen.debug(container, 99999); //?
});
