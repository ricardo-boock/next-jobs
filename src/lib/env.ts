import { z } from "zod";

const envSchema = z.object({
  REMOTIVE_API: z.string().pipe(z.url()),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

export const env = envSchema.parse(process.env);
