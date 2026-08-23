import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-me",
  corsOrigins: (process.env.CORS_ORIGIN ?? "http://localhost:5173,http://localhost:3000")
    .split(",")
    .map((o) => o.trim()),
  nodeEnv: process.env.NODE_ENV ?? "development",
  importApiKey: process.env.IMPORT_API_KEY ?? "",
};
