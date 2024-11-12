const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const URLs = {
  EXTERNAL: {
    CERBERUS: {
      BASE: getEnvVar("CERBERUS_URL"),
      ENDPOINTS: {
        LOGIN: "/api/login_check",
        USER_INFO: "/api/main-guest/:email",
      },
    },
  },
} as const;
