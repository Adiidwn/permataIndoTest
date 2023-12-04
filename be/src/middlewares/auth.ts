import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    console.error('Missing or invalid Authorization header');
    return res.status(401).json({
      error: 'unauthorized!1',
    });
  }

  const token = authorizationHeader.split(' ')[1];
  console.log('Received token:', token);

  try {
    const loginSession = jwt.verify(token, 'lalala') as { [key: string]: any };
    res.locals.loginSession = loginSession;

    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({
      error: 'unauthorized!2',
    });
  }
}
