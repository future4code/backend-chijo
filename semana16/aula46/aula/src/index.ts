import express, { Express, Request, Response } from "express"
import cors from "cors"
import { AddressInfo } from "net"
import { Pokemon, POKE_TYPES } from "./types"
import knex from "knex"
import dotenv from "dotenv"

// --- CONFIGS SERVER -------------------------------------------------------------
const app: Express = express()

app.use(express.json())
app.use(cors())
dotenv.config()

const connection = knex({
   client: "mysql",
   connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
   }
})

// --- FUNÇÕES BANCO ----------------------------------------------------------
async function createPokemonTable(): Promise<void> {
   try {
      await connection.raw(`
         CREATE TABLE Pokemons (
            id INT PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            type VARCHAR(255) NOT NULL
         );
      `)
      console.log("Sucesso!")
   } catch (err){
      console.log(err.sql || err.message)
   }
}

// async function createNewPokemon(
//       id: number,
//       name: string,
//       type: POKE_TYPES
//    ): Promise<void> {
//    try {
//       await connection.raw(`
//          INSERT INTO Pokemons VALUES(
//             ${id},
//             "${name}",
//             "${type}"
//          );
//       `)
//       console.log(`${name} inserido com sucesso!`)
//    } catch(err) {
//       console.log(err.sql || err.message)
//    }
// }

async function createNewPokemon(
   id: number,
   name: string,
   type: POKE_TYPES
): Promise<void> {
   try {
      await connection.insert({id, name, type}).into("Pokemons")
      console.log(`${name} inserido com sucesso!`)
   } catch(err) {
      console.log(err.sql || err.message)
   }
}

// async function getAllPokemon(): Promise<any> {
//    try {
//       const result: any = await connection.raw(`SELECT * FROM Pokemons`)
//       console.table(result[0])
//    } catch(err) {
//       console.log(err.sql || err.message)
//    }
// }

async function getAllPokemon(): Promise<any> {
   try {
      const result: any = await connection.select("*").from("Pokemons")
      console.table(result)
      return result
   } catch(err) {
      console.log(err.sql || err.message)
   }
}

// createPokemonTable()
// createNewPokemon(1, "Bulbasaur", POKE_TYPES.GRASS)
// createNewPokemon(2, "Ivysaur", POKE_TYPES.GRASS)
// createNewPokemon(3, "Venusaur", POKE_TYPES.GRASS)
// createNewPokemon(4, "Squirtle", POKE_TYPES.WATER)
getAllPokemon()

// --- ENDPOINTS ----------------------------------------------------------------
app.get("/pokemon/all", async (req: Request, res: Response) => {
   try {
      const pokemons: any = await getAllPokemon()

      if (!pokemons.length) {
         res.statusCode = 404
         throw new Error("No pokemons found")
      }

      res.status(200).send(pokemons)

   } catch (error) {
      console.log(error)
      res.send(error.message)
   }
})

app.post("/pokemon/new", async (req: Request, res: Response) => {
   try {
      const { id, name, type } = req.body
      const pokemons: any = await getAllPokemon()

      const pokemon: Pokemon | undefined = pokemons.find(
         (pokemon: any) => pokemon.id === id
      )

      if (pokemon) {
         res.statusCode = 409
         throw new Error("Id already exists")
      }

      if (!(type in POKE_TYPES)) {
         res.statusCode = 406
         throw new Error("Invalid Pokemon types")
      }

      await createNewPokemon(id, name, type)

      res.status(201).send("New Pokemon created!")
   } catch (error) {
      console.log(error)
      res.send(error.message)
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
});
