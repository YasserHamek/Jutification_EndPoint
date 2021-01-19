import jwt from 'jsonwebtoken';

export class TokenService {
    private jwtKey: string = 'justifyendpoint';

    constructor(){};

    tokenGeneration(email: string): string{
        let token : string = jwt.sign({_email: email}, this.jwtKey);
        return token;
    }

    verifyToken(token: string): DecodedToken{
        let verifiedToken : DecodedToken;
  
        try {
            verifiedToken = <DecodedToken>jwt.verify(token, this.jwtKey);
            return verifiedToken;
        } catch (error) {
            return null;
        }
    }
}

export interface DecodedToken {
    _email: string;
    iat: number; // in seconde
}