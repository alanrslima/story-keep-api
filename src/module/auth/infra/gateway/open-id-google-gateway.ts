import { Issuer, generators, BaseClient } from "openid-client";
import {
  OpenIdGateway,
  UserInfo,
} from "../../application/contract/gateway/open-id-gateway";
import { env } from "../../../common";
import { randomBytes } from "crypto";
// import { env } from "../../main/config/env";
// import { ConstantEnvProps, constants } from "../../main/config/constants";

// const openIDConstants =
//   constants[env.NODE_ENV as keyof ConstantEnvProps].openId;

// const config = {
//   issuer: openIDConstants.issuer,
//   authorization_endpoint: openIDConstants.authorizationEndpoint,
//   token_endpoint: openIDConstants.tokenEndpoint,
//   token_introspection_endpoint: openIDConstants.tokenIntrospectionEndpoint,
//   userinfo_endpoint: openIDConstants.userinfoEndpoint,
//   end_session_endpoint: openIDConstants.endSessionEndpoint,
//   jwks_uri: openIDConstants.jwksUri,
//   client: {
//     id: env.OPEN_ID_GLOBOI_ID,
//     secret: env.OPEN_ID_GLOBOI_SECRET,
//     redirect_uris: [env.OPEN_ID_GLOBOI_REDIRECT_URI],
//   },
// };

export class OpenIdGoogleGateway implements OpenIdGateway {
  private issuer: Issuer<BaseClient> | undefined;

  private client: BaseClient | undefined;
  private codeChallenge: string;
  private codeVerifier: string;

  constructor() {
    this.codeVerifier = generators.codeVerifier();
    this.codeChallenge = generators.codeChallenge(this.codeVerifier);
  }

  private async generateClient(): Promise<BaseClient> {
    if (this.client) return this.client;
    this.issuer = await Issuer.discover("https://accounts.google.com");
    this.client = new this.issuer.Client({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uris: [env.OPEN_ID_WEB_REDIRECT_URI],
      response_types: ["code"],
    });
    return this.client;
  }

  getCodeVerifier(): string {
    return this.codeVerifier;
  }

  private generateBuffer(stateParams?: Record<string, string>) {
    if (!stateParams) return randomBytes(16).toString("hex");
    return Buffer.from(JSON.stringify(stateParams)).toString("base64");
  }

  async getAuthorizationData(stateParams?: Record<string, string>): Promise<{
    url: string;
    codeVerifier: string;
    nonce: string;
  }> {
    const client = await this.generateClient();
    const state = this.generateBuffer(stateParams);
    const nonce = randomBytes(16).toString("hex");
    const url = client.authorizationUrl({
      resource: env.OPEN_ID_WEB_REDIRECT_URI,
      code_challenge: this.codeChallenge,
      code_challenge_method: "S256",
      scope: "openid email profile",
      state,
      nonce,
    });
    return { url, codeVerifier: this.codeVerifier, nonce };
  }

  async callback(
    params: { state: string; code: string },
    checks: { codeVerifier: string; nonce: string }
  ): Promise<{ accessToken: string; redirectTo: string }> {
    const state = JSON.parse(
      Buffer.from(params.state, "base64").toString("utf8")
    );
    const client = await this.generateClient();
    const response = await client.callback(
      env.OPEN_ID_WEB_REDIRECT_URI,
      { state: params.state, code: params.code },
      {
        code_verifier: checks.codeVerifier,
        nonce: checks.nonce,
        state: params.state,
      }
    );
    if (!response.access_token) {
      throw new Error("Access token not found");
    }
    return {
      accessToken: response.access_token,
      redirectTo: state?.redirectTo,
    };
  }

  async getUserInfo(accessToken: string): Promise<UserInfo> {
    const client = await this.generateClient();
    const userInfo = await client.userinfo(accessToken);
    if (!userInfo.email || !userInfo.name) {
      throw new Error("Invalid user info");
    }
    return {
      email: userInfo.email,
      name: userInfo.name,
      profileUrl: userInfo.picture,
    };
  }
}
