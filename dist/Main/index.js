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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const User_1 = require("../Model/User");
const db_1 = require("../Services/db");
const tokenService_1 = require("../Services/tokenService");
const justification_1 = require("../Services/justification");
const middleware_1 = require("../Services/middleware");
const app = express_1.default();
const port = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.text());
//initialisation
const tokenService = new tokenService_1.TokenService();
const db = new db_1.Db();
app.post('/api/jutify', middleware_1.authMiddleware, middleware_1.headerChecking, middleware_1.rateCheking, (req, res, next) => {
    const justify = new justification_1.Justification();
    const text = req.body;
    try {
        let user = res.locals.user;
        const wordsLeft = 80000 - user.ratecounter;
        const textjustified = justify.MainJustificationMethod(text);
        console.log(textjustified);
        res.status(200).json({ "wordsLeft": wordsLeft, "textjustified": textjustified }).send();
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ errorMessage: 'internal server error' });
    }
});
app.post('/api/token', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        return res.status(400).send({ errorMessage: 'An email must be provided!' });
    }
    try {
        const email = req.body.email;
        const isUserInDb = yield db.isUserInDb(email);
        const token = tokenService.tokenGeneration(email);
        if (isUserInDb) {
            res.send(token);
        }
        else {
            let user = new User_1.User(email, 0, 0);
            yield db.singUp(user);
            res.send({ user, token });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ errorMessage: 'internal server error' });
    }
}));
app.listen(port, () => console.log(`[INDEX.TS] Running on port ${port}`));
//# sourceMappingURL=index.js.map