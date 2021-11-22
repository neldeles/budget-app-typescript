import { Navigation } from "components/atoms/navigation/Navigation";
import { HomeIcon, ChartBarIcon, FolderIcon } from "@heroicons/react/outline";
import { TUser } from "types/global";
import { Button } from "components/atoms/Button";
import { useQueryClient } from "react-query";

export type TSidebarProps = {
  /** Header of the sidebar */
  title: string;
  footer: React.ReactElement<TSidebarFooterProps>;
};

const navigation = [
  {
    label: "Budget",
    to: "/",
    // TODO: implement react-router-dom.useMatch for active link (lesson 252 epicreact)
    current: true,
    icon: HomeIcon,
  },
  {
    label: "Reports",
    to: "/reports",
    current: false,
    icon: ChartBarIcon,
  },
];

export function Sidebar({ title, footer }: TSidebarProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
      <div className="flex overflow-y-auto flex-col flex-grow pt-5 pb-4">
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
            >
              <div className="flex justify-center">
                <Button variant="primary" width="3/4" children="Add Wallet" />
              </div>
            </Navigation.ItemSubMenu>
          </Navigation>
        </div>
      </div>
      <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
        {footer}
      </div>
    </div>
  );
}

export type TSidebarFooterProps = {
  user: TUser;
};

function SidebarFooter({ user }: TSidebarFooterProps) {
  const queryClient = useQueryClient();

  const handleLogout = () => {
    window.localStorage.clear();
    queryClient.invalidateQueries("user");
  };

  return (
    <div className="text-left">
      <div className="ml-3">
        <p className="text-base font-medium text-gray-700">{user.name}</p>
        <button
          onClick={handleLogout}
          className="text-xs font-medium text-gray-500 hover:text-pink-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

Sidebar.Footer = SidebarFooter;
