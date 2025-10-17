import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import serverConfig from "./src/config/serverConfig.ts";
import conectDataBase from "./src/database/conectDataBase.ts";


const dbUrl = process.env.DATABASE_URL

// Initialize server configuration
serverConfig();

// Initialize database connection
conectDataBase();