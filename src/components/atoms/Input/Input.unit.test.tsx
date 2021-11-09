import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
//👇 Imports a specific story for the test
import {
  InputOnly,
  InputWithLabel,
  InputWithPlaceholder,
} from "./Input.stories";
import { TInputProps } from "./Input";

test("renders an input field only", () => {
  render(<InputOnly {...(InputOnly.args as TInputProps)} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
});

test("renders an input text field with a label", () => {
  // need "as" because of https://github.com/storybookjs/storybook/issues/13747
  const args = InputWithLabel.args as TInputProps;
  render(<InputWithLabel {...args} />);
  const label = args.label;
  const input = screen.getByLabelText(label as string);
  expect(input).toHaveAttribute("type", "text");
});

test('renders an input field with placeholder text "Placeholder Text"', () => {
  const args = InputWithPlaceholder.args as TInputProps;
  render(<InputWithPlaceholder {...args} />);
  const placeholder = args.placeholder;
  const input = screen.getByRole("textbox");
  expect(input).toHaveAttribute("placeholder", placeholder);
});
