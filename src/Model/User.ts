import jwt from 'jsonwebtoken';

export class User {
    token: string;
    rateCounter: number;

    constructor(private email: string, private timeLeft:number){}
    
}
