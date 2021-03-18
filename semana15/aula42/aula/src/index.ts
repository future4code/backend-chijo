import express, { Request, Response } from "express"
import cors from "cors"
import { countries, country } from "./countries"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => console.log("Server is running in http://localhost:3003"))

// Retorna um oi
app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello World!")
})

// Pega dados do usuário
app.post("/person/:cabelo", (req: Request, res: Response) => {
    const senha = req.headers.senha
    const nome = req.body.nome
    const idade = req.query.idade
    const cabelo = req.params.cabelo

    res.status(200).send(`Olá, ${nome}. Sua senha é: ${senha}. Você tem ${idade} anos. Seu cabelo é ${cabelo}.`)
})

// Exercício 1 - Retornar lista de países
app.get("/countries", (req: Request, res: Response) => {
    res.status(200).send(countries)
})

// Exercício 2a - Achar país pelo nome
app.get("/countries/search", (req: Request, res: Response) => {
    const nome: string = req.query.name as string
    const resultadoBusca = countries.filter((country: country) => {
        return country.name.includes(nome)
    })

    res.status(200).send(resultadoBusca)
})

// Exercício 2b - Achar país pelo id
app.get("/countries/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const resultadoBusca = countries.find((country: country) => {
        return country.id === Number(id)
    })

    res.status(200).send(resultadoBusca)
})

// Exercício 3 - Deletar país com autorização
app.delete("/countries/:id", (req: Request, res: Response) => {
    let errorCode: number = 400
    try {
        if (!req.headers.authorization) {
            errorCode = 401
            throw new Error("Você não possui autorização para deletar")
        }

        const indexParaDeletar = countries.findIndex((c: country) => {
            return c.id === Number(req.params.id)
        })

        if (indexParaDeletar === -1) {
            errorCode = 404
            throw new Error("País não encontrado")
        }

        countries.splice(indexParaDeletar, 1)
        res.status(200).send("País deletado com sucesso!")

    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})