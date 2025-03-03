import { type Request, type Response, type NextFunction } from "express";
import { Middleware } from "../../presentation";

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.["x-access-token"],
      ...(req.headers ?? {}),
      ...req,
    };
    try {
      const httpResponse = await middleware.handle(request);
      if (httpResponse.statusCode === 200) {
        Object.assign(req, httpResponse.body);
        next();
      } else {
        res.status(httpResponse.statusCode).json({
          message: httpResponse.body.message,
        });
      }
    } catch (error) {
      next(error);
    }
  };
};
