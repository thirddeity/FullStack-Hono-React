import { Hono } from "hono";
import { createResponse, db } from ".";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "@repo/schema";

const app = new Hono();

export const loginRoutes = app
  .post("/login", zValidator("json", loginSchema, (result, c) => {
    if (!result.success) return c.json(createResponse(false, "Login Failed"))
  }),
    async (c) => {
      return c.json(createResponse(true, "Login successful"));
    }
  )
