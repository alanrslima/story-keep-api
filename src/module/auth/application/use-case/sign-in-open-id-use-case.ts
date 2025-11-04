import { UseCase } from "../../../common";
import { OpenIdGateway } from "../contract/gateway/open-id-gateway";

export class SignInOpenIdUseCase implements UseCase<Input, Output> {
  constructor(private readonly openIdGateway: OpenIdGateway) {}

  async execute(input: Input): Promise<Output> {
    const data = await this.openIdGateway.getAuthorizationData({
      redirectTo: input.redirectTo,
    });
    return data;
  }
}

type Input = {
  redirectTo: string;
};

type Output = {
  codeVerifier: string;
  nonce: string;
  url: string;
};
