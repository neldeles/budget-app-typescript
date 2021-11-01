import PropTypes from "prop-types";

function H2({ value, ...props }) {
  return (
    <h2 className="text-3xl font-extrabold text-gray-900" {...props}>
      {value}
    </h2>
  );
}

export { H2 };

H2.propTypes = {
  /** The header text */
  value: PropTypes.string.isRequired,
};
