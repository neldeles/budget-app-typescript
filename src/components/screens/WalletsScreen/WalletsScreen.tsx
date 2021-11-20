import { useParams } from "react-router-dom";

// TODO: WalletsScreen
export function WalletsScreen() {
  const { walletId } = useParams();
  // TODO: useEffect that fetches the wallet data for `walletId`
  return <h1>WalletsScreen</h1>;
}
