import "dotenv/config";
import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, userInfoSchema } from "@repo/schema";
import { Hono } from "hono";
import { cors } from "hono/cors";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { userInfoRoutes } from "./user.info";
import { loginRoutes } from "./login";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);

const app = new Hono().basePath("/api");
const port = 3000;
console.log("api server วิ่งบน http://localhost:", port);

app.use(
  "*",
  cors({
    origin: "http://localhost:3500",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

export const createResponse = <T>(data: T, message = "success", code = 200, status: "ok" | "no" = "ok") => {
  return {
    code,
    status,
    message,
    detail: null,
    data,
  };
};

const routes = app
  .route("/", userInfoRoutes)
  .route("/", loginRoutes)


serve({ fetch: app.fetch, port });

export type AppType = typeof routes;