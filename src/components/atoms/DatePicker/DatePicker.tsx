import { useState, useContext } from "react";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { DatePickerContext } from "components/screens/BudgetScreen/BudgetScreen";

export function DatePicker() {
  const { state, dispatch } = useContext(DatePickerContext);

  const handleChange: (value: string | moment.Moment) => void = (value) => {
    if (typeof value === "string") {
      throw new Error("No valid date received");
    }

    // replace with useDatePicker dispatch
    dispatch({ type: "jumpToMonth", payload: value });
  };

  const renderInput: (props: any, openCalendar: any) => JSX.Element = (
    props,
    openCalendar
  ) => {
    return (
      <div className="inline-flex">
        <button
          className="inline-flex relative items-center py-2 px-2 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 rounded-l-md border border-gray-300"
          onClick={() => dispatch({ type: "previousMonth" })}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          type="button"
          className="inline-flex relative justify-center py-2 px-4 w-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 shadow-sm focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={openCalendar}
        >
          {props.value}
          <svg
            className="-mr-1 ml-2 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          className="inline-flex relative items-center py-2 px-2 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 rounded-r-md border border-gray-300"
          onClick={() => dispatch({ type: "nextMonth" })}
        >
          <span className="sr-only">Next</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  };
  return (
    <Datetime
      dateFormat="MMM YYYY"
      timeFormat={false}
      value={state}
      renderInput={renderInput}
      onChange={handleChange}
      closeOnSelect={true}
    />
  );
}
