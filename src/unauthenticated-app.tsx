import { Heading } from "components/atoms/Heading";
import { LoginForm } from "components/molecules/LoginForm";
import { LoginScreen } from "components/screens/LoginScreen";
import { TUser } from "types/global";

function UnauthenticatedApp() {
  return (
    <LoginScreen
      form={<LoginForm loading={false} />}
      heading={
        <Heading
          alignment="center"
          as="h2"
          size="large"
          value="Sign in to your account"
        />
      }
    />
  );
}

export { UnauthenticatedApp };
