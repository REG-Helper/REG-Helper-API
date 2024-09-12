export const GOOGLE_OAUTH_ENDPOINTS = {
  authorizeHost: 'https://accounts.google.com',
  authorizePath: '/o/oauth2/v2/auth',
  tokenHost: 'https://www.googleapis.com',
  tokenPath: '/oauth2/v4/token',
};

export const GOOGLE_OAUTH_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

export const GOOGLE_OAUTH_SCOPE = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];
