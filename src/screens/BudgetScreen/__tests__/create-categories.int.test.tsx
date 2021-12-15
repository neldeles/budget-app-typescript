import faker from "faker";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { fakeUserToken } from "mocks/utils/generateFakeUser";
import { auth, renderWithProviders } from "utils/tests";
import App from "App";
import userEvent from "@testing-library/user-event";
import { db } from "mocks/db";

function initializeDatabase() {
  const withNoCategoriesCategoryGroup = db.categoryGroup.create({
    name: "Always empty category group",
    created_in_month: new Date(),
  });

  const withCategoriesCategoryGroup = db.categoryGroup.create({
    name: "Category Group A",
    created_in_month: new Date(),
  });

  const category = db.category.create({
    name: "Category for Category Group A",
    categoryGroup: withCategoriesCategoryGroup,
  });

  return {
    withNoCategoriesCategoryGroup,
    category,
    withCategoriesCategoryGroup,
  };
}

test("create category modal opens and closes", async () => {
  initializeDatabase();
  auth.setToken();
  renderWithProviders(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  const createCategoryButton = await screen.findAllByRole("button", {
    name: /add category/i,
  });
  userEvent.click(createCategoryButton[0]);
  const modal = await screen.findByRole("dialog");
  expect(modal).toHaveAttribute("aria-modal", "true");

  const inModal = within(modal);
  userEvent.click(inModal.getByRole("button", { name: /close/i }));
  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  userEvent.click(createCategoryButton[0]);
  userEvent.click(
    within(await screen.findByRole("dialog")).getByRole("button", {
      name: /cancel/i,
    })
  );
  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

test("it creates a category row in the selected category group only", async () => {
  const {
    withNoCategoriesCategoryGroup,
    category,
    withCategoriesCategoryGroup,
  } = initializeDatabase();

  const categoryRowName = faker.random.word();
  auth.setToken();
  renderWithProviders(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  const withCategoriesCategoryGroupTable = await screen.findByTestId(
    withCategoriesCategoryGroup.name
  );
  const createCategoryButton = within(
    withCategoriesCategoryGroupTable
  ).getByRole("button", {
    name: /add category/i,
  });
  userEvent.click(createCategoryButton);
  const modal = await screen.findByRole("dialog");
  expect(modal).toHaveAttribute("aria-modal", "true");

  const inModal = within(modal);
  userEvent.type(inModal.getByRole("textbox"), categoryRowName);
  userEvent.click(inModal.getByRole("button", { name: /submit/i }));
  await waitFor(() => expect(db.category.count()).toBe(2));
  expect(
    within(withCategoriesCategoryGroupTable).getByText(category.name)
  ).toBeInTheDocument();

  // we expect this to remain empty and have no category rows
  const emptyCategoryGroupTable = await screen.findByTestId(
    withNoCategoriesCategoryGroup.name
  );
  expect(
    within(emptyCategoryGroupTable).queryByText(category.name)
  ).not.toBeInTheDocument();
});
