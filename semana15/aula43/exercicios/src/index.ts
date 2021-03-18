import express, { Request, Response } from "express"
import cors from "cors"
import {users, user, UserType} from "./data"

const app = express()

app.use(express.json())
app.use(cors())

// Exercício 1 - Pegar lista de usuários
// Exercício 2 - Lista de usuários com determinado type
// Exercício 3 - Busca por nome
app.get("/user", (req: Request, res: Response) => {
    let errorCode: number = 400
    let result: user[]
    try {
        if (req.query.type) {
            // Busca por tipo
            if (req.query.type !== UserType.ADMIN && req.query.type !== UserType.NORMAL) {
                errorCode = 422
                throw new Error("Tipo de usuário inválido")
            }
            result = users.filter((u: user) => { return u.type === req.query.type })

        } else if (req.query.name) {
            // Busca por nome
            result = users.filter((u: user) => { return u.name.includes(req.query.name as string) })

        } else {
            // Retorna toda a lista
            result = users
        }

        if (!result) {
            errorCode = 404
            throw new Error("Nenhum usuário encontrado")
        }
        res.status(200).send(result)
    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})

// Exercício 4 - Adicionar usuário
app.post("/user", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        if (!req.body.name || !req.body.email || !req.body.type || !req.body.age) {
            errorCode = 422
            throw new Error("Preencha corretamente todos os dados pedidos (nome, email, tipo e idade)")
        }

        if (req.body.type !== UserType.ADMIN && req.body.type !== UserType.NORMAL) {
            errorCode = 422
            throw new Error("Tipo de usuário inválido")
        }

        const newUser: user = {
            id: new Date().getDate(),
            name: req.body.name,
            email: req.body.email,
            type: req.body.type,
            age: req.body.age
        }

        users.push(newUser)
        res.status(200).send({ message: "Usuário criado com sucesso!", user: newUser })
    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})

const getUserIndex = (id: string, errorCode: number): number => {
    if (isNaN(Number(id))) {
        errorCode = 422
        throw new Error("Id inválido")
    }

    const userIndex = users.findIndex((u: user) => { return u.id === Number(id) })

    if (userIndex === -1) {
        errorCode = 404
        throw new Error("Usuário não encontrado")
    }

    return userIndex
}

// Exercício 5 - Alterar nome
app.put("/user/:id", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        if (!req.body.name) {
            errorCode = 422
            throw new Error("Nome inválido")
        }

        const userIndex: number = getUserIndex(req.params.id, errorCode)
        users[userIndex].name = req.body.name

        res.status(200).send({ message: "Usuário alterado com sucesso!", user: users[userIndex] })
    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})

// Exercício 6 - Consertar nome com patch
app.patch("/user/:id", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        if (!req.body.name) {
            errorCode = 422
            throw new Error("Nome inválido")
        }

        const userIndex: number = getUserIndex(req.params.id, errorCode)
        users[userIndex].name = req.body.name

        res.status(200).send({ message: "Usuário alterado com sucesso!", user: users[userIndex] })
    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})

// Exercício 7 - Deletar usuário
app.delete("/user/:id", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const userIndex: number = getUserIndex(req.params.id, errorCode)
        users.splice(userIndex, 1)

        res.status(200).send({ message: "Usuário deletado com sucesso!"})
    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})


app.listen(3003, () => {
    console.log("Server is running on localhost:3003")
})