import jwt from 'jsonwebtoken';

export class User {
    token: string;
    rateCounter: number;

    constructor(public email: string, public timeLeft:number){}
    
}
