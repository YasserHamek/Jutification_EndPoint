"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    constructor() {
        this.jwtKey = 'justifyendpoint';
    }
    ;
    tokenGeneration(email) {
        let token = jsonwebtoken_1.default.sign({ _email: email }, this.jwtKey);
        return token;
    }
    verifyToken(token) {
        let verifiedToken;
        try {
            verifiedToken = jsonwebtoken_1.default.verify(token, this.jwtKey);
            return verifiedToken;
        }
        catch (error) {
            return null;
        }
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=tokenService.js.map