import { classNames } from "utils/classNames";
import * as React from "react";

const alignment = ["left", "center", "right"] as const;
type Alignment = typeof alignment[number];
const alignmentMap: Record<Alignment, string> = /*tw*/ {
  left: "text-left",
  center: "text-center",
  right: "text-right ",
};

const size = ["small", "medium", "large"] as const;
type Size = typeof size[number];
const sizeMap: Record<Size, string> = /*tw*/ {
  small: "text-sm",
  medium: "text-lg",
  large: "text-3xl",
};

export type THeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  /** Heading element */
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** The heading text */
  value: string;
  /** Alignment of the heading */
  alignment: Alignment;
  /** Size of the heading text */
  size: Size;
};

export function Heading({
  as: HeadingElement = "h1",
  value,
  alignment,
  size,
}: THeadingProps) {
  return (
    <HeadingElement
      className={classNames(
        "font-extrabold text-gray-900",
        alignmentMap[alignment],
        sizeMap[size]
      )}
    >
      {value}
    </HeadingElement>
  );
}
