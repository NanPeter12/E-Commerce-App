import * as zod from "zod";
export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(2, "name is too short")
      .max(100),
    email: zod.string().nonempty("Email is required"),
    password: zod.string().nonempty("Password is required").min(8).max(100),
    rePassword: zod
      .string()
      .nonempty("Re-entering password is required")
      .min(8)
      .max(100),
    phone: zod
      .string()
      .nonempty("Phone number is required")
      .min(10)
      .max(15)
      .regex(/^(01)[0-9]{9}$/, "Phone number must be Egyptian"),
  })
  .refine(
    function (data) {
      return data.password === data.rePassword;
    },
    {
      message: "Passwords don't match",
      path: ["rePassword"],
    }
  );
