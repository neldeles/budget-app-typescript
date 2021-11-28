import { useState } from "react";
import moment, { MomentInput } from "moment";

export const useDatePicker = () => {
  const [currDate, setCurrDate] = useState<moment.Moment>(moment());

  const handleChange: (value: string | moment.Moment) => void = (value) => {
    if (typeof value === "string") {
      throw new Error("No valid date received");
    }
    setCurrDate(value);
  };

  const navigatePrevMonth = (currentMonth: MomentInput) => {
    const prevMonth = moment(currentMonth, "MMM YYYY").subtract(1, "months");

    setCurrDate(prevMonth);
  };

  const navigateNextMonth = (currentMonth: MomentInput) => {
    const nextMonth = moment(currentMonth, "MMM YYYY").add(1, "months");

    // dispatch(updateDashboardDate(nextMonth));
    setCurrDate(nextMonth);
  };

  return {
    currDate,
    setCurrDate,
    handleChange,
    navigatePrevMonth,
    navigateNextMonth,
  };
};
