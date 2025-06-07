import { UseCase } from "../../../common";
import { Session } from "../../domain/entity/session";
import { User } from "../../domain/entity/user";
import { OAuthDTO } from "../contract/dto/oauth-dto";
import { OAuthGateway } from "../contract/gateway/oauth-gateway";
import { SessionRepository } from "../contract/repository/session-repository";
import { UserRepository } from "../contract/repository/user-repository";

export class SignInOAuthUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly oAuthGateway: OAuthGateway,
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository
  ) {}

  private async retrieveUser(data: OAuthDTO): Promise<User> {
    const user = await this.userRepository.getByEmail(data.email);
    if (user) return user;
    const newUser = User.create({
      email: data.email,
      name: data.name,
      role: "user",
    });
    await this.userRepository.create(newUser);
    return newUser;
  }

  async execute(input: Input): Promise<Output> {
    const userData = await this.oAuthGateway.verify(input.idToken);
    const user = await this.retrieveUser(userData);
    const session = Session.createWithoutPassword({
      user,
    });
    await this.sessionRepository.create(session);
    return { token: session.getToken() };
  }
}

type Input = {
  idToken: string;
};

type Output = {
  token: string;
};
