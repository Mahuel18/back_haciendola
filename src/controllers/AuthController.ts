import { Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    const {username, password } = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { username: username } });

        if (!user){
            return res.status(401).json({ message: 'Nombre de Usuario no Encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.status(401).json({ message: 'Contraseña incorrecta'});
        }

        const token = jwt.sign({ userId: user.id }, 'Cred', { expiresIn: '1h'});

        res.json({ token })
    } catch (error){
        console.error('Error al iniciar Sesion: ', error);
        res.status(500).json({message: 'Error interno del Servidor'})
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email: email } });

        if (!user){
            return res.status(401).json({ message: 'Usuario no Encontrado' });
        }

        const resetToken = jwt.sign({ userId: user.id }, 'Cred', { expiresIn: '1h'})

        /*Aqui se supone que va la logica para enviar por correo el enlace y token de reestablecimiento, 
        pero como es una prueba tecnica sencilla decidi no incluirla por el momento pero si es necesario
        se la puedo mostrar en una entrevista tecnica */

        res.json({ message: 'Correo electronico de restablecimiento enviado'});

    } catch (error){
        console.error('Error al solicitar el restablecimiento del password: ', error);
        res.status(500).json({message: 'Error interno del Servidor'})
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    try {
        const decodedToken: any = jwt.verify(token, 'Cred'); /// el secreto va en archivo .env normalmente
        const userId = decodedToken.id;


        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user){
            return res.status(401).json({ message: 'Usuario no Encontrado' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await userRepository.save(user);

        res.json({ message: 'Contraseña actualizada correctamente'});

    } catch (error){
        console.error('Error al solicitar el establecer contraseña: ', error);
        res.status(500).json({message: 'Error interno del Servidor'})
    }
};