import { Request, Response } from 'express'
import userService from '../service/user.service'
import { AuthToken, userType } from '../types/user.types'

class userController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const userData: userType = req.body;
            await userService.createUser(userData);
            res.status(201).json({ message: 'Usuário criado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar o usuário' });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, senha } = req.body;
            const authToken: AuthToken = await userService.loginUser(email, senha);
            res.status(200).json(authToken);
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    }
}

export default new userController()
