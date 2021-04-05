import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import knex from 'knex'
import { AddressInfo } from 'net'

// --- CONFIGS SERVER -------------------------------------------------------------
const app = express()

app.use(express.json())
app.use(cors())
dotenv.config()

const connection = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || "3306"),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
})

let errorStatus = 400

// --- FUNÇÕES BANCO ----------------------------------------------------------

const getActorById = async (id: string): Promise<any> => {
    const result = await connection.raw(`
        SELECT * FROM Actor WHERE id = "${id}"
    `)
    console.log("Actor By Id", result[0][0])
    return result[0][0]
}

const getActorByName = async (name: string): Promise<any> => {
    const result = await connection.raw(`
        SELECT * FROM Actor WHERE name LIKE "%${name}%"
    `)
    console.log("Actor By Name", result[0][0])
    return result[0][0]
}

const getGenderAmount = async (gender: string): Promise<any> => {
    const result = await connection.raw(`
        SELECT COUNT(*) AS count FROM Actor WHERE GENDER = "${gender}";
    `)
    const count = result[0][0].count
    console.log("Gender Amount", count)
    return count
}

const createActor = async (
    id: string,
    name: string,
    salary: number,
    dateOfBirth: Date,
    gender: string
): Promise<void> => {
    await connection
        .insert({ id, name, salary, birth_date: dateOfBirth, gender })
        .into("Actor")
}

const updateSalary = async (id: string, salary: number): Promise<void> => {
    await connection("Actor").update({ salary }).where("id", id)
}

const deleteActor = async (id: string): Promise<void> => {
    await connection("Actor").del().where("id", id)
}

const avarageSalaryPerGender = async (gender: string): Promise<any> => {
    const result = await connection("Actor").avg("salary as average").where("gender", gender)
    console.log("Salary average", result[0].average)
    return result[0].average
}

// getActorById("002")
// getActorByName("Franco")
// getGenderAmount("male")
// createActor("003", "Letícia", 200000, new Date("1994-03-03"), "female")
// updateSalary("003", 300000)
// deleteActor("003")
avarageSalaryPerGender("female")

const createMovie = async (
    id: string,
    title: string,
    releaseDate: Date,
    rating: number,
    synopsis: string,
    playingLimitDate: Date
): Promise<void> => {
    await connection
        .insert({ id, title, release_date: releaseDate, rating, synopsis, playing_limit_date: playingLimitDate })
        .into("Movie")
}

const getMovies = async (): Promise<any> => {
    const response = await connection("Movie").select("*").limit(15)
    return response
}

const searchMovie = async (query: string): Promise<any> => {
    const response = await connection("Movie")
    .select("*")
    .where("title", "like", `%${query}%`)
    .orWhere("synopsis", "like", `%${query}%`)
    return response
}

// --- ENDPOINTS ----------------------------------------------------------------

app.get("/actor/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const actor = await getActorById(id)
        res.status(200).send(actor)
    } catch (err) {
        res.status(errorStatus).send({ message: err.message })
    }
})

app.get("/actor", async (req: Request, res: Response) => {
    try {
        const gender = req.query.gender as string

        if (!gender) {
            errorStatus = 402
            throw new Error("Especifique um gênero")
        }

        const count = await getGenderAmount(gender)
        res.status(200).send({ count: count })
    } catch (err) {
        res.status(errorStatus).send({ message: err.message })
    }
})

app.put("/actor", async (req: Request, res: Response) => {
    try {
        await createActor(
            req.body.id,
            req.body.name,
            req.body.salary,
            new Date(req.body.dateOfBirth),
            req.body.gender
        )
        res.status(200).send({ message: `${req.body.name} criado(a) com sucesso!` })
    } catch (err) {
        res.status(errorStatus).send({ message: err.message })
    }
})

app.post("/actor", async (req: Request, res: Response) => {
    try {
        updateSalary(req.body.id, req.body.salary)
        res.status(200).send({ message: `Salário de ${req.body.id} atualizado com sucesso!` })
    } catch (err) {
        res.status(errorStatus).send({ message: err.message })
    }
})

app.delete("/actor/:id", async (req: Request, res: Response) => {
    try {
        deleteActor(req.params.id)
        res.status(200).send({ message: `${req.params.id} deletado(a) com sucesso!` })
    } catch (err) {
        res.status(errorStatus).send({ message: err.message })
    }
})

app.post("/movie", async (req: Request, res: Response) => {
    try {
        createMovie(
            req.body.id,
            req.body.title,
            new Date(req.body.releaseDate),
            req.body.rating,
            req.body.synopsis,
            new Date(req.body.playingLimitDate)
        )
        res.status(200).send({ message: `${req.body.title} criado com sucesso!` })
    } catch (err) {
        res.status(errorStatus).send({ message: err.message })
    }
})

app.get("/movie/all", async (req: Request, res: Response) => {
    try {
        const response = await getMovies()
        res.status(200).send(response)
    } catch (err) {
        res.status(errorStatus).send({ message: err.message })
    }
})

app.get("/movie/search", async (req: Request, res: Response) => {
    try {
        const response = await searchMovie(req.query.query as string)
        res.status(200).send(response)
    } catch (err) {
        res.status(errorStatus).send({ message: err.message })
    }
})

// --- INICIAR SERVER ----------------------------------------------------------
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    } else {
        console.error(`Failure upon starting server.`)
    }
})
