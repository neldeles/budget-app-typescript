import { TNavigationProps } from "components/molecules/sidebar/Navigation";

export type TSidebarProps = {
  navigation: React.ReactElement<TNavigationProps>;
  /** Header of the sidebar */
  title: string;
};

export function Sidebar({ navigation, title }: TSidebarProps) {
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
      <div className="flex flex-col flex-grow mt-5">{navigation}</div>
    </div>
  );
}
