import { Navigation } from "components/atoms/navigation/Navigation";
import { HomeIcon, ChartBarIcon, FolderIcon } from "@heroicons/react/outline";

export type TSidebarProps = {
  /** Header of the sidebar */
  title: string;
};

const navigation = [
  {
    label: "Budget",
    href: "#",
    current: true,
    icon: HomeIcon,
  },
  {
    label: "Reports",
    href: "#",
    current: false,
    icon: ChartBarIcon,
  },
];

export function Sidebar({ title }: TSidebarProps) {
  /* DOING:0 # Sidebar
   *   <!-- epic:"HomeDashboard Screen" -->
   *   Sidebar contains the ff atom components:
   *   - [ ] Heading
   *   - [ ] Navigation
   *   - [ ] Sidebar Footer
   */
  return (
    <div className="flex overflow-y-auto flex-col flex-grow pt-5 pb-4 bg-white border-r border-gray-200">
      <div className="flex flex-shrink-0 items-center px-4">
        <span className="text-2xl font-medium">{title}</span>
      </div>
      <div className="flex flex-col flex-grow mt-5">
        <Navigation>
          {navigation.map((item) => (
            <Navigation.Item key={item.label} {...item} />
          ))}
          <Navigation.ItemSubMenu
            key="wallet"
            label="Wallets"
            icon={FolderIcon}
            navSubItems={[]}
          />
        </Navigation>
      </div>
    </div>
  );
}
