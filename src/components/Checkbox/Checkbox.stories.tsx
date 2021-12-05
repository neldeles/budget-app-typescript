import { Meta, Story } from "@storybook/react";
import { Checkbox } from ".";
import { CheckboxProps } from "./Checkbox";

export default {
  title: "components/Checkbox",
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const All = () => (
  <div>
    <Checkbox
      name="checked"
      id="checked"
      label="This is an unchecked Checkbox."
    />
    <Checkbox
      name="unchecked"
      id="unchecked"
      label="This is a checked Checkbox."
      checked={true}
    />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  id: "test-checkbox",
  name: "test-checkbox",
  label: "This is a label",
};
