import { Router } from 'express'
import taskController, { countUserTasksController, findRecentTaskController } from './backend/controllers/task.controller'
import userController from './backend/controllers/user.controller'
import categoryController from './backend/controllers/category.controller'



const routes = Router()


//Rotas de Tarefa
routes.get('/health-check')
routes.post('/task', taskController.createTask)
routes.get('/task', taskController.findAll)
routes.get('/task/:id', taskController.findById)
routes.put('/task/:id', taskController.update)
routes.delete('/task/:id', taskController.delete)

//Rotas de Registro
routes.post('/registro', userController.register);
routes.post('/login', userController.login);

//Rotas de Categorias
routes.post('/category', categoryController.createCategory);
routes.get('/category', categoryController.findAll)
routes.get('/category/:id', categoryController.findById)
routes.put('/category/:id', categoryController.update)
routes.delete('/category/:id', categoryController.delete)

// Rota para listar tarefas por categorias
routes.get('/tasks/by-category/:categoryName', taskController.findTasksByCategory);
// Rota para listar tarefas concluídas
routes.get('/completed', taskController.listCompletedTasks);
// Rota para listar tarefas pendentes
routes.get('/pending', taskController.listPendingTasks);
//Rota para contar o número total de tarefas de um usuário.
routes.get('/count/:userId', countUserTasksController);
//Rota para encontrar a tarefa mais recente de um usuário.
routes.get('/recent/:userId', findRecentTaskController);








export {
    routes
}