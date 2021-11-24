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
import { fakeUserToken } from "mocks/utils/generateFakeUser";

test("successfully opens and closes the create category group modal", async () => {
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

  const result = renderWithClient(<App />);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  const createCategoryButton = result.getByRole("button", {
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
