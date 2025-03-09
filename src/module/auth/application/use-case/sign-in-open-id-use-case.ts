import { UseCase } from "../../../common";
import { OpenIdGateway } from "../contract/gateway/open-id-gateway";

export class SignInOpenIdUseCase implements UseCase<Input, Output> {
  constructor(private readonly openIdGateway: OpenIdGateway) {}

  async execute(): Promise<Output> {
    const codeVerifier = this.openIdGateway.getCodeVerifier();
    const authorizationUrl = await this.openIdGateway.getAuthorizationUrl();
    return { key: codeVerifier, endpoint: authorizationUrl };
  }
}

type Input = void;

type Output = { key: string; endpoint: string };
