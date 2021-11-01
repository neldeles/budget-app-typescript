import PropTypes from "prop-types";

import { classNames } from "util/classNames";

/**
 * - expands to the width of its container
 */
export function Input({ label, placeholder, name, type, id = name, ...props }) {
  if (label) {
    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div tw="mt-1">
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
            {...props}
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
      {...props}
    />
  );
}

Input.propTypes = {
  /** Label that is displayed outside of the input field */
  label: PropTypes.string,
  /** The placeholder attribute of HTML input tag. Displayed inside the input field.  */
  placeholder: PropTypes.string,
  /** The name of the Input. Also used as the Input's ID by default.
   * Displayed inside the input field.
   */
  name: PropTypes.string.isRequired,
  /** The HTML input type attribute */
  type: PropTypes.string.isRequired,
  /** ID of the input field. Set to `name` by default. */
  id: PropTypes.string,
};
