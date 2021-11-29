import { Story } from "@storybook/react";
import * as React from "react";
import { DatePicker } from ".";
import { datePickerReducer } from "./datePickerReducer";
import moment from "moment";
import { DatePickerProvider } from "./DatePicker";

export default {
  title: "Components/Atoms/DatePicker",
  component: DatePicker,
  decorators: [
    (Story: Story) => {
      return (
        <DatePickerProvider>
          <Story />
        </DatePickerProvider>
      );
    },
  ],
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
    layout: "centered",
  },
};

export const Default = () => <DatePicker />;
