import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
//   out: './drizzle',
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_JzomI6RZV0rl@ep-sparkling-wave-ahpfgj85-pooler.c-3.us-east-1.aws.neon.tech/ai-room-redesign?sslmode=require&channel_binding=require',
  },
});
