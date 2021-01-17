import jwt from 'jsonwebtoken';

export class TokenService {

    constructor(){};

    tokenGeneration(email: string): string{
        
        let token : string = jwt.sign({_email: email},'justifyendpoint')
        return token;
    }

}