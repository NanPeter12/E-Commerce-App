import { schema } from "./register.schema";
import * as zod from "zod";


export type RegisterSchemaType = zod.infer<typeof schema>;
