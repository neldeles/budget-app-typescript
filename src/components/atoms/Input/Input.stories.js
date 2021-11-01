import { Input as UnstyledInput } from ".";

export default {
  title: "Components/Atoms/Input",
  component: UnstyledInput,
  decorators: [(Story) => <div className="w-1/2">{Story()}</div>],
  parameters: {
    componentSubtitle: "Primary UI component for user input.",
    docs: {
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
};

const Input = (props) => (
  <div className="mb-4">
    <UnstyledInput {...props} />
  </div>
);

const Template = (args) => <Input {...args} />;

export const All = () => {
  return (
    <>
      <Input name="inputOnly" />
      <Input placeholder="With placeholder" />
      <Input value="With value" />
      <Input value="Disabled" disabled />
      <Input label="With label" />
    </>
  );
};

export const InputOnly = Template.bind({});
InputOnly.args = {
  name: "Input",
  type: "text",
};

export const InputWithPlaceholder = Template.bind({});
InputWithPlaceholder.args = {
  ...InputOnly.args,
  name: "withPlaceholder",
  placeholder: "With placeholder",
};

export const InputWithValue = Template.bind({});
InputWithValue.args = {
  ...InputOnly.args,
  value: "With value",
};

export const InputDisabled = Template.bind({});
InputDisabled.args = {
  ...InputOnly.args,
  value: "Disabled",
  disabled: true,
};

export const InputWithLabel = Template.bind({});
InputWithLabel.args = {
  ...InputOnly.args,
  label: "Label",
};
