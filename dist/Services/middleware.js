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
exports.headerChecking = exports.rateCheking = exports.authMiddleware = void 0;
const db_1 = require("../Services/db");
const tokenService_1 = require("../Services/tokenService");
const db = new db_1.Db();
const maxWords = 80000;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenService = new tokenService_1.TokenService();
    try {
        if (!req.header('token')) {
            return res.status(401).send({ errorMessage: 'to continue, please get insert a token in header' });
        }
        const token = req.header('token');
        let verifiedToken;
        let isUserInDb;
        try {
            verifiedToken = tokenService.verifyToken(token);
            isUserInDb = yield db.isUserInDb(verifiedToken._email);
        }
        catch (e) {
            console.log(e);
            return res.status(401).send({ errorMessage: 'to continue, please get a valid token' });
        }
        if (isUserInDb) {
            res.locals.user = yield db.findUser(verifiedToken._email);
            next();
        }
        else {
            return res.status(401).send({ errorMessage: "to continue, please register in database" });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ errorMessage: 'internal server error' });
    }
});
exports.authMiddleware = authMiddleware;
const rateCheking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(400).send({ errorMessage: 'A text must be provided!' });
    }
    const textToBeVerified = req.body.split(' ');
    if (textToBeVerified.length > maxWords) {
        return res.status(402).send({ errorMessage: 'Processing text that contain more than 80 000 words not possible in the free formule, Payement Required' });
    }
    try {
        let user = res.locals.user;
        if (user.ratecounter === 0 || user.expiretime > new Date().getTime()) {
            //this case, is the first time the user tried to justify a text after getting a token
            user.expiretime = new Date().getTime() + 86400000; // 24h in milisecond;
            user.ratecounter = textToBeVerified.length;
            yield db.updateUser(user.email, user.expiretime, user.ratecounter);
            next();
        }
        else if (user.expiretime < new Date().getTime() && +user.ratecounter + +textToBeVerified.length < maxWords) {
            user.ratecounter = +user.ratecounter + +textToBeVerified.length;
            yield db.updateUser(user.email, user.expiretime, user.ratecounter);
            next();
        }
        else if (user.expiretime < new Date().getTime() && +user.ratecounter + +textToBeVerified.length >= maxWords) {
            return res.status(402).send({ errorMessage: ' 80 000 words per day has been consumed, Payement Required to continue ' });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ errorMessage: 'internal server error' });
    }
});
exports.rateCheking = rateCheking;
const headerChecking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.header("Content-Type") != "text/plain") {
        return res.status(400).send({ errorMessage: 'A header of type : "text/plain" must be provided!' });
    }
    next();
});
exports.headerChecking = headerChecking;
//# sourceMappingURL=middleware.js.map