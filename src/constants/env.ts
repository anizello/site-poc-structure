const env = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  CERBERUS_URL: process.env.CERBERUS_URL,
  CERBERUS_LOGIN: process.env.CERBERUS_LOGIN,
  CERBERUS_PASSWORD: process.env.CERBERUS_PASSWORD,
} as const;

export default env;
