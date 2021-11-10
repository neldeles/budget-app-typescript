import { classNames } from "util/classNames";

const variants = ["primary", "secondary", "success", "danger"] as const;

type Variant = typeof variants[number];

const variantMaps: Record<Variant, string> = /*tw*/ {
  primary: "text-white bg-indigo-600 border-transparent hover:bg-indigo-700",
  secondary: "text-gray-700 bg-white border-gray-300 hover:text-gray-500",
  success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
  danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
};

const widths = ["default", "full"] as const;

type Width = typeof widths[number];

const widthMaps: Record<Width, string> = /*tw*/ {
  default: "justify-center",
  full: "justify-center w-full",
};

export type ButtonProps = {
  variant: Variant;
  /** Optional prop to set button's size*/
  width: Width;
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
