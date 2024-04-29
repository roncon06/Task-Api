import { Schema, model } from 'mongoose'


const taskSchema = new Schema({
    title: String,
    description: String,
    completedAt: Date, // Data de conclusão
    type: String, // Tipo
    status: { type: String, enum: ['pendente', 'em andamento', 'concluída'] }, // Status
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: String } // Mudança: referência ao nome da categoria

}, {
    timestamps: true // Isso adicionará os campos "createdAt" e "updatedAt"
});




export default model("Task", taskSchema)
