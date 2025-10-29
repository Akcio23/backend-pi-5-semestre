import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import serverConfig from './src/config/serverConfig.ts';
import conectDataBase from './src/database/conectDataBase.ts';
import { app } from './src/config/serverConfig.ts';
import auth from './src/routes/auth.ts';
import customer from './src/routes/customer.ts';
import type { Request } from 'express';
import type { Response } from 'express';
import verifyAuth from './src/middleware/verifyAuth.ts';

// Initialize server configuration
serverConfig();

// Initialize database connection
conectDataBase();

// Initialize Routes

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ mensage: 'API ONLINE' });
});

//Router public 
app.use('/auth', auth);

//middleware auth
app.use(verifyAuth)

//Router private  
app.use('/customer', customer);
