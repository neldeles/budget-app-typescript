import React from "react";
import { Switch, Route } from "react-router-dom";
import { BudgetDashboard } from "components/screens/BudgetDashboard";

function AuthenticatedApp({ user }) {
  // return <AppRoutes user={user} />;
  return <h1>{user.name} </h1>;
}

function AppRoutes({ user }) {
  return (
    <Switch>
      <Route path="/dashboard" element={<BudgetDashboard user={user} />} />
    </Switch>
  );
}

export { AuthenticatedApp };
