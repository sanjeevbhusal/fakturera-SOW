import "dotenv/config";
import { drizzle, } from "drizzle-orm/node-postgres";

const database = drizzle(process.env.DATABASE_URL);

export { database as db };