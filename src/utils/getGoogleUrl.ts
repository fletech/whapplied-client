const {
  VITE_API_BASE_URL,
  VITE_DEVELOPMENT,
  VITE_AUTH_GOOGLE_URL,
  VITE_GOOGLE_CLIENT_ID,
  VITE_GOOGLE_CLIENT_SECRET,
  VITE_GOOGLE_REDIRECT_URL,
} = import.meta.env;

function getGoogleOAuthUrl() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${VITE_API_BASE_URL}${VITE_GOOGLE_REDIRECT_URL}`,
    client_id: VITE_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const qs = new URLSearchParams(options).toString();
  console.log({ options });
  console.log({ qs });
  return `${rootUrl}?${qs}`;
}

export default getGoogleOAuthUrl;
