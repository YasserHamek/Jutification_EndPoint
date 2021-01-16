import jwt from 'jsonwebtoken';

export class User {
    private token: string;

    constructor(private email: string){}

    TokenGeneration(email:string): string {
        return jwt.sign({'email':email},'signitureForJustifyEndPointToken')
    }

    ChekingForRateLimit(){
        
    }
}