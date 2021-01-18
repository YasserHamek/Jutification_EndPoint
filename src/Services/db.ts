import { Pool, QueryResult  } from 'pg';
import {dbconfig} from '../Services/dbconfig';
import {User} from '../Model/user';

export class Db {
    pool : Pool;

    constructor(){
        this.pool = new Pool(dbconfig.db);
        this.pool.query('')
    };

    async isUserInDb(email: string) {
        const response = await this.pool.query('SELECT email FROM users WHERE email = $1',[email]);
        return response.rowCount === 1;
    }

    async singUp(user: User){
        await this.pool.query('INSERT INTO users (email, rate_count, timeLeft) VALUES ($1, $2, $3)', [user.email, user.rateCounter, user.expireTime]);
    }

    async upgradeRatecounter(email: string){
        const response: QueryResult = await this.pool.query('UPDATE users SET rateCounter = 0 WHERE email= $3',[email]);
    }

    async findUser(email: string) {
        const response: QueryResult = await this.pool.query('SELECT * FROM users WHERE email = $1',[email]);
        return <User>response.rows[0];
    }

}