import { useState } from "react";
import axios from "axios";

// components
import { Input, InputWithLabel } from "components/atoms/Input";
import { Checkbox } from "components/atoms/Checkbox";
import { Button } from "components/atoms/Button";
import { Link } from "components/atoms/Link";

// services
import loginService from "services/loginService";

import { useMutation, useQueryClient } from "react-query";

export type TLoginFormProps = {
  loading: boolean;
};

export type TLoginCredentials = {
  email: string;
  password: string;
  isRemembered: boolean;
};

export function LoginForm({ loading: isLoading }: TLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const loginUser = useMutation(
    (credentials: TLoginCredentials) => loginService(credentials),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
      isRemembered: rememberMe,
    };
    loginUser.mutate(credentials, {
      // TODO:-20 Add error for incorrect credentials
      onError: (error) => {
        let message;
        if (axios.isAxiosError(error) && error.response) {
          message = error.response.data.message;
        } else message = String(error);
        setErrorMessage(message);
      },
    });
  };

  return (
    <div className="sm:mx-auto mt-8 sm:w-full sm:max-w-md">
      <div className="py-8 px-4 sm:px-10 bg-white sm:rounded-lg shadow">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <div className="mt-1">
              <InputWithLabel label="email" labelFor="email">
                <Input
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loginUser.isLoading}
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
                  disabled={loginUser.isLoading}
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
              children="Sign In"
              width="full"
              loading={loginUser.isLoading}
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
