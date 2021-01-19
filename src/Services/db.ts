import { Pool, QueryResult  } from 'pg';
import {dbconfig} from 'src/Services/dbconfig';
import {User} from 'src/Model/user';

export class Db {
    pool : Pool;
    isTableInDataBase: boolean= false;

    constructor(){
        this.pool = new Pool(dbconfig.db);
    };

    async createTable(){
        await this.pool.query('CREATE TABLE IF NOT EXISTS users ( email VARCHAR(255) PRIMARY KEY, rateCounter BIGINT, expireTime BIGINT );')
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
        await this.pool.query('INSERT INTO users (email, ratecounter, expiretime) VALUES ($1, $2, $3)', [user.email, user.ratecounter, user.expiretime]);
    }

    async updateUser(email: string, expireTime: number, rateCounter: number){
        if(!this.isTableInDataBase){
            await this.createTable();
        } 
        await this.pool.query('UPDATE users SET expireTime = $1, rateCounter = $2 WHERE email= $3',[expireTime, rateCounter ,email]);
    }

    async findUser(email: string) {
        if(!this.isTableInDataBase){
            await this.createTable();
        } 
        const response: QueryResult = await this.pool.query('SELECT * FROM users WHERE email = $1',[email]);
        return <User>response.rows[0];
    }
}