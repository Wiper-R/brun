import { z } from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string(),
});

export default envSchema.parse(process.env);
