import { UseCase } from "../../../common";
import { OpenIdGateway } from "../contract/gateway/open-id-gateway";

export class SignInOpenIdUseCase implements UseCase<Input, Output> {
  constructor(private readonly openIdGateway: OpenIdGateway) {}

  async execute(): Promise<Output> {
    const data = await this.openIdGateway.getAuthorizationData();
    return data;
  }
}

type Input = void;

type Output = {
  codeVerifier: string;
  nonce: string;
  url: string;
};
