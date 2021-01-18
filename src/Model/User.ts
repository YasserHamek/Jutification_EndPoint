import jwt from 'jsonwebtoken';

export class User {

    constructor(public email: string, public expireTime: number, public rateCounter: number){ }
    
}
