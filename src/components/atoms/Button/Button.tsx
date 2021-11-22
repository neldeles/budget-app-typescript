import { classNames } from "utils/classNames";

// Possibly convert to readonly array if we want stricter type safety
// at expense of readability
// https://tkdodo.eu/blog/the-power-of-const-assertions#extracting-types-from-objects-or-arrays
const variants = ["primary", "secondary", "success", "danger"] as const;

type Variant = typeof variants[number];

const variantMaps: Record<Variant, string> = /*tw*/ {
  primary: "text-white bg-indigo-600 border-transparent hover:bg-indigo-700",
  secondary: "text-gray-700 bg-white border-gray-300 hover:bg-gray-50",
  success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
  danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
};

const widths = ["default", "full", "3/4"] as const;

type Width = typeof widths[number];

const widthMaps: Record<Width, string> = /*tw*/ {
  default: "justify-center",
  full: "justify-center w-full",
  "3/4": "justify-center w-3/4 mt-1 leading-4",
};

export type TButtonProps = {
  variant: Variant;
  /** Optional prop to set button's size*/
  width: Width;
  /** Label of the button */
  children: React.ReactNode;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  hasIcon?: boolean;
};

export function Button({
  variant = "primary",
  width,
  children: label,
  type,
  onClick,
  loading = false,
  hasIcon = false,
}: TButtonProps) {
  return (
    <button
      className={classNames(
        "py-2 px-4 font-medium rounded-md border border-transparent shadow-sm",
        "sm:text-sm cursor-pointer",
        "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none",
        loading && "animate-pulse",
        hasIcon && "inline-flex relative items-center py-2 px-4",
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
