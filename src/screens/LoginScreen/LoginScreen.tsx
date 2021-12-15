import { Heading } from "components/Heading";
import { LoginForm } from "screens/LoginScreen/components/LoginForm";

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
      <LoginForm />
    </div>
  );
}
