import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

<GoogleLogin
  onSuccess={async (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse.credential);
  const res = await authServices.login({
    email: decoded.email,
    credential: credentialResponse.credential, // send full token
   });
  }}
  onError={() => setError("Google sign-up failed.")}
/>