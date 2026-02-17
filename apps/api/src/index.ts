import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, userInfoSchema } from "@repo/schema";
import { Hono } from "hono";
import { cors } from "hono/cors";

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

const createResponse = <T>(data: T, message = "success", code = 200) => {
  return {
    code,
    status: "ok",
    message,
    detail: null,
    data,
  };
};

const routes = app
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { username, password } = c.req.valid("json");
    return c.json(createResponse(true, "Login successful"));
  })
  .get("/userInfo", (c) => {
    const data = {
      email: "test@example.com",
      role: "",
      framework: "nuxt",
      comment: "Loaded from Hono API",
    };

    return c.json(createResponse(data));
  })
  .post("/userInfo", zValidator("json", userInfoSchema), async (c) => {
    const { email, role, framework, comment } = c.req.valid("json");
    const data = {
      email,
      role,
      comment,
      framework,
      id: 1,
    };
    return c.json(createResponse(data, "Login successful"));
  });


serve({ fetch: app.fetch, port });

export type AppType = typeof routes;