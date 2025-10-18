export type IUser = {
    name: string;
    email: string;
    _id: string;
    idade: number;
    geder: string;
    cpf: string;
    password?: string;
    requests?: string[]; 
    contract?: string[]; 
};
