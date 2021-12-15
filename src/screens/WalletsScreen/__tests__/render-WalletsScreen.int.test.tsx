//file.only
import { waitForElementToBeRemoved, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "App";
import { auth, renderWithProviders } from "utils/tests";
import { db } from "mocks/db";

test("clicking on wallet submenu renders its WalletScreen", async () => {
  // msw handler that returns wallet subnavitems
  // return an array of navsubmitems
  const wallet = {
    name: "Wallet 1",
  };
  db.wallet.create(wallet);

  auth.setToken();
  renderWithProviders(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  screen.debug(); //?
  userEvent.click(screen.getByRole("button", { name: /wallets/i }));
  expect(
    await screen.findByRole("link", { name: wallet.name })
  ).toBeInTheDocument();
  // userEvent.click(screen.getByRole("link", { name: wallet.name }));
  // expect(await screen.findByRole("heading", {name: wallet.name})).toBeInTheDocument()
});
