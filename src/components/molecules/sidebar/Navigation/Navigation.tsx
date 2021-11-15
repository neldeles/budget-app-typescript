import { TNavItemProps } from "components/atoms/navigation/NavItem";
import { TNavItemSubmenuProps } from "components/atoms/navigation/NavItemSubmenu";

type TNavigationChildren = TNavItemSubmenuProps | TNavItemProps;

export type TNavigationProps = {
  // https://stackoverflow.com/questions/57627929/only-allow-specific-components-as-children-in-react-and-typescript
  children:
    | React.ReactElement<TNavigationChildren>
    | Array<React.ReactElement<TNavigationChildren>>;
};

export function Navigation({ children }: TNavigationProps) {
  return (
    <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
      {children}
    </nav>
  );
}
