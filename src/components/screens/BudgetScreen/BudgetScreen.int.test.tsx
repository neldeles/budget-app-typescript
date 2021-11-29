import {
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "App";
import { renderWithClient } from "utils/tests";
import { fakeUser, fakeUserToken } from "mocks/utils/generateFakeUser";
import { rest } from "msw";
import { server } from "mocks/server";
import { db, mockCategoryGroups } from "mocks/db";

test("render placeholder content if user has no category groups created yet", async () => {
  window.localStorage.setItem("token", fakeUserToken);
  renderWithClient(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.getByLabelText(/no tables/i)).toBeInTheDocument();
});

test("successfully open and close the create category group modal", async () => {
  window.localStorage.setItem("token", fakeUserToken);
  renderWithClient(<App />);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  const createCategoryButton = screen.getByRole("button", {
    name: /create category group/i,
  });

  userEvent.click(createCategoryButton);
  const modal = screen.getByRole("dialog");
  expect(modal).toHaveAttribute("aria-modal", "true");

  const inModal = within(modal);
  userEvent.click(inModal.getByRole("button", { name: /close/i }));
  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  userEvent.click(createCategoryButton);
  expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");

  userEvent.click(screen.getByRole("button", { name: /cancel/i }));
  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

test("successfully create a new category group", async () => {
  window.localStorage.setItem("token", fakeUserToken);
  const categoryGroupName = "Some category group";

  renderWithClient(<App />);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  const createCategoryButton = screen.getByRole("button", {
    name: /create category group/i,
  });
  userEvent.click(createCategoryButton);
  const modal = screen.getByRole("dialog");
  expect(modal).toHaveAttribute("aria-modal", "true");

  const inModal = within(modal);
  userEvent.type(inModal.getByRole("textbox"), categoryGroupName);
  userEvent.click(inModal.getByRole("button", { name: /save/i }));

  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  expect(
    await screen.findByRole("heading", { name: categoryGroupName })
  ).toBeInTheDocument();
});

test("render a table for each category group in the db", async () => {
  server.use(
    rest.get("/categoryGroups", (req, res, ctx) => {
      mockCategoryGroups.forEach((categoryGroup) =>
        db.categoryGroup.create(categoryGroup)
      );
      const userCategoryGroups = db.categoryGroup.findMany({
        where: {
          user_id: {
            equals: fakeUser.id,
          },
        },
      });

      return res(ctx.json(userCategoryGroups));
    })
  );

  window.localStorage.setItem("token", fakeUserToken);
  renderWithClient(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  await waitForElementToBeRemoved(() => screen.getByLabelText(/no tables/i));
  expect(
    screen.getByText(mockCategoryGroups[0].name, { exact: false })
  ).toBeInTheDocument();

  expect(
    screen.getByText(mockCategoryGroups[1].name, { exact: false })
  ).toBeInTheDocument();

  expect(
    screen.queryByText(mockCategoryGroups[2].name, { exact: false })
  ).not.toBeInTheDocument();
});
