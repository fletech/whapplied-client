const {
  VITE_API_BASE_URL,
  VITE_DEVELOPMENT,
  VITE_AUTH_GOOGLE_URL,
  VITE_GOOGLE_CLIENT_ID,
  VITE_GOOGLE_CLIENT_SECRET,
  VITE_GOOGLE_REDIRECT_URL,
  VITE_AUTH_LOGOUT_URL,
} = import.meta.env;

function getGoogleOAuthUrl() {
  const REDIRECT_URL = `${VITE_API_BASE_URL}${VITE_AUTH_GOOGLE_URL}`;

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: REDIRECT_URL,
    client_id: VITE_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "select_account",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ].join(" "),
  };
  const qs = new URLSearchParams(options).toString();
  //   console.log({ options });
  //   console.log({ qs });
  const LOGIN_URL = `${rootUrl}?${qs}`;
  const LOGOUT_URL = `${VITE_API_BASE_URL}${VITE_AUTH_LOGOUT_URL}`;
  return { login: LOGIN_URL, logout: LOGOUT_URL };
}

export default getGoogleOAuthUrl;
