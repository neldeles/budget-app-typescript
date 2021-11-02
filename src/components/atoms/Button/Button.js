import PropTypes from "prop-types";
import { classNames } from "util/classNames";
import { createMapReference } from "util/createMapReference";

export const VARIANT_MAPS = /*tw*/ {
  PRIMARY: "text-white bg-indigo-600 border-transparent hover:bg-indigo-700",
  SECONDARY: "text-gray-700 bg-white border-gray-300 hover:text-gray-500",
  SUCCESS: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
  DANGER: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
};

export const WIDTH_MAPS = /*tw*/ {
  DEFAULT: "justify-center",
  FULL: "justify-center w-full",
};

const width = createMapReference(WIDTH_MAPS);
const variant = createMapReference(VARIANT_MAPS);

function Button({ variant, width, type, onClick, label }) {
  return (
    <button
      className={classNames(
        "py-2 px-4 font-medium rounded-md border border-transparent shadow-sm",
        "sm:text-sm cursor-pointer",
        "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none",
        VARIANT_MAPS[variant],
        WIDTH_MAPS[width]
      )}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}

Button.variant = variant;
Button.width = width;

export { Button };

Button.propTypes = {
  /** Change button's appearance depending on its context of use.
   *
   * For Intellisense autocomplete, you may use `Button.variant` property
   * e.g.`variant={Button.variant.xxx}`
   */
  variant: PropTypes.oneOf(Object.keys(VARIANT_MAPS)).isRequired,
  /** Optional prop to set button's size*/
  width: PropTypes.oneOf(Object.keys(WIDTH_MAPS)),
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
