import { Heading } from "components/atoms/Heading";
import { LoginForm } from "components/molecules/LoginForm";

export function LoginScreen() {
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Heading
          alignment="center"
          as="h2"
          size="large"
          value="Sign in to your account"
        />
      </div>
      <LoginForm loading={false} />
    </div>
  );
}
