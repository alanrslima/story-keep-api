import { OAuthDTO } from "../dto/oauth-dto";

export interface OAuthGateway {
  verify(idToken: string): Promise<OAuthDTO>;
}
