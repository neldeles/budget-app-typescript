import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomeDashboard } from "components/screens/HomeDashboard";

function AuthenticatedApp({ user }) {
  // return <AppRoutes user={user} />;
  return <h1>{user.name} </h1>;
}

function AppRoutes({ user }) {
  return (
    <Switch>
      <Route path="/dashboard" element={<HomeDashboard user={user} />} />
    </Switch>
  );
}

export { AuthenticatedApp };
