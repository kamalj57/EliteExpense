
/** @type { import("drizzle-kit").Config } */
require('dotenv').config({ path: './.env.local' });

export default {
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url:process.env.NEXT_PUBLIC_DATABASE_URL,   
  }
};
