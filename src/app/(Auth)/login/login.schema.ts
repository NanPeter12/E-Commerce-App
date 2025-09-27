import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod.string().nonempty("Email is required"),
  password: zod.string().nonempty("Password is required").min(8).max(100),
});

