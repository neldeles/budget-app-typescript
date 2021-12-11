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
import { fakeUserToken } from "mocks/utils/generateFakeUser";

const { Default } = composeStories(stories);

test.only("add wallet modal opens and closes", async () => {
  window.localStorage.setItem("token", fakeUserToken);
  render(<Default />);
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  userEvent.click(screen.getByRole("button", { name: /wallets/i }));
  userEvent.click(screen.getByRole("button", { name: /add wallet/i }));
  const modal = await screen.findByRole("dialog");
  expect(modal).toHaveTextContent(/modal content/i);
});
