//importando express com Request e Response e cors
import express, { Request, Response } from 'express';
import cors from 'cors';

//extra: importando configuração de rede do node
import { AddressInfo } from "net";
//iniciando a aplicação web com express
const app = express();

//ativando os módulos de Bodyparser e cors
app.use(express.json());
app.use(cors());

type user = {
    id: number,
    name: string,
    email: string,
    type: string,
    age: number
}


let users: user[] = [
    {
        id: 1,
        name: "Alice",
        email: "alice@email.com",
        type: "ADMIN",
        age: 12
    },
    {
        id: 2,
        name: "Bob",
        email: "bob@email.com",
        type: "NORMAL",
        age: 36
    },
    {
        id: 3,
        name: "Coragem",
        email: "coragem@email.com",
        type: "NORMAL",
        age: 21
    },
    {
        id: 4,
        name: "Dory",
        email: "dory@email.com",
        type: "NORMAL",
        age: 17
    },
    {
        id: 5,
        name: "Elsa",
        email: "elsa@email.com",
        type: "ADMIN",
        age: 17
    },
    {
        id: 6,
        name: "Fred",
        email: "fred@email.com",
        type: "ADMIN",
        age: 60
    }
]

app.get("/user", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const nome: string = req.query.nome as string;
        if (!nome) {
            errorCode = 422
            throw new Error("Nome inválido")
        }

        const myUser = users.find((u: user) => { return u.name === nome })

        if (!myUser) {
            errorCode = 404
            throw new Error("Usuário não encontrado")
        }

        const result = myUser
        res.status(200).send(result)
    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})

app.get("/user/:id", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id: string = req.params.id
        if (isNaN(Number(id))) {
            errorCode = 422
            throw new Error("Id inválido")
        }

        const myUser = users.find((u: user) => { return u.id === Number(id) })
        if (!myUser) {
            errorCode = 404
            throw new Error("Usuário não encontrado")
        }

        const result = myUser
        res.status(200).send(result)
    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})

app.post("/user", (req: Request, res: Response) => {
    let errorCode: number = 400
    try {
        const reqBody: user = {
            id: new Date().getDate(),
            name: req.body.name,
            email: req.body.email,
            type: req.body.type,
            age: req.body.age
        }

        if (!req.body.name || !req.body.email || !req.body.type || !req.body.age) {
            errorCode = 422
            throw new Error("Algum campo está inválido, preencha corretamente")
        }

        users.push(reqBody)
        res.status(200).send("Usuário criado com sucesso")
    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})

app.put("/user/:id", (req: Request, res: Response) => {
    let errorCode: number = 400
    try {
        if (isNaN(Number(req.params.id))) {
            errorCode = 422
            throw new Error("Id inválido")
        }

        const reqBody: {id: number, name: string} = {
            id: Number(req.params.id),
            name: req.body.name
        }

        if (!req.body.name) {
            errorCode = 422
            throw new Error("Nome inválido, preencha corretamente")
        }
        const myUserIndex = users.findIndex((u: user) => { return u.id === Number(req.params.id) })

        if (myUserIndex === -1) {
            errorCode = 404
            throw new Error("Usuário não encontrado")
        }

        users[myUserIndex].name = reqBody.name

        res.status(200).send({message: "Usuário atualizado com sucesso"})
    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})




const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
