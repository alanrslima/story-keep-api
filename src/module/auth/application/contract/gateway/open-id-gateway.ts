export interface OpenIdGateway {
  // getCodeVerifier(): string;
  getAuthorizationData(): Promise<{
    url: string;
    codeVerifier: string;
    nonce: string;
  }>;
  callback(
    params: { state: string; code: string },
    checks: { codeVerifier: string; nonce: string }
  ): Promise<{ accessToken: string }>;
  getUserInfo(accessToken: string): Promise<UserInfo>;
}

export type UserInfo = {
  email: string;
  name: string;
  profileUrl?: string;
};
