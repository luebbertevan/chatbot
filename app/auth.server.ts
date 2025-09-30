import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/db";
import * as authSchema from "./db/auth-schema"

console.log("loading auth")
export const auth = betterAuth({
    emailAndPassword: { 
        enabled: true, 
    }, 
    database: drizzleAdapter(db, {
        provider: "pg", // or "pg" or "mysql"
        schema: authSchema,
    }),
})