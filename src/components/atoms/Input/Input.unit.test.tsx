import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
//👇 Imports a specific story for the test
import { InputOnly, InputWithPlaceholder } from "./Input.stories";
import { TInputProps } from "./Input";
import userEvent from "@testing-library/user-event";

test("renders an input field only", () => {
  render(<InputOnly {...(InputOnly.args as TInputProps)} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
});

test('renders an input field with placeholder text "Placeholder Text"', () => {
  const args = InputWithPlaceholder.args as TInputProps;
  render(<InputWithPlaceholder {...args} />);
  const placeholder = args.placeholder;
  const input = screen.getByRole("textbox");
  expect(input).toHaveAttribute("placeholder", placeholder);
});

test("typing some text in an input field", () => {
  const args = InputOnly.args as TInputProps;
  render(<InputOnly {...args} />);
  const input = screen.getByRole("textbox");

  userEvent.type(input, "test");
  expect(screen.getByDisplayValue("test")).toBeInTheDocument();
});
