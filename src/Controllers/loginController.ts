import type { Request } from 'express';
import type { Response } from 'express';
import bcrypt from 'bcrypt'
import User from '../database/models/User.ts';
import type { IUser } from '../interface/types.ts';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

const { sign } = jwt;

class loginController {
    async login(req: Request, res: Response) {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        //@ts-ignore
        const token = this.generateJwtToken(user)

        return res.status(200).json({ message: 'Login successful', token })
    }

    generateJwtToken(user: IUser) {

        const tokenData = {
            name: user.name,
            email: user.email,
        }

        const tokenKey = process.env.TOKEN_KEY;
        if (!tokenKey) {
            throw new Error('TOKEN_KEY is not defined');
        }

        const tokenOptions : SignOptions = {
            subject: String(user._id),
            expiresIn: '5h',
        }

        const token = sign(tokenData, tokenKey, tokenOptions)

        return token
    }
}

export default loginController