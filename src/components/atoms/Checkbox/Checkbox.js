import PropTypes from "prop-types";

export function Checkbox({ onChange, id, name, label, ...props }) {
  return (
    <div className="flex items-center">
      <input
        className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
        id={id}
        name={name}
        type="checkbox"
        onChange={onChange}
        {...props}
      />
      <label htmlFor={name} className="block ml-2 text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  /** Event handler for the checkbox */
  onChange: PropTypes.func,
  /** ID for the checkbox */
  id: PropTypes.string.isRequired,
  /** Name for the checkbox */
  name: PropTypes.string.isRequired,
  /** Label of the checkbox */
  label: PropTypes.string,
};
