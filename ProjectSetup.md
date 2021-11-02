# Passos para começar um projeto

1) Criar **package.json**: `npm init -y`

2) Criar **tsconfig.json**: `tsc --init`
    ```JSON
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

3) Criar pasta **src**

4) Criar comando **npm start**: `"tsc && node ./build/index.js"`

5) Criar **gitignore**: `touch .gitignore` e adicionar node_modules e build para serem ignorados

6) Instalar:
- **express** e tipos do express
- **cors** e tipos do cors
- **knex** e tipos do knex
- **mysql**
- **dotenv**
- **axios** e tipos do axios

    ```properties
    npm i @types/express @types/cors @types/knex @types/axios -D
    ```

    ```properties
    npm i express cors knex@0.21.15 mysql dotenv axios
    ```

7) Copiar e colar `.env` na raiz

8) Na `src`, criar pastas: `data`, `endpoints` e `services`

9) Na `src`, criar arquivos: `app.ts`, `types.ts` e `index.ts`

    ```js
    // app.ts

    import express, { Express } from 'express'
    import cors from 'cors'
    import { AddressInfo } from 'net'

    const app: Express = express()

    app.use(express.json())
    app.use(cors())

    const server = app.listen(process.env.PORT || 3003, () => {
        if (server) {
            const address = server.address() as AddressInfo
            console.log(`Server is running in http://localhost:${address.port}`)
        } else {
            console.error(`Failure upon starting server.`)
        }
    })

    export default app
    ```

10) Na pasta data, criar arquivo `connection.ts`

    ```js
    // connection.ts

    import dotenv from 'dotenv'
    import knex from 'knex'

    dotenv.config()

    export const connection = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT || "3306"),
            multiStatements: true
        },
    })
    ```
