import PropTypes from "prop-types";
import { classNames } from "util/classNames";

const VARIANT_MAPS = /*tw*/ {
  PRIMARY: "text-white bg-indigo-600 border-transparent hover:bg-indigo-700",
  SECONDARY: "text-gray-700 bg-white border-gray-300 hover:text-gray-500",
  SUCCESS: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
  DANGER: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
};

function Button({ variant, type, onClick, label, ...props }) {
  return (
    <button
      className={classNames(
        "py-2 px-4 font-medium rounded-md border border-transparent shadow-sm",
        "sm:text-sm cursor-pointer",
        "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none",
        variant
      )}
      onClick={onClick}
      type={type}
      {...props}
    >
      {label}
    </button>
  );
}

Button.variant = VARIANT_MAPS;

export { Button };

Button.propTypes = {
  /** Change button's appearance depending on its context of use. */
  variant: PropTypes.oneOf(Object.keys(Button.variant)).isRequired,
  /** The button content */
  label: PropTypes.string.isRequired,
  /** Button type */
  type: PropTypes.oneOf(["button", "submit", "reset"]).isRequired,
  /** Optional click handler */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: undefined,
};
