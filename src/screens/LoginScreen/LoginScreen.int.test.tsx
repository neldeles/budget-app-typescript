import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";
import "@testing-library/jest-dom/extend-expect";

import App from "../../App";
import { fakeUser, fakeUserToken } from "mocks/utils/generateFakeUser";
import { renderWithProviders } from "utils/tests";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(jest.fn());
});

test("calls onSubmit with the username and password when submit is clicked", async () => {
  renderWithProviders(<App />);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  const email = "test@email.com";
  const password = "test123";

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole("button", { name: /sign in/i });

  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
  userEvent.click(signInButton);

  await waitFor(() => {
    // Assert successful login state
    expect(screen.getByText(fakeUser.name)).toBeInTheDocument();
    expect(window.localStorage.getItem("token")).toEqual(fakeUserToken);
  });
});
