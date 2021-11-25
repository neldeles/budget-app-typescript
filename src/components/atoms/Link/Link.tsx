import { Link as RouterLink, LinkProps } from "react-router-dom";

// TODO:20 Add variants for the font size

/** A styled `Link` component of [react-router-dom](https://reactrouter.com/web/api/Link). */
export function Link({ children, ...props }: LinkProps) {
  return (
    <RouterLink
      className=" font-medium text-indigo-600 hover:text-indigo-500"
      {...props}
    >
      {children}
    </RouterLink>
  );
}
