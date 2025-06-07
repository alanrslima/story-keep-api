import { OAuth2Client } from "google-auth-library";

import { env } from "../../../common";
import { OAuthGateway } from "../../application/contract/gateway/oauth-gateway";
import { OAuthDTO } from "../../application/contract/dto/oauth-dto";

export class OAuthGoogleGateway implements OAuthGateway {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(env.GOOGLE_CLIENT_SECRET);
  }

  async verify(idToken: string): Promise<OAuthDTO> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID, // Opcional: verificar que o token é para o seu app
    });
    return {
      email: ticket.getPayload()?.email || "",
      name: ticket.getPayload()?.name || "",
      emailVerified: Boolean(ticket.getPayload()?.email_verified),
      picture: ticket.getPayload()?.picture,
    };
  }
}
