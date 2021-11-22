import { HTMLInputTypeAttribute } from "react";
import { classNames } from "utils/classNames";

export type TInputProps = {
  /** The name of the Input. Also used as the Input's ID by default.
   * Displayed inside the input field.
   */
  name: string;
  type?: HTMLInputTypeAttribute;
  /** ID of the input field. Set to `name` by default. */
  id?: string;
  /** The placeholder attribute of HTML input tag. Displayed inside the input field.  */
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

/**
 * - expands to the width of its container
 */
export function Input({
  name,
  type = "text",
  id = name,
  placeholder,
  disabled = false,
  value,
  onChange,
}: TInputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={classNames(
        // container
        "block py-2 px-3 w-full rounded-md border border-gray-300 shadow-sm appearance-none",
        // text
        "sm:text-sm placeholder-gray-400 disabled:text-gray-300",
        "focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
      )}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
