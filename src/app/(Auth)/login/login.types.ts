import { z as zod } from "zod";
import { loginSchema } from "./login.schema";

export type LoginSchemaType = zod.infer<typeof loginSchema>;
