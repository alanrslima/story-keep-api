import { ZodError } from "zod";
import { InvalidParametersError } from "../../../module/common";

export function HandleControllerErrors(): any {
  return (value: any, context: ClassMethodDecoratorContext) => {
    return async function (this: any, ...args: any[]) {
      try {
        return await value.apply(this, args);
      } catch (error) {
        if (error instanceof ZodError) {
          throw new InvalidParametersError(
            error.issues.map((issue) => ({
              message: issue.message,
              path: issue.path.map((i) => String(i)),
            })),
          );
        }
        throw error;
      }
    };
  };
}
