import { UseCase } from "../../../common";
import { Session } from "../../domain/entity/session";
import { User } from "../../domain/entity/user";
import { OpenIdGateway } from "../contract/gateway/open-id-gateway";
import { UnitOfWorkAuth } from "../contract/unit-of-work-auth";

export class SignInOpenIdCallbackUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly openIdGateway: OpenIdGateway,
    private readonly unitOfWorkAuth: UnitOfWorkAuth
  ) {}

  private async getOrCreateUser(
    email: string,
    name: string,
    profileUrl?: string
  ) {
    const user = await this.unitOfWorkAuth.execute(({ userRepository }) =>
      userRepository.getByEmail(email)
    );
    if (user) return user;
    const newUser = User.create({ email, name, role: "user", profileUrl });
    newUser.approve();
    await this.unitOfWorkAuth.execute(({ userRepository }) =>
      userRepository.create(newUser)
    );
    return newUser;
  }

  async execute(params: Input): Promise<Output> {
    const tokenSet = await this.openIdGateway.callback(
      { state: params.state, code: params.code },
      {
        codeVerifier: params.codeVerifier,
        nonce: params.nonce,
      }
    );
    const userInfo = await this.openIdGateway.getUserInfo(tokenSet.accessToken);
    const user = await this.getOrCreateUser(
      userInfo.email,
      userInfo.name,
      userInfo.profileUrl
    );
    const session = Session.createWithoutPassword({ user });
    await this.unitOfWorkAuth.execute(({ sessionRepository }) =>
      sessionRepository.create(session)
    );
    return { token: session.getToken() };
  }
}

type Input = {
  codeVerifier: string;
  code: string;
  nonce: string;
  state: string;
};

type Output = { token: string };
