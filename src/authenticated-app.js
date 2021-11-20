import { Routes, Route } from "react-router-dom";
import { BudgetScreen } from "components/screens/BudgetScreen";
import { ReportsScreen } from "components/screens/ReportsScreen";
import { WalletsScreen } from "components/screens/WalletsScreen";
import { NotFoundScreen } from "components/screens/NotFoundScreen";

function AuthenticatedApp({ user }) {
  return <AppRoutes user={user} />;
  // return <h1>{user.name} </h1>;
}

function AppRoutes({ user }) {
  return (
    <Routes>
      <Route path="/" element={<BudgetScreen user={user} />} />
      <Route path="/reports" element={<ReportsScreen user={user} />} />
      <Route path="/wallet/:walletId" element={<WalletsScreen user={user} />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export { AuthenticatedApp };
