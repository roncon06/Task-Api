import { Request, Response } from 'express'
import taskService, { countUserTasks, findRecentTask } from "../service/task.service";
import { taskType } from '../types/task.types';
import mongoose from 'mongoose';

class taskController {
    //async create(req:Request, res: Response) {
       // const createdTask= await taskService.create(req.body)
       // res.status(201)
        //return res.json(createdTask)
    //}


    async createTask(req: Request, res: Response): Promise<void> {
        try {
            const { username, title, description, type, status, completedAt, categoryName } = req.body;
            await taskService.createTask(username, {
                title,
                description,
                type,
                status,
                completedAt,
            }, categoryName);
            res.status(201).json({ message: 'Tarefa criada com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar a tarefa' });
        }
    }


    async findAll(req: Request, res: Response) {
        const findedTask = await taskService.findAll()
        res.status(200)
        return res.json(findedTask)
    }


    async findById(req: Request, res: Response) {
        const findedTask = await taskService.findById(req.params.id)
        res.status(200)
        return res.json(findedTask)
    }

    async update(req: Request, res: Response) {
        const updatedTask = await taskService.update(req.params.id, req.body)
        res.status(200)
        return res.json(updatedTask)
    }

    async delete(req: Request, res: Response) {
        const deleted = await taskService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }

    async findTasksByCategory(req: Request, res: Response): Promise<void> {
        try {
            const { categoryName } = req.params;
            const tasks = await taskService.findTasksByCategory(categoryName);
            res.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar tarefas por categoria' });
        }
    }

    async listCompletedTasks(req: Request, res: Response): Promise<void> {
        try {
            const completedTasks = await taskService.findCompletedTasks();
            res.status(200).json(completedTasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao listar tarefas concluídas' });
        }
    }

    async listPendingTasks(req: Request, res: Response): Promise<void> {
        try {
            const pendingTasks = await taskService.findPendingTasks();
            res.status(200).json(pendingTasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao listar tarefas pendentes' });
        }
    }


}

export async function countUserTasksController(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.userId;

        // Verificar se o ID do usuário é válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: 'ID de usuário inválido' });
            return;
        }

        const taskCount: number = await countUserTasks(userId);
        res.status(200).json({ taskCount });
    } catch (error: any) {
        res.status(500).json({ message: `Erro ao contar as tarefas do usuário: ${error.message}` });
    }
}


export async function findRecentTaskController(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.userId;

        // Verificar se o ID do usuário é válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: 'ID de usuário inválido' });
            return;
        }

        const recentTask = await findRecentTask(userId);
        res.status(200).json({ recentTask });
    } catch (error: any) {
        res.status(500).json({ message: `Erro ao encontrar a tarefa mais recente do usuário: ${error.message}` });
    }
}

export default new taskController()