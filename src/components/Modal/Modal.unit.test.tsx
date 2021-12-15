import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Modal.stories";

const { WithDismissButton } = composeStories(stories);

test("can be opened and closed", async () => {
  render(<WithDismissButton />);

  userEvent.click(screen.getByRole("button", { name: /open modal/i }));
  const modal = await screen.findByRole("dialog");
  expect(modal).toHaveAttribute("aria-label", "Modal Label");
  const inModal = within(screen.getByRole("dialog"));
  expect(inModal.getByLabelText("Modal Content")).toMatchInlineSnapshot(`
    <div
      aria-label="Modal Content"
    >
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus doloremque voluptatibus maxime minus et impedit adipisci suscipit, blanditiis id tenetur ipsum voluptatum accusamus assumenda quibusdam consequatur ut ipsam quaerat dolorem?
    </div>
  `);

  userEvent.click(inModal.getByRole("button", { name: /close/i }));
  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
