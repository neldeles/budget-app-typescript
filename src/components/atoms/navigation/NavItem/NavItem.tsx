import { classNames } from "util/classNames";
import { THeroIcon } from "types/global";
import { Link } from "react-router-dom";
import { To } from "history";

export type TNavItemProps = {
  /** Label of the navigation item */
  label: string;
  to: To;
  /** Currently selected flag */
  current: boolean;
  /** We are using the [Heroicons](https://github.com/tailwindlabs/heroicons) React library.
   * Pass the constructor as an argument i.e. `icon={HomeIcon}`
   */
  icon: THeroIcon;
};

/**
 * Functionally acts as links to navigate to the different pages of your web app.
 */

export function NavItem({ label, to, current, icon: Icon }: TNavItemProps) {
  return (
    // if item has no submenu items
    <div>
      <Link
        to={to}
        className={classNames(
          "group flex items-center py-2 pl-2 w-full text-sm font-medium rounded-md",
          current
            ? "text-gray-900 bg-gray-100"
            : "text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50"
        )}
      >
        <Icon
          className={classNames(
            "flex-shrink-0 mr-3 w-6 h-6",
            current
              ? "text-gray-500"
              : "text-gray-400 group-hover:text-gray-500"
          )}
          aria-hidden="true"
        />
        {label}
      </Link>
    </div>
  );
}
