import moment from "moment";

export type TDatePickerActionType =
  | { type: "previousMonth" }
  | { type: "nextMonth" }
  | { type: "jumpToMonth"; payload: moment.Moment };

export function datePickerReducer(
  state: moment.Moment,
  action: TDatePickerActionType
): moment.Moment {
  let newState;
  switch (action.type) {
    case "previousMonth":
      newState = moment(state, "MMM YYYY").subtract(1, "months");
      break;
    case "nextMonth":
      newState = moment(state, "MMM YYYY").add(1, "months");
      break;
    case "jumpToMonth":
      newState = action.payload;
      break;
    default:
      throw new Error("Reducer should only return month +/- 1");
  }
  return newState;
}
