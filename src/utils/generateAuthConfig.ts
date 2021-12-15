export function generateAuthConfig(overrides: Record<string, unknown> = {}) {
  const config = {
    headers: { token: localStorage.token },
    ...overrides,
  };
  return config;
}
