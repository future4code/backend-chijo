import express, { Express, Request, Response } from 'express'
import cors from "cors"
import { countries, country } from './countries'

const app: Express = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => console.log("Server is running in http://localhost:3003"))

// Endpoint 1: getAllCountries
app.get("/countries/all", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const result = countries.map((c: country)=>{
            return {id: c.id, name: c.name}
        })
        res.status(200).send(result)
    } catch {
        res.status(errorCode).end()
    }
})

//---------------------------------------------------------------------
// Endpoint 3: searchCountry
app.get("/countries/search", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const name: string = req.query.name as string
        const capital: string = req.query.capital as string
        const continent: string = req.query.continent as string
        let result: country[] = countries

        if (!name && !capital && !continent) {
            errorCode = 400
            throw new Error("Não há nenhum parâmetro de busca!")
        }

        if (name){
            result = result.filter((c: country) => {
                return c.name.toLowerCase().includes(name.toLowerCase())
            })
        }
        if (capital){
            result = result.filter((c: country) => {
                return c.capital.toLowerCase().includes(capital.toLowerCase())
            })
        }
        if (continent){
            result = result.filter((c: country) => {
                return c.continent.toLowerCase().includes(continent.toLowerCase())
            })
        }

        if (result.length < 1){
            errorCode = 404
            throw new Error("Nenhum resultado encontrado!")
        }

        res.status(200).send(result)

    } catch(err) {
        res.status(errorCode).send(err.message)
    }
})

//---------------------------------------------------------------------
// Endpoint 4: editCountry
app.put("/countries/edit/:id", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            errorCode = 422
            throw new Error("Esse id não é válido!")
        }

        const indexToChange: number = countries.findIndex((c: country) => {
            return c.id === id
        })

        if (indexToChange === -1){
            errorCode = 404
            throw new Error("País não encontrado!")
        }

        if (req.body.name) {
            countries[indexToChange].name = req.body.name
        }
        if (req.body.capital) {
            countries[indexToChange].capital = req.body.capital
        }

        res.status(200).send(countries[indexToChange])
    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})

//---------------------------------------------------------------------
// Endpoint 6: createCountry
app.post("/countries/create", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const {name, capital, continent} = req.body

        if (!req.headers.authorization || req.headers.authorization.length < 10){
            errorCode = 401
            throw new Error("Você não possui autorização para realizar essa ação.")
        }

        if (!name || !capital || !continent){
            errorCode = 400
            throw new Error("Preencha todos os parâmetros! (nome, capital e continente)")
        }

        const indexOfCountry = countries.findIndex((c: country) => {
            return c.name === name
        })

        if (indexOfCountry !== -1){
            errorCode = 400
            throw new Error("Este país já está cadastrado")
        }

        const newCountry: country = {id: Date.now(), name, capital, continent}
        countries.push(newCountry)

        res.status(200).send(newCountry)
    } catch (err) {
        res.status(errorCode).send(err.message)
    }

})


//---------------------------------------------------------------------
// Endpoint 2: getCountryById
app.get("/countries/:id", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            errorCode = 422
            throw new Error("Esse id não é válido!")
        }

        const result = countries.find((c: country) => {
            return c.id === id
        })

        if (!result){
            errorCode = 404
            throw new Error("País não encontrado!")
        }

        res.status(200).send(result)

    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})

//---------------------------------------------------------------------
// Endpoint 5: deleteCountry
app.delete("/countries/:id", (req: Request, res: Response) => {
    let errorCode = 400
    try {

        if (!req.headers.authorization || req.headers.authorization.length < 10){
            errorCode = 401
            throw new Error("Você não possui autorização para realizar essa ação.")
        }

        const id = Number(req.params.id)

        if (isNaN(id)) {
            errorCode = 422
            throw new Error("Esse id não é válido!")
        }

        const indexToDelete = countries.findIndex((c: country) => {
            return c.id === id
        })

        if (indexToDelete === -1){
            errorCode = 404
            throw new Error("País não encontrado!")
        }

        countries.splice(indexToDelete, 1)
        res.status(200).send("País deletado com sucesso!")

    } catch (err) {
        res.status(errorCode).send(err.message)
    }
})