import { Hono } from "hono";
import { createResponse, db } from ".";
import { userInfo } from "./db/schema";
import { zValidator } from "@hono/zod-validator";
import { userInfoSchema } from "@repo/schema";

const app = new Hono();

export const userInfoRoutes = app
  .get("/userInfo", async (c) => {
    try {
      const data = await db.select().from(userInfo);
      console.log("data =>", data)
      return c.json(createResponse(data));
    } catch (error: any) {
      return c.json(createResponse(null, `${error.cause.code}: DB not connected`, 404, "no"))
    }
  })
  .post("/userInfo", zValidator("json", userInfoSchema), async (c) => {
    const { email, role, framework, comment } = c.req.valid("json");
    const data = {
      id: 1,
      email,
      role,
      comment,
      framework,
    };
    return c.json(createResponse(data));
  });
