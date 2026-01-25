// import { ClientNotFoundError } from "../../auth/application/errors/client-not-found-error";
// import { InvalidCredentialsError } from "../../auth/application/errors/invalid-credentials-error";
// import { UserAlreadyExistsError } from "../../auth/application/errors/user-already-exists-error";
// import { NotFoundError, UnauthorizedError } from "../../common";
// import { ConflictError } from "../../common/infra/errors/conflict-error";
// import { DeploymentNotFoundError } from "../../deployment-management/application/errors/deployment-not-found-error";
// import { DeploymentOwnershipMismatchError } from "../../deployment-management/application/errors/deployment-ownership-mismatch-error";
// import { InsufficientPermissionsError } from "../../deployment-management/application/errors/insufficient-permissions-error";
// import { InvalidDeploymentStateError } from "../../deployment-management/application/errors/invalid-deployment-state-error";
// import { ReleaseNotVerifiedError } from "../../deployment-management/application/errors/release-not-verified-error";
// import { ReleaseVersionAlreadyExistsError } from "../../deployment-management/application/errors/release-version-already-exists-error";
// import { ServiceNotFoundError } from "../../deployment-management/application/errors/service-not-found-error";

export function HandleApplicationErrors(): any {
  return (value: any, context: ClassMethodDecoratorContext) => {
    return async function (this: any, ...args: any[]) {
      try {
        return await value.apply(this, args);
      } catch (error) {
        // if (error instanceof ClientNotFoundError) {
        //   throw new NotFoundError(error.message);
        // }
        // if (error instanceof ServiceNotFoundError) {
        //   throw new NotFoundError(error.message);
        // }
        // if (error instanceof InvalidCredentialsError) {
        //   throw new UnauthorizedError(error.message);
        // }
        // if (error instanceof UserAlreadyExistsError) {
        //   throw new ConflictError(error.message, error.conflictingField);
        // }
        // if (error instanceof DeploymentNotFoundError) {
        //   throw new NotFoundError(error.message);
        // }
        // if (error instanceof DeploymentOwnershipMismatchError) {
        //   throw new UnauthorizedError(error.message);
        // }
        // if (error instanceof InsufficientPermissionsError) {
        //   throw new UnauthorizedError(error.message);
        // }
        // if (error instanceof InvalidDeploymentStateError) {
        //   throw new UnauthorizedError(error.message);
        // }
        // if (error instanceof ReleaseNotVerifiedError) {
        //   throw new ConflictError(error.message);
        // }
        // if (error instanceof ReleaseVersionAlreadyExistsError) {
        //   throw new ConflictError(error.message);
        // }
        throw error;
      }
    };
  };
}
