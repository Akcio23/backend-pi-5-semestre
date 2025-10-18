import type { Request } from 'express';
import type { Response } from 'express';
import bcrypt from 'bcrypt'
import User from '../database/models/User.ts';
import _ from 'lodash';

class registerController {
    async registerUser(req: Request, res: Response) {
        const { name, age, gender, email, cpf, password, confirmedPassword } = req.body;

        const requiredFields = { name, age, gender, email, cpf, password, confirmedPassword };

        for (const [key, value] of Object.entries(requiredFields)) {
            if (value === undefined || value === null || value === '') {
                return res.status(400).json({ error: `field '${key}' is mandatory.` });
            }
        }

        if (password !== confirmedPassword) {
            return res.status(400).json({
                message: 'the passwords do not match',
            })
        }

        const checkEmail = await User.findOne({ email })

        if (!_.isEmpty(checkEmail)) {
            return res.status(400).json({
                message: 'error email already used',
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            name,
            age,
            gender,
            email,
            cpf,
            password: hashedPassword

        })

        return res.status(200).json({
            message: 'user created successfully',
        })

    }
}

export default registerController;
