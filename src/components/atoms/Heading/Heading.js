import PropTypes from "prop-types";
import { classNames } from "util/classNames";
import { createMapReference } from "util/createMapReference";

const ALIGNMENT_MAP = /*tw*/ {
  LEFT: "text-left",
  CENTER: "text-center",
  RIGHT: "text-right ",
};

const alignment = createMapReference(ALIGNMENT_MAP);

function H2({ value, alignment }) {
  return (
    <h2
      className={classNames(
        "text-3xl font-extrabold text-gray-900",
        ALIGNMENT_MAP[alignment]
      )}
    >
      {value}
    </h2>
  );
}

H2.alignment = alignment;

export { H2 };

H2.propTypes = {
  /** The header text */
  value: PropTypes.string.isRequired,
  /** Alignment of the heading */
  alignment: PropTypes.oneOf(Object.keys(ALIGNMENT_MAP)),
};

H2.defaultProps = {
  alignment: H2.alignment.LEFT,
};
