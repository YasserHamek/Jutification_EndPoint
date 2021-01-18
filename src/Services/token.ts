import jwt from 'jsonwebtoken';

export class TokenService {
    jwtKey: string = 'justifyendpoint';

    constructor(){};

    tokenGeneration(email: string): string{
        let token : string = jwt.sign({_email: email},this.jwtKey,{expiresIn:'24h'})
        return token;
    }

    verifyToken(token: string){
        let tokenVerified;
  
        try {
            tokenVerified = jwt.verify(token, this.jwtKey);
            return tokenVerified;
        } catch (error) {
          return null;
        }
    }

}