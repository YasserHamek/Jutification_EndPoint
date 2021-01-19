import jwt from 'jsonwebtoken';

export class User {
    
    constructor(public email: string, public ratecounter: number, public expiretime: number ){ }
    
}
