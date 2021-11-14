export type TNavigationProps = {
  children: React.ReactNode;
};

export function Navigation({ children }: TNavigationProps) {
  return (
    <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
      {children}
    </nav>
  );
}
