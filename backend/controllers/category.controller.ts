import { Request, Response } from 'express'
import categoryService from '../service/category.service';
import taskService from '../service/task.service';

class taskController {

    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const { nome, cor } = req.body;
            await categoryService.createCategory(nome, cor);
            res.status(201).json({ message: 'Categoria criada com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar a categoria' });
        }
    }
   

    async findAll(req: Request, res: Response) {
        const findedCategory = await categoryService.findAll()
        res.status(200)
        return res.json(findedCategory)
    }


    async findById(req: Request, res: Response) {
        const findedCategory = await categoryService.findById(req.params.id)
        res.status(200)
        return res.json(findedCategory)
    }

    async update(req: Request, res: Response) {
        const updatedCategory = await categoryService.update(req.params.id, req.body)
        res.status(200)
        return res.json(updatedCategory)
    }

    async delete(req: Request, res: Response) {
        const deleted = await categoryService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }







}

export default new taskController()