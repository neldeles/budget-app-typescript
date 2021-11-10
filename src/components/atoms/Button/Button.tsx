import { classNames } from "util/classNames";

const buttonVariants = /*tw*/ {
  primary: "text-white bg-indigo-600 border-transparent hover:bg-indigo-700",
  secondary: "text-gray-700 bg-white border-gray-300 hover:text-gray-500",
  success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
  danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
};

const widths = /*tw*/ {
  default: "justify-center",
  full: "justify-center w-full",
};

const createMaps = <ObjectMapType extends Record<string, string>>(
  obj: ObjectMapType
) => obj;

const variantMaps = createMaps(buttonVariants);

const widthMaps = createMaps(widths);

export type ButtonProps = {
  variant: keyof typeof variantMaps;
  /** Optional prop to set button's size*/
  width: keyof typeof widthMaps;
  label: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export function Button({
  variant = "primary",
  width,
  label,
  type,
  onClick,
  loading = false,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "py-2 px-4 font-medium rounded-md border border-transparent shadow-sm",
        "sm:text-sm cursor-pointer",
        "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none",
        loading && "animate-pulse",
        variantMaps[variant],
        widthMaps[width]
      )}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}
