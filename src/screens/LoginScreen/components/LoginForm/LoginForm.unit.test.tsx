import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import faker from "faker";
import { renderWithClient } from "utils/tests";

import * as LoginFormStories from "./LoginForm.stories";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(jest.fn());
});

test("renders an email field that the user can type in", () => {
  renderWithClient(
    <Router>
      <LoginFormStories.MockedDefault
        {...LoginFormStories.MockedDefault.args}
      />
    </Router>
  );

  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "test@email.com");

  expect(screen.getByDisplayValue("test@email.com")).toBeInTheDocument();
});

test("renders a password field that the user can type in", () => {
  renderWithClient(
    <Router>
      <LoginFormStories.MockedDefault
        {...LoginFormStories.MockedDefault.args}
      />
    </Router>
  );

  const passwordInput = screen.getByLabelText(/password/i);
  userEvent.type(passwordInput, "abc123");

  expect(screen.getByDisplayValue("abc123")).toBeInTheDocument();
});

test("shows an error message when incorrect email and/or password are submitted", async () => {
  renderWithClient(
    <Router>
      <LoginFormStories.MockedDefault
        {...LoginFormStories.MockedDefault.args}
      />
    </Router>
  );

  const password = faker.internet.password();

  const passwordInput = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole("button", { name: /sign in/i });

  userEvent.type(passwordInput, password);
  userEvent.click(signInButton);

  const errorMessage = await screen.findByRole("alert");

  expect(errorMessage.textContent).toMatchInlineSnapshot(
    `"Incorrect username and/or password."`
  );
  expect(window.localStorage.getItem("token")).toBeNull();
});
