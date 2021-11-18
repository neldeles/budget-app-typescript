import React from "react";
import { render, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import { useField } from ".";

test("exposes the onChange and clearState functions", () => {
  let input: any;
  function TestComponent() {
    input = useField("testInput", "text");
    const { clearState, ...inputFieldProps } = input;
    return <input aria-label="testInput" {...inputFieldProps} />;
  }
  render(<TestComponent />);
  expect(input.value).toBe("");
  const inputField = screen.getByLabelText(/testInput/i);
  userEvent.type(inputField, "test");
  expect(input.value).toBe("test");
  act(() => input.clearState());
  expect(input.value).toBe("");
});

// in general this is what's abstracted by the renderHook function

// test("exposes the onChange and clearState functions", () => {
//   let input;
//   function TestComponent() {
//     input = useField("testInput", "text");
//     return null;
//   }
//   render(<TestComponent />);
//   expect(input.value).toBe("");
//   act(() => input.onChange({ target: { value: "test" } }));
//   expect(input.value).toBe("test");
//   act(() => input.clearState());
//   expect(input.value).toBe("");
// });

// sample if we were to use the @testing-library/react-hooks library

// test("exposes the onChange and clearState functions", () => {
//   const { result } = renderHook(useField);
//   expect(result.current.value).toBe("");
//   act(() => result.current.onChange({ target: { value: "test" } }));
//   expect(result.current.value).toBe("test");
//   act(() => result.current.clearState());
//   expect(result.current.value).toBe("");
// });
