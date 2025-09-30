import 'dotenv/config'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
	throw new Error("No database URL provided");
}
console.log("hello from db.ts")
console.log(process.env.DATABASE_URL)
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);
////////

