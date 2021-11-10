import { Input as UnstyledInput } from ".";
import { TInputProps } from "./Input";
import { Meta, Story } from "@storybook/react";

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
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
  },
} as Meta;

const Input = (props: TInputProps) => (
  <div className="mb-4">
    <UnstyledInput {...props} />
  </div>
);

const Template: Story<TInputProps> = (args) => <Input {...args} />;

export const All = () => {
  return (
    <>
      <Input name="inputOnly" />
      <Input
        name="withPlaceholder"
        type="text"
        placeholder="With placeholder"
      />
      <Input name="withLabel" label="With label" />
    </>
  );
};

export const InputOnly = Template.bind({});
InputOnly.args = {
  name: "inputOnly",
} as TInputProps;

export const InputWithPlaceholder = Template.bind({});
InputWithPlaceholder.args = {
  ...InputOnly.args,
  name: "withPlaceholder",
  placeholder: "With placeholder",
};

export const InputWithValue = Template.bind({});
InputWithValue.args = {
  ...InputOnly.args,
  value: "Input with value",
};

export const InputDisabled = Template.bind({});
InputDisabled.args = {
  ...InputOnly.args,
  value: "Input text after disabled",
  disabled: true,
};

export const InputWithLabel = Template.bind({});
InputWithLabel.args = {
  ...InputOnly.args,
  label: "Label",
};
