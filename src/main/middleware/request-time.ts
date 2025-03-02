import {type Request, type Response, type NextFunction} from 'express';

export const requestTime = (
  req: Request,
  _: Response,
  next: NextFunction,
): void => {
  req.startedAt = Date.now();
  next();
};
