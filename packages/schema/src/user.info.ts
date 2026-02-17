import z from "zod";
import { validateWithZod } from "./zodValidator";

export type UserInfoForm = {
  email: string;
  role: string;
  framework: string;
  comment: string;
};

export const initial: UserInfoForm = {
  email: "",
  role: "",
  framework: "",
  comment: "",
};

export const userInfoSchema = z.object({
  email: z.string("กรุณาระบุ email").email("รูปแบบอีเมลไม่ถูกต้อง"),
  role: z.string().min(1, "กรุณาเลือก Role"),
  framework: z.string().min(1, "กรุณาระบุ framework"),
  comment: z.string().optional(),
});

export const validateUserInfo = validateWithZod(userInfoSchema);
