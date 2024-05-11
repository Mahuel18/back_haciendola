"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const api = express_1.default.Router();
api.post('/login', AuthController_1.login);
api.post('/forgot-password', AuthController_1.forgotPassword);
api.post('/reset-password', AuthController_1.resetPassword);
exports.default = api;
