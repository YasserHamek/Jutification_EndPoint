import jwt from 'jsonwebtoken';

export class TokenService {
    jwtKey: string = 'justifyendpoint';

    constructor(){};

    tokenGeneration(email: string): string{
        let token : string = jwt.sign({_email: email},this.jwtKey ,{expiresIn:"24h"}) // expiresIn will be returned in seconde
        return token;
    }

    verifyToken(token: string){
        let verifiedToken: decodedToken;
  
        try {
            verifiedToken = <decodedToken>jwt.verify(token, this.jwtKey);
            return verifiedToken;
        } catch (error) {
          return null;
        }
    }

}

export interface decodedToken {
    _email: string;
    emission: number; // in seconde
    expires: number; // in seconde
}