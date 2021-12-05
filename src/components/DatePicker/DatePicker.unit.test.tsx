import { render, screen, getNodeText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { DatePicker } from ".";
import { DatePickerProvider } from "./DatePicker";
import moment from "moment";

test("displays the current month on initial render", () => {
  render(
    <DatePickerProvider>
      <DatePicker />
    </DatePickerProvider>
  );
  const currMonth = moment().format("MMM YYYY");
  const displayedMonth = screen.getByRole("button", { name: "calendar" });
  expect(displayedMonth).toHaveTextContent(currMonth);
});

test("navigate to the previous and next month", () => {
  render(
    <DatePickerProvider>
      <DatePicker />
    </DatePickerProvider>
  );

  const initialMonth = moment();
  const nextMonth = moment().add(1, "months").format("MMM YYYY");

  const displayedMonth = screen.getByRole("button", { name: "calendar" });
  userEvent.click(screen.getByRole("button", { name: /next/i }));
  expect(displayedMonth).toHaveTextContent(nextMonth);
  userEvent.click(screen.getByRole("button", { name: /previous/i }));
  expect(displayedMonth).toHaveTextContent(initialMonth.format("MMM YYYY"));
});
