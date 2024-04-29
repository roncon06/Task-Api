import userService from '../backend/service/user.service';
import userModel from '../backend/schema/user.schema';
import bcrypt from 'bcrypt';
import app from '../app'
import {  describe, it, beforeAll, afterAll  } from '@jest/globals'

describe('userService', () => {
    // Limpa todos os usuários após todos os testes
    afterAll(async () => {
        await userModel.deleteMany({});
    });

    it('Deve criar um novo usuário', async () => {
        const userData = {
            username: 'testuser',
            peso: 70,
            senha: 'password123',
            email: 'test@example.com'
        };

        await userService.createUser(userData);
        
        // Verifica se o usuário foi criado com sucesso
        const createdUser = await userModel.findOne({ email: userData.email });
        expect(createdUser).toBeDefined();
        expect(createdUser?.username).toBe(userData.username);
        expect(createdUser?.peso).toBe(userData.peso);
        expect(createdUser?.senha).toBeDefined(); // A senha deve ser criptografada
    });

    // Restante dos testes...
});