import { Router } from 'express';
import loginController from '../Controllers/loginController.ts';
import registerController from '../Controllers/registerController.ts';

const auth = Router();
const login = new loginController();
const register = new registerController();

auth.post('/login', login.login.bind(login));
auth.post('/register', register.registerUser.bind(register));

export default auth;
