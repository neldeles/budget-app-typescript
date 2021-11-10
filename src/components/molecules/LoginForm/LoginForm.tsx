import { useState } from "react";

// components
import { Input } from "components/atoms/Input";
import { Checkbox } from "components/atoms/Checkbox";
import { Button } from "components/atoms/Button";
import { Link } from "components/atoms/Link";

// services
import loginService from "services/loginService";

import { fakeUser } from "mocks/utils/generateFakeUser";
// TODO:-30 # LoginForm component
// <!-- is-epic:"LoginForm" -->

export type TLoginFormProps = {
  setUser: (user: typeof fakeUser) => void;
  loading: boolean;
};

function LoginForm(props: TLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
      isRemembered: rememberMe,
    };

    try {
      const response = await loginService(credentials);
      props.setUser(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  // TODO: Fix `loading` state of LoginForm
  // <!-- epic:"LoginForm" -->
  // - [ ] add onChange event handler
  if (props.loading) {
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
                  disabled={true}
                />
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
                variant="primary"
                type="submit"
                label="Loading..."
                width="full"
                loading={true}
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
              variant="primary"
              type="submit"
              label="Sign In"
              width="full"
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