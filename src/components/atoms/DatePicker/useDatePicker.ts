import * as React from "react";
import { TDatePickerActionType } from "./datePickerReducer";

export type TDatePickerContext = {
  datePickerCurrDate: moment.Moment;
  datePickerDispatch: React.Dispatch<TDatePickerActionType>;
};

const DatePickerContext = React.createContext<TDatePickerContext | undefined>(
  undefined
);
DatePickerContext.displayName = "DatePickerContext";

export function useDatePicker() {
  const context = React.useContext(DatePickerContext);
  if (context === undefined) {
    throw new Error("🚨 useModal must be used within a <Modal /> component");
  }
  return context;
}
