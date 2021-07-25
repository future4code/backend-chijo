import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import knex from 'knex'
import { AddressInfo } from 'net'

const app: Express = express()

app.use(express.json())
app.use(cors())
dotenv.config()

export const connection = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || "3306"),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
})

// ---- DATABASE ------------------------------------------------------------
export const selectAllUsers = async (): Promise<any> => {
    const result = await connection
        .select("id", "name", "email", "type")
        .from("aula48_exercicio")

    return result
}

export const searchUsers = async (name: string, type: string, orderBy: string, orderType: string, page: number): Promise<any> => {
    const itemsPerPage = 5

    const result = await connection
        .select("id", "name", "email", "type")
        .from("aula48_exercicio")
        .where("name", "like", `%${name}%`)
        .andWhere("type", "like", `%${type}%`)
        .orderBy(orderBy, orderType)
        .limit(itemsPerPage)
        .offset(itemsPerPage * (page - 1))

    return result
}

// ---- ENDPOINTS -----------------------------------------------------------
app.get("/users/all", async (req: Request, res: Response) => {
    try {
        const users = await selectAllUsers()

        if (!users.length) {
            res.statusCode = 404
            throw new Error("No users found")
        }

        res.status(200).send(users)
    } catch (err) {
        console.log(err)
        res.send(err.message || err.sqlMessage)
    }
})

app.get("/users/search", async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string || ""
        const type = req.query.type as string || ""
        const orderBy = req.query.orderBy as string || "email"
        const orderType = req.query.orderType as string || "asc"
        const page = Number(req.query.page) || 1

        let users

        if (!name && !type){
            users = await selectAllUsers()
        } else {
            users = await searchUsers(name, type, orderBy, orderType, page)
        }

        if (!users.length) {
            res.statusCode = 404
            throw new Error("No users found")
        }

        res.status(200).send(users)
    } catch (err) {
        console.log(err)
        res.send(err.message || err.sqlMessage)
    }
})

// ---- SERVER --------------------------------------------------------------
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    } else {
        console.error(`Failure upon starting server.`)
    }
})