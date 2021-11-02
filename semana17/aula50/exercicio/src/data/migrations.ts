import { connection } from "./connection"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTableAddress = () => {
    connection.schema.hasTable("ex50_enderecos").then((exists) => {
        if (!exists) {
            connection.schema.createTable("ex50_enderecos", (table) => {
                table.string("id").primary()
                table.string("cep").notNullable()
                table.string("logradouro").notNullable()
                table.string("numero").notNullable()
                table.string("complemento").nullable()
                table.string("bairro").notNullable()
                table.string("cidade").notNullable()
                table.string("estado").notNullable()
            })
                .then(() => console.log("Tabela de Endereços Criada!"))
                .catch(printError)
        } else {
            console.log("Tabela de Endereços já existe!")
        }
    })
}

const createTableUser = () => {
    connection.schema.hasTable("ex50_usuarios").then((exists) => {
        if (!exists) {
            connection.schema.createTable("ex50_usuarios", (table) => {
                table.string("id").primary()
                table.string("nome").notNullable()
                table.string("apelido").notNullable()
                table.string("email").notNullable()
                table.string("idEndereco").references('id').inTable("ex50_enderecos")
            })
                .then(() => console.log("Tabela de Usuários Criada!"))
                .catch(printError)
        } else {
            console.log("Tabela de Usuários já existe!")
        }
    })
}


createTableAddress()
createTableUser()