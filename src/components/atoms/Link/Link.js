import { Link as RouterLink } from "react-router-dom";

// TODO: Add variants for the font size

/** A styled `Link` component of [react-router-dom](https://reactrouter.com/web/api/Link). */
export function Link({ ...props }) {
  return (
    <RouterLink
      className=" font-medium text-indigo-600 hover:text-indigo-500"
      {...props}
    />
  );
}
