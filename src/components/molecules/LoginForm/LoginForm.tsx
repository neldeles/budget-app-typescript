import { useState } from "react";

// components
import { Input, InputWithLabel } from "components/atoms/Input";
import { Checkbox } from "components/atoms/Checkbox";
import { Button } from "components/atoms/Button";
import { Link } from "components/atoms/Link";

// services
import loginService from "services/loginService";

import axios from "axios";
import { TUser } from "types/global";
// TODO:-30 # LoginForm component
// <!-- is-epic:"LoginForm" -->

export type TLoginFormProps = {
  /** useState setter method. Sets `user` object as the state of `user` */
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  loading: boolean;
  /** Pass this arg if you want to overwrite the default onSubmit handler */
  onSubmit?: (e: React.SyntheticEvent) => Promise<void>;
};

export function LoginForm({ setUser, loading, onSubmit }: TLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = onSubmit
    ? onSubmit
    : // default event handler if user didn't pass any
      async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const credentials = {
          email: email,
          password: password,
          isRemembered: rememberMe,
        };

        try {
          const response = await loginService(credentials);
          setUser(response);
        } catch (error) {
          let message;
          if (axios.isAxiosError(error) && error.response) {
            message = error.response.data.message;
          } else message = String(error);
          setErrorMessage(message);
        }
      };

  // TODO: Refactor and make dry
  if (loading) {
    return (
      <div className="sm:mx-auto mt-8 sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10 bg-white sm:rounded-lg shadow">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-1">
                <InputWithLabel label="email" labelFor="email">
                  <Input name="email" type="email" disabled={true} />
                </InputWithLabel>
              </div>
            </div>

            <div>
              <div className="mt-1">
                <InputWithLabel labelFor="password" label="password">
                  <Input name="password" type="password" disabled={true} />
                </InputWithLabel>
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
              <InputWithLabel label="email" labelFor="email">
                <Input
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputWithLabel>
            </div>
          </div>

          <div>
            <div className="mt-1">
              <InputWithLabel label="password" labelFor="password">
                <Input
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputWithLabel>
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
