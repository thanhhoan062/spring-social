export const API_BASE_URL = 'http://localhost:5000';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';

export const GOOGLE_AUTH_URL =
  API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  API_BASE_URL +
  '/oauth2/authorize/facebook?redirect_uri=' +
  OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
  API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const PROFILE_LOGO = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';
export const GOOGLE_LOGO =
  'https://myplaceloungechiangmai.com/wp-content/uploads/2015/02/google-logo-icon-PNG-Transparent-Background.png';
export const GITHUB_LOGO =
  'https://cdn-icons-png.flaticon.com/512/1051/1051326.png?w=740';
export const FB_LOGO =
  'https://www.seekpng.com/png/full/919-9194757_facebook-transparent-background-facebook-small-logo.png';
