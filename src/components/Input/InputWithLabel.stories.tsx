import { Meta, Story } from "@storybook/react";
import { Input, InputWithLabel } from ".";
import { TInputWithLabelProps } from "./InputWithLabel";
import { InputOnly } from "./Input.stories";
import { TInputProps } from "./Input";

export default {
  title: "components/InputWithLabel",
  component: InputWithLabel,
  subcomponents: { Input },
} as Meta;

const Template: Story<TInputWithLabelProps> = (args) => (
  <InputWithLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "This is a label",
  labelFor: InputOnly.args!.name,
  children: <Input {...(InputOnly.args as TInputProps)} />,
};
