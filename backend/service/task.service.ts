import taskModel from '../schema/task.schema'
import { taskType } from '../types/task.types'
import UserModel from '../schema/user.schema';
import CategoryModel from '../schema/category.schema';



class taskService {

    //async create(task: taskType) {
       // const createdTask = await taskModel.create(task)
      //  return createdTask
    //}

    async createTask(username: string, taskData: taskType, categoryName: string): Promise<void> {
        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                throw new Error('Usuário não encontrado');

            }

             // Busca a categoria pelo nome fornecido
             const category = await CategoryModel.findOne({ nome: categoryName });
             if (!category) {
                 throw new Error('Categoria não encontrada');
             }

            const newTask = new taskModel({
                ...taskData,
                user: user._id,
                category: category.nome
            });
            await newTask.save();
        } catch (error) {
            throw new Error('Erro ao criar a tarefa: ' + (error as Error).message);

        }
    }

    async findAll() {
        const findedTask = await taskModel.find()
        return findedTask
    }



    async findById(id: string) {
        const findedTask = await taskModel.findById(id)
        return findedTask
    }

    async update(id: string, task: taskType) {
        const updatedTask = await taskModel.findByIdAndUpdate(id, {
            title: task.title,
            description: task.description,
            type: task.type
        }, { new: true })

        return updatedTask
    }

    async delete(id: string) {
        try {
            await taskModel.findByIdAndDelete(id)
            return "Tarefa removida com sucesso"
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover a tarefa: ${error}`)
        }
    }
    



    async findTasksByCategory(categoryName: string): Promise<taskType[]> {
        try {
            const tasks = await taskModel.find({ category: categoryName });
            const mappedTasks = tasks.map(task => ({
                title: task.title || '',
                description: task.description || '',
                completedAt: task.completedAt || new Date(),
                type: task.type || '',
                status: isValidStatus(task.status) ? task.status : 'pendente',
                user: task.user
            }));
            return mappedTasks;
        }  catch (error: any) {
            throw new Error('Erro ao buscar tarefas por categoria: ' + error.message);
        }
    }

    async findCompletedTasks(): Promise<taskType[]> {
        try {
            const completedTasks = await taskModel.find({ status: 'concluída' }).lean();
            return completedTasks.map(task => ({
                title: task.title || '',
                description: task.description || '',
                completedAt: task.completedAt || new Date(),
                type: task.type || '',
                status: task.status || 'pendente',
            }));
        } catch (error) {
            throw new Error('Erro ao buscar tarefas concluídas');
        }
    }

    async findPendingTasks(): Promise<taskType[]> {
        try {
            const pendingTasks = await taskModel.find({ status: { $ne: 'concluída' } }).lean();
            return pendingTasks.map(task => ({
                title: task.title || '',
                description: task.description || '',
                completedAt: task.completedAt || new Date(),
                type: task.type || '',
                status: task.status || 'pendente',
            }));
        } catch (error) {
            throw new Error('Erro ao buscar tarefas pendentes');
        }
    }



 }

 export async function countUserTasks(userId: string): Promise<number> {
    try {
        // Verificar se o usuário existe antes de contar as tarefas
        const userExists = await UserModel.exists({ _id: userId });
        if (!userExists) {
            throw new Error('Usuário não encontrado');
        }

        const taskCount: number = await taskModel.countDocuments({ user: userId });
        return taskCount;
    } catch (error: any) {
        throw new Error(`Erro ao contar as tarefas do usuário: ${error.message}`);
    }
}

export async function findRecentTask(userId: string): Promise<any> {
    try {
        const recentTask = await taskModel.findOne({ user: userId }).sort({ createdAt: -1 }).lean();
        return recentTask;
    } catch (error: any) {
        throw new Error(`Erro ao encontrar a tarefa mais recente do usuário: ${error.message}`);
    }
}


// Função auxiliar para validar o status
function isValidStatus(status: string | null | undefined): status is "pendente" | "em andamento" | "concluída" {
    return status === 'pendente' || status === 'em andamento' || status === 'concluída';
}








export default new taskService()