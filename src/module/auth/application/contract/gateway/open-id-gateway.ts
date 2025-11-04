export interface OpenIdGateway {
  getAuthorizationData(state?: { redirectTo: string }): Promise<{
    url: string;
    codeVerifier: string;
    nonce: string;
  }>;
  callback(
    params: { state: string; code: string },
    checks: { codeVerifier: string; nonce: string }
  ): Promise<{ accessToken: string; redirectTo: string }>;
  getUserInfo(accessToken: string): Promise<UserInfo>;
}

export type UserInfo = {
  email: string;
  name: string;
  profileUrl?: string;
};
