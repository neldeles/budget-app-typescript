import {
  render,
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Sidebar.stories";
import { auth } from "utils/tests";
import faker from "faker";
import { db } from "mocks/db";

const { Default } = composeStories(stories);

test("sidebar sub-menu accordion expands and unexpands", async () => {
  auth.setToken();
  render(<Default />);
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  userEvent.click(screen.getByRole("button", { name: /wallets/i }));
  expect(
    screen.getByRole("button", { name: /create wallet/i })
  ).toBeInTheDocument();
});
test("'add wallet' modal opens and closes", async () => {
  auth.setToken();
  render(<Default />);
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  userEvent.click(screen.getByRole("button", { name: /wallets/i }));
  userEvent.click(screen.getByRole("button", { name: /create wallet/i }));
  const modal = await screen.findByRole("dialog");
  const inModal = within(modal);
  userEvent.click(inModal.getByRole("button", { name: /close/i }));
  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

test("it should add the new wallet in the sidebar", async () => {
  const walletName = faker.lorem.word();
  auth.setToken();
  render(<Default />);
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  userEvent.click(screen.getByRole("button", { name: /wallets/i }));
  userEvent.click(screen.getByRole("button", { name: /create wallet/i }));

  const modal = await screen.findByRole("dialog");
  const inModal = within(modal);
  userEvent.type(inModal.getByRole("textbox"), walletName);
  userEvent.click(inModal.getByRole("button", { name: /create/i }));
  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  expect(db.wallet.count()).toBe(1);
  expect(
    await screen.findByRole("link", { name: walletName })
  ).toBeInTheDocument();
});
