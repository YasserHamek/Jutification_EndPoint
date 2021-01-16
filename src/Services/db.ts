import { Pool, QueryResult  } from 'pg';
import {dbconfig} from '../Main/dbconfig' 

export class Db {
    pool = new Pool(dbconfig.db);;

    constructor(){
        this.pool = new Pool(dbconfig.db);
    };

    isUserInDb(email: string): boolean{

        const response: QueryResult =  this.pool.query('SELECT * FROM users WHERE email='+email);
        return response.rows.length>0;
    }

    singIn(email: string, token: any, timeLeft:number){
        let rateCount: number  =0;
        const response =  this.pool.query('INSERT INTO users (name, email) VALUES ($1, $2, $3)', [email, rateCount, timeLeft, token]);
    }

    upgradeRatecounter(timeLeft: number, email: string){
        const response: QueryResult =  this.pool.query('UPDATE users SET rateCounter = 0, timeLeft = $1 WHERE email= $2',[timeLeft,email]);
    }



}