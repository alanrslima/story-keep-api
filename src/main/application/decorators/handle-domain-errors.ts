// import { DomainValidationError, InvalidParametersError } from "../../common";

export function HandleDomainErrors(): any {
  return (value: any, context: ClassMethodDecoratorContext) => {
    return async function (this: any, ...args: any[]) {
      try {
        return await value.apply(this, args);
      } catch (error) {
        // if (error instanceof DomainValidationError) {
        //   throw new InvalidParametersError([
        //     {
        //       message: error.message,
        //       path: [error.field || context.name.toString()],
        //     },
        //   ]);
        // }

        throw error;
      }
    };
  };
}
