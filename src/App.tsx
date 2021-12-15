import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";

// Services
import { verifyUserService } from "services/verifyUserService";
import { useQuery } from "react-query";

function App() {
  const user = useQuery("user", verifyUserService);
  const isLoggedIn = user.isSuccess && user !== undefined;

  if (user.isLoading) {
    return (
      <div aria-label="loading" className="min-h-screen bg-gray-50">
        <span></span>
      </div>
    );
  }

  return <>{isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>;
}

export default App;
