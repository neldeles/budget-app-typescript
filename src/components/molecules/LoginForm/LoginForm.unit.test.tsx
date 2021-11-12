import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { TLoginFormProps } from "./LoginForm";
import faker from "faker";
import App from "../../../App";

import * as LoginFormStories from "./LoginForm.stories";

test("renders an email field that the user can type in", () => {
  render(
    <Router>
      <LoginFormStories.Default
        {...(LoginFormStories.Default.args as TLoginFormProps)}
      />
    </Router>
  );

  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "test@email.com");

  expect(screen.getByDisplayValue("test@email.com")).toBeInTheDocument();
});

test("renders a password field that the user can type in", () => {
  render(
    <Router>
      <LoginFormStories.Default
        {...(LoginFormStories.Default.args as TLoginFormProps)}
      />
    </Router>
  );

  const passwordInput = screen.getByLabelText(/password/i);
  userEvent.type(passwordInput, "abc123");

  expect(screen.getByDisplayValue("abc123")).toBeInTheDocument();
});

test("shows an error message when submit is clicked and no username is provided", async () => {
  render(<App />);

  const password = faker.internet.password();

  const passwordInput = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole("button", { name: /sign in/i });

  userEvent.type(passwordInput, password);
  userEvent.click(signInButton);

  const errorMessage = await screen.findByRole("alert");

  expect(errorMessage.textContent).toMatchInlineSnapshot(`"username required"`);
  expect(window.localStorage.getItem("token")).toBeNull();
});

test("shows an error message when submit is clicked and no password is provided", async () => {
  render(<App />);

  const email = faker.internet.email();

  const emailInput = screen.getByLabelText(/email/i);
  const signInButton = screen.getByRole("button", { name: /sign in/i });

  userEvent.type(emailInput, email);
  userEvent.click(signInButton);

  const errorMessage = await screen.findByRole("alert");

  expect(errorMessage.textContent).toMatchInlineSnapshot(`"password required"`);
  expect(window.localStorage.getItem("token")).toBeNull();
});
