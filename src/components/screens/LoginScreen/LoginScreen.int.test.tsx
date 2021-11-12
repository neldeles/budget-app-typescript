import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";
import "@testing-library/jest-dom/extend-expect";

import App from "../../../App";
import { fakeUser } from "mocks/utils/generateFakeUser";

test("calls onSubmit with the username and password when submit is clicked", async () => {
  render(<App />);
  const email = faker.internet.email();
  const password = faker.internet.password();

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole("button", { name: /sign in/i });

  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
  userEvent.click(signInButton);

  await waitFor(() => {
    // Assert successful login state
    expect(screen.getByText(fakeUser.name)).toBeInTheDocument();
    expect(window.localStorage.getItem("token")).toEqual(fakeUser.token);
  });
});
