import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

//👇 Imports a specific story for the test
import {
  InputOnly,
  InputWithLabel,
  InputWithPlaceholder,
} from "./Input.stories";

test("renders an input field only", () => {
  render(<InputOnly {...InputOnly.args} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
});

test('renders an input field with a label "Test Label"', () => {
  render(<InputWithLabel {...InputWithLabel.args} />);
  const label = InputWithLabel.args.label;
  const input = screen.getByLabelText(label);
  expect(input).toHaveAttribute("type", "text");
});

test('renders an input field with placeholder text "Placeholder Text"', () => {
  render(<InputWithPlaceholder {...InputWithPlaceholder.args} />);
  const placeholder = InputWithPlaceholder.args.placeholder;
  const input = screen.getByRole("textbox");
  expect(input).toHaveAttribute("placeholder", placeholder);
});
