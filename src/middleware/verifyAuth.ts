import pkg from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express';

function verifyAuth(req: Request, res: Response, next: NextFunction) {
  const { verify } = pkg
  const TOKEN_KEY = process.env.TOKEN_KEY
  const authToken = req.headers.authorization

  if (authToken) {
    const [, token] = authToken.split(' ')

    try {
       //@ts-ignore verify(token, TOKEN_KEY)
      verify(token, TOKEN_KEY)
      console.log('logged in user')
      return next()
    } catch (err) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }
  }

  return res.status(401).json({
    message: 'Unauthorized',
  })
}

export default verifyAuth