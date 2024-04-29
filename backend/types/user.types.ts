// Interface para o esquema do usuário
export interface userType {
    username: string;
    peso: number;
    senha: string;
    email: string;
}

// Interface para o token de autenticação
export interface AuthToken {
    token: string;
}
