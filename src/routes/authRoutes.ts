import express from 'express';
import { login, forgotPassword, resetPassword } from '../controllers/AuthController'

const api = express.Router();

api.post('/', login);
api.post('/forgot-password', forgotPassword);
api.post('/reset-password', resetPassword)

export default api;