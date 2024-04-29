export interface taskType{
    title: String,
    description: String,
    completedAt: Date | null | undefined,
    type: String
    status: 'pendente' | 'em andamento' | 'concluída'; // Enumeração dos status
}

