import { authenticationService } from "./../_services/authenticationService";

export default function authHeader() {
  // return authorization header with jwt token
  const user = authenticationService.currentUserValue;

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}
