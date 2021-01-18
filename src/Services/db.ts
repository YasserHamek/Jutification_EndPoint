import { Pool, QueryResult  } from 'pg';
import {dbconfig} from '../Services/dbconfig';
import {User} from '../Model/user';

export class Db {
    pool = new Pool(dbconfig.db);;

    constructor(){
        this.pool = new Pool(dbconfig.db);
    };

    async isUserInDb(email: string) {
        const response: any = await this.pool.query('SELECT email FROM users WHERE email = $1',[email]);
        console.log('\x1b[36m%s\x1b[0m', '[isUserInDb]: ');
        console.log(response.rows[0])
        return response.rows[0];
    }

    async singUp(user: User){
        const response: QueryResult = await this.pool.query('INSERT INTO users (email, rate_count, token, timeLeft) VALUES ($1, $2, $3, $4)', [user.email, user.rateCounter, user.token, user.timeLeft]);
        return response;
    }

    async upgradeRatecounter(email: string){
        const response: QueryResult = await this.pool.query('UPDATE users SET rateCounter = 0 WHERE email= $3',[email]);
    }

    async findUser(email: string) {
        const response: QueryResult = await this.pool.query('SELECT * FROM users WHERE email = $1',[email]);
        return response;
    }

}