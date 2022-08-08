import axios from "axios";
import { API_URL } from "../../Constants";

export const USER_NAME_SESSION_ATTR_NAME = "authenticatedUser";
export function basicAuthService(username, password) {
  return axios.get(
    `${API_URL}/basicauth`,
    { withCredentials: true },
    {
      headers: { authorization: createBasicAuthToken(username, password) },
    }
  );
}

export function jwtAuthService(username, password) {
  return axios.post(`${API_URL}/authenticate`, {
    username,
    password,
  });
}

export function createJWTToken(token) {
  return "Bearer " + token;
}

export function createBasicAuthToken(username, password) {
  return "Basic " + window.btoa(username + ":" + password);
}

export function startSession(username) {
  sessionStorage.setItem(USER_NAME_SESSION_ATTR_NAME, username);
  setUpAxiosInterceptor();
}

export function startSessionJwt(username, token) {
  sessionStorage.setItem(USER_NAME_SESSION_ATTR_NAME, username);
  setUpAxiosInterceptor(createBasicAuthToken(username, token));
}

export function endSession() {
  sessionStorage.removeItem(USER_NAME_SESSION_ATTR_NAME);
}

export function authState() {
  const user = sessionStorage.getItem(USER_NAME_SESSION_ATTR_NAME);
  if (user === null) {
    return false;
  } else {
    return true;
  }
}

export function loggedInUser() {
  const user = sessionStorage.getItem(USER_NAME_SESSION_ATTR_NAME);
  if (user === null) {
    return user;
  } else {
    return null;
  }
}

// Intercept services with basic auth
// export function setUpAxiosInterceptor() {
//   let username = "vvp19";
//   let password = "morde";

//   //Creating structure of basic auth header
//   let basicAuthHeader = createBasicAuthToken(username, password);

//   axios.interceptors.request.use((config) => {
//     if (authState) {
//       config.headers.authorization = basicAuthHeader;
//     }
//     return config;
//   });
// }

//intercept services that needs JWT token
export function setUpAxiosInterceptor(token) {
  axios.interceptors.request.use((config) => {
    if (authState) {
      config.headers.authorization = token;
    }
    return config;
  });
}
