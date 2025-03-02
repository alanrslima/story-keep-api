/* eslint-disable @typescript-eslint/no-unused-vars */

import { type Request, type Response, type NextFunction } from "express";
import { BaseError } from "../../module/common";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  if (err instanceof BaseError) {
    res.status(err.statusCode).send({ errors: err.serialize() });
    res.statusCode = err.statusCode;
  } else {
    res.status(500).send({
      errors: [
        {
          message:
            "Ops! Algo deu errado. Estamos trabalhando para corrigir isso o mais rápido possível. Por favor, tente novamente mais tarde.",
        },
      ],
    });
    res.statusCode = 500;
  }
};
