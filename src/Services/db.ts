import { Pool, QueryResult  } from 'pg';
import {dbconfig} from '../Services/dbconfig' 

export class Db {
    pool = new Pool(dbconfig.db);;

    constructor(){
        this.pool = new Pool(dbconfig.db);
    };

    async isUserInDb(email: string) {
        const response: QueryResult = await this.pool.query('SELECT * FROM users WHERE email='+email);
        return response;
    }

    async singUp(email: string, token: any, timeLeft:number){
        let rateCount: number  =0;
        const response: QueryResult = await this.pool.query('INSERT INTO users (email, rate_count, token, timeLeft) VALUES ($1, $2, $3, $4)', [email, rateCount, token, timeLeft]);
        return response;
    }

    async upgradeRatecounter(timeLeft: number, token: string, email: string){
        const response: QueryResult = await this.pool.query('UPDATE users SET rateCounter = 0, timeLeft = $1, token = $2 WHERE email= $3',[timeLeft, token, email]);
    }

}