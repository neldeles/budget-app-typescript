import type { TInputProps } from "./Input";

export type TInputWithLabelProps = {
  /** Label that is displayed outside of the input field */
  label: string;
  labelFor: string;
  /** Input component */
  children: React.ReactElement<TInputProps>;
};

/** Higher order component for Input if you want a label */
export function InputWithLabel({
  label,
  labelFor,
  children: child,
}: TInputWithLabelProps) {
  return (
    <div>
      <label
        htmlFor={labelFor}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">{child}</div>
    </div>
  );
}
