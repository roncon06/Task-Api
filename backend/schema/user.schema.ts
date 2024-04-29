import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    username: String,
    peso: Number,
    senha: String,
    email: String
}, {
    timestamps: true // Isso adicionará os campos "createdAt" e "updatedAt"
});

export default model("User", userSchema)

