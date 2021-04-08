import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import knex from "knex"
import { AddressInfo } from 'net'

// --- CONFIGS SERVER ---------------------------------------------------------
const app: Express = express()
app.use(express.json())
app.use(cors())
dotenv.config()

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env

const connection = knex({
    client: "mysql",
    connection: {
        host: DB_HOST,
        port: Number(DB_PORT || "3306"),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    }
})


// --- FUNÇÕES BANCO ----------------------------------------------------------

// --- ENDPOINTS --------------------------------------------------------------

// --- INICIAR SERVER ---------------------------------------------------------
const server = app.listen(PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    } else {
        console.error(`Failure upon starting server.`)
    }
})