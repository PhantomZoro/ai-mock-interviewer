import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    PORT: z.coerce.number().min(1).max(65535).default(3000),
    FRONTEND_URL: z.string().url().default('http://localhost:5173'),
    DATABASE_URL: z.string().optional(),
    REDIS_URL: z.string().optional(),
  })
  .refine(
    (data) => data.NODE_ENV !== 'production' || data.DATABASE_URL !== undefined,
    { message: 'DATABASE_URL is required in production', path: ['DATABASE_URL'] }
  )
  .refine(
    (data) => data.NODE_ENV !== 'production' || data.REDIS_URL !== undefined,
    { message: 'REDIS_URL is required in production', path: ['REDIS_URL'] }
  );

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

export type Env = z.infer<typeof envSchema>;
