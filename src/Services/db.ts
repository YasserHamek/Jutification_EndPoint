import { Pool, QueryResult  } from 'pg';
import {dbconfig} from '../Services/dbconfig';
import {User} from '../Model/user';

export class Db {
    pool : Pool;
    isTableInDataBase: boolean= false;

    constructor(){
        this.pool = new Pool(dbconfig.db);
        this.createTable();
    };

    async createTable(){
        await this.pool.query('CREATE TABLE IF NOT EXISTS users ( email VARCHAR(255) PRIMARY KEY, rate_count INT, timeLeft INT );')
        this.isTableInDataBase = true;
    }

    async isUserInDb(email: string) {
        if(!this.isTableInDataBase){
            await this.createTable();
        } 
        const response = await this.pool.query('SELECT email FROM users WHERE email = $1',[email]);
        return response.rowCount === 1;
    }

    async singUp(user: User){
        if(!this.isTableInDataBase){
            await this.createTable();
        }
        await this.pool.query('INSERT INTO users (email, rate_count, timeLeft) VALUES ($1, $2, $3)', [user.email, user.rateCounter, user.expireTime]);
    }

    async updateUser(email: string, expireTime: number, rateCounter: number){
        if(!this.isTableInDataBase){
            await this.createTable();
        } 
        await this.pool.query('UPDATE users SET expireTime = $1, rate_count = $2 WHERE email= $3',[expireTime, rateCounter ,email]);
    }

    async findUser(email: string) {
        if(!this.isTableInDataBase){
            await this.createTable();
        } 
        const response: QueryResult = await this.pool.query('SELECT * FROM users WHERE email = $1',[email]);
        return <User>response.rows[0];
    }

}