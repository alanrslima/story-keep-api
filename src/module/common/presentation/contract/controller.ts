import { Request, Response } from "express";
import { HttpResponse } from "./http-response";

export interface Controller<T = any, R = any> {
  handle: (params: T) => Promise<ControllerOutput<R>>;
}

// import { type Response, type Request } from "express";

// export interface HttpResponse<T> {
//   statusCode: number;
//   body: T;
// }

export interface ControllerInput {
  req: Request;
  res: Response;
}

// export interface Controller {
//   handle(input: ControllerInput): Promise<ControllerOutput>;
// }

export type ControllerOutput<T> = HttpResponse<T>;
