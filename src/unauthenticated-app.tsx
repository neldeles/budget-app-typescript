import { Heading } from "components/atoms/Heading";
import { LoginForm } from "components/molecules/LoginForm";
import { LoginScreen } from "components/screens/LoginScreen";
import { TUser } from "types/global";

type TUnauthenticatedAppProps = {
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

function UnauthenticatedApp({ setUser }: TUnauthenticatedAppProps) {
  return (
    <LoginScreen
      form={<LoginForm setUser={setUser} loading={false} />}
      heading={
        <Heading
          alignment="center"
          headingLevel="h2"
          size="large"
          value="Sign in to your account"
        />
      }
    />
  );
}

export { UnauthenticatedApp };
