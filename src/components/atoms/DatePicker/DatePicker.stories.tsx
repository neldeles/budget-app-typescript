import { Story } from "@storybook/react";
import { DatePicker } from ".";

export default {
  title: "Components/Atoms/DatePicker",
  component: DatePicker,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
    layout: "centered",
  },
};

export const Default = () => <DatePicker />;
