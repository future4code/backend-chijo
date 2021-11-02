export type address = {
    logradouro: string
    bairro: string
    cidade: string
    estado: string
}

export type fullAddress = {
    id: string
    logradouro: string
    bairro: string
    cidade: string
    estado: string
    cep: string
    numero: string
    complemento?: string
}

export type user = {
    id: string
    nome: string
    apelido: string
    email: string
    idEndereco: string
}