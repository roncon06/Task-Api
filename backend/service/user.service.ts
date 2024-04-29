import userModel from '../schema/user.schema'
import { AuthToken, userType } from '../types/user.types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class userService {

    async createUser(user: userType): Promise<void> {
        try {
            const { username, peso, senha, email } = user;

            // Verifica se o usuário já existe
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                throw new Error('O usuário já existe');
            }

            // Criptografa a senha antes de salvar no banco de dados
            const hashedPassword = await bcrypt.hash(senha, 10);

            // Cria um novo usuário
            await userModel.create({
                username,
                peso,
                senha: hashedPassword,
                email
            });
        } catch (error) {
            throw new Error('Erro ao criar o usuário');
        }
    
    }

    async loginUser(email: string, senha: string): Promise<AuthToken> {
        try {
            // Procura pelo usuário no banco de dados
            const user = await userModel.findOne({ email });
            if (!user) {
                throw new Error('Credenciais inválidas');
            }
    
            if (user.senha !== null && user.senha !== undefined) {
                const passwordMatch = await bcrypt.compare(senha, user.senha);
                if (!passwordMatch) {
                    throw new Error('Credenciais inválidas');
                }
                // Faça algo com passwordMatch
            } else {
                throw new Error('A senha do usuário é nula ou indefinida.'); // Ou qualquer tratamento que você considere apropriado
            }
            
    
            // Gera o token de autenticação
            const token = jwt.sign({ userId: user._id }, 'secreto');
    
            return { token };
        } catch (error) {
            throw new Error('Erro ao autenticar o usuário');
        }
    }

    }

    
    

    export default new userService()
