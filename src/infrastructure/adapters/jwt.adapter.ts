import jwt, { Secret, SignOptions } from "jsonwebtoken";

export class JwtAdapter {

  constructor(private readonly secret: Secret){}

  async generateToken(
    payload: any,
    duration: SignOptions["expiresIn"] = "2h"
  ){
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        this.secret,
        { expiresIn: duration },
        (error, token) => {
          if (error) return resolve(null);
          resolve(token);
        }
      );
    });
  }

  verifyToken(token: string) {
    
    return new Promise(resolve => {
      
      jwt.verify(token, this.secret, (error, decoded) => {
      
        if(error) resolve(null);
      
        resolve(decoded);
      });
  })
  }
}