import jwt from "jsonwebtoken";
import { env, HttpResponse, Middleware, ok } from "../../../common";
import { UserRepository } from "../../application/contract/repository/user-repository";
import { NotAuthorizedError } from "../../error/not-authorized-error";
import { SessionDTO } from "../../application/contract/dto/session-dto";

export class AuthMiddleware
  implements Middleware<AuthMiddlewareRequest, unknown>
{
  constructor(private readonly userRepository: UserRepository) {}

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
    const user = await this.userRepository.getById(id);
    return { name: user.getName(), permissions: user.getPermissions() };
  }

  async handle(
    request: AuthMiddlewareRequest
  ): Promise<HttpResponse<AuthMiddlewareResponse>> {
    const { authorization } = request;
    if (authorization === undefined) {
      throw new NotAuthorizedError();
    }
    try {
      const [, token] = authorization.split(" ");
      this.decrypt(token);
      const decoded = this.decode(token);
      const { userId } = JSON.parse(decoded);
      const { permissions, name } = await this.getUserDetails(userId);
      return ok({
        session: {
          id: userId,
          user: {
            id: userId,
            name,
            permissions,
          },
        },
      });
    } catch {
      throw new NotAuthorizedError();
    }
  }
}

export type AuthMiddlewareRequest = {
  authorization?: string;
};

export type AuthMiddlewareResponse = {
  session: SessionDTO;
};
