export function generateAuthConfig() {
  const config = {
    headers: { token: localStorage.token },
  };
  return config;
}
