import PropTypes from "prop-types";

import { H2 } from "components/atoms/Heading/Heading";
import { LoginForm } from "components/molecules/LoginForm";

export function LoginScreen({ header, loading, setUser }) {
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <H2 value={header} alignment={H2.alignment.CENTER} />
      </div>
      <LoginForm loading={loading} setUser={setUser} />
    </div>
  );
}

LoginScreen.propTypes = {
  /** Content of the H2 component  */
  header: PropTypes.string,
  /** Flag for loading state of LoginForm component */
  loading: PropTypes.bool,
};
