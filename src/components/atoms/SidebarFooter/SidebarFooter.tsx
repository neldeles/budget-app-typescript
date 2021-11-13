import { TUser } from "types/global";

export type TSidebarFooterProps = {
  user: TUser;
};

export function SidebarFooter({ user }: TSidebarFooterProps) {
  const handleLogout = () => {
    console.log("Logout clicked");
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
