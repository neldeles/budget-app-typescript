import { useState } from "react";
import PropTypes from "prop-types";

// components
import { Input } from "components/atoms/Input";
import { Checkbox } from "components/atoms/Checkbox";
import { Link } from "components/atoms/Link";
import { Button } from "components/atoms/Button";

// services
import loginService from "services/loginService";

// TODO:-30 # LoginForm component
// <!-- is-epic:"LoginForm" -->

function LoginForm({ setUser, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
      isRemembered: rememberMe,
    };

    try {
      const response = await loginService(credentials);
      setUser(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  // TODO: Fix `loading` state of LoginForm
  // <!-- epic:"LoginForm" -->
  // - [ ] add onChange event handler
  if (loading) {
    return (
      <div className="sm:mx-auto mt-8 sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10 bg-white sm:rounded-lg shadow">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-1">
                <Input label="email" name="email" type="email" disabled />
              </div>
            </div>

            <div>
              <div className="mt-1">
                <Input
                  label="password"
                  name="password"
                  type="password"
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Checkbox
                  id="remember_me"
                  name="remember_me"
                  label="Remember me"
                />
              </div>

              <div className="text-sm">
                <Link to="/register">Register new account</Link>
              </div>
            </div>

            <div>
              <Button
                variant={Button.variant.PRIMARY}
                type="submit"
                label="Loading..."
                className="flex justify-center w-full animate-pulse"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="sm:mx-auto mt-8 sm:w-full sm:max-w-md">
      <div className="py-8 px-4 sm:px-10 bg-white sm:rounded-lg shadow">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="mt-1">
              <Input
                label="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="mt-1">
              <Input
                label="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {
                // TODO: Create a test for the login checkbox
                // <!-- epic:LoginForm -->
              }
              <Checkbox
                id="remember_me"
                name="remember_me"
                label="Remember me"
                onChange={() => setRememberMe(!rememberMe)}
              />
            </div>

            <div className="text-sm">
              {
                // TODO: Create a test for register new account Link
                // <!-- epic:LoginForm -->
              }
              <Link to="/register">Register new account</Link>
            </div>
          </div>

          <div>
            <Button
              variant={Button.variant.PRIMARY}
              type="submit"
              label="Sign In"
              className="flex justify-center w-full"
            />
          </div>
        </form>
        {errorMessage ? (
          <div>
            <p role="alert">{errorMessage}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { LoginForm };

LoginForm.propTypes = {
  /** To be used for rendering state */
  loading: PropTypes.bool,
};
