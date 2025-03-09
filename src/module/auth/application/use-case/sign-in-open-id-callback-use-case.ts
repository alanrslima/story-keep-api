import { UseCase } from "../../../common";
import { Session } from "../../domain/entity/session";
import { InvalidCredentialsError } from "../../error/invalid-credentials-error";
import { OpenIdGateway } from "../contract/gateway/open-id-gateway";
import { SessionRepository } from "../contract/repository/session-repository";
import { UserRepository } from "../contract/repository/user-repository";

export class SignInOpenIdCallbackUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly openIdGateway: OpenIdGateway,
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository
  ) {}

  async execute(params: Input): Promise<Output> {
    const tokenSet = await this.openIdGateway.callback(
      { sessionState: params.sessionState, code: params.code },
      params.key
    );
    const userInfo = await this.openIdGateway.getUserInfo(tokenSet.accessToken);
    const user = await this.userRepository.getByEmail(userInfo.email);
    if (!user) {
      // TODO: Create a new user
      throw new InvalidCredentialsError();
    }
    const session = Session.createWithoutPassword({ user });
    await this.sessionRepository.create(session);

    return { token: session.getToken() };
  }
}

type Input = {
  key: string;
  code: string;
  sessionState: string;
};

type Output = { token: string };
