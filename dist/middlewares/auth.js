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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../models/userSchema");
const jwtSecret = process.env.JWT_SECRET;
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // const token = req.header('Authorization')?.replace('Bearer ', '');
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized, token expired..."
            });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            const { id } = decoded;
            const user = yield userSchema_1.userInstance.findOne({
                where: {
                    id
                }
            });
            if (!user) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }
            req.user = user;
            next();
        }
        catch (error) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
    });
}
exports.auth = auth;
