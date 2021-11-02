# Passos para começar um projeto

1) Criar **package.json**: `npm init -y`
2) Criar **tsconfig.json**: `tsc --init`

```
{
  "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "sourceMap": true,
      "outDir": "./build",
      "rootDir": "./src",
      "removeComments": true,
      "noImplicitAny": true,
      "esModuleInterop": true
  }
}
```

 4) Criar pasta **src**
 5) Criar comando **npm start**: `"tsc && node ./build/index.js"`
 6) Criar **gitignore**: `touch .gitignore` e adicionar node_modules e build
 7) Instalar **express** e tipos do express: `npm i express` e `npm i @types/express -D`
 8) Instalar **cors** e tipos do cors: `npm i cors` e `npm i @types/cors -D`
 9) Instalar **knex**, **mysql** e **dotenv**: `npm i knex@0.21.15 mysql dotenv`
 10) Instalar tipos knex: `npm i @types/knex -D`
  `npm i express cors knex@0.21.15 mysql dotenv @types/express -D @types/cors -D @types/knex -D`
 11) Criar arquivo `index.ts` com o seguinte conteúdo

```
import express, { Express } from 'express'
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

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    } else {
        console.error(`Failure upon starting server.`)
    }
})
```
