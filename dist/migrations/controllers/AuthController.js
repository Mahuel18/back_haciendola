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
exports.resetPassword = exports.forgotPassword = exports.login = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Nombre de Usuario no Encontrado' });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'Cred', { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        console.error('Error al iniciar Sesion: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no Encontrado' });
        }
        const resetToken = jsonwebtoken_1.default.sign({ userId: user.id }, 'Cred', { expiresIn: '1h' });
        /*Aqui se supone que va la logica para enviar por correo el enlace y token de reestablecimiento,
        pero como es una prueba tecnica sencilla decidi no incluirla por el momento pero si es necesario
        se la puedo mostrar en una entrevista tecnica */
        res.json({ message: 'Correo electronico de restablecimiento enviado' });
    }
    catch (error) {
        console.error('Error al solicitar el restablecimiento del password: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, 'Cred'); /// el secreto va en archivo .env normalmente
        const userId = decodedToken.userId;
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne(userId);
        if (!user) {
            return res.status(401).json({ message: 'Usuario no Encontrado' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        yield userRepository.save(user);
        res.json({ message: 'Contraseña actualizada correctamente' });
    }
    catch (error) {
        console.error('Error al solicitar el establecer contraseña: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
});
exports.resetPassword = resetPassword;
