import { Checkbox } from ".";

export default {
  title: "components/atoms/Checkbox",
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const All = () => (
  <div>
    <Checkbox id="checked" label="This is a checkbox label" />
    <Checkbox id="unchecked" label="This is a checkbox label" checked />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  id: "test-checkbox",
  name: "test-checkbox",
  label: "This is a label",
};
