export interface IProvider {
  tokenHost: string;
  tokenPath?: string;
  authorizeHost?: string;
  authorizePath?: string;
  refreshPath?: string;
  revokePath?: string;
}

export interface IAuthParams {
  redirect_uri: string;
  scope: string | string[];
}

export interface IClient {
  id: string;
  secret: string;
  secretParamName?: string;
  idParamName?: string;
}
