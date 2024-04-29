import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    nome: String,
    cor: String
});

export default model("Category", categorySchema);