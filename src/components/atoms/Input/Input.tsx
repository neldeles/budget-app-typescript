import { HTMLInputTypeAttribute } from "react";
import { classNames } from "util/classNames";

export type InputProps = {
  /** The name of the Input. Also used as the Input's ID by default.
   * Displayed inside the input field.
   */
  name: string;
  type?: HTMLInputTypeAttribute;
  /** ID of the input field. Set to `name` by default. */
  id?: string;
  /** Label that is displayed outside of the input field */
  label?: string;
  /** The placeholder attribute of HTML input tag. Displayed inside the input field.  */
  placeholder?: string;
  value?: string;
};

/**
 * - expands to the width of its container
 */
export function Input({
  name,
  type = "text",
  id = name,
  label,
  placeholder,
  value,
}: InputProps) {
  if (label) {
    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1">
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
          />
        </div>
      </div>
    );
  }

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
    />
  );
}
