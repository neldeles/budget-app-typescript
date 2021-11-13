import React, { useState, useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";

import { fakeUser } from "mocks/utils/generateFakeUser";

// Services
import { verify as verifyService } from "services/verify";
import { TUser } from "types/global";

function App() {
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await verifyService();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    getUser();
  }, []);

  return (
    <Router>
      {user ? (
        <AuthenticatedApp user={user} />
      ) : (
        <UnauthenticatedApp setUser={setUser} />
      )}
    </Router>
  );
}

export default App;
