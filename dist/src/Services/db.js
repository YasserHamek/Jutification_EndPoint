"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = void 0;
const pg_1 = require("pg");
const dbconfig_1 = require("../Services/dbconfig");
class Db {
    constructor() {
        this.isTableInDataBase = false;
        this.pool = new pg_1.Pool(dbconfig_1.dbconfig.db);
    }
    ;
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query('CREATE TABLE IF NOT EXISTS users ( email VARCHAR(255) PRIMARY KEY, rateCounter BIGINT, expireTime BIGINT );');
            this.isTableInDataBase = true;
        });
    }
    isUserInDb(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isTableInDataBase) {
                yield this.createTable();
            }
            const response = yield this.pool.query('SELECT email FROM users WHERE email = $1', [email]);
            return response.rowCount === 1;
        });
    }
    singUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isTableInDataBase) {
                yield this.createTable();
            }
            yield this.pool.query('INSERT INTO users (email, ratecounter, expiretime) VALUES ($1, $2, $3)', [user.email, user.ratecounter, user.expiretime]);
        });
    }
    updateUser(email, expireTime, rateCounter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isTableInDataBase) {
                yield this.createTable();
            }
            yield this.pool.query('UPDATE users SET expireTime = $1, rateCounter = $2 WHERE email= $3', [expireTime, rateCounter, email]);
        });
    }
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isTableInDataBase) {
                yield this.createTable();
            }
            const response = yield this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return response.rows[0];
        });
    }
}
exports.Db = Db;
//# sourceMappingURL=db.js.map