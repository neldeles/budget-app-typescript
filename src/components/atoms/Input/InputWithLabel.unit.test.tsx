import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
//👇 Imports a specific story for the test
import * as InputWithLabelStories from "./InputWithLabel.stories";
import { TInputWithLabelProps } from "./InputWithLabel";

test("renders an input text field with a label", () => {
  // need "as" because of https://github.com/storybookjs/storybook/issues/13747
  const args = InputWithLabelStories.Default.args as TInputWithLabelProps;
  render(<InputWithLabelStories.Default {...args} />);
  if (!args.label) {
    throw new Error("🚨 Make sure label args in story is defined.");
  }
  const label = args.label;
  const input = screen.getByLabelText("word");
  expect(input).toHaveAttribute("type", "text");
});
