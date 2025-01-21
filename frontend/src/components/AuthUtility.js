import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime; // `exp` is the expiry time in the token
  } catch (error) {
    return true; // If token is invalid or missing
  }
};
