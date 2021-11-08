import { classNames } from "util/classNames";

const alignment = ["left", "center", "right"] as const;

type Alignment = typeof alignment[number];

const alignmentMap: Record<Alignment, string> = /*tw*/ {
  left: "text-left",
  center: "text-center",
  right: "text-right ",
};

export type H2Props = {
  /** The header text */
  value: string;
  /** Alignment of the heading */
  alignment: Alignment;
};

export function H2({ value, alignment }: H2Props) {
  return (
    <h2
      className={classNames(
        "text-3xl font-extrabold text-gray-900",
        alignmentMap[alignment]
      )}
    >
      {value}
    </h2>
  );
}
