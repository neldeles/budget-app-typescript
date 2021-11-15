import { Disclosure } from "@headlessui/react";
import { THeroIcon } from "types/global";
import { classNames } from "util/classNames";

type TNavSubItems = {
  label: string;
  href: string;
  current: boolean;
};

export type TNavItemSubmenuProps = {
  label: string;
  /** We are using the [Heroicons](https://github.com/tailwindlabs/heroicons) React library.
   * Pass the constructor as an argument i.e. `icon={HomeIcon}`
   */
  icon: THeroIcon;
  /**
   * `navSubItems` can by dynamically generated i.e. populated with items fetched
   *  from the database.
   */
  navSubItems: TNavSubItems[];
  children?: React.ReactNode;
};

export function NavItemSubmenu({
  label,
  icon: Icon,
  navSubItems,
  children,
}: TNavItemSubmenuProps) {
  return (
    <Disclosure as="div" className="space-y-1">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              "group",
              "flex items-center py-2 pr-1 pl-2 w-full text-sm font-medium text-left rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none",
              "text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50"
            )}
          >
            <Icon
              className={classNames(
                "flex-shrink-0 mr-3 w-6 h-6",
                "text-gray-400 group-hover:text-gray-500"
              )}
              aria-hidden="true"
            />
            <span className="flex-1">{label}</span>
            <svg
              className={classNames(
                "flex-shrink-0 ml-3 w-5 h-5 group-hover:text-gray-400 transition-colors duration-150 ease-in-out transform",
                open ? "text-gray-400 rotate-90" : "text-gray-300"
              )}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
            </svg>
          </Disclosure.Button>
          <Disclosure.Panel className="space-y-1">
            {navSubItems.map((subItem) => (
              <a
                key={subItem.label}
                href={subItem.href}
                // tw="w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                className={classNames(
                  "group flex items-center py-2 pr-2 pl-11 w-full text-sm font-medium",
                  subItem.current
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50"
                )}
              >
                {subItem.label}
              </a>
            ))}
            {children}
            {/* <div tw="flex justify-center">
                <Button
                  onClick={handleModalOpen}
                  variant="primary"
                  tw="w-3/4 mt-1 leading-4"
                >
                  Add wallets
                </Button>
              </div> */}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
