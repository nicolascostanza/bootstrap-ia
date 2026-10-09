import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url(),
  EMAIL_FROM: z.string().email(),
  RESEND_API_KEY: z.string().min(1).optional(),
  NEON_AUTH_BASE_URL: z.string().url().optional(),
  NEON_AUTH_COOKIE_SECRET: z.string().min(32).optional(),
  MERCADOPAGO_ACCESS_TOKEN: z.string().min(1).optional(),
  POSTHOG_API_KEY: z.string().min(1).optional(),
  POSTHOG_HOST: z.string().url().optional(),
  SENTRY_DSN: z.string().url().optional(),
  AXIOM_TOKEN: z.string().min(1).optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).optional(),
});

export const serverEnv = serverSchema.parse(process.env);

export const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
});
