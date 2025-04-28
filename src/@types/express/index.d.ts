declare namespace Express {
  export interface Request {
    user: any;
    startedAt: number;
    session: any;
  }

  export interface Response {
    responser: (
      status: number,
      message: string,
      data: any,
      error: any,
      type: string
    ) => void;
  }
}
