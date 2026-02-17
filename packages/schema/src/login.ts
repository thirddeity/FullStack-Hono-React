import z from "zod";
import { validateWithZod } from "./zodValidator";

export type LoginForm = {
  username: string;
  password: string;
  remember: boolean;
};

export const initialLogin: LoginForm = {
  username: "",
  password: "",
  remember: false,
};

export const loginSchema = z.object({
  username: z.string("กรุณาระบุ username").min(2, "Username ต้องมีอย่างน้อย 2 ตัวอักษร"),
  password: z.string("กรุณาระบุ password").min(6, "Password ต้องมีอย่างน้อย 6 ตัวอักษร"),
  remember: z.boolean().optional(),
});

export const validateLogin = validateWithZod(loginSchema);
