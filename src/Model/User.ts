import jwt from 'jsonwebtoken';

export class User {
    private token: string;
    private rateCounter: number;

    constructor(private email: string){}
    
}
