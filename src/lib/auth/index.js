import jwt from 'jsonwebtoken';
import Cookies from 'cookies-js';

export default class Auth {
  static verifyToken() {
    const { REACT_APP_JWT_PUBLIC_KEY } = process.env;

    return jwt.verify(
      Auth.token,
      Buffer.from(REACT_APP_JWT_PUBLIC_KEY, 'base64'),
      (error, decodedToken) => {
        if(error) {
          return false;
        }
        return decodedToken;
      }
    );
  }

  static get token() {
    return Cookies.get('jwt-token')
  }
}
