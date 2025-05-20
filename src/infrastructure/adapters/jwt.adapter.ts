import jwt, { Secret, SignOptions } from "jsonwebtoken";

export class JwtAdapter {

  constructor(private readonly secret: Secret){}

  async generateToken<T>(
    payload: any,
    duration: SignOptions["expiresIn"] = "2h"
  ): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        this.secret,
        { expiresIn: duration },
        (error, token) => {
          if (error) return resolve(null);
          resolve(token as T);
        }
      );
    });
  }

  verifyToken<T>(token: string): Promise<T | null> {
    
    return new Promise(resolve => {
      
      jwt.verify(token, this.secret, (error, decoded) => {
      
        if(error) resolve(null);
      
        resolve(decoded as T);
      });
  })
  }
}