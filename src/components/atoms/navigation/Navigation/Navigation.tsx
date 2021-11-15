import * as React from "react";
import { NavItem, TNavItemProps } from "components/atoms/navigation/NavItem";
import {
  NavItemSubmenu,
  TNavItemSubmenuProps,
} from "components/atoms/navigation/NavItemSubmenu";

type TNavigationChildren = TNavItemSubmenuProps | TNavItemProps;

export type TNavigationProps = {
  // https://stackoverflow.com/questions/57627929/only-allow-specific-components-as-children-in-react-and-typescript
  children:
    | React.ReactElement<TNavigationChildren>
    | Array<React.ReactElement<TNavigationChildren>>
    | React.ReactFragment;
};

function Navigation({ children }: TNavigationProps) {
  return (
    <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
      {children}
    </nav>
  );
}

Navigation.Item = NavItem;
Navigation.ItemSubMenu = NavItemSubmenu;

export { Navigation };
