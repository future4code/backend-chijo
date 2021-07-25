import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import knex from 'knex'
import { AddressInfo } from 'net'
import { recipe } from "./types/recipe"

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
const getAllRecipesDB = async (): Promise<any> => {
    const result = connection
        .select("title", "name as author", "description")
        .from("recipes_aula48")
        .join("users_aula48", "user_id", "users_aula48.id")

    return result
}

const searchRecipesDB = async (query: string, orderBy: string, orderType: string, page: number): Promise<any> => {
    const itensPerPage = 5

    const result = connection
        .select("title", "name as author", "description")
        .from("recipes_aula48")
        .join("users_aula48", "user_id", "users_aula48.id")
        .where("title", "like", `%${query}%`)
        .orderBy(orderBy, orderType)
        .limit(itensPerPage)
        .offset(itensPerPage * (page - 1))
    return result
}

// ---- ENDPOINTS -----------------------------------------------------------
app.get("/recipes/all", async (req: Request, res: Response) => {
    try {
        const result = await getAllRecipesDB()
        const recipes: recipe[] = result

        if (recipes.length === 0) {
            res.statusCode = 404
            throw new Error("No recipes found")
        }

        res.status(200).send(recipes)

    } catch (err) {
        console.log(err)
        res.send(err.message || err.sqlMessage)
    }
})

app.get("/recipes/search", async (req: Request, res: Response) => {
    try {
        const title = req.query.title as string
        const orderBy = req.query.orderBy as string || "title"
        const orderType = req.query.orderType as string || "asc"
        const page = Number(req.query.page) || 1

        if (!title) {
            res.statusCode = 422
            throw new Error("Missing query param: title")
        }

        const recipes: recipe[] = await searchRecipesDB(title, orderBy, orderType, page)

        if (recipes.length === 0) {
            res.statusCode = 404
            throw new Error("No recipes found")
        }

        res.status(200).send(recipes)

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