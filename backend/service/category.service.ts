import CategoryModel from '../schema/category.schema';
import { CategoryType } from '../types/category.types';

class CategoryService {
 
    async findAll() {
        const findedCategory = await CategoryModel.find()
        return findedCategory
    }


    async findById(id: string) {
        const findedCategory = await CategoryModel.findById(id)
        return findedCategory
    }


    async createCategory(nome: string, cor: string): Promise<void> {
        try {
            const newCategory = new CategoryModel({ nome, cor });
            await newCategory.save();
        } catch (error) {
            throw new Error(`Erro ao criar a categoria: ${error}`);
        }
    }

    async update(id: string, category: CategoryType) {
        const updatedTask = await CategoryModel.findByIdAndUpdate(id, {
            nome: category.nome,
            cor: category.cor
        }, { new: true })

        return updatedTask
    }

    

    async delete(id: string) {
        try {
            await CategoryModel.findByIdAndDelete(id)
            return "Categoria removida com sucesso"
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover a categoria: ${error}`)
        }
    }
}

export default new CategoryService();
