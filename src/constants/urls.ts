import env from "./env";

export const URLs = {
  EXTERNAL: {
    CERBERUS: {
      BASE: env.CERBERUS_URL,
      ENDPOINTS: {
        LOGIN: "/api/login_check",
        USER_INFO: "/api/main-guest/:email",
      },
    },
  },
  INTERNAL: {
    USER: {
      GET: "/api/user/get-user-auth-info",
    },
  },
} as const;
