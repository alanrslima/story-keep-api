export interface OpenIdGateway {
  getCodeVerifier(): string;
  getAuthorizationUrl(): Promise<string>;
  callback(
    params: { sessionState: string; code: string },
    key: string
  ): Promise<{ accessToken: string }>;
  getUserInfo(accessToken: string): Promise<UserInfo>;
}

export type UserInfo = {
  email: string;
};
