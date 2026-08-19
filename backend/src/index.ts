import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import { createCrudRouter } from "./routes/crudRouter.js";
import authRouter from "./routes/auth.js";
import {
  businesses,
  users,
  categories,
  locations,
  adminUsers,
  products,
  services,
  leads,
  rfqs,
  reviews,
} from "./data/seed.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/businesses", createCrudRouter(businesses));
app.use("/api/users", createCrudRouter(users));
app.use("/api/categories", createCrudRouter(categories));
app.use("/api/locations", createCrudRouter(locations));
app.use("/api/admin-users", createCrudRouter(adminUsers));
app.use("/api/products", createCrudRouter(products));
app.use("/api/services", createCrudRouter(services));
app.use("/api/leads", createCrudRouter(leads));
app.use("/api/rfqs", createCrudRouter(rfqs));
app.use("/api/reviews", createCrudRouter(reviews));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}`);
});
