import { type Request, type Response, type NextFunction } from "express";

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PUT, DELETE, OPTIONS"
  // );
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.setHeader("Access-Control-Allow-Credentials", "true");

  // Responde imediatamente a requisições preflight (OPTIONS)
  // if (req.method === "OPTIONS") {
  //   res.sendStatus(204);
  //   return;
  // }

  // next();

  res.set("access-control-allow-origin", "*");
  res.set("access-control-allow-headers", "*");
  res.set("access-control-allow-methods", "*");
  next();
};
