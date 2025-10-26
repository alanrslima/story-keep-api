import jwt from "jsonwebtoken";
import { env, HttpResponse, Middleware, ok } from "../../../common";
import {
  NotAuthorizedError,
  NotAuthorizedTypes,
} from "../../error/not-authorized-error";
import { SessionDTO } from "../../application/contract/dto/session-dto";
import { UnitOfWorkAuth } from "../../application/contract/unit-of-work-auth";

export class AuthMiddleware
  implements Middleware<AuthMiddlewareRequest, unknown>
{
  constructor(private readonly unitOfWorkAuth: UnitOfWorkAuth) {}

  private decrypt(ciphertext: string): string {
    const plaintext: unknown = jwt.verify(ciphertext, env.JWT_SECRET);
    return plaintext as string;
  }

  private decode(plaintext: string): string {
    const decoded = jwt.decode(plaintext);
    if (decoded === null) {
      throw new Error("Falha de decodificação");
    }
    if (typeof decoded === "string") {
      return decoded;
    }
    return decoded?.sub ?? "";
  }

  private async getUserDetails(id: string) {
    const user = await this.unitOfWorkAuth.execute(({ userRepository }) => {
      return userRepository.getById(id);
    });
    return {
      name: user.getName(),
      permissions: user.getPermissions(),
      isFirstLogin: user.getIsFirstLogin(),
    };
  }

  async handle(
    request: AuthMiddlewareRequest
  ): Promise<HttpResponse<AuthMiddlewareResponse>> {
    const { authorization } = request;
    if (authorization === undefined) {
      throw new NotAuthorizedError(NotAuthorizedTypes.AUTH_TOKEN_MISSING);
    }
    try {
      const [, token] = authorization.split(" ");
      this.decrypt(token);
      const decoded = this.decode(token);
      const { userId } = JSON.parse(decoded);
      const userDetail = await this.getUserDetails(userId);
      return ok({
        session: {
          id: userId,
          user: {
            id: userId,
            ...userDetail,
          },
        },
      });
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError)
        throw new NotAuthorizedError(NotAuthorizedTypes.AUTH_TOKEN_EXPIRED);

      throw new NotAuthorizedError(NotAuthorizedTypes.AUTH_TOKEN_INVALID);
    }
  }
}

export type AuthMiddlewareRequest = {
  authorization?: string;
};

export type AuthMiddlewareResponse = {
  session: SessionDTO;
};
