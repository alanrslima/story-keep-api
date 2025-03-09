// import { Issuer, generators, custom } from "openid-client";
import * as client from "openid-client";
import {
  OpenIdGateway,
  UserInfo,
} from "../../application/contract/gateway/open-id-gateway";
import { env } from "../../../common";

export class OpenIdGoogleGateway implements OpenIdGateway {
  private static instance: OpenIdGoogleGateway;

  private codeChallengeMethod = "S256";
  private codeVerifier = client.randomPKCECodeVerifier();
  private googleClient: client.Configuration | undefined;

  private constructor() {}

  static getInstance(): OpenIdGoogleGateway {
    if (!OpenIdGoogleGateway.instance) {
      OpenIdGoogleGateway.instance = new OpenIdGoogleGateway();
    }
    return OpenIdGoogleGateway.instance;
  }

  private async generateCodeChallenge(): Promise<string> {
    return await client.calculatePKCECodeChallenge(this.codeVerifier);
  }

  async initClientConfiguration() {
    this.googleClient = await client.discovery(
      new URL("https://accounts.google.com"),
      env.GOOGLE_AUTH_CLIENT_ID,
      env.GOOGLE_AUTH_CLIENT_SECRET
    );
  }

  private getClientConfiguration(): client.Configuration {
    if (!this.googleClient) throw new Error("Google client not defined");
    return this.googleClient;
  }

  getCodeVerifier(): string {
    return this.codeVerifier;
  }

  async getAuthorizationUrl(): Promise<string> {
    const config = this.getClientConfiguration();
    const codeChallenge = await this.generateCodeChallenge();
    let parameters: Record<string, string> = {
      redirect_uri: "http://localhost:3001/auth/redirect",
      scope: "openid email",
      code_challenge: codeChallenge,
      code_challenge_method: this.codeChallengeMethod,
    };
    let state!: string;
    if (!config.serverMetadata().supportsPKCE()) {
      state = client.randomState();
      parameters.state = state;
    }
    let redirectTo = client.buildAuthorizationUrl(config, parameters);
    return redirectTo.href;
  }

  async callback(
    params: { sessionState: string; code: string },
    key: string
  ): Promise<{ accessToken: string }> {
    let getCurrentUrl!: (...args: any) => URL;
    const config = this.getClientConfiguration();
    const tokens: client.TokenEndpointResponse =
      await client.authorizationCodeGrant(config, getCurrentUrl(), {
        pkceCodeVerifier: params.code,
        expectedState: params.sessionState,
      });
    console.log("tokens", tokens);
    return { accessToken: "" };
  }

  async getUserInfo(accessToken: string): Promise<UserInfo> {
    return { email: "123" };
  }
}
