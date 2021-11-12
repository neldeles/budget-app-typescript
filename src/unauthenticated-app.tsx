import { Heading } from "components/atoms/Heading";
import { LoginForm } from "components/molecules/LoginForm";
import { LoginScreen } from "components/screens/LoginScreen";
import { fakeUser } from "mocks/utils/generateFakeUser";

type TUnauthenticatedAppProps = {
  setUser: React.Dispatch<React.SetStateAction<typeof fakeUser | null>>;
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
