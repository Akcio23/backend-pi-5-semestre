import { Router } from 'express'
import loginController from '../Controllers/loginController';

const routerLogin = Router()
const loginCtrl = new loginController();

routerLogin.post('/login', loginCtrl.login.bind(loginCtrl));

export default routerLogin;